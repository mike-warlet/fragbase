import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function PerfumeCard({ perfume, onPress }) {
  const renderAccordTags = () => {
    if (!perfume.main_accords || perfume.main_accords.length === 0) return null;
    
    // Show top 3 accords
    const topAccords = perfume.main_accords.slice(0, 3);
    
    return (
      <View style={styles.accordsContainer}>
        {topAccords.map((accord, index) => (
          <View 
            key={index}
            style={[
              styles.accordTag,
              { backgroundColor: theme.getAccordColor(accord.name) + '40' } // 40 = 25% opacity
            ]}
          >
            <Text style={styles.accordText}>{accord.name}</Text>
          </View>
        ))}
      </View>
    );
  };
  
  const renderRating = () => {
    if (!perfume.avg_rating && !perfume.rating) return null;
    
    const rating = perfume.avg_rating || perfume.rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingStars}>
          {'⭐'.repeat(fullStars)}{hasHalfStar ? '½' : ''}
        </Text>
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {perfume.image_url ? (
          <Image source={{ uri: perfume.image_url }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderEmoji}>🌸</Text>
          </View>
        )}
        {perfume.gender && (
          <View style={[styles.genderBadge, { 
            backgroundColor: theme.getGenderColor(perfume.gender) 
          }]}>
            <Text style={styles.genderText}>
              {perfume.gender === 'masculine' ? 'M' : perfume.gender === 'feminine' ? 'F' : 'U'}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.brand}>{perfume.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{perfume.name}</Text>
        
        {perfume.year && (
          <Text style={styles.year}>{perfume.year}</Text>
        )}
        
        {renderRating()}
        {renderAccordTags()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
    backgroundColor: theme.colors.surfaceLight,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
  },
  placeholderEmoji: {
    fontSize: 64,
  },
  genderBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  genderText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.bold,
  },
  content: {
    padding: theme.spacing.md,
  },
  brand: {
    fontSize: theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  year: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  ratingStars: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.medium,
  },
  accordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  accordTag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  accordText: {
    fontSize: theme.typography.small,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.medium,
    textTransform: 'capitalize',
  },
});
