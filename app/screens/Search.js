import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView, Animated, Modal, Dimensions, Alert,
} from 'react-native';
import { apiCall } from '../config';
import PerfumeCard from '../components/PerfumeCard';
import theme from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SORT_OPTIONS = [
  { key: 'relevance', label: 'Relevancia' },
  { key: 'rating', label: 'Rating' },
  { key: 'year', label: 'Ano' },
  { key: 'name', label: 'Nome' },
];

const GENDER_OPTIONS = [
  { key: 'masculine', label: 'Masculino' },
  { key: 'feminine', label: 'Feminino' },
  { key: 'unisex', label: 'Unisex' },
];

const RATING_OPTIONS = [
  { key: 3, label: '3+' },
  { key: 4, label: '4+' },
];

const QUICK_CATEGORIES = [
  { key: 'fresh', label: 'Frescos', icon: '\uD83C\uDF0A', accords: ['fresh', 'citrus', 'aquatic'] },
  { key: 'floral', label: 'Florais', icon: '\uD83C\uDF38', accords: ['floral', 'powdery'] },
  { key: 'woody', label: 'Amadeirados', icon: '\uD83C\uDF32', accords: ['woody', 'earthy'] },
  { key: 'oriental', label: 'Orientais', icon: '\u2728', accords: ['amber', 'warm spicy', 'sweet'] },
  { key: 'gourmand', label: 'Gourmand', icon: '\uD83C\uDF6B', accords: ['sweet', 'vanilla', 'honey'] },
  { key: 'leather', label: 'Couro', icon: '\uD83E\uDDF4', accords: ['leather', 'smoky', 'animalic'] },
];

export default function SearchScreen({ navigation }) {
  // Search state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');
  const [minRating, setMinRating] = useState(null);
  const [selectedAccords, setSelectedAccords] = useState([]);
  const [sort, setSort] = useState('relevance');

  // Filter options from API
  const [filterOptions, setFilterOptions] = useState(null);
  const [loadingOptions, setLoadingOptions] = useState(false);

  // Brand search within filter panel
  const [brandSearch, setBrandSearch] = useState('');

  // Quick category
  const [activeCategory, setActiveCategory] = useState(null);

  // Sort dropdown
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Animation for filter panel
  const filterAnim = useRef(new Animated.Value(0)).current;

  // Load filter options on mount
  useEffect(() => {
    loadFilterOptions();
    loadPerfumes();
  }, []);

  // Debounced search when query or filters change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query || hasActiveFilters) {
        handleSearch();
      } else if (!initialLoad) {
        loadPerfumes();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, selectedBrand, selectedGender, yearMin, yearMax, minRating, selectedAccords, sort]);

  // Animate filter panel
  useEffect(() => {
    Animated.timing(filterAnim, {
      toValue: showFilters ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showFilters]);

  const hasActiveFilters = useMemo(() => {
    return !!(selectedBrand || selectedGender || yearMin || yearMax || minRating || selectedAccords.length > 0 || sort !== 'relevance');
  }, [selectedBrand, selectedGender, yearMin, yearMax, minRating, selectedAccords, sort]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedBrand) count++;
    if (selectedGender) count++;
    if (yearMin || yearMax) count++;
    if (minRating) count++;
    if (selectedAccords.length > 0) count++;
    if (sort !== 'relevance') count++;
    return count;
  }, [selectedBrand, selectedGender, yearMin, yearMax, minRating, selectedAccords, sort]);

  const loadFilterOptions = async () => {
    setLoadingOptions(true);
    try {
      const data = await apiCall('/api/filters/options');
      setFilterOptions(data);
    } catch (error) {
      // Filter options are non-critical, fail silently
    } finally {
      setLoadingOptions(false);
    }
  };

  const loadPerfumes = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/api/perfumes?limit=50');
      setResults(data.perfumes || []);
      setInitialLoad(false);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar perfumes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim() && !hasActiveFilters) {
      loadPerfumes();
      return;
    }

    setLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      params.set('type', 'perfumes');
      params.set('limit', '50');

      if (query.trim()) {
        params.set('q', query.trim());
      }
      if (selectedBrand) {
        params.set('brand', selectedBrand);
      }
      if (selectedGender) {
        params.set('gender', selectedGender);
      }
      if (yearMin) {
        params.set('year_min', yearMin);
      }
      if (yearMax) {
        params.set('year_max', yearMax);
      }
      if (minRating) {
        params.set('min_rating', String(minRating));
      }
      if (selectedAccords.length > 0) {
        params.set('accords', selectedAccords.join(','));
      }
      if (sort !== 'relevance') {
        params.set('sort', sort);
      }

      const data = await apiCall(`/api/search?${params.toString()}`);
      setResults(data.perfumes || []);
    } catch (error) {
      Alert.alert('Erro', 'Falha na busca. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrand('');
    setSelectedGender('');
    setYearMin('');
    setYearMax('');
    setMinRating(null);
    setSelectedAccords([]);
    setSort('relevance');
    setBrandSearch('');
  };

  const removeFilter = (filterType, value) => {
    switch (filterType) {
      case 'brand':
        setSelectedBrand('');
        break;
      case 'gender':
        setSelectedGender('');
        break;
      case 'year':
        setYearMin('');
        setYearMax('');
        break;
      case 'rating':
        setMinRating(null);
        break;
      case 'accord':
        setSelectedAccords(prev => prev.filter(a => a !== value));
        break;
      case 'sort':
        setSort('relevance');
        break;
    }
  };

  const selectCategory = (cat) => {
    if (activeCategory === cat.key) {
      setActiveCategory(null);
      setSelectedAccords([]);
    } else {
      setActiveCategory(cat.key);
      setSelectedAccords(cat.accords);
    }
  };

  const toggleAccord = (accordName) => {
    setActiveCategory(null); // clear quick category when manually toggling
    setSelectedAccords(prev => {
      if (prev.includes(accordName)) {
        return prev.filter(a => a !== accordName);
      }
      return [...prev, accordName];
    });
  };

  const filteredBrands = useMemo(() => {
    if (!filterOptions?.brands) return [];
    if (!brandSearch.trim()) return filterOptions.brands.slice(0, 30);
    const search = brandSearch.toLowerCase();
    return filterOptions.brands.filter(b =>
      b.brand.toLowerCase().includes(search)
    ).slice(0, 30);
  }, [filterOptions, brandSearch]);

  const renderPerfume = useCallback(({ item }) => (
    <PerfumeCard
      perfume={item}
      onPress={() => {
        navigation.navigate('PerfumeDetail', { perfumeId: item.id });
      }}
    />
  ), [navigation]);

  // Active filter chips
  const renderActiveFilters = () => {
    if (!hasActiveFilters) return null;

    const chips = [];

    if (selectedBrand) {
      chips.push({ key: 'brand', label: selectedBrand, type: 'brand' });
    }
    if (selectedGender) {
      const genderLabel = GENDER_OPTIONS.find(g => g.key === selectedGender)?.label || selectedGender;
      chips.push({ key: 'gender', label: genderLabel, type: 'gender' });
    }
    if (yearMin || yearMax) {
      const yearLabel = yearMin && yearMax ? `${yearMin}-${yearMax}` : yearMin ? `>= ${yearMin}` : `<= ${yearMax}`;
      chips.push({ key: 'year', label: yearLabel, type: 'year' });
    }
    if (minRating) {
      chips.push({ key: 'rating', label: `${minRating}+ estrelas`, type: 'rating' });
    }
    selectedAccords.forEach(accord => {
      chips.push({ key: `accord-${accord}`, label: accord, type: 'accord', value: accord });
    });
    if (sort !== 'relevance') {
      const sortLabel = SORT_OPTIONS.find(s => s.key === sort)?.label || sort;
      chips.push({ key: 'sort', label: `Ordem: ${sortLabel}`, type: 'sort' });
    }

    return (
      <View style={styles.activeFiltersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activeFiltersScroll}>
          {chips.map(chip => (
            <TouchableOpacity
              key={chip.key}
              style={styles.activeFilterChip}
              onPress={() => removeFilter(chip.type, chip.value)}
              activeOpacity={0.7}
            >
              <Text style={styles.activeFilterText}>{chip.label}</Text>
              <Text style={styles.activeFilterClose}>  x</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.clearAllButton}
            onPress={clearAllFilters}
            activeOpacity={0.7}
          >
            <Text style={styles.clearAllText}>Limpar filtros</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  // Filter panel sections
  const renderFilterPanel = () => {
    const panelHeight = filterAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 520],
    });

    const panelOpacity = filterAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });

    return (
      <Animated.View style={[styles.filterPanel, { maxHeight: panelHeight, opacity: panelOpacity }]}>
        <ScrollView
          style={styles.filterScroll}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {/* Sort Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Ordenar por</Text>
            <View style={styles.sortRow}>
              {SORT_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.sortButton,
                    sort === option.key && styles.sortButtonActive,
                  ]}
                  onPress={() => setSort(option.key)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.sortButtonText,
                    sort === option.key && styles.sortButtonTextActive,
                  ]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Gender Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Genero</Text>
            <View style={styles.genderRow}>
              {GENDER_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.genderButton,
                    selectedGender === option.key && styles.genderButtonActive,
                    selectedGender === option.key && {
                      backgroundColor: theme.colors[option.key] || theme.colors.primary,
                    },
                  ]}
                  onPress={() => setSelectedGender(selectedGender === option.key ? '' : option.key)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.genderButtonText,
                    selectedGender === option.key && styles.genderButtonTextActive,
                  ]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Rating Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Rating minimo</Text>
            <View style={styles.ratingRow}>
              {RATING_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.ratingButton,
                    minRating === option.key && styles.ratingButtonActive,
                  ]}
                  onPress={() => setMinRating(minRating === option.key ? null : option.key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.ratingStarIcon}>{'*'.repeat(option.key)}</Text>
                  <Text style={[
                    styles.ratingButtonText,
                    minRating === option.key && styles.ratingButtonTextActive,
                  ]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Year Range Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Ano de lancamento</Text>
            <View style={styles.yearRow}>
              <View style={styles.yearInputWrapper}>
                <Text style={styles.yearLabel}>De</Text>
                <TextInput
                  style={styles.yearInput}
                  placeholder={filterOptions?.year_range?.min ? String(filterOptions.year_range.min) : '1900'}
                  placeholderTextColor={theme.colors.textTertiary}
                  value={yearMin}
                  onChangeText={setYearMin}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
              <Text style={styles.yearDash}>-</Text>
              <View style={styles.yearInputWrapper}>
                <Text style={styles.yearLabel}>Ate</Text>
                <TextInput
                  style={styles.yearInput}
                  placeholder={filterOptions?.year_range?.max ? String(filterOptions.year_range.max) : '2026'}
                  placeholderTextColor={theme.colors.textTertiary}
                  value={yearMax}
                  onChangeText={setYearMax}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>
          </View>

          {/* Brand Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Marca</Text>
            <TextInput
              style={styles.brandSearchInput}
              placeholder="Buscar marca..."
              placeholderTextColor={theme.colors.textTertiary}
              value={brandSearch}
              onChangeText={setBrandSearch}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.brandList}
              contentContainerStyle={styles.brandListContent}
              nestedScrollEnabled
            >
              {filteredBrands.map(b => (
                <TouchableOpacity
                  key={b.brand}
                  style={[
                    styles.brandChip,
                    selectedBrand === b.brand && styles.brandChipActive,
                  ]}
                  onPress={() => setSelectedBrand(selectedBrand === b.brand ? '' : b.brand)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.brandChipText,
                    selectedBrand === b.brand && styles.brandChipTextActive,
                  ]} numberOfLines={1}>{b.brand}</Text>
                  <Text style={styles.brandChipCount}> ({b.count})</Text>
                </TouchableOpacity>
              ))}
              {filteredBrands.length === 0 && (
                <Text style={styles.noResultsText}>Nenhuma marca encontrada</Text>
              )}
            </ScrollView>
          </View>

          {/* Accords Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Acordes</Text>
            <View style={styles.accordsGrid}>
              {(filterOptions?.accords || []).slice(0, 20).map(accord => {
                const isSelected = selectedAccords.includes(accord.name);
                const accordColor = theme.getAccordColor(accord.name);
                return (
                  <TouchableOpacity
                    key={accord.name}
                    style={[
                      styles.accordChip,
                      isSelected && { backgroundColor: accordColor + 'CC', borderColor: accordColor },
                      !isSelected && { borderColor: accordColor + '60' },
                    ]}
                    onPress={() => toggleAccord(accord.name)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.accordDot, { backgroundColor: accordColor }]} />
                    <Text style={[
                      styles.accordChipText,
                      isSelected && styles.accordChipTextActive,
                    ]}>{accord.name}</Text>
                    <Text style={styles.accordChipCount}>{accord.count}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={clearAllFilters}
              activeOpacity={0.7}
            >
              <Text style={styles.clearFiltersText}>Limpar filtros</Text>
            </TouchableOpacity>
          )}

          <View style={styles.filterPanelBottomPad} />
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar Row */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>{'O'}</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar perfumes, marcas..."
            placeholderTextColor={theme.colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Text
              style={styles.clearButton}
              onPress={() => setQuery('')}
            >
              x
            </Text>
          )}
        </View>

        {/* Filtros button */}
        <TouchableOpacity
          style={[
            styles.filterToggleButton,
            showFilters && styles.filterToggleButtonActive,
          ]}
          onPress={() => setShowFilters(!showFilters)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.filterToggleText,
            showFilters && styles.filterToggleTextActive,
          ]}>Filtros</Text>
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Quick Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickCategoryScroll}
        style={styles.quickCategoryRow}
      >
        {QUICK_CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.quickCategoryChip,
              activeCategory === cat.key && styles.quickCategoryActive,
            ]}
            onPress={() => selectCategory(cat)}
            activeOpacity={0.7}
          >
            <Text style={styles.quickCategoryIcon}>{cat.icon}</Text>
            <Text style={[
              styles.quickCategoryText,
              activeCategory === cat.key && styles.quickCategoryTextActive,
            ]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Active Filter Chips */}
      {renderActiveFilters()}

      {/* Collapsible Filter Panel */}
      {renderFilterPanel()}

      {/* Results */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Buscando perfumes...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderPerfume}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            results.length > 0 ? (
              <Text style={styles.resultCount}>
                {results.length} perfume{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </Text>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>{'~'}</Text>
              <Text style={styles.emptyTitle}>
                {query || hasActiveFilters ? 'Nenhum perfume encontrado' : 'Nenhum perfume disponivel'}
              </Text>
              {(query || hasActiveFilters) && (
                <Text style={styles.emptyText}>
                  Tente buscar por outro nome, marca ou ajuste os filtros
                </Text>
              )}
              {hasActiveFilters && (
                <TouchableOpacity
                  style={styles.emptyResetButton}
                  onPress={clearAllFilters}
                  activeOpacity={0.7}
                >
                  <Text style={styles.emptyResetText}>Limpar filtros</Text>
                </TouchableOpacity>
              )}
            </View>
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

  // Search bar row
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
    color: theme.colors.textTertiary,
    fontWeight: theme.typography.bold,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
  },
  clearButton: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    padding: theme.spacing.xs,
    fontWeight: theme.typography.bold,
  },

  // Filter toggle button
  filterToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  filterToggleButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterToggleText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.semibold,
  },
  filterToggleTextActive: {
    color: theme.colors.textPrimary,
  },
  filterBadge: {
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.xs,
    paddingHorizontal: 5,
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: theme.typography.small,
    fontWeight: theme.typography.bold,
  },

  // Quick categories
  quickCategoryRow: {
    maxHeight: 44,
    marginBottom: theme.spacing.sm,
  },
  quickCategoryScroll: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickCategoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 4,
  },
  quickCategoryActive: {
    backgroundColor: theme.colors.primary + '40',
    borderColor: theme.colors.primary,
  },
  quickCategoryIcon: {
    fontSize: 14,
  },
  quickCategoryText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.medium,
  },
  quickCategoryTextActive: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.bold,
  },

  // Active filter chips
  activeFiltersContainer: {
    marginBottom: theme.spacing.sm,
  },
  activeFiltersScroll: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight + '40',
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
  },
  activeFilterText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.medium,
    textTransform: 'capitalize',
  },
  activeFilterClose: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.bold,
  },
  clearAllButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
  },
  clearAllText: {
    fontSize: theme.typography.caption,
    color: theme.colors.error,
    fontWeight: theme.typography.semibold,
  },

  // Filter panel
  filterPanel: {
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundLight,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  filterScroll: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  filterSection: {
    marginBottom: theme.spacing.md,
  },
  filterSectionTitle: {
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.bold,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },

  // Sort
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  sortButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sortButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortButtonText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.medium,
  },
  sortButtonTextActive: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.bold,
  },

  // Gender
  genderRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  genderButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm + 2,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  genderButtonActive: {
    borderWidth: 2,
  },
  genderButtonText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.medium,
  },
  genderButtonTextActive: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.bold,
  },

  // Rating
  ratingRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  ratingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 4,
  },
  ratingButtonActive: {
    backgroundColor: theme.colors.warning + '30',
    borderColor: theme.colors.warning,
  },
  ratingStarIcon: {
    fontSize: 14,
    color: theme.colors.warning,
  },
  ratingButtonText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.semibold,
  },
  ratingButtonTextActive: {
    color: theme.colors.textPrimary,
  },

  // Year range
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  yearInputWrapper: {
    flex: 1,
  },
  yearLabel: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
    marginBottom: 4,
  },
  yearInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    textAlign: 'center',
  },
  yearDash: {
    fontSize: theme.typography.h5,
    color: theme.colors.textTertiary,
    marginTop: theme.spacing.md,
  },

  // Brand section
  brandSearchInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.caption,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
  },
  brandList: {
    maxHeight: 44,
  },
  brandListContent: {
    gap: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  brandChipActive: {
    backgroundColor: theme.colors.primary + '40',
    borderColor: theme.colors.primary,
  },
  brandChipText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.medium,
    maxWidth: 120,
  },
  brandChipTextActive: {
    fontWeight: theme.typography.bold,
  },
  brandChipCount: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
  },
  noResultsText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textTertiary,
    fontStyle: 'italic',
  },

  // Accords
  accordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  accordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: theme.spacing.xs + 1,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    gap: 4,
  },
  accordDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  accordChipText: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.medium,
    textTransform: 'capitalize',
  },
  accordChipTextActive: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.bold,
  },
  accordChipCount: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
  },

  // Clear filters button
  clearFiltersButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  clearFiltersText: {
    fontSize: theme.typography.body,
    color: theme.colors.error,
    fontWeight: theme.typography.semibold,
  },
  filterPanelBottomPad: {
    height: theme.spacing.sm,
  },

  // Results list
  list: {
    padding: theme.spacing.md,
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  resultCount: {
    fontSize: theme.typography.caption,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.sm,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
    color: theme.colors.textTertiary,
  },
  emptyTitle: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  emptyResetButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm + 2,
    borderRadius: theme.borderRadius.lg,
  },
  emptyResetText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body,
    fontWeight: theme.typography.semibold,
  },
});
