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
import PerfumeCard from '../components/PerfumeCard';

export default function CollectionDetail({ route, navigation }) {
  const { collectionId } = route.params;
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
                'DELETE'
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
              await apiCall(`/api/collections/${collectionId}`, 'DELETE');
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
        <ActivityIndicator size="large" color="#8B4789" />
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
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
  },
  header: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  privateBadge: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  privateBadgeText: {
    fontSize: 11,
    color: '#8B6914',
  },
  deleteButton: {
    fontSize: 24,
    padding: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  perfumeCount: {
    fontSize: 12,
    color: '#8B4789',
    fontWeight: '600',
    marginTop: 8,
  },
  perfumeItem: {
    marginBottom: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
    textAlign: 'center',
  },
});
