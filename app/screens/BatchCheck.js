import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { apiCall } from '../config';

const POPULAR_BRANDS = [
  'Dior', 'Chanel', 'Guerlain', 'Givenchy',
  'Yves Saint Laurent', 'Giorgio Armani', 'Lancome',
  'Carolina Herrera', 'Paco Rabanne', 'Jean Paul Gaultier',
  'Hugo Boss', 'Calvin Klein', 'Gucci', 'Burberry',
  'Tom Ford', 'Jo Malone', 'Le Labo',
  'Marc Jacobs', 'Valentino', 'Ralph Lauren',
  'Estee Lauder',
];

const FRESHNESS_COLORS = {
  fresh: colors.success,
  good: '#8bc34a',
  mature: colors.warning,
  old: colors.error,
};

export default function BatchCheckScreen({ navigation }) {
  const [brand, setBrand] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState(POPULAR_BRANDS);

  const filterBrands = (text) => {
    setBrand(text);
    if (text.length > 0) {
      setFilteredBrands(POPULAR_BRANDS.filter(b => b.toLowerCase().includes(text.toLowerCase())));
      setShowBrands(true);
    } else {
      setFilteredBrands(POPULAR_BRANDS);
      setShowBrands(false);
    }
  };

  const selectBrand = (b) => {
    setBrand(b);
    setShowBrands(false);
  };

  const check = async () => {
    if (!code.trim()) return Alert.alert('Erro', 'Digite o batch code');

    setLoading(true);
    setResult(null);
    try {
      const data = await apiCall('/api/batch-check', {
        method: 'POST',
        body: JSON.stringify({ brand: brand.trim(), code: code.trim() }),
      });
      setResult(data);
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Verificador de Batch Code</Text>
        <Text style={styles.heroText}>
          Descubra quando seu perfume foi fabricado e verifique a autenticidade
        </Text>
      </View>

      {/* Brand input */}
      <Text style={styles.label}>Marca</Text>
      <TextInput
        style={styles.input}
        value={brand}
        onChangeText={filterBrands}
        onFocus={() => setShowBrands(true)}
        placeholder="Ex: Dior, Chanel, Tom Ford..."
        placeholderTextColor={colors.textTertiary}
      />
      {showBrands && filteredBrands.length > 0 && (
        <View style={styles.dropdown}>
          {filteredBrands.slice(0, 6).map(b => (
            <TouchableOpacity key={b} style={styles.dropdownItem} onPress={() => selectBrand(b)}>
              <Text style={styles.dropdownText}>{b}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Batch code input */}
      <Text style={styles.label}>Batch Code</Text>
      <TextInput
        style={[styles.input, styles.codeInput]}
        value={code}
        onChangeText={setCode}
        placeholder="Ex: 4C01, 2A31, 60G4..."
        placeholderTextColor={colors.textTertiary}
        autoCapitalize="characters"
      />
      <Text style={styles.hint}>
        O batch code fica impresso ou gravado na parte inferior do frasco ou na caixa
      </Text>

      <TouchableOpacity style={styles.checkBtn} onPress={check} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.checkBtnText}>Verificar</Text>
        )}
      </TouchableOpacity>

      {/* Result */}
      {result && (
        <View style={styles.resultCard}>
          {result.success ? (
            <>
              <View style={styles.resultHeader}>
                <View style={[styles.freshnessIndicator, { backgroundColor: FRESHNESS_COLORS[result.age.freshness] }]} />
                <Text style={styles.resultTitle}>Resultado</Text>
              </View>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Código:</Text>
                <Text style={styles.resultValue}>{result.code}</Text>
              </View>
              {result.brand && (
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Marca:</Text>
                  <Text style={styles.resultValue}>{result.brand}</Text>
                </View>
              )}
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Data Fabricação:</Text>
                <Text style={styles.resultValue}>{result.manufacture_date.label}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Idade:</Text>
                <Text style={styles.resultValue}>
                  {result.age.age_years < 1
                    ? `${result.age.age_months} meses`
                    : `${result.age.age_years} anos`}
                </Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Estado:</Text>
                <Text style={[styles.resultValue, { color: FRESHNESS_COLORS[result.age.freshness] }]}>
                  {result.age.freshness_label}
                </Text>
              </View>

              {/* Freshness bar */}
              <View style={styles.freshnessBar}>
                <View style={[styles.freshnessBarFill, {
                  width: `${Math.max(5, 100 - (result.age.age_months / 60 * 100))}%`,
                  backgroundColor: FRESHNESS_COLORS[result.age.freshness],
                }]} />
              </View>
              <View style={styles.freshnessLabels}>
                <Text style={styles.freshnessLabelText}>Novo</Text>
                <Text style={styles.freshnessLabelText}>5 anos</Text>
              </View>

              <Text style={styles.formatInfo}>Formato: {result.format}</Text>
              <Text style={styles.shelfNote}>{result.shelf_life_note}</Text>
            </>
          ) : (
            <View style={styles.notFound}>
              <Text style={styles.notFoundTitle}>Código não reconhecido</Text>
              <Text style={styles.notFoundText}>{result.message}</Text>
              <Text style={styles.notFoundHint}>
                Dica: Certifique-se de que inseriu o código correto. Geralmente são 4-8 caracteres alfanuméricos.
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  heroTitle: { color: colors.textPrimary, fontSize: typography.h4, fontWeight: typography.bold, marginBottom: spacing.xs },
  heroText: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 20 },
  label: { color: colors.textSecondary, fontSize: typography.caption, marginTop: spacing.md, marginBottom: spacing.xs },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: typography.body,
  },
  codeInput: { fontSize: typography.h5, letterSpacing: 2, fontWeight: typography.bold },
  hint: { color: colors.textTertiary, fontSize: typography.small, marginTop: spacing.xs },
  dropdown: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginTop: 2,
    overflow: 'hidden',
  },
  dropdownItem: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  dropdownText: { color: colors.textPrimary, fontSize: typography.body },
  checkBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  checkBtnText: { color: '#fff', fontSize: typography.h6, fontWeight: typography.bold },
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.lg,
    ...shadows.md,
  },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  freshnessIndicator: { width: 12, height: 12, borderRadius: 6 },
  resultTitle: { color: colors.textPrimary, fontSize: typography.h5, fontWeight: typography.bold },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs },
  resultLabel: { color: colors.textSecondary, fontSize: typography.body },
  resultValue: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  freshnessBar: {
    height: 8,
    backgroundColor: colors.backgroundLight,
    borderRadius: 4,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  freshnessBarFill: { height: '100%', borderRadius: 4 },
  freshnessLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  freshnessLabelText: { color: colors.textTertiary, fontSize: typography.small },
  formatInfo: { color: colors.textTertiary, fontSize: typography.small, marginTop: spacing.md },
  shelfNote: { color: colors.textTertiary, fontSize: typography.small, fontStyle: 'italic', marginTop: spacing.xs },
  notFound: { alignItems: 'center' },
  notFoundTitle: { color: colors.warning, fontSize: typography.h6, fontWeight: typography.bold },
  notFoundText: { color: colors.textSecondary, fontSize: typography.body, textAlign: 'center', marginTop: spacing.xs },
  notFoundHint: { color: colors.textTertiary, fontSize: typography.small, textAlign: 'center', marginTop: spacing.sm },
});
