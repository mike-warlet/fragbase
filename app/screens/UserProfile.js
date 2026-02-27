import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius } from '../theme';
import ReviewCard from '../components/ReviewCard';

export default function UserProfile({ route, navigation }) {
  const { userId } = route.params;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const [userData, reviewsData, collectionsData, meData] = await Promise.all([
        apiCall(`/api/users/${userId}`),
        apiCall(`/api/users/${userId}/reviews`),
        apiCall(`/api/users/${userId}/collections`),
        apiCall('/api/auth/me'),
      ]);

      setUser(userData);
      setReviews(reviewsData);
      setCollections(collectionsData);
      setCurrentUserId(meData.id);
      setIsFollowing(userData.is_following || false);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      await apiCall(`/api/users/${userId}/follow`, { method: isFollowing ? 'DELETE' : 'POST' });
      setIsFollowing(!isFollowing);
      setUser({
        ...user,
        followers_count: isFollowing ? user.followers_count - 1 : user.followers_count + 1,
      });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao seguir/deixar de seguir');
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const isOwnProfile = currentUserId && String(currentUserId) === String(userId);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: user.avatar_url || 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.display_name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.reviews_count || 0}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.followers_count || 0}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.following_count || 0}</Text>
            <Text style={styles.statLabel}>Seguindo</Text>
          </View>
        </View>

        {/* Follow button */}
        {!isOwnProfile && (
          <TouchableOpacity
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={handleFollow}
            disabled={followLoading}
          >
            {followLoading ? (
              <ActivityIndicator color={isFollowing ? colors.primary : colors.textPrimary} />
            ) : (
              <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? 'Seguindo' : 'Seguir'}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Collections */}
      {collections.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coleções ({collections.length})</Text>
          <FlatList
            horizontal
            data={collections}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.collectionCard}
                onPress={() => navigation.navigate('CollectionDetail', { collectionId: item.id })}
              >
                <Text style={styles.collectionName}>{item.name}</Text>
                <Text style={styles.collectionCount}>
                  {item.perfume_count} {item.perfume_count === 1 ? 'perfume' : 'perfumes'}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
        {reviews.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum review ainda</Text>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onPerfumePress={(perfumeId) =>
                navigation.navigate('PerfumeDetail', { perfumeId })
              }
              onUserPress={(userId) => navigation.navigate('UserProfile', { userId })}
            />
          ))
        )}
      </View>
    </ScrollView>
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
  header: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
  },
  name: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  username: {
    fontSize: typography.h6,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  bio: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  followButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xl + 8,
    borderRadius: borderRadius.round,
    marginTop: spacing.lg,
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  followButtonText: {
    color: colors.textPrimary,
    fontWeight: typography.semibold,
    fontSize: typography.h6,
  },
  followingButtonText: {
    color: colors.primary,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  collectionCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
    width: 150,
  },
  collectionName: {
    fontSize: typography.h6,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  collectionCount: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
