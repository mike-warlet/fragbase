import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function TasteTwinsScreen({ navigation }) {
  const [twins, setTwins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTwins();
  }, []);

  const loadTwins = async () => {
    try {
      const data = await apiCall('/api/taste-twins?limit=20');
      setTwins(data.twins || []);
    } catch (error) {
      console.error('Load taste twins error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (pct) => {
    if (pct >= 70) return colors.success;
    if (pct >= 40) return colors.warning;
    return colors.textSecondary;
  };

  const renderTwin = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('UserProfile', { userId: item.id })}
    >
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>#{index + 1}</Text>
      </View>

      {item.avatar_url ? (
        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={{ fontSize: 24 }}>👤</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{item.display_name}</Text>
        <Text style={styles.username}>@{item.username}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.stat}>{item.shared_perfumes} perfumes em comum</Text>
          {item.shared_owned > 0 && (
            <Text style={styles.stat}>{item.shared_owned} na colecao</Text>
          )}
        </View>
      </View>

      <View style={[styles.matchBadge, { borderColor: getMatchColor(item.match_pct) }]}>
        <Text style={[styles.matchPct, { color: getMatchColor(item.match_pct) }]}>
          {item.match_pct}%
        </Text>
        <Text style={styles.matchLabel}>match</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Taste Twins</Text>
        <Text style={styles.headerSubtitle}>
          Usuarios com gosto similar ao seu, baseado na colecao, avaliacoes e votos.
        </Text>
      </View>

      <FlatList
        data={twins}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTwin}
        contentContainerStyle={twins.length === 0 ? styles.centerContent : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 48 }}>👥</Text>
            <Text style={styles.emptyTitle}>Nenhum taste twin encontrado</Text>
            <Text style={styles.emptyText}>
              Adicione mais perfumes a sua colecao e faca reviews para encontrar pessoas com gosto similar!
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  centerContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  list: {
    padding: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  rankBadge: {
    width: 28,
    alignItems: 'center',
  },
  rankText: {
    fontSize: typography.body,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: typography.h6,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  username: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  stat: {
    fontSize: typography.small,
    color: colors.textTertiary,
  },
  matchBadge: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minWidth: 56,
  },
  matchPct: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
  },
  matchLabel: {
    fontSize: typography.small,
    color: colors.textTertiary,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
});
