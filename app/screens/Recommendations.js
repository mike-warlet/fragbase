import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows, getAccordColor, getGenderColor } from '../theme';

export default function RecommendationsScreen({ navigation }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setError(null);
    try {
      const data = await apiCall('/api/discovery/recommendations');
      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.error('Error loading recommendations:', err);
      setError('Failed to load recommendations');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRecommendations();
  }, []);

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Error state
  if (error && recommendations.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => { setLoading(true); loadRecommendations(); }}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // No recommendations - prompt to take quiz
  if (recommendations.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyEmoji}>{'\uD83D\uDC43'}</Text>
        <Text style={styles.emptyTitle}>Sem recomendacoes</Text>
        <Text style={styles.emptyText}>
          Completa o quiz de perfil olfativo para receber recomendacoes personalizadas.
        </Text>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('ScentQuiz')}
        >
          <Text style={styles.quizButtonText}>Fazer Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
    >
      <Text style={styles.headerTitle}>Para Ti</Text>
      <Text style={styles.headerSubtitle}>
        Baseado no teu perfil olfativo
      </Text>

      {recommendations.map((item, index) => (
        <TouchableOpacity
          key={item.id || index}
          style={styles.card}
          onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: item.id })}
          activeOpacity={0.7}
        >
          {/* Match score badge */}
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreValue}>{Math.round((item.score || 0) * 100)}%</Text>
            <Text style={styles.scoreLabel}>match</Text>
          </View>

          <View style={styles.cardContent}>
            {/* Image */}
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.perfumeImage} />
            ) : (
              <View style={[styles.perfumeImage, styles.imagePlaceholder]}>
                <Text style={styles.placeholderEmoji}>{'\uD83C\uDF38'}</Text>
              </View>
            )}

            {/* Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

              {/* Meta row */}
              <View style={styles.metaRow}>
                {item.year && <Text style={styles.metaText}>{item.year}</Text>}
                {item.gender && (
                  <View style={[styles.genderBadge, { backgroundColor: getGenderColor(item.gender) + '30' }]}>
                    <Text style={[styles.genderText, { color: getGenderColor(item.gender) }]}>
                      {item.gender === 'masculine' ? 'M' : item.gender === 'feminine' ? 'F' : 'U'}
                    </Text>
                  </View>
                )}
                {item.avg_rating > 0 && (
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingStar}>{'\u2B50'}</Text>
                    <Text style={styles.ratingText}>{Number(item.avg_rating).toFixed(1)}</Text>
                  </View>
                )}
              </View>

              {/* Reason */}
              {item.reason && (
                <Text style={styles.reason} numberOfLines={2}>{item.reason}</Text>
              )}

              {/* Accords */}
              {item.accords && item.accords.length > 0 && (
                <View style={styles.accordsRow}>
                  {item.accords.slice(0, 4).map((accord, i) => {
                    const accordName = typeof accord === 'string' ? accord : accord.name || accord.accord_name;
                    return (
                      <View
                        key={i}
                        style={[styles.accordTag, { backgroundColor: getAccordColor(accordName) + '30' }]}
                      >
                        <Text style={[styles.accordText, { color: getAccordColor(accordName) }]}>
                          {accordName}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  listContent: {
    padding: spacing.lg,
  },

  // Header
  headerTitle: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },

  // Card
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.md,
  },
  cardContent: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  scoreBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    zIndex: 1,
    ...shadows.sm,
  },
  scoreValue: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  scoreLabel: {
    fontSize: typography.small,
    color: colors.textPrimary,
    opacity: 0.8,
  },

  // Image
  perfumeImage: {
    width: 90,
    height: 110,
    borderRadius: borderRadius.lg,
    resizeMode: 'contain',
    backgroundColor: colors.backgroundLight,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 36,
  },

  // Info
  infoContainer: {
    flex: 1,
    paddingRight: spacing.xl,
  },
  brand: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: typography.bold,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  name: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  metaText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  genderBadge: {
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 1,
    borderRadius: borderRadius.sm,
  },
  genderText: {
    fontSize: typography.small,
    fontWeight: typography.bold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingStar: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.semibold,
  },

  // Reason
  reason: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: spacing.xs,
  },

  // Accords
  accordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  accordTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.round,
  },
  accordText: {
    fontSize: typography.small,
    fontWeight: typography.medium,
  },

  // Empty state
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  quizButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  quizButtonText: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },

  // Error state
  errorEmoji: {
    fontSize: 48,
    color: colors.error,
    fontWeight: typography.bold,
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: typography.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
  },
  retryButtonText: {
    fontSize: typography.body + 1,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
});
