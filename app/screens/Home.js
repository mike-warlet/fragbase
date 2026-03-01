import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, RefreshControl,
  TouchableOpacity, Image, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from '../config';
import { useAuth } from '../AuthContext';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import SOTDBanner from '../components/SOTDBanner';
import SmartPickCard from '../components/SmartPickCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { HomeFeedSkeleton } from '../components/SkeletonLoader';

export default function HomeScreen({ navigation }) {
  const { logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [showWelcome, setShowWelcome] = useState(false);
  const [feedFilter, setFeedFilter] = useState('all'); // all, sotd, general

  useEffect(() => {
    const controller = new AbortController();
    loadFeed(1, true, controller.signal);
    checkNewUser();
    return () => controller.abort();
  }, [feedFilter]);

  const checkNewUser = async () => {
    try {
      const isNew = await AsyncStorage.getItem('isNewUser');
      if (isNew === 'true') setShowWelcome(true);
    } catch (e) {}
  };

  const dismissWelcome = async () => {
    setShowWelcome(false);
    await AsyncStorage.removeItem('isNewUser');
  };

  const loadFeed = async (p = 1, reset = false, signal) => {
    if (!reset && loadingMore) return;
    try {
      setError(null);
      const typeParam = feedFilter !== 'all' ? `&type=${feedFilter}` : '';
      const data = await apiCall(`/api/posts?page=${p}&limit=15${typeParam}`);
      if (signal?.aborted) return;
      const newPosts = data.posts || [];
      if (reset) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }
      setHasMore(newPosts.length >= 15);
      setPage(p);
    } catch (err) {
      if (signal?.aborted) return;
      console.error('Error loading feed:', err);
      if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        Alert.alert('Sessao expirada', 'Por favor faca login novamente.', [
          { text: 'OK', onPress: logout },
        ]);
      } else if (reset) {
        setError('Falha ao carregar o feed. Puxe para baixo para tentar novamente.');
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFeed(1, true);
  }, []);

  const loadMore = () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    loadFeed(page + 1);
  };

  const handleLike = async (postId) => {
    // Optimistic update
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = !p.is_liked;
        return {
          ...p,
          is_liked: liked,
          likes_count: liked ? (p.likes_count || 0) + 1 : Math.max(0, (p.likes_count || 0) - 1),
        };
      }
      return p;
    }));

    try {
      await apiCall(`/api/posts/${postId}/like`, { method: 'POST' });
    } catch (error) {
      // Revert on error
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          const liked = !p.is_liked;
          return {
            ...p,
            is_liked: liked,
            likes_count: liked ? (p.likes_count || 0) + 1 : Math.max(0, (p.likes_count || 0) - 1),
          };
        }
        return p;
      }));
    }
  };

  const toggleComments = async (postId) => {
    const isExpanded = expandedComments[postId];
    setExpandedComments(prev => ({ ...prev, [postId]: !isExpanded }));

    if (!isExpanded && !comments[postId]) {
      try {
        const data = await apiCall(`/api/posts/${postId}/comments`);
        setComments(prev => ({ ...prev, [postId]: data.comments || [] }));
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    }
  };

  const handleComment = async (postId) => {
    const text = commentText[postId]?.trim();
    if (!text) return;

    try {
      const data = await apiCall(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      });

      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data.comment],
      }));
      setCommentText(prev => ({ ...prev, [postId]: '' }));
      setPosts(prev => prev.map(p =>
        p.id === postId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p
      ));
    } catch (error) {
      Alert.alert('Erro', 'Falha ao comentar');
    }
  };

  const renderPost = useCallback(({ item }) => (
    <View style={[styles.postCard, item.type === 'sotd' && styles.sotdPostCard]}>
      {/* SOTD badge */}
      {item.type === 'sotd' && (
        <View style={styles.sotdBadge}>
          <Text style={styles.sotdBadgeText}>{'\uD83D\uDC43'} SOTD</Text>
        </View>
      )}
      {/* User header */}
      <TouchableOpacity
        style={styles.postHeader}
        onPress={() => navigation.navigate('UserProfile', { userId: item.user_id })}
      >
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
      </TouchableOpacity>

      {/* Perfume info if linked */}
      {item.perfume_name && (
        <TouchableOpacity
          style={styles.perfumeLink}
          onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: item.perfume_id })}
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
      {item.text && <Text style={styles.postText}>{item.text}</Text>}

      {/* Post image */}
      {item.image_url && !item.perfume_id && (
        <Image source={{ uri: item.image_url }} style={styles.postImage} />
      )}

      {/* Action bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleLike(item.id)}>
          <Text style={styles.actionIcon}>{item.is_liked ? '\u2764\uFE0F' : '\uD83E\uDD0D'}</Text>
          {item.likes_count > 0 && (
            <Text style={styles.actionCount}>{item.likes_count}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => toggleComments(item.id)}>
          <Text style={styles.actionIcon}>{'\uD83D\uDCAC'}</Text>
          {item.comments_count > 0 && (
            <Text style={styles.actionCount}>{item.comments_count}</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Comments section */}
      {expandedComments[item.id] && (
        <View style={styles.commentsSection}>
          {(comments[item.id] || []).map((c) => (
            <View key={c.id} style={styles.commentItem}>
              <Text style={styles.commentUser}>{c.user_name}</Text>
              <Text style={styles.commentText}>{c.text}</Text>
            </View>
          ))}

          <View style={styles.commentInput}>
            <TextInput
              style={styles.commentTextInput}
              placeholder="Escrever comentário..."
              placeholderTextColor={colors.textTertiary}
              value={commentText[item.id] || ''}
              onChangeText={(t) => setCommentText(prev => ({ ...prev, [item.id]: t }))}
              onSubmitEditing={() => handleComment(item.id)}
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => handleComment(item.id)}
            >
              <Text style={styles.sendText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  ), [navigation, comments, expandedComments, commentText]);

  if (loading) {
    return (
      <View style={styles.container}>
        <HomeFeedSkeleton />
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
        ListHeaderComponent={<>
          {/* Feed filter tabs */}
          <View style={styles.feedFilters}>
            {[{ key: 'all', label: 'Todos' }, { key: 'sotd', label: 'SOTD' }, { key: 'general', label: 'Posts' }].map(f => (
              <TouchableOpacity
                key={f.key}
                style={[styles.feedFilterTab, feedFilter === f.key && styles.feedFilterActive]}
                onPress={() => { if (feedFilter !== f.key) { setFeedFilter(f.key); setLoading(true); } }}
              >
                <Text style={[styles.feedFilterText, feedFilter === f.key && styles.feedFilterTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {showWelcome && (
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Bem-vindo ao FragBase!</Text>
            <Text style={styles.welcomeText}>Descobre o teu perfil olfativo com o nosso quiz e recebe recomendacoes personalizadas.</Text>
            <View style={styles.welcomeActions}>
              <TouchableOpacity style={styles.welcomeBtn} onPress={() => { dismissWelcome(); navigation.navigate('ScentQuiz'); }}>
                <Text style={styles.welcomeBtnText}>Fazer Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={dismissWelcome}>
                <Text style={styles.welcomeDismiss}>Mais tarde</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}<ErrorBoundary><SmartPickCard navigation={navigation} /></ErrorBoundary><ErrorBoundary><SOTDBanner navigation={navigation} /></ErrorBoundary></>}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator color={colors.primary} style={{ padding: spacing.md }} />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>{error ? 'Erro' : 'Nenhum post ainda'}</Text>
            <Text style={styles.emptyText}>
              {error || 'Siga outros utilizadores para ver posts no seu feed'}
            </Text>
            {error && (
              <TouchableOpacity style={styles.retryButton} onPress={() => loadFeed(1, true)}>
                <Text style={styles.retryText}>Tentar novamente</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* Floating action button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
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
  sotdPostCard: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  sotdBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  sotdBadgeText: {
    fontSize: typography.caption,
    fontWeight: typography.bold,
    color: colors.primaryLight,
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
  // Actions
  actionBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    gap: spacing.lg,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 20,
  },
  actionCount: {
    marginLeft: spacing.xs,
    fontSize: typography.body,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  // Comments
  commentsSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
  },
  commentUser: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginRight: spacing.xs,
  },
  commentText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  commentTextInput: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  sendBtn: {
    paddingHorizontal: spacing.sm,
  },
  sendText: {
    color: colors.primary,
    fontWeight: typography.semibold,
    fontSize: typography.body,
  },
  // Other
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
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  retryText: {
    color: colors.textPrimary,
    fontWeight: typography.semibold,
  },
  welcomeCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  welcomeTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  welcomeText: {
    fontSize: typography.body,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  welcomeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  welcomeBtn: {
    backgroundColor: '#fff',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  welcomeBtnText: {
    color: colors.primary,
    fontWeight: typography.bold,
    fontSize: typography.body,
  },
  welcomeDismiss: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: typography.body,
  },
  feedFilters: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  feedFilterTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
  },
  feedFilterActive: {
    backgroundColor: colors.primary,
  },
  feedFilterText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  feedFilterTextActive: {
    color: '#fff',
    fontWeight: typography.semibold,
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
