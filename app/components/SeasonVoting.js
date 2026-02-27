import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

const SEASONS = [
  { key: 'spring', label: 'Primavera', emoji: '🌸' },
  { key: 'summer', label: 'Verao', emoji: '☀️' },
  { key: 'fall', label: 'Outono', emoji: '🍂' },
  { key: 'winter', label: 'Inverno', emoji: '❄️' },
];

const TIMES = [
  { key: 'day', label: 'Dia', emoji: '🌤️' },
  { key: 'night', label: 'Noite', emoji: '🌙' },
];

export default function SeasonVoting({ seasons, userVote, onVote }) {
  const total = seasons?.total || 0;

  const getPercentage = (key) => {
    if (!seasons || total === 0) return 0;
    return Math.round(((seasons[key] || 0) / total) * 100);
  };

  const isSelected = (key) => {
    return userVote?.[key] === 1;
  };

  const handleToggle = (key) => {
    const newVote = {
      spring: userVote?.spring || 0,
      summer: userVote?.summer || 0,
      fall: userVote?.fall || 0,
      winter: userVote?.winter || 0,
      day: userVote?.day || 0,
      night: userVote?.night || 0,
    };
    newVote[key] = newVote[key] ? 0 : 1;
    onVote(newVote);
  };

  const renderItem = (item) => {
    const pct = getPercentage(item.key);
    const selected = isSelected(item.key);

    return (
      <TouchableOpacity
        key={item.key}
        style={[styles.item, selected && styles.itemSelected]}
        onPress={() => handleToggle(item.key)}
      >
        <Text style={styles.emoji}>{item.emoji}</Text>
        <Text style={[styles.label, selected && styles.labelSelected]}>{item.label}</Text>
        {total > 0 && (
          <View style={styles.pctContainer}>
            <View style={[styles.pctBar, { width: `${pct}%` }]} />
          </View>
        )}
        <Text style={styles.pctText}>{pct}%</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quando Usar</Text>
      <Text style={styles.subtitle}>
        {total > 0 ? `${total} votos` : 'Toque para votar'}
      </Text>

      <View style={styles.grid}>
        {SEASONS.map(renderItem)}
      </View>
      <View style={styles.timeRow}>
        {TIMES.map(renderItem)}
      </View>
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
  grid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  timeRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  itemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryDark,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  labelSelected: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.semibold,
  },
  pctContainer: {
    width: '100%',
    height: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 2,
  },
  pctBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  pctText: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
    fontWeight: theme.typography.semibold,
  },
});
