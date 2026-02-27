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
import { colors, typography, spacing, borderRadius } from '../theme';
import PerfumeCard from '../components/PerfumeCard';

export default function CollectionDetail({ route, navigation }) {
  const { collectionId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    fetchCollection();
  }, [collectionId]);

  const fetchCollection = async () => {
    try {
      const data = await apiCall(`/api/collections/${collectionId}`);
      setCollection(data);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar coleção');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePerfume = async (perfumeId) => {
    Alert.alert(
      'Remover perfume',
      'Deseja remover este perfume da coleção?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiCall(
                `/api/collections/${collectionId}/perfumes/${perfumeId}`,
                { method: 'DELETE' }
              );
              fetchCollection(); // Refresh
              Alert.alert('Sucesso', 'Perfume removido da coleção');
            } catch (error) {
              Alert.alert('Erro', 'Falha ao remover perfume');
            }
          },
        },
      ]
    );
  };

  const handleDeleteCollection = () => {
    Alert.alert(
      'Excluir coleção',
      'Deseja excluir esta coleção? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiCall(`/api/collections/${collectionId}`, { method: 'DELETE' });
              navigation.goBack();
              Alert.alert('Sucesso', 'Coleção excluída');
            } catch (error) {
              Alert.alert('Erro', 'Falha ao excluir coleção');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!collection) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Coleção não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerInfo}>
            <Text style={styles.collectionName}>{collection.name}</Text>
            {!collection.is_public && (
              <View style={styles.privateBadge}>
                <Text style={styles.privateBadgeText}>🔒 Privada</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={handleDeleteCollection}>
            <Text style={styles.deleteButton}>🗑️</Text>
          </TouchableOpacity>
        </View>
        {collection.description && (
          <Text style={styles.description}>{collection.description}</Text>
        )}
        <Text style={styles.perfumeCount}>
          {collection.perfumes?.length || 0}{' '}
          {collection.perfumes?.length === 1 ? 'perfume' : 'perfumes'}
        </Text>
      </View>

      {/* Perfumes List */}
      <FlatList
        data={collection.perfumes || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.perfumeItem}>
            <PerfumeCard
              perfume={item}
              onPress={(perfumeId) =>
                navigation.navigate('PerfumeDetail', { perfumeId })
              }
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemovePerfume(item.id)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum perfume nesta coleção</Text>
            <Text style={styles.emptySubtext}>
              Adicione perfumes ao visualizá-los
            </Text>
          </View>
        }
        contentContainerStyle={
          !collection.perfumes?.length && styles.emptyList
        }
      />
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: typography.h6,
    color: colors.textTertiary,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  collectionName: {
    fontSize: typography.h2 - 6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginRight: spacing.sm,
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
  deleteButton: {
    fontSize: 24,
    padding: spacing.xs,
  },
  description: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  perfumeCount: {
    fontSize: typography.caption,
    color: colors.primary,
    fontWeight: typography.semibold,
    marginTop: spacing.sm,
  },
  perfumeItem: {
    marginBottom: spacing.sm,
  },
  removeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md - 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.md - 2,
  },
  removeButtonText: {
    color: colors.textPrimary,
    fontSize: typography.caption,
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
});
