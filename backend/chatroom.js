// ChatRoom Durable Object for real-time WebSocket messaging
// Each conversation pair gets its own Durable Object instance

export class ChatRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sessions = new Map(); // userId -> WebSocket
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/websocket') {
      return this.handleWebSocket(request);
    }

    // HTTP endpoint to broadcast a message (called from worker when message is sent via REST)
    if (url.pathname === '/broadcast' && request.method === 'POST') {
      const data = await request.json();
      this.broadcast(data, data.exclude_user_id);
      return new Response('ok');
    }

    return new Response('Not found', { status: 404 });
  }

  handleWebSocket(request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new Response('userId required', { status: 400 });
    }

    // Create WebSocket pair
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    // Accept the WebSocket
    this.state.acceptWebSocket(server, [userId]);
    this.sessions.set(userId, server);

    // Notify others that user came online
    this.broadcast({
      type: 'user_online',
      user_id: userId,
      timestamp: new Date().toISOString(),
    }, userId);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  async webSocketMessage(ws, message) {
    try {
      const data = JSON.parse(message);
      const tags = this.state.getTags(ws);
      const userId = tags?.[0];

      if (!userId) return;

      switch (data.type) {
        case 'typing':
          this.broadcast({
            type: 'typing',
            user_id: userId,
            timestamp: new Date().toISOString(),
          }, userId);
          break;

        case 'stop_typing':
          this.broadcast({
            type: 'stop_typing',
            user_id: userId,
          }, userId);
          break;

        case 'message':
          // Save message to D1 via the env
          if (data.to_user_id && data.text?.trim()) {
            const messageId = crypto.randomUUID();
            await this.env.DB.prepare(
              'INSERT INTO messages (id, from_user_id, to_user_id, text, is_read) VALUES (?, ?, ?, ?, 0)'
            ).bind(messageId, userId, data.to_user_id, data.text.trim()).run();

            const savedMessage = await this.env.DB.prepare(
              `SELECT m.*, u.name as sender_name, u.photo_url as sender_photo
               FROM messages m JOIN users u ON m.from_user_id = u.id
               WHERE m.id = ?`
            ).bind(messageId).first();

            // Broadcast to all connected users in this room
            this.broadcast({
              type: 'new_message',
              message: savedMessage,
            });
          }
          break;

        case 'read':
          // Mark messages as read
          if (data.from_user_id) {
            await this.env.DB.prepare(
              'UPDATE messages SET is_read = 1 WHERE from_user_id = ? AND to_user_id = ? AND is_read = 0'
            ).bind(data.from_user_id, userId).run();

            this.broadcast({
              type: 'messages_read',
              reader_id: userId,
              from_user_id: data.from_user_id,
            });
          }
          break;

        case 'reaction':
          if (data.message_id && data.emoji) {
            const existing = await this.env.DB.prepare(
              'SELECT id FROM message_reactions WHERE message_id = ? AND user_id = ?'
            ).bind(data.message_id, userId).first();

            if (existing) {
              await this.env.DB.prepare(
                'UPDATE message_reactions SET emoji = ? WHERE id = ?'
              ).bind(data.emoji, existing.id).run();
            } else {
              const reactionId = crypto.randomUUID();
              await this.env.DB.prepare(
                'INSERT INTO message_reactions (id, message_id, user_id, emoji) VALUES (?, ?, ?, ?)'
              ).bind(reactionId, data.message_id, userId, data.emoji).run();
            }

            this.broadcast({
              type: 'reaction',
              message_id: data.message_id,
              user_id: userId,
              emoji: data.emoji,
            });
          }
          break;

        case 'ping':
          ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }));
          break;
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  }

  async webSocketClose(ws, code, reason) {
    const tags = this.state.getTags(ws);
    const userId = tags?.[0];

    if (userId) {
      this.sessions.delete(userId);
      this.broadcast({
        type: 'user_offline',
        user_id: userId,
        timestamp: new Date().toISOString(),
      }, userId);
    }

    ws.close(code, reason);
  }

  async webSocketError(ws, error) {
    const tags = this.state.getTags(ws);
    const userId = tags?.[0];
    if (userId) {
      this.sessions.delete(userId);
    }
    console.error('WebSocket error:', error);
  }

  broadcast(data, excludeUserId = null) {
    const message = JSON.stringify(data);
    const webSockets = this.state.getWebSockets();

    for (const ws of webSockets) {
      try {
        const tags = this.state.getTags(ws);
        const wsUserId = tags?.[0];
        if (wsUserId !== excludeUserId) {
          ws.send(message);
        }
      } catch (error) {
        // WebSocket might be closed, ignore
      }
    }
  }
}
