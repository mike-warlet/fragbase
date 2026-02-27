import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import theme from '../theme';

const INTENSITY_LABELS = {
  '-1': 'Nao sinto',
  '0': 'Quase nada',
  '1': 'Leve',
  '2': 'Moderado',
  '3': 'Forte',
};

const INTENSITY_COLORS = {
  '-1': theme.colors.textTertiary,
  '0': '#5a5a80',
  '1': '#7a7aa0',
  '2': '#a0a0d0',
  '3': '#d0d0ff',
};

export default function NoteVoting({ notes, userVotes, onVote }) {
  const [selectedNote, setSelectedNote] = useState(null);

  const getUserVote = (noteName) => {
    const vote = userVotes?.find(v => v.note_name === noteName);
    return vote ? vote.intensity : null;
  };

  const handleVote = (noteName, noteLayer, intensity) => {
    onVote(noteName, noteLayer, intensity);
    setSelectedNote(null);
  };

  const getNoteOpacity = (avgIntensity) => {
    if (avgIntensity <= 0) return 0.4;
    return 0.4 + (avgIntensity / 3) * 0.6;
  };

  const renderNoteLevel = (levelNotes, title, color, layer) => {
    if (!levelNotes || levelNotes.length === 0) return null;

    return (
      <View style={styles.level}>
        <View style={[styles.levelIndicator, { backgroundColor: color }]} />
        <View style={styles.levelContent}>
          <Text style={styles.levelTitle}>{title}</Text>
          <View style={styles.notesContainer}>
            {levelNotes.map((note, index) => {
              const userVote = getUserVote(note.name || note);
              const isVoted = userVote !== null;
              const avgIntensity = note.avg_intensity || 0;
              const noteName = note.name || note;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.noteChip,
                    { opacity: getNoteOpacity(avgIntensity) },
                    isVoted && styles.noteChipVoted,
                  ]}
                  onPress={() => setSelectedNote({ name: noteName, layer })}
                >
                  <Text style={[styles.noteText, isVoted && styles.noteTextVoted]}>
                    {noteName}
                  </Text>
                  {note.vote_count > 0 && (
                    <Text style={styles.voteCount}>{note.vote_count}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.pyramid}>
      <Text style={styles.title}>Piramide Olfativa</Text>
      <Text style={styles.subtitle}>Toque numa nota para votar na intensidade</Text>

      {renderNoteLevel(notes?.top, 'Notas de Topo', theme.colors.accords.citrus, 'top')}
      {renderNoteLevel(notes?.heart, 'Notas de Coracao', theme.colors.accords.floral, 'heart')}
      {renderNoteLevel(notes?.base, 'Notas de Base', theme.colors.accords.woody, 'base')}

      {/* Voting Modal */}
      <Modal
        visible={!!selectedNote}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedNote(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedNote(null)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedNote?.name}</Text>
            <Text style={styles.modalSubtitle}>Qual a intensidade?</Text>

            {[-1, 0, 1, 2, 3].map((intensity) => {
              const isSelected = selectedNote && getUserVote(selectedNote.name) === intensity;
              return (
                <TouchableOpacity
                  key={intensity}
                  style={[
                    styles.intensityOption,
                    isSelected && styles.intensityOptionSelected,
                    { borderLeftColor: INTENSITY_COLORS[intensity] },
                  ]}
                  onPress={() => handleVote(selectedNote.name, selectedNote.layer, intensity)}
                >
                  <Text style={[styles.intensityValue, isSelected && styles.intensityValueSelected]}>
                    {intensity}
                  </Text>
                  <Text style={[styles.intensityLabel, isSelected && styles.intensityLabelSelected]}>
                    {INTENSITY_LABELS[intensity]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pyramid: {
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
  level: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  levelIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: theme.spacing.sm,
  },
  levelContent: {
    flex: 1,
  },
  levelTitle: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  notesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  noteChip: {
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  noteChipVoted: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryDark,
  },
  noteText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textPrimary,
  },
  noteTextVoted: {
    fontWeight: theme.typography.semibold,
  },
  voteCount: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    overflow: 'hidden',
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
    width: '80%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  intensityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
    backgroundColor: theme.colors.surfaceLight,
    borderLeftWidth: 4,
  },
  intensityOptionSelected: {
    backgroundColor: theme.colors.primaryDark,
  },
  intensityValue: {
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
    color: theme.colors.textSecondary,
    width: 30,
  },
  intensityValueSelected: {
    color: theme.colors.textPrimary,
  },
  intensityLabel: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
  },
  intensityLabelSelected: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.semibold,
  },
});
