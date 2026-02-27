import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import theme from '../theme';

const COMMON_ACCORDS = [
  'woody', 'floral', 'citrus', 'fresh', 'sweet', 'amber', 'musky',
  'aromatic', 'fruity', 'vanilla', 'powdery', 'aquatic', 'warm spicy',
  'fresh spicy', 'leather', 'smoky', 'oud', 'green', 'earthy', 'balsamic',
  'honey', 'herbal', 'ozonic', 'tropical', 'animalic', 'mineral', 'lactonic',
];

export default function AccordVoting({ accords = [], userVotes = [], onVote }) {
  const [showVoteModal, setShowVoteModal] = useState(null);
  const [showAddAccord, setShowAddAccord] = useState(false);

  const maxStrength = accords.length > 0
    ? Math.max(...accords.map(a => a.avg_strength || 0))
    : 5;

  const getUserVote = (accordName) => {
    const vote = userVotes?.find(v => v.accord_name === accordName);
    return vote ? vote.strength : null;
  };

  const handleVote = (accordName, strength) => {
    onVote(accordName, strength);
    setShowVoteModal(null);
  };

  const existingAccordNames = accords.map(a => (a.accord_name || '').toLowerCase());
  const availableAccords = COMMON_ACCORDS.filter(
    a => !existingAccordNames.includes(a)
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Acordes</Text>
        <TouchableOpacity onPress={() => setShowAddAccord(true)}>
          <Text style={styles.addButton}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Toque para votar na intensidade</Text>

      {accords.map((accord, index) => {
        const barWidth = maxStrength > 0 ? (accord.avg_strength / maxStrength) * 100 : 0;
        const color = theme.getAccordColor(accord.accord_name);
        const userVote = getUserVote(accord.accord_name);

        return (
          <TouchableOpacity
            key={index}
            style={styles.accordRow}
            onPress={() => setShowVoteModal(accord.accord_name)}
          >
            <View style={styles.accordInfo}>
              <Text style={styles.accordName}>{accord.accord_name}</Text>
              <Text style={styles.accordVotes}>{accord.vote_count} votos</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { width: `${barWidth}%`, backgroundColor: color }]} />
              {userVote !== null && (
                <View style={[styles.userMarker, { left: `${(userVote / 5) * 100}%` }]}>
                  <View style={styles.userDot} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}

      {accords.length === 0 && (
        <Text style={styles.emptyText}>
          Ainda sem votos. Seja o primeiro a adicionar acordes!
        </Text>
      )}

      {/* Strength voting modal */}
      <Modal visible={!!showVoteModal} transparent animationType="fade" onRequestClose={() => setShowVoteModal(null)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowVoteModal(null)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{showVoteModal}</Text>
            <Text style={styles.modalSubtitle}>Intensidade do acorde</Text>
            <View style={styles.strengthGrid}>
              {[0, 1, 2, 3, 4, 5].map((str) => {
                const isSelected = showVoteModal && getUserVote(showVoteModal) === str;
                return (
                  <TouchableOpacity
                    key={str}
                    style={[
                      styles.strengthBtn,
                      isSelected && styles.strengthBtnSelected,
                      { backgroundColor: isSelected ? theme.getAccordColor(showVoteModal) : theme.colors.surfaceLight },
                    ]}
                    onPress={() => handleVote(showVoteModal, str)}
                  >
                    <Text style={[styles.strengthNum, isSelected && styles.strengthNumSelected]}>{str}</Text>
                    <Text style={[styles.strengthLabel, isSelected && styles.strengthLabelSelected]}>
                      {str === 0 ? 'Nenhum' : str === 1 ? 'Leve' : str === 2 ? 'Suave' : str === 3 ? 'Medio' : str === 4 ? 'Forte' : 'Dominante'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Add new accord modal */}
      <Modal visible={showAddAccord} transparent animationType="fade" onRequestClose={() => setShowAddAccord(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowAddAccord(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Acorde</Text>
            <View style={styles.accordGrid}>
              {availableAccords.slice(0, 15).map((accord) => (
                <TouchableOpacity
                  key={accord}
                  style={[styles.accordChip, { borderColor: theme.getAccordColor(accord) }]}
                  onPress={() => {
                    setShowAddAccord(false);
                    setShowVoteModal(accord);
                  }}
                >
                  <View style={[styles.accordDot, { backgroundColor: theme.getAccordColor(accord) }]} />
                  <Text style={styles.accordChipText}>{accord}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
  },
  addButton: {
    fontSize: theme.typography.body,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
  },
  subtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.md,
  },
  accordRow: {
    marginBottom: theme.spacing.sm,
  },
  accordInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  accordName: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
  },
  accordVotes: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
  },
  barContainer: {
    height: 10,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  bar: {
    height: '100%',
    borderRadius: theme.borderRadius.sm,
  },
  userMarker: {
    position: 'absolute',
    top: -2,
    marginLeft: -6,
  },
  userDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.textPrimary,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textTertiary,
    fontSize: theme.typography.body,
    paddingVertical: theme.spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    width: '85%',
    maxWidth: 360,
  },
  modalTitle: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  strengthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    justifyContent: 'center',
  },
  strengthBtn: {
    width: '30%',
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  strengthBtnSelected: {
    borderWidth: 2,
    borderColor: theme.colors.textPrimary,
  },
  strengthNum: {
    fontSize: theme.typography.h4,
    fontWeight: theme.typography.bold,
    color: theme.colors.textSecondary,
  },
  strengthNumSelected: {
    color: theme.colors.textPrimary,
  },
  strengthLabel: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
  },
  strengthLabelSelected: {
    color: theme.colors.textPrimary,
  },
  accordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  accordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    gap: 6,
  },
  accordDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  accordChipText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textPrimary,
    textTransform: 'capitalize',
  },
});
