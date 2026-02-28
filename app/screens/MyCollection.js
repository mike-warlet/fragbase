import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import RatingStars from '../components/RatingStars';

export default function MyCollection({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [perfumes, setPerfumes] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      const data = await apiCall('/api/wishlists/me?type=own');
      setPerfumes(data.wishlists || data || []);
    } catch (error) {
      console.error('Failed to load collection:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCollection();
  }, []);

  const navigateToPerfume = (perfumeId) => {
    navigation.navigate('PerfumeDetail', { perfumeId });
  };

  const renderGridItem = ({ item }) => {
    const perfume = item.perfume || item;
    return (
      <TouchableOpacity
        style={styles.gridCard}
        onPress={() => navigateToPerfume(perfume.id)}
        activeOpacity={0.8}
      >
        <View style={styles.gridImageContainer}>
          {perfume.image_url ? (
            <Image source={{ uri: perfume.image_url }} style={styles.gridImage} />
          ) : (
            <View style={styles.gridPlaceholder}>
              <Text style={styles.placeholderEmoji}>🌸</Text>
            </View>
          )}
        </View>
        <View style={styles.gridContent}>
          <Text style={styles.gridBrand} numberOfLines={1}>{perfume.brand}</Text>
          <Text style={styles.gridName} numberOfLines={2}>{perfume.name}</Text>
          {perfume.avg_rating > 0 && (
            <RatingStars value={Math.round(perfume.avg_rating)} size={12} readOnly />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderListItem = ({ item }) => {
    const perfume = item.perfume || item;
    return (
      <TouchableOpacity
        style={styles.listCard}
        onPress={() => navigateToPerfume(perfume.id)}
        activeOpacity={0.8}
      >
        <View style={styles.listImageContainer}>
          {perfume.image_url ? (
            <Image source={{ uri: perfume.image_url }} style={styles.listImage} />
          ) : (
            <View style={styles.listPlaceholder}>
              <Text style={{ fontSize: 28 }}>🌸</Text>
            </View>
          )}
        </View>
        <View style={styles.listContent}>
          <Text style={styles.listBrand}>{perfume.brand}</Text>
          <Text style={styles.listName} numberOfLines={1}>{perfume.name}</Text>
          {perfume.year && <Text style={styles.listYear}>{perfume.year}</Text>}
          {perfume.avg_rating > 0 && (
            <RatingStars value={Math.round(perfume.avg_rating)} size={14} readOnly showLabel />
          )}
        </View>
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

  return (
    <View style={styles.container}>
      {/* Stats Header */}
      <View style={styles.statsBar}>
        <TouchableOpacity onPress={() => navigation.navigate('CollectionAnalytics')}>
          <Text style={styles.statsText}>{perfumes.length} perfumes  {'>'}</Text>
        </TouchableOpacity>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'grid' && styles.toggleActive]}
            onPress={() => setViewMode('grid')}
          >
            <Text style={[styles.toggleText, viewMode === 'grid' && styles.toggleTextActive]}>Grid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'list' && styles.toggleActive]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>Lista</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={perfumes}
        keyExtractor={(item) => (item.perfume?.id || item.perfume_id || item.id).toString()}
        renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode}
        columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
        contentContainerStyle={perfumes.length === 0 ? styles.emptyList : styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📦</Text>
            <Text style={styles.emptyText}>A sua coleção está vazia</Text>
            <Text style={styles.emptySubtext}>
              Adicione perfumes a partir da página de detalhes
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Text style={styles.emptyButtonText}>Explorar Perfumes</Text>
            </TouchableOpacity>
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
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statsText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  toggleBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  toggleTextActive: {
    color: colors.textPrimary,
  },
  listContainer: {
    padding: spacing.sm,
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  // Grid mode
  gridCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    width: '48%',
    ...shadows.sm,
  },
  gridImageContainer: {
    aspectRatio: 1,
    backgroundColor: colors.surfaceLight,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gridPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 48,
  },
  gridContent: {
    padding: spacing.sm,
  },
  gridBrand: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  gridName: {
    fontSize: typography.body,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  // List mode
  listCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  listImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.surfaceLight,
  },
  listImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  listPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'center',
  },
  listBrand: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  listName: {
    fontSize: typography.body,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  listYear: {
    fontSize: typography.small,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  // Empty state
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
    marginBottom: spacing.lg,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.round,
  },
  emptyButtonText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: typography.semibold,
  },
});
