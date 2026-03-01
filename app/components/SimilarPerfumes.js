import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { apiCall } from '../config';
import theme, { getAccordColor } from '../theme';

const TABS = [
  { key: 'similar', label: 'Similares' },
  { key: 'dupe', label: 'Alternativas' },
  { key: 'upgrade', label: 'Upgrades' },
];

export default function SimilarPerfumes({ perfumeId, onPress }) {
  const [activeTab, setActiveTab] = useState('similar');
  const [data, setData] = useState({ similar: [], dupe: [], upgrade: [] });
  const [loading, setLoading] = useState({ similar: true, dupe: false, upgrade: false });

  // Load similar on mount
  useEffect(() => {
    loadTab('similar');
  }, [perfumeId]);

  // Load tab data on tab switch (lazy)
  useEffect(() => {
    if (!data[activeTab].length && !loading[activeTab]) {
      loadTab(activeTab);
    }
  }, [activeTab]);

  const loadTab = async (tab) => {
    setLoading(prev => ({ ...prev, [tab]: true }));
    try {
      const typeParam = tab === 'similar' ? '' : `?type=${tab}`;
      const result = await apiCall(`/api/perfumes/${perfumeId}/similar${typeParam}`);
      setData(prev => ({ ...prev, [tab]: result.similar || [] }));
    } catch (error) {
      console.error(`Error loading ${tab} perfumes:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [tab]: false }));
    }
  };

  const currentData = data[activeTab];
  const isLoading = loading[activeTab];

  const renderAccordChip = (accord) => (
    <View
      key={accord}
      style={[styles.accordChip, { backgroundColor: getAccordColor(accord) + '30' }]}
    >
      <View style={[styles.accordDot, { backgroundColor: getAccordColor(accord) }]} />
      <Text style={[styles.accordText, { color: getAccordColor(accord) }]} numberOfLines={1}>
        {accord}
      </Text>
    </View>
  );

  const getSimilarityColor = (score) => {
    if (score >= 70) return theme.colors.success;
    if (score >= 45) return theme.colors.warning;
    return theme.colors.info;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)} activeOpacity={0.7}>
      {/* Image */}
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>?</Text>
        </View>
      )}

      {/* Similarity badge */}
      <View style={[styles.similarityBadge, { backgroundColor: getSimilarityColor(item.similarity_score) }]}>
        <Text style={styles.similarityText}>{item.similarity_score}%</Text>
      </View>

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.brand} numberOfLines={1}>{item.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

        {/* Rating */}
        {item.avg_rating > 0 && (
          <Text style={styles.rating}>{Number(item.avg_rating).toFixed(1)}/5</Text>
        )}

        {/* Shared accords */}
        {item.shared_accords && item.shared_accords.length > 0 && (
          <View style={styles.accordsRow}>
            {item.shared_accords.slice(0, 3).map(renderAccordChip)}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {activeTab === 'similar' && 'Sem perfumes semelhantes encontrados.'}
          {activeTab === 'dupe' && 'Sem alternativas encontradas.'}
          {activeTab === 'upgrade' && 'Sem upgrades encontrados.'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Section title */}
      <Text style={styles.title}>Perfumes Semelhantes</Text>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      {currentData.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          horizontal
          data={currentData}
          renderItem={renderItem}
          keyExtractor={(item) => `${activeTab}-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textSecondary,
  },
  tabTextActive: {
    color: theme.colors.textPrimary,
  },

  // List
  list: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },

  // Card
  card: {
    width: 150,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: theme.colors.surfaceLight,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: theme.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
    color: theme.colors.textTertiary,
  },

  // Similarity badge (overlay on image)
  similarityBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.round,
    ...theme.shadows.sm,
  },
  similarityText: {
    fontSize: theme.typography.small,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
  },

  // Card info
  cardInfo: {
    padding: theme.spacing.sm,
  },
  brand: {
    fontSize: theme.typography.small,
    color: theme.colors.primary,
    fontWeight: theme.typography.bold,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textPrimary,
    marginTop: 2,
    minHeight: 30,
  },
  rating: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },

  // Accord chips
  accordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  accordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.round,
    gap: 3,
  },
  accordDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  accordText: {
    fontSize: 9,
    fontWeight: theme.typography.semibold,
    textTransform: 'capitalize',
  },

  // Empty state
  emptyContainer: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  emptyText: {
    fontSize: theme.typography.body,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
});
