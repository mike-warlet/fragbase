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
      await apiCall('/api/collections', 'POST', {
        name: name.trim(),
        description: description.trim() || null,
        is_public: isPublic,
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
        maxLength={100}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descreva sua coleção..."
        multiline
        numberOfLines={4}
        maxLength={500}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Pública</Text>
        <Switch
          value={isPublic}
          onValueChange={setIsPublic}
          trackColor={{ false: '#CCC', true: '#8B4789' }}
          thumbColor="#FFF"
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
    backgroundColor: '#FFF',
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  createButton: {
    backgroundColor: '#8B4789',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#8B4789',
    fontSize: 16,
  },
});
