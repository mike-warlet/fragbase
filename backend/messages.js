// Messages API routes for FragBase
import { requireAuth } from './auth.js';

// Get conversations list
export async function handleGetConversations(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Get unique conversations with last message
    const { results } = await env.DB.prepare(
      `SELECT 
        CASE 
          WHEN m.from_user_id = ? THEN m.to_user_id 
          ELSE m.from_user_id 
        END as other_user_id,
        u.name as other_user_name,
        u.photo_url as other_user_photo,
        MAX(m.created_at) as last_message_time,
        (SELECT text FROM messages 
         WHERE (from_user_id = ? AND to_user_id = other_user_id) 
            OR (from_user_id = other_user_id AND to_user_id = ?)
         ORDER BY created_at DESC LIMIT 1) as last_message,
        SUM(CASE WHEN m.to_user_id = ? AND m.is_read = 0 THEN 1 ELSE 0 END) as unread_count
       FROM messages m
       JOIN users u ON u.id = CASE 
         WHEN m.from_user_id = ? THEN m.to_user_id 
         ELSE m.from_user_id 
       END
       WHERE m.from_user_id = ? OR m.to_user_id = ?
       GROUP BY other_user_id, u.name, u.photo_url
       ORDER BY last_message_time DESC`
    ).bind(auth.userId, auth.userId, auth.userId, auth.userId, auth.userId, auth.userId, auth.userId).all();
    
    return new Response(JSON.stringify({ conversations: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get messages with a specific user
export async function handleGetMessages(request, env, otherUserId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);
    
    // Get messages between the two users
    const { results } = await env.DB.prepare(
      `SELECT m.*, 
              sender.name as sender_name, 
              sender.photo_url as sender_photo
       FROM messages m
       JOIN users sender ON m.from_user_id = sender.id
       WHERE (m.from_user_id = ? AND m.to_user_id = ?)
          OR (m.from_user_id = ? AND m.to_user_id = ?)
       ORDER BY m.created_at ASC
       LIMIT ?`
    ).bind(auth.userId, otherUserId, otherUserId, auth.userId, limit).all();
    
    // Mark messages as read
    await env.DB.prepare(
      'UPDATE messages SET is_read = 1 WHERE from_user_id = ? AND to_user_id = ? AND is_read = 0'
    ).bind(otherUserId, auth.userId).run();
    
    return new Response(JSON.stringify({ messages: results }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Send message
export async function handleSendMessage(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { to_user_id, text } = await request.json();
    
    if (!to_user_id || !text?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if recipient exists
    const recipient = await env.DB.prepare('SELECT id FROM users WHERE id = ?').bind(to_user_id).first();
    if (!recipient) {
      return new Response(JSON.stringify({ error: 'Recipient not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const messageId = crypto.randomUUID();
    
    await env.DB.prepare(
      'INSERT INTO messages (id, from_user_id, to_user_id, text, is_read) VALUES (?, ?, ?, ?, 0)'
    ).bind(messageId, auth.userId, to_user_id, text.trim()).run();
    
    // Get message with sender data
    const message = await env.DB.prepare(
      `SELECT m.*, u.name as sender_name, u.photo_url as sender_photo
       FROM messages m
       JOIN users u ON m.from_user_id = u.id
       WHERE m.id = ?`
    ).bind(messageId).first();
    
    return new Response(JSON.stringify({ message }), {
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

// Mark messages as read
export async function handleMarkAsRead(request, env, fromUserId) {
  const auth = await requireAuth(request, env);
  if (auth.error) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    await env.DB.prepare(
      'UPDATE messages SET is_read = 1 WHERE from_user_id = ? AND to_user_id = ?'
    ).bind(fromUserId, auth.userId).run();
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
