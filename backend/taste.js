// Taste Twins (User Affinity Matching) API routes for FragBase
import { requireAuth } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Get taste twins for the authenticated user
export async function handleGetTasteTwins(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 20);

    // Get current user's data
    const [userWishlists, userReviews, userAccords] = await env.DB.batch([
      env.DB.prepare(
        'SELECT perfume_id, list_type FROM wishlists WHERE user_id = ?'
      ).bind(auth.userId),
      env.DB.prepare(
        'SELECT perfume_id, rating FROM reviews WHERE user_id = ?'
      ).bind(auth.userId),
      env.DB.prepare(
        'SELECT perfume_id, accord_name, strength FROM accord_votes WHERE user_id = ?'
      ).bind(auth.userId),
    ]);

    const myPerfumeIds = new Set(userWishlists.results.map(w => w.perfume_id));
    const myOwnIds = new Set(userWishlists.results.filter(w => w.list_type === 'own').map(w => w.perfume_id));
    const myRatings = {};
    for (const r of userReviews.results) myRatings[r.perfume_id] = r.rating;

    if (myPerfumeIds.size === 0 && userReviews.results.length === 0) {
      return json({ twins: [], message: 'Add perfumes to your collection to find taste twins' });
    }

    // Find other users who have any overlap with our perfumes
    const perfumeList = [...myPerfumeIds].map(() => '?').join(',');
    const otherUsersResult = await env.DB.prepare(
      `SELECT DISTINCT user_id FROM wishlists
       WHERE perfume_id IN (${perfumeList}) AND user_id != ?`
    ).bind(...[...myPerfumeIds], auth.userId).all();

    const candidates = otherUsersResult.results.map(r => r.user_id);
    if (candidates.length === 0) {
      return json({ twins: [] });
    }

    // Score each candidate
    const scores = [];

    for (const candidateId of candidates.slice(0, 50)) {
      const [candWishlists, candReviews] = await env.DB.batch([
        env.DB.prepare(
          'SELECT perfume_id, list_type FROM wishlists WHERE user_id = ?'
        ).bind(candidateId),
        env.DB.prepare(
          'SELECT perfume_id, rating FROM reviews WHERE user_id = ?'
        ).bind(candidateId),
      ]);

      const candPerfumeIds = new Set(candWishlists.results.map(w => w.perfume_id));
      const candOwnIds = new Set(candWishlists.results.filter(w => w.list_type === 'own').map(w => w.perfume_id));

      // Jaccard similarity on collection
      const intersection = [...myPerfumeIds].filter(id => candPerfumeIds.has(id)).length;
      const union = new Set([...myPerfumeIds, ...candPerfumeIds]).size;
      const collectionScore = union > 0 ? intersection / union : 0;

      // Own list overlap (weighted higher)
      const ownIntersection = [...myOwnIds].filter(id => candOwnIds.has(id)).length;
      const ownUnion = new Set([...myOwnIds, ...candOwnIds]).size;
      const ownScore = ownUnion > 0 ? ownIntersection / ownUnion : 0;

      // Rating correlation on shared perfumes
      let ratingScore = 0;
      const candRatings = {};
      for (const r of candReviews.results) candRatings[r.perfume_id] = r.rating;

      const sharedRated = Object.keys(myRatings).filter(pid => candRatings[pid]);
      if (sharedRated.length >= 2) {
        let sumDiff = 0;
        for (const pid of sharedRated) {
          sumDiff += Math.abs(myRatings[pid] - candRatings[pid]);
        }
        // Normalize: max diff per perfume is 4 (5-1), lower diff = higher score
        ratingScore = 1 - (sumDiff / (sharedRated.length * 4));
      }

      // Combined score (weighted)
      const totalScore = (collectionScore * 0.3) + (ownScore * 0.4) + (ratingScore * 0.3);
      const matchPct = Math.round(totalScore * 100);

      if (matchPct >= 5) {
        scores.push({
          user_id: candidateId,
          match_pct: matchPct,
          shared_perfumes: intersection,
          shared_owned: ownIntersection,
          shared_reviews: sharedRated.length,
        });
      }
    }

    // Sort by match percentage
    scores.sort((a, b) => b.match_pct - a.match_pct);
    const topTwins = scores.slice(0, limit);

    // Fetch user details for top twins
    if (topTwins.length === 0) {
      return json({ twins: [] });
    }

    const twins = [];
    for (const twin of topTwins) {
      const user = await env.DB.prepare(
        'SELECT id, display_name, username, avatar_url, bio FROM users WHERE id = ?'
      ).bind(twin.user_id).first();

      if (user) {
        twins.push({
          ...user,
          match_pct: twin.match_pct,
          shared_perfumes: twin.shared_perfumes,
          shared_owned: twin.shared_owned,
          shared_reviews: twin.shared_reviews,
        });
      }
    }

    return json({ twins });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// Get taste match between two users
export async function handleGetTasteMatch(request, env, otherUserId) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const [myWishlists, otherWishlists, myReviews, otherReviews] = await env.DB.batch([
      env.DB.prepare('SELECT perfume_id, list_type FROM wishlists WHERE user_id = ?').bind(auth.userId),
      env.DB.prepare('SELECT perfume_id, list_type FROM wishlists WHERE user_id = ?').bind(otherUserId),
      env.DB.prepare('SELECT perfume_id, rating FROM reviews WHERE user_id = ?').bind(auth.userId),
      env.DB.prepare('SELECT perfume_id, rating FROM reviews WHERE user_id = ?').bind(otherUserId),
    ]);

    const myIds = new Set(myWishlists.results.map(w => w.perfume_id));
    const otherIds = new Set(otherWishlists.results.map(w => w.perfume_id));
    const myOwnIds = new Set(myWishlists.results.filter(w => w.list_type === 'own').map(w => w.perfume_id));
    const otherOwnIds = new Set(otherWishlists.results.filter(w => w.list_type === 'own').map(w => w.perfume_id));

    // Collection Jaccard
    const intersection = [...myIds].filter(id => otherIds.has(id)).length;
    const union = new Set([...myIds, ...otherIds]).size;
    const collectionScore = union > 0 ? intersection / union : 0;

    // Own Jaccard
    const ownIntersection = [...myOwnIds].filter(id => otherOwnIds.has(id)).length;
    const ownUnion = new Set([...myOwnIds, ...otherOwnIds]).size;
    const ownScore = ownUnion > 0 ? ownIntersection / ownUnion : 0;

    // Rating correlation
    const myRatings = {};
    for (const r of myReviews.results) myRatings[r.perfume_id] = r.rating;
    const otherRatings = {};
    for (const r of otherReviews.results) otherRatings[r.perfume_id] = r.rating;

    const sharedRated = Object.keys(myRatings).filter(pid => otherRatings[pid]);
    let ratingScore = 0;
    if (sharedRated.length >= 2) {
      let sumDiff = 0;
      for (const pid of sharedRated) sumDiff += Math.abs(myRatings[pid] - otherRatings[pid]);
      ratingScore = 1 - (sumDiff / (sharedRated.length * 4));
    }

    const totalScore = (collectionScore * 0.3) + (ownScore * 0.4) + (ratingScore * 0.3);
    const matchPct = Math.round(totalScore * 100);

    // Get shared perfume details (up to 6)
    const sharedPerfumeIds = [...myIds].filter(id => otherIds.has(id)).slice(0, 6);
    let sharedPerfumes = [];
    if (sharedPerfumeIds.length > 0) {
      const placeholders = sharedPerfumeIds.map(() => '?').join(',');
      const { results } = await env.DB.prepare(
        `SELECT id, name, brand, image_url FROM perfumes WHERE id IN (${placeholders})`
      ).bind(...sharedPerfumeIds).all();
      sharedPerfumes = results;
    }

    return json({
      match_pct: matchPct,
      shared_perfumes: sharedPerfumes,
      shared_count: intersection,
      shared_owned: ownIntersection,
      shared_reviews: sharedRated.length,
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
