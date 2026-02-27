import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { api, apiCall } from '../config';
import NoteVoting from '../components/NoteVoting';
import AccordVoting from '../components/AccordVoting';
import PerformanceVoting from '../components/PerformanceVoting';
import SeasonVoting from '../components/SeasonVoting';
import WishlistButtons from '../components/WishlistButtons';
import SimilarPerfumes from '../components/SimilarPerfumes';
import ReviewCard from '../components/ReviewCard';
import AddToCollectionModal from '../components/AddToCollectionModal';
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
  const [similarPerfumes, setSimilarPerfumes] = useState([]);

  useEffect(() => {
    loadPerfume();
    loadReviews();
    loadVotingData();
  }, []);

  const loadPerfume = async () => {
    try {
      const data = await api(`/api/perfumes/${perfumeId}`);
      setPerfume(data.perfume);
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
      const [notesData, accordsData, perfData, seasonData, similarData, wishlistData] = await Promise.allSettled([
        apiCall(`/api/perfumes/${perfumeId}/notes/votes`),
        apiCall(`/api/perfumes/${perfumeId}/accords/votes`),
        apiCall(`/api/perfumes/${perfumeId}/performance/votes`),
        apiCall(`/api/perfumes/${perfumeId}/season/votes`),
        api(`/api/perfumes/${perfumeId}/similar`),
        apiCall(`/api/perfumes/${perfumeId}/wishlist-status`).catch(() => ({ status: {}, counts: {} })),
      ]);

      if (notesData.status === 'fulfilled') setNoteVotes(notesData.value);
      if (accordsData.status === 'fulfilled') setAccordVotes(accordsData.value);
      if (perfData.status === 'fulfilled') setPerformanceVotes(perfData.value);
      if (seasonData.status === 'fulfilled') setSeasonVotes(seasonData.value);
      if (similarData.status === 'fulfilled') setSimilarPerfumes(similarData.value.similar || []);
      if (wishlistData.status === 'fulfilled') setWishlistStatus(wishlistData.value);
    } catch (error) {
      console.error('Error loading voting data:', error);
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

  // Merge notes from perfume data with community votes
  const mergedNotes = {
    top: (perfume.notes?.top || []).map(name => {
      const vote = noteVotes.notes.top?.find(v => v.name === name);
      return vote || { name, avg_intensity: 0, vote_count: 0 };
    }),
    heart: (perfume.notes?.heart || []).map(name => {
      const vote = noteVotes.notes.heart?.find(v => v.name === name);
      return vote || { name, avg_intensity: 0, vote_count: 0 };
    }),
    base: (perfume.notes?.base || []).map(name => {
      const vote = noteVotes.notes.base?.find(v => v.name === name);
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
        {perfume.gender && (
          <View style={[styles.genderBadge, { backgroundColor: theme.getGenderColor(perfume.gender) }]}>
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
        status={wishlistStatus.status}
        counts={wishlistStatus.counts}
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

      {/* 7. Olfactory Pyramid (interactive) */}
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

      {/* 10. Similar Perfumes */}
      <SimilarPerfumes
        perfumes={similarPerfumes}
        onPress={(id) => navigation.push('PerfumeDetail', { perfumeId: id })}
      />

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
});
