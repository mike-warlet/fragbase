import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { api } from '../config';
import theme from '../theme';

const { width } = Dimensions.get('window');

export default function CompareScreen({ route, navigation }) {
  const { perfumeIds: initialIds = [] } = route.params || {};
  const [selectedIds, setSelectedIds] = useState(initialIds);
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(initialIds.length < 2);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (selectedIds.length >= 2) {
      loadComparison();
    }
  }, [selectedIds]);

  const loadComparison = async () => {
    setLoading(true);
    try {
      const data = await api(`/api/perfumes/compare?ids=${selectedIds.join(',')}`);
      setPerfumes(data.perfumes || []);
    } catch (error) {
      console.error('Compare error:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchTimer = useRef(null);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await api(`/api/perfumes?q=${encodeURIComponent(query)}&limit=10`);
        const results = (data.perfumes || []).filter(p => !selectedIds.includes(p.id));
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setSearching(false);
      }
    }, 400);
  }, [selectedIds]);

  const addPerfume = (perfumeId) => {
    const newIds = [...selectedIds, perfumeId];
    setSelectedIds(newIds);
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (selectedIds.length < 2 || perfumes.length < 2) {
    return (
      <View style={styles.center}>
        <Text style={styles.pickTitle}>Escolha um perfume para comparar</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar perfume..."
          placeholderTextColor={theme.colors.textTertiary}
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
        />
        {searching && <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 12 }} />}
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          style={styles.searchList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.searchItem} onPress={() => addPerfume(item.id)}>
              {item.image_url ? (
                <Image source={{ uri: item.image_url }} style={styles.searchThumb} />
              ) : (
                <View style={[styles.searchThumb, styles.searchThumbPlaceholder]}>
                  <Text>🌸</Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.searchBrand}>{item.brand}</Text>
                <Text style={styles.searchName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  const colWidth = (width - theme.spacing.lg * 2 - theme.spacing.sm) / perfumes.length;

  const renderBar = (value, max, color) => {
    const pct = max > 0 ? (value / max) * 100 : 0;
    return (
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    );
  };

  const renderSeasonPct = (perfume, key) => {
    if (!perfume.seasons || !perfume.seasons.total) return '—';
    return `${Math.round((perfume.seasons[key] / perfume.seasons.total) * 100)}%`;
  };

  // Find all unique accords across perfumes
  const allAccords = [...new Set(perfumes.flatMap(p => (p.accords || []).map(a => a.accord_name)))];
  const maxAccordStrength = Math.max(
    ...perfumes.flatMap(p => (p.accords || []).map(a => a.avg_strength || 0)),
    1
  );

  return (
    <ScrollView style={styles.container}>
      {/* Perfume Headers */}
      <View style={styles.row}>
        {perfumes.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.col, { width: colWidth }]}
            onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: p.id })}
          >
            {p.image_url ? (
              <Image source={{ uri: p.image_url }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={{ fontSize: 40 }}>🌸</Text>
              </View>
            )}
            <Text style={styles.brand} numberOfLines={1}>{p.brand}</Text>
            <Text style={styles.name} numberOfLines={2}>{p.name}</Text>
            {p.year && <Text style={styles.meta}>{p.year}</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Rating */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avaliacao</Text>
        <View style={styles.row}>
          {perfumes.map((p) => (
            <View key={p.id} style={[styles.col, { width: colWidth }]}>
              <Text style={styles.ratingNum}>
                {p.avg_rating ? Number(p.avg_rating).toFixed(1) : '—'}
              </Text>
              <Text style={styles.ratingStars}>
                {p.avg_rating ? '⭐'.repeat(Math.round(p.avg_rating)) : ''}
              </Text>
              <Text style={styles.ratingCount}>
                {p.review_count || 0} reviews
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance</Text>
        {['longevity', 'sillage'].map((metric) => (
          <View key={metric}>
            <Text style={styles.metricLabel}>
              {metric === 'longevity' ? 'Longevidade' : 'Sillage'}
            </Text>
            <View style={styles.row}>
              {perfumes.map((p) => {
                const val = p.performance?.[`avg_${metric}`] || 0;
                return (
                  <View key={p.id} style={[styles.col, { width: colWidth }]}>
                    <Text style={styles.metricValue}>{val > 0 ? val : '—'}</Text>
                    {renderBar(val, 10, theme.colors.primary)}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>

      {/* Seasons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estacoes</Text>
        {[
          { key: 'spring', label: 'Primavera', emoji: '🌸' },
          { key: 'summer', label: 'Verao', emoji: '☀️' },
          { key: 'fall', label: 'Outono', emoji: '🍂' },
          { key: 'winter', label: 'Inverno', emoji: '❄️' },
          { key: 'day', label: 'Dia', emoji: '🌤' },
          { key: 'night', label: 'Noite', emoji: '🌙' },
        ].map(({ key, label, emoji }) => (
          <View key={key}>
            <Text style={styles.metricLabel}>{emoji} {label}</Text>
            <View style={styles.row}>
              {perfumes.map((p) => (
                <View key={p.id} style={[styles.col, { width: colWidth }]}>
                  <Text style={styles.metricValue}>{renderSeasonPct(p, key)}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Accords */}
      {allAccords.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acordes</Text>
          {allAccords.slice(0, 10).map((accord) => (
            <View key={accord}>
              <Text style={styles.metricLabel}>{accord}</Text>
              <View style={styles.row}>
                {perfumes.map((p) => {
                  const a = (p.accords || []).find(x => x.accord_name === accord);
                  const strength = a?.avg_strength || 0;
                  return (
                    <View key={p.id} style={[styles.col, { width: colWidth }]}>
                      {renderBar(strength, maxAccordStrength, theme.getAccordColor(accord))}
                      <Text style={styles.accordVal}>{strength > 0 ? strength : '—'}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notas</Text>
        {['top', 'heart', 'base'].map((layer) => {
          const hasNotes = perfumes.some(p => p.notes?.[layer]?.length > 0);
          if (!hasNotes) return null;
          return (
            <View key={layer}>
              <Text style={styles.metricLabel}>
                {layer === 'top' ? 'Topo' : layer === 'heart' ? 'Coracao' : 'Base'}
              </Text>
              <View style={styles.row}>
                {perfumes.map((p) => (
                  <View key={p.id} style={[styles.col, { width: colWidth }]}>
                    <Text style={styles.notesList}>
                      {(p.notes?.[layer] || []).join(', ') || '—'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>

      {/* Wishlist Counts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popularidade</Text>
        {[
          { key: 'own', label: 'Possuem' },
          { key: 'want', label: 'Desejam' },
          { key: 'tried', label: 'Provaram' },
        ].map(({ key, label }) => (
          <View key={key}>
            <Text style={styles.metricLabel}>{label}</Text>
            <View style={styles.row}>
              {perfumes.map((p) => (
                <View key={p.id} style={[styles.col, { width: colWidth }]}>
                  <Text style={styles.metricValue}>{p.wishlist_counts?.[key] || 0}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Add more / search modal */}
      {selectedIds.length < 4 && (
        <TouchableOpacity style={styles.addMoreBtn} onPress={() => setShowSearch(true)}>
          <Text style={styles.addMoreText}>+ Adicionar perfume</Text>
        </TouchableOpacity>
      )}

      <Modal visible={showSearch && selectedIds.length >= 2} transparent animationType="slide" onRequestClose={() => setShowSearch(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar perfume</Text>
            <TouchableOpacity onPress={() => setShowSearch(false)}>
              <Text style={styles.modalClose}>Fechar</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar perfume..."
            placeholderTextColor={theme.colors.textTertiary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searching && <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 12 }} />}
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.searchItem} onPress={() => addPerfume(item.id)}>
                {item.image_url ? (
                  <Image source={{ uri: item.image_url }} style={styles.searchThumb} />
                ) : (
                  <View style={[styles.searchThumb, styles.searchThumbPlaceholder]}>
                    <Text>🌸</Text>
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.searchBrand}>{item.brand}</Text>
                  <Text style={styles.searchName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      <View style={{ height: theme.spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.body,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  col: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    resizeMode: 'contain',
    marginBottom: theme.spacing.sm,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
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
    textAlign: 'center',
    marginTop: 2,
  },
  meta: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  metricLabel: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.sm,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  metricValue: {
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  ratingNum: {
    fontSize: theme.typography.h3,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
  },
  ratingStars: {
    fontSize: 12,
    marginTop: 2,
  },
  ratingCount: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  barBg: {
    width: '100%',
    height: 6,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  accordVal: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  notesList: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  pickTitle: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.h6,
    color: theme.colors.textPrimary,
    width: '90%',
    marginHorizontal: '5%',
  },
  searchList: {
    width: '100%',
    marginTop: theme.spacing.sm,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  searchThumb: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.sm,
    resizeMode: 'contain',
  },
  searchThumbPlaceholder: {
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBrand: {
    fontSize: theme.typography.small,
    color: theme.colors.primary,
    fontWeight: theme.typography.bold,
    textTransform: 'uppercase',
  },
  searchName: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
  },
  addMoreBtn: {
    alignItems: 'center',
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    borderStyle: 'dashed',
  },
  addMoreText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: theme.typography.semibold,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
  },
  modalClose: {
    fontSize: theme.typography.body,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
  },
});
