import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { api, apiCall } from '../config';
import theme from '../theme';

export default function LayeringSuggestions({ perfumeId, perfumeName, navigation }) {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCombos();
  }, [perfumeId]);

  const loadCombos = async () => {
    try {
      const data = await api(`/api/perfumes/${perfumeId}/layering`);
      setCombos(data.combos || []);
    } catch (error) {
      console.error('Layering load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const data = await api(`/api/perfumes?q=${encodeURIComponent(query)}&limit=10`);
      setSearchResults((data.perfumes || []).filter(p => p.id !== perfumeId));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleSubmitCombo = async () => {
    if (!selectedPerfume) return;
    setSubmitting(true);
    try {
      await apiCall('/api/layering', {
        method: 'POST',
        body: JSON.stringify({
          perfume_id_1: perfumeId,
          perfume_id_2: selectedPerfume.id,
          description: description.trim() || undefined,
        }),
      });
      setShowAddModal(false);
      setSelectedPerfume(null);
      setDescription('');
      setSearchQuery('');
      loadCombos();
    } catch (error) {
      console.error('Submit combo error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (comboId, vote) => {
    try {
      await apiCall(`/api/layering/${comboId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ vote }),
      });
      loadCombos();
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const getPartnerPerfume = (combo) => {
    if (combo.perfume_id_1 === perfumeId) {
      return {
        id: combo.perfume_id_2,
        name: combo.perfume2_name,
        brand: combo.perfume2_brand,
        image: combo.perfume2_image,
      };
    }
    return {
      id: combo.perfume_id_1,
      name: combo.perfume1_name,
      brand: combo.perfume1_brand,
      image: combo.perfume1_image,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Layering</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <Text style={styles.addButton}>+ Sugerir</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Combos recomendados pela comunidade</Text>

      {loading ? (
        <ActivityIndicator color={theme.colors.primary} style={{ padding: 16 }} />
      ) : combos.length === 0 ? (
        <Text style={styles.emptyText}>
          Nenhuma sugestao ainda. Seja o primeiro!
        </Text>
      ) : (
        combos.map((combo) => {
          const partner = getPartnerPerfume(combo);
          const score = combo.votes_up - combo.votes_down;
          return (
            <View key={combo.id} style={styles.comboCard}>
              <TouchableOpacity
                style={styles.comboInfo}
                onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: partner.id })}
              >
                {partner.image ? (
                  <Image source={{ uri: partner.image }} style={styles.comboImage} />
                ) : (
                  <View style={[styles.comboImage, styles.comboImagePlaceholder]}>
                    <Text>🌸</Text>
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.comboBrand}>{partner.brand}</Text>
                  <Text style={styles.comboName}>{partner.name}</Text>
                  {combo.description && (
                    <Text style={styles.comboDesc} numberOfLines={2}>{combo.description}</Text>
                  )}
                  <Text style={styles.comboBy}>por @{combo.suggested_by_username}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.voteSection}>
                <TouchableOpacity onPress={() => handleVote(combo.id, 1)}>
                  <Text style={styles.voteBtn}>▲</Text>
                </TouchableOpacity>
                <Text style={[styles.voteScore, score > 0 && styles.votePositive, score < 0 && styles.voteNegative]}>
                  {score}
                </Text>
                <TouchableOpacity onPress={() => handleVote(combo.id, -1)}>
                  <Text style={styles.voteBtn}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}

      {/* Add combo modal */}
      <Modal visible={showAddModal} transparent animationType="slide" onRequestClose={() => setShowAddModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sugerir Layering</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.modalClose}>Fechar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalLabel}>Combinar "{perfumeName}" com:</Text>

          {!selectedPerfume ? (
            <>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar perfume..."
                placeholderTextColor={theme.colors.textTertiary}
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus
              />
              {searching && <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 8 }} />}
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                style={{ flex: 1 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.searchItem}
                    onPress={() => setSelectedPerfume(item)}
                  >
                    {item.image_url ? (
                      <Image source={{ uri: item.image_url }} style={styles.searchThumb} />
                    ) : (
                      <View style={[styles.searchThumb, { backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center' }]}>
                        <Text>🌸</Text>
                      </View>
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.searchBrand}>{item.brand}</Text>
                      <Text style={styles.searchName}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          ) : (
            <View style={styles.selectedSection}>
              <View style={styles.selectedPerfume}>
                <Text style={styles.selectedName}>
                  {selectedPerfume.brand} - {selectedPerfume.name}
                </Text>
                <TouchableOpacity onPress={() => setSelectedPerfume(null)}>
                  <Text style={styles.changeBtn}>Trocar</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.descInput}
                placeholder="Por que essa combinacao funciona? (opcional)"
                placeholderTextColor={theme.colors.textTertiary}
                value={description}
                onChangeText={setDescription}
                multiline
                maxLength={200}
              />
              <TouchableOpacity
                style={[styles.submitBtn, submitting && { opacity: 0.6 }]}
                onPress={handleSubmitCombo}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color={theme.colors.textPrimary} />
                ) : (
                  <Text style={styles.submitText}>Sugerir Combo</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
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
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textTertiary,
    fontSize: theme.typography.body,
    paddingVertical: theme.spacing.md,
  },
  comboCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
  },
  comboInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  comboImage: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.sm,
    resizeMode: 'contain',
  },
  comboImagePlaceholder: {
    backgroundColor: theme.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comboBrand: {
    fontSize: theme.typography.small,
    color: theme.colors.primary,
    fontWeight: theme.typography.bold,
    textTransform: 'uppercase',
  },
  comboName: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.semibold,
  },
  comboDesc: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  comboBy: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
    marginTop: 2,
  },
  voteSection: {
    alignItems: 'center',
    paddingLeft: theme.spacing.sm,
  },
  voteBtn: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    paddingVertical: 4,
  },
  voteScore: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.bold,
    color: theme.colors.textSecondary,
  },
  votePositive: {
    color: theme.colors.success,
  },
  voteNegative: {
    color: theme.colors.error,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
  },
  modalClose: {
    fontSize: theme.typography.body,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
  },
  modalLabel: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.h6,
    color: theme.colors.textPrimary,
    marginHorizontal: theme.spacing.lg,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  searchThumb: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.sm,
    resizeMode: 'contain',
  },
  searchBrand: {
    fontSize: theme.typography.small,
    color: theme.colors.primary,
    fontWeight: theme.typography.bold,
    textTransform: 'uppercase',
  },
  searchName: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
  },
  selectedSection: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  selectedPerfume: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  selectedName: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.semibold,
    flex: 1,
  },
  changeBtn: {
    fontSize: theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
  },
  descInput: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  submitText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
  },
});
