import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COMPASS_SIZE = SCREEN_WIDTH - spacing.lg * 2;
const DOT_SIZE = 12;
const TOOLTIP_WIDTH = 200;

// Brand color palette for visual differentiation
const BRAND_COLORS = {
  'Dior': '#C4A35A',
  'Chanel': '#1A1A1A',
  'Tom Ford': '#8B4513',
  'Creed': '#2E5B2E',
  'Giorgio Armani': '#4A90E2',
  'Yves Saint Laurent': '#1A1A6C',
  'Versace': '#FFD700',
  'Maison Francis Kurkdjian': '#D4A574',
  'Parfums de Marly': '#6B4423',
  'Dolce & Gabbana': '#C41E3A',
  'Paco Rabanne': '#CC5500',
  'Jean Paul Gaultier': '#FF6B6B',
  'Viktor & Rolf': '#9C27B0',
  'Guerlain': '#8B6914',
  'Le Labo': '#808080',
  'Byredo': '#3A3A60',
  'Nishane': '#5C4033',
  'Amouage': '#D4A574',
  'Maison Margiela': '#B0B0B0',
  'Calvin Klein': '#607D8B',
  'Davidoff': '#4FC3F7',
  'Mugler': '#7B1FA2',
  'Carolina Herrera': '#C41E3A',
  'Hermes': '#FF8C00',
  'Prada': '#1A1A1A',
  'Givenchy': '#2196F3',
  'Burberry': '#D2B48C',
  'Valentino': '#8B0000',
  'Hugo Boss': '#4A4A4A',
  'Escentric Molecules': '#00BCD4',
  'Juliette Has A Gun': '#FF69B4',
  'Lancome': '#FFB6C1',
};

const DEFAULT_BRAND_COLOR = colors.primary;

function getBrandColor(brand) {
  return BRAND_COLORS[brand] || DEFAULT_BRAND_COLOR;
}

export default function ScentCompassScreen({ navigation }) {
  const [perfumes, setPerfumes] = useState([]);
  const [collectionIds, setCollectionIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'collection', 'masculine', 'feminine', 'unisex'
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [compassData, collectionData] = await Promise.allSettled([
        apiCall('/api/perfumes/compass'),
        apiCall('/api/wishlists/me?type=own'),
      ]);

      if (compassData.status === 'fulfilled') {
        setPerfumes(compassData.value.perfumes || []);
      }

      if (collectionData.status === 'fulfilled') {
        const items = collectionData.value.wishlists || collectionData.value || [];
        const ids = new Set(items.map(w => w.perfume_id || w.perfume?.id).filter(Boolean));
        setCollectionIds(ids);
      }
    } catch (error) {
      console.error('Compass load error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  const filteredPerfumes = perfumes.filter(p => {
    if (filter === 'collection') return collectionIds.has(p.id);
    if (filter === 'masculine') return p.gender === 'masculine';
    if (filter === 'feminine') return p.gender === 'feminine';
    if (filter === 'unisex') return p.gender === 'unisex';
    return true;
  });

  // Compute visible brands for legend
  const visibleBrands = [...new Set(filteredPerfumes.map(p => p.brand))].sort();

  const handleDotPress = (perfume) => {
    if (selectedPerfume?.id === perfume.id) {
      setSelectedPerfume(null);
    } else {
      setSelectedPerfume(perfume);
    }
  };

  const handleNavigateToPerfume = () => {
    if (selectedPerfume) {
      navigation.navigate('PerfumeDetail', { perfumeId: selectedPerfume.id });
    }
  };

  // Compute dot position on canvas
  const getDotPosition = (perfume) => {
    const x = perfume.fresh_warm_score * (COMPASS_SIZE - DOT_SIZE);
    const y = (1 - perfume.light_heavy_score) * (COMPASS_SIZE - DOT_SIZE);
    return { x, y };
  };

  // Compute tooltip position to keep it on screen
  const getTooltipPosition = (dotPos) => {
    let left = dotPos.x - TOOLTIP_WIDTH / 2 + DOT_SIZE / 2;
    let top = dotPos.y - 70;

    // Keep within bounds
    if (left < 4) left = 4;
    if (left + TOOLTIP_WIDTH > COMPASS_SIZE - 4) left = COMPASS_SIZE - TOOLTIP_WIDTH - 4;
    if (top < 4) {
      top = dotPos.y + DOT_SIZE + 8;
    }

    return { left, top };
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
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
      {/* Intro text */}
      <View style={styles.intro}>
        <Text style={styles.introTitle}>Bussola Olfativa</Text>
        <Text style={styles.introSubtitle}>
          Visualiza fragancias num mapa 2D. Toca num ponto para ver detalhes.
        </Text>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {[
          { key: 'all', label: 'Todos' },
          { key: 'collection', label: 'Minha Colecao' },
          { key: 'masculine', label: 'Masculino' },
          { key: 'feminine', label: 'Feminino' },
          { key: 'unisex', label: 'Unisex' },
        ].map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
            onPress={() => { setFilter(f.key); setSelectedPerfume(null); }}
          >
            <Text style={[styles.filterChipText, filter === f.key && styles.filterChipTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Count */}
      <Text style={styles.countText}>
        {filteredPerfumes.length} {filteredPerfumes.length === 1 ? 'fragancia' : 'fragancias'}
      </Text>

      {/* Compass Canvas */}
      <View style={styles.compassWrapper}>
        {/* Y-axis label (top) */}
        <Text style={styles.axisLabelTop}>Intenso</Text>

        <View style={styles.compassRow}>
          {/* Y-axis label (left side, rotated via layout) */}
          <View style={styles.yAxisContainer}>
            <Text style={styles.axisLabelVertical}>Intensidade</Text>
          </View>

          <View style={styles.compass}>
            {/* Grid lines */}
            <View style={[styles.gridLineH, { top: '25%' }]} />
            <View style={[styles.gridLineH, { top: '50%' }]} />
            <View style={[styles.gridLineH, { top: '75%' }]} />
            <View style={[styles.gridLineV, { left: '25%' }]} />
            <View style={[styles.gridLineV, { left: '50%' }]} />
            <View style={[styles.gridLineV, { left: '75%' }]} />

            {/* Quadrant labels */}
            <Text style={[styles.quadrantLabel, { top: 8, left: 8 }]}>Fresco + Intenso</Text>
            <Text style={[styles.quadrantLabel, { top: 8, right: 8, textAlign: 'right' }]}>Quente + Intenso</Text>
            <Text style={[styles.quadrantLabel, { bottom: 8, left: 8 }]}>Fresco + Leve</Text>
            <Text style={[styles.quadrantLabel, { bottom: 8, right: 8, textAlign: 'right' }]}>Quente + Leve</Text>

            {/* Dots */}
            {filteredPerfumes.map(perfume => {
              const pos = getDotPosition(perfume);
              const isInCollection = collectionIds.has(perfume.id);
              const isSelected = selectedPerfume?.id === perfume.id;
              const brandColor = getBrandColor(perfume.brand);

              return (
                <TouchableOpacity
                  key={perfume.id}
                  style={[
                    styles.dot,
                    {
                      left: pos.x,
                      top: pos.y,
                      backgroundColor: brandColor,
                      borderColor: isInCollection ? colors.textPrimary : 'transparent',
                      borderWidth: isInCollection ? 2 : 0,
                      width: isSelected ? DOT_SIZE + 4 : DOT_SIZE,
                      height: isSelected ? DOT_SIZE + 4 : DOT_SIZE,
                      borderRadius: (isSelected ? DOT_SIZE + 4 : DOT_SIZE) / 2,
                      zIndex: isSelected ? 100 : (isInCollection ? 10 : 1),
                    },
                    isSelected && styles.dotSelected,
                  ]}
                  onPress={() => handleDotPress(perfume)}
                  activeOpacity={0.7}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                />
              );
            })}

            {/* Tooltip */}
            {selectedPerfume && (() => {
              const dotPos = getDotPosition(selectedPerfume);
              const tooltipPos = getTooltipPosition(dotPos);
              const isInCollection = collectionIds.has(selectedPerfume.id);

              return (
                <TouchableOpacity
                  style={[styles.tooltip, { left: tooltipPos.left, top: tooltipPos.top }]}
                  onPress={handleNavigateToPerfume}
                  activeOpacity={0.8}
                >
                  <View style={styles.tooltipContent}>
                    <View style={[styles.tooltipBrandDot, { backgroundColor: getBrandColor(selectedPerfume.brand) }]} />
                    <View style={styles.tooltipTextContainer}>
                      <Text style={styles.tooltipBrand} numberOfLines={1}>{selectedPerfume.brand}</Text>
                      <Text style={styles.tooltipName} numberOfLines={1}>{selectedPerfume.name}</Text>
                      {selectedPerfume.year && (
                        <Text style={styles.tooltipYear}>{selectedPerfume.year}</Text>
                      )}
                    </View>
                    {isInCollection && (
                      <View style={styles.tooltipCollectionBadge}>
                        <Text style={styles.tooltipCollectionText}>Na colecao</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.tooltipHint}>Toca para ver detalhes</Text>
                </TouchableOpacity>
              );
            })()}
          </View>
        </View>

        {/* Y-axis label (bottom) */}
        <Text style={styles.axisLabelBottom}>Leve</Text>

        {/* X-axis labels */}
        <View style={styles.xAxisRow}>
          <Text style={styles.axisLabelLeft}>Fresco</Text>
          <Text style={styles.axisLabelCenter}>Temperatura</Text>
          <Text style={styles.axisLabelRight}>Quente</Text>
        </View>
      </View>

      {/* Legend toggle */}
      <TouchableOpacity
        style={styles.legendToggle}
        onPress={() => setShowLegend(!showLegend)}
      >
        <Text style={styles.legendToggleText}>
          {showLegend ? 'Esconder legenda' : 'Mostrar legenda de marcas'}
        </Text>
      </TouchableOpacity>

      {/* Legend */}
      {showLegend && (
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Legenda de Marcas</Text>
          <View style={styles.legendGrid}>
            {visibleBrands.map(brand => (
              <View key={brand} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: getBrandColor(brand) }]} />
                <Text style={styles.legendLabel} numberOfLines={1}>{brand}</Text>
              </View>
            ))}
          </View>
          <View style={styles.legendNote}>
            <View style={[styles.legendDot, { backgroundColor: colors.textTertiary, borderWidth: 2, borderColor: colors.textPrimary }]} />
            <Text style={styles.legendLabel}>= Na tua colecao (contorno branco)</Text>
          </View>
        </View>
      )}

      {/* Stats */}
      {filteredPerfumes.length > 0 && (
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Resumo</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {(filteredPerfumes.reduce((sum, p) => sum + (p.fresh_warm_score || 0), 0) / filteredPerfumes.length).toFixed(2)}
              </Text>
              <Text style={styles.statLabel}>Media X</Text>
              <Text style={styles.statDetail}>
                {(filteredPerfumes.reduce((sum, p) => sum + (p.fresh_warm_score || 0), 0) / filteredPerfumes.length) < 0.5
                  ? 'Tendencia fresca'
                  : 'Tendencia quente'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {(filteredPerfumes.reduce((sum, p) => sum + (p.light_heavy_score || 0), 0) / filteredPerfumes.length).toFixed(2)}
              </Text>
              <Text style={styles.statLabel}>Media Y</Text>
              <Text style={styles.statDetail}>
                {(filteredPerfumes.reduce((sum, p) => sum + (p.light_heavy_score || 0), 0) / filteredPerfumes.length) < 0.5
                  ? 'Tendencia leve'
                  : 'Tendencia intensa'}
              </Text>
            </View>
          </View>
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
  },

  // Intro
  intro: {
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  introTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  introSubtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // Filters
  filterRow: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  filterChipTextActive: {
    color: colors.textPrimary,
    fontWeight: typography.bold,
  },

  // Count
  countText: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    fontSize: typography.caption,
    color: colors.textTertiary,
  },

  // Compass
  compassWrapper: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  compassRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yAxisContainer: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  axisLabelVertical: {
    fontSize: typography.small,
    color: colors.textTertiary,
    transform: [{ rotate: '-90deg' }],
    width: 80,
    textAlign: 'center',
  },
  compass: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.md,
  },

  // Grid lines
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border,
    opacity: 0.4,
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: colors.border,
    opacity: 0.4,
  },

  // Quadrant labels
  quadrantLabel: {
    position: 'absolute',
    fontSize: 9,
    color: colors.textTertiary,
    opacity: 0.6,
  },

  // Axis labels
  axisLabelTop: {
    fontSize: typography.caption,
    fontWeight: typography.semibold,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  axisLabelBottom: {
    fontSize: typography.caption,
    fontWeight: typography.semibold,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  xAxisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: COMPASS_SIZE,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  axisLabelLeft: {
    fontSize: typography.caption,
    fontWeight: typography.semibold,
    color: colors.info,
  },
  axisLabelCenter: {
    fontSize: typography.small,
    color: colors.textTertiary,
  },
  axisLabelRight: {
    fontSize: typography.caption,
    fontWeight: typography.semibold,
    color: colors.warning,
  },

  // Dots
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  dotSelected: {
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },

  // Tooltip
  tooltip: {
    position: 'absolute',
    width: TOOLTIP_WIDTH,
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: spacing.sm,
    zIndex: 200,
    ...shadows.lg,
  },
  tooltipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tooltipBrandDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  tooltipTextContainer: {
    flex: 1,
  },
  tooltipBrand: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: typography.bold,
    textTransform: 'uppercase',
  },
  tooltipName: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  tooltipYear: {
    fontSize: typography.small,
    color: colors.textTertiary,
  },
  tooltipCollectionBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  tooltipCollectionText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  tooltipHint: {
    fontSize: typography.small,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },

  // Legend toggle
  legendToggle: {
    alignSelf: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendToggleText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },

  // Legend
  legendContainer: {
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendTitle: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    gap: spacing.xs,
    paddingVertical: 3,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: typography.small,
    color: colors.textSecondary,
    flex: 1,
  },
  legendNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  // Stats
  statsSection: {
    padding: spacing.lg,
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statsTitle: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statValue: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDetail: {
    fontSize: typography.small,
    color: colors.textTertiary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
