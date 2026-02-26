import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PerfumeCard({ perfume, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {perfume.image_url ? (
        <Image source={{ uri: perfume.image_url }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>🌸</Text>
        </View>
      )}
      
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{perfume.name}</Text>
        <Text style={styles.brand}>{perfume.brand}</Text>
        
        <View style={styles.footer}>
          {perfume.year && (
            <Text style={styles.year}>{perfume.year}</Text>
          )}
          {perfume.avg_rating > 0 && (
            <Text style={styles.rating}>⭐ {perfume.avg_rating.toFixed(1)}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0e6d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  placeholderText: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#8b4513',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  year: {
    fontSize: 12,
    color: '#999',
  },
  rating: {
    fontSize: 12,
    color: '#666',
  },
});
