// WebSocket hook for real-time chat in FragBase
import { useEffect, useRef, useState, useCallback } from 'react';
import { AppState } from 'react-native';
import { useAuth } from './AuthContext';
import { API_URL } from './config';

const WS_URL = API_URL.replace('https://', 'wss://').replace('http://', 'ws://');

export function useWebSocket(otherUserId) {
  const { user, token } = useAuth();
  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);
  const pingTimer = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const [isOtherOnline, setIsOtherOnline] = useState(false);
  const handlersRef = useRef({});
  const typingTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    if (!user?.id || !otherUserId || !token) return;

    // Generate consistent room ID (sorted user IDs)
    const roomId = [user.id, otherUserId].sort().join('-');
    const wsUrl = `${WS_URL}/api/ws/${roomId}?userId=${user.id}&token=${token}`;

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        // Start ping interval to keep connection alive
        pingTimer.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'new_message':
              handlersRef.current.onMessage?.(data.message);
              break;
            case 'typing':
              if (data.user_id === otherUserId) {
                setIsOtherTyping(true);
                // Auto-clear typing after 3 seconds
                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = setTimeout(() => setIsOtherTyping(false), 3000);
              }
              break;
            case 'stop_typing':
              if (data.user_id === otherUserId) {
                setIsOtherTyping(false);
              }
              break;
            case 'user_online':
              if (data.user_id === otherUserId) setIsOtherOnline(true);
              break;
            case 'user_offline':
              if (data.user_id === otherUserId) setIsOtherOnline(false);
              break;
            case 'messages_read':
              handlersRef.current.onRead?.(data);
              break;
            case 'reaction':
              handlersRef.current.onReaction?.(data);
              break;
            case 'pong':
              // Connection alive
              break;
          }
        } catch (e) {
          // Ignore parse errors
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        clearInterval(pingTimer.current);
        // Reconnect after 3 seconds
        reconnectTimer.current = setTimeout(connect, 3000);
      };

      ws.onerror = () => {
        ws.close();
      };

      wsRef.current = ws;
    } catch (error) {
      // WebSocket not available, fall back to polling
      console.log('WebSocket connection failed, using polling fallback');
    }
  }, [user?.id, otherUserId, token]);

  useEffect(() => {
    connect();

    // Handle app state changes
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
          connect();
        }
      }
    });

    return () => {
      clearTimeout(reconnectTimer.current);
      clearInterval(pingTimer.current);
      clearTimeout(typingTimeoutRef.current);
      subscription?.remove();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  const sendMessage = useCallback((text) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        to_user_id: otherUserId,
        text,
      }));
      return true;
    }
    return false; // Fall back to REST API
  }, [otherUserId]);

  const sendTyping = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'typing' }));
    }
  }, []);

  const sendStopTyping = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'stop_typing' }));
    }
  }, []);

  const markAsRead = useCallback((fromUserId) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'read', from_user_id: fromUserId }));
    }
  }, []);

  const sendReaction = useCallback((messageId, emoji) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'reaction', message_id: messageId, emoji }));
    }
  }, []);

  const setHandlers = useCallback((handlers) => {
    handlersRef.current = handlers;
  }, []);

  return {
    isConnected,
    isOtherTyping,
    isOtherOnline,
    sendMessage,
    sendTyping,
    sendStopTyping,
    markAsRead,
    sendReaction,
    setHandlers,
  };
}
