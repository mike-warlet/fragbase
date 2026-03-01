// Community Challenges API routes for FragBase
import { requireAuth, authenticate } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Get active and recent challenges
export async function handleGetChallenges(request, env) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'active';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);

    const today = new Date().toISOString().split('T')[0];

    let query;
    let params;

    if (status === 'active') {
      query = `SELECT c.*, COUNT(ce.id) as entry_count
               FROM challenges c
               LEFT JOIN challenge_entries ce ON c.id = ce.challenge_id
               WHERE c.start_date <= ? AND c.end_date >= ? AND c.status = 'active'
               GROUP BY c.id
               ORDER BY c.end_date ASC
               LIMIT ?`;
      params = [today, today, limit];
    } else {
      query = `SELECT c.*, COUNT(ce.id) as entry_count
               FROM challenges c
               LEFT JOIN challenge_entries ce ON c.id = ce.challenge_id
               WHERE c.end_date < ? OR c.status = 'completed'
               GROUP BY c.id
               ORDER BY c.end_date DESC
               LIMIT ?`;
      params = [today, limit];
    }

    const { results } = await env.DB.prepare(query).bind(...params).all();
    return json({ challenges: results });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// Get challenge details with entries and leaderboard
export async function handleGetChallenge(request, env, challengeId) {
  try {
    const auth = await authenticate(request, env);

    const challenge = await env.DB.prepare(
      'SELECT * FROM challenges WHERE id = ?'
    ).bind(challengeId).first();

    if (!challenge) return json({ error: 'Challenge not found' }, 404);

    // Get entries with vote counts, sorted by votes
    const { results: entries } = await env.DB.prepare(
      `SELECT ce.*, COALESCE(u.display_name, u.name) as display_name, u.username, u.photo_url as avatar_url,
              p.name as perfume_name, p.brand as perfume_brand, p.image_url as perfume_image
       FROM challenge_entries ce
       JOIN users u ON ce.user_id = u.id
       LEFT JOIN perfumes p ON ce.perfume_id = p.id
       ORDER BY ce.votes_count DESC, ce.created_at ASC`
    ).bind().all();

    // Filter to this challenge's entries
    const challengeEntries = entries.filter(e => e.challenge_id === challengeId);

    // Check if current user has entered
    let userEntry = null;
    let userVotes = [];
    if (auth?.userId) {
      userEntry = challengeEntries.find(e => e.user_id === auth.userId) || null;
      const { results: votes } = await env.DB.prepare(
        `SELECT entry_id FROM challenge_votes WHERE user_id = ? AND entry_id IN (
          SELECT id FROM challenge_entries WHERE challenge_id = ?
        )`
      ).bind(auth.userId, challengeId).all();
      userVotes = votes.map(v => v.entry_id);
    }

    return json({
      challenge,
      entries: challengeEntries,
      user_entry: userEntry,
      user_votes: userVotes,
      entry_count: challengeEntries.length,
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// Submit entry to a challenge
export async function handleSubmitEntry(request, env, challengeId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { perfume_id, note, image_url } = await request.json();

    // Check challenge exists and is active
    const challenge = await env.DB.prepare(
      'SELECT * FROM challenges WHERE id = ?'
    ).bind(challengeId).first();

    if (!challenge) return json({ error: 'Challenge not found' }, 404);

    const today = new Date().toISOString().split('T')[0];
    if (today < challenge.start_date || today > challenge.end_date) {
      return json({ error: 'Challenge is not currently active' }, 400);
    }

    // Check if already entered
    const existing = await env.DB.prepare(
      'SELECT id FROM challenge_entries WHERE challenge_id = ? AND user_id = ?'
    ).bind(challengeId, auth.userId).first();

    if (existing) {
      return json({ error: 'You have already entered this challenge' }, 409);
    }

    const entryId = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO challenge_entries (id, challenge_id, user_id, perfume_id, note, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(entryId, challengeId, auth.userId, perfume_id || null, note || null, image_url || null).run();

    // Check badge eligibility: first challenge entry ever
    const entryCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM challenge_entries WHERE user_id = ?'
    ).bind(auth.userId).first();

    if (entryCount.count === 1) {
      await awardBadge(env, auth.userId, 'challenge_first', 'Primeiro Desafio', 'Participou do primeiro desafio');
    } else if (entryCount.count === 5) {
      await awardBadge(env, auth.userId, 'challenge_5', 'Desafiante', 'Participou de 5 desafios');
    } else if (entryCount.count === 20) {
      await awardBadge(env, auth.userId, 'challenge_20', 'Veterano de Desafios', 'Participou de 20 desafios');
    }

    return json({ entry: { id: entryId, challenge_id: challengeId, perfume_id, note } }, 201);
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// Vote on a challenge entry
export async function handleVoteEntry(request, env, entryId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const entry = await env.DB.prepare(
      'SELECT * FROM challenge_entries WHERE id = ?'
    ).bind(entryId).first();

    if (!entry) return json({ error: 'Entry not found' }, 404);

    // Can't vote on your own entry
    if (entry.user_id === auth.userId) {
      return json({ error: 'Cannot vote on your own entry' }, 400);
    }

    // Toggle vote
    const existingVote = await env.DB.prepare(
      'SELECT id FROM challenge_votes WHERE entry_id = ? AND user_id = ?'
    ).bind(entryId, auth.userId).first();

    if (existingVote) {
      await env.DB.prepare('DELETE FROM challenge_votes WHERE id = ?').bind(existingVote.id).run();
      await env.DB.prepare(
        'UPDATE challenge_entries SET votes_count = votes_count - 1 WHERE id = ?'
      ).bind(entryId).run();
      return json({ message: 'Vote removed', voted: false });
    }

    const voteId = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO challenge_votes (id, entry_id, user_id) VALUES (?, ?, ?)'
    ).bind(voteId, entryId, auth.userId).run();
    await env.DB.prepare(
      'UPDATE challenge_entries SET votes_count = votes_count + 1 WHERE id = ?'
    ).bind(entryId).run();

    return json({ message: 'Vote recorded', voted: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// Get user badges
export async function handleGetUserBadges(request, env, userId) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM user_badges WHERE user_id = ? ORDER BY earned_at DESC'
    ).bind(userId).all();

    return json({ badges: results });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// Helper: award a badge (if not already earned)
async function awardBadge(env, userId, badgeType, badgeName, description) {
  const existing = await env.DB.prepare(
    'SELECT id FROM user_badges WHERE user_id = ? AND badge_type = ?'
  ).bind(userId, badgeType).first();

  if (existing) return;

  const badgeId = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO user_badges (id, user_id, badge_type, badge_name, description) VALUES (?, ?, ?, ?, ?)'
  ).bind(badgeId, userId, badgeType, badgeName, description || null).run();
}
