import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function SOTDBanner({ navigation }) {
  const [sotd, setSotd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSOTD();
  }, []);

  const fetchSOTD = async () => {
    try {
      const data = await apiCall('/api/sotd/me');
      setSotd(data.sotd);
    } catch (error) {
      // Silently fail - banner just won't show
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  // No SOTD set today - show prompt
  if (!sotd) {
    return (
      <TouchableOpacity
        style={styles.promptCard}
        onPress={() => navigation.navigate('SOTDPicker')}
        activeOpacity={0.8}
      >
        <Text style={styles.promptEmoji}>{'\uD83D\uDC43'}</Text>
        <View style={styles.promptContent}>
          <Text style={styles.promptTitle}>Qual o teu perfume hoje?</Text>
          <Text style={styles.promptSubtext}>Toca para definir o teu SOTD</Text>
        </View>
        <Text style={styles.promptArrow}>{'\u203A'}</Text>
      </TouchableOpacity>
    );
  }

  // SOTD already set - show it
  return (
    <TouchableOpacity
      style={styles.sotdCard}
      onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: sotd.perfume_id })}
      activeOpacity={0.8}
    >
      <View style={styles.sotdBadge}>
        <Text style={styles.badgeText}>SOTD</Text>
      </View>
      {sotd.perfume_image ? (
        <Image source={{ uri: sotd.perfume_image }} style={styles.perfumeImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderEmoji}>{'\uD83E\uDDF4'}</Text>
        </View>
      )}
      <View style={styles.sotdContent}>
        <Text style={styles.sotdLabel}>Perfume do Dia</Text>
        <Text style={styles.sotdName} numberOfLines={1}>{sotd.perfume_name}</Text>
        <Text style={styles.sotdBrand} numberOfLines={1}>{sotd.perfume_brand}</Text>
      </View>
      {sotd.note && (
        <Text style={styles.sotdNote} numberOfLines={1}>"{sotd.note}"</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  promptEmoji: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  promptContent: {
    flex: 1,
  },
  promptTitle: {
    fontSize: typography.body + 1,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  promptSubtext: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  promptArrow: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: typography.bold,
  },
  sotdCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    ...shadows.sm,
  },
  sotdBadge: {
    position: 'absolute',
    top: -6,
    left: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    zIndex: 1,
  },
  badgeText: {
    fontSize: typography.small,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  perfumeImage: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
  },
  imagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  placeholderEmoji: {
    fontSize: 24,
  },
  sotdContent: {
    flex: 1,
  },
  sotdLabel: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sotdName: {
    fontSize: typography.body + 1,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  sotdBrand: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  sotdNote: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    fontStyle: 'italic',
    maxWidth: 80,
    textAlign: 'right',
  },
});
