import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import theme from '../theme';
import { apiCall } from '../config';

// Pirâmide olfativa visual interativa (inspirado no Fragrantica)
export default function PyramidNotes({ notes, navigation }) {
  const { top = [], middle = [], base = [] } = notes || {};
  const [selectedNote, setSelectedNote] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNoteTap = async (noteName) => {
    setSelectedNote(noteName);
    setModalVisible(true);
    setLoading(true);
    setIngredientData(null);

    try {
      // Try to find ingredient by name (normalize to lowercase, replace spaces with _)
      const id = noteName.toLowerCase().replace(/\s+/g, '_');
      const data = await apiCall(`/api/ingredients/${id}`);
      if (data.ingredient) {
        setIngredientData(data);
      } else {
        // Fallback: search by note name
        const search = await apiCall(`/api/ingredients/search?note=${encodeURIComponent(noteName)}`);
        setIngredientData({ perfumes: search.perfumes || [], ingredient: null });
      }
    } catch {
      // If ingredient not found, search perfumes with this note
      try {
        const search = await apiCall(`/api/ingredients/search?note=${encodeURIComponent(noteName)}`);
        setIngredientData({ perfumes: search.perfumes || [], ingredient: null });
      } catch {
        setIngredientData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNote(null);
    setIngredientData(null);
  };

  const renderNoteLevel = (levelNotes, title, color) => {
    if (!levelNotes || levelNotes.length === 0) return null;

    return (
      <View style={styles.level}>
        <View style={[styles.levelIndicator, { backgroundColor: color }]} />
        <View style={styles.levelContent}>
          <Text style={styles.levelTitle}>{title}</Text>
          <View style={styles.notesContainer}>
            {levelNotes.map((note, index) => (
              <TouchableOpacity
                key={index}
                style={styles.noteChip}
                onPress={() => handleNoteTap(note)}
                activeOpacity={0.7}
              >
                <Text style={styles.noteText}>{note}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const getCategoryColor = (cat) => {
    const map = {
      citrus: theme.colors.accords?.citrus || '#FFD700',
      floral: theme.colors.accords?.floral || '#FF69B4',
      fruity: '#FF6B6B',
      green: '#4CAF50',
      spicy: '#FF5722',
      woody: theme.colors.accords?.woody || '#8B4513',
      amber: '#FFA000',
      musk: '#CE93D8',
      aquatic: '#29B6F6',
      gourmand: '#D4A574',
      herbal: '#66BB6A',
      leather: '#795548',
      animalic: '#A1887F',
      mineral: '#78909C',
      resinous: '#E65100',
    };
    return map[cat] || theme.colors.primary;
  };

  return (
    <View style={styles.pyramid}>
      <Text style={styles.title}>Piramide Olfativa</Text>
      {renderNoteLevel(top, 'Notas de Topo', theme.colors.accords?.citrus || '#FFD700')}
      {renderNoteLevel(middle, 'Notas de Coracao', theme.colors.accords?.floral || '#FF69B4')}
      {renderNoteLevel(base, 'Notas de Base', theme.colors.accords?.woody || '#8B4513')}

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedNote}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeBtn}>X</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginVertical: 30 }} />
            ) : ingredientData ? (
              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                {ingredientData.ingredient && (
                  <>
                    <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(ingredientData.ingredient.category) + '30' }]}>
                      <View style={[styles.categoryDot, { backgroundColor: getCategoryColor(ingredientData.ingredient.category) }]} />
                      <Text style={[styles.categoryText, { color: getCategoryColor(ingredientData.ingredient.category) }]}>
                        {ingredientData.ingredient.category}
                      </Text>
                    </View>

                    <Text style={styles.description}>
                      {ingredientData.ingredient.description_pt || ingredientData.ingredient.description}
                    </Text>

                    {ingredientData.pairings && ingredientData.pairings.length > 0 && (
                      <View style={styles.pairingsSection}>
                        <Text style={styles.sectionLabel}>Combina bem com</Text>
                        <View style={styles.pairingChips}>
                          {ingredientData.pairings.map((p) => (
                            <TouchableOpacity
                              key={p.id}
                              style={styles.pairingChip}
                              onPress={() => { closeModal(); setTimeout(() => handleNoteTap(p.name), 300); }}
                            >
                              <View style={[styles.pairingDot, { backgroundColor: getCategoryColor(p.category) }]} />
                              <Text style={styles.pairingText}>{p.name_pt || p.name}</Text>
                              <Text style={styles.affinityText}>{Math.round(p.affinity * 100)}%</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    )}
                  </>
                )}

                {ingredientData.perfumes && ingredientData.perfumes.length > 0 && (
                  <View style={styles.perfumesSection}>
                    <Text style={styles.sectionLabel}>
                      Perfumes com {selectedNote} ({ingredientData.perfume_count || ingredientData.perfumes.length})
                    </Text>
                    {ingredientData.perfumes.slice(0, 10).map((p) => (
                      <TouchableOpacity
                        key={p.id}
                        style={styles.perfumeRow}
                        onPress={() => {
                          closeModal();
                          if (navigation) navigation.push('PerfumeDetail', { perfumeId: p.id });
                        }}
                      >
                        <View style={styles.perfumeInfo}>
                          <Text style={styles.perfumeBrand}>{p.brand}</Text>
                          <Text style={styles.perfumeName} numberOfLines={1}>{p.name}</Text>
                        </View>
                        {p.note_position && (
                          <View style={styles.positionBadge}>
                            <Text style={styles.positionText}>
                              {p.note_position === 'top' ? 'Topo' : p.note_position === 'heart' ? 'Coracao' : 'Base'}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </ScrollView>
            ) : (
              <Text style={styles.noData}>Sem informacao disponivel para esta nota</Text>
            )}
          </View>
        </View>
      </Modal>
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
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '75%',
    padding: theme.spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.typography.h4,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
  },
  closeBtn: {
    fontSize: theme.typography.h5,
    color: theme.colors.textTertiary,
    padding: theme.spacing.xs,
  },
  modalScroll: {
    flex: 1,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    marginBottom: theme.spacing.md,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryText: {
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.semibold,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  pairingsSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionLabel: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  pairingChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  pairingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    gap: 4,
  },
  pairingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pairingText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textPrimary,
  },
  affinityText: {
    fontSize: 10,
    color: theme.colors.textTertiary,
  },
  perfumesSection: {
    marginBottom: theme.spacing.lg,
  },
  perfumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  perfumeInfo: {
    flex: 1,
  },
  perfumeBrand: {
    fontSize: theme.typography.small,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
    textTransform: 'uppercase',
  },
  perfumeName: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
  },
  positionBadge: {
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.md,
    marginLeft: theme.spacing.sm,
  },
  positionText: {
    fontSize: 10,
    color: theme.colors.textTertiary,
  },
  noData: {
    color: theme.colors.textTertiary,
    textAlign: 'center',
    paddingVertical: theme.spacing.xl,
  },
});
