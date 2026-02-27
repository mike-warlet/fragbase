import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { apiCall } from '../config';

export default function ReviewCard({ review, onPerfumePress, onUserPress }) {
  const [liked, setLiked] = useState(review.is_liked || false);
  const [likeCount, setLikeCount] = useState(review.likes_count || 0);
  const [liking, setLiking] = useState(false);

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleLike = async () => {
    if (liking) return;
    
    setLiking(true);
    try {
      await apiCall(`/api/reviews/${review.id}/like`, 'POST');
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao curtir review');
    } finally {
      setLiking(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.userInfo}
          onPress={onUserPress}
        >
          {review.user_photo ? (
            <Image source={{ uri: review.user_photo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {review.user_name?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <Text style={styles.userName}>{review.user_name}</Text>
        </TouchableOpacity>
        
        <Text style={styles.date}>
          {new Date(review.created_at).toLocaleDateString('pt-BR')}
        </Text>
      </View>

      {review.perfume_name && (
        <TouchableOpacity 
          style={styles.perfumeInfo}
          onPress={onPerfumePress}
        >
          <Text style={styles.perfumeName}>{review.perfume_name}</Text>
          <Text style={styles.perfumeBrand}>{review.perfume_brand}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.rating}>
        <Text style={styles.stars}>{renderStars(review.rating)}</Text>
        <Text style={styles.ratingText}>{review.rating}/5</Text>
      </View>

      {review.text && (
        <Text style={styles.text}>{review.text}</Text>
      )}

      {(review.longevity || review.performance || review.sillage) && (
        <View style={styles.details}>
          {review.longevity && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Duração</Text>
              <Text style={styles.detailValue}>{review.longevity}/5</Text>
            </View>
          )}
          {review.performance && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Performance</Text>
              <Text style={styles.detailValue}>{review.performance}/5</Text>
            </View>
          )}
          {review.sillage && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Sillage</Text>
              <Text style={styles.detailValue}>{review.sillage}/5</Text>
            </View>
          )}
        </View>
      )}

      {/* Like button */}
      <TouchableOpacity 
        style={styles.likeButton}
        onPress={handleLike}
        disabled={liking}
      >
        <Text style={styles.likeIcon}>{liked ? '❤️' : '🤍'}</Text>
        {likeCount > 0 && <Text style={styles.likeCount}>{likeCount}</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b4513',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  perfumeInfo: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  perfumeName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  perfumeBrand: {
    fontSize: 13,
    color: '#8b4513',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8b4513',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  likeIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  likeCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
});
