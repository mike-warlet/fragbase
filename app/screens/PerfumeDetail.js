import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config';
import AccordBar from '../components/AccordBar';
import PyramidNotes from '../components/PyramidNotes';
import RatingBar from '../components/RatingBar';
import ReviewCard from '../components/ReviewCard';
import AddToCollectionModal from '../components/AddToCollectionModal';
import theme from '../theme';

export default function PerfumeDetailScreen({ route, navigation }) {
  const { perfumeId } = route.params;
  const [perfume, setPerfume] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  useEffect(() => {
    loadPerfume();
    loadReviews();
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
      const token = await AsyncStorage.getItem('token');
      const data = await api(`/api/perfumes/${perfumeId}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(data.reviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleCreateReview = () => {
    navigation.navigate('CreateReview', { perfumeId, perfumeName: perfume.name });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!perfume) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>Perfume não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Hero Image */}
      <View style={styles.heroContainer}>
        {perfume.image_url ? (
          <Image source={{ uri: perfume.image_url }} style={styles.heroImage} />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroEmoji}>🌸</Text>
          </View>
        )}
        {perfume.gender && (
          <View style={[styles.genderBadge, { 
            backgroundColor: theme.getGenderColor(perfume.gender) 
          }]}>
            <Text style={styles.genderText}>
              {perfume.gender === 'masculine' ? 'FOR MEN' : 
               perfume.gender === 'feminine' ? 'FOR WOMEN' : 'UNISEX'}
            </Text>
          </View>
        )}
      </View>

      {/* Header Info */}
      <View style={styles.headerInfo}>
        <Text style={styles.brand}>{perfume.brand}</Text>
        <Text style={styles.name}>{perfume.name}</Text>
        {perfume.year && (
          <Text style={styles.year}>{perfume.year}</Text>
        )}
        {perfume.perfumer && (
          <Text style={styles.perfumer}>Por {perfume.perfumer}</Text>
        )}
      </View>

      {/* Main Accords */}
      {perfume.main_accords && perfume.main_accords.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acordes Principais</Text>
          {perfume.main_accords.slice(0, 8).map((accord, index) => (
            <AccordBar 
              key={index}
              accord={accord.name}
              strength={accord.strength || 100}
            />
          ))}
        </View>
      )}

      {/* Rating */}
      {perfume.ratings_breakdown && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliações</Text>
          <RatingBar 
            ratings={perfume.ratings_breakdown}
            total={perfume.votes_count}
          />
        </View>
      )}

      {/* Pyramid Notes */}
      {perfume.notes && (
        <PyramidNotes notes={perfume.notes} />
      )}

      {/* When to Wear */}
      {perfume.when_to_wear && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quando Usar</Text>
          <View style={styles.seasonContainer}>
            {perfume.when_to_wear.winter > 0 && (
              <View style={styles.seasonItem}>
                <Text style={styles.seasonEmoji}>❄️</Text>
                <Text style={styles.seasonText}>Inverno</Text>
                <Text style={styles.seasonVotes}>{perfume.when_to_wear.winter}</Text>
              </View>
            )}
            {perfume.when_to_wear.spring > 0 && (
              <View style={styles.seasonItem}>
                <Text style={styles.seasonEmoji}>🌸</Text>
                <Text style={styles.seasonText}>Primavera</Text>
                <Text style={styles.seasonVotes}>{perfume.when_to_wear.spring}</Text>
              </View>
            )}
            {perfume.when_to_wear.summer > 0 && (
              <View style={styles.seasonItem}>
                <Text style={styles.seasonEmoji}>☀️</Text>
                <Text style={styles.seasonText}>Verão</Text>
                <Text style={styles.seasonVotes}>{perfume.when_to_wear.summer}</Text>
              </View>
            )}
            {perfume.when_to_wear.fall > 0 && (
              <View style={styles.seasonItem}>
                <Text style={styles.seasonEmoji}>🍂</Text>
                <Text style={styles.seasonText}>Outono</Text>
                <Text style={styles.seasonVotes}>{perfume.when_to_wear.fall}</Text>
              </View>
            )}
          </View>
          <View style={styles.dayNightContainer}>
            {perfume.when_to_wear.day > 0 && (
              <View style={styles.dayNightItem}>
                <Text style={styles.seasonEmoji}>☀️</Text>
                <Text style={styles.seasonText}>Dia</Text>
                <Text style={styles.seasonVotes}>{perfume.when_to_wear.day}</Text>
              </View>
            )}
            {perfume.when_to_wear.night > 0 && (
              <View style={styles.dayNightItem}>
                <Text style={styles.seasonEmoji}>🌙</Text>
                <Text style={styles.seasonText}>Noite</Text>
                <Text style={styles.seasonVotes}>{perfume.when_to_wear.night}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Description */}
      {perfume.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{perfume.description}</Text>
        </View>
      )}

      {/* Pros & Cons */}
      {(perfume.pros || perfume.cons) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que as pessoas dizem</Text>
          {perfume.pros && perfume.pros.length > 0 && (
            <View style={styles.prosConsContainer}>
              <Text style={styles.prosTitle}>👍 Prós</Text>
              {perfume.pros.map((pro, index) => (
                <Text key={index} style={styles.proText}>• {pro}</Text>
              ))}
            </View>
          )}
          {perfume.cons && perfume.cons.length > 0 && (
            <View style={[styles.prosConsContainer, { marginTop: theme.spacing.md }]}>
              <Text style={styles.consTitle}>👎 Contras</Text>
              {perfume.cons.map((con, index) => (
                <Text key={index} style={styles.conText}>• {con}</Text>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Review button */}
      <TouchableOpacity style={styles.reviewButton} onPress={handleCreateReview}>
        <Text style={styles.reviewButtonText}>✍️ Escrever Review</Text>
      </TouchableOpacity>

      {/* Add to Collection button */}
      <TouchableOpacity 
        style={styles.collectionButton} 
        onPress={() => setShowCollectionModal(true)}
      >
        <Text style={styles.collectionButtonText}>➕ Adicionar à Coleção</Text>
      </TouchableOpacity>

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard 
              key={review.id} 
              review={review}
              onUserPress={() => {/* Navigate to user profile */}}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum review ainda. Seja o primeiro!</Text>
        )}
      </View>

      {/* Add to Collection Modal */}
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.body,
  },
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
  year: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  perfumer: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
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
  seasonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  seasonItem: {
    alignItems: 'center',
    flex: 1,
  },
  seasonEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  seasonText: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  seasonVotes: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
  },
  dayNightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayNightItem: {
    alignItems: 'center',
    flex: 1,
  },
  description: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  prosConsContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
  },
  prosTitle: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.bold,
    color: theme.colors.success,
    marginBottom: theme.spacing.sm,
  },
  proText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  consTitle: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.bold,
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },
  conText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  reviewButton: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
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
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  collectionButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
    paddingVertical: theme.spacing.lg,
  },
});
