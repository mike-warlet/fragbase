import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const ICON_MAP = {
  'spray-can': '\uD83E\uDDF4',
  'flask': '\uD83E\uDDEA',
  'gem': '\uD83D\uDC8E',
  'crown': '\uD83D\uDC51',
  'pencil': '\u270F\uFE0F',
  'book-open': '\uD83D\uDCD6',
  'award': '\uD83C\uDFC5',
  'star': '\u2B50',
  'users': '\uD83D\uDC65',
  'trending-up': '\uD83D\uDCC8',
  'zap': '\u26A1',
  'shield': '\uD83D\uDEE1\uFE0F',
  'thumbs-up': '\uD83D\uDC4D',
  'bar-chart': '\uD83D\uDCCA',
  'eye': '\uD83D\uDC41\uFE0F',
  'sun': '\u2600\uFE0F',
  'calendar': '\uD83D\uDCC5',
  'fire': '\uD83D\uDD25',
  'trophy': '\uD83C\uDFC6',
  'compass': '\uD83E\uDDED',
  'globe': '\uD83C\uDF0D',
  'map': '\uD83D\uDDFA\uFE0F',
  'flag': '\uD83D\uDEA9',
  'medal': '\uD83C\uDF96\uFE0F',
  'layers': '\uD83D\uDCDA',
  'git-merge': '\uD83D\uDD00',
  'message-circle': '\uD83D\uDCAC',
  'message-square': '\uD83D\uDCDD',
  'clock': '\u23F0',
  'moon': '\uD83C\uDF19',
  'sunrise': '\uD83C\uDF05',
  'folder': '\uD83D\uDCC1',
  'archive': '\uD83D\uDDC4\uFE0F',
};

const RARITY_COLORS = {
  common: '#ffffff',
  rare: '#4a90e2',
  epic: '#9c27b0',
  legendary: '#ffd700',
};

const RARITY_LABELS = {
  common: 'Comum',
  rare: 'Raro',
  epic: 'Epico',
  legendary: 'Legendario',
};

function getIcon(iconName) {
  return ICON_MAP[iconName] || '\uD83C\uDFC5';
}

export default function BadgesScreen({ navigation }) {
  const [badges, setBadges] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      setError(null);
      const data = await apiCall('/api/gamification/badges');
      setBadges(data.badges || []);
      setCategories(data.categories || {});
    } catch (err) {
      console.error('Failed to load badges:', err);
      setError('Falha ao carregar badges');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBadges();
  }, []);

  const earnedCount = badges.filter((b) => b.earned).length;
  const totalCount = badges.length;

  // Group badges by category
  const grouped = {};
  for (const badge of badges) {
    const cat = badge.category || 'Outros';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(badge);
  }

  const sections = Object.keys(grouped).map((key) => ({
    title: categories[key] || key,
    key,
    data: grouped[key],
  }));

  const renderBadge = ({ item }) => {
    const rarityColor = RARITY_COLORS[item.rarity] || RARITY_COLORS.common;
    const earned = item.earned;

    return (
      <View
        style={[
          styles.badgeCard,
          earned && styles.badgeCardEarned,
          earned && {
            borderColor: rarityColor,
            borderWidth: 2,
          },
          item.rarity === 'legendary' && earned && styles.badgeCardLegendary,
        ]}
      >
        <View style={[styles.badgeIconContainer, !earned && styles.badgeIconLocked]}>
          <Text style={styles.badgeIcon}>{getIcon(item.icon)}</Text>
          {!earned && (
            <View style={styles.lockOverlay}>
              <Text style={styles.lockIcon}>{'\uD83D\uDD12'}</Text>
            </View>
          )}
        </View>

        <View style={styles.badgeInfo}>
          <View style={styles.badgeHeader}>
            <Text
              style={[styles.badgeName, !earned && styles.badgeNameLocked]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <View style={[styles.rarityBadge, { backgroundColor: rarityColor + '30' }]}>
              <Text style={[styles.rarityText, { color: rarityColor }]}>
                {RARITY_LABELS[item.rarity] || item.rarity}
              </Text>
            </View>
          </View>

          <Text
            style={[styles.badgeDescription, !earned && styles.badgeDescriptionLocked]}
            numberOfLines={2}
          >
            {item.description}
          </Text>

          <View style={styles.badgeFooter}>
            <Text style={styles.xpReward}>+{item.xp_reward} XP</Text>
            {earned && item.earned_at && (
              <Text style={styles.earnedDate}>
                {new Date(item.earned_at).toLocaleDateString('pt-BR')}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>
        {section.data.filter((b) => b.earned).length}/{section.data.length}
      </Text>
    </View>
  );

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
        <TouchableOpacity style={styles.retryButton} onPress={fetchBadges}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Progress header */}
      <View style={styles.progressHeader}>
        <Text style={styles.progressEmoji}>{'\uD83C\uDFC6'}</Text>
        <Text style={styles.progressText}>
          {earnedCount} de {totalCount} badges conquistadas
        </Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBarFill,
              { width: totalCount > 0 ? `${(earnedCount / totalCount) * 100}%` : '0%' },
            ]}
          />
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBadge}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={badges.length === 0 ? styles.emptyList : styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>{'\uD83C\uDFC5'}</Text>
            <Text style={styles.emptyText}>Nenhuma badge disponivel</Text>
            <Text style={styles.emptySubtext}>
              As badges aparecerao aqui quando estiverem disponiveis
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
  progressHeader: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  progressText: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  sectionCount: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.semibold,
  },
  badgeCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  badgeCardEarned: {
    backgroundColor: colors.surface,
  },
  badgeCardLegendary: {
    ...shadows.md,
  },
  badgeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  badgeIconLocked: {
    opacity: 0.4,
  },
  badgeIcon: {
    fontSize: 28,
  },
  lockOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 12,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  badgeName: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  badgeNameLocked: {
    color: colors.textTertiary,
  },
  rarityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.round,
  },
  rarityText: {
    fontSize: typography.small,
    fontWeight: typography.semibold,
  },
  badgeDescription: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  badgeDescriptionLocked: {
    color: colors.textTertiary,
  },
  badgeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  xpReward: {
    fontSize: typography.caption,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  earnedDate: {
    fontSize: typography.small,
    color: colors.textTertiary,
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
