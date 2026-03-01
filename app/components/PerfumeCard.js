import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

function PerfumeCard({ perfume, onPress }) {
  const [imageError, setImageError] = React.useState(false);

  const rating = perfume.avg_rating || perfume.rating || 0;
  const topAccords = (perfume.main_accords || []).slice(0, 3);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Image area - taller 3:4 ratio */}
      <View style={styles.imageContainer}>
        {perfume.image_url && !imageError ? (
          <Image
            source={{ uri: perfume.image_url }}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderEmoji}>
              {perfume.gender === 'feminine' ? '\uD83C\uDF38' :
               perfume.gender === 'masculine' ? '\uD83E\uDDF4' : '\u2728'}
            </Text>
            <Text style={styles.placeholderBrand} numberOfLines={1}>{perfume.brand}</Text>
          </View>
        )}

        {/* Gradient overlay at bottom of image */}
        <View style={styles.imageOverlay} />

        {/* Gender badge */}
        {perfume.gender && (
          <View style={[styles.genderBadge, {
            backgroundColor: (theme.getGenderColor && theme.getGenderColor(perfume.gender)) || theme.colors.primary
          }]}>
            <Text style={styles.genderText}>
              {perfume.gender === 'masculine' ? 'M' : perfume.gender === 'feminine' ? 'F' : 'U'}
            </Text>
          </View>
        )}

        {/* Rating badge on image */}
        {rating > 0 && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingIcon}>{'\u2605'}</Text>
            <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
          </View>
        )}

        {/* Type/concentration badge */}
        {perfume.type && perfume.type !== 'Eau de Toilette' && (
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>
              {perfume.type === 'Eau de Parfum' ? 'EDP' :
               perfume.type === 'Parfum' ? 'P' :
               perfume.type === 'Extrait de Parfum' ? 'Extrait' :
               perfume.type === 'Eau de Cologne' ? 'EDC' : ''}
            </Text>
          </View>
        )}
      </View>

      {/* Content area */}
      <View style={styles.content}>
        <Text style={styles.brand} numberOfLines={1}>{perfume.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{perfume.name}</Text>

        {perfume.year ? (
          <Text style={styles.year}>{perfume.year}</Text>
        ) : null}

        {/* Accord chips */}
        {topAccords.length > 0 && (
          <View style={styles.accordsContainer}>
            {topAccords.map((accord, index) => {
              const color = theme.getAccordColor(accord.name);
              return (
                <View
                  key={index}
                  style={[
                    styles.accordTag,
                    {
                      backgroundColor: color + '20',
                      borderColor: color + '60',
                    }
                  ]}
                >
                  <View style={[styles.accordDot, { backgroundColor: color }]} />
                  <Text style={[styles.accordText, { color: color }]}>{accord.name}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(PerfumeCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 0.75, // 3:4 ratio - taller for perfume bottles
    backgroundColor: theme.colors.surfaceLight,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
  },
  placeholderEmoji: {
    fontSize: 52,
    marginBottom: theme.spacing.xs,
  },
  placeholderBrand: {
    fontSize: theme.typography.caption,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'transparent',
    // Subtle gradient effect via border
    borderBottomWidth: 0,
  },
  genderBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderText: {
    color: '#fff',
    fontSize: theme.typography.small,
    fontWeight: theme.typography.bold,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: theme.spacing.sm,
    left: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    gap: 2,
  },
  ratingIcon: {
    fontSize: 10,
    color: '#ffd700',
  },
  ratingValue: {
    fontSize: theme.typography.small,
    color: '#fff',
    fontWeight: theme.typography.bold,
  },
  typeBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  typeText: {
    fontSize: theme.typography.small,
    color: '#fff',
    fontWeight: theme.typography.semibold,
  },
  content: {
    padding: theme.spacing.sm,
  },
  brand: {
    fontSize: theme.typography.small,
    color: theme.colors.primary,
    fontWeight: theme.typography.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  name: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
    lineHeight: 18,
  },
  year: {
    fontSize: theme.typography.small,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.xs,
  },
  accordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: theme.spacing.xs,
  },
  accordTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    gap: 3,
  },
  accordDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  accordText: {
    fontSize: 9,
    fontWeight: theme.typography.semibold,
    textTransform: 'capitalize',
  },
});
