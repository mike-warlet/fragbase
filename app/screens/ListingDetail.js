import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, Alert, ActivityIndicator, TextInput, Modal,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';
import { apiCall } from '../config';
import { useAuth } from '../AuthContext';

const CONDITIONS = {
  new: 'Novo / Lacrado',
  used_like_new: 'Seminovo',
  used_good: 'Usado - Bom estado',
  used_fair: 'Usado - Regular',
  decant: 'Decant',
  sample: 'Amostra',
};

export default function ListingDetailScreen({ navigation, route }) {
  const { listingId } = route.params;
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOffer, setShowOffer] = useState(false);
  const [offerMessage, setOfferMessage] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadListing();
  }, []);

  const loadListing = async () => {
    try {
      const data = await apiCall(`/api/marketplace/${listingId}`);
      setListing(data.listing);
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
    setLoading(false);
  };

  const sendOffer = async () => {
    setSending(true);
    try {
      await apiCall(`/api/marketplace/${listingId}/offer`, {
        method: 'POST',
        body: JSON.stringify({
          message: offerMessage.trim() || null,
          offer_price: offerPrice ? parseFloat(offerPrice) : null,
        }),
      });
      Alert.alert('Enviado!', 'Sua proposta foi enviada ao vendedor.');
      setShowOffer(false);
      setOfferMessage('');
      setOfferPrice('');
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
    setSending(false);
  };

  if (loading) return <View style={styles.container}><ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} /></View>;
  if (!listing) return <View style={styles.container}><Text style={styles.errorText}>Anúncio não encontrado</Text></View>;

  const isOwner = user?.id === listing.user_id;
  const typeLabel = listing.listing_type === 'sell' ? 'Venda' : listing.listing_type === 'swap' ? 'Troca' : 'Venda/Troca';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Image */}
        <Image
          source={{ uri: listing.perfume_image || listing.image_url || 'https://via.placeholder.com/300' }}
          style={styles.image}
        />

        {/* Status badges */}
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: listing.listing_type === 'swap' ? colors.info : colors.success }]}>
            <Text style={styles.badgeText}>{typeLabel}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{CONDITIONS[listing.condition]}</Text>
          </View>
          {listing.volume_ml && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{listing.volume_ml}ml</Text>
            </View>
          )}
        </View>

        {/* Title & Price */}
        <Text style={styles.title}>{listing.title}</Text>
        {listing.price ? (
          <Text style={styles.price}>R$ {listing.price.toFixed(2)}</Text>
        ) : (
          <Text style={styles.swapLabel}>Aberto a propostas</Text>
        )}

        {/* Description */}
        {listing.description && (
          <Text style={styles.description}>{listing.description}</Text>
        )}

        {/* Location */}
        {listing.location && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Local:</Text>
            <Text style={styles.infoValue}>{listing.location}</Text>
          </View>
        )}

        {/* Linked perfume */}
        {listing.perfume_name && (
          <TouchableOpacity style={styles.perfumeLink}
            onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: listing.perfume_id_ref })}>
            <Image source={{ uri: listing.perfume_image || 'https://via.placeholder.com/50' }} style={styles.perfumeThumb} />
            <View>
              <Text style={styles.perfumeName}>{listing.perfume_name}</Text>
              <Text style={styles.perfumeBrand}>{listing.perfume_brand}</Text>
            </View>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        )}

        {/* Seller info */}
        <TouchableOpacity style={styles.sellerCard}
          onPress={() => navigation.navigate('UserProfile', { userId: listing.seller_id })}>
          <Image source={{ uri: listing.seller_photo || 'https://via.placeholder.com/40' }} style={styles.sellerPhoto} />
          <View style={{ flex: 1 }}>
            <Text style={styles.sellerName}>{listing.seller_name}</Text>
            <Text style={styles.sellerUsername}>@{listing.username}</Text>
            <Text style={styles.sellerStats}>
              {listing.seller_sold_count} vendas realizadas
            </Text>
          </View>
        </TouchableOpacity>

        {isOwner && (
          <View style={styles.ownerInfo}>
            <Text style={styles.ownerText}>{listing.offer_count} proposta(s) pendente(s)</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom action */}
      {!isOwner && listing.status === 'active' && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.messageBtn}
            onPress={() => navigation.navigate('Chat', { userId: listing.seller_id, userName: listing.seller_name })}>
            <Text style={styles.messageBtnText}>Mensagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerBtn} onPress={() => setShowOffer(true)}>
            <Text style={styles.offerBtnText}>Fazer Proposta</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Offer modal */}
      <Modal visible={showOffer} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fazer Proposta</Text>
            {listing.listing_type !== 'swap' && (
              <>
                <Text style={styles.modalLabel}>Valor oferecido (R$)</Text>
                <TextInput style={styles.modalInput} value={offerPrice} onChangeText={setOfferPrice}
                  keyboardType="numeric" placeholder={listing.price ? listing.price.toFixed(2) : '0.00'}
                  placeholderTextColor={colors.textTertiary} />
              </>
            )}
            <Text style={styles.modalLabel}>Mensagem</Text>
            <TextInput style={[styles.modalInput, { height: 80 }]} value={offerMessage}
              onChangeText={setOfferMessage} multiline
              placeholder="Escreva sua proposta..." placeholderTextColor={colors.textTertiary} />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowOffer(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendBtn} onPress={sendOffer} disabled={sending}>
                {sending ? <ActivityIndicator color="#fff" /> : <Text style={styles.sendText}>Enviar</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 100 },
  image: { width: '100%', height: 300 },
  badges: { flexDirection: 'row', gap: spacing.xs, padding: spacing.md },
  badge: { backgroundColor: colors.surfaceLight, borderRadius: borderRadius.sm, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  badgeText: { color: '#fff', fontSize: typography.caption },
  title: { color: colors.textPrimary, fontSize: typography.h4, fontWeight: typography.bold, paddingHorizontal: spacing.md },
  price: { color: colors.success, fontSize: typography.h3, fontWeight: typography.bold, paddingHorizontal: spacing.md, marginTop: spacing.xs },
  swapLabel: { color: colors.info, fontSize: typography.h5, paddingHorizontal: spacing.md, marginTop: spacing.xs },
  description: { color: colors.textSecondary, fontSize: typography.body, paddingHorizontal: spacing.md, marginTop: spacing.md, lineHeight: 20 },
  infoRow: { flexDirection: 'row', paddingHorizontal: spacing.md, marginTop: spacing.sm },
  infoLabel: { color: colors.textTertiary, fontSize: typography.body, marginRight: spacing.xs },
  infoValue: { color: colors.textPrimary, fontSize: typography.body },
  perfumeLink: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    margin: spacing.md, borderRadius: borderRadius.lg, padding: spacing.md, gap: spacing.sm,
  },
  perfumeThumb: { width: 50, height: 50, borderRadius: borderRadius.sm },
  perfumeName: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  perfumeBrand: { color: colors.textSecondary, fontSize: typography.caption },
  arrow: { color: colors.textTertiary, fontSize: typography.h5 },
  sellerCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    marginHorizontal: spacing.md, borderRadius: borderRadius.lg, padding: spacing.md, gap: spacing.sm,
  },
  sellerPhoto: { width: 48, height: 48, borderRadius: 24 },
  sellerName: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  sellerUsername: { color: colors.textSecondary, fontSize: typography.caption },
  sellerStats: { color: colors.textTertiary, fontSize: typography.small, marginTop: 2 },
  ownerInfo: { backgroundColor: colors.surfaceLight, margin: spacing.md, borderRadius: borderRadius.md, padding: spacing.md },
  ownerText: { color: colors.textPrimary, textAlign: 'center' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', gap: spacing.sm, padding: spacing.md,
    backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border,
  },
  messageBtn: { flex: 1, backgroundColor: colors.surfaceLight, borderRadius: borderRadius.lg, paddingVertical: spacing.sm, alignItems: 'center' },
  messageBtnText: { color: colors.textPrimary, fontWeight: typography.semibold },
  offerBtn: { flex: 1, backgroundColor: colors.primary, borderRadius: borderRadius.lg, paddingVertical: spacing.sm, alignItems: 'center' },
  offerBtnText: { color: '#fff', fontWeight: typography.bold },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg },
  modalTitle: { color: colors.textPrimary, fontSize: typography.h5, fontWeight: typography.bold, marginBottom: spacing.md },
  modalLabel: { color: colors.textSecondary, fontSize: typography.caption, marginTop: spacing.sm, marginBottom: spacing.xs },
  modalInput: {
    backgroundColor: colors.background, borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    color: colors.textPrimary, fontSize: typography.body,
  },
  modalActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  cancelBtn: { flex: 1, backgroundColor: colors.surfaceLight, borderRadius: borderRadius.lg, paddingVertical: spacing.sm, alignItems: 'center' },
  cancelText: { color: colors.textSecondary },
  sendBtn: { flex: 1, backgroundColor: colors.primary, borderRadius: borderRadius.lg, paddingVertical: spacing.sm, alignItems: 'center' },
  sendText: { color: '#fff', fontWeight: typography.bold },
  errorText: { color: colors.error, textAlign: 'center', marginTop: 40 },
});
