import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Image, TextInput, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function SOTDPickerScreen({ navigation }) {
  const [ownedPerfumes, setOwnedPerfumes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [note, setNote] = useState('');
  const [occasion, setOccasion] = useState(null);
  const [mood, setMood] = useState(null);
  const [weather, setWeather] = useState(null);
  const [mode, setMode] = useState('collection'); // 'collection' | 'search'

  useEffect(() => {
    fetchOwnedPerfumes();
  }, []);

  useEffect(() => {
    if (mode === 'search' && search.length >= 2) {
      const timer = setTimeout(() => searchPerfumes(search), 400);
      return () => clearTimeout(timer);
    }
  }, [search, mode]);

  const fetchOwnedPerfumes = async () => {
    try {
      const data = await apiCall('/api/wishlists/me?type=own');
      setOwnedPerfumes(data.wishlists || []);
    } catch (error) {
      console.error('Failed to load collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchPerfumes = async (q) => {
    try {
      const data = await apiCall(`/api/perfumes?search=${encodeURIComponent(q)}&limit=20`);
      setSearchResults(data.perfumes || []);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPerfume) {
      Alert.alert('Erro', 'Seleciona um perfume primeiro');
      return;
    }

    setSubmitting(true);
    try {
      await apiCall('/api/sotd', {
        method: 'POST',
        body: JSON.stringify({
          perfume_id: selectedPerfume.perfume_id || selectedPerfume.id,
          note: note.trim() || undefined,
          occasion: occasion || undefined,
          mood: mood || undefined,
          weather: weather || undefined,
        }),
      });
      Alert.alert('SOTD Definido!', `${selectedPerfume.perfume_name || selectedPerfume.name} é o teu perfume do dia.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao definir SOTD');
    } finally {
      setSubmitting(false);
    }
  };

  const renderPerfumeItem = ({ item }) => {
    const name = item.perfume_name || item.name;
    const brand = item.perfume_brand || item.brand;
    const image = item.perfume_image || item.image_url;
    const id = item.perfume_id || item.id;
    const isSelected = (selectedPerfume?.perfume_id || selectedPerfume?.id) === id;

    return (
      <TouchableOpacity
        style={[styles.perfumeItem, isSelected && styles.perfumeItemSelected]}
        onPress={() => setSelectedPerfume(item)}
        activeOpacity={0.7}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.perfumeImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>{'\uD83E\uDDF4'}</Text>
          </View>
        )}
        <View style={styles.perfumeInfo}>
          <Text style={styles.perfumeName} numberOfLines={1}>{name}</Text>
          <Text style={styles.perfumeBrand} numberOfLines={1}>{brand}</Text>
        </View>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>{'\u2713'}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const data = mode === 'collection' ? ownedPerfumes : searchResults;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Mode tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, mode === 'collection' && styles.tabActive]}
          onPress={() => setMode('collection')}
        >
          <Text style={[styles.tabText, mode === 'collection' && styles.tabTextActive]}>
            Minha Coleção
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, mode === 'search' && styles.tabActive]}
          onPress={() => setMode('search')}
        >
          <Text style={[styles.tabText, mode === 'search' && styles.tabTextActive]}>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search bar (only in search mode) */}
      {mode === 'search' && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar perfume..."
            placeholderTextColor={colors.textTertiary}
            value={search}
            onChangeText={setSearch}
            autoFocus
          />
        </View>
      )}

      {/* Perfume list */}
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.perfume_id || item.id)}
        renderItem={renderPerfumeItem}
        contentContainerStyle={data.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              {mode === 'collection' ? '\uD83D\uDCE6' : '\uD83D\uDD0D'}
            </Text>
            <Text style={styles.emptyText}>
              {mode === 'collection'
                ? 'Nenhum perfume na coleção'
                : search.length < 2
                  ? 'Escreve pelo menos 2 letras'
                  : 'Nenhum resultado'
              }
            </Text>
          </View>
        }
      />

      {/* Note input + Tags + Submit */}
      {selectedPerfume && (
        <View style={styles.bottomBar}>
          {/* Occasion tags */}
          <View style={styles.tagSection}>
            <Text style={styles.tagLabel}>Ocasiao</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.tagRow}>
                {['Trabalho', 'Casual', 'Encontro', 'Festa', 'Esporte', 'Formal'].map((o) => (
                  <TouchableOpacity
                    key={o}
                    style={[styles.tag, occasion === o && styles.tagSelected]}
                    onPress={() => setOccasion(occasion === o ? null : o)}
                  >
                    <Text style={[styles.tagText, occasion === o && styles.tagTextSelected]}>{o}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          {/* Mood tags */}
          <View style={styles.tagSection}>
            <Text style={styles.tagLabel}>Humor</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.tagRow}>
                {['Confiante', 'Relaxado', 'Romantico', 'Energetico', 'Misterioso', 'Alegre'].map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.tag, mood === m && styles.tagSelected]}
                    onPress={() => setMood(mood === m ? null : m)}
                  >
                    <Text style={[styles.tagText, mood === m && styles.tagTextSelected]}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          {/* Weather tags */}
          <View style={styles.tagSection}>
            <Text style={styles.tagLabel}>Clima</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.tagRow}>
                {['Quente', 'Frio', 'Ameno', 'Chuvoso', 'Umido', 'Seco'].map((w) => (
                  <TouchableOpacity
                    key={w}
                    style={[styles.tag, weather === w && styles.tagSelected]}
                    onPress={() => setWeather(weather === w ? null : w)}
                  >
                    <Text style={[styles.tagText, weather === w && styles.tagTextSelected]}>{w}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          <TextInput
            style={styles.noteInput}
            placeholder="Nota opcional (ex: perfeito para hoje!)"
            placeholderTextColor={colors.textTertiary}
            value={note}
            onChangeText={setNote}
            maxLength={100}
          />
          <TouchableOpacity
            style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator size="small" color={colors.textPrimary} />
            ) : (
              <Text style={styles.submitText}>Definir SOTD</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
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
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.body,
    fontWeight: typography.medium,
    color: colors.textTertiary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  searchContainer: {
    padding: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  list: {
    padding: spacing.md,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  perfumeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  perfumeItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundLight,
  },
  perfumeImage: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  placeholderText: {
    fontSize: 24,
  },
  perfumeInfo: {
    flex: 1,
  },
  perfumeName: {
    fontSize: typography.body + 1,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  perfumeBrand: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: typography.bold,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  bottomBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  noteInput: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitText: {
    fontSize: typography.body + 1,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  tagSection: {
    marginBottom: spacing.xs,
  },
  tagLabel: {
    fontSize: typography.small,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  tagTextSelected: {
    color: colors.textPrimary,
    fontWeight: typography.semibold,
  },
});
