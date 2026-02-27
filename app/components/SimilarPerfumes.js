import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function SimilarPerfumes({ perfumes = [], onPress }) {
  if (perfumes.length === 0) return null;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)}>
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderEmoji}>🌸</Text>
        </View>
      )}
      <Text style={styles.brand} numberOfLines={1}>{item.brand}</Text>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      {item.avg_rating > 0 && (
        <Text style={styles.rating}>⭐ {item.avg_rating}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfumes Semelhantes</Text>
      <FlatList
        horizontal
        data={perfumes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  list: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    width: 130,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    backgroundColor: theme.colors.surfaceLight,
  },
  imagePlaceholder: {
    width: 130,
    height: 130,
    backgroundColor: theme.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 40,
  },
  brand: {
    fontSize: theme.typography.small,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
  },
  name: {
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
  },
  rating: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
});
