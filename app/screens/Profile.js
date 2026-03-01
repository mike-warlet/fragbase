import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { apiCall } from '../config';
import { useAuth } from '../AuthContext';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function Profile({ navigation }) {
  const { logout, user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState(null);
  const [levelInfo, setLevelInfo] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchProfile(controller.signal);
    fetchStats(controller.signal);
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile();
      fetchStats();
    });
    return () => {
      controller.abort();
      unsubscribe();
    };
  }, [navigation]);

  const fetchStats = async (signal) => {
    try {
      const [statsData, levelData] = await Promise.all([
        apiCall('/api/gamification/stats').catch(() => null),
        apiCall(`/api/gamification/level/${authUser?.id}`).catch(() => null),
      ]);
      if (signal?.aborted) return;
      if (statsData) setStats(statsData);
      if (levelData) setLevelInfo(levelData);
    } catch (e) {}
  };

  const fetchProfile = async (signal) => {
    try {
      const data = await apiCall('/api/auth/me');
      if (signal?.aborted) return;
      setUser(data.user || data);
    } catch (error) {
      if (signal?.aborted) return;
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        Alert.alert('Sessao expirada', 'Por favor faca login novamente.', [
          { text: 'OK', onPress: logout },
        ]);
      } else {
        Alert.alert('Erro', 'Falha ao carregar perfil');
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja fazer logout?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Nao foi possivel carregar o perfil</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProfile}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            Promise.all([fetchProfile(), fetchStats()]).finally(() => setRefreshing(false));
          }}
          tintColor={colors.primary}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        {user.avatar_url ? (
          <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarPlaceholderText}>
              {(user.display_name || user.name || '?').charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.name}>{user.display_name || user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.reviews_count || 0}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.followers_count || 0}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.following_count || 0}</Text>
            <Text style={styles.statLabel}>Seguindo</Text>
          </View>
        </View>

        {/* XP & Level Stats */}
        {levelInfo && (
          <TouchableOpacity
            style={styles.levelRow}
            onPress={() => navigation.navigate('Badges')}
            activeOpacity={0.7}
          >
            <View style={styles.levelBadge}>
              <Text style={styles.levelNumber}>{levelInfo.level || 1}</Text>
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>{levelInfo.title || 'Iniciante'}</Text>
              <View style={styles.xpBar}>
                <View style={[styles.xpFill, { width: `${Math.min(100, ((levelInfo.xp || 0) / (levelInfo.next_level_xp || 100)) * 100)}%` }]} />
              </View>
              <Text style={styles.xpText}>{levelInfo.xp || 0} / {levelInfo.next_level_xp || 100} XP</Text>
            </View>
            {stats?.badges_earned > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>{stats.badges_earned}</Text>
                <Text style={styles.badgeCountLabel}>badges</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* Edit Profile Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('TasteProfile')}
        >
          <Text style={styles.menuIcon}>👃</Text>
          <Text style={styles.menuText}>Perfil Olfativo</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Explore')}
        >
          <Text style={styles.menuIcon}>🔮</Text>
          <Text style={styles.menuText}>Descobrir</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Badges')}
        >
          <Text style={styles.menuIcon}>🏅</Text>
          <Text style={styles.menuText}>Badges & XP</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Text style={styles.menuIcon}>🏆</Text>
          <Text style={styles.menuText}>Leaderboard</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Collections')}
        >
          <Text style={styles.menuIcon}>📚</Text>
          <Text style={styles.menuText}>Minhas Colecoes</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('TasteTwins')}
        >
          <Text style={styles.menuIcon}>👥</Text>
          <Text style={styles.menuText}>Taste Twins</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Challenges')}
        >
          <Text style={styles.menuIcon}>🏆</Text>
          <Text style={styles.menuText}>Desafios</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('FragranceDiary')}
        >
          <Text style={styles.menuIcon}>📅</Text>
          <Text style={styles.menuText}>Diario de Fragancias</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Marketplace')}
        >
          <Text style={styles.menuIcon}>🛒</Text>
          <Text style={styles.menuText}>Marketplace</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('BarcodeScanner')}
        >
          <Text style={styles.menuIcon}>📷</Text>
          <Text style={styles.menuText}>Scanner de Código</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('BatchCheck')}
        >
          <Text style={styles.menuIcon}>🔍</Text>
          <Text style={styles.menuText}>Verificar Batch Code</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
        >
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuText}>Ver Perfil Publico</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuIcon}>🚪</Text>
          <Text style={[styles.menuText, { color: colors.error }]}>Sair</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  retryText: {
    color: colors.textPrimary,
    fontWeight: typography.semibold,
  },
  header: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: colors.textPrimary,
    fontSize: 40,
    fontWeight: typography.bold,
  },
  name: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  username: {
    fontSize: typography.h6,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  bio: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
    gap: spacing.md,
  },
  levelBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: '#fff',
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  xpBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  xpFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  xpText: {
    fontSize: typography.small,
    color: colors.textTertiary,
  },
  badgeCount: {
    alignItems: 'center',
  },
  badgeCountText: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.warning,
  },
  badgeCountLabel: {
    fontSize: typography.small,
    color: colors.textTertiary,
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.round,
    marginTop: spacing.lg,
  },
  editButtonText: {
    color: colors.textPrimary,
    fontWeight: typography.semibold,
    fontSize: typography.h6,
  },
  menu: {
    marginTop: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  menuText: {
    flex: 1,
    fontSize: typography.h6,
    color: colors.textPrimary,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.textTertiary,
  },
});
