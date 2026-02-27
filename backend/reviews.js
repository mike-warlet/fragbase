// Reviews API routes for FragBase
import { requireAuth } from './auth.js';

// Create review
export async function handleCreateReview(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { perfume_id, rating, longevity, performance, sillage, value, text } = await request.json();
    
    if (!perfume_id || !rating) {
      return new Response(JSON.stringify({ error: 'Perfume ID and rating are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: 'Rating must be between 1 and 5' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if perfume exists
    const perfume = await env.DB.prepare('SELECT id FROM perfumes WHERE id = ?').bind(perfume_id).first();
    if (!perfume) {
      return new Response(JSON.stringify({ error: 'Perfume not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if user already reviewed this perfume
    const existing = await env.DB.prepare(
      'SELECT id FROM reviews WHERE user_id = ? AND perfume_id = ?'
    ).bind(auth.userId, perfume_id).first();
    
    if (existing) {
      return new Response(JSON.stringify({ error: 'You already reviewed this perfume' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const reviewId = crypto.randomUUID();
    
    await env.DB.prepare(
      `INSERT INTO reviews (id, perfume_id, user_id, rating, longevity, performance, sillage, value, text) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      reviewId, 
      perfume_id, 
      auth.userId, 
      rating, 
      longevity || null, 
      performance || null, 
      sillage || null, 
      value || null, 
      text || null
    ).run();
    
    const review = await env.DB.prepare(
      'SELECT r.*, u.name as user_name, u.photo_url as user_photo FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.id = ?'
    ).bind(reviewId).first();
    
    return new Response(JSON.stringify({ review }), {
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

// Update review
export async function handleUpdateReview(request, env, reviewId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Check if review exists and belongs to user
    const review = await env.DB.prepare(
      'SELECT * FROM reviews WHERE id = ? AND user_id = ?'
    ).bind(reviewId, auth.userId).first();
    
    if (!review) {
      return new Response(JSON.stringify({ error: 'Review not found or unauthorized' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { rating, longevity, performance, sillage, value, text } = await request.json();
    
    if (rating && (rating < 1 || rating > 5)) {
      return new Response(JSON.stringify({ error: 'Rating must be between 1 and 5' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await env.DB.prepare(
      `UPDATE reviews 
       SET rating = COALESCE(?, rating), 
           longevity = COALESCE(?, longevity),
           performance = COALESCE(?, performance),
           sillage = COALESCE(?, sillage),
           value = COALESCE(?, value),
           text = COALESCE(?, text)
       WHERE id = ?`
    ).bind(rating, longevity, performance, sillage, value, text, reviewId).run();
    
    const updated = await env.DB.prepare(
      'SELECT r.*, u.name as user_name, u.photo_url as user_photo FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.id = ?'
    ).bind(reviewId).first();
    
    return new Response(JSON.stringify({ review: updated }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Delete review
export async function handleDeleteReview(request, env, reviewId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Check if review exists and belongs to user
    const review = await env.DB.prepare(
      'SELECT * FROM reviews WHERE id = ? AND user_id = ?'
    ).bind(reviewId, auth.userId).first();
    
    if (!review) {
      return new Response(JSON.stringify({ error: 'Review not found or unauthorized' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await env.DB.prepare('DELETE FROM reviews WHERE id = ?').bind(reviewId).run();
    
    return new Response(JSON.stringify({ message: 'Review deleted' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Like/unlike review
export async function handleLikeReview(request, env, reviewId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Check if review exists
    const review = await env.DB.prepare('SELECT id FROM reviews WHERE id = ?').bind(reviewId).first();
    if (!review) {
      return new Response(JSON.stringify({ error: 'Review not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if already liked
    const existing = await env.DB.prepare(
      'SELECT * FROM likes WHERE user_id = ? AND review_id = ?'
    ).bind(auth.userId, reviewId).first();
    
    if (existing) {
      // Unlike
      await env.DB.prepare('DELETE FROM likes WHERE user_id = ? AND review_id = ?')
        .bind(auth.userId, reviewId).run();
      
      return new Response(JSON.stringify({ liked: false }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Like
      await env.DB.prepare('INSERT INTO likes (user_id, review_id) VALUES (?, ?)')
        .bind(auth.userId, reviewId).run();
      
      return new Response(JSON.stringify({ liked: true }), {
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
