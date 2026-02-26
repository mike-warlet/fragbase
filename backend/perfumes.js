// Perfumes API routes for FragBase
import { requireAuth } from './auth.js';

// List perfumes with pagination and search
export async function handleListPerfumes(request, env) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('q') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;
    
    let query = 'SELECT id, name, brand, year, type, image_url FROM perfumes';
    let params = [];
    
    if (search) {
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

// Get perfume details
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
    
    // Get review stats
    const stats = await env.DB.prepare(
      'SELECT COUNT(*) as count, AVG(rating) as avg_rating FROM reviews WHERE perfume_id = ?'
    ).bind(perfumeId).first();
    
    return new Response(JSON.stringify({ 
      perfume: {
        ...perfume,
        review_count: stats.count || 0,
        avg_rating: stats.avg_rating || 0
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
    ).bind(perfumeId, name, brand, year, type, notes_top, notes_heart, notes_base, description, image_url).run();
    
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
