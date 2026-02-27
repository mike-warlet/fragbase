import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { api, apiCall } from '../config';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function ChallengeDetailScreen({ route, navigation }) {
  const { challengeId } = route.params || {};
  const [challenge, setChallenge] = useState(null);
  const [entries, setEntries] = useState([]);
  const [userEntry, setUserEntry] = useState(null);
  const [userVotes, setUserVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [entryNote, setEntryNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadChallenge();
  }, [challengeId]);

  const loadChallenge = async () => {
    try {
      const data = await apiCall(`/api/challenges/${challengeId}`);
      setChallenge(data.challenge);
      setEntries(data.entries || []);
      setUserEntry(data.user_entry);
      setUserVotes(data.user_votes || []);
    } catch (error) {
      console.error('Load challenge error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) { setSearchResults([]); return; }
    try {
      const data = await api(`/api/perfumes?q=${encodeURIComponent(query)}&limit=10`);
      setSearchResults(data.perfumes || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleSubmitEntry = async () => {
    setSubmitting(true);
    try {
      await apiCall(`/api/challenges/${challengeId}/enter`, {
        method: 'POST',
        body: JSON.stringify({
          perfume_id: selectedPerfume?.id || undefined,
          note: entryNote.trim() || undefined,
        }),
      });
      setShowEntryModal(false);
      setEntryNote('');
      setSelectedPerfume(null);
      loadChallenge();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao enviar entrada');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (entryId) => {
    try {
      await apiCall(`/api/challenges/${challengeId}/entries/${entryId}/vote`, {
        method: 'POST',
      });
      loadChallenge();
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const getDaysLeft = (endDate) => {
    const diff = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return 'Encerrado';
    return `${diff} dia${diff > 1 ? 's' : ''} restante${diff > 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!challenge) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Desafio nao encontrado</Text>
      </View>
    );
  }

  const isActive = new Date(challenge.end_date) >= new Date() && new Date(challenge.start_date) <= new Date();

  return (
    <ScrollView style={styles.container}>
      {/* Challenge header */}
      <View style={styles.header}>
        <Text style={styles.type}>{challenge.type === 'weekly' ? 'DESAFIO SEMANAL' : 'DESAFIO'}</Text>
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description}>{challenge.description}</Text>
        {challenge.rules && (
          <Text style={styles.rules}>{challenge.rules}</Text>
        )}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{getDaysLeft(challenge.end_date)}</Text>
          <Text style={styles.metaText}>{entries.length} participantes</Text>
        </View>
      </View>

      {/* Enter button */}
      {isActive && !userEntry && (
        <TouchableOpacity style={styles.enterBtn} onPress={() => setShowEntryModal(true)}>
          <Text style={styles.enterBtnText}>Participar</Text>
        </TouchableOpacity>
      )}

      {userEntry && (
        <View style={styles.userEntryBanner}>
          <Text style={styles.userEntryText}>Voce ja participou deste desafio!</Text>
        </View>
      )}

      {/* Leaderboard / Entries */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ranking</Text>
        {entries.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma entrada ainda</Text>
        ) : (
          entries.map((entry, i) => {
            const hasVoted = userVotes.includes(entry.id);
            return (
              <View key={entry.id} style={styles.entryCard}>
                <Text style={styles.rank}>#{i + 1}</Text>
                <TouchableOpacity
                  style={styles.entryInfo}
                  onPress={() => navigation.navigate('UserProfile', { userId: entry.user_id })}
                >
                  {entry.avatar_url ? (
                    <Image source={{ uri: entry.avatar_url }} style={styles.avatar} />
                  ) : (
                    <View style={[styles.avatar, styles.avatarPlaceholder]}>
                      <Text style={{ fontSize: 16 }}>👤</Text>
                    </View>
                  )}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.entryUsername}>@{entry.username}</Text>
                    {entry.perfume_name && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: entry.perfume_id })}
                      >
                        <Text style={styles.entryPerfume}>
                          {entry.perfume_brand} - {entry.perfume_name}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {entry.note && (
                      <Text style={styles.entryNote} numberOfLines={2}>{entry.note}</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.voteBtn, hasVoted && styles.voteBtnActive]}
                  onPress={() => handleVote(entry.id)}
                >
                  <Text style={[styles.voteBtnText, hasVoted && styles.voteBtnTextActive]}>
                    ▲ {entry.votes_count || 0}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </View>

      {/* Entry modal */}
      <Modal visible={showEntryModal} transparent animationType="slide" onRequestClose={() => setShowEntryModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Participar do Desafio</Text>
            <TouchableOpacity onPress={() => setShowEntryModal(false)}>
              <Text style={styles.modalClose}>Fechar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            {/* Perfume selector */}
            <Text style={styles.fieldLabel}>Perfume (opcional)</Text>
            {!selectedPerfume ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Buscar perfume..."
                  placeholderTextColor={colors.textTertiary}
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id.toString()}
                  style={{ maxHeight: 200 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.searchItem}
                      onPress={() => { setSelectedPerfume(item); setSearchQuery(''); setSearchResults([]); }}
                    >
                      <Text style={styles.searchBrand}>{item.brand}</Text>
                      <Text style={styles.searchName}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            ) : (
              <View style={styles.selectedRow}>
                <Text style={styles.selectedText}>
                  {selectedPerfume.brand} - {selectedPerfume.name}
                </Text>
                <TouchableOpacity onPress={() => setSelectedPerfume(null)}>
                  <Text style={styles.changeText}>Trocar</Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={[styles.fieldLabel, { marginTop: spacing.md }]}>Comentario (opcional)</Text>
            <TextInput
              style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
              placeholder="Conte sobre a sua experiencia..."
              placeholderTextColor={colors.textTertiary}
              value={entryNote}
              onChangeText={setEntryNote}
              multiline
              maxLength={500}
            />

            <TouchableOpacity
              style={[styles.submitBtn, submitting && { opacity: 0.6 }]}
              onPress={handleSubmitEntry}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color={colors.textPrimary} />
              ) : (
                <Text style={styles.submitText}>Enviar Entrada</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  errorText: { color: colors.error, fontSize: typography.body },
  header: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  type: {
    fontSize: typography.small,
    fontWeight: typography.bold,
    color: colors.primary,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  title: { fontSize: typography.h3, fontWeight: typography.bold, color: colors.textPrimary, marginBottom: spacing.sm },
  description: { fontSize: typography.body, color: colors.textSecondary, lineHeight: 22, marginBottom: spacing.sm },
  rules: { fontSize: typography.caption, color: colors.textTertiary, fontStyle: 'italic', marginBottom: spacing.sm },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { fontSize: typography.caption, color: colors.warning, fontWeight: typography.semibold },
  enterBtn: {
    backgroundColor: colors.primary,
    margin: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  enterBtnText: { color: colors.textPrimary, fontSize: typography.h6, fontWeight: typography.bold },
  userEntryBanner: {
    backgroundColor: colors.primaryDark + '40',
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  userEntryText: { color: colors.primary, fontSize: typography.body, fontWeight: typography.semibold },
  section: { padding: spacing.lg },
  sectionTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.textPrimary, marginBottom: spacing.md },
  emptyText: { color: colors.textTertiary, fontSize: typography.body, textAlign: 'center' },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  rank: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.primary, width: 32 },
  entryInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  avatarPlaceholder: { backgroundColor: colors.surfaceLight, justifyContent: 'center', alignItems: 'center' },
  entryUsername: { fontSize: typography.body, fontWeight: typography.semibold, color: colors.textPrimary },
  entryPerfume: { fontSize: typography.caption, color: colors.primary, marginTop: 2 },
  entryNote: { fontSize: typography.caption, color: colors.textSecondary, marginTop: 2 },
  voteBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  voteBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  voteBtnText: { fontSize: typography.caption, color: colors.textSecondary, fontWeight: typography.semibold },
  voteBtnTextActive: { color: colors.textPrimary },
  modalContainer: { flex: 1, backgroundColor: colors.background, paddingTop: spacing.xl },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  modalTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.textPrimary },
  modalClose: { fontSize: typography.body, color: colors.primary, fontWeight: typography.semibold },
  modalBody: { padding: spacing.lg },
  fieldLabel: { fontSize: typography.body, fontWeight: typography.semibold, color: colors.textPrimary, marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  searchItem: { padding: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  searchBrand: { fontSize: typography.small, color: colors.primary, fontWeight: typography.bold, textTransform: 'uppercase' },
  searchName: { fontSize: typography.body, color: colors.textPrimary },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  selectedText: { fontSize: typography.body, color: colors.textPrimary, flex: 1 },
  changeText: { fontSize: typography.caption, color: colors.primary, fontWeight: typography.semibold },
  submitBtn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  submitText: { color: colors.textPrimary, fontSize: typography.h6, fontWeight: typography.bold },
});
