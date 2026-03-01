// Push Notifications API routes for FragBase
import { requireAuth } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// ── Register Push Token ──────────────────────────────────────
export async function handleRegisterPushToken(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { token, platform } = await request.json();

    if (!token) return json({ error: 'token is required' }, 400);

    // Upsert token
    const existing = await env.DB.prepare(
      'SELECT id FROM push_tokens WHERE token = ?'
    ).bind(token).first();

    if (existing) {
      await env.DB.prepare(
        'UPDATE push_tokens SET user_id = ?, platform = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).bind(auth.userId, platform || 'expo', existing.id).run();
    } else {
      const id = crypto.randomUUID();
      await env.DB.prepare(
        'INSERT INTO push_tokens (id, user_id, token, platform) VALUES (?, ?, ?, ?)'
      ).bind(id, auth.userId, token, platform || 'expo').run();
    }

    // Ensure notification preferences exist
    await env.DB.prepare(
      'INSERT OR IGNORE INTO notification_preferences (user_id) VALUES (?)'
    ).bind(auth.userId).run();

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Unregister Push Token ────────────────────────────────────
export async function handleUnregisterPushToken(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { token } = await request.json();
    if (!token) return json({ error: 'token is required' }, 400);

    await env.DB.prepare(
      'DELETE FROM push_tokens WHERE token = ? AND user_id = ?'
    ).bind(token, auth.userId).run();

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Get Notification Preferences ─────────────────────────────
export async function handleGetPushPreferences(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    let prefs = await env.DB.prepare(
      'SELECT follows, likes, comments, messages, challenges, badges FROM notification_preferences WHERE user_id = ?'
    ).bind(auth.userId).first();

    if (!prefs) {
      prefs = { follows: 1, likes: 1, comments: 1, messages: 1, challenges: 1, badges: 1 };
    }

    return json({ preferences: prefs });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Update Notification Preferences ──────────────────────────
export async function handleUpdatePushPreferences(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const body = await request.json();
    const fields = ['follows', 'likes', 'comments', 'messages', 'challenges', 'badges'];

    // Ensure row exists
    await env.DB.prepare(
      'INSERT OR IGNORE INTO notification_preferences (user_id) VALUES (?)'
    ).bind(auth.userId).run();

    // Update each field
    for (const field of fields) {
      if (body[field] !== undefined) {
        await env.DB.prepare(
          `UPDATE notification_preferences SET ${field} = ? WHERE user_id = ?`
        ).bind(body[field] ? 1 : 0, auth.userId).run();
      }
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Internal: Send Push Notification ─────────────────────────
export async function sendPushNotification(env, userId, title, body, data = {}) {
  try {
    // Check user preferences
    const prefs = await env.DB.prepare(
      'SELECT * FROM notification_preferences WHERE user_id = ?'
    ).bind(userId).first();

    if (prefs && data.type) {
      const typeMap = {
        follow: 'follows',
        like: 'likes',
        comment: 'comments',
        message: 'messages',
        challenge_update: 'challenges',
        badge_earned: 'badges',
      };
      const prefKey = typeMap[data.type];
      if (prefKey && !prefs[prefKey]) return; // User disabled this type
    }

    // Get user's push tokens
    const { results: tokens } = await env.DB.prepare(
      'SELECT token FROM push_tokens WHERE user_id = ?'
    ).bind(userId).all();

    if (tokens.length === 0) return;

    // Build Expo push messages
    const messages = tokens.map(t => ({
      to: t.token,
      sound: 'default',
      title,
      body,
      data,
    }));

    // Send via Expo Push API
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    const result = await response.json();

    // Clean up invalid tokens
    if (result.data) {
      for (let i = 0; i < result.data.length; i++) {
        const ticket = result.data[i];
        if (ticket.status === 'error' &&
            (ticket.details?.error === 'DeviceNotRegistered' || ticket.details?.error === 'InvalidCredentials')) {
          await env.DB.prepare(
            'DELETE FROM push_tokens WHERE token = ?'
          ).bind(tokens[i].token).run();
        }
      }
    }
  } catch (error) {
    console.error('Push notification error:', error);
  }
}

// ── Internal: Trigger Notification ───────────────────────────
export async function triggerNotification(env, targetUserId, type, actorId, data = {}) {
  try {
    // Get actor info
    const actor = await env.DB.prepare(
      'SELECT COALESCE(display_name, name) as display_name, username FROM users WHERE id = ?'
    ).bind(actorId).first();

    if (!actor) return;
    const name = actor.display_name || actor.username || 'Someone';

    let title, body;

    switch (type) {
      case 'follow':
        title = 'New Follower';
        body = `${name} started following you`;
        break;
      case 'like':
        title = 'New Like';
        body = `${name} liked your ${data.target_type || 'post'}`;
        break;
      case 'comment':
        title = 'New Comment';
        body = `${name} commented on your post`;
        break;
      case 'message':
        title = 'New Message';
        body = `${name} sent you a message`;
        break;
      case 'badge_earned':
        title = 'Badge Earned!';
        body = `You earned the "${data.badge_name}" badge!`;
        break;
      case 'challenge_update':
        title = 'Challenge Update';
        body = `New challenge: ${data.challenge_name}`;
        break;
      default:
        title = 'FragBase';
        body = 'You have a new notification';
    }

    await sendPushNotification(env, targetUserId, title, body, { type, actor_id: actorId, ...data });
  } catch (error) {
    console.error('Trigger notification error:', error);
  }
}
