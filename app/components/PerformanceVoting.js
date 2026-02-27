import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

const LABELS = {
  longevity: { title: 'Longevidade', low: 'Fraca', high: 'Eterna' },
  sillage: { title: 'Sillage', low: 'Intima', high: 'Enorme' },
};

export default function PerformanceVoting({ performance, userVote, onVote }) {
  const renderBar = (metric) => {
    const avg = performance?.[`avg_${metric}`] || 0;
    const userVal = userVote?.[metric] || null;
    const labels = LABELS[metric];

    return (
      <View style={styles.metricRow} key={metric}>
        <Text style={styles.metricTitle}>{labels.title}</Text>
        <View style={styles.segmentContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seg) => {
            const isAvg = Math.round(avg) === seg;
            const isUser = userVal === seg;
            const isFilled = seg <= Math.round(avg);

            return (
              <TouchableOpacity
                key={seg}
                style={[
                  styles.segment,
                  isFilled && styles.segmentFilled,
                  isUser && styles.segmentUser,
                ]}
                onPress={() => onVote(metric, seg)}
              >
                {isAvg && <View style={styles.avgMarker} />}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.labelsRow}>
          <Text style={styles.labelText}>{labels.low}</Text>
          {avg > 0 && (
            <Text style={styles.avgText}>{avg}/10</Text>
          )}
          <Text style={styles.labelText}>{labels.high}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance</Text>
      <Text style={styles.subtitle}>
        {performance?.vote_count > 0
          ? `${performance.vote_count} votos`
          : 'Toque para votar'}
      </Text>
      {renderBar('longevity')}
      {renderBar('sillage')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.md,
  },
  metricRow: {
    marginBottom: theme.spacing.md,
  },
  metricTitle: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  segmentContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  segment: {
    flex: 1,
    height: 24,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentFilled: {
    backgroundColor: theme.colors.primary,
  },
  segmentUser: {
    borderWidth: 2,
    borderColor: theme.colors.textPrimary,
  },
  avgMarker: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.textPrimary,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  labelText: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
  },
  avgText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.semibold,
  },
});
