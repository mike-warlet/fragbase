import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { apiCall } from '../config';
import { useAuth } from '../AuthContext';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const LEVEL_COLORS = [
  '#808080', // 0 - fallback
  '#b0b0b0', // 1
  '#b0b0b0', // 2
  '#b0b0b0', // 3
  '#b0b0b0', // 4
  '#4a90e2', // 5
  '#4a90e2', // 6
  '#4a90e2', // 7
  '#4a90e2', // 8
  '#4a90e2', // 9
  '#9c27b0', // 10
  '#9c27b0', // 11
  '#9c27b0', // 12
  '#9c27b0', // 13
  '#9c27b0', // 14
  '#ffd700', // 15
  '#ffd700', // 16
  '#ffd700', // 17
  '#ffd700', // 18
  '#ffd700', // 19
  '#ff4500', // 20+
];

function getLevelColor(level) {
  if (level >= 20) return LEVEL_COLORS[20];
  if (level >= 0 && level < LEVEL_COLORS.length) return LEVEL_COLORS[level];
  return LEVEL_COLORS[0];
}

// XP needed for each level: level * 100
function getXpForLevel(level) {
  return level * 100;
}

function getXpProgress(totalXp, level) {
  const currentLevelXp = getXpForLevel(level);
  const nextLevelXp = getXpForLevel(level + 1);
  const xpIntoLevel = totalXp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  if (xpNeeded <= 0) return 1;
  return Math.min(Math.max(xpIntoLevel / xpNeeded, 0), 1);
}

const PODIUM_TROPHIES = ['\uD83E\uDD48', '\uD83C\uDFC6', '\uD83E\uDD49']; // 2nd, 1st, 3rd

export default function LeaderboardScreen({ navigation }) {
  const { user: currentUser } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async (pageNum = 1) => {
    try {
      setError(null);
      const data = await apiCall(`/api/gamification/leaderboard?page=${pageNum}&limit=50`);
      const entries = data.leaderboard || [];
      if (pageNum === 1) {
        setLeaderboard(entries);
      } else {
        setLeaderboard((prev) => [...prev, ...entries]);
      }
      setHasMore(entries.length >= 50);
      setPage(pageNum);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
      setError('Falha ao carregar leaderboard');
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLeaderboard(1);
  }, []);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    fetchLeaderboard(page + 1);
  };

  const handleUserPress = (userId) => {
    navigation.navigate('UserProfile', { userId });
  };

  const currentUserId = currentUser?.id;

  // Split data: top 3 for podium, rest for list
  const podiumEntries = leaderboard.slice(0, 3);
  const listEntries = leaderboard.slice(3);

  // Reorder podium: [2nd, 1st, 3rd]
  const podiumOrder = [];
  if (podiumEntries.length >= 2) podiumOrder.push({ ...podiumEntries[1], rank: 2 });
  if (podiumEntries.length >= 1) podiumOrder.push({ ...podiumEntries[0], rank: 1 });
  if (podiumEntries.length >= 3) podiumOrder.push({ ...podiumEntries[2], rank: 3 });

  const renderAvatar = (user, size) => {
    if (user?.avatar_url) {
      return (
        <Image
          source={{ uri: user.avatar_url }}
          style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
        />
      );
    }
    return (
      <View
        style={[
          styles.avatarPlaceholder,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <Text style={[styles.avatarInitial, { fontSize: size * 0.4 }]}>
          {user?.display_name?.charAt(0).toUpperCase() || '?'}
        </Text>
      </View>
    );
  };

  const renderPodium = () => {
    if (podiumOrder.length === 0) return null;

    return (
      <View style={styles.podiumContainer}>
        {podiumOrder.map((entry) => {
          const isFirst = entry.rank === 1;
          const avatarSize = isFirst ? 80 : 60;
          const isCurrentUser =
            currentUserId && String(entry.user?.id) === String(currentUserId);
          const trophyIdx = entry.rank === 1 ? 1 : entry.rank === 2 ? 0 : 2;

          return (
            <TouchableOpacity
              key={entry.user?.id || entry.rank}
              style={[
                styles.podiumItem,
                isFirst && styles.podiumItemFirst,
              ]}
              onPress={() => entry.user?.id && handleUserPress(entry.user.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.podiumTrophy}>{PODIUM_TROPHIES[trophyIdx]}</Text>
              <View
                style={[
                  styles.podiumAvatarWrap,
                  isCurrentUser && styles.podiumAvatarCurrent,
                  { width: avatarSize + 6, height: avatarSize + 6, borderRadius: (avatarSize + 6) / 2 },
                ]}
              >
                {renderAvatar(entry.user, avatarSize)}
              </View>
              <Text style={styles.podiumName} numberOfLines={1}>
                {entry.user?.display_name || entry.user?.username || 'User'}
              </Text>
              <View style={[styles.levelBadge, { backgroundColor: getLevelColor(entry.level) + '30' }]}>
                <Text style={[styles.levelText, { color: getLevelColor(entry.level) }]}>
                  Lv. {entry.level}
                </Text>
              </View>
              <Text style={styles.podiumXp}>
                {entry.total_xp?.toLocaleString() || 0} XP
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderListItem = ({ item, index }) => {
    const rank = index + 4; // starts after top 3
    const isCurrentUser =
      currentUserId && String(item.user?.id) === String(currentUserId);
    const progress = getXpProgress(item.total_xp || 0, item.level || 1);
    const levelColor = getLevelColor(item.level || 1);

    return (
      <TouchableOpacity
        style={[styles.listItem, isCurrentUser && styles.listItemCurrent]}
        onPress={() => item.user?.id && handleUserPress(item.user.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.rank}>#{rank}</Text>

        {renderAvatar(item.user, 40)}

        <View style={styles.userInfo}>
          <Text style={styles.userName} numberOfLines={1}>
            {item.user?.display_name || item.user?.username || 'User'}
          </Text>
          <View style={styles.userMeta}>
            <View style={[styles.levelBadgeSmall, { backgroundColor: levelColor + '30' }]}>
              <Text style={[styles.levelTextSmall, { color: levelColor }]}>
                Lv. {item.level || 1}
              </Text>
            </View>
            <Text style={styles.badgeCount}>
              {'\uD83C\uDFC5'} {item.badge_count || 0}
            </Text>
          </View>
          <View style={styles.xpBarContainer}>
            <View style={[styles.xpBarFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        <Text style={styles.xpValue}>{item.total_xp?.toLocaleString() || 0}</Text>
        <Text style={styles.xpLabel}>XP</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorEmoji}>{'\u26A0\uFE0F'}</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchLeaderboard(1)}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listEntries}
        keyExtractor={(item, index) => (item.user?.id || index).toString()}
        renderItem={renderListItem}
        contentContainerStyle={leaderboard.length === 0 ? styles.emptyList : styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        ListHeaderComponent={renderPodium}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>{'\uD83C\uDFC6'}</Text>
            <Text style={styles.emptyText}>Leaderboard vazio</Text>
            <Text style={styles.emptySubtext}>
              Ganha XP com badges e sobe no ranking
            </Text>
          </View>
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          ) : null
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
  errorEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: typography.h6,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.round,
  },
  retryText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: typography.semibold,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },

  // Podium
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
    paddingTop: spacing.lg,
  },
  podiumItemFirst: {
    paddingTop: 0,
  },
  podiumTrophy: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  podiumAvatarWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.sm,
  },
  podiumAvatarCurrent: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  podiumName: {
    fontSize: typography.body,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    maxWidth: 100,
  },
  podiumXp: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.semibold,
    marginTop: 2,
  },

  // Level badge
  levelBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.round,
    marginTop: spacing.xs,
  },
  levelText: {
    fontSize: typography.small,
    fontWeight: typography.bold,
  },
  levelBadgeSmall: {
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 1,
    borderRadius: borderRadius.round,
  },
  levelTextSmall: {
    fontSize: typography.small,
    fontWeight: typography.bold,
  },

  // List items
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItemCurrent: {
    backgroundColor: colors.primaryDark + '20',
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  rank: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textTertiary,
    width: 40,
    textAlign: 'center',
  },
  avatar: {
    marginRight: spacing.sm,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarInitial: {
    color: colors.textPrimary,
    fontWeight: typography.bold,
  },
  userInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  userName: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 2,
  },
  badgeCount: {
    fontSize: typography.small,
    color: colors.textTertiary,
  },
  xpBarContainer: {
    height: 4,
    backgroundColor: colors.surfaceLight,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: spacing.xs,
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  xpValue: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    textAlign: 'right',
    minWidth: 50,
  },
  xpLabel: {
    fontSize: typography.small,
    color: colors.textTertiary,
    marginLeft: 2,
  },

  // Footer
  footerLoader: {
    padding: spacing.lg,
    alignItems: 'center',
  },

  // Empty
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
