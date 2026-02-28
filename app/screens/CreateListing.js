import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator, Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { apiCall } from '../config';

const CONDITIONS = [
  { value: 'new', label: 'Novo / Lacrado' },
  { value: 'used_like_new', label: 'Seminovo' },
  { value: 'used_good', label: 'Usado - Bom estado' },
  { value: 'used_fair', label: 'Usado - Regular' },
  { value: 'decant', label: 'Decant' },
  { value: 'sample', label: 'Amostra' },
];

const TYPES = [
  { value: 'sell', label: 'Vender' },
  { value: 'swap', label: 'Trocar' },
  { value: 'both', label: 'Vender ou Trocar' },
];

export default function CreateListingScreen({ navigation, route }) {
  const perfume = route.params?.perfume;
  const [title, setTitle] = useState(perfume ? `${perfume.brand} - ${perfume.name}` : '');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [listingType, setListingType] = useState('sell');
  const [price, setPrice] = useState('');
  const [volume, setVolume] = useState('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPerfume, setSelectedPerfume] = useState(perfume || null);
  const [searching, setSearching] = useState(false);

  const searchPerfumes = async (q) => {
    setSearchQuery(q);
    if (q.length < 2) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const data = await apiCall(`/api/perfumes?search=${encodeURIComponent(q)}&limit=5`);
      setSearchResults(data.perfumes || []);
    } catch { /* ignore */ }
    setSearching(false);
  };

  const selectPerfume = (p) => {
    setSelectedPerfume(p);
    if (!title) setTitle(`${p.brand} - ${p.name}`);
    setSearchResults([]);
    setSearchQuery('');
  };

  const submit = async () => {
    if (!title.trim()) return Alert.alert('Erro', 'Título é obrigatório');
    if (!condition) return Alert.alert('Erro', 'Selecione a condição');
    if (listingType === 'sell' && !price) return Alert.alert('Erro', 'Preço é obrigatório para venda');

    setSubmitting(true);
    try {
      await apiCall('/api/marketplace', {
        method: 'POST',
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          perfume_id: selectedPerfume?.id || null,
          condition,
          listing_type: listingType,
          price: price ? parseFloat(price) : null,
          volume_ml: volume ? parseInt(volume) : null,
          location: location.trim() || null,
        }),
      });
      Alert.alert('Sucesso', 'Anúncio criado!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
    setSubmitting(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Link perfume */}
        <Text style={styles.label}>Perfume (opcional)</Text>
        {selectedPerfume ? (
          <View style={styles.selectedPerfume}>
            <Image source={{ uri: selectedPerfume.image_url || 'https://via.placeholder.com/40' }} style={styles.perfumeThumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.perfumeName}>{selectedPerfume.name}</Text>
              <Text style={styles.perfumeBrand}>{selectedPerfume.brand}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedPerfume(null)}>
              <Text style={styles.removeBtn}>X</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Buscar perfume para vincular..."
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={searchPerfumes}
            />
            {searchResults.map(p => (
              <TouchableOpacity key={p.id} style={styles.searchResult} onPress={() => selectPerfume(p)}>
                <Text style={styles.searchResultText}>{p.brand} - {p.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Título *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle}
          placeholder="Ex: Sauvage EDP 100ml lacrado" placeholderTextColor={colors.textTertiary} />

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          value={description} onChangeText={setDescription} multiline
          placeholder="Detalhes, lote, etc." placeholderTextColor={colors.textTertiary} />

        <Text style={styles.label}>Tipo de anúncio *</Text>
        <View style={styles.optionsRow}>
          {TYPES.map(t => (
            <TouchableOpacity key={t.value}
              style={[styles.option, listingType === t.value && styles.optionActive]}
              onPress={() => setListingType(t.value)}>
              <Text style={[styles.optionText, listingType === t.value && styles.optionTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Condição *</Text>
        <View style={styles.optionsRow}>
          {CONDITIONS.map(c => (
            <TouchableOpacity key={c.value}
              style={[styles.option, condition === c.value && styles.optionActive]}
              onPress={() => setCondition(c.value)}>
              <Text style={[styles.optionText, condition === c.value && styles.optionTextActive]}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {listingType !== 'swap' && (
          <>
            <Text style={styles.label}>Preço (R$) {listingType === 'sell' ? '*' : ''}</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice}
              keyboardType="numeric" placeholder="0.00" placeholderTextColor={colors.textTertiary} />
          </>
        )}

        <Text style={styles.label}>Volume (ml)</Text>
        <TextInput style={styles.input} value={volume} onChangeText={setVolume}
          keyboardType="numeric" placeholder="100" placeholderTextColor={colors.textTertiary} />

        <Text style={styles.label}>Localização</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation}
          placeholder="Ex: São Paulo, SP" placeholderTextColor={colors.textTertiary} />

        <TouchableOpacity style={styles.submitBtn} onPress={submit} disabled={submitting}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Publicar Anúncio</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  label: { color: colors.textSecondary, fontSize: typography.caption, marginTop: spacing.md, marginBottom: spacing.xs },
  input: {
    backgroundColor: colors.surface, borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    color: colors.textPrimary, fontSize: typography.body,
  },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  option: {
    backgroundColor: colors.surface, borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
  },
  optionActive: { backgroundColor: colors.primary },
  optionText: { color: colors.textSecondary, fontSize: typography.caption },
  optionTextActive: { color: '#fff', fontWeight: typography.semibold },
  selectedPerfume: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderRadius: borderRadius.md, padding: spacing.sm, gap: spacing.sm,
  },
  perfumeThumb: { width: 40, height: 40, borderRadius: borderRadius.sm },
  perfumeName: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  perfumeBrand: { color: colors.textSecondary, fontSize: typography.caption },
  removeBtn: { color: colors.error, fontSize: typography.h6, padding: spacing.xs },
  searchResult: { backgroundColor: colors.surface, padding: spacing.sm, borderRadius: borderRadius.sm, marginTop: 2 },
  searchResultText: { color: colors.textPrimary, fontSize: typography.body },
  submitBtn: {
    backgroundColor: colors.primary, borderRadius: borderRadius.lg,
    paddingVertical: spacing.md, alignItems: 'center', marginTop: spacing.lg,
  },
  submitText: { color: '#fff', fontSize: typography.h6, fontWeight: typography.bold },
});
