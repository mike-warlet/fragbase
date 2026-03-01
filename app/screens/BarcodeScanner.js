import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert,
  ActivityIndicator, FlatList, TextInput,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { apiCall } from '../config';

// Note: expo-barcode-scanner requires: npx expo install expo-barcode-scanner
// Falls back to manual EAN entry if camera permission is denied

let BarCodeScanner;
try {
  BarCodeScanner = require('expo-barcode-scanner').BarCodeScanner;
} catch {
  BarCodeScanner = null;
}

export default function BarcodeScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [mode, setMode] = useState('scan'); // scan or manual
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (BarCodeScanner) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        if (status !== 'granted') setMode('manual');
      })();
    } else {
      setMode('manual');
    }
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    lookupBarcode(data);
  };

  const lookupBarcode = async (code) => {
    setLoading(true);
    try {
      const data = await apiCall(`/api/perfumes?barcode=${encodeURIComponent(code)}`);
      if (data.perfumes && data.perfumes.length > 0) {
        setResults(data.perfumes);
      } else {
        // Try searching by the code as text
        const searchData = await apiCall(`/api/perfumes?search=${encodeURIComponent(code)}&limit=5`);
        if (searchData.perfumes && searchData.perfumes.length > 0) {
          setResults(searchData.perfumes);
          Alert.alert('Barcode não encontrado', 'Mostrando resultados similares da busca.');
        } else {
          setResults([]);
          Alert.alert(
            'Perfume não encontrado',
            `Código: ${code}\n\nDeseja adicionar este perfume manualmente?`,
            [
              { text: 'Cancelar', onPress: () => setScanned(false) },
              { text: 'Adicionar', onPress: () => navigation.navigate('AddFragrance', { barcode: code }) },
            ]
          );
        }
      }
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
    setLoading(false);
  };

  const handleManualSubmit = () => {
    if (!manualCode.trim()) return;
    lookupBarcode(manualCode.trim());
  };

  const renderResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: item.id })}
    >
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultBrand}>{item.brand}</Text>
        {item.year && <Text style={styles.resultYear}>{item.year}</Text>}
      </View>
      <Text style={styles.arrow}>{'>'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Mode toggle */}
      <View style={styles.modeRow}>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'scan' && styles.modeBtnActive]}
          onPress={() => { setMode('scan'); setScanned(false); setResults([]); }}
          disabled={!BarCodeScanner || !hasPermission}
        >
          <Text style={[styles.modeText, mode === 'scan' && styles.modeTextActive]}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeBtn, mode === 'manual' && styles.modeBtnActive]}
          onPress={() => { setMode('manual'); setResults([]); }}
        >
          <Text style={[styles.modeText, mode === 'manual' && styles.modeTextActive]}>Digitar Código</Text>
        </TouchableOpacity>
      </View>

      {mode === 'scan' && BarCodeScanner && hasPermission ? (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
          />
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanHint}>Aponte para o código de barras do perfume</Text>
          </View>
          {scanned && !loading && (
            <TouchableOpacity style={styles.rescanBtn} onPress={() => { setScanned(false); setResults([]); }}>
              <Text style={styles.rescanText}>Escanear Novamente</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.manualContainer}>
          <Text style={styles.manualLabel}>Digite o código de barras (EAN/UPC)</Text>
          <TextInput
            style={styles.manualInput}
            value={manualCode}
            onChangeText={setManualCode}
            placeholder="Ex: 3348901250580"
            placeholderTextColor={colors.textTertiary}
            keyboardType="numeric"
            onSubmitEditing={handleManualSubmit}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleManualSubmit}>
            <Text style={styles.searchBtnText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: spacing.lg }} />}

      {results.length > 0 && (
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>Resultados ({results.length})</Text>
          <FlatList
            data={results}
            renderItem={renderResult}
            keyExtractor={item => String(item.id)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  modeRow: { flexDirection: 'row', padding: spacing.md, gap: spacing.sm },
  modeBtn: {
    flex: 1, backgroundColor: colors.surface, borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm, alignItems: 'center',
  },
  modeBtnActive: { backgroundColor: colors.primary },
  modeText: { color: colors.textSecondary, fontWeight: typography.semibold },
  modeTextActive: { color: '#fff' },
  scannerContainer: { flex: 1, position: 'relative' },
  scanner: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center', alignItems: 'center',
  },
  scanFrame: {
    width: 250, height: 150, borderWidth: 2, borderColor: colors.primary,
    borderRadius: borderRadius.md, backgroundColor: 'transparent',
  },
  scanHint: { color: '#fff', marginTop: spacing.md, fontSize: typography.body, textAlign: 'center' },
  rescanBtn: {
    position: 'absolute', bottom: 30, alignSelf: 'center',
    backgroundColor: colors.primary, borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
  },
  rescanText: { color: '#fff', fontWeight: typography.bold },
  manualContainer: { padding: spacing.lg },
  manualLabel: { color: colors.textSecondary, fontSize: typography.body, marginBottom: spacing.sm },
  manualInput: {
    backgroundColor: colors.surface, borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    color: colors.textPrimary, fontSize: typography.h5, letterSpacing: 2,
    textAlign: 'center',
  },
  searchBtn: {
    backgroundColor: colors.primary, borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm, alignItems: 'center', marginTop: spacing.md,
  },
  searchBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.h6 },
  resultsSection: { flex: 1, padding: spacing.md },
  resultsTitle: { color: colors.textPrimary, fontSize: typography.h6, fontWeight: typography.bold, marginBottom: spacing.sm },
  resultCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.sm,
  },
  resultInfo: { flex: 1 },
  resultName: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  resultBrand: { color: colors.textSecondary, fontSize: typography.caption },
  resultYear: { color: colors.textTertiary, fontSize: typography.small },
  arrow: { color: colors.textTertiary, fontSize: typography.h4 },
});
