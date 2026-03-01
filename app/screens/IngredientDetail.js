import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ActivityIndicator, TextInput, ScrollView,
} from 'react-native';
import { apiCall } from '../config';
import theme from '../theme';

const CATEGORIES = [
  { key: null, label: 'Todos' },
  { key: 'citrus', label: 'Citricos' },
  { key: 'floral', label: 'Florais' },
  { key: 'fruity', label: 'Frutados' },
  { key: 'green', label: 'Verdes' },
  { key: 'herbal', label: 'Herbais' },
  { key: 'spicy', label: 'Picantes' },
  { key: 'woody', label: 'Lenhosos' },
  { key: 'amber', label: 'Ambar' },
  { key: 'gourmand', label: 'Gourmand' },
  { key: 'musk', label: 'Almiscar' },
  { key: 'resinous', label: 'Resinosos' },
  { key: 'leather', label: 'Couro' },
  { key: 'aquatic', label: 'Aquaticos' },
  { key: 'animalic', label: 'Animalicos' },
  { key: 'mineral', label: 'Minerais' },
];

const getCategoryColor = (cat) => {
  const map = {
    citrus: '#FFD700', floral: '#FF69B4', fruity: '#FF6B6B',
    green: '#4CAF50', spicy: '#FF5722', woody: '#8B4513',
    amber: '#FFA000', musk: '#CE93D8', aquatic: '#29B6F6',
    gourmand: '#D4A574', herbal: '#66BB6A', leather: '#795548',
    animalic: '#A1887F', mineral: '#78909C', resinous: '#E65100',
  };
  return map[cat] || theme.colors.primary;
};

const ITEM_HEIGHT = 88;

export default function IngredientDetailScreen({ route, navigation }) {
  const { ingredientId } = route.params || {};
  const [mode, setMode] = useState(ingredientId ? 'detail' : 'list');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState(null);
  const [pairings, setPairings] = useState([]);
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (ingredientId) {
      loadIngredient(ingredientId);
    } else {
      loadList();
    }
  }, [ingredientId]);

  useEffect(() => {
    if (mode === 'list') loadList();
  }, [category, search]);

  const loadList = async () => {
    setLoading(true);
    try {
      let url = '/api/ingredients';
      const params = [];
      if (category) params.push(`category=${category}`);
      if (search.trim()) params.push(`q=${encodeURIComponent(search.trim())}`);
      if (params.length) url += '?' + params.join('&');
      const data = await apiCall(url);
      setIngredients(data.ingredients || []);
    } catch (error) {
      console.error('Error loading ingredients:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadIngredient = async (id) => {
    setLoading(true);
    setMode('detail');
    try {
      const data = await apiCall(`/api/ingredients/${id}`);
      setIngredient(data.ingredient);
      setPairings(data.pairings || []);
      setPerfumes(data.perfumes || []);
    } catch (error) {
      console.error('Error loading ingredient:', error);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setMode('list');
    setIngredient(null);
    setPairings([]);
    setPerfumes([]);
    navigation.setOptions({ title: 'Ingredientes' });
  };

  const renderIngredientItem = useCallback(({ item }) => {
    const color = getCategoryColor(item.category);
    return (
      <TouchableOpacity
        style={styles.ingredientRow}
        onPress={() => {
          navigation.setOptions({ title: item.name_pt || item.name });
          loadIngredient(item.id);
        }}
        activeOpacity={0.7}
      >
        <View style={[styles.categoryDot, { backgroundColor: color }]} />
        <View style={styles.ingredientInfo}>
          <Text style={styles.ingredientName}>{item.name_pt || item.name}</Text>
          <Text style={styles.ingredientEnName}>
            {item.name_pt ? item.name : ''}
          </Text>
          <Text style={[styles.ingredientCategory, { color }]}>
            {item.category}
          </Text>
        </View>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
    );
  }, []);

  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  if (loading && mode === 'detail' && !ingredient) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Detail view
  if (mode === 'detail' && ingredient) {
    const color = getCategoryColor(ingredient.category);
    return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.detailHeader}>
          {!ingredientId && (
            <TouchableOpacity onPress={goBack} style={styles.backBtn}>
              <Text style={styles.backText}>{'< Ingredientes'}</Text>
            </TouchableOpacity>
          )}
          <View style={[styles.bigCategoryBadge, { backgroundColor: color + '25', borderColor: color + '50' }]}>
            <View style={[styles.bigDot, { backgroundColor: color }]} />
            <Text style={[styles.bigCategoryText, { color }]}>{ingredient.category}</Text>
          </View>
          <Text style={styles.detailName}>{ingredient.name_pt || ingredient.name}</Text>
          {ingredient.name_pt && (
            <Text style={styles.detailEnName}>{ingredient.name}</Text>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.detailDesc}>
            {ingredient.description_pt || ingredient.description}
          </Text>
        </View>

        {/* Pairings */}
        {pairings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Combina bem com</Text>
            <View style={styles.pairingsGrid}>
              {pairings.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={styles.pairingCard}
                  onPress={() => {
                    navigation.setOptions({ title: p.name_pt || p.name });
                    loadIngredient(p.id);
                  }}
                >
                  <View style={[styles.pairingDot, { backgroundColor: getCategoryColor(p.category) }]} />
                  <Text style={styles.pairingName}>{p.name_pt || p.name}</Text>
                  <View style={styles.affinityBar}>
                    <View style={[styles.affinityFill, { width: `${p.affinity * 100}%`, backgroundColor: getCategoryColor(p.category) }]} />
                  </View>
                  <Text style={styles.affinityText}>{Math.round(p.affinity * 100)}%</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Perfumes with this ingredient */}
        {perfumes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Perfumes com {ingredient.name_pt || ingredient.name}
            </Text>
            {perfumes.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.perfumeRow}
                onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: p.id })}
              >
                <View style={styles.perfumeInfo}>
                  <Text style={styles.perfumeBrand}>{p.brand}</Text>
                  <Text style={styles.perfumeName} numberOfLines={1}>{p.name}</Text>
                </View>
                {p.note_position && (
                  <View style={[styles.positionBadge, {
                    backgroundColor: p.note_position === 'top' ? '#FFD70030' :
                      p.note_position === 'heart' ? '#FF69B430' : '#8B451330'
                  }]}>
                    <Text style={[styles.positionText, {
                      color: p.note_position === 'top' ? '#FFD700' :
                        p.note_position === 'heart' ? '#FF69B4' : '#8B4513'
                    }]}>
                      {p.note_position === 'top' ? 'Topo' : p.note_position === 'heart' ? 'Coracao' : 'Base'}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    );
  }

  // List view
  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ingrediente..."
          placeholderTextColor={theme.colors.textTertiary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((c) => {
          const isActive = category === c.key;
          const color = c.key ? getCategoryColor(c.key) : theme.colors.primary;
          return (
            <TouchableOpacity
              key={c.key || 'all'}
              style={[styles.categoryTab, isActive && { backgroundColor: color + '30', borderColor: color }]}
              onPress={() => setCategory(c.key)}
            >
              {c.key && <View style={[styles.tabDot, { backgroundColor: color }]} />}
              <Text style={[styles.categoryTabText, isActive && { color }]}>
                {c.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Count */}
      <Text style={styles.countText}>{ingredients.length} ingredientes</Text>

      {/* List */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.id}
          renderItem={renderIngredientItem}
          getItemLayout={getItemLayout}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum ingrediente encontrado</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: theme.spacing.md,
    paddingBottom: 0,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2,
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
  },
  categoriesScroll: {
    maxHeight: 50,
    marginTop: theme.spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 4,
  },
  tabDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  categoryTabText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  countText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textTertiary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    height: ITEM_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textPrimary,
  },
  ingredientEnName: {
    fontSize: theme.typography.caption,
    color: theme.colors.textTertiary,
  },
  ingredientCategory: {
    fontSize: theme.typography.small,
    fontWeight: theme.typography.semibold,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  arrow: {
    fontSize: theme.typography.h5,
    color: theme.colors.textTertiary,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textTertiary,
    fontSize: theme.typography.body,
    marginTop: theme.spacing.xl,
  },

  // Detail view
  detailHeader: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  backText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
  },
  bigCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    gap: 6,
    marginBottom: theme.spacing.md,
  },
  bigDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  bigCategoryText: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.semibold,
    textTransform: 'capitalize',
  },
  detailName: {
    fontSize: theme.typography.h2,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  detailEnName: {
    fontSize: theme.typography.h6,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  section: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  detailDesc: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  pairingsGrid: {
    gap: theme.spacing.sm,
  },
  pairingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  pairingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pairingName: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  affinityBar: {
    width: 60,
    height: 4,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 2,
  },
  affinityFill: {
    height: 4,
    borderRadius: 2,
  },
  affinityText: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
    width: 32,
    textAlign: 'right',
  },
  perfumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  perfumeInfo: {
    flex: 1,
  },
  perfumeBrand: {
    fontSize: theme.typography.small,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
    textTransform: 'uppercase',
  },
  perfumeName: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
  },
  positionBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.md,
    marginLeft: theme.spacing.sm,
  },
  positionText: {
    fontSize: theme.typography.small,
    fontWeight: theme.typography.semibold,
  },
});
