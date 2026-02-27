import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { apiCall } from '../config';

export default function AddToCollectionModal({ visible, onClose, perfumeId, perfumeName }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);

  useEffect(() => {
    if (visible) {
      fetchCollections();
    }
  }, [visible]);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const me = await apiCall('/api/auth/me');
      const data = await apiCall(`/api/users/${me.id}/collections`);
      setCollections(data);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar coleções');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCollection = async (collectionId) => {
    setAdding(collectionId);
    try {
      await apiCall(`/api/collections/${collectionId}/perfumes`, 'POST', {
        perfume_id: perfumeId,
      });
      Alert.alert('Sucesso', `${perfumeName} adicionado à coleção!`);
      onClose();
    } catch (error) {
      if (error.message.includes('already in collection')) {
        Alert.alert('Aviso', 'Este perfume já está nesta coleção');
      } else {
        Alert.alert('Erro', 'Falha ao adicionar à coleção');
      }
    } finally {
      setAdding(null);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Adicionar à Coleção</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#8B4789" />
            </View>
          ) : collections.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Você ainda não tem coleções</Text>
              <Text style={styles.emptySubtext}>
                Crie uma coleção primeiro para adicionar perfumes
              </Text>
            </View>
          ) : (
            <FlatList
              data={collections}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.collectionItem}
                  onPress={() => handleAddToCollection(item.id)}
                  disabled={adding === item.id}
                >
                  <View style={styles.collectionInfo}>
                    <Text style={styles.collectionName}>{item.name}</Text>
                    <Text style={styles.collectionCount}>
                      {item.perfume_count || 0} perfumes
                    </Text>
                  </View>
                  {adding === item.id ? (
                    <ActivityIndicator color="#8B4789" />
                  ) : (
                    <Text style={styles.addIcon}>+</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#999',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
    textAlign: 'center',
  },
  collectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  collectionInfo: {
    flex: 1,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  collectionCount: {
    fontSize: 12,
    color: '#999',
  },
  addIcon: {
    fontSize: 28,
    color: '#8B4789',
    fontWeight: 'bold',
  },
});
