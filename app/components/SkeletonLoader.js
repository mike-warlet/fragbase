import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Base Skeleton Block ──────────────────────────────────────────
// Renders a single animated placeholder rectangle with a pulse effect.

export default function SkeletonLoader({
  width = '100%',
  height = 20,
  borderRadius: customRadius = borderRadius.sm,
  style,
}) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: customRadius,
          backgroundColor: colors.surfaceLight,
          opacity,
        },
        style,
      ]}
    />
  );
}

// ── SkeletonCard ─────────────────────────────────────────────────
// A perfume card shaped skeleton (image placeholder + 2 text lines).
// Designed to match the PerfumeCard component dimensions.

export function SkeletonCard({ style }) {
  const cardWidth = (SCREEN_WIDTH - spacing.md * 3) / 2;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={[skeletonStyles.card, { width: cardWidth }, style]}>
      <Animated.View
        style={[
          skeletonStyles.cardImage,
          { opacity },
        ]}
      />
      <View style={skeletonStyles.cardContent}>
        <Animated.View
          style={[
            skeletonStyles.cardTextLong,
            { opacity },
          ]}
        />
        <Animated.View
          style={[
            skeletonStyles.cardTextShort,
            { opacity },
          ]}
        />
      </View>
    </View>
  );
}

// ── SkeletonList ─────────────────────────────────────────────────
// 5 rows of content (avatar circle + 2 text lines each).

export function SkeletonList({ rows = 5, style }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={[skeletonStyles.listContainer, style]}>
      {Array.from({ length: rows }).map((_, i) => (
        <View key={i} style={skeletonStyles.listRow}>
          <Animated.View
            style={[
              skeletonStyles.listAvatar,
              { opacity },
            ]}
          />
          <View style={skeletonStyles.listTextGroup}>
            <Animated.View
              style={[
                skeletonStyles.listTextLong,
                { opacity },
              ]}
            />
            <Animated.View
              style={[
                skeletonStyles.listTextShort,
                { opacity },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

// ── SkeletonProfile ──────────────────────────────────────────────
// Profile page skeleton (avatar circle + name + stats row).

export function SkeletonProfile({ style }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={[skeletonStyles.profileContainer, style]}>
      {/* Avatar */}
      <Animated.View
        style={[
          skeletonStyles.profileAvatar,
          { opacity },
        ]}
      />
      {/* Name */}
      <Animated.View
        style={[
          skeletonStyles.profileName,
          { opacity },
        ]}
      />
      {/* Username */}
      <Animated.View
        style={[
          skeletonStyles.profileUsername,
          { opacity },
        ]}
      />
      {/* Stats row */}
      <View style={skeletonStyles.profileStatsRow}>
        {[0, 1, 2].map((i) => (
          <Animated.View
            key={i}
            style={[
              skeletonStyles.profileStat,
              { opacity },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

// ── HomeFeedSkeleton ─────────────────────────────────────────────
// 3 post placeholders stacked vertically, each with avatar + text area + image placeholder.

export function HomeFeedSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={skeletonStyles.feedContainer}>
      {/* Filter tabs skeleton */}
      <View style={skeletonStyles.feedFilterRow}>
        {[0, 1, 2].map((i) => (
          <Animated.View
            key={i}
            style={[
              skeletonStyles.feedFilterTab,
              { opacity },
            ]}
          />
        ))}
      </View>

      {/* 3 post card skeletons */}
      {[0, 1, 2].map((i) => (
        <View key={i} style={skeletonStyles.feedPostCard}>
          {/* Avatar + name row */}
          <View style={skeletonStyles.feedPostHeader}>
            <Animated.View
              style={[
                skeletonStyles.feedPostAvatar,
                { opacity },
              ]}
            />
            <View style={skeletonStyles.feedPostHeaderText}>
              <Animated.View
                style={[
                  skeletonStyles.feedPostName,
                  { opacity },
                ]}
              />
              <Animated.View
                style={[
                  skeletonStyles.feedPostDate,
                  { opacity },
                ]}
              />
            </View>
          </View>

          {/* Text lines */}
          <Animated.View
            style={[
              skeletonStyles.feedPostTextLong,
              { opacity },
            ]}
          />
          <Animated.View
            style={[
              skeletonStyles.feedPostTextMedium,
              { opacity },
            ]}
          />

          {/* Image placeholder */}
          <Animated.View
            style={[
              skeletonStyles.feedPostImage,
              { opacity },
            ]}
          />

          {/* Action bar */}
          <View style={skeletonStyles.feedPostActions}>
            <Animated.View
              style={[
                skeletonStyles.feedPostActionBtn,
                { opacity },
              ]}
            />
            <Animated.View
              style={[
                skeletonStyles.feedPostActionBtn,
                { opacity },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

// ── PerfumeDetailSkeleton ────────────────────────────────────────
// Hero image placeholder + title area + rating + sections.

export function PerfumeDetailSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={skeletonStyles.detailContainer}>
      {/* Hero image */}
      <Animated.View
        style={[
          skeletonStyles.detailHero,
          { opacity },
        ]}
      />

      {/* Header info */}
      <View style={skeletonStyles.detailHeader}>
        {/* Brand */}
        <Animated.View
          style={[
            skeletonStyles.detailBrand,
            { opacity },
          ]}
        />
        {/* Name */}
        <Animated.View
          style={[
            skeletonStyles.detailName,
            { opacity },
          ]}
        />
        {/* Meta row */}
        <View style={skeletonStyles.detailMetaRow}>
          <Animated.View
            style={[
              skeletonStyles.detailMetaItem,
              { opacity },
            ]}
          />
          <Animated.View
            style={[
              skeletonStyles.detailMetaItem,
              { opacity },
            ]}
          />
        </View>
      </View>

      {/* Rating section */}
      <View style={skeletonStyles.detailRating}>
        <Animated.View
          style={[
            skeletonStyles.detailRatingNumber,
            { opacity },
          ]}
        />
        <Animated.View
          style={[
            skeletonStyles.detailRatingStars,
            { opacity },
          ]}
        />
      </View>

      {/* Wishlist buttons skeleton */}
      <View style={skeletonStyles.detailWishlistRow}>
        {[0, 1, 2].map((i) => (
          <Animated.View
            key={i}
            style={[
              skeletonStyles.detailWishlistBtn,
              { opacity },
            ]}
          />
        ))}
      </View>

      {/* Section placeholders */}
      {[0, 1].map((i) => (
        <View key={i} style={skeletonStyles.detailSection}>
          <Animated.View
            style={[
              skeletonStyles.detailSectionTitle,
              { opacity },
            ]}
          />
          <View style={skeletonStyles.detailSectionBars}>
            {[0, 1, 2, 3].map((j) => (
              <Animated.View
                key={j}
                style={[
                  skeletonStyles.detailSectionBar,
                  { width: `${80 - j * 15}%`, opacity },
                ]}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

// ── SearchResultsSkeleton ────────────────────────────────────────
// Grid of perfume card skeletons, matching the 2-column layout.

export function SearchResultsSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const cardWidth = (SCREEN_WIDTH - spacing.md * 3) / 2;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={skeletonStyles.searchContainer}>
      {/* Result count placeholder */}
      <Animated.View
        style={[
          skeletonStyles.searchResultCount,
          { opacity },
        ]}
      />

      {/* Grid of card skeletons (3 rows x 2 columns = 6 cards) */}
      {[0, 1, 2].map((row) => (
        <View key={row} style={skeletonStyles.searchRow}>
          {[0, 1].map((col) => (
            <View key={col} style={[skeletonStyles.searchCard, { width: cardWidth }]}>
              <Animated.View
                style={[
                  skeletonStyles.searchCardImage,
                  { opacity },
                ]}
              />
              <View style={skeletonStyles.searchCardContent}>
                <Animated.View
                  style={[
                    skeletonStyles.searchCardTextLong,
                    { opacity },
                  ]}
                />
                <Animated.View
                  style={[
                    skeletonStyles.searchCardTextShort,
                    { opacity },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────────

const skeletonStyles = StyleSheet.create({
  // SkeletonCard
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceLight,
  },
  cardContent: {
    padding: spacing.sm,
    gap: spacing.xs,
  },
  cardTextLong: {
    height: 14,
    width: '80%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },
  cardTextShort: {
    height: 12,
    width: '50%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },

  // SkeletonList
  listContainer: {
    padding: spacing.md,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  listAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceLight,
    marginRight: spacing.md,
  },
  listTextGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  listTextLong: {
    height: 14,
    width: '70%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },
  listTextShort: {
    height: 12,
    width: '45%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },

  // SkeletonProfile
  profileContainer: {
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.md,
  },
  profileName: {
    height: 20,
    width: 160,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.sm,
  },
  profileUsername: {
    height: 14,
    width: 100,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.lg,
  },
  profileStatsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  profileStat: {
    width: 60,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
  },

  // HomeFeedSkeleton
  feedContainer: {
    flex: 1,
    padding: spacing.md,
  },
  feedFilterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  feedFilterTab: {
    width: 60,
    height: 28,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surfaceLight,
  },
  feedPostCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  feedPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  feedPostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    marginRight: spacing.sm,
  },
  feedPostHeaderText: {
    flex: 1,
    gap: spacing.xs,
  },
  feedPostName: {
    height: 14,
    width: '40%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },
  feedPostDate: {
    height: 10,
    width: '25%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },
  feedPostTextLong: {
    height: 14,
    width: '90%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.xs,
  },
  feedPostTextMedium: {
    height: 14,
    width: '65%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.sm,
  },
  feedPostImage: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.sm,
  },
  feedPostActions: {
    flexDirection: 'row',
    gap: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  feedPostActionBtn: {
    width: 50,
    height: 20,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },

  // PerfumeDetailSkeleton
  detailContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailHero: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceLight,
  },
  detailHeader: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailBrand: {
    height: 12,
    width: 80,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.sm,
  },
  detailName: {
    height: 28,
    width: '70%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.sm,
  },
  detailMetaRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  detailMetaItem: {
    height: 14,
    width: 60,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },
  detailRating: {
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  detailRatingNumber: {
    width: 60,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
  },
  detailRatingStars: {
    width: 120,
    height: 16,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },
  detailWishlistRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailWishlistBtn: {
    width: 90,
    height: 36,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceLight,
  },
  detailSection: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailSectionTitle: {
    height: 18,
    width: 140,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.md,
  },
  detailSectionBars: {
    gap: spacing.sm,
  },
  detailSectionBar: {
    height: 24,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
  },

  // SearchResultsSkeleton
  searchContainer: {
    flex: 1,
    padding: spacing.md,
    paddingTop: 0,
  },
  searchResultCount: {
    height: 12,
    width: 140,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.sm,
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  searchCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  searchCardImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceLight,
  },
  searchCardContent: {
    padding: spacing.sm,
    gap: spacing.xs,
  },
  searchCardTextLong: {
    height: 14,
    width: '80%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },
  searchCardTextShort: {
    height: 12,
    width: '50%',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceLight,
  },
});
