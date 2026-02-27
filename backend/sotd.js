// SOTD (Scent of the Day) API routes for FragBase
import { requireAuth } from './auth.js';

// Set today's SOTD
export async function handleSetSOTD(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { perfume_id, note, occasion, mood, weather } = await request.json();

    if (!perfume_id) {
      return new Response(JSON.stringify({ error: 'perfume_id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check perfume exists
    const perfume = await env.DB.prepare('SELECT id, name, brand FROM perfumes WHERE id = ?')
      .bind(perfume_id).first();
    if (!perfume) {
      return new Response(JSON.stringify({ error: 'Perfume not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const today = new Date().toISOString().split('T')[0];
    const sotdId = crypto.randomUUID();

    // Upsert SOTD for today (replace if already set)
    await env.DB.prepare(
      `INSERT INTO sotd (id, user_id, perfume_id, note, date, occasion, mood, weather)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, date) DO UPDATE SET perfume_id = ?, note = ?, occasion = ?, mood = ?, weather = ?`
    ).bind(sotdId, auth.userId, perfume_id, note || null, today, occasion || null, mood || null, weather || null,
           perfume_id, note || null, occasion || null, mood || null, weather || null).run();

    // Also create a post of type 'sotd'
    const postId = crypto.randomUUID();
    const sotdText = note
      ? `Perfume do dia: ${perfume.name} by ${perfume.brand} — ${note}`
      : `Perfume do dia: ${perfume.name} by ${perfume.brand}`;

    await env.DB.prepare(
      `INSERT INTO posts (id, user_id, perfume_id, text, type) VALUES (?, ?, ?, ?, 'sotd')`
    ).bind(postId, auth.userId, perfume_id, sotdText).run();

    return new Response(JSON.stringify({
      sotd: { id: sotdId, perfume_id, note, date: today },
      post_id: postId,
    }), {
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

// Get today's SOTD for current user
export async function handleGetMySOTD(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const today = new Date().toISOString().split('T')[0];

    const sotd = await env.DB.prepare(
      `SELECT s.*, p.name as perfume_name, p.brand as perfume_brand,
              p.image_url as perfume_image, p.type as perfume_type
       FROM sotd s
       JOIN perfumes p ON s.perfume_id = p.id
       WHERE s.user_id = ? AND s.date = ?`
    ).bind(auth.userId, today).first();

    return new Response(JSON.stringify({ sotd: sotd || null }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get SOTD feed (today's SOTDs from followed users)
export async function handleGetSOTDFeed(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const today = new Date().toISOString().split('T')[0];

    const { results } = await env.DB.prepare(
      `SELECT s.*, p.name as perfume_name, p.brand as perfume_brand,
              p.image_url as perfume_image, p.type as perfume_type,
              u.name as user_name, u.photo_url as user_photo
       FROM sotd s
       JOIN perfumes p ON s.perfume_id = p.id
       JOIN users u ON s.user_id = u.id
       WHERE s.date = ? AND (
         s.user_id = ? OR s.user_id IN (
           SELECT followed_id FROM follows WHERE follower_id = ?
         )
       )
       ORDER BY s.created_at DESC`
    ).bind(today, auth.userId, auth.userId).all();

    return new Response(JSON.stringify({ sotd_feed: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get SOTD history for a user
export async function handleGetSOTDHistory(request, env, userId) {
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

    const { results } = await env.DB.prepare(
      `SELECT s.*, p.name as perfume_name, p.brand as perfume_brand,
              p.image_url as perfume_image
       FROM sotd s
       JOIN perfumes p ON s.perfume_id = p.id
       WHERE s.user_id = ?
       ORDER BY s.date DESC
       LIMIT ?`
    ).bind(userId, limit).all();

    return new Response(JSON.stringify({ history: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get diary calendar entries for a month
export async function handleGetDiaryCalendar(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get('year') || new Date().getFullYear());
    const month = parseInt(url.searchParams.get('month') || (new Date().getMonth() + 1));

    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-31`;

    const { results } = await env.DB.prepare(
      `SELECT s.*, p.name as perfume_name, p.brand as perfume_brand,
              p.image_url as perfume_image
       FROM sotd s
       JOIN perfumes p ON s.perfume_id = p.id
       WHERE s.user_id = ? AND s.date >= ? AND s.date <= ?
       ORDER BY s.date ASC`
    ).bind(auth.userId, startDate, endDate).all();

    return new Response(JSON.stringify({ entries: results, year, month }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get diary wear stats
export async function handleGetDiaryStats(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const [mostWornResult, totalDaysResult, occasionResult, moodResult, weatherResult, streakResult] = await env.DB.batch([
      // Most worn perfumes
      env.DB.prepare(
        `SELECT p.id, p.name, p.brand, p.image_url, COUNT(*) as wear_count
         FROM sotd s JOIN perfumes p ON s.perfume_id = p.id
         WHERE s.user_id = ?
         GROUP BY s.perfume_id
         ORDER BY wear_count DESC LIMIT 10`
      ).bind(auth.userId),
      // Total days logged
      env.DB.prepare(
        'SELECT COUNT(*) as total_days FROM sotd WHERE user_id = ?'
      ).bind(auth.userId),
      // Occasion breakdown
      env.DB.prepare(
        `SELECT occasion, COUNT(*) as count FROM sotd
         WHERE user_id = ? AND occasion IS NOT NULL
         GROUP BY occasion ORDER BY count DESC`
      ).bind(auth.userId),
      // Mood breakdown
      env.DB.prepare(
        `SELECT mood, COUNT(*) as count FROM sotd
         WHERE user_id = ? AND mood IS NOT NULL
         GROUP BY mood ORDER BY count DESC`
      ).bind(auth.userId),
      // Weather breakdown
      env.DB.prepare(
        `SELECT weather, COUNT(*) as count FROM sotd
         WHERE user_id = ? AND weather IS NOT NULL
         GROUP BY weather ORDER BY count DESC`
      ).bind(auth.userId),
      // Current streak
      env.DB.prepare(
        `SELECT date FROM sotd WHERE user_id = ? ORDER BY date DESC LIMIT 60`
      ).bind(auth.userId),
    ]);

    // Calculate streak
    let streak = 0;
    const dates = streakResult.results.map(r => r.date);
    if (dates.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      let checkDate = today;
      for (const date of dates) {
        if (date === checkDate) {
          streak++;
          const d = new Date(checkDate);
          d.setDate(d.getDate() - 1);
          checkDate = d.toISOString().split('T')[0];
        } else {
          break;
        }
      }
    }

    return new Response(JSON.stringify({
      most_worn: mostWornResult.results,
      total_days: totalDaysResult.results[0]?.total_days || 0,
      streak,
      occasions: occasionResult.results,
      moods: moodResult.results,
      weather: weatherResult.results,
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
