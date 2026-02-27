import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function AddFragranceScreen({ route, navigation }) {
  const { collectionId, listType } = route.params || {};

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  // Create new perfume fields
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newConcentration, setNewConcentration] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(() => searchPerfumes(), 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const searchPerfumes = async () => {
    setLoading(true);
    try {
      const data = await apiCall(`/api/perfumes?q=${encodeURIComponent(query)}&limit=20`);
      setResults(data.perfumes || data || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPerfume = async (perfume) => {
    setAdding(perfume.id);
    try {
      if (collectionId) {
        await apiCall(`/api/collections/${collectionId}/perfumes`, {
          method: 'POST',
          body: JSON.stringify({ perfume_id: perfume.id }),
        });
        Alert.alert('Sucesso', `${perfume.name} adicionado à coleção!`);
      } else {
        const type = listType || 'own';
        await apiCall('/api/wishlists', {
          method: 'POST',
          body: JSON.stringify({ perfume_id: perfume.id, list_type: type }),
        });
        const labels = { own: 'coleção', want: 'lista de desejos', tried: 'experimentados' };
        Alert.alert('Sucesso', `${perfume.name} adicionado à ${labels[type]}!`);
      }
      navigation.goBack();
    } catch (error) {
      if (error.message.includes('already')) {
        Alert.alert('Aviso', 'Este perfume já está na lista');
      } else {
        Alert.alert('Erro', 'Falha ao adicionar perfume');
      }
    } finally {
      setAdding(null);
    }
  };

  const handleCreatePerfume = async () => {
    if (!newName.trim() || !newBrand.trim()) {
      Alert.alert('Erro', 'Nome e marca são obrigatórios');
      return;
    }

    setCreating(true);
    try {
      const perfume = await apiCall('/api/perfumes', {
        method: 'POST',
        body: JSON.stringify({
          name: newName.trim(),
          brand: newBrand.trim(),
          year: newYear ? parseInt(newYear) : null,
          concentration: newConcentration.trim() || null,
        }),
      });

      Alert.alert('Sucesso', `${newName} criado!`, [
        {
          text: 'OK',
          onPress: () => {
            if (collectionId || listType) {
              handleAddPerfume(perfume);
            } else {
              navigation.goBack();
            }
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao criar perfume');
    } finally {
      setCreating(false);
    }
  };

  const renderResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => handleAddPerfume(item)}
      disabled={adding === item.id}
      activeOpacity={0.7}
    >
      <View style={styles.resultImage}>
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={{ fontSize: 24 }}>🌸</Text>
          </View>
        )}
      </View>
      <View style={styles.resultContent}>
        <Text style={styles.resultBrand}>{item.brand}</Text>
        <Text style={styles.resultName} numberOfLines={1}>{item.name}</Text>
        {item.year && <Text style={styles.resultYear}>{item.year}</Text>}
      </View>
      {adding === item.id ? (
        <ActivityIndicator color={colors.primary} style={styles.addIndicator} />
      ) : (
        <Text style={styles.addIcon}>+</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar perfume por nome ou marca..."
          placeholderTextColor={colors.textTertiary}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={() => setQuery('')}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Results */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderResult}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            query.length >= 2 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum resultado para "{query}"</Text>
                <TouchableOpacity
                  style={styles.createBtn}
                  onPress={() => {
                    setNewName(query);
                    setShowCreate(true);
                  }}
                >
                  <Text style={styles.createBtnText}>Criar novo perfume</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.hintEmoji}>🔍</Text>
                <Text style={styles.hintText}>
                  Digite pelo menos 2 caracteres para buscar
                </Text>
              </View>
            )
          }
          ListFooterComponent={
            results.length > 0 && !showCreate ? (
              <TouchableOpacity
                style={styles.createFooter}
                onPress={() => setShowCreate(true)}
              >
                <Text style={styles.createFooterText}>
                  Não encontrou? Criar novo perfume
                </Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}

      {/* Create New Perfume Form */}
      {showCreate && (
        <View style={styles.createForm}>
          <View style={styles.createHeader}>
            <Text style={styles.createTitle}>Criar Novo Perfume</Text>
            <TouchableOpacity onPress={() => setShowCreate(false)}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.formInput}
            placeholder="Nome do perfume *"
            placeholderTextColor={colors.textTertiary}
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Marca *"
            placeholderTextColor={colors.textTertiary}
            value={newBrand}
            onChangeText={setNewBrand}
          />
          <View style={styles.formRow}>
            <TextInput
              style={[styles.formInput, styles.formHalf]}
              placeholder="Ano"
              placeholderTextColor={colors.textTertiary}
              value={newYear}
              onChangeText={setNewYear}
              keyboardType="numeric"
              maxLength={4}
            />
            <TextInput
              style={[styles.formInput, styles.formHalf]}
              placeholder="Concentração"
              placeholderTextColor={colors.textTertiary}
              value={newConcentration}
              onChangeText={setNewConcentration}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, creating && { opacity: 0.5 }]}
            onPress={handleCreatePerfume}
            disabled={creating}
          >
            {creating ? (
              <ActivityIndicator color={colors.textPrimary} />
            ) : (
              <Text style={styles.submitBtnText}>Criar e Adicionar</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  clearBtn: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  clearText: {
    fontSize: 18,
    color: colors.textTertiary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: spacing.sm,
  },
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    overflow: 'hidden',
    ...shadows.sm,
  },
  resultImage: {
    width: 60,
    height: 60,
    backgroundColor: colors.surfaceLight,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContent: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  resultBrand: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
  },
  resultName: {
    fontSize: typography.body,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  resultYear: {
    fontSize: typography.small,
    color: colors.textTertiary,
  },
  addIcon: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: typography.bold,
    paddingHorizontal: spacing.md,
  },
  addIndicator: {
    paddingHorizontal: spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textTertiary,
    marginBottom: spacing.md,
  },
  hintEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  hintText: {
    fontSize: typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  createBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.round,
  },
  createBtnText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: typography.semibold,
  },
  createFooter: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  createFooterText: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: typography.medium,
  },
  // Create form
  createForm: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  createHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  createTitle: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  closeText: {
    fontSize: 20,
    color: colors.textTertiary,
  },
  formInput: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  formHalf: {
    flex: 1,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md - 4,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  submitBtnText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: typography.bold,
  },
});
