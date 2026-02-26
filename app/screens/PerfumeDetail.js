import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config';
import ReviewCard from '../components/ReviewCard';

export default function PerfumeDetailScreen({ route, navigation }) {
  const { perfumeId } = route.params;
  const [perfume, setPerfume] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header with image */}
      <View style={styles.header}>
        {perfume.image_url ? (
          <Image source={{ uri: perfume.image_url }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>🌸</Text>
          </View>
        )}
        
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{perfume.name}</Text>
          <Text style={styles.brand}>{perfume.brand}</Text>
          {perfume.year && <Text style={styles.year}>{perfume.year}</Text>}
          {perfume.type && <Text style={styles.type}>{perfume.type}</Text>}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {perfume.avg_rating > 0 ? perfume.avg_rating.toFixed(1) : '—'}
          </Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{perfume.review_count || 0}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* Notes */}
      {(perfume.notes_top || perfume.notes_heart || perfume.notes_base) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notas</Text>
          {perfume.notes_top && (
            <View style={styles.noteRow}>
              <Text style={styles.noteLabel}>Topo:</Text>
              <Text style={styles.noteValue}>{perfume.notes_top}</Text>
            </View>
          )}
          {perfume.notes_heart && (
            <View style={styles.noteRow}>
              <Text style={styles.noteLabel}>Coração:</Text>
              <Text style={styles.noteValue}>{perfume.notes_heart}</Text>
            </View>
          )}
          {perfume.notes_base && (
            <View style={styles.noteRow}>
              <Text style={styles.noteLabel}>Base:</Text>
              <Text style={styles.noteValue}>{perfume.notes_base}</Text>
            </View>
          )}
        </View>
      )}

      {/* Description */}
      {perfume.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{perfume.description}</Text>
        </View>
      )}

      {/* Review button */}
      <TouchableOpacity style={styles.reviewButton} onPress={handleCreateReview}>
        <Text style={styles.reviewButtonText}>✍️ Escrever Review</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 20,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#f0e6d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  placeholderText: {
    fontSize: 48,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  brand: {
    fontSize: 18,
    color: '#8b4513',
    fontWeight: '600',
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  type: {
    fontSize: 13,
    color: '#999',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8b4513',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  noteRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 80,
  },
  noteValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  reviewButton: {
    backgroundColor: '#8b4513',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    paddingVertical: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});
