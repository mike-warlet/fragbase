import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';

export default function OnlineIndicator({ isOnline, size = 12, style }) {
  if (!isOnline) return null;

  return (
    <View style={[
      styles.dot,
      { width: size, height: size, borderRadius: size / 2 },
      style,
    ]} />
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: theme.colors.success,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
});
