import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Share,
  RefreshControl,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius } from '../theme';
import PerfumeCard from '../components/PerfumeCard';

export default function CollectionDetail({ route, navigation }) {
  const { collectionId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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

  const handleShareCollection = async () => {
    try {
      const data = await apiCall(`/api/collections/${collectionId}/share`);
      const perfumeList = data.perfumes.slice(0, 5).map(p => `  - ${p.name} (${p.brand})`).join('\n');
      const more = data.perfumes.length > 5 ? `\n  ...e mais ${data.perfumes.length - 5}` : '';
      await Share.share({
        message: `${data.collection.name} por @${data.collection.username}\n${data.collection.perfume_count} perfumes\n\n${perfumeList}${more}\n\nDescobre no Fragbase!`,
      });
    } catch (error) {
      if (error.message !== 'User did not share') {
        Alert.alert('Erro', 'Falha ao partilhar colecao');
      }
    }
  };

  const handleExportCollection = async () => {
    if (!collection?.perfumes?.length) {
      Alert.alert('Vazio', 'Nenhum perfume para exportar');
      return;
    }
    const perfumes = collection.perfumes;
    const csvHeader = 'Nome,Marca,Ano,Tipo,Rating';
    const csvRows = perfumes.map(p => {
      const rating = p.avg_rating ? Number(p.avg_rating).toFixed(1) : '';
      return `"${(p.name || '').replace(/"/g, '""')}","${(p.brand || '').replace(/"/g, '""')}",${p.year || ''},${p.type || ''},${rating}`;
    });
    const csv = [csvHeader, ...csvRows].join('\n');
    const summary = `${collection.name} (${perfumes.length} perfumes)\n\n${perfumes.map((p, i) => `${i + 1}. ${p.name} - ${p.brand}${p.year ? ` (${p.year})` : ''}`).join('\n')}`;

    Alert.alert('Exportar Colecao', 'Escolha o formato', [
      {
        text: 'Lista de Texto',
        onPress: () => Share.share({ message: summary }),
      },
      {
        text: 'CSV',
        onPress: () => Share.share({ message: csv }),
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
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
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={handleExportCollection}>
              <Text style={styles.actionIcon}>📋</Text>
            </TouchableOpacity>
            {collection.is_public === 1 && (
              <TouchableOpacity onPress={handleShareCollection}>
                <Text style={styles.actionIcon}>📤</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleDeleteCollection}>
              <Text style={styles.actionIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
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
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); fetchCollection().finally(() => setRefreshing(false)); }}
            tintColor={colors.primary}
          />
        }
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
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionIcon: {
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
