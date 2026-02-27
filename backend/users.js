// Users API routes for FragBase
import { requireAuth } from './auth.js';

// Get user profile
export async function handleGetUser(request, env, userId) {
  try {
    const user = await env.DB.prepare(
      'SELECT id, username, email, name, photo_url, bio, created_at FROM users WHERE id = ?'
    ).bind(userId).first();
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get follower/following counts
    const followerCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM follows WHERE followed_id = ?'
    ).bind(userId).first();
    
    const followingCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM follows WHERE follower_id = ?'
    ).bind(userId).first();
    
    const reviewCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM reviews WHERE user_id = ?'
    ).bind(userId).first();
    
    return new Response(JSON.stringify({ 
      user: {
        ...user,
        follower_count: followerCount.count || 0,
        following_count: followingCount.count || 0,
        review_count: reviewCount.count || 0
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

// Update user profile
export async function handleUpdateUser(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { name, bio, photo_url } = await request.json();
    
    await env.DB.prepare(
      `UPDATE users 
       SET name = COALESCE(?, name), 
           bio = COALESCE(?, bio),
           photo_url = COALESCE(?, photo_url)
       WHERE id = ?`
    ).bind(name, bio, photo_url, auth.userId).run();
    
    const user = await env.DB.prepare(
      'SELECT id, username, email, name, photo_url, bio, created_at FROM users WHERE id = ?'
    ).bind(auth.userId).first();
    
    return new Response(JSON.stringify({ user }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get user reviews
export async function handleGetUserReviews(request, env, userId) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;
    
    const { results } = await env.DB.prepare(
      `SELECT r.*, p.name as perfume_name, p.brand as perfume_brand, p.image_url as perfume_image 
       FROM reviews r 
       JOIN perfumes p ON r.perfume_id = p.id 
       WHERE r.user_id = ? 
       ORDER BY r.created_at DESC 
       LIMIT ? OFFSET ?`
    ).bind(userId, limit, offset).all();
    
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

// Follow/unfollow user
export async function handleFollowUser(request, env, userId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    if (auth.userId === userId) {
      return new Response(JSON.stringify({ error: 'Cannot follow yourself' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if user exists
    const user = await env.DB.prepare('SELECT id FROM users WHERE id = ?').bind(userId).first();
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if already following
    const existing = await env.DB.prepare(
      'SELECT * FROM follows WHERE follower_id = ? AND followed_id = ?'
    ).bind(auth.userId, userId).first();
    
    if (request.method === 'POST') {
      if (existing) {
        return new Response(JSON.stringify({ error: 'Already following' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      await env.DB.prepare('INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)')
        .bind(auth.userId, userId).run();
      
      return new Response(JSON.stringify({ following: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (request.method === 'DELETE') {
      if (!existing) {
        return new Response(JSON.stringify({ error: 'Not following' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      await env.DB.prepare('DELETE FROM follows WHERE follower_id = ? AND followed_id = ?')
        .bind(auth.userId, userId).run();
      
      return new Response(JSON.stringify({ following: false }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get user collections
export async function handleGetUserCollections(request, env, userId) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT c.*, COUNT(cp.perfume_id) as perfume_count 
       FROM collections c 
       LEFT JOIN collections_perfumes cp ON c.id = cp.collection_id 
       WHERE c.user_id = ? 
       GROUP BY c.id 
       ORDER BY c.name ASC`
    ).bind(userId).all();
    
    return new Response(JSON.stringify({ collections: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
