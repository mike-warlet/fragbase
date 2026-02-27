import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

// Pirâmide olfativa visual (inspirado no Fragrantica)
export default function PyramidNotes({ notes }) {
  const { top = [], middle = [], base = [] } = notes || {};
  
  const renderNoteLevel = (levelNotes, title, color) => {
    if (!levelNotes || levelNotes.length === 0) return null;
    
    return (
      <View style={styles.level}>
        <View style={[styles.levelIndicator, { backgroundColor: color }]} />
        <View style={styles.levelContent}>
          <Text style={styles.levelTitle}>{title}</Text>
          <View style={styles.notesContainer}>
            {levelNotes.map((note, index) => (
              <View key={index} style={styles.noteChip}>
                <Text style={styles.noteText}>{note}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.pyramid}>
      <Text style={styles.title}>Pirâmide Olfativa</Text>
      {renderNoteLevel(top, 'Notas de Topo', theme.colors.accords.citrus)}
      {renderNoteLevel(middle, 'Notas de Coração', theme.colors.accords.floral)}
      {renderNoteLevel(base, 'Notas de Base', theme.colors.accords.woody)}
    </View>
  );
}

const styles = StyleSheet.create({
  pyramid: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
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
  },
  noteText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textPrimary,
  },
});
