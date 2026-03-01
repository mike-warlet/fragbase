import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { apiCall, apiUpload } from '../config';
import { colors, typography, spacing, borderRadius } from '../theme';

export default function EditProfile({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    display_name: '',
    bio: '',
    avatar_url: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await apiCall('/api/auth/me');
      setProfile({
        username: data.username || '',
        display_name: data.display_name || '',
        bio: data.bio || '',
        avatar_url: data.avatar_url || '',
      });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return null;

    const formData = new FormData();
    const ext = selectedImage.uri.split('.').pop()?.toLowerCase() || 'jpg';
    const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    formData.append('image', {
      uri: selectedImage.uri,
      type: selectedImage.type || mimeType,
      name: `profile.${ext}`,
    });
    formData.append('type', 'profile');

    try {
      const response = await apiUpload('/api/images/upload', formData);
      return response.url;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleSave = async () => {
    if (!profile.display_name.trim()) {
      Alert.alert('Erro', 'Nome de exibição é obrigatório');
      return;
    }

    setSaving(true);

    try {
      let avatarUrl = profile.avatar_url;

      // Upload new image if selected
      if (selectedImage) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      await apiCall('/api/users/me', {
        method: 'PUT',
        body: JSON.stringify({
          display_name: profile.display_name,
          bio: profile.bio,
          avatar_url: avatarUrl,
        }),
      });

      Alert.alert('Sucesso', 'Perfil atualizado!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={pickImage}>
          {selectedImage?.uri || profile.avatar_url ? (
            <Image
              source={{ uri: selectedImage?.uri || profile.avatar_url }}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarPlaceholderText}>
                {(profile.display_name || profile.username || '?').charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.avatarOverlay}>
            <Text style={styles.avatarText}>Alterar Foto</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome de usuário</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={profile.username}
          editable={false}
        />
        <Text style={styles.hint}>Nome de usuário não pode ser alterado</Text>

        <Text style={styles.label}>Nome de exibição *</Text>
        <TextInput
          style={styles.input}
          value={profile.display_name}
          onChangeText={(text) => setProfile({ ...profile, display_name: text })}
          placeholder="Seu nome"
          placeholderTextColor={colors.textTertiary}
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={profile.bio}
          onChangeText={(text) => setProfile({ ...profile, bio: text })}
          placeholder="Conte algo sobre você..."
          placeholderTextColor={colors.textTertiary}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.disabledButton]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: typography.bold,
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: spacing.sm,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: typography.caption,
    textAlign: 'center',
  },
  form: {
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
  disabledInput: {
    backgroundColor: colors.surface,
    color: colors.textTertiary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  hint: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  saveButtonText: {
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
