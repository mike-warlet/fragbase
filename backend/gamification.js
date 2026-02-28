// Gamification API routes for FragBase
import { requireAuth, authenticate } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// XP required for each level: level * 100 * (level - 1) / 2
// Level 1: 0, Level 2: 100, Level 3: 300, Level 4: 600, Level 5: 1000, etc.
function xpForLevel(level) {
  return level * 100 * (level - 1) / 2;
}

// Calculate level from total XP
function levelFromXP(totalXP) {
  let level = 1;
  while (xpForLevel(level + 1) <= totalXP) {
    level++;
  }
  return level;
}

// ============================================
// Internal functions (exported for use by other modules)
// ============================================

// Award XP to a user
export async function awardXP(env, userId, amount, source, sourceId) {
  try {
    // Ensure user_xp row exists
    await env.DB.prepare(
      `INSERT OR IGNORE INTO user_xp (user_id, total_xp, level, updated_at)
       VALUES (?, 0, 1, CURRENT_TIMESTAMP)`
    ).bind(userId).run();

    // Record the transaction
    const txId = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO xp_transactions (id, user_id, amount, source, source_id)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(txId, userId, amount, source, sourceId || null).run();

    // Update total XP
    await env.DB.prepare(
      `UPDATE user_xp SET total_xp = total_xp + ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`
    ).bind(amount, userId).run();

    // Recalculate level
    const row = await env.DB.prepare(
      'SELECT total_xp FROM user_xp WHERE user_id = ?'
    ).bind(userId).first();

    const newLevel = levelFromXP(row.total_xp);
    await env.DB.prepare(
      'UPDATE user_xp SET level = ? WHERE user_id = ?'
    ).bind(newLevel, userId).run();

    return { total_xp: row.total_xp, level: newLevel };
  } catch (error) {
    console.error('awardXP error:', error);
    return null;
  }
}

// Update user_stats from actual DB counts
async function refreshUserStats(env, userId) {
  // Count reviews
  const reviewsCount = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM reviews WHERE user_id = ?'
  ).bind(userId).first();

  // Count all votes (accord + note + performance + season)
  const accordVotes = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM accord_votes WHERE user_id = ?'
  ).bind(userId).first();
  const noteVotes = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM note_votes WHERE user_id = ?'
  ).bind(userId).first();
  const perfVotes = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM performance_votes WHERE user_id = ?'
  ).bind(userId).first();
  const seasonVotes = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM season_votes WHERE user_id = ?'
  ).bind(userId).first();
  const totalVotes = (accordVotes?.count || 0) + (noteVotes?.count || 0) +
                     (perfVotes?.count || 0) + (seasonVotes?.count || 0);

  // Count collections
  const collectionsCount = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM collections WHERE user_id = ?'
  ).bind(userId).first();

  // Count followers
  const followersCount = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM follows WHERE followed_id = ?'
  ).bind(userId).first();

  // Count perfumes owned (wishlist type = 'own')
  const perfumesOwned = await env.DB.prepare(
    "SELECT COUNT(*) as count FROM wishlists WHERE user_id = ? AND list_type = 'own'"
  ).bind(userId).first();

  // Count layering suggestions
  const layeringSuggestions = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM layering_combos WHERE suggested_by = ?'
  ).bind(userId).first();

  // Count comments
  const commentsCount = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM comments WHERE user_id = ?'
  ).bind(userId).first();

  // Count distinct brands tried (from wishlists own + tried)
  const brandsTried = await env.DB.prepare(
    `SELECT COUNT(DISTINCT p.brand) as count
     FROM wishlists w JOIN perfumes p ON w.perfume_id = p.id
     WHERE w.user_id = ? AND w.list_type IN ('own', 'tried')`
  ).bind(userId).first();

  // Count challenges joined
  const challengesJoined = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM challenge_entries WHERE user_id = ?'
  ).bind(userId).first();

  // Calculate SOTD streak
  const sotdStreak = await calculateSOTDStreak(env, userId);

  // Upsert user_stats
  await env.DB.prepare(
    `INSERT INTO user_stats (user_id, reviews_count, votes_count, collections_count,
       followers_count, sotd_streak, perfumes_owned, layering_suggestions,
       comments_count, brands_tried, challenges_joined, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(user_id) DO UPDATE SET
       reviews_count = excluded.reviews_count,
       votes_count = excluded.votes_count,
       collections_count = excluded.collections_count,
       followers_count = excluded.followers_count,
       sotd_streak = excluded.sotd_streak,
       perfumes_owned = excluded.perfumes_owned,
       layering_suggestions = excluded.layering_suggestions,
       comments_count = excluded.comments_count,
       brands_tried = excluded.brands_tried,
       challenges_joined = excluded.challenges_joined,
       updated_at = CURRENT_TIMESTAMP`
  ).bind(
    userId,
    reviewsCount?.count || 0,
    totalVotes,
    collectionsCount?.count || 0,
    followersCount?.count || 0,
    sotdStreak,
    perfumesOwned?.count || 0,
    layeringSuggestions?.count || 0,
    commentsCount?.count || 0,
    brandsTried?.count || 0,
    challengesJoined?.count || 0
  ).run();

  return {
    reviews_count: reviewsCount?.count || 0,
    votes_count: totalVotes,
    collections_count: collectionsCount?.count || 0,
    followers_count: followersCount?.count || 0,
    sotd_streak: sotdStreak,
    perfumes_owned: perfumesOwned?.count || 0,
    layering_suggestions: layeringSuggestions?.count || 0,
    comments_count: commentsCount?.count || 0,
    brands_tried: brandsTried?.count || 0,
    challenges_joined: challengesJoined?.count || 0,
  };
}

// Calculate consecutive SOTD days streak ending today
async function calculateSOTDStreak(env, userId) {
  const { results } = await env.DB.prepare(
    `SELECT DISTINCT date(created_at) as day
     FROM sotd WHERE user_id = ?
     ORDER BY day DESC LIMIT 365`
  ).bind(userId).all();

  if (!results || results.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < results.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);
    const expectedStr = expected.toISOString().split('T')[0];

    if (results[i].day === expectedStr) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Check all badges for a user and award new ones
export async function checkBadges(env, userId) {
  try {
    // Refresh stats from real data
    const stats = await refreshUserStats(env, userId);

    // Get all badge definitions
    const { results: allBadges } = await env.DB.prepare(
      'SELECT * FROM badges'
    ).bind().all();

    // Get already earned badge IDs
    const { results: earnedRows } = await env.DB.prepare(
      'SELECT badge_id FROM user_badges_v2 WHERE user_id = ?'
    ).bind(userId).all();
    const earnedSet = new Set(earnedRows.map(r => r.badge_id));

    // Get user info for special badges
    const user = await env.DB.prepare(
      'SELECT created_at FROM users WHERE id = ?'
    ).bind(userId).first();

    // Check for special SOTD time badges
    const nightOwlSOTD = await env.DB.prepare(
      `SELECT id FROM sotd WHERE user_id = ? AND
       CAST(strftime('%H', created_at) AS INTEGER) >= 0 AND
       CAST(strftime('%H', created_at) AS INTEGER) < 5
       LIMIT 1`
    ).bind(userId).first();

    const earlyBirdSOTD = await env.DB.prepare(
      `SELECT id FROM sotd WHERE user_id = ? AND
       CAST(strftime('%H', created_at) AS INTEGER) >= 5 AND
       CAST(strftime('%H', created_at) AS INTEGER) < 7
       LIMIT 1`
    ).bind(userId).first();

    const newlyEarned = [];

    for (const badge of allBadges) {
      // Skip if already earned
      if (earnedSet.has(badge.id)) continue;

      let earned = false;

      // Standard stat-based badges
      const statFields = [
        'reviews_count', 'votes_count', 'collections_count', 'followers_count',
        'sotd_streak', 'challenges_won', 'perfumes_owned', 'layering_suggestions',
        'login_streak', 'comments_count', 'brands_tried', 'challenges_joined'
      ];

      if (statFields.includes(badge.requirement_type)) {
        const currentValue = stats[badge.requirement_type] || 0;
        if (currentValue >= badge.requirement_value) {
          earned = true;
        }
      }

      // Special badge: OG (account created before a specific year)
      if (badge.requirement_type === 'account_before_year' && user) {
        const accountYear = new Date(user.created_at).getFullYear();
        if (accountYear < badge.requirement_value) {
          earned = true;
        }
      }

      // Special badge: Night Owl
      if (badge.requirement_type === 'sotd_night_owl' && nightOwlSOTD) {
        earned = true;
      }

      // Special badge: Early Bird
      if (badge.requirement_type === 'sotd_early_bird' && earlyBirdSOTD) {
        earned = true;
      }

      if (earned) {
        const ubId = crypto.randomUUID();
        await env.DB.prepare(
          `INSERT OR IGNORE INTO user_badges_v2 (id, user_id, badge_id) VALUES (?, ?, ?)`
        ).bind(ubId, userId, badge.id).run();

        // Award XP for earning the badge
        if (badge.xp_reward > 0) {
          await awardXP(env, userId, badge.xp_reward, 'badge', badge.id);
        }

        newlyEarned.push({
          id: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          category: badge.category,
          rarity: badge.rarity,
          xp_reward: badge.xp_reward,
        });
      }
    }

    return newlyEarned;
  } catch (error) {
    console.error('checkBadges error:', error);
    return [];
  }
}

// ============================================
// API Handlers
// ============================================

// GET /api/gamification/badges - All available badges (with earned status for authenticated user)
export async function handleGetAllBadges(request, env) {
  try {
    const auth = await authenticate(request, env);

    const { results: badges } = await env.DB.prepare(
      'SELECT * FROM badges ORDER BY category, requirement_value ASC'
    ).bind().all();

    // If authenticated, mark which badges the user has earned
    let earnedSet = new Set();
    let earnedMap = {};
    if (auth?.id) {
      const { results: earned } = await env.DB.prepare(
        'SELECT badge_id, earned_at FROM user_badges_v2 WHERE user_id = ?'
      ).bind(auth.id).all();
      for (const e of earned) {
        earnedSet.add(e.badge_id);
        earnedMap[e.badge_id] = e.earned_at;
      }
    }

    const badgesWithStatus = badges.map(b => ({
      ...b,
      earned: earnedSet.has(b.id),
      earned_at: earnedMap[b.id] || null,
    }));

    // Group by category
    const categories = {};
    for (const b of badgesWithStatus) {
      if (!categories[b.category]) {
        categories[b.category] = [];
      }
      categories[b.category].push(b);
    }

    return json({ badges: badgesWithStatus, categories });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// GET /api/gamification/badges/:userId - Badges earned by a specific user
export async function handleGetUserBadgesV2(request, env, userId) {
  try {
    // Check user exists
    const user = await env.DB.prepare('SELECT id FROM users WHERE id = ?').bind(userId).first();
    if (!user) return json({ error: 'User not found' }, 404);

    const { results } = await env.DB.prepare(
      `SELECT ub.earned_at, b.*
       FROM user_badges_v2 ub
       JOIN badges b ON ub.badge_id = b.id
       WHERE ub.user_id = ?
       ORDER BY ub.earned_at DESC`
    ).bind(userId).all();

    // Count by rarity
    const counts = { common: 0, rare: 0, epic: 0, legendary: 0 };
    for (const badge of results) {
      counts[badge.rarity] = (counts[badge.rarity] || 0) + 1;
    }

    return json({
      badges: results,
      total: results.length,
      counts,
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// GET /api/gamification/level/:userId - User's XP and level info
export async function handleGetUserLevel(request, env, userId) {
  try {
    // Check user exists
    const user = await env.DB.prepare(
      'SELECT id, username, name, photo_url FROM users WHERE id = ?'
    ).bind(userId).first();
    if (!user) return json({ error: 'User not found' }, 404);

    // Get or create XP record
    let xpRow = await env.DB.prepare(
      'SELECT * FROM user_xp WHERE user_id = ?'
    ).bind(userId).first();

    if (!xpRow) {
      await env.DB.prepare(
        `INSERT OR IGNORE INTO user_xp (user_id, total_xp, level, updated_at)
         VALUES (?, 0, 1, CURRENT_TIMESTAMP)`
      ).bind(userId).run();
      xpRow = { user_id: userId, total_xp: 0, level: 1 };
    }

    const currentLevel = xpRow.level;
    const currentXP = xpRow.total_xp;
    const xpForCurrentLevel = xpForLevel(currentLevel);
    const xpForNextLevel = xpForLevel(currentLevel + 1);
    const xpProgress = currentXP - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;

    // Recent XP transactions
    const { results: recentXP } = await env.DB.prepare(
      `SELECT * FROM xp_transactions WHERE user_id = ?
       ORDER BY created_at DESC LIMIT 20`
    ).bind(userId).all();

    return json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        photo_url: user.photo_url,
      },
      level: currentLevel,
      total_xp: currentXP,
      xp_for_current_level: xpForCurrentLevel,
      xp_for_next_level: xpForNextLevel,
      xp_progress: xpProgress,
      xp_needed: xpNeeded,
      progress_percentage: xpNeeded > 0 ? Math.round((xpProgress / xpNeeded) * 100) : 100,
      recent_xp: recentXP,
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// GET /api/gamification/leaderboard - Top users by XP (paginated)
export async function handleGetLeaderboard(request, env) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;

    const { results } = await env.DB.prepare(
      `SELECT ux.total_xp, ux.level,
              u.id, u.username, u.name, u.photo_url,
              (SELECT COUNT(*) FROM user_badges_v2 WHERE user_id = u.id) as badge_count
       FROM user_xp ux
       JOIN users u ON ux.user_id = u.id
       ORDER BY ux.total_xp DESC, ux.level DESC
       LIMIT ? OFFSET ?`
    ).bind(limit, offset).all();

    // Add rank
    const ranked = results.map((r, i) => ({
      rank: offset + i + 1,
      ...r,
    }));

    const totalCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM user_xp'
    ).bind().first();

    return json({
      leaderboard: ranked,
      page,
      limit,
      total: totalCount?.count || 0,
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// GET /api/gamification/stats - Current user's stats
export async function handleGetMyStats(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    // Refresh stats from real data
    const stats = await refreshUserStats(env, auth.userId);

    // Get XP info
    let xpRow = await env.DB.prepare(
      'SELECT * FROM user_xp WHERE user_id = ?'
    ).bind(auth.userId).first();

    if (!xpRow) {
      xpRow = { total_xp: 0, level: 1 };
    }

    // Get badge count
    const badgeCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM user_badges_v2 WHERE user_id = ?'
    ).bind(auth.userId).first();

    // Get total available badges
    const totalBadges = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM badges'
    ).bind().first();

    return json({
      stats,
      xp: {
        total_xp: xpRow.total_xp,
        level: xpRow.level,
      },
      badges: {
        earned: badgeCount?.count || 0,
        total: totalBadges?.count || 0,
      },
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// POST /api/gamification/check - Trigger badge check for current user
export async function handleCheckBadges(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const newBadges = await checkBadges(env, auth.userId);

    // Get updated level info
    const xpRow = await env.DB.prepare(
      'SELECT total_xp, level FROM user_xp WHERE user_id = ?'
    ).bind(auth.userId).first();

    return json({
      new_badges: newBadges,
      new_badges_count: newBadges.length,
      level: xpRow?.level || 1,
      total_xp: xpRow?.total_xp || 0,
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
