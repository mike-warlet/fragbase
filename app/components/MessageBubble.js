import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import theme from '../theme';

const QUICK_REACTIONS = ['❤️', '👍', '😂', '😮', '😢'];

export default function MessageBubble({ message, isMe, onReact, reactions = [] }) {
  const [showReactions, setShowReactions] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = () => {
    if (!isMe) return null;
    if (message.status === 'sending') return '🕐';
    if (message.status === 'failed') return '⚠️';
    if (message.read_at) return '✓✓';
    if (message.is_read) return '✓✓';
    return '✓';
  };

  const messageReactions = reactions.filter(r => r.message_id === message.id);

  return (
    <View style={[styles.container, isMe && styles.containerMe]}>
      <Pressable
        onLongPress={() => setShowReactions(!showReactions)}
        style={[styles.bubble, isMe && styles.bubbleMe]}
      >
        <Text style={[styles.text, isMe && styles.textMe]}>
          {message.text}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.time, isMe && styles.timeMe]}>
            {formatTime(message.created_at)}
          </Text>
          {isMe && (
            <Text style={[
              styles.status,
              (message.read_at || message.is_read) && styles.statusRead,
            ]}>
              {getStatusIcon()}
            </Text>
          )}
        </View>
      </Pressable>

      {/* Reactions display */}
      {messageReactions.length > 0 && (
        <View style={[styles.reactionsContainer, isMe && styles.reactionsContainerMe]}>
          {messageReactions.map((r) => (
            <View key={r.id} style={styles.reactionBadge}>
              <Text style={styles.reactionEmoji}>{r.emoji}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Quick reaction picker */}
      {showReactions && (
        <View style={[styles.reactionPicker, isMe && styles.reactionPickerMe]}>
          {QUICK_REACTIONS.map((emoji) => (
            <TouchableOpacity
              key={emoji}
              style={styles.reactionOption}
              onPress={() => {
                onReact(message.id, emoji);
                setShowReactions(false);
              }}
            >
              <Text style={styles.reactionOptionEmoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sm,
    alignItems: 'flex-start',
  },
  containerMe: {
    alignItems: 'flex-end',
  },
  bubble: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    maxWidth: '75%',
    ...theme.shadows.sm,
  },
  bubbleMe: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  textMe: {
    color: theme.colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  time: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
  },
  timeMe: {
    color: theme.colors.textSecondary,
  },
  status: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
  },
  statusRead: {
    color: theme.colors.info,
  },
  reactionsContainer: {
    flexDirection: 'row',
    marginTop: -4,
    marginLeft: theme.spacing.sm,
    gap: 2,
  },
  reactionsContainerMe: {
    marginLeft: 0,
    marginRight: theme.spacing.sm,
  },
  reactionBadge: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  reactionEmoji: {
    fontSize: 12,
  },
  reactionPicker: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xs,
    marginTop: theme.spacing.xs,
    gap: 2,
    ...theme.shadows.md,
  },
  reactionPickerMe: {
    alignSelf: 'flex-end',
  },
  reactionOption: {
    padding: theme.spacing.xs,
  },
  reactionOptionEmoji: {
    fontSize: 22,
  },
});
