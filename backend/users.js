// Users API routes for FragBase
import { requireAuth } from './auth.js';

// Get user profile
export async function handleGetUser(request, env, userId) {
  try {
    const user = await env.DB.prepare(
      'SELECT id, username, email, name, name as display_name, photo_url, photo_url as avatar_url, bio, created_at FROM users WHERE id = ?'
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
        followers_count: followerCount.count || 0,
        following_count: followingCount.count || 0,
        review_count: reviewCount.count || 0,
        reviews_count: reviewCount.count || 0
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
    const body = await request.json();
    // Accept both name/display_name and photo_url/avatar_url
    const name = body.display_name || body.name;
    const bio = body.bio;
    const photo_url = body.avatar_url || body.photo_url;

    await env.DB.prepare(
      `UPDATE users
       SET name = COALESCE(?, name),
           bio = COALESCE(?, bio),
           photo_url = COALESCE(?, photo_url)
       WHERE id = ?`
    ).bind(name, bio, photo_url, auth.userId).run();
    
    const user = await env.DB.prepare(
      'SELECT id, username, email, name, name as display_name, photo_url, photo_url as avatar_url, bio, created_at FROM users WHERE id = ?'
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

// Get user taste profile (aggregated from reviews, wishlists, votes)
export async function handleGetTasteProfile(request, env, userId) {
  try {
    // Top accords the user has voted on
    const { results: topAccords } = await env.DB.prepare(
      `SELECT accord_name, COUNT(*) as count, ROUND(AVG(strength), 1) as avg_strength
       FROM accord_votes WHERE user_id = ?
       GROUP BY accord_name ORDER BY count DESC LIMIT 10`
    ).bind(userId).all();

    // Most reviewed brands
    const { results: topBrands } = await env.DB.prepare(
      `SELECT p.brand, COUNT(*) as count
       FROM reviews r JOIN perfumes p ON r.perfume_id = p.id
       WHERE r.user_id = ?
       GROUP BY p.brand ORDER BY count DESC LIMIT 5`
    ).bind(userId).all();

    // Wishlist stats
    const wishlistStats = await env.DB.prepare(
      `SELECT list_type, COUNT(*) as count FROM wishlists
       WHERE user_id = ? GROUP BY list_type`
    ).bind(userId).all();

    const wishlists = { own: 0, want: 0, tried: 0 };
    for (const row of wishlistStats.results) {
      wishlists[row.list_type] = row.count;
    }

    // Average ratings given
    const avgRatings = await env.DB.prepare(
      `SELECT ROUND(AVG(rating), 1) as avg_rating, COUNT(*) as review_count
       FROM reviews WHERE user_id = ?`
    ).bind(userId).first();

    return new Response(JSON.stringify({
      taste_profile: {
        top_accords: topAccords,
        top_brands: topBrands,
        wishlists,
        avg_rating: avgRatings?.avg_rating || 0,
        review_count: avgRatings?.review_count || 0,
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

// Get user's followers
export async function handleGetFollowers(request, env, userId) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT u.id, u.username, u.name, u.photo_url, u.bio
       FROM follows f
       JOIN users u ON f.follower_id = u.id
       WHERE f.followed_id = ?
       ORDER BY f.created_at DESC`
    ).bind(userId).all();

    return new Response(JSON.stringify({ users: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get user's following
export async function handleGetFollowing(request, env, userId) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT u.id, u.username, u.name, u.photo_url, u.bio
       FROM follows f
       JOIN users u ON f.followed_id = u.id
       WHERE f.follower_id = ?
       ORDER BY f.created_at DESC`
    ).bind(userId).all();

    return new Response(JSON.stringify({ users: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get notifications (likes, follows, comments on user's content)
export async function handleGetNotifications(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '30'), 100);

    // Combine: new followers, post likes, post comments, review likes
    const { results } = await env.DB.prepare(
      `SELECT * FROM (
        SELECT 'follow' as type, f.follower_id as actor_id, u.name as actor_name,
               u.photo_url as actor_photo, NULL as target_id, NULL as target_text,
               f.created_at
        FROM follows f JOIN users u ON f.follower_id = u.id
        WHERE f.followed_id = ?

        UNION ALL

        SELECT 'post_like' as type, pl.user_id as actor_id, u.name as actor_name,
               u.photo_url as actor_photo, pl.post_id as target_id,
               SUBSTR(p.text, 1, 50) as target_text, pl.created_at
        FROM post_likes pl
        JOIN users u ON pl.user_id = u.id
        JOIN posts p ON pl.post_id = p.id
        WHERE p.user_id = ? AND pl.user_id != ?

        UNION ALL

        SELECT 'comment' as type, c.user_id as actor_id, u.name as actor_name,
               u.photo_url as actor_photo, c.post_id as target_id,
               SUBSTR(c.text, 1, 50) as target_text, c.created_at
        FROM comments c
        JOIN users u ON c.user_id = u.id
        JOIN posts p ON c.post_id = p.id
        WHERE p.user_id = ? AND c.user_id != ?
      )
      ORDER BY created_at DESC
      LIMIT ?`
    ).bind(auth.userId, auth.userId, auth.userId, auth.userId, auth.userId, limit).all();

    return new Response(JSON.stringify({ notifications: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
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
