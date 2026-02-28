import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { api } from '../config';
import PerfumeCard from '../components/PerfumeCard';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function PerfumerProfileScreen({ route, navigation }) {
  const { perfumerId } = route.params;
  const [perfumer, setPerfumer] = useState(null);
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerfumer();
  }, []);

  const loadPerfumer = async () => {
    try {
      const data = await api(`/api/perfumers/${perfumerId}`);
      setPerfumer(data.perfumer);
      setFragrances(data.fragrances || []);
    } catch (error) {
      console.error('Load perfumer error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFragrance = useCallback(({ item }) => (
    <PerfumeCard
      perfume={item}
      onPress={() => navigation.push('PerfumeDetail', { perfumeId: item.id })}
    />
  ), [navigation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!perfumer) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Perfumista nao encontrado</Text>
      </View>
    );
  }

  const houses = perfumer.notable_houses || [];

  return (
    <FlatList
      data={fragrances}
      renderItem={renderFragrance}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{perfumer.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{perfumer.name}</Text>
          {perfumer.nationality && (
            <Text style={styles.nationality}>{perfumer.nationality}</Text>
          )}
          {perfumer.bio && (
            <Text style={styles.bio}>{perfumer.bio}</Text>
          )}
          {houses.length > 0 && (
            <View style={styles.houses}>
              {houses.map((h) => (
                <View key={h} style={styles.houseBadge}>
                  <Text style={styles.houseText}>{h}</Text>
                </View>
              ))}
            </View>
          )}
          <Text style={styles.fragranceCount}>
            {fragrances.length} {fragrances.length === 1 ? 'fragrancia' : 'fragancias'}
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhuma fragrancia vinculada ainda</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.body,
  },
  list: {
    padding: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.lg,
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: typography.h1,
    fontWeight: typography.bold,
  },
  name: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  nationality: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  bio: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  houses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  houseBadge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  houseText: {
    fontSize: typography.caption,
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  fragranceCount: {
    fontSize: typography.body,
    color: colors.textTertiary,
    fontWeight: typography.semibold,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
});
