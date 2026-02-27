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
import { colors, typography, spacing, borderRadius } from '../theme';

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
      setCollections(Array.isArray(data) ? data : data?.collections || []);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar coleções');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCollection = async (collectionId) => {
    setAdding(collectionId);
    try {
      await apiCall(`/api/collections/${collectionId}/perfumes`, {
        method: 'POST',
        body: JSON.stringify({ perfume_id: perfumeId }),
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
              <ActivityIndicator size="large" color={colors.primary} />
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
                    <ActivityIndicator color={colors.primary} />
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl + 4,
    borderTopRightRadius: borderRadius.xl + 4,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  closeButton: {
    fontSize: 24,
    color: colors.textTertiary,
  },
  loadingContainer: {
    padding: spacing.xl + 8,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: spacing.xl + 8,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.h6,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  collectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  collectionInfo: {
    flex: 1,
  },
  collectionName: {
    fontSize: typography.h6,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  collectionCount: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  addIcon: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: typography.bold,
  },
});
