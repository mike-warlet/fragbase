import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows, getAccordColor } from '../theme';

const { width } = Dimensions.get('window');

const SEASON_COLORS = {
  spring: '#8bc34a',
  summer: '#ff9800',
  fall: '#d4a574',
  winter: '#4fc3f7',
};

const SEASON_LABELS = {
  spring: 'Primavera',
  summer: 'Verao',
  fall: 'Outono',
  winter: 'Inverno',
};

const TIME_COLORS = {
  day: '#ffd700',
  night: '#7986cb',
};

export default function CollectionAnalyticsScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const parseNotes = (str) => {
    if (!str) return [];
    return str.split(',').map(n => n.trim()).filter(Boolean);
  };

  const parseAccords = (str) => {
    if (!str) return [];
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        return parsed.map(a => (typeof a === 'string' ? a : a.name || '').trim()).filter(Boolean);
      }
    } catch {}
    return str.split(',').map(a => a.trim()).filter(Boolean);
  };

  const loadStats = async () => {
    try {
      const [wishlists, diaryStats] = await Promise.allSettled([
        apiCall('/api/wishlists/me'),
        apiCall('/api/diary/stats'),
      ]);

      const allWishlists = wishlists.status === 'fulfilled'
        ? (wishlists.value.wishlists || [])
        : [];
      const owned = allWishlists.filter(w => w.list_type === 'own');
      const wanted = allWishlists.filter(w => w.list_type === 'want');
      const tried = allWishlists.filter(w => w.list_type === 'tried');

      // Compute brand distribution from owned
      const brandMap = {};
      owned.forEach(w => {
        const brand = w.perfume_brand || 'Unknown';
        brandMap[brand] = (brandMap[brand] || 0) + 1;
      });
      const brands = Object.entries(brandMap)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));

      // Year / decade distribution
      const yearMap = {};
      owned.forEach(w => {
        const yr = w.perfume_year || 'N/A';
        yearMap[yr] = (yearMap[yr] || 0) + 1;
      });
      const decades = {};
      Object.entries(yearMap).forEach(([yr, count]) => {
        if (yr === 'N/A') return;
        const decade = `${Math.floor(parseInt(yr) / 10) * 10}s`;
        decades[decade] = (decades[decade] || 0) + count;
      });
      const decadeList = Object.entries(decades)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, count]) => ({ name, count }));

      // Note frequency analysis across all owned perfumes
      const noteMap = {};
      owned.forEach(w => {
        const allNotes = [
          ...parseNotes(w.perfume_notes_top),
          ...parseNotes(w.perfume_notes_heart),
          ...parseNotes(w.perfume_notes_base),
        ];
        allNotes.forEach(note => {
          const normalized = note.toLowerCase();
          if (!noteMap[normalized]) {
            noteMap[normalized] = { name: note, count: 0 };
          }
          noteMap[normalized].count += 1;
        });
      });
      const noteFrequency = Object.values(noteMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      // Accord frequency analysis across all owned perfumes
      const accordMap = {};
      owned.forEach(w => {
        const accords = parseAccords(w.perfume_accords);
        accords.forEach(accord => {
          const normalized = accord.toLowerCase();
          if (!accordMap[normalized]) {
            accordMap[normalized] = { name: accord, count: 0 };
          }
          accordMap[normalized].count += 1;
        });
      });
      const accordFrequency = Object.values(accordMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 15);

      // Fetch season vote data for owned perfumes (batch, max 30 to stay performant)
      const perfumeIds = owned.slice(0, 30).map(w => w.perfume_id);
      const seasonResults = await Promise.allSettled(
        perfumeIds.map(id => apiCall(`/api/perfumes/${id}/season/votes`))
      );

      const seasonTotals = { spring: 0, summer: 0, fall: 0, winter: 0 };
      const timeTotals = { day: 0, night: 0 };
      let seasonPerfumeCount = 0;

      seasonResults.forEach(result => {
        if (result.status === 'fulfilled' && result.value.seasons) {
          const s = result.value.seasons;
          const total = s.total || 1;
          if (total > 0) {
            seasonPerfumeCount++;
            // Normalize: a perfume "counts" for a season if more than 30% of voters picked it
            if (s.spring && s.spring / total > 0.3) seasonTotals.spring++;
            if (s.summer && s.summer / total > 0.3) seasonTotals.summer++;
            if (s.fall && s.fall / total > 0.3) seasonTotals.fall++;
            if (s.winter && s.winter / total > 0.3) seasonTotals.winter++;
            if (s.day && s.day / total > 0.3) timeTotals.day++;
            if (s.night && s.night / total > 0.3) timeTotals.night++;
          }
        }
      });

      // Gender distribution
      const genderMap = {};
      owned.forEach(w => {
        const gender = w.perfume_gender || 'unknown';
        genderMap[gender] = (genderMap[gender] || 0) + 1;
      });

      const diary = diaryStats.status === 'fulfilled' ? diaryStats.value : {};

      setStats({
        ownCount: owned.length,
        wantCount: wanted.length,
        triedCount: tried.length,
        totalFragrances: owned.length + tried.length,
        brands,
        decades: decadeList,
        noteFrequency,
        accordFrequency,
        seasonTotals,
        timeTotals,
        seasonPerfumeCount,
        genderMap,
        streak: diary.streak || 0,
        totalDays: diary.total_days || 0,
        mostWorn: diary.most_worn || [],
      });
    } catch (error) {
      console.error('Analytics error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHorizontalBar = (value, max, color, showPct) => {
    const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    return (
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: color || colors.primary }]} />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.emptyText, { marginTop: spacing.md }]}>A carregar analytics...</Text>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Erro ao carregar dados</Text>
      </View>
    );
  }

  const maxBrandCount = stats.brands.length > 0 ? stats.brands[0].count : 1;
  const maxDecadeCount = stats.decades.length > 0 ? Math.max(...stats.decades.map(d => d.count)) : 1;
  const maxSeasonCount = Math.max(
    stats.seasonTotals.spring, stats.seasonTotals.summer,
    stats.seasonTotals.fall, stats.seasonTotals.winter, 1
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Overview Stats Cards */}
      <View style={styles.overviewRow}>
        <View style={[styles.overviewCard, styles.overviewCardHighlight]}>
          <Text style={styles.overviewNum}>{stats.ownCount}</Text>
          <Text style={styles.overviewLabel}>Possuo</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={[styles.overviewNum, { color: colors.warning }]}>{stats.wantCount}</Text>
          <Text style={styles.overviewLabel}>Desejo</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={[styles.overviewNum, { color: colors.info }]}>{stats.triedCount}</Text>
          <Text style={styles.overviewLabel}>Provei</Text>
        </View>
      </View>

      <View style={styles.overviewRow}>
        <View style={styles.overviewCard}>
          <Text style={[styles.overviewNum, { color: colors.success }]}>{stats.streak}</Text>
          <Text style={styles.overviewLabel}>Sequencia</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={[styles.overviewNum, { color: colors.primaryLight }]}>{stats.totalDays}</Text>
          <Text style={styles.overviewLabel}>Dias SOTD</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={[styles.overviewNum, { color: colors.textPrimary }]}>{stats.brands.length}</Text>
          <Text style={styles.overviewLabel}>Marcas</Text>
        </View>
      </View>

      {/* Brand Distribution - Horizontal Bar Chart */}
      {stats.brands.length > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{'{ }'}</Text>
            <Text style={styles.sectionTitle}>Top Marcas na Colecao</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            {stats.brands.length} {stats.brands.length === 1 ? 'marca' : 'marcas'} diferentes
          </Text>
          {stats.brands.slice(0, 10).map((b, i) => (
            <View key={b.name} style={styles.brandBarRow}>
              <Text style={styles.brandRank}>{i + 1}</Text>
              <View style={styles.brandBarContent}>
                <View style={styles.brandBarLabelRow}>
                  <Text style={styles.brandBarLabel} numberOfLines={1}>{b.name}</Text>
                  <Text style={styles.brandBarCount}>
                    {b.count} {b.count === 1 ? 'perfume' : 'perfumes'}
                  </Text>
                </View>
                {renderHorizontalBar(b.count, maxBrandCount, colors.primary)}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Note Frequency Analysis */}
      {stats.noteFrequency.length > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{'~ ~'}</Text>
            <Text style={styles.sectionTitle}>Notas Mais Frequentes</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Notas que aparecem mais vezes na tua colecao
          </Text>
          <View style={styles.noteTagContainer}>
            {stats.noteFrequency.map((note, i) => {
              // Determine tag intensity based on frequency rank
              const maxCount = stats.noteFrequency[0].count;
              const intensity = note.count / maxCount;
              const bgOpacity = Math.max(0.15, intensity * 0.5);
              const textOpacity = Math.max(0.7, intensity);
              return (
                <View
                  key={note.name + i}
                  style={[
                    styles.noteTag,
                    {
                      backgroundColor: `rgba(139, 69, 19, ${bgOpacity})`,
                      borderColor: `rgba(160, 82, 45, ${bgOpacity + 0.2})`,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.noteTagText,
                      { opacity: textOpacity },
                    ]}
                  >
                    {note.name}
                  </Text>
                  <View style={styles.noteTagBadge}>
                    <Text style={styles.noteTagBadgeText}>{note.count}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Seasonal Breakdown */}
      {stats.seasonPerfumeCount > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{'* *'}</Text>
            <Text style={styles.sectionTitle}>Perfil Sazonal</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Baseado nos votos da comunidade para {stats.seasonPerfumeCount} {stats.seasonPerfumeCount === 1 ? 'perfume' : 'perfumes'}
          </Text>

          {/* Season bars */}
          <View style={styles.seasonGrid}>
            {['spring', 'summer', 'fall', 'winter'].map(season => {
              const count = stats.seasonTotals[season];
              const pct = stats.seasonPerfumeCount > 0
                ? Math.round((count / stats.seasonPerfumeCount) * 100)
                : 0;
              return (
                <View key={season} style={styles.seasonItem}>
                  <View style={[styles.seasonCircle, { borderColor: SEASON_COLORS[season] }]}>
                    <Text style={[styles.seasonCircleNum, { color: SEASON_COLORS[season] }]}>
                      {count}
                    </Text>
                  </View>
                  <Text style={styles.seasonLabel}>{SEASON_LABELS[season]}</Text>
                  <View style={styles.seasonBarWrapper}>
                    <View
                      style={[
                        styles.seasonBarFill,
                        {
                          width: `${pct}%`,
                          backgroundColor: SEASON_COLORS[season],
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.seasonPct}>{pct}%</Text>
                </View>
              );
            })}
          </View>

          {/* Day vs Night */}
          <View style={styles.dayNightRow}>
            <View style={styles.dayNightItem}>
              <View style={[styles.dayNightDot, { backgroundColor: TIME_COLORS.day }]} />
              <Text style={styles.dayNightLabel}>Dia</Text>
              <Text style={[styles.dayNightCount, { color: TIME_COLORS.day }]}>
                {stats.timeTotals.day}
              </Text>
            </View>
            <View style={styles.dayNightSeparator} />
            <View style={styles.dayNightItem}>
              <View style={[styles.dayNightDot, { backgroundColor: TIME_COLORS.night }]} />
              <Text style={styles.dayNightLabel}>Noite</Text>
              <Text style={[styles.dayNightCount, { color: TIME_COLORS.night }]}>
                {stats.timeTotals.night}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Decade Distribution */}
      {stats.decades.length > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{'# #'}</Text>
            <Text style={styles.sectionTitle}>Por Decada</Text>
          </View>
          {stats.decades.map((d) => (
            <View key={d.name} style={styles.barRow}>
              <Text style={styles.barLabel}>{d.name}</Text>
              {renderHorizontalBar(d.count, maxDecadeCount, colors.info)}
              <Text style={styles.barValue}>{d.count}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Most Worn */}
      {stats.mostWorn.length > 0 && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{'> >'}</Text>
            <Text style={styles.sectionTitle}>Mais Usados</Text>
          </View>
          {stats.mostWorn.slice(0, 5).map((p, i) => (
            <View key={p.id || i} style={styles.brandBarRow}>
              <Text style={styles.brandRank}>{i + 1}</Text>
              <View style={styles.brandBarContent}>
                <View style={styles.brandBarLabelRow}>
                  <Text style={styles.brandBarLabel} numberOfLines={1}>{p.name}</Text>
                  <Text style={styles.brandBarCount}>{p.wear_count}x</Text>
                </View>
                {renderHorizontalBar(p.wear_count, stats.mostWorn[0].wear_count, colors.success)}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Insights */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>{'! !'}</Text>
          <Text style={styles.sectionTitle}>Insights</Text>
        </View>
        {stats.ownCount === 0 && (
          <View style={styles.insightCard}>
            <Text style={styles.insight}>
              Adiciona perfumes a tua colecao para ver estatisticas detalhadas!
            </Text>
          </View>
        )}
        {stats.ownCount > 0 && stats.brands.length > 0 && (
          <View style={styles.insightCard}>
            <Text style={styles.insightHighlight}>Marca Favorita</Text>
            <Text style={styles.insight}>
              {stats.brands[0].name} com {stats.brands[0].count}{' '}
              {stats.brands[0].count === 1 ? 'perfume' : 'perfumes'}.
            </Text>
          </View>
        )}
        {stats.noteFrequency.length > 0 && (
          <View style={styles.insightCard}>
            <Text style={styles.insightHighlight}>Nota Mais Comum</Text>
            <Text style={styles.insight}>
              {stats.noteFrequency[0].name} aparece em {stats.noteFrequency[0].count}{' '}
              {stats.noteFrequency[0].count === 1 ? 'perfume' : 'perfumes'} da tua colecao.
            </Text>
          </View>
        )}
        {stats.seasonPerfumeCount > 0 && (() => {
          const seasons = stats.seasonTotals;
          const topSeason = Object.entries(seasons).sort((a, b) => b[1] - a[1])[0];
          if (topSeason[1] > 0) {
            return (
              <View style={styles.insightCard}>
                <Text style={styles.insightHighlight}>Estacao Dominante</Text>
                <Text style={styles.insight}>
                  A tua colecao e mais adequada para {SEASON_LABELS[topSeason[0]]} com {topSeason[1]}{' '}
                  {topSeason[1] === 1 ? 'perfume' : 'perfumes'}.
                </Text>
              </View>
            );
          }
          return null;
        })()}
        {stats.wantCount > stats.ownCount && (
          <View style={styles.insightCard}>
            <Text style={styles.insightHighlight}>Wishlist vs Colecao</Text>
            <Text style={styles.insight}>
              Tens mais perfumes na wishlist ({stats.wantCount}) do que na colecao ({stats.ownCount}).
              Hora de fazer umas compras!
            </Text>
          </View>
        )}
        {stats.streak >= 7 && (
          <View style={styles.insightCard}>
            <Text style={styles.insightHighlight}>Sequencia Incrivel</Text>
            <Text style={styles.insight}>
              {stats.streak} dias consecutivos a registar SOTD! Continua assim.
            </Text>
          </View>
        )}
      </View>

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },

  // Overview cards
  overviewRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  overviewCardHighlight: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  overviewNum: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  overviewLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: typography.medium,
  },

  // Section cards
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sectionIcon: {
    fontSize: typography.body,
    color: colors.primary,
    marginRight: spacing.sm,
    fontWeight: typography.bold,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.md,
    marginLeft: spacing.lg + spacing.sm,
  },

  // Brand horizontal bar chart
  brandBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
  },
  brandRank: {
    width: 22,
    fontSize: typography.caption,
    fontWeight: typography.semibold,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  brandBarContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  brandBarLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandBarLabel: {
    fontSize: typography.body,
    color: colors.textPrimary,
    flex: 1,
    fontWeight: typography.medium,
  },
  brandBarCount: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginLeft: spacing.sm,
  },

  // Generic bar chart
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  barLabel: {
    width: 60,
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  barBg: {
    flex: 1,
    height: 8,
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  barValue: {
    width: 30,
    fontSize: typography.caption,
    color: colors.textTertiary,
    textAlign: 'right',
    fontWeight: typography.semibold,
  },

  // Note tags
  noteTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  noteTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: borderRadius.round,
    borderWidth: 1,
  },
  noteTagText: {
    fontSize: typography.caption,
    color: colors.textPrimary,
    fontWeight: typography.medium,
  },
  noteTagBadge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs + 2,
    paddingHorizontal: 4,
  },
  noteTagBadgeText: {
    fontSize: typography.small,
    color: '#ffffff',
    fontWeight: typography.bold,
  },

  // Season breakdown
  seasonGrid: {
    gap: spacing.sm,
  },
  seasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  seasonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundLight,
  },
  seasonCircleNum: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
  },
  seasonLabel: {
    width: 72,
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  seasonBarWrapper: {
    flex: 1,
    height: 8,
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  seasonBarFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  seasonPct: {
    width: 36,
    fontSize: typography.caption,
    color: colors.textTertiary,
    textAlign: 'right',
    fontWeight: typography.semibold,
  },

  // Day / Night row
  dayNightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundLight,
    gap: spacing.lg,
  },
  dayNightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dayNightDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dayNightLabel: {
    fontSize: typography.body,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  dayNightCount: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
  },
  dayNightSeparator: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },

  // Insights
  insightCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  insightHighlight: {
    fontSize: typography.caption,
    fontWeight: typography.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  insight: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
