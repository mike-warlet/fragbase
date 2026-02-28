import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const { width } = Dimensions.get('window');

export default function CollectionAnalyticsScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [wishlists, diaryStats] = await Promise.allSettled([
        apiCall('/api/wishlists/me'),
        apiCall('/api/diary/stats'),
      ]);

      const owned = wishlists.status === 'fulfilled'
        ? (wishlists.value.wishlists || []).filter(w => w.list_type === 'own')
        : [];
      const wanted = wishlists.status === 'fulfilled'
        ? (wishlists.value.wishlists || []).filter(w => w.list_type === 'want')
        : [];
      const tried = wishlists.status === 'fulfilled'
        ? (wishlists.value.wishlists || []).filter(w => w.list_type === 'tried')
        : [];

      // Compute brand distribution from owned
      const brandMap = {};
      owned.forEach(w => {
        const brand = w.perfume_brand || 'Unknown';
        brandMap[brand] = (brandMap[brand] || 0) + 1;
      });
      const brands = Object.entries(brandMap)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));

      // Year distribution
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

      const diary = diaryStats.status === 'fulfilled' ? diaryStats.value : {};

      setStats({
        ownCount: owned.length,
        wantCount: wanted.length,
        triedCount: tried.length,
        totalFragrances: owned.length + tried.length,
        brands,
        decades: decadeList,
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

  const renderBar = (value, max, color) => {
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

  return (
    <ScrollView style={styles.container}>
      {/* Overview Cards */}
      <View style={styles.overviewRow}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNum}>{stats.ownCount}</Text>
          <Text style={styles.overviewLabel}>Possuo</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNum}>{stats.wantCount}</Text>
          <Text style={styles.overviewLabel}>Desejo</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNum}>{stats.triedCount}</Text>
          <Text style={styles.overviewLabel}>Provei</Text>
        </View>
      </View>

      <View style={styles.overviewRow}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNum}>{stats.streak}</Text>
          <Text style={styles.overviewLabel}>Sequencia</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNum}>{stats.totalDays}</Text>
          <Text style={styles.overviewLabel}>Dias SOTD</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNum}>{stats.brands.length}</Text>
          <Text style={styles.overviewLabel}>Marcas</Text>
        </View>
      </View>

      {/* Brand Distribution */}
      {stats.brands.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marcas na Colecao</Text>
          {stats.brands.slice(0, 10).map((b) => (
            <View key={b.name} style={styles.barRow}>
              <Text style={styles.barLabel} numberOfLines={1}>{b.name}</Text>
              {renderBar(b.count, maxBrandCount, colors.primary)}
              <Text style={styles.barValue}>{b.count}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Decade Distribution */}
      {stats.decades.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Por Decada</Text>
          {stats.decades.map((d) => (
            <View key={d.name} style={styles.barRow}>
              <Text style={styles.barLabel}>{d.name}</Text>
              {renderBar(d.count, maxDecadeCount, colors.accent || colors.primary)}
              <Text style={styles.barValue}>{d.count}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Most Worn */}
      {stats.mostWorn.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mais Usados</Text>
          {stats.mostWorn.slice(0, 5).map((p, i) => (
            <View key={p.id || i} style={styles.barRow}>
              <Text style={styles.barLabel} numberOfLines={1}>{p.name}</Text>
              {renderBar(p.wear_count, stats.mostWorn[0].wear_count, colors.success || colors.primary)}
              <Text style={styles.barValue}>{p.wear_count}x</Text>
            </View>
          ))}
        </View>
      )}

      {/* Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insights</Text>
        {stats.ownCount === 0 && (
          <Text style={styles.insight}>Adiciona perfumes a tua colecao para ver estatisticas detalhadas!</Text>
        )}
        {stats.ownCount > 0 && stats.brands.length > 0 && (
          <Text style={styles.insight}>
            A tua marca favorita e {stats.brands[0].name} com {stats.brands[0].count} {stats.brands[0].count === 1 ? 'perfume' : 'perfumes'}.
          </Text>
        )}
        {stats.wantCount > stats.ownCount && (
          <Text style={styles.insight}>
            Tens mais perfumes na wishlist ({stats.wantCount}) do que na colecao ({stats.ownCount}). Hora de fazer umas compras!
          </Text>
        )}
        {stats.streak >= 7 && (
          <Text style={styles.insight}>
            Sequencia incrivel de {stats.streak} dias! Continua a registar o teu SOTD.
          </Text>
        )}
      </View>

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
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
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
    ...shadows.sm,
  },
  overviewNum: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  overviewLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  section: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  barLabel: {
    width: 90,
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  barBg: {
    flex: 1,
    height: 10,
    backgroundColor: colors.surfaceLight,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  barValue: {
    width: 30,
    fontSize: typography.caption,
    color: colors.textTertiary,
    textAlign: 'right',
  },
  insight: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
});
