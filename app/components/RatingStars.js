import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default function RatingStars({ value = 0, onChange, size = 28, readOnly = false, showLabel = false }) {
  const stars = [1, 2, 3, 4, 5];

  const handlePress = (star) => {
    if (readOnly || !onChange) return;
    onChange(star === value ? 0 : star);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {stars.map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handlePress(star)}
            disabled={readOnly}
            style={[styles.starButton, { padding: size * 0.15 }]}
            activeOpacity={readOnly ? 1 : 0.6}
          >
            <Text style={{ fontSize: size }}>
              {star <= value ? '\u2B50' : '\u2606'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showLabel && value > 0 && (
        <Text style={styles.label}>{value}/5</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
  },
  starButton: {
    padding: 4,
  },
  label: {
    marginLeft: spacing.sm,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
