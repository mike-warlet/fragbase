import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const ICONS = {
  follow: '\uD83D\uDC64',
  post_like: '\u2764\uFE0F',
  comment: '\uD83D\uDCAC',
  review_like: '\u2B50',
};

const MESSAGES = {
  follow: 'começou a seguir-te',
  post_like: 'gostou do teu post',
  comment: 'comentou no teu post',
  review_like: 'gostou da tua review',
};

const NOTIFICATION_ITEM_HEIGHT = 80;

function timeAgo(dateStr) {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return 'agora';
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchNotifications(controller.signal);
    return () => controller.abort();
  }, []);

  const fetchNotifications = async (signal) => {
    try {
      const data = await apiCall('/api/notifications');
      if (signal?.aborted) return;
      setNotifications(data.notifications || []);
    } catch (error) {
      if (signal?.aborted) return;
      console.error('Failed to load notifications:', error);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications();
  }, []);

  const handlePress = (item) => {
    if (item.type === 'follow') {
      navigation.navigate('UserProfile', { userId: item.actor_id });
    } else if (item.target_id) {
      // For post_like and comment, could navigate to post
      // For now navigate to user profile
      navigation.navigate('UserProfile', { userId: item.actor_id });
    }
  };

  const renderNotification = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={styles.notifCard}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.notifIcon}>
        <Text style={styles.iconText}>{ICONS[item.type] || '\uD83D\uDD14'}</Text>
      </View>

      <View style={styles.notifContent}>
        <View style={styles.notifRow}>
          {item.actor_photo ? (
            <Image source={{ uri: item.actor_photo }} style={styles.actorPhoto} />
          ) : (
            <View style={styles.actorPlaceholder}>
              <Text style={styles.actorInitial}>
                {item.actor_name?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.notifTextContainer}>
            <Text style={styles.notifText}>
              <Text style={styles.actorName}>{item.actor_name}</Text>
              {' '}{MESSAGES[item.type] || ''}
            </Text>
            {item.target_text && (
              <Text style={styles.targetText} numberOfLines={1}>
                "{item.target_text}"
              </Text>
            )}
          </View>
        </View>
        <Text style={styles.timeText}>{timeAgo(item.created_at)}</Text>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `${item.type}-${item.actor_id}-${index}`}
        renderItem={renderNotification}
        getItemLayout={(data, index) => ({
          length: NOTIFICATION_ITEM_HEIGHT,
          offset: NOTIFICATION_ITEM_HEIGHT * index,
          index,
        })}
        contentContainerStyle={notifications.length === 0 ? styles.emptyList : undefined}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>{'\uD83D\uDD14'}</Text>
            <Text style={styles.emptyText}>Sem notificações</Text>
            <Text style={styles.emptySubtext}>
              As tuas interações aparecerão aqui
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  iconText: {
    fontSize: 16,
  },
  notifContent: {
    flex: 1,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actorPhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.sm,
  },
  actorPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  actorInitial: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: typography.bold,
  },
  notifTextContainer: {
    flex: 1,
  },
  notifText: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  actorName: {
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  targetText: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
    fontStyle: 'italic',
  },
  timeText: {
    fontSize: typography.small,
    color: colors.textTertiary,
    marginTop: spacing.xs,
    marginLeft: 40,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});
