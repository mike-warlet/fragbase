import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { apiCall } from '../config';

// Try to get location
let Location;
try {
  Location = require('expo-location');
} catch {
  Location = null;
}

export default function SmartPickCard({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSmartPick();
  }, []);

  const loadSmartPick = async () => {
    try {
      let params = '';
      if (Location) {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
            params = `?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}`;
          }
        } catch { /* no location */ }
      }
      const result = await apiCall(`/api/smart-pick${params}`);
      setData(result);
    } catch (err) {
      console.error('Smart pick error:', err);
    }
    setLoading(false);
  };

  if (loading) return null;
  if (!data || !data.smart_pick) return null;

  const pick = data.smart_pick;
  const weather = data.weather;

  const weatherEmoji = weather.temp >= 30 ? '☀️' : weather.temp >= 22 ? '🌤️' : weather.temp >= 14 ? '🍂' : '❄️';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: pick.id })}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Recomendação do Dia</Text>
        <View style={styles.weatherBadge}>
          <Text style={styles.weatherEmoji}>{weatherEmoji}</Text>
          <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: pick.image_url || 'https://via.placeholder.com/60' }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.perfumeName} numberOfLines={1}>{pick.name}</Text>
          <Text style={styles.perfumeBrand}>{pick.brand}</Text>
          {pick.reasons && pick.reasons.length > 0 && (
            <Text style={styles.reason} numberOfLines={1}>{pick.reasons[0]}</Text>
          )}
        </View>
        <Text style={styles.arrow}>{'>'}</Text>
      </View>

      {data.alternatives && data.alternatives.length > 0 && (
        <View style={styles.alts}>
          <Text style={styles.altsLabel}>Também bom hoje: </Text>
          {data.alternatives.map((alt, i) => (
            <TouchableOpacity
              key={alt.id}
              onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: alt.id })}
            >
              <Text style={styles.altName}>{alt.name}{i < data.alternatives.length - 1 ? ', ' : ''}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: typography.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  weatherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    gap: 4,
  },
  weatherEmoji: { fontSize: 14 },
  weatherTemp: { color: colors.textSecondary, fontSize: typography.small, fontWeight: typography.semibold },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  image: { width: 50, height: 60, borderRadius: borderRadius.sm },
  info: { flex: 1 },
  perfumeName: { color: colors.textPrimary, fontSize: typography.h6, fontWeight: typography.bold },
  perfumeBrand: { color: colors.textSecondary, fontSize: typography.caption },
  reason: { color: colors.success, fontSize: typography.small, marginTop: 2 },
  arrow: { color: colors.textTertiary, fontSize: typography.h4 },
  alts: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.xs, paddingTop: spacing.xs, borderTopWidth: 1, borderTopColor: colors.border },
  altsLabel: { color: colors.textTertiary, fontSize: typography.small },
  altName: { color: colors.textSecondary, fontSize: typography.small, fontWeight: typography.semibold },
});
