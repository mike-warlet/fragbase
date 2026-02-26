import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config';
import theme from '../theme';

export default function ChatScreen({ route, navigation }) {
  const { userId, userName, userPhoto } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadCurrentUser();
    loadMessages();
    
    // Poll for new messages every 3 seconds
    const interval = setInterval(() => {
      loadMessages(true);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const loadCurrentUser = async () => {
    const userStr = await AsyncStorage.getItem('user');
    const user = JSON.parse(userStr);
    setCurrentUserId(user.id);
  };

  const loadMessages = async (silent = false) => {
    if (!silent) setLoading(true);
    
    try {
      const token = await AsyncStorage.getItem('token');
      const data = await api(`/api/messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(data.messages);
      
      // Scroll to bottom on first load
      if (!silent && data.messages.length > 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: false });
        }, 100);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;
    
    setSending(true);
    const messageText = newMessage.trim();
    setNewMessage('');
    
    try {
      const token = await AsyncStorage.getItem('token');
      await api('/api/messages', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          to_user_id: userId,
          text: messageText,
        }),
      });
      
      // Reload messages
      await loadMessages(true);
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
      // Restore message on error
      setNewMessage(messageText);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </Text>
          </View>
        )}
        <View style={[styles.messageContainer, isMe && styles.messageContainerMe]}>
          <View style={[styles.messageBubble, isMe && styles.messageBubbleMe]}>
            <Text style={[styles.messageText, isMe && styles.messageTextMe]}>
              {item.text}
            </Text>
            <Text style={[styles.messageTime, isMe && styles.messageTimeMe]}>
              {formatTime(item.created_at)}
            </Text>
          </View>
        </View>
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
            <Text style={styles.emptyText}>
              Comece uma conversa com {userName}!
            </Text>
          </View>
        }
        onContentSizeChange={() => {
          if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
          }
        }}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mensagem..."
          placeholderTextColor={theme.colors.textTertiary}
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, (!newMessage.trim() || sending) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!newMessage.trim() || sending}
        >
          <Text style={styles.sendButtonText}>
            {sending ? '⏳' : '📤'}
          </Text>
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
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
    justifyContent: 'flex-start',
  },
  messageContainerMe: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    maxWidth: '75%',
    ...theme.shadows.sm,
  },
  messageBubbleMe: {
    backgroundColor: theme.colors.primary,
  },
  messageText: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  messageTextMe: {
    color: theme.colors.textPrimary,
  },
  messageTime: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  messageTimeMe: {
    color: theme.colors.textSecondary,
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
  sendButtonText: {
    fontSize: 20,
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
