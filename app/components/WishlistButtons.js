import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

const LISTS = [
  { key: 'own', label: 'Tenho', icon: '✓', activeColor: theme.colors.success },
  { key: 'want', label: 'Quero', icon: '♡', activeColor: theme.colors.error },
  { key: 'tried', label: 'Provei', icon: '👃', activeColor: theme.colors.info },
];

export default function WishlistButtons({ status = {}, counts = {}, onToggle }) {
  return (
    <View style={styles.container}>
      {LISTS.map((list) => {
        const isActive = status[list.key];
        const count = counts[list.key] || 0;

        return (
          <TouchableOpacity
            key={list.key}
            style={[
              styles.button,
              isActive && { backgroundColor: list.activeColor, borderColor: list.activeColor },
            ]}
            onPress={() => onToggle(list.key)}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>{list.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{list.label}</Text>
            {count > 0 && (
              <Text style={[styles.count, isActive && styles.countActive]}>{count}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceLight,
    gap: 4,
  },
  icon: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  iconActive: {
    color: theme.colors.textPrimary,
  },
  label: {
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textSecondary,
  },
  labelActive: {
    color: theme.colors.textPrimary,
  },
  count: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
  },
  countActive: {
    color: 'rgba(255,255,255,0.8)',
  },
});
