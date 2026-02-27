import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

// Barra de rating com emojis (inspirado no Fragrantica)
export default function RatingBar({ ratings, total }) {
  const { love = 0, like = 0, ok = 0, dislike = 0, hate = 0 } = ratings || {};
  const totalVotes = total || (love + like + ok + dislike + hate);
  
  const percentage = (value) => totalVotes > 0 ? (value / totalVotes) * 100 : 0;
  
  const avgRating = totalVotes > 0 
    ? ((love * 5 + like * 4 + ok * 3 + dislike * 2 + hate * 1) / totalVotes).toFixed(2)
    : 0;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avgRating}>{avgRating}</Text>
        <Text style={styles.totalVotes}>{totalVotes.toLocaleString()} votos</Text>
      </View>
      
      <View style={styles.barContainer}>
        {love > 0 && (
          <View style={[styles.segment, { 
            width: `${percentage(love)}%`, 
            backgroundColor: theme.colors.love 
          }]} />
        )}
        {like > 0 && (
          <View style={[styles.segment, { 
            width: `${percentage(like)}%`, 
            backgroundColor: theme.colors.like 
          }]} />
        )}
        {ok > 0 && (
          <View style={[styles.segment, { 
            width: `${percentage(ok)}%`, 
            backgroundColor: theme.colors.ok 
          }]} />
        )}
        {dislike > 0 && (
          <View style={[styles.segment, { 
            width: `${percentage(dislike)}%`, 
            backgroundColor: theme.colors.dislike 
          }]} />
        )}
        {hate > 0 && (
          <View style={[styles.segment, { 
            width: `${percentage(hate)}%`, 
            backgroundColor: theme.colors.hate 
          }]} />
        )}
      </View>
      
      <View style={styles.legend}>
        {love > 0 && (
          <View style={styles.legendItem}>
            <Text style={styles.emoji}>❤️</Text>
            <Text style={styles.legendText}>{love}</Text>
          </View>
        )}
        {like > 0 && (
          <View style={styles.legendItem}>
            <Text style={styles.emoji}>👍</Text>
            <Text style={styles.legendText}>{like}</Text>
          </View>
        )}
        {ok > 0 && (
          <View style={styles.legendItem}>
            <Text style={styles.emoji}>😐</Text>
            <Text style={styles.legendText}>{ok}</Text>
          </View>
        )}
        {dislike > 0 && (
          <View style={styles.legendItem}>
            <Text style={styles.emoji}>👎</Text>
            <Text style={styles.legendText}>{dislike}</Text>
          </View>
        )}
        {hate > 0 && (
          <View style={styles.legendItem}>
            <Text style={styles.emoji}>😡</Text>
            <Text style={styles.legendText}>{hate}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.sm,
  },
  avgRating: {
    fontSize: theme.typography.h2,
    fontWeight: theme.typography.bold,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  totalVotes: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
  },
  barContainer: {
    height: 12,
    flexDirection: 'row',
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceLight,
    marginBottom: theme.spacing.sm,
  },
  segment: {
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
  },
  emoji: {
    fontSize: 16,
    marginRight: 4,
  },
  legendText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
  },
});
