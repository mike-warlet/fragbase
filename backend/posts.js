// Posts API routes for FragBase (Feed)
import { requireAuth } from './auth.js';

// Get feed (posts from followed users + own posts)
export async function handleGetFeed(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;
    
    // Get posts from followed users + own posts
    const { results } = await env.DB.prepare(
      `SELECT p.*, u.name as user_name, u.photo_url as user_photo,
              pf.name as perfume_name, pf.brand as perfume_brand, pf.image_url as perfume_image
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN perfumes pf ON p.perfume_id = pf.id
       WHERE p.user_id = ? OR p.user_id IN (
         SELECT followed_id FROM follows WHERE follower_id = ?
       )
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`
    ).bind(auth.userId, auth.userId, limit, offset).all();
    
    return new Response(JSON.stringify({ 
      posts: results,
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

// Create post
export async function handleCreatePost(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { text, perfume_id, image_url } = await request.json();
    
    if (!text && !image_url) {
      return new Response(JSON.stringify({ error: 'Post must have text or image' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // If perfume_id provided, check if it exists
    if (perfume_id) {
      const perfume = await env.DB.prepare('SELECT id FROM perfumes WHERE id = ?').bind(perfume_id).first();
      if (!perfume) {
        return new Response(JSON.stringify({ error: 'Perfume not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    const postId = crypto.randomUUID();
    
    await env.DB.prepare(
      'INSERT INTO posts (id, user_id, perfume_id, text, image_url) VALUES (?, ?, ?, ?, ?)'
    ).bind(postId, auth.userId, perfume_id, text, image_url).run();
    
    // Get post with user data
    const post = await env.DB.prepare(
      `SELECT p.*, u.name as user_name, u.photo_url as user_photo,
              pf.name as perfume_name, pf.brand as perfume_brand, pf.image_url as perfume_image
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN perfumes pf ON p.perfume_id = pf.id
       WHERE p.id = ?`
    ).bind(postId).first();
    
    return new Response(JSON.stringify({ post }), {
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

// Delete post
export async function handleDeletePost(request, env, postId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Check if post exists and belongs to user
    const post = await env.DB.prepare(
      'SELECT * FROM posts WHERE id = ? AND user_id = ?'
    ).bind(postId, auth.userId).first();
    
    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found or unauthorized' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(postId).run();
    
    return new Response(JSON.stringify({ message: 'Post deleted' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
