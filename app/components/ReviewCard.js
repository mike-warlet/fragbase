import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

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
      await apiCall(`/api/reviews/${review.id}/like`, { method: 'POST' });
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
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md - 4,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md - 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.sm,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: typography.bold,
  },
  userName: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  date: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  perfumeInfo: {
    marginBottom: spacing.md - 4,
    paddingBottom: spacing.md - 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  perfumeName: {
    fontSize: typography.body + 1,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  perfumeBrand: {
    fontSize: typography.caption + 1,
    color: colors.primary,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stars: {
    fontSize: typography.h6,
    marginRight: spacing.sm,
  },
  ratingText: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  text: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md - 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md - 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: typography.small + 1,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  detailValue: {
    fontSize: typography.caption + 1,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md - 4,
    paddingTop: spacing.md - 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  likeIcon: {
    fontSize: 20,
    marginRight: spacing.xs + 2,
  },
  likeCount: {
    fontSize: typography.body,
    color: colors.textSecondary,
    fontWeight: typography.semibold,
  },
});
