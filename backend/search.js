// Global Search API for FragBase
import { requireAuth } from './auth.js';

// Global search across perfumes and users
export async function handleGlobalSearch(request, env) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    const type = url.searchParams.get('type') || 'all'; // all, perfumes, users
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20', 10), 50);

    if (!query.trim() || query.length < 2) {
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

    const searchPattern = `%${query}%`;
    const results = {};

    // Search perfumes
    if (type === 'all' || type === 'perfumes') {
      const perfumes = await env.DB.prepare(
        `SELECT id, name, brand, image_url, gender, concentration,
                (SELECT ROUND(AVG(rating), 1) FROM reviews WHERE perfume_id = p.id) as avg_rating,
                (SELECT COUNT(*) FROM reviews WHERE perfume_id = p.id) as review_count
         FROM perfumes p
         WHERE name LIKE ? OR brand LIKE ? OR perfumer LIKE ?
         ORDER BY review_count DESC
         LIMIT ?`
      ).bind(searchPattern, searchPattern, searchPattern, limit).all();
      results.perfumes = perfumes.results;
    }

    // Search users
    if (type === 'all' || type === 'users') {
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
