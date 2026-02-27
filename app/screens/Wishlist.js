import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const TABS = [
  { key: 'want', label: 'Quero Comprar', emoji: '💫' },
  { key: 'tried', label: 'Já Experimentei', emoji: '✅' },
];

export default function WishlistScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('want');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    try {
      const data = await apiCall(`/api/wishlists/me?type=${activeTab}`);
      setItems(data.wishlists || data || []);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchItems();
  }, [activeTab]);

  const handleRemove = (perfumeId, perfumeName) => {
    Alert.alert(
      'Remover',
      `Remover ${perfumeName} da lista?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiCall('/api/wishlists', {
                method: 'DELETE',
                body: JSON.stringify({ perfume_id: perfumeId, list_type: activeTab }),
              });
              setItems(items.filter((i) => (i.perfume?.id || i.perfume_id) !== perfumeId));
            } catch (error) {
              Alert.alert('Erro', 'Falha ao remover');
            }
          },
        },
      ]
    );
  };

  const switchTab = (key) => {
    if (key !== activeTab) {
      setLoading(true);
      setActiveTab(key);
    }
  };

  const renderItem = ({ item }) => {
    const perfume = item.perfume || item;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: perfume.id })}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          {perfume.image_url ? (
            <Image source={{ uri: perfume.image_url }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={{ fontSize: 28 }}>🌸</Text>
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.brand}>{perfume.brand}</Text>
          <Text style={styles.name} numberOfLines={1}>{perfume.name}</Text>
          {perfume.concentration && (
            <Text style={styles.concentration}>{perfume.concentration}</Text>
          )}
          {item.created_at && (
            <Text style={styles.date}>
              Adicionado em {new Date(item.created_at).toLocaleDateString('pt-BR')}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => handleRemove(perfume.id, perfume.name)}
        >
          <Text style={styles.removeText}>✕</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => switchTab(tab.key)}
          >
            <Text style={styles.tabEmoji}>{tab.emoji}</Text>
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => (item.perfume?.id || item.perfume_id || item.id).toString()}
          renderItem={renderItem}
          contentContainerStyle={items.length === 0 ? styles.emptyList : styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>
                {activeTab === 'want' ? '🛍️' : '👃'}
              </Text>
              <Text style={styles.emptyText}>
                {activeTab === 'want' ? 'Nenhum perfume na lista de desejos' : 'Nenhum perfume experimentado'}
              </Text>
              <Text style={styles.emptySubtext}>
                Adicione perfumes a partir da página de detalhes
              </Text>
            </View>
          }
        />
      )}
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
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md - 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabEmoji: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  tabText: {
    fontSize: typography.body,
    color: colors.textTertiary,
    fontWeight: typography.medium,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  listContent: {
    padding: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.surfaceLight,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'center',
  },
  brand: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  name: {
    fontSize: typography.body,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  concentration: {
    fontSize: typography.small,
    color: colors.textTertiary,
  },
  date: {
    fontSize: typography.small,
    color: colors.textTertiary,
    marginTop: 2,
  },
  removeBtn: {
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  removeText: {
    fontSize: 18,
    color: colors.textTertiary,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});
