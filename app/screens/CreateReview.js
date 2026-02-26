import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config';

export default function CreateReviewScreen({ route, navigation }) {
  const { perfumeId, perfumeName } = route.params;
  
  const [rating, setRating] = useState(0);
  const [longevity, setLongevity] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [sillage, setSillage] = useState(0);
  const [value, setValue] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Erro', 'Por favor, dê uma nota de 1 a 5');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      
      await api('/api/reviews', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          perfume_id: perfumeId,
          rating,
          longevity: longevity || null,
          performance: performance || null,
          sillage: sillage || null,
          value: value || null,
          text: text.trim() || null,
        }),
      });

      Alert.alert('Sucesso', 'Review criado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStarPicker = (currentValue, setValue, label) => (
    <View style={styles.ratingSection}>
      <Text style={styles.ratingLabel}>{label}</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setValue(star)}
            style={styles.starButton}
          >
            <Text style={styles.starText}>
              {star <= currentValue ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Review de {perfumeName}</Text>
      </View>

      {renderStarPicker(rating, setRating, 'Nota Geral *')}
      {renderStarPicker(longevity, setLongevity, 'Duração')}
      {renderStarPicker(performance, setPerformance, 'Performance')}
      {renderStarPicker(sillage, setSillage, 'Sillage (Projeção)')}
      {renderStarPicker(value, setValue, 'Custo-Benefício')}

      <View style={styles.textSection}>
        <Text style={styles.textLabel}>Seu Review (opcional)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Compartilhe sua experiência com este perfume..."
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity 
        style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Enviando...' : 'Publicar Review'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  starButton: {
    padding: 8,
  },
  starText: {
    fontSize: 32,
  },
  textSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    fontSize: 15,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#8b4513',
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});
