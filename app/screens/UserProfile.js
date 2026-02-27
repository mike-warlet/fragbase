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
import { apiCall, getAuthToken } from '../config';
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
      await apiCall(`/api/users/${userId}/follow`, isFollowing ? 'DELETE' : 'POST');
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
        <ActivityIndicator size="large" color="#8B4789" />
      </View>
    );
  }

  const isOwnProfile = currentUserId === parseInt(userId);

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
              <ActivityIndicator color={isFollowing ? '#8B4789' : '#FFF'} />
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
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    width: '100%',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4789',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  followButton: {
    backgroundColor: '#8B4789',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,
  },
  followingButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#8B4789',
  },
  followButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  followingButtonText: {
    color: '#8B4789',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  collectionCard: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    width: 150,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  collectionCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
