import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const data = await apiCall('/api/posts');
      setPosts(data.posts);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadFeed();
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      {/* User header */}
      <View style={styles.postHeader}>
        {item.user_photo ? (
          <Image source={{ uri: item.user_photo }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {item.user_name?.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>{item.user_name}</Text>
          <Text style={styles.postDate}>
            {new Date(item.created_at).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>

      {/* Perfume info if linked */}
      {item.perfume_name && (
        <TouchableOpacity
          style={styles.perfumeLink}
          onPress={() => navigation.getParent()?.navigate('PerfumeDetail', { perfumeId: item.perfume_id })}
        >
          {item.perfume_image && (
            <Image source={{ uri: item.perfume_image }} style={styles.perfumeImage} />
          )}
          <View style={styles.perfumeInfo}>
            <Text style={styles.perfumeName}>{item.perfume_name}</Text>
            <Text style={styles.perfumeBrand}>{item.perfume_brand}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Post content */}
      {item.text && (
        <Text style={styles.postText}>{item.text}</Text>
      )}

      {/* Post image */}
      {item.image_url && !item.perfume_id && (
        <Image source={{ uri: item.image_url }} style={styles.postImage} />
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando feed...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Nenhum post ainda</Text>
            <Text style={styles.emptyText}>
              Siga outros utilizadores para ver posts no seu feed
            </Text>
          </View>
        }
      />

      {/* Floating action button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.getParent()?.navigate('CreatePost')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  postCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: typography.h6,
    fontWeight: typography.bold,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.body + 1,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  postDate: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  perfumeLink: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundLight,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  perfumeImage: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  perfumeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  perfumeName: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  perfumeBrand: {
    fontSize: typography.caption + 1,
    color: colors.primary,
  },
  postText: {
    fontSize: typography.body + 1,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: spacing.lg,
    fontSize: typography.h6,
    color: colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  emptyTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  fabText: {
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: typography.bold,
    marginTop: -2,
  },
});
