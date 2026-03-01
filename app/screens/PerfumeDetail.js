import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, Alert, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiCall } from '../config';
import NoteVoting from '../components/NoteVoting';
import AccordVoting from '../components/AccordVoting';
import PerformanceVoting from '../components/PerformanceVoting';
import SeasonVoting from '../components/SeasonVoting';
import WishlistButtons from '../components/WishlistButtons';
import SimilarPerfumes from '../components/SimilarPerfumes';
import ReviewCard from '../components/ReviewCard';
import AddToCollectionModal from '../components/AddToCollectionModal';
import LayeringSuggestions from '../components/LayeringSuggestions';
import PyramidNotes from '../components/PyramidNotes';
import theme from '../theme';

export default function PerfumeDetailScreen({ route, navigation }) {
  const { perfumeId } = route.params || {};
  const [perfume, setPerfume] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  // Voting data
  const [noteVotes, setNoteVotes] = useState({ notes: { top: [], heart: [], base: [] }, user_votes: [] });
  const [accordVotes, setAccordVotes] = useState({ accords: [], user_votes: [] });
  const [performanceVotes, setPerformanceVotes] = useState({ performance: null, user_vote: null });
  const [seasonVotes, setSeasonVotes] = useState({ seasons: null, user_vote: null });
  const [wishlistStatus, setWishlistStatus] = useState({ status: {}, counts: {} });
  const [statements, setStatements] = useState([]);
  const [noses, setNoses] = useState([]);
  const [userRecs, setUserRecs] = useState([]);
  const [statementText, setStatementText] = useState('');
  const [statementRating, setStatementRating] = useState(8);

  useEffect(() => {
    loadPerfume();
    loadReviews();
    loadVotingData();
    loadNewFeatures();
  }, []);

  const loadPerfume = async () => {
    try {
      const data = await apiCall(`/api/perfumes/${perfumeId}`);
      setPerfume(data.perfume || null);
    } catch (error) {
      console.error('Error loading perfume:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await apiCall(`/api/perfumes/${perfumeId}/reviews`);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const loadVotingData = async () => {
    try {
      const [notesData, accordsData, perfData, seasonData, wishlistData] = await Promise.allSettled([
        apiCall(`/api/perfumes/${perfumeId}/notes/votes`),
        apiCall(`/api/perfumes/${perfumeId}/accords/votes`),
        apiCall(`/api/perfumes/${perfumeId}/performance/votes`),
        apiCall(`/api/perfumes/${perfumeId}/season/votes`),
        apiCall(`/api/perfumes/${perfumeId}/wishlist-status`).catch(() => ({ status: {}, counts: {} })),
      ]);

      if (notesData.status === 'fulfilled') setNoteVotes(notesData.value);
      if (accordsData.status === 'fulfilled') setAccordVotes(accordsData.value);
      if (perfData.status === 'fulfilled') setPerformanceVotes(perfData.value);
      if (seasonData.status === 'fulfilled') setSeasonVotes(seasonData.value);
      if (wishlistData.status === 'fulfilled') setWishlistStatus(wishlistData.value);
    } catch (error) {
      console.error('Error loading voting data:', error);
    }
  };

  const loadNewFeatures = async () => {
    try {
      const [stmts, nosesData, recsData] = await Promise.allSettled([
        apiCall(`/api/perfumes/${perfumeId}/statements`),
        apiCall(`/api/perfumes/${perfumeId}/noses`),
        apiCall(`/api/perfumes/${perfumeId}/recommendations`),
      ]);
      if (stmts.status === 'fulfilled') setStatements(stmts.value?.statements || []);
      if (nosesData.status === 'fulfilled') setNoses(nosesData.value?.perfumers || []);
      if (recsData.status === 'fulfilled') setUserRecs(recsData.value?.recommendations || []);
    } catch (error) {
      console.error('Error loading new features:', error);
    }
  };

  const submitStatement = async () => {
    if (!statementText.trim()) return;
    try {
      const data = await apiCall(`/api/perfumes/${perfumeId}/statements`, {
        method: 'POST',
        body: JSON.stringify({ text: statementText.trim(), rating: statementRating }),
      });
      setStatements(prev => [data.statement, ...prev]);
      setStatementText('');
      Alert.alert('Sucesso', 'Opiniao publicada!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  // ── Vote handlers ─────────────────────────────────────────

  const handleNoteVote = useCallback(async (noteName, noteLayer, intensity) => {
    try {
      await apiCall(`/api/perfumes/${perfumeId}/notes/vote`, {
        method: 'POST',
        body: JSON.stringify({ note_name: noteName, note_layer: noteLayer, intensity }),
      });
      const data = await apiCall(`/api/perfumes/${perfumeId}/notes/votes`);
      setNoteVotes(data);
    } catch (error) {
      console.error('Note vote error:', error);
    }
  }, [perfumeId]);

  const handleAccordVote = useCallback(async (accordName, strength) => {
    try {
      await apiCall(`/api/perfumes/${perfumeId}/accords/vote`, {
        method: 'POST',
        body: JSON.stringify({ accord_name: accordName, strength }),
      });
      const data = await apiCall(`/api/perfumes/${perfumeId}/accords/votes`);
      setAccordVotes(data);
    } catch (error) {
      console.error('Accord vote error:', error);
    }
  }, [perfumeId]);

  const handlePerformanceVote = useCallback(async (metric, value) => {
    try {
      await apiCall(`/api/perfumes/${perfumeId}/performance/vote`, {
        method: 'POST',
        body: JSON.stringify({ [metric]: value }),
      });
      const data = await apiCall(`/api/perfumes/${perfumeId}/performance/votes`);
      setPerformanceVotes(data);
    } catch (error) {
      console.error('Performance vote error:', error);
    }
  }, [perfumeId]);

  const handleSeasonVote = useCallback(async (votes) => {
    try {
      await apiCall(`/api/perfumes/${perfumeId}/season/vote`, {
        method: 'POST',
        body: JSON.stringify(votes),
      });
      const data = await apiCall(`/api/perfumes/${perfumeId}/season/votes`);
      setSeasonVotes(data);
    } catch (error) {
      console.error('Season vote error:', error);
    }
  }, [perfumeId]);

  const handleWishlistToggle = useCallback(async (listType) => {
    try {
      const isActive = wishlistStatus.status[listType];

      if (isActive) {
        await apiCall('/api/wishlists', {
          method: 'DELETE',
          body: JSON.stringify({ perfume_id: perfumeId, list_type: listType }),
        });
      } else {
        await apiCall('/api/wishlists', {
          method: 'POST',
          body: JSON.stringify({ perfume_id: perfumeId, list_type: listType }),
        });
      }

      const data = await apiCall(`/api/perfumes/${perfumeId}/wishlist-status`);
      setWishlistStatus(data);
    } catch (error) {
      console.error('Wishlist toggle error:', error);
    }
  }, [perfumeId, wishlistStatus]);

  const handleSharePerfume = async () => {
    try {
      const year = perfume.year ? ` (${perfume.year})` : '';
      const rating = perfume.avg_rating ? `\nRating: ${Number(perfume.avg_rating).toFixed(1)}/5` : '';
      await Share.share({
        message: `${perfume.name} by ${perfume.brand}${year}${rating}\n\nDescobre no Fragbase!`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handleCreateReview = () => {
    navigation.navigate('CreateReview', { perfumeId, perfumeName: perfume.name });
  };

  // ── Loading/Error states ──────────────────────────────────

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!perfume) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Perfume nao encontrado</Text>
      </View>
    );
  }

  // Parse notes safely (may be string, object, or null)
  const parsedNotes = (() => {
    if (!perfume.notes) return { top: [], heart: [], base: [] };
    if (typeof perfume.notes === 'string') {
      try { return JSON.parse(perfume.notes); } catch { return { top: [], heart: [], base: [] }; }
    }
    return perfume.notes;
  })();

  // Merge notes from perfume data with community votes
  const voteNotes = noteVotes?.notes || { top: [], heart: [], base: [] };
  const mergedNotes = {
    top: (Array.isArray(parsedNotes.top) ? parsedNotes.top : []).map(name => {
      const vote = (voteNotes.top || []).find(v => v.name === name);
      return vote || { name, avg_intensity: 0, vote_count: 0 };
    }),
    heart: (Array.isArray(parsedNotes.heart) ? parsedNotes.heart : []).map(name => {
      const vote = (voteNotes.heart || []).find(v => v.name === name);
      return vote || { name, avg_intensity: 0, vote_count: 0 };
    }),
    base: (Array.isArray(parsedNotes.base) ? parsedNotes.base : []).map(name => {
      const vote = (voteNotes.base || []).find(v => v.name === name);
      return vote || { name, avg_intensity: 0, vote_count: 0 };
    }),
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. Hero Image with gradient */}
      <View style={styles.heroContainer}>
        {perfume.image_url ? (
          <Image source={{ uri: perfume.image_url }} style={styles.heroImage} />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroEmoji}>🌸</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', theme.colors.background]}
          style={styles.heroGradient}
        />
        {perfume.gender && theme.getGenderColor && (
          <View style={[styles.genderBadge, { backgroundColor: theme.getGenderColor(perfume.gender) || theme.colors.primary }]}>
            <Text style={styles.genderText}>
              {perfume.gender === 'masculine' ? 'FOR MEN' :
               perfume.gender === 'feminine' ? 'FOR WOMEN' : 'UNISEX'}
            </Text>
          </View>
        )}
      </View>

      {/* 2. Header Info */}
      <View style={styles.headerInfo}>
        <Text style={styles.brand}>{perfume.brand}</Text>
        <Text style={styles.name}>{perfume.name}</Text>
        <View style={styles.metaRow}>
          {perfume.year && <Text style={styles.metaText}>{perfume.year}</Text>}
          {perfume.concentration && <Text style={styles.metaText}>{perfume.concentration}</Text>}
        </View>
        {perfume.perfumer && (
          <Text style={styles.perfumer}>Por {perfume.perfumer}</Text>
        )}
        <TouchableOpacity style={styles.shareButton} onPress={handleSharePerfume}>
          <Text style={styles.shareButtonText}>Partilhar</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Community Rating */}
      {perfume.review_count > 0 && (
        <View style={styles.ratingSection}>
          <View style={styles.ratingMain}>
            <Text style={styles.ratingNumber}>
              {Number(perfume.avg_rating).toFixed(1)}
            </Text>
            <Text style={styles.ratingStars}>
              {'⭐'.repeat(Math.round(perfume.avg_rating))}
            </Text>
          </View>
          <Text style={styles.ratingCount}>
            {perfume.review_count} {perfume.review_count === 1 ? 'review' : 'reviews'}
          </Text>
        </View>
      )}

      {/* 4. Wishlist Buttons */}
      <WishlistButtons
        status={wishlistStatus?.status || {}}
        counts={wishlistStatus?.counts || {}}
        onToggle={handleWishlistToggle}
      />

      {/* 5. Accords (interactive) */}
      <AccordVoting
        accords={accordVotes.accords?.length > 0 ? accordVotes.accords : perfume.accords || []}
        userVotes={accordVotes.user_votes}
        onVote={handleAccordVote}
      />

      {/* 6. Performance */}
      <PerformanceVoting
        performance={performanceVotes.performance}
        userVote={performanceVotes.user_vote}
        onVote={handlePerformanceVote}
      />

      {/* 7a. Visual Pyramid - tappable notes with ingredient info */}
      {(parsedNotes.top?.length > 0 || parsedNotes.heart?.length > 0 || parsedNotes.base?.length > 0) && (
        <PyramidNotes
          notes={{ top: parsedNotes.top, middle: parsedNotes.heart, base: parsedNotes.base }}
          navigation={navigation}
        />
      )}

      {/* 7b. Olfactory Pyramid (interactive voting) */}
      {(mergedNotes.top.length > 0 || mergedNotes.heart.length > 0 || mergedNotes.base.length > 0) && (
        <NoteVoting
          notes={mergedNotes}
          userVotes={noteVotes.user_votes}
          onVote={handleNoteVote}
        />
      )}

      {/* 8. When to Wear */}
      <SeasonVoting
        seasons={seasonVotes.seasons}
        userVote={seasonVotes.user_vote}
        onVote={handleSeasonVote}
      />

      {/* 9. Description */}
      {perfume.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descricao</Text>
          <Text style={styles.description}>{perfume.description}</Text>
        </View>
      )}

      {/* 10. Layering Suggestions */}
      <LayeringSuggestions
        perfumeId={perfumeId}
        perfumeName={perfume.name}
        navigation={navigation}
      />

      {/* 11. Similar Perfumes (with dupe/upgrade tabs) */}
      <SimilarPerfumes
        perfumeId={perfumeId}
        onPress={(id) => navigation.push('PerfumeDetail', { perfumeId: id })}
      />

      {/* Perfumer (Nose) */}
      {noses.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfumista</Text>
          {noses.map((nose) => (
            <TouchableOpacity
              key={nose.id}
              style={styles.noseCard}
              onPress={() => navigation.navigate('PerfumerProfile', { perfumerId: nose.id })}
            >
              <View style={styles.noseAvatar}>
                <Text style={styles.noseAvatarText}>{nose.name.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.noseName}>{nose.name}</Text>
                <Text style={styles.noseRole}>{nose.role === 'co-creator' ? 'Co-criador' : 'Criador'}</Text>
                {nose.nationality && <Text style={styles.noseNat}>{nose.nationality}</Text>}
              </View>
              <Text style={styles.noseArrow}>{'>'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Statements (micro-reviews) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opinioes Rapidas ({statements.length})</Text>
        <View style={styles.statementInput}>
          <TextInput
            style={styles.statementTextInput}
            placeholder="Sua opiniao em 280 caracteres..."
            placeholderTextColor={theme.colors.textTertiary}
            value={statementText}
            onChangeText={setStatementText}
            maxLength={280}
            multiline
          />
          <View style={styles.statementActions}>
            <View style={styles.ratingPicker}>
              {[6,7,8,9,10].map(r => (
                <TouchableOpacity
                  key={r}
                  style={[styles.ratingChip, statementRating === r && styles.ratingChipActive]}
                  onPress={() => setStatementRating(r)}
                >
                  <Text style={[styles.ratingChipText, statementRating === r && styles.ratingChipTextActive]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.statementSubmit} onPress={submitStatement}>
              <Text style={styles.statementSubmitText}>Publicar</Text>
            </TouchableOpacity>
          </View>
        </View>
        {statements.slice(0, 5).map((s) => (
          <View key={s.id} style={styles.statementCard}>
            <View style={styles.statementHeader}>
              <Text style={styles.statementUser}>@{s.username}</Text>
              <View style={styles.statementRatingBadge}>
                <Text style={styles.statementRatingText}>{s.rating}/10</Text>
              </View>
            </View>
            <Text style={styles.statementBody}>{s.text}</Text>
            {s.tags && s.tags.length > 0 && (
              <View style={styles.statementTags}>
                {s.tags.map(t => (
                  <View key={t} style={styles.statementTag}>
                    <Text style={styles.statementTagText}>{t.replace('_', ' ')}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* User Recommendations */}
      {userRecs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Se gostas deste, experimenta...</Text>
          {userRecs.map((rec) => (
            <TouchableOpacity
              key={rec.id}
              style={styles.recCard}
              onPress={() => navigation.push('PerfumeDetail', { perfumeId: rec.recommended_perfume_id })}
            >
              {rec.rec_image ? (
                <Image source={{ uri: rec.rec_image }} style={styles.recImage} />
              ) : (
                <View style={[styles.recImage, styles.recImagePlaceholder]}>
                  <Text style={{ fontSize: 20 }}>🌸</Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.recBrand}>{rec.rec_brand}</Text>
                <Text style={styles.recName}>{rec.rec_name}</Text>
                {rec.reason && <Text style={styles.recReason}>"{rec.reason}"</Text>}
                <Text style={styles.recBy}>por @{rec.username}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.reviewButton} onPress={handleCreateReview}>
          <Text style={styles.reviewButtonText}>Escrever Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.collectionButton}
          onPress={() => setShowCollectionModal(true)}
        >
          <Text style={styles.collectionButtonText}>Adicionar a Colecao</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.collectionButton}
          onPress={() => navigation.navigate('Compare', { perfumeIds: [perfumeId] })}
        >
          <Text style={styles.collectionButtonText}>Comparar</Text>
        </TouchableOpacity>
      </View>

      {/* 11. Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onUserPress={() => navigation.navigate('UserProfile', { userId: review.user_id })}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum review ainda. Seja o primeiro!</Text>
        )}
      </View>

      {/* Modal */}
      <AddToCollectionModal
        visible={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        perfumeId={perfumeId}
        perfumeName={perfume.name}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.body,
  },

  // Hero
  heroContainer: {
    position: 'relative',
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 128,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  genderBadge: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
  },
  genderText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.caption,
    fontWeight: theme.typography.bold,
  },

  // Header Info
  headerInfo: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  brand: {
    fontSize: theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: theme.typography.bold,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: theme.typography.h2,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: 4,
  },
  metaText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
  },
  perfumer: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  shareButton: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.round,
  },
  shareButtonText: {
    fontSize: theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
  },

  // Rating
  ratingSection: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  ratingMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  ratingNumber: {
    fontSize: theme.typography.h1,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
  },
  ratingStars: {
    fontSize: 20,
  },
  ratingCount: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },

  // Section
  section: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    paddingVertical: theme.spacing.lg,
  },

  // Action Buttons
  actionButtons: {
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  reviewButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  reviewButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
  },
  collectionButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  collectionButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
  },

  // Perfumer (Nose)
  noseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  noseAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noseAvatarText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
  },
  noseName: {
    fontSize: theme.typography.body + 1,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textPrimary,
  },
  noseRole: {
    fontSize: theme.typography.caption,
    color: theme.colors.primary,
  },
  noseNat: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
  },
  noseArrow: {
    fontSize: theme.typography.h5,
    color: theme.colors.textTertiary,
  },

  // Statements
  statementInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  statementTextInput: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    minHeight: 50,
    maxHeight: 100,
  },
  statementActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  ratingPicker: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  ratingChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingChipActive: {
    backgroundColor: theme.colors.primary,
  },
  ratingChipText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.semibold,
  },
  ratingChipTextActive: {
    color: theme.colors.textPrimary,
  },
  statementSubmit: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  statementSubmitText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.semibold,
    fontSize: theme.typography.body,
  },
  statementCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  statementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  statementUser: {
    fontSize: theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
  },
  statementRatingBadge: {
    backgroundColor: theme.colors.primaryDark,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  statementRatingText: {
    fontSize: theme.typography.small,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.bold,
  },
  statementBody: {
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  statementTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  statementTag: {
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.round,
  },
  statementTagText: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
  },

  // Recommendations
  recCard: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  recImage: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    resizeMode: 'contain',
  },
  recImagePlaceholder: {
    backgroundColor: theme.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recBrand: {
    fontSize: theme.typography.small,
    color: theme.colors.primary,
    fontWeight: theme.typography.bold,
    textTransform: 'uppercase',
  },
  recName: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.semibold,
    color: theme.colors.textPrimary,
  },
  recReason: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  recBy: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
    marginTop: 2,
  },
});
