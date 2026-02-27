import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

// Barra horizontal colorida de acordo (inspirado no Fragrantica)
export default function AccordBar({ accord, strength = 100, showLabel = true }) {
  const color = theme.getAccordColor(accord);
  
  return (
    <View style={styles.container}>
      {showLabel && (
        <Text style={styles.label}>{accord}</Text>
      )}
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.bar, 
            { 
              width: `${strength}%`,
              backgroundColor: color,
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sm,
  },
  label: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  barContainer: {
    height: 8,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: theme.borderRadius.sm,
  },
});
