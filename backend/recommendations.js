// User recommendations: "If you like X, try Y"
import { requireAuth } from './auth.js';

export async function handleGetRecommendations(request, env, perfumeId) {
  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 30);

    let userId = null;
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const { verifyToken } = await import('./auth.js');
      const decoded = await verifyToken(authHeader.substring(7), env.JWT_SECRET);
      if (decoded) userId = decoded.userId;
    }

    const recs = await env.DB.prepare(`
      SELECT r.*,
        u.username, u.name as user_name, u.photo_url as user_photo,
        p.name as rec_name, p.brand as rec_brand, p.image_url as rec_image, p.year as rec_year,
        ${userId ? `(SELECT vote FROM recommendation_votes WHERE user_id = ? AND recommendation_id = r.id) as my_vote` : 'NULL as my_vote'}
      FROM user_recommendations r
      JOIN users u ON r.user_id = u.id
      JOIN perfumes p ON r.recommended_perfume_id = p.id
      WHERE r.source_perfume_id = ?
      ORDER BY r.upvotes DESC, r.created_at DESC
      LIMIT ?
    `).bind(...(userId ? [userId, perfumeId] : [perfumeId]), limit).all();

    return new Response(JSON.stringify({ recommendations: recs.results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch recommendations' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function handleCreateRecommendation(request, env, perfumeId) {
  try {
    const auth = await requireAuth(request, env);
    if (auth.error) return new Response(JSON.stringify({ error: auth.error }), { status: auth.status, headers: { 'Content-Type': 'application/json' } });

    const { recommended_perfume_id, reason } = await request.json();
    if (!recommended_perfume_id) {
      return new Response(JSON.stringify({ error: 'recommended_perfume_id is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (recommended_perfume_id === perfumeId) {
      return new Response(JSON.stringify({ error: 'Cannot recommend the same perfume' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (reason && reason.length > 280) {
      return new Response(JSON.stringify({ error: 'Reason must be 280 characters or less' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Check for duplicates
    const existing = await env.DB.prepare(
      'SELECT id FROM user_recommendations WHERE user_id = ? AND source_perfume_id = ? AND recommended_perfume_id = ?'
    ).bind(auth.userId, perfumeId, recommended_perfume_id).first();
    if (existing) {
      return new Response(JSON.stringify({ error: 'You already recommended this combination' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    const id = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO user_recommendations (id, user_id, source_perfume_id, recommended_perfume_id, reason) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, auth.userId, perfumeId, recommended_perfume_id, reason || null).run();

    return new Response(JSON.stringify({
      recommendation: { id, user_id: auth.userId, source_perfume_id: perfumeId, recommended_perfume_id, reason, upvotes: 0 },
    }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create recommendation' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function handleVoteRecommendation(request, env, recId) {
  try {
    const auth = await requireAuth(request, env);
    if (auth.error) return new Response(JSON.stringify({ error: auth.error }), { status: auth.status, headers: { 'Content-Type': 'application/json' } });

    const { vote } = await request.json();
    if (vote !== 1 && vote !== -1) {
      return new Response(JSON.stringify({ error: 'Vote must be 1 or -1' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const existing = await env.DB.prepare(
      'SELECT vote FROM recommendation_votes WHERE user_id = ? AND recommendation_id = ?'
    ).bind(auth.userId, recId).first();

    if (existing) {
      if (existing.vote === vote) {
        await env.DB.prepare('DELETE FROM recommendation_votes WHERE user_id = ? AND recommendation_id = ?').bind(auth.userId, recId).run();
        await env.DB.prepare('UPDATE user_recommendations SET upvotes = upvotes - ? WHERE id = ?').bind(vote, recId).run();
        return new Response(JSON.stringify({ voted: null }), { headers: { 'Content-Type': 'application/json' } });
      }
      await env.DB.prepare('UPDATE recommendation_votes SET vote = ? WHERE user_id = ? AND recommendation_id = ?').bind(vote, auth.userId, recId).run();
      await env.DB.prepare('UPDATE user_recommendations SET upvotes = upvotes + ? WHERE id = ?').bind(vote * 2, recId).run();
    } else {
      await env.DB.prepare('INSERT INTO recommendation_votes (user_id, recommendation_id, vote) VALUES (?, ?, ?)').bind(auth.userId, recId, vote).run();
      await env.DB.prepare('UPDATE user_recommendations SET upvotes = upvotes + ? WHERE id = ?').bind(vote, recId).run();
    }

    return new Response(JSON.stringify({ voted: vote }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to vote on recommendation' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
