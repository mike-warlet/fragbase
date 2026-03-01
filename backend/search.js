// Global Search API for FragBase
import { requireAuth } from './auth.js';

// Global search across perfumes and users
export async function handleGlobalSearch(request, env) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    const type = url.searchParams.get('type') || 'all'; // all, perfumes, users
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20', 10), 50);

    // Advanced filter params
    const brand = url.searchParams.get('brand') || '';
    const gender = url.searchParams.get('gender') || '';
    const yearMin = url.searchParams.get('year_min') ? parseInt(url.searchParams.get('year_min'), 10) : null;
    const yearMax = url.searchParams.get('year_max') ? parseInt(url.searchParams.get('year_max'), 10) : null;
    const minRating = url.searchParams.get('min_rating') ? parseFloat(url.searchParams.get('min_rating')) : null;
    const accords = url.searchParams.get('accords') ? url.searchParams.get('accords').split(',').map(a => a.trim()).filter(Boolean) : [];
    const sort = url.searchParams.get('sort') || 'relevance'; // relevance, rating, year, name

    // When filters are active, we don't require a search query
    const hasFilters = brand || gender || yearMin || yearMax || minRating || accords.length > 0;

    if (!hasFilters && (!query.trim() || query.length < 2)) {
      return new Response(JSON.stringify({ error: 'Search query must be at least 2 characters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (query.length > 100) {
      return new Response(JSON.stringify({ error: 'Search query too long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const results = {};

    // Search perfumes
    if (type === 'all' || type === 'perfumes') {
      let whereClauses = [];
      let params = [];

      // Text search
      if (query.trim()) {
        const searchPattern = `%${query}%`;
        whereClauses.push('(p.name LIKE ? OR p.brand LIKE ? OR p.perfumer LIKE ?)');
        params.push(searchPattern, searchPattern, searchPattern);
      }

      // Brand filter (exact or partial match)
      if (brand) {
        whereClauses.push('p.brand LIKE ?');
        params.push(`%${brand}%`);
      }

      // Gender filter
      if (gender) {
        whereClauses.push('LOWER(p.gender) = LOWER(?)');
        params.push(gender);
      }

      // Year range filter
      if (yearMin !== null) {
        whereClauses.push('p.year >= ?');
        params.push(yearMin);
      }
      if (yearMax !== null) {
        whereClauses.push('p.year <= ?');
        params.push(yearMax);
      }

      // Accords filter - match perfumes that have ALL specified accords
      // Uses the denormalized accords TEXT column on perfumes or the perfume_accords table
      if (accords.length > 0) {
        for (const accord of accords) {
          whereClauses.push(
            `p.id IN (SELECT perfume_id FROM perfume_accords WHERE LOWER(accord_name) = LOWER(?))`
          );
          params.push(accord);
        }
      }

      const whereSQL = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : '';

      // Build the query with rating subquery
      let sql = `
        SELECT p.id, p.name, p.brand, p.image_url, p.gender, p.concentration, p.year,
               (SELECT ROUND(AVG(rating), 1) FROM reviews WHERE perfume_id = p.id) as avg_rating,
               (SELECT COUNT(*) FROM reviews WHERE perfume_id = p.id) as review_count
        FROM perfumes p
        ${whereSQL}
      `;

      // Min rating filter (applied as HAVING-like condition)
      if (minRating !== null) {
        sql = `
          SELECT * FROM (
            ${sql}
          ) sub
          WHERE sub.avg_rating >= ? AND sub.avg_rating IS NOT NULL
        `;
        params.push(minRating);
      }

      // Sort order
      let orderSQL;
      switch (sort) {
        case 'rating':
          orderSQL = 'ORDER BY avg_rating DESC NULLS LAST, review_count DESC';
          break;
        case 'year':
          orderSQL = 'ORDER BY year DESC NULLS LAST, name ASC';
          break;
        case 'name':
          orderSQL = 'ORDER BY name ASC';
          break;
        case 'relevance':
        default:
          orderSQL = 'ORDER BY review_count DESC, name ASC';
          break;
      }

      sql += ` ${orderSQL} LIMIT ?`;
      params.push(limit);

      const perfumes = await env.DB.prepare(sql).bind(...params).all();
      results.perfumes = perfumes.results;
    }

    // Search users (only when text query is present; filters don't apply to users)
    if ((type === 'all' || type === 'users') && query.trim() && query.length >= 2) {
      const searchPattern = `%${query}%`;
      const users = await env.DB.prepare(
        `SELECT id, name, username, photo_url, bio,
                (SELECT COUNT(*) FROM follows WHERE followed_id = u.id) as followers_count
         FROM users u
         WHERE name LIKE ? OR username LIKE ?
         ORDER BY followers_count DESC
         LIMIT ?`
      ).bind(searchPattern, searchPattern, limit).all();
      results.users = users.results;
    }

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// GET /api/filters/options - Return available filter values with counts
export async function handleGetFilterOptions(request, env) {
  try {
    // Run all queries in parallel via batch
    const [brandsResult, gendersResult, yearRangeResult, accordsResult] = await env.DB.batch([
      // All brands with count
      env.DB.prepare(
        `SELECT brand, COUNT(*) as count
         FROM perfumes
         WHERE brand IS NOT NULL AND brand != ''
         GROUP BY brand
         ORDER BY count DESC, brand ASC`
      ),
      // All genders with count
      env.DB.prepare(
        `SELECT gender, COUNT(*) as count
         FROM perfumes
         WHERE gender IS NOT NULL AND gender != ''
         GROUP BY LOWER(gender)
         ORDER BY count DESC`
      ),
      // Year range (min/max)
      env.DB.prepare(
        `SELECT MIN(year) as min_year, MAX(year) as max_year
         FROM perfumes
         WHERE year IS NOT NULL`
      ),
      // Top accords with count (from perfume_accords table)
      env.DB.prepare(
        `SELECT accord_name as name, COUNT(DISTINCT perfume_id) as count
         FROM perfume_accords
         GROUP BY LOWER(accord_name)
         ORDER BY count DESC
         LIMIT 50`
      ),
    ]);

    const brands = brandsResult.results || [];
    const genders = gendersResult.results || [];
    const yearRange = yearRangeResult.results[0] || { min_year: null, max_year: null };
    const accords = accordsResult.results || [];

    return new Response(JSON.stringify({
      brands,
      genders,
      year_range: {
        min: yearRange.min_year,
        max: yearRange.max_year,
      },
      accords,
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
