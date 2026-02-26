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
        <ActivityIndicator size="large" color="#8B4789" />
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
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionCard: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#8B4789',
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  collectionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
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
  collectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  collectionCount: {
    fontSize: 12,
    color: '#8B4789',
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#8B4789',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
