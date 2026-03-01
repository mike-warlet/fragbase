// Layering Suggestions API routes for FragBase
import { requireAuth } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Get layering suggestions for a perfume
export async function handleGetLayeringSuggestions(request, env, perfumeId) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT lc.*,
              p1.name as perfume1_name, p1.brand as perfume1_brand, p1.image_url as perfume1_image,
              p2.name as perfume2_name, p2.brand as perfume2_brand, p2.image_url as perfume2_image,
              u.name as suggested_by_name, u.username as suggested_by_username
       FROM layering_combos lc
       JOIN perfumes p1 ON lc.perfume_id_1 = p1.id
       JOIN perfumes p2 ON lc.perfume_id_2 = p2.id
       JOIN users u ON lc.suggested_by = u.id
       WHERE lc.perfume_id_1 = ? OR lc.perfume_id_2 = ?
       ORDER BY (lc.votes_up - lc.votes_down) DESC, lc.created_at DESC
       LIMIT 20`
    ).bind(perfumeId, perfumeId).all();

    return json({ combos: results });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// Suggest a layering combo
export async function handleCreateLayeringSuggestion(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { perfume_id_1, perfume_id_2, description, occasion } = await request.json();

    if (!perfume_id_1 || !perfume_id_2) {
      return json({ error: 'Two perfume IDs are required' }, 400);
    }
    if (perfume_id_1 === perfume_id_2) {
      return json({ error: 'Cannot layer a perfume with itself' }, 400);
    }

    // Verify both perfumes exist
    const [p1, p2] = await env.DB.batch([
      env.DB.prepare('SELECT id FROM perfumes WHERE id = ?').bind(perfume_id_1),
      env.DB.prepare('SELECT id FROM perfumes WHERE id = ?').bind(perfume_id_2),
    ]);
    if (!p1.results[0] || !p2.results[0]) {
      return json({ error: 'One or both perfumes not found' }, 404);
    }

    // Check for duplicate (either order)
    const existing = await env.DB.prepare(
      `SELECT id FROM layering_combos
       WHERE (perfume_id_1 = ? AND perfume_id_2 = ?) OR (perfume_id_1 = ? AND perfume_id_2 = ?)`
    ).bind(perfume_id_1, perfume_id_2, perfume_id_2, perfume_id_1).first();

    if (existing) {
      return json({ error: 'This combination already exists', combo_id: existing.id }, 409);
    }

    const comboId = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO layering_combos (id, perfume_id_1, perfume_id_2, suggested_by, description, occasion)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(comboId, perfume_id_1, perfume_id_2, auth.userId, description || null, occasion || null).run();

    return json({ combo: { id: comboId, perfume_id_1, perfume_id_2, description, occasion } }, 201);
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// Vote on a layering combo
export async function handleVoteLayeringCombo(request, env, comboId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { vote } = await request.json();
    if (vote !== 1 && vote !== -1) {
      return json({ error: 'Vote must be 1 (upvote) or -1 (downvote)' }, 400);
    }

    // Check combo exists
    const combo = await env.DB.prepare('SELECT id FROM layering_combos WHERE id = ?').bind(comboId).first();
    if (!combo) {
      return json({ error: 'Combo not found' }, 404);
    }

    // Check if already voted
    const existingVote = await env.DB.prepare(
      'SELECT id, vote FROM layering_votes WHERE combo_id = ? AND user_id = ?'
    ).bind(comboId, auth.userId).first();

    if (existingVote) {
      if (existingVote.vote === vote) {
        // Remove vote (toggle off)
        await env.DB.prepare('DELETE FROM layering_votes WHERE id = ?').bind(existingVote.id).run();
        const col = vote === 1 ? 'votes_up' : 'votes_down';
        await env.DB.prepare(
          `UPDATE layering_combos SET ${col} = ${col} - 1 WHERE id = ?`
        ).bind(comboId).run();
        return json({ message: 'Vote removed' });
      } else {
        // Change vote direction
        await env.DB.prepare(
          'UPDATE layering_votes SET vote = ? WHERE id = ?'
        ).bind(vote, existingVote.id).run();
        const addCol = vote === 1 ? 'votes_up' : 'votes_down';
        const subCol = vote === 1 ? 'votes_down' : 'votes_up';
        await env.DB.prepare(
          `UPDATE layering_combos SET ${addCol} = ${addCol} + 1, ${subCol} = ${subCol} - 1 WHERE id = ?`
        ).bind(comboId).run();
        return json({ message: 'Vote changed', vote });
      }
    }

    // New vote
    const voteId = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO layering_votes (id, combo_id, user_id, vote) VALUES (?, ?, ?, ?)'
    ).bind(voteId, comboId, auth.userId, vote).run();

    const col = vote === 1 ? 'votes_up' : 'votes_down';
    await env.DB.prepare(
      `UPDATE layering_combos SET ${col} = ${col} + 1 WHERE id = ?`
    ).bind(comboId).run();

    return json({ message: 'Vote recorded', vote });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// Get top layering combos (global trending)
export async function handleGetTopLayeringCombos(request, env) {
  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);

    const { results } = await env.DB.prepare(
      `SELECT lc.*,
              p1.name as perfume1_name, p1.brand as perfume1_brand, p1.image_url as perfume1_image,
              p2.name as perfume2_name, p2.brand as perfume2_brand, p2.image_url as perfume2_image,
              u.name as suggested_by_name, u.username as suggested_by_username
       FROM layering_combos lc
       JOIN perfumes p1 ON lc.perfume_id_1 = p1.id
       JOIN perfumes p2 ON lc.perfume_id_2 = p2.id
       JOIN users u ON lc.suggested_by = u.id
       ORDER BY (lc.votes_up - lc.votes_down) DESC, lc.created_at DESC
       LIMIT ?`
    ).bind(limit).all();

    return json({ combos: results });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
