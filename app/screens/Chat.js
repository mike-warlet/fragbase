import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import OnlineIndicator from '../components/OnlineIndicator';
import theme from '../theme';

export default function ChatScreen({ route, navigation }) {
  const { userId, userName, userPhoto } = route.params;
  const [messages, setMessages] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const flatListRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const lastTypingSentRef = useRef(0);
  const pollIntervalRef = useRef(1000);

  useEffect(() => {
    loadCurrentUser();
    loadMessages();

    // Set header with online indicator
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Text style={styles.headerName}>{userName}</Text>
          {isOnline && <OnlineIndicator isOnline size={8} />}
        </View>
      ),
    });
  }, [isOnline]);

  // Adaptive polling
  useEffect(() => {
    let timer;
    const poll = async () => {
      await pollStatus();
      await loadNewMessages();
      timer = setTimeout(poll, pollIntervalRef.current);
    };

    // Start polling after initial load
    const startTimer = setTimeout(() => poll(), pollIntervalRef.current);

    // Adaptive interval check
    const activityChecker = setInterval(() => {
      const idle = Date.now() - lastActivityRef.current;
      if (idle > 30000) pollIntervalRef.current = 10000;
      else if (idle > 10000) pollIntervalRef.current = 5000;
      else pollIntervalRef.current = 1000;
    }, 5000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
      clearInterval(activityChecker);
    };
  }, [currentUserId]);

  const loadCurrentUser = async () => {
    const userStr = await AsyncStorage.getItem('user');
    const user = JSON.parse(userStr);
    setCurrentUserId(user.id);
  };

  const loadMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const data = await api(`/api/messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(data.messages);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 100);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadNewMessages = async () => {
    if (!currentUserId || messages.length === 0) return;

    try {
      const token = await AsyncStorage.getItem('token');
      const lastMsg = messages[messages.length - 1];
      const since = lastMsg?.created_at || '1970-01-01';

      const data = await api(`/api/messages/${userId}/new?since=${encodeURIComponent(since)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.messages.length > 0) {
        setMessages(prev => {
          // Filter out temp messages that now have real IDs
          const realIds = new Set(data.messages.map(m => m.id));
          const filtered = prev.filter(m => !m.id.startsWith('temp-') || !realIds.has(m.id));
          return [...filtered, ...data.messages];
        });
        setReactions(data.reactions || []);
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
      }
    } catch (error) {
      // Silent fail for polling
    }
  };

  const pollStatus = async () => {
    if (!currentUserId) return;
    try {
      const token = await AsyncStorage.getItem('token');
      const data = await api(`/api/messages/${userId}/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsTyping(data.is_typing);
      setIsOnline(data.is_online);
    } catch (error) {
      // Silent fail
    }
  };

  const sendTypingIndicator = useCallback(async () => {
    const now = Date.now();
    if (now - lastTypingSentRef.current < 3000) return;
    lastTypingSentRef.current = now;

    try {
      const token = await AsyncStorage.getItem('token');
      await api(`/api/messages/${userId}/typing`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      // Silent fail
    }
  }, [userId]);

  const handleTextChange = (text) => {
    setNewMessage(text);
    lastActivityRef.current = Date.now();
    pollIntervalRef.current = 1000;
    if (text.length > 0) sendTypingIndicator();
  };

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    lastActivityRef.current = Date.now();
    const messageText = newMessage.trim();
    setNewMessage('');

    // Optimistic UI - show message immediately
    const tempId = 'temp-' + Date.now();
    const optimisticMsg = {
      id: tempId,
      from_user_id: currentUserId,
      to_user_id: userId,
      text: messageText,
      created_at: new Date().toISOString(),
      status: 'sending',
    };
    setMessages(prev => [...prev, optimisticMsg]);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);

    try {
      const token = await AsyncStorage.getItem('token');
      const data = await api('/api/messages', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ to_user_id: userId, text: messageText }),
      });

      // Replace temp message with real one
      setMessages(prev => prev.map(m =>
        m.id === tempId ? { ...data.message, status: 'sent' } : m
      ));
    } catch (error) {
      // Mark as failed
      setMessages(prev => prev.map(m =>
        m.id === tempId ? { ...m, status: 'failed' } : m
      ));
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleReact = async (messageId, emoji) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await api(`/api/messages/${messageId}/react`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ emoji }),
      });
      // Optimistic reaction update
      setReactions(prev => [
        ...prev.filter(r => !(r.message_id === messageId && r.user_id === currentUserId)),
        { id: 'temp', message_id: messageId, user_id: currentUserId, emoji },
      ]);
    } catch (error) {
      console.error('Reaction error:', error);
    }
  };

  const renderMessage = ({ item, index }) => {
    const isMe = item.from_user_id === currentUserId;
    const showDate = index === 0 ||
      new Date(item.created_at).toDateString() !== new Date(messages[index - 1].created_at).toDateString();

    return (
      <View>
        {showDate && (
          <View style={styles.dateDivider}>
            <Text style={styles.dateText}>
              {new Date(item.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit', month: 'long', year: 'numeric'
              })}
            </Text>
          </View>
        )}
        <MessageBubble
          message={item}
          isMe={isMe}
          onReact={handleReact}
          reactions={reactions}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Carregando mensagens...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>👋</Text>
            <Text style={styles.emptyText}>Comece uma conversa com {userName}!</Text>
          </View>
        }
        onContentSizeChange={() => {
          if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
          }
        }}
      />

      {/* Typing indicator */}
      {isTyping && <TypingIndicator userName={userName} />}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mensagem..."
          placeholderTextColor={theme.colors.textTertiary}
          value={newMessage}
          onChangeText={handleTextChange}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!newMessage.trim() || sending) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!newMessage.trim() || sending}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerName: {
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textPrimary,
  },
  loadingText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
  },
  messagesList: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  dateDivider: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  dateText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textTertiary,
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendIcon: {
    fontSize: 20,
    color: theme.colors.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingTop: 120,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
});
