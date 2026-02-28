// Perfumes API routes for FragBase
import { requireAuth } from './auth.js';

// List perfumes with pagination and search
export async function handleListPerfumes(request, env) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('q') || url.searchParams.get('search') || '';
    const barcode = url.searchParams.get('barcode');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;

    let query = 'SELECT id, name, brand, year, type, image_url FROM perfumes';
    let params = [];

    if (barcode) {
      query += ' WHERE barcode = ?';
      params = [barcode];
    } else if (search) {
      query += ' WHERE name LIKE ? OR brand LIKE ?';
      params = [`%${search}%`, `%${search}%`];
    }
    
    query += ' ORDER BY name ASC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const { results } = await env.DB.prepare(query).bind(...params).all();
    
    return new Response(JSON.stringify({ 
      perfumes: results,
      page,
      limit
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

// Get perfume details (enriched with voting aggregates)
export async function handleGetPerfume(request, env, perfumeId) {
  try {
    const perfume = await env.DB.prepare(
      'SELECT * FROM perfumes WHERE id = ?'
    ).bind(perfumeId).first();

    if (!perfume) {
      return new Response(JSON.stringify({ error: 'Perfume not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Run all aggregate queries in batch for performance
    const [statsResult, accordsResult, performanceResult, seasonsResult, wishlistResult] = await env.DB.batch([
      env.DB.prepare(
        'SELECT COUNT(*) as count, ROUND(AVG(rating), 1) as avg_rating FROM reviews WHERE perfume_id = ?'
      ).bind(perfumeId),
      env.DB.prepare(
        `SELECT accord_name, ROUND(AVG(strength), 1) as avg_strength, COUNT(*) as vote_count
         FROM accord_votes WHERE perfume_id = ?
         GROUP BY accord_name ORDER BY avg_strength DESC`
      ).bind(perfumeId),
      env.DB.prepare(
        `SELECT ROUND(AVG(longevity), 1) as avg_longevity, ROUND(AVG(sillage), 1) as avg_sillage,
                COUNT(*) as vote_count
         FROM performance_votes WHERE perfume_id = ?`
      ).bind(perfumeId),
      env.DB.prepare(
        `SELECT SUM(spring) as spring, SUM(summer) as summer, SUM(fall) as fall,
                SUM(winter) as winter, SUM(day) as day, SUM(night) as night, COUNT(*) as total
         FROM season_votes WHERE perfume_id = ?`
      ).bind(perfumeId),
      env.DB.prepare(
        'SELECT list_type, COUNT(*) as count FROM wishlists WHERE perfume_id = ? GROUP BY list_type'
      ).bind(perfumeId),
    ]);

    const stats = statsResult.results[0];
    const wishlistCounts = { own: 0, want: 0, tried: 0 };
    for (const row of wishlistResult.results) {
      wishlistCounts[row.list_type] = row.count;
    }

    // Parse notes from comma-separated to arrays
    const parseNotes = (str) => str ? str.split(',').map(n => n.trim()).filter(Boolean) : [];

    return new Response(JSON.stringify({
      perfume: {
        ...perfume,
        notes: {
          top: parseNotes(perfume.notes_top),
          heart: parseNotes(perfume.notes_heart),
          base: parseNotes(perfume.notes_base),
        },
        review_count: stats?.count || 0,
        avg_rating: stats?.avg_rating || 0,
        accords: accordsResult.results || [],
        performance: performanceResult.results[0] || null,
        seasons: seasonsResult.results[0] || null,
        wishlist_counts: wishlistCounts,
      }
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

// Get trending perfumes (by recent engagement)
export async function handleGetTrendingPerfumes(request, env) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT p.id, p.name, p.brand, p.year, p.image_url, p.gender,
              COUNT(DISTINCT r.id) as recent_reviews,
              COUNT(DISTINCT w.id) as recent_wishlists,
              COUNT(DISTINCT nv.id) as recent_votes,
              (COUNT(DISTINCT r.id) * 3 + COUNT(DISTINCT w.id) * 2 + COUNT(DISTINCT nv.id)) as score
       FROM perfumes p
       LEFT JOIN reviews r ON p.id = r.perfume_id AND r.created_at > datetime('now', '-7 days')
       LEFT JOIN wishlists w ON p.id = w.perfume_id AND w.created_at > datetime('now', '-7 days')
       LEFT JOIN note_votes nv ON p.id = nv.perfume_id AND nv.created_at > datetime('now', '-7 days')
       GROUP BY p.id
       ORDER BY score DESC, p.name ASC
       LIMIT 20`
    ).all();

    return new Response(JSON.stringify({ perfumes: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Create new perfume
export async function handleCreatePerfume(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url } = await request.json();
    
    if (!name || !brand) {
      return new Response(JSON.stringify({ error: 'Name and brand are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const perfumeId = crypto.randomUUID();
    
    await env.DB.prepare(
      `INSERT INTO perfumes (id, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      perfumeId, 
      name, 
      brand, 
      year || null, 
      type || null, 
      notes_top || null, 
      notes_heart || null, 
      notes_base || null, 
      description || null, 
      image_url || null
    ).run();
    
    const perfume = await env.DB.prepare('SELECT * FROM perfumes WHERE id = ?').bind(perfumeId).first();
    
    return new Response(JSON.stringify({ perfume }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Compare multiple perfumes side by side
export async function handleComparePerfumes(request, env) {
  try {
    const url = new URL(request.url);
    const idsParam = url.searchParams.get('ids') || '';
    const ids = idsParam.split(',').map(id => id.trim()).filter(Boolean);

    if (ids.length < 2 || ids.length > 4) {
      return new Response(JSON.stringify({ error: 'Provide 2-4 perfume IDs separated by commas' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const perfumes = [];

    for (const perfumeId of ids) {
      const [perfumeResult, statsResult, accordsResult, performanceResult, seasonsResult, wishlistResult] = await env.DB.batch([
        env.DB.prepare('SELECT * FROM perfumes WHERE id = ?').bind(perfumeId),
        env.DB.prepare(
          'SELECT COUNT(*) as count, ROUND(AVG(rating), 1) as avg_rating FROM reviews WHERE perfume_id = ?'
        ).bind(perfumeId),
        env.DB.prepare(
          `SELECT accord_name, ROUND(AVG(strength), 1) as avg_strength, COUNT(*) as vote_count
           FROM accord_votes WHERE perfume_id = ?
           GROUP BY accord_name ORDER BY avg_strength DESC`
        ).bind(perfumeId),
        env.DB.prepare(
          `SELECT ROUND(AVG(longevity), 1) as avg_longevity, ROUND(AVG(sillage), 1) as avg_sillage,
                  COUNT(*) as vote_count
           FROM performance_votes WHERE perfume_id = ?`
        ).bind(perfumeId),
        env.DB.prepare(
          `SELECT SUM(spring) as spring, SUM(summer) as summer, SUM(fall) as fall,
                  SUM(winter) as winter, SUM(day) as day, SUM(night) as night, COUNT(*) as total
           FROM season_votes WHERE perfume_id = ?`
        ).bind(perfumeId),
        env.DB.prepare(
          'SELECT list_type, COUNT(*) as count FROM wishlists WHERE perfume_id = ? GROUP BY list_type'
        ).bind(perfumeId),
      ]);

      const perfume = perfumeResult.results[0];
      if (!perfume) continue;

      const stats = statsResult.results[0];
      const wishlistCounts = { own: 0, want: 0, tried: 0 };
      for (const row of wishlistResult.results) {
        wishlistCounts[row.list_type] = row.count;
      }

      const parseNotes = (str) => str ? str.split(',').map(n => n.trim()).filter(Boolean) : [];

      perfumes.push({
        ...perfume,
        notes: {
          top: parseNotes(perfume.notes_top),
          heart: parseNotes(perfume.notes_heart),
          base: parseNotes(perfume.notes_base),
        },
        review_count: stats?.count || 0,
        avg_rating: stats?.avg_rating || 0,
        accords: accordsResult.results || [],
        performance: performanceResult.results[0] || null,
        seasons: seasonsResult.results[0] || null,
        wishlist_counts: wishlistCounts,
      });
    }

    if (perfumes.length < 2) {
      return new Response(JSON.stringify({ error: 'At least 2 valid perfumes required for comparison' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ perfumes }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get perfume reviews
export async function handleGetPerfumeReviews(request, env, perfumeId) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;
    
    const { results } = await env.DB.prepare(
      `SELECT r.*, u.name as user_name, u.photo_url as user_photo 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.perfume_id = ? 
       ORDER BY r.created_at DESC 
       LIMIT ? OFFSET ?`
    ).bind(perfumeId, limit, offset).all();
    
    return new Response(JSON.stringify({ 
      reviews: results,
      page,
      limit
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
