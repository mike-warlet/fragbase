import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { api } from '../config';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function ChallengesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('active');
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallenges();
  }, [activeTab]);

  const loadChallenges = async () => {
    setLoading(true);
    try {
      const data = await api(`/api/challenges?status=${activeTab}`);
      setChallenges(data.challenges || []);
    } catch (error) {
      console.error('Load challenges error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return 'Encerrado';
    if (diff === 1) return '1 dia restante';
    return `${diff} dias restantes`;
  };

  const renderChallenge = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ChallengeDetail', { challengeId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>{item.type === 'weekly' ? 'SEMANAL' : 'DESAFIO'}</Text>
        <Text style={styles.cardDays}>{getDaysLeft(item.end_date)}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardEntries}>{item.entry_count || 0} participantes</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            Ativos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.tabActive]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            Anteriores
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={challenges}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderChallenge}
          contentContainerStyle={challenges.length === 0 ? styles.center : styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={{ fontSize: 48 }}>🏆</Text>
              <Text style={styles.emptyText}>
                {activeTab === 'active'
                  ? 'Nenhum desafio ativo no momento'
                  : 'Nenhum desafio anterior'}
              </Text>
            </View>
          }
        />
      )}
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
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.body,
    fontWeight: typography.medium,
    color: colors.textTertiary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  list: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  cardType: {
    fontSize: typography.small,
    fontWeight: typography.bold,
    color: colors.primary,
    letterSpacing: 1,
  },
  cardDays: {
    fontSize: typography.small,
    color: colors.warning,
    fontWeight: typography.semibold,
  },
  cardTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardDesc: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  cardFooter: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cardEntries: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
