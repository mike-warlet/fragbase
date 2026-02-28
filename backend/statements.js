// Statements (micro-reviews) - max 280 chars with tags
import { requireAuth } from './auth.js';

const VALID_TAGS = ['blind_buy', 'compliment_getter', 'office_safe', 'date_night', 'summer_pick', 'winter_pick', 'value_for_money', 'overrated', 'underrated', 'signature_worthy'];

export async function handleGetStatements(request, env, perfumeId) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);
  const offset = (page - 1) * limit;

  let userId = null;
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const { verifyToken } = await import('./auth.js');
    const decoded = await verifyToken(authHeader.substring(7), env.JWT_SECRET);
    if (decoded) userId = decoded.userId;
  }

  const statements = await env.DB.prepare(`
    SELECT s.*, u.username, u.name as user_name, u.photo_url as user_photo,
      ${userId ? `(SELECT vote FROM statement_votes WHERE user_id = ? AND statement_id = s.id) as my_vote` : 'NULL as my_vote'}
    FROM statements s
    JOIN users u ON s.user_id = u.id
    WHERE s.perfume_id = ?
    ORDER BY s.upvotes DESC, s.created_at DESC
    LIMIT ? OFFSET ?
  `).bind(...(userId ? [userId, perfumeId] : [perfumeId]), limit, offset).all();

  return new Response(JSON.stringify({
    statements: statements.results.map(s => ({
      ...s,
      tags: s.tags ? JSON.parse(s.tags) : [],
    })),
  }), { headers: { 'Content-Type': 'application/json' } });
}

export async function handleCreateStatement(request, env, perfumeId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return new Response(JSON.stringify({ error: auth.error }), { status: auth.status, headers: { 'Content-Type': 'application/json' } });

  const { text, rating, tags } = await request.json();
  if (!text || !rating) {
    return new Response(JSON.stringify({ error: 'Text and rating are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (text.length > 280) {
    return new Response(JSON.stringify({ error: 'Statement must be 280 characters or less' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (rating < 1 || rating > 10) {
    return new Response(JSON.stringify({ error: 'Rating must be 1-10' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (tags && !Array.isArray(tags)) {
    return new Response(JSON.stringify({ error: 'Tags must be an array' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  const validTags = tags ? tags.filter(t => VALID_TAGS.includes(t)) : [];

  const id = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO statements (id, user_id, perfume_id, text, rating, tags) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(id, auth.userId, perfumeId, text, rating, validTags.length > 0 ? JSON.stringify(validTags) : null).run();

  return new Response(JSON.stringify({
    statement: { id, user_id: auth.userId, perfume_id: perfumeId, text, rating, tags: validTags, upvotes: 0 },
  }), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

export async function handleVoteStatement(request, env, statementId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return new Response(JSON.stringify({ error: auth.error }), { status: auth.status, headers: { 'Content-Type': 'application/json' } });

  const { vote } = await request.json();
  if (vote !== 1 && vote !== -1) {
    return new Response(JSON.stringify({ error: 'Vote must be 1 or -1' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const existing = await env.DB.prepare(
    'SELECT vote FROM statement_votes WHERE user_id = ? AND statement_id = ?'
  ).bind(auth.userId, statementId).first();

  if (existing) {
    if (existing.vote === vote) {
      // Remove vote
      await env.DB.prepare('DELETE FROM statement_votes WHERE user_id = ? AND statement_id = ?').bind(auth.userId, statementId).run();
      await env.DB.prepare('UPDATE statements SET upvotes = upvotes - ? WHERE id = ?').bind(vote, statementId).run();
      return new Response(JSON.stringify({ voted: null }), { headers: { 'Content-Type': 'application/json' } });
    }
    // Change vote
    await env.DB.prepare('UPDATE statement_votes SET vote = ? WHERE user_id = ? AND statement_id = ?').bind(vote, auth.userId, statementId).run();
    await env.DB.prepare('UPDATE statements SET upvotes = upvotes + ? WHERE id = ?').bind(vote * 2, statementId).run();
  } else {
    await env.DB.prepare('INSERT INTO statement_votes (user_id, statement_id, vote) VALUES (?, ?, ?)').bind(auth.userId, statementId, vote).run();
    await env.DB.prepare('UPDATE statements SET upvotes = upvotes + ? WHERE id = ?').bind(vote, statementId).run();
  }

  return new Response(JSON.stringify({ voted: vote }), { headers: { 'Content-Type': 'application/json' } });
}
