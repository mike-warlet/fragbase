// Voting & Wishlist API routes for FragBase
import { requireAuth, authenticate } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// ── Note Votes ──────────────────────────────────────────────

export async function handleNoteVote(request, env, perfumeId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { note_name, note_layer, intensity } = await request.json();

    if (!note_name || !note_layer) {
      return json({ error: 'note_name and note_layer are required' }, 400);
    }
    if (!['top', 'heart', 'base'].includes(note_layer)) {
      return json({ error: 'note_layer must be top, heart, or base' }, 400);
    }
    if (intensity === undefined || intensity < -1 || intensity > 3) {
      return json({ error: 'intensity must be between -1 and 3' }, 400);
    }

    // Upsert vote
    const existing = await env.DB.prepare(
      'SELECT id FROM note_votes WHERE perfume_id = ? AND user_id = ? AND note_name = ?'
    ).bind(perfumeId, auth.userId, note_name).first();

    if (existing) {
      await env.DB.prepare(
        'UPDATE note_votes SET intensity = ?, note_layer = ? WHERE id = ?'
      ).bind(intensity, note_layer, existing.id).run();
    } else {
      const id = crypto.randomUUID();
      await env.DB.prepare(
        'INSERT INTO note_votes (id, perfume_id, user_id, note_name, note_layer, intensity) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(id, perfumeId, auth.userId, note_name, note_layer, intensity).run();
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function handleGetNoteVotes(request, env, perfumeId) {
  try {
    // Get aggregated community votes
    const { results: communityVotes } = await env.DB.prepare(
      `SELECT note_name, note_layer,
              ROUND(AVG(intensity), 1) as avg_intensity,
              COUNT(*) as vote_count
       FROM note_votes WHERE perfume_id = ?
       GROUP BY note_name, note_layer
       ORDER BY note_layer, avg_intensity DESC`
    ).bind(perfumeId).all();

    // Get user's own votes if authenticated
    let userVotes = [];
    const user = await authenticate(request, env);
    if (user) {
      const { results } = await env.DB.prepare(
        'SELECT note_name, note_layer, intensity FROM note_votes WHERE perfume_id = ? AND user_id = ?'
      ).bind(perfumeId, user.id).all();
      userVotes = results;
    }

    // Group by layer
    const notes = { top: [], heart: [], base: [] };
    for (const v of communityVotes) {
      notes[v.note_layer]?.push({
        name: v.note_name,
        avg_intensity: v.avg_intensity,
        vote_count: v.vote_count,
      });
    }

    return json({ notes, user_votes: userVotes });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Accord Votes ────────────────────────────────────────────

export async function handleAccordVote(request, env, perfumeId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { accord_name, strength } = await request.json();

    if (!accord_name) return json({ error: 'accord_name is required' }, 400);
    if (strength === undefined || strength < 0 || strength > 5) {
      return json({ error: 'strength must be between 0 and 5' }, 400);
    }

    const existing = await env.DB.prepare(
      'SELECT id FROM accord_votes WHERE perfume_id = ? AND user_id = ? AND accord_name = ?'
    ).bind(perfumeId, auth.userId, accord_name).first();

    if (existing) {
      await env.DB.prepare(
        'UPDATE accord_votes SET strength = ? WHERE id = ?'
      ).bind(strength, existing.id).run();
    } else {
      const id = crypto.randomUUID();
      await env.DB.prepare(
        'INSERT INTO accord_votes (id, perfume_id, user_id, accord_name, strength) VALUES (?, ?, ?, ?, ?)'
      ).bind(id, perfumeId, auth.userId, accord_name, strength).run();
    }

    // Also ensure the accord exists in perfume_accords
    const accordExists = await env.DB.prepare(
      'SELECT id FROM perfume_accords WHERE perfume_id = ? AND accord_name = ?'
    ).bind(perfumeId, accord_name).first();
    if (!accordExists) {
      await env.DB.prepare(
        'INSERT INTO perfume_accords (id, perfume_id, accord_name) VALUES (?, ?, ?)'
      ).bind(crypto.randomUUID(), perfumeId, accord_name).run();
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function handleGetAccordVotes(request, env, perfumeId) {
  try {
    const { results: communityVotes } = await env.DB.prepare(
      `SELECT accord_name,
              ROUND(AVG(strength), 1) as avg_strength,
              COUNT(*) as vote_count
       FROM accord_votes WHERE perfume_id = ?
       GROUP BY accord_name
       ORDER BY avg_strength DESC`
    ).bind(perfumeId).all();

    let userVotes = [];
    const user = await authenticate(request, env);
    if (user) {
      const { results } = await env.DB.prepare(
        'SELECT accord_name, strength FROM accord_votes WHERE perfume_id = ? AND user_id = ?'
      ).bind(perfumeId, user.id).all();
      userVotes = results;
    }

    return json({ accords: communityVotes, user_votes: userVotes });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Performance Votes ───────────────────────────────────────

export async function handlePerformanceVote(request, env, perfumeId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { longevity, sillage } = await request.json();

    if (longevity !== undefined && (longevity < 1 || longevity > 10)) {
      return json({ error: 'longevity must be between 1 and 10' }, 400);
    }
    if (sillage !== undefined && (sillage < 1 || sillage > 10)) {
      return json({ error: 'sillage must be between 1 and 10' }, 400);
    }

    const existing = await env.DB.prepare(
      'SELECT id FROM performance_votes WHERE perfume_id = ? AND user_id = ?'
    ).bind(perfumeId, auth.userId).first();

    if (existing) {
      await env.DB.prepare(
        'UPDATE performance_votes SET longevity = COALESCE(?, longevity), sillage = COALESCE(?, sillage) WHERE id = ?'
      ).bind(longevity || null, sillage || null, existing.id).run();
    } else {
      const id = crypto.randomUUID();
      await env.DB.prepare(
        'INSERT INTO performance_votes (id, perfume_id, user_id, longevity, sillage) VALUES (?, ?, ?, ?, ?)'
      ).bind(id, perfumeId, auth.userId, longevity || null, sillage || null).run();
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function handleGetPerformanceVotes(request, env, perfumeId) {
  try {
    const stats = await env.DB.prepare(
      `SELECT ROUND(AVG(longevity), 1) as avg_longevity,
              ROUND(AVG(sillage), 1) as avg_sillage,
              COUNT(*) as vote_count
       FROM performance_votes WHERE perfume_id = ?`
    ).bind(perfumeId).first();

    let userVote = null;
    const user = await authenticate(request, env);
    if (user) {
      userVote = await env.DB.prepare(
        'SELECT longevity, sillage FROM performance_votes WHERE perfume_id = ? AND user_id = ?'
      ).bind(perfumeId, user.id).first();
    }

    return json({ performance: stats, user_vote: userVote });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Season Votes ────────────────────────────────────────────

export async function handleSeasonVote(request, env, perfumeId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { spring, summer, fall, winter, day, night } = await request.json();

    const existing = await env.DB.prepare(
      'SELECT id FROM season_votes WHERE perfume_id = ? AND user_id = ?'
    ).bind(perfumeId, auth.userId).first();

    if (existing) {
      await env.DB.prepare(
        `UPDATE season_votes SET spring = ?, summer = ?, fall = ?, winter = ?, day = ?, night = ? WHERE id = ?`
      ).bind(spring ? 1 : 0, summer ? 1 : 0, fall ? 1 : 0, winter ? 1 : 0, day ? 1 : 0, night ? 1 : 0, existing.id).run();
    } else {
      const id = crypto.randomUUID();
      await env.DB.prepare(
        'INSERT INTO season_votes (id, perfume_id, user_id, spring, summer, fall, winter, day, night) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(id, perfumeId, auth.userId, spring ? 1 : 0, summer ? 1 : 0, fall ? 1 : 0, winter ? 1 : 0, day ? 1 : 0, night ? 1 : 0).run();
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function handleGetSeasonVotes(request, env, perfumeId) {
  try {
    const stats = await env.DB.prepare(
      `SELECT SUM(spring) as spring, SUM(summer) as summer,
              SUM(fall) as fall, SUM(winter) as winter,
              SUM(day) as day, SUM(night) as night, COUNT(*) as total
       FROM season_votes WHERE perfume_id = ?`
    ).bind(perfumeId).first();

    let userVote = null;
    const user = await authenticate(request, env);
    if (user) {
      userVote = await env.DB.prepare(
        'SELECT spring, summer, fall, winter, day, night FROM season_votes WHERE perfume_id = ? AND user_id = ?'
      ).bind(perfumeId, user.id).first();
    }

    return json({ seasons: stats, user_vote: userVote });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Similar Perfumes (with dupe/upgrade detection) ─────────

export async function handleGetSimilarPerfumes(request, env, perfumeId) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'similar'; // similar | dupe | upgrade

    // 1. Load the source perfume with all the data we need for scoring
    const perfume = await env.DB.prepare(
      `SELECT id, name, brand, year, gender, accords,
              fresh_warm_score, light_heavy_score,
              notes_top, notes_heart, notes_base
       FROM perfumes WHERE id = ?`
    ).bind(perfumeId).first();

    if (!perfume) return json({ error: 'Perfume not found' }, 404);

    // Get source perfume average rating
    const srcRating = await env.DB.prepare(
      'SELECT ROUND(AVG(rating), 1) as avg_rating FROM reviews WHERE perfume_id = ?'
    ).bind(perfumeId).first();
    const sourceAvgRating = srcRating?.avg_rating || 0;

    // Parse the source accords (stored as JSON array string or comma-separated)
    let sourceAccords = [];
    if (perfume.accords) {
      try {
        const parsed = JSON.parse(perfume.accords);
        sourceAccords = Array.isArray(parsed)
          ? parsed.map(a => (typeof a === 'string' ? a : a.name || '').toLowerCase().trim()).filter(Boolean)
          : [];
      } catch {
        sourceAccords = perfume.accords.split(',').map(a => a.toLowerCase().trim()).filter(Boolean);
      }
    }

    // Also pull accords from community votes if the denormalized column is sparse
    if (sourceAccords.length === 0) {
      const { results: votedAccords } = await env.DB.prepare(
        `SELECT accord_name FROM accord_votes
         WHERE perfume_id = ? GROUP BY accord_name HAVING AVG(strength) >= 2
         ORDER BY AVG(strength) DESC`
      ).bind(perfumeId).all();
      sourceAccords = votedAccords.map(a => a.accord_name.toLowerCase().trim());
    }

    // Also pull accords from perfume_accords table as fallback
    if (sourceAccords.length === 0) {
      const { results: paRows } = await env.DB.prepare(
        'SELECT accord_name FROM perfume_accords WHERE perfume_id = ?'
      ).bind(perfumeId).all();
      sourceAccords = paRows.map(a => a.accord_name.toLowerCase().trim());
    }

    // 2. Fetch all candidate perfumes (excluding self) with their ratings
    const { results: candidates } = await env.DB.prepare(
      `SELECT p.id, p.name, p.brand, p.year, p.gender, p.image_url, p.accords,
              p.fresh_warm_score, p.light_heavy_score,
              (SELECT ROUND(AVG(r.rating), 1) FROM reviews r WHERE r.perfume_id = p.id) as avg_rating
       FROM perfumes p
       WHERE p.id != ?`
    ).bind(perfumeId).all();

    // 3. Score each candidate
    const scored = [];
    for (const c of candidates) {
      // Parse candidate accords
      let candAccords = [];
      if (c.accords) {
        try {
          const parsed = JSON.parse(c.accords);
          candAccords = Array.isArray(parsed)
            ? parsed.map(a => (typeof a === 'string' ? a : a.name || '').toLowerCase().trim()).filter(Boolean)
            : [];
        } catch {
          candAccords = c.accords.split(',').map(a => a.toLowerCase().trim()).filter(Boolean);
        }
      }

      // --- Shared accords score (40%) ---
      const sharedAccords = sourceAccords.filter(a => candAccords.includes(a));
      const accordScore = sourceAccords.length > 0
        ? sharedAccords.length / sourceAccords.length
        : 0;

      // --- Same brand bonus (10%) ---
      const brandScore = (perfume.brand || '').toLowerCase() === (c.brand || '').toLowerCase() ? 1.0 : 0;

      // --- Same gender (20%) ---
      let genderScore = 0;
      if (perfume.gender && c.gender) {
        if (perfume.gender === c.gender) {
          genderScore = 1.0;
        } else if (perfume.gender === 'unisex' || c.gender === 'unisex') {
          genderScore = 0.5;
        }
      }

      // --- Close year (10%) ---
      let yearScore = 0;
      if (perfume.year && c.year) {
        const diff = Math.abs(perfume.year - c.year);
        yearScore = Math.max(0, 1 - diff / 30); // within 30 years scales linearly
      }

      // --- Compass proximity (20%) ---
      let compassScore = 0;
      if (perfume.fresh_warm_score != null && c.fresh_warm_score != null &&
          perfume.light_heavy_score != null && c.light_heavy_score != null) {
        const dx = perfume.fresh_warm_score - c.fresh_warm_score;
        const dy = perfume.light_heavy_score - c.light_heavy_score;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Max distance on a 0-1 grid is sqrt(2) ~ 1.414
        compassScore = Math.max(0, 1 - distance / 1.414);
      }

      // Weighted total
      const similarity_score = Math.round(
        (accordScore * 0.40 +
         brandScore * 0.10 +
         genderScore * 0.20 +
         yearScore * 0.10 +
         compassScore * 0.20) * 100
      );

      scored.push({
        id: c.id,
        name: c.name,
        brand: c.brand,
        year: c.year,
        image_url: c.image_url,
        avg_rating: c.avg_rating || 0,
        similarity_score,
        shared_accords: sharedAccords,
      });
    }

    // 4. Filter by type
    let filtered;
    if (type === 'dupe') {
      // Dupes: high similarity, different brand (cheaper alternatives)
      filtered = scored.filter(s =>
        s.similarity_score >= 30 &&
        s.brand.toLowerCase() !== (perfume.brand || '').toLowerCase()
      );
    } else if (type === 'upgrade') {
      // Upgrades: similar scent profile but higher rated
      filtered = scored.filter(s =>
        s.similarity_score >= 30 &&
        s.avg_rating > sourceAvgRating
      );
    } else {
      // Similar: all with decent similarity
      filtered = scored.filter(s => s.similarity_score >= 20);
    }

    // 5. Sort by similarity score desc and take top 10
    filtered.sort((a, b) => b.similarity_score - a.similarity_score);
    const top = filtered.slice(0, 10);

    return json({ similar: top });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Wishlists ───────────────────────────────────────────────

export async function handleAddToWishlist(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { perfume_id, list_type } = await request.json();

    if (!perfume_id || !list_type) {
      return json({ error: 'perfume_id and list_type are required' }, 400);
    }
    if (!['own', 'want', 'tried'].includes(list_type)) {
      return json({ error: 'list_type must be own, want, or tried' }, 400);
    }

    // Check if already exists
    const existing = await env.DB.prepare(
      'SELECT id FROM wishlists WHERE user_id = ? AND perfume_id = ? AND list_type = ?'
    ).bind(auth.userId, perfume_id, list_type).first();

    if (existing) {
      return json({ error: 'Already in list' }, 409);
    }

    const id = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO wishlists (id, user_id, perfume_id, list_type) VALUES (?, ?, ?, ?)'
    ).bind(id, auth.userId, perfume_id, list_type).run();

    return json({ success: true, list_type }, 201);
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function handleRemoveFromWishlist(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { perfume_id, list_type } = await request.json();

    if (!perfume_id || !list_type) {
      return json({ error: 'perfume_id and list_type are required' }, 400);
    }

    await env.DB.prepare(
      'DELETE FROM wishlists WHERE user_id = ? AND perfume_id = ? AND list_type = ?'
    ).bind(auth.userId, perfume_id, list_type).run();

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function handleGetMyWishlists(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    let query = `SELECT w.*, p.name as perfume_name, p.brand as perfume_brand, p.image_url as perfume_image
                 FROM wishlists w
                 JOIN perfumes p ON w.perfume_id = p.id
                 WHERE w.user_id = ?`;
    const params = [auth.userId];

    if (type && ['own', 'want', 'tried'].includes(type)) {
      query += ' AND w.list_type = ?';
      params.push(type);
    }

    query += ' ORDER BY w.created_at DESC';

    const { results } = await env.DB.prepare(query).bind(...params).all();

    return json({ wishlists: results });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

export async function handleGetWishlistStatus(request, env, perfumeId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { results } = await env.DB.prepare(
      'SELECT list_type FROM wishlists WHERE user_id = ? AND perfume_id = ?'
    ).bind(auth.userId, perfumeId).all();

    const status = { own: false, want: false, tried: false };
    for (const row of results) {
      status[row.list_type] = true;
    }

    // Get counts for this perfume
    const { results: counts } = await env.DB.prepare(
      'SELECT list_type, COUNT(*) as count FROM wishlists WHERE perfume_id = ? GROUP BY list_type'
    ).bind(perfumeId).all();

    const perfumeCounts = { own: 0, want: 0, tried: 0 };
    for (const row of counts) {
      perfumeCounts[row.list_type] = row.count;
    }

    return json({ status, counts: perfumeCounts });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
