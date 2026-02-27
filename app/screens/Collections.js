import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function Collections({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const me = await apiCall('/api/auth/me');
      setUserId(me.id);
      const data = await apiCall(`/api/users/${me.id}/collections`);
      setCollections(data);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar coleções');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCollection = () => {
    navigation.navigate('CreateCollection', {
      onCollectionCreated: () => {
        fetchData();
      },
    });
  };

  const renderCollection = ({ item }) => (
    <TouchableOpacity
      style={styles.collectionCard}
      onPress={() => navigation.navigate('CollectionDetail', { collectionId: item.id })}
    >
      <View style={styles.collectionHeader}>
        <Text style={styles.collectionName}>{item.name}</Text>
        {!item.is_public && (
          <View style={styles.privateBadge}>
            <Text style={styles.privateBadgeText}>🔒 Privada</Text>
          </View>
        )}
      </View>
      {item.description && (
        <Text style={styles.collectionDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      <Text style={styles.collectionCount}>
        {item.perfume_count || 0} {item.perfume_count === 1 ? 'perfume' : 'perfumes'}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCollection}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma coleção ainda</Text>
            <Text style={styles.emptySubtext}>
              Crie coleções para organizar seus perfumes favoritos
            </Text>
          </View>
        }
        contentContainerStyle={collections.length === 0 && styles.emptyList}
      />

      <TouchableOpacity style={styles.fab} onPress={handleCreateCollection}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
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
  collectionCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  collectionName: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    flex: 1,
  },
  privateBadge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  privateBadgeText: {
    fontSize: typography.small + 1,
    color: colors.warning,
  },
  collectionDescription: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  collectionCount: {
    fontSize: typography.caption,
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl + 8,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: typography.h5,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  fabIcon: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: typography.bold,
  },
});
