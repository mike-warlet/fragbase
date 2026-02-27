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
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius } from '../theme';
import RatingStars from '../components/RatingStars';

export default function CreateReviewScreen({ route, navigation }) {
  const { perfumeId, perfumeName } = route.params || {};
  
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
      await apiCall('/api/reviews', {
        method: 'POST',
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

  const renderRatingRow = (currentValue, setter, label) => (
    <View style={styles.ratingSection}>
      <Text style={styles.ratingLabel}>{label}</Text>
      <RatingStars value={currentValue} onChange={setter} size={32} showLabel />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Review de {perfumeName}</Text>
      </View>

      {renderRatingRow(rating, setRating, 'Nota Geral *')}
      {renderRatingRow(longevity, setLongevity, 'Duração')}
      {renderRatingRow(performance, setPerformance, 'Performance')}
      {renderRatingRow(sillage, setSillage, 'Sillage (Projeção)')}
      {renderRatingRow(value, setValue, 'Custo-Benefício')}

      <View style={styles.textSection}>
        <Text style={styles.textLabel}>Seu Review (opcional)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Compartilhe sua experiência com este perfume..."
          placeholderTextColor={colors.textTertiary}
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
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  ratingSection: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  ratingLabel: {
    fontSize: typography.h6,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md - 4,
  },
  textSection: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  textLabel: {
    fontSize: typography.h6,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md - 4,
  },
  textInput: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.body + 1,
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.textPrimary,
    fontSize: typography.h6,
    fontWeight: typography.bold,
  },
  cancelButton: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: typography.h6,
  },
});
