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
  Dimensions,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 140;

export default function ExploreScreen({ navigation }) {
  const [sections, setSections] = useState([]);
  const [trending, setTrending] = useState([]);
  const [trendingPeriod, setTrendingPeriod] = useState('week');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [showQuizBanner, setShowQuizBanner] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setError(null);
    try {
      const [exploreData, profileData, trendingData] = await Promise.allSettled([
        apiCall('/api/discovery/explore'),
        apiCall('/api/discovery/profile'),
        apiCall(`/api/perfumes/trending?period=${trendingPeriod}&limit=10`),
      ]);

      if (exploreData.status === 'fulfilled') {
        setSections(exploreData.value.sections || []);
      } else {
        setError('Failed to load explore data');
      }

      if (trendingData.status === 'fulfilled') {
        setTrending(trendingData.value.perfumes || []);
      }

      if (profileData.status === 'fulfilled') {
        const profile = profileData.value;
        setShowQuizBanner(!profile.quiz_completed);
      } else {
        setShowQuizBanner(true);
      }
    } catch (err) {
      console.error('Error loading explore:', err);
      setError('Failed to load explore data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  const changeTrendingPeriod = async (period) => {
    setTrendingPeriod(period);
    try {
      const data = await apiCall(`/api/perfumes/trending?period=${period}&limit=10`);
      setTrending(data.perfumes || []);
    } catch (e) {}
  };

  const renderPerfumeCard = (perfume) => (
    <TouchableOpacity
      key={perfume.id}
      style={styles.perfumeCard}
      onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: perfume.id })}
      activeOpacity={0.7}
    >
      {perfume.image_url ? (
        <Image source={{ uri: perfume.image_url }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, styles.cardImagePlaceholder]}>
          <Text style={styles.cardPlaceholderEmoji}>{'\uD83C\uDF38'}</Text>
        </View>
      )}

      {/* Rating badge */}
      {perfume.avg_rating > 0 && (
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingBadgeStar}>{'\u2B50'}</Text>
          <Text style={styles.ratingBadgeText}>{Number(perfume.avg_rating).toFixed(1)}</Text>
        </View>
      )}

      <View style={styles.cardInfo}>
        <Text style={styles.cardBrand} numberOfLines={1}>{perfume.brand}</Text>
        <Text style={styles.cardName} numberOfLines={2}>{perfume.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (section, index) => (
    <View key={index} style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.subtitle && (
            <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {(section.perfumes || []).map(renderPerfumeCard)}
      </ScrollView>
    </View>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Error state
  if (error && sections.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => { setLoading(true); loadData(); }}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
    >
      {/* Quiz banner */}
      {showQuizBanner && (
        <TouchableOpacity
          style={styles.quizBanner}
          onPress={() => navigation.navigate('ScentQuiz')}
          activeOpacity={0.8}
        >
          <View style={styles.quizBannerContent}>
            <Text style={styles.quizBannerEmoji}>{'\uD83D\uDC43'}</Text>
            <View style={styles.quizBannerText}>
              <Text style={styles.quizBannerTitle}>Descobre o teu perfil olfativo</Text>
              <Text style={styles.quizBannerSubtitle}>
                Responde ao quiz e recebe recomendacoes personalizadas
              </Text>
            </View>
            <Text style={styles.quizBannerArrow}>{'>'}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Scent Compass banner */}
      <TouchableOpacity
        style={styles.compassBanner}
        onPress={() => navigation.navigate('ScentCompass')}
        activeOpacity={0.8}
      >
        <View style={styles.compassBannerContent}>
          <Text style={styles.compassBannerIcon}>{'@'}</Text>
          <View style={styles.compassBannerText}>
            <Text style={styles.compassBannerTitle}>Bussola Olfativa</Text>
            <Text style={styles.compassBannerSubtitle}>
              Explora fragancias num mapa interativo 2D
            </Text>
          </View>
          <Text style={styles.compassBannerArrow}>{'>'}</Text>
        </View>
      </TouchableOpacity>

      {/* Taste Profile banner */}
      <TouchableOpacity
        style={styles.tasteBanner}
        onPress={() => navigation.navigate('TasteProfile')}
        activeOpacity={0.8}
      >
        <View style={styles.compassBannerContent}>
          <Text style={styles.compassBannerIcon}>{'~'}</Text>
          <View style={styles.compassBannerText}>
            <Text style={styles.compassBannerTitle}>Perfil Olfativo</Text>
            <Text style={styles.compassBannerSubtitle}>
              Analisa as tuas preferencias e descobre o teu estilo
            </Text>
          </View>
          <Text style={styles.compassBannerArrow}>{'>'}</Text>
        </View>
      </TouchableOpacity>

      {/* Trending section */}
      {trending.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Em Alta</Text>
              <Text style={styles.sectionSubtitle}>Perfumes mais populares</Text>
            </View>
          </View>
          <View style={styles.trendingPeriods}>
            {[{ key: 'week', label: 'Semana' }, { key: 'month', label: 'Mes' }, { key: 'all', label: 'Sempre' }].map(p => (
              <TouchableOpacity
                key={p.key}
                style={[styles.periodTab, trendingPeriod === p.key && styles.periodTabActive]}
                onPress={() => changeTrendingPeriod(p.key)}
              >
                <Text style={[styles.periodText, trendingPeriod === p.key && styles.periodTextActive]}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {trending.map(renderPerfumeCard)}
          </ScrollView>
        </View>
      )}

      {/* Sections */}
      {sections.map(renderSection)}

      {/* Empty state */}
      {sections.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>{'\uD83D\uDD0D'}</Text>
          <Text style={styles.emptyTitle}>Nada para explorar</Text>
          <Text style={styles.emptyText}>
            Conteudo de exploracao sera exibido aqui em breve.
          </Text>
        </View>
      )}

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

  // Quiz banner
  quizBanner: {
    margin: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  quizBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  quizBannerEmoji: {
    fontSize: 36,
  },
  quizBannerText: {
    flex: 1,
  },
  quizBannerTitle: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  quizBannerSubtitle: {
    fontSize: typography.caption,
    color: colors.textPrimary,
    opacity: 0.85,
    lineHeight: 18,
  },
  quizBannerArrow: {
    fontSize: typography.h4,
    color: colors.textPrimary,
    fontWeight: typography.bold,
    opacity: 0.7,
  },

  // Compass banner
  tasteBanner: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.info,
    overflow: 'hidden',
    ...shadows.sm,
  },
  compassBanner: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: 'hidden',
    ...shadows.sm,
  },
  compassBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  compassBannerIcon: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: typography.bold,
  },
  compassBannerText: {
    flex: 1,
  },
  compassBannerTitle: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  compassBannerSubtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  compassBannerArrow: {
    fontSize: typography.h4,
    color: colors.primary,
    fontWeight: typography.bold,
    opacity: 0.7,
  },

  // Sections
  section: {
    marginBottom: spacing.lg,
  },
  trendingPeriods: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  periodTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
  },
  periodTabActive: {
    backgroundColor: colors.primary,
  },
  periodText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  periodTextActive: {
    color: '#fff',
    fontWeight: typography.semibold,
  },
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Horizontal list
  horizontalList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },

  // Perfume card
  perfumeCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.1,
    resizeMode: 'contain',
    backgroundColor: colors.backgroundLight,
  },
  cardImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPlaceholderEmoji: {
    fontSize: 36,
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    gap: 2,
  },
  ratingBadgeStar: {
    fontSize: 10,
  },
  ratingBadgeText: {
    fontSize: typography.small,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  cardInfo: {
    padding: spacing.sm,
  },
  cardBrand: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: typography.bold,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  cardName: {
    fontSize: typography.caption,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    lineHeight: 16,
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
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
