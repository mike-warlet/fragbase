import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function CreateCollection({ navigation, route }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const { onCollectionCreated } = route.params || {};

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Nome da coleção é obrigatório');
      return;
    }

    setLoading(true);

    try {
      await apiCall('/api/collections', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          is_public: isPublic,
        }),
      });

      Alert.alert('Sucesso', 'Coleção criada!');
      if (onCollectionCreated) {
        onCollectionCreated();
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar coleção');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Coleção *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ex: Favoritos de Inverno"
        placeholderTextColor={colors.textTertiary}
        maxLength={100}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descreva sua coleção..."
        placeholderTextColor={colors.textTertiary}
        multiline
        numberOfLines={4}
        maxLength={500}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Pública</Text>
        <Switch
          value={isPublic}
          onValueChange={setIsPublic}
          trackColor={{ false: colors.surfaceLight, true: colors.primary }}
          thumbColor={colors.textPrimary}
        />
      </View>
      <Text style={styles.hint}>
        {isPublic
          ? 'Outros usuários poderão ver esta coleção'
          : 'Apenas você poderá ver esta coleção'}
      </Text>

      <TouchableOpacity
        style={[styles.createButton, loading && styles.disabledButton]}
        onPress={handleCreate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.createButtonText}>Criar Coleção</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  label: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md - 4,
    fontSize: typography.h6,
    color: colors.textPrimary,
    backgroundColor: colors.surfaceLight,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  hint: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  createButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  createButtonText: {
    color: colors.textPrimary,
    fontSize: typography.h6,
    fontWeight: typography.semibold,
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButton: {
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  cancelButtonText: {
    color: colors.primaryLight,
    fontSize: typography.h6,
  },
});
