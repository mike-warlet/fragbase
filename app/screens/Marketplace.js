import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet,
  Image, RefreshControl, Modal, ActivityIndicator,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { apiCall } from '../config';

const CONDITIONS = {
  new: 'Novo',
  used_like_new: 'Seminovo',
  used_good: 'Usado - Bom',
  used_fair: 'Usado - Regular',
  decant: 'Decant',
  sample: 'Amostra',
};

const TYPES = { sell: 'Venda', swap: 'Troca', both: 'Venda/Troca' };

export default function MarketplaceScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all, sell, swap
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadListings = useCallback(async (pageNum = 1, append = false) => {
    try {
      const params = new URLSearchParams({ page: pageNum, limit: 20 });
      if (search) params.set('q', search);
      if (filter !== 'all') params.set('type', filter);

      const data = await apiCall(`/api/marketplace?${params}`);
      const newListings = data.listings || [];
      if (append) {
        setListings(prev => [...prev, ...newListings]);
      } else {
        setListings(newListings);
      }
      setHasMore(data.has_more ?? false);
      setPage(pageNum);
    } catch (err) {
      console.error('Load listings error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, filter]);

  useEffect(() => {
    setLoading(true);
    loadListings(1);
  }, [filter]);

  const onRefresh = () => {
    setRefreshing(true);
    loadListings(1);
  };

  const onEndReached = () => {
    if (hasMore && !loading) loadListings(page + 1, true);
  };

  const onSearch = () => {
    setLoading(true);
    loadListings(1);
  };

  const renderListing = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ListingDetail', { listingId: item.id })}
    >
      <Image
        source={{ uri: item.perfume_image || item.image_url || 'https://via.placeholder.com/80' }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cardBrand} numberOfLines={1}>
          {item.perfume_brand ? `${item.perfume_brand} - ${item.perfume_name}` : 'Perfume não vinculado'}
        </Text>
        <View style={styles.cardMeta}>
          <View style={[styles.badge, { backgroundColor: item.listing_type === 'swap' ? colors.info : colors.success }]}>
            <Text style={styles.badgeText}>{TYPES[item.listing_type]}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{CONDITIONS[item.condition]}</Text>
          </View>
          {item.volume_ml && (
            <Text style={styles.volume}>{item.volume_ml}ml</Text>
          )}
        </View>
        <View style={styles.cardBottom}>
          {item.price ? (
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
          ) : (
            <Text style={styles.swapText}>Aberto a propostas</Text>
          )}
          <Text style={styles.seller}>@{item.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar no marketplace..."
          placeholderTextColor={colors.textTertiary}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('CreateListing')}>
          <Text style={styles.createBtnText}>+ Anunciar</Text>
        </TouchableOpacity>
      </View>

      {/* Filter tabs */}
      <View style={styles.filters}>
        {['all', 'sell', 'swap'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'Todos' : f === 'sell' ? 'Venda' : 'Troca'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && listings.length === 0 ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={listings}
          renderItem={renderListing}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.3}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Nenhum anúncio encontrado</Text>
              <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('CreateListing')}>
                <Text style={styles.emptyBtnText}>Criar o primeiro anúncio</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchRow: { flexDirection: 'row', padding: spacing.md, gap: spacing.sm },
  searchInput: {
    flex: 1, backgroundColor: colors.surface, borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    color: colors.textPrimary, fontSize: typography.body,
  },
  createBtn: {
    backgroundColor: colors.primary, borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md, justifyContent: 'center',
  },
  createBtnText: { color: '#fff', fontWeight: typography.semibold, fontSize: typography.body },
  filters: { flexDirection: 'row', paddingHorizontal: spacing.md, gap: spacing.sm, marginBottom: spacing.sm },
  filterTab: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: borderRadius.round, backgroundColor: colors.surface,
  },
  filterActive: { backgroundColor: colors.primary },
  filterText: { color: colors.textSecondary, fontSize: typography.caption },
  filterTextActive: { color: '#fff', fontWeight: typography.semibold },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  card: {
    flexDirection: 'row', backgroundColor: colors.surface,
    borderRadius: borderRadius.lg, marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  cardImage: { width: 100, height: 120 },
  cardContent: { flex: 1, padding: spacing.sm },
  cardTitle: { color: colors.textPrimary, fontSize: typography.h6, fontWeight: typography.semibold },
  cardBrand: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
  cardMeta: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.xs, flexWrap: 'wrap' },
  badge: {
    backgroundColor: colors.surfaceLight, borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs, paddingVertical: 2,
  },
  badgeText: { color: '#fff', fontSize: typography.small },
  volume: { color: colors.textTertiary, fontSize: typography.small },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs },
  price: { color: colors.success, fontSize: typography.h6, fontWeight: typography.bold },
  swapText: { color: colors.info, fontSize: typography.caption },
  seller: { color: colors.textTertiary, fontSize: typography.small },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: colors.textSecondary, fontSize: typography.body },
  emptyBtn: { marginTop: spacing.md, backgroundColor: colors.primary, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  emptyBtnText: { color: '#fff', fontWeight: typography.semibold },
});
