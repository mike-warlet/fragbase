import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../config';
import PerfumeCard from '../components/PerfumeCard';
import theme from '../theme';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    loadPerfumes();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        handleSearch();
      } else if (!initialLoad) {
        loadPerfumes();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const loadPerfumes = async () => {
    setLoading(true);
    try {
      const data = await api('/api/perfumes?limit=50');
      setResults(data.perfumes);
      setInitialLoad(false);
    } catch (error) {
      console.error('Load perfumes error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      loadPerfumes();
      return;
    }

    setLoading(true);
    try {
      const data = await api(`/api/perfumes?q=${encodeURIComponent(query)}`);
      setResults(data.perfumes);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPerfume = ({ item }) => (
    <PerfumeCard 
      perfume={item}
      onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
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
            ✕
          </Text>
        )}
      </View>

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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🌸</Text>
              <Text style={styles.emptyTitle}>
                {query ? 'Nenhum perfume encontrado' : 'Nenhum perfume disponível'}
              </Text>
              {query && (
                <Text style={styles.emptyText}>
                  Tente buscar por outro nome ou marca
                </Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
  },
  clearButton: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    padding: theme.spacing.xs,
  },
  list: {
    padding: theme.spacing.md,
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
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
  },
});
