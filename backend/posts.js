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
    
    // Get posts from followed users + own posts, with like/comment counts
    const { results } = await env.DB.prepare(
      `SELECT p.*, u.name as user_name, u.photo_url as user_photo,
              pf.name as perfume_name, pf.brand as perfume_brand, pf.image_url as perfume_image,
              (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as likes_count,
              (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count,
              (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id AND user_id = ?) as is_liked
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN perfumes pf ON p.perfume_id = pf.id
       WHERE p.user_id = ? OR p.user_id IN (
         SELECT followed_id FROM follows WHERE follower_id = ?
       )
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`
    ).bind(auth.userId, auth.userId, auth.userId, limit, offset).all();

    const posts = results.map(p => ({ ...p, is_liked: p.is_liked > 0 }));

    return new Response(JSON.stringify({
      posts,
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
    ).bind(postId, auth.userId, perfume_id || null, text || null, image_url || null).run();
    
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
    
    await env.DB.prepare('DELETE FROM comments WHERE post_id = ?').bind(postId).run();
    await env.DB.prepare('DELETE FROM post_likes WHERE post_id = ?').bind(postId).run();
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

// Like/unlike a post (toggle)
export async function handleLikePost(request, env, postId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const existing = await env.DB.prepare(
      'SELECT id FROM post_likes WHERE post_id = ? AND user_id = ?'
    ).bind(postId, auth.userId).first();

    if (existing) {
      await env.DB.prepare('DELETE FROM post_likes WHERE post_id = ? AND user_id = ?')
        .bind(postId, auth.userId).run();
    } else {
      await env.DB.prepare('INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)')
        .bind(postId, auth.userId).run();
    }

    const count = await env.DB.prepare('SELECT COUNT(*) as count FROM post_likes WHERE post_id = ?')
      .bind(postId).first();

    return new Response(JSON.stringify({
      liked: !existing,
      likes_count: count.count,
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

// Get comments for a post (public - no auth required)
export async function handleGetComments(request, env, postId) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT c.*, u.name as user_name, u.photo_url as user_photo
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.created_at ASC`
    ).bind(postId).all();

    return new Response(JSON.stringify({ comments: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Create comment on a post
export async function handleCreateComment(request, env, postId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { text } = await request.json();
    if (!text || !text.trim()) {
      return new Response(JSON.stringify({ error: 'Comment text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (text.length > 2000) {
      return new Response(JSON.stringify({ error: 'Comment too long (max 2000 characters)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const commentId = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO comments (id, post_id, user_id, text) VALUES (?, ?, ?, ?)'
    ).bind(commentId, postId, auth.userId, text.trim()).run();

    const comment = await env.DB.prepare(
      `SELECT c.*, u.name as user_name, u.photo_url as user_photo
       FROM comments c JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`
    ).bind(commentId).first();

    return new Response(JSON.stringify({ comment }), {
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

// Delete comment
export async function handleDeleteComment(request, env, commentId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const comment = await env.DB.prepare(
      'SELECT * FROM comments WHERE id = ? AND user_id = ?'
    ).bind(commentId, auth.userId).first();

    if (!comment) {
      return new Response(JSON.stringify({ error: 'Comment not found or unauthorized' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare('DELETE FROM comments WHERE id = ?').bind(commentId).run();

    return new Response(JSON.stringify({ message: 'Comment deleted' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
