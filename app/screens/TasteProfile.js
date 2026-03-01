import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows, getAccordColor } from '../theme';

const { width } = Dimensions.get('window');

// Scent family display config
const SCENT_FAMILIES = [
  { key: 'citrus', label: 'Citrico', color: colors.accords.citrus || '#ffd700' },
  { key: 'floral', label: 'Floral', color: colors.accords.floral || '#ff69b4' },
  { key: 'woody', label: 'Amadeirado', color: colors.accords.woody || '#8B6914' },
  { key: 'oriental', label: 'Oriental', color: colors.accords.amber || '#d4a574' },
  { key: 'fresh', label: 'Fresco', color: colors.accords.fresh || '#00bcd4' },
  { key: 'gourmand', label: 'Gourmand', color: colors.accords.sweet || '#ff8a80' },
  { key: 'aromatic', label: 'Aromatico', color: colors.accords.aromatic || '#9c27b0' },
];

// Season display config
const SEASONS = [
  { key: 'spring', label: 'Primavera', icon: '🌸', color: '#ff69b4' },
  { key: 'summer', label: 'Verao', icon: '☀️', color: '#ffd700' },
  { key: 'fall', label: 'Outono', icon: '🍂', color: '#ff9800' },
  { key: 'winter', label: 'Inverno', icon: '❄️', color: '#4fc3f7' },
];

// Intensity labels
const INTENSITY_LABELS = [
  { threshold: 0, label: 'Muito Leve' },
  { threshold: 0.25, label: 'Leve' },
  { threshold: 0.5, label: 'Moderado' },
  { threshold: 0.75, label: 'Forte' },
  { threshold: 0.9, label: 'Intenso' },
];

// Map family keywords to accord categories for collection analysis
const FAMILY_ACCORD_MAP = {
  citrus: ['citrus', 'bergamot', 'lemon', 'orange', 'grapefruit', 'lime'],
  floral: ['floral', 'white floral', 'rose', 'jasmine', 'powdery', 'iris', 'lily', 'violet'],
  woody: ['woody', 'earthy', 'mossy', 'cedar', 'sandalwood', 'vetiver', 'smoky', 'oud'],
  oriental: ['oriental', 'amber', 'spicy', 'warm spicy', 'balsamic', 'sweet', 'incense'],
  fresh: ['fresh', 'aquatic', 'green', 'ozonic', 'marine', 'clean'],
  gourmand: ['gourmand', 'vanilla', 'chocolate', 'coffee', 'caramel', 'honey', 'cocoa'],
  aromatic: ['aromatic', 'herbal', 'lavender', 'fougere', 'fresh spicy', 'sage', 'mint'],
};

export default function TasteProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasteProfile();
  }, []);

  const loadTasteProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const [collectionRes, profileRes, diaryRes] = await Promise.allSettled([
        apiCall('/api/wishlists/me'),
        apiCall('/api/discovery/profile'),
        apiCall('/api/diary/stats'),
      ]);

      // Parse collection
      const allWishlists = collectionRes.status === 'fulfilled'
        ? (collectionRes.value.wishlists || [])
        : [];
      const owned = allWishlists.filter(w => w.list_type === 'own');
      const tried = allWishlists.filter(w => w.list_type === 'tried');
      const collection = [...owned, ...tried];

      // Parse quiz profile
      const quizProfile = profileRes.status === 'fulfilled'
        ? (profileRes.value.profile || null)
        : null;

      // Parse diary stats
      const diary = diaryRes.status === 'fulfilled' ? diaryRes.value : {};

      // Compute brand distribution from collection
      const brandMap = {};
      collection.forEach(w => {
        const brand = w.perfume_brand || 'Desconhecido';
        brandMap[brand] = (brandMap[brand] || 0) + 1;
      });
      const topBrands = Object.entries(brandMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      // Build scent family scores from quiz profile
      const familyScores = {};
      if (quizProfile && quizProfile.families) {
        for (const [family, score] of Object.entries(quizProfile.families)) {
          familyScores[family] = parseFloat(score) || 0;
        }
      }

      // Get intensity from quiz profile
      const intensity = quizProfile ? parseFloat(quizProfile.intensity) || 0.5 : 0.5;

      // Get gender preference from quiz
      const genderPref = quizProfile ? quizProfile.gender_pref : null;

      // Get season preference from quiz
      const seasons = quizProfile ? (quizProfile.seasons || []) : [];

      // Get vibe from quiz
      const vibe = quizProfile ? quizProfile.vibe : null;

      // Get notes loved/disliked
      const notesLoved = quizProfile ? (quizProfile.notes_loved || []) : [];
      const notesDisliked = quizProfile ? (quizProfile.notes_disliked || []) : [];

      // Compute gender distribution from collection brands (heuristic: use collection size)
      // Since we don't have gender in wishlists response, we use quiz preference
      const genderDist = computeGenderDistribution(genderPref, collection.length);

      // Compute seasonal preference from quiz + diary
      const seasonalPref = computeSeasonalPreference(seasons, diary);

      // Generate taste summary
      const summary = generateSummary(familyScores, intensity, genderPref, vibe, topBrands, notesLoved, collection.length);

      setData({
        collection,
        collectionSize: collection.length,
        ownCount: owned.length,
        triedCount: tried.length,
        topBrands,
        familyScores,
        intensity,
        genderPref,
        genderDist,
        seasons,
        seasonalPref,
        vibe,
        notesLoved,
        notesDisliked,
        hasQuizProfile: !!quizProfile,
        diary,
        summary,
      });
    } catch (err) {
      console.error('TasteProfile error:', err);
      setError('Erro ao carregar o perfil olfativo');
    } finally {
      setLoading(false);
    }
  };

  const computeGenderDistribution = (genderPref, collectionSize) => {
    // Based on quiz preference, estimate distribution
    if (!genderPref) {
      return { masculine: 33, feminine: 33, unisex: 34 };
    }
    switch (genderPref) {
      case 'masculine':
        return { masculine: 60, feminine: 10, unisex: 30 };
      case 'feminine':
        return { masculine: 10, feminine: 60, unisex: 30 };
      case 'unisex':
        return { masculine: 20, feminine: 20, unisex: 60 };
      default:
        return { masculine: 33, feminine: 33, unisex: 34 };
    }
  };

  const computeSeasonalPreference = (quizSeasons, diary) => {
    const seasonScores = { spring: 0, summer: 0, fall: 0, winter: 0 };

    // From quiz
    if (quizSeasons && quizSeasons.length > 0) {
      quizSeasons.forEach(s => {
        if (seasonScores.hasOwnProperty(s)) {
          seasonScores[s] += 3;
        }
      });
    }

    // From diary weather
    if (diary && diary.weather) {
      diary.weather.forEach(w => {
        const weather = (w.weather || '').toLowerCase();
        if (weather.includes('sun') || weather.includes('hot') || weather === 'sunny') {
          seasonScores.summer += w.count;
        } else if (weather.includes('cold') || weather.includes('snow') || weather === 'cold') {
          seasonScores.winter += w.count;
        } else if (weather.includes('rain') || weather === 'rainy') {
          seasonScores.fall += w.count;
          seasonScores.spring += w.count * 0.5;
        } else if (weather.includes('mild') || weather.includes('warm')) {
          seasonScores.spring += w.count;
        }
      });
    }

    // If no data, give equal scores
    const total = Object.values(seasonScores).reduce((a, b) => a + b, 0);
    if (total === 0) {
      return { spring: 25, summer: 25, fall: 25, winter: 25 };
    }

    const result = {};
    for (const [key, val] of Object.entries(seasonScores)) {
      result[key] = Math.round((val / total) * 100);
    }
    return result;
  };

  const generateSummary = (families, intensity, genderPref, vibe, brands, notesLoved, collectionSize) => {
    const lines = [];

    // Find dominant family
    const sortedFamilies = Object.entries(families).sort((a, b) => b[1] - a[1]);
    if (sortedFamilies.length > 0) {
      const topFamily = sortedFamilies[0];
      const familyLabel = SCENT_FAMILIES.find(f => f.key === topFamily[0])?.label || topFamily[0];
      let line = `O teu perfil e predominantemente ${familyLabel.toLowerCase()}`;

      if (sortedFamilies.length > 1 && sortedFamilies[1][1] > 0) {
        const secondFamily = sortedFamilies[1];
        const secondLabel = SCENT_FAMILIES.find(f => f.key === secondFamily[0])?.label || secondFamily[0];
        line += ` com toques ${secondLabel.toLowerCase()}`;
      }
      line += '.';
      lines.push(line);
    }

    // Intensity summary
    if (intensity > 0) {
      const intensityLabel = getIntensityLabel(intensity);
      lines.push(`Preferes fragancias de intensidade ${intensityLabel.toLowerCase()}.`);
    }

    // Vibe summary
    if (vibe) {
      const vibeLabels = {
        sophisticated: 'sofisticado e elegante',
        adventurous: 'aventureiro e ousado',
        romantic: 'romantico e sensual',
        relaxed: 'descontraido e natural',
        mysterious: 'misterioso e escuro',
        playful: 'divertido e alegre',
      };
      const vibeLabel = vibeLabels[vibe] || vibe;
      lines.push(`O teu estilo olfativo e ${vibeLabel}.`);
    }

    // Loved notes
    if (notesLoved.length > 0) {
      const notesList = notesLoved.slice(0, 3).join(', ');
      lines.push(`As tuas notas favoritas incluem ${notesList}.`);
    }

    // Brand loyalty
    if (brands.length > 0 && brands[0].count >= 2) {
      lines.push(`Demonstras lealdade especial a ${brands[0].name} na tua colecao.`);
    }

    // Collection size insight
    if (collectionSize > 20) {
      lines.push('Tens uma colecao impressionante de fragancias!');
    } else if (collectionSize > 5) {
      lines.push('A tua colecao esta a crescer bem.');
    } else if (collectionSize > 0) {
      lines.push('Estas no inicio de uma bela jornada olfativa.');
    }

    if (lines.length === 0) {
      lines.push('Completa o Quiz Olfativo e adiciona perfumes a tua colecao para desbloquear o teu perfil completo.');
    }

    return lines;
  };

  const getIntensityLabel = (value) => {
    if (value >= 0.9) return 'Intenso';
    if (value >= 0.75) return 'Forte';
    if (value >= 0.5) return 'Moderado';
    if (value >= 0.25) return 'Leve';
    return 'Muito Leve';
  };

  // -- Render helpers --

  const renderBar = (value, max, color) => {
    const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    return (
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: color || colors.primary }]} />
      </View>
    );
  };

  const renderPercentBar = (pct, color) => {
    return (
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${Math.min(pct, 100)}%`, backgroundColor: color || colors.primary }]} />
      </View>
    );
  };

  // -- Section renderers --

  const renderScentFamilyRadar = () => {
    const { familyScores } = data;
    const maxScore = Math.max(...Object.values(familyScores), 1);

    // If no quiz data, show prompt
    if (Object.keys(familyScores).length === 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Familias Olfativas</Text>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🌿</Text>
            <Text style={styles.emptyText}>Completa o Quiz Olfativo para ver as tuas preferencias de familias olfativas.</Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => navigation.navigate('ScentQuiz')}
            >
              <Text style={styles.ctaButtonText}>Fazer Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Familias Olfativas</Text>
        <Text style={styles.sectionSubtitle}>As tuas preferencias de aroma</Text>
        {SCENT_FAMILIES.map(family => {
          const score = familyScores[family.key] || 0;
          const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
          return (
            <View key={family.key} style={styles.familyRow}>
              <View style={styles.familyLabelContainer}>
                <View style={[styles.familyDot, { backgroundColor: family.color }]} />
                <Text style={styles.familyLabel}>{family.label}</Text>
              </View>
              <View style={styles.familyBarContainer}>
                <View style={styles.barBg}>
                  <View
                    style={[
                      styles.barFill,
                      styles.barFillRounded,
                      { width: `${pct}%`, backgroundColor: family.color },
                    ]}
                  />
                </View>
              </View>
              <Text style={styles.familyScore}>
                {score > 0 ? `${Math.round(score * 100)}%` : '--'}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderBrandLoyalty = () => {
    const { topBrands } = data;

    if (topBrands.length === 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lealdade a Marcas</Text>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🏷️</Text>
            <Text style={styles.emptyText}>Adiciona perfumes a tua colecao para ver as tuas marcas favoritas.</Text>
          </View>
        </View>
      );
    }

    const maxCount = topBrands[0].count;
    const barColors = [
      colors.primary,
      colors.primaryLight,
      colors.accords.amber,
      colors.accords.woody,
      colors.accords.vanilla,
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lealdade a Marcas</Text>
        <Text style={styles.sectionSubtitle}>Top 5 marcas na tua colecao</Text>
        {topBrands.map((brand, index) => (
          <View key={brand.name} style={styles.barRow}>
            <Text style={styles.barLabel} numberOfLines={1}>{brand.name}</Text>
            {renderBar(brand.count, maxCount, barColors[index] || colors.primary)}
            <Text style={styles.barValue}>{brand.count}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderIntensityPreference = () => {
    const { intensity } = data;
    const pct = intensity * 100;
    const label = getIntensityLabel(intensity);

    // Gradient effect with multiple stops
    const segments = [
      { label: 'Leve', flex: 25, color: colors.accords.fresh },
      { label: '', flex: 25, color: colors.accords.aquatic },
      { label: '', flex: 25, color: colors.accords['warm spicy'] || '#cc5500' },
      { label: 'Intenso', flex: 25, color: colors.accords.oud },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencia de Intensidade</Text>
        <Text style={styles.sectionSubtitle}>Onde te posicionas no espectro</Text>

        <View style={styles.intensityContainer}>
          {/* Labels */}
          <View style={styles.intensityLabels}>
            <Text style={styles.intensityLabelLeft}>Leve</Text>
            <Text style={styles.intensityLabelCenter}>{label}</Text>
            <Text style={styles.intensityLabelRight}>Intenso</Text>
          </View>

          {/* Spectrum bar */}
          <View style={styles.spectrumBar}>
            {segments.map((seg, i) => (
              <View
                key={i}
                style={[
                  styles.spectrumSegment,
                  {
                    flex: seg.flex,
                    backgroundColor: seg.color,
                    borderTopLeftRadius: i === 0 ? 6 : 0,
                    borderBottomLeftRadius: i === 0 ? 6 : 0,
                    borderTopRightRadius: i === segments.length - 1 ? 6 : 0,
                    borderBottomRightRadius: i === segments.length - 1 ? 6 : 0,
                  },
                ]}
              />
            ))}
          </View>

          {/* Indicator */}
          <View style={[styles.intensityIndicator, { left: `${Math.min(Math.max(pct, 3), 97)}%` }]}>
            <View style={styles.indicatorTriangle} />
            <View style={styles.indicatorDot} />
          </View>
        </View>

        <View style={styles.intensityValueCard}>
          <Text style={styles.intensityValueText}>{Math.round(pct)}%</Text>
          <Text style={styles.intensityValueLabel}>{label}</Text>
        </View>
      </View>
    );
  };

  const renderGenderDistribution = () => {
    const { genderDist, genderPref } = data;

    const genders = [
      { key: 'masculine', label: 'Masculino', color: colors.masculine, pct: genderDist.masculine },
      { key: 'feminine', label: 'Feminino', color: colors.feminine, pct: genderDist.feminine },
      { key: 'unisex', label: 'Unisex', color: colors.unisex, pct: genderDist.unisex },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distribuicao de Genero</Text>
        <Text style={styles.sectionSubtitle}>Perfil estimado baseado nas tuas preferencias</Text>

        {/* Stacked bar */}
        <View style={styles.stackedBarContainer}>
          <View style={styles.stackedBar}>
            {genders.map(g => (
              <View
                key={g.key}
                style={[
                  styles.stackedSegment,
                  { flex: g.pct, backgroundColor: g.color },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Legend */}
        <View style={styles.genderLegend}>
          {genders.map(g => (
            <View key={g.key} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: g.color }]} />
              <Text style={styles.legendLabel}>{g.label}</Text>
              <Text style={styles.legendValue}>{g.pct}%</Text>
            </View>
          ))}
        </View>

        {genderPref && (
          <View style={styles.preferenceTag}>
            <Text style={styles.preferenceTagText}>
              Preferencia: {genderPref === 'masculine' ? 'Masculino' : genderPref === 'feminine' ? 'Feminino' : 'Unisex'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderSeasonalPreference = () => {
    const { seasonalPref, seasons } = data;
    const maxPct = Math.max(...Object.values(seasonalPref), 1);

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencia Sazonal</Text>
        <Text style={styles.sectionSubtitle}>As melhores estacoes para os teus perfumes</Text>

        <View style={styles.seasonsGrid}>
          {SEASONS.map(season => {
            const pct = seasonalPref[season.key] || 0;
            const isTop = seasons.includes(season.key);
            return (
              <View
                key={season.key}
                style={[
                  styles.seasonCard,
                  isTop && styles.seasonCardActive,
                ]}
              >
                <Text style={styles.seasonIcon}>{season.icon}</Text>
                <Text style={[styles.seasonLabel, isTop && styles.seasonLabelActive]}>
                  {season.label}
                </Text>
                <View style={styles.seasonBarBg}>
                  <View
                    style={[
                      styles.seasonBarFill,
                      { height: `${(pct / Math.max(maxPct, 1)) * 100}%`, backgroundColor: season.color },
                    ]}
                  />
                </View>
                <Text style={[styles.seasonPct, isTop && styles.seasonPctActive]}>
                  {pct}%
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderTasteSummary = () => {
    const { summary, notesLoved, notesDisliked, vibe } = data;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo do Teu Perfil</Text>

        {/* Summary text blocks */}
        {summary.map((line, i) => (
          <View key={i} style={styles.summaryLine}>
            <View style={styles.summaryDot} />
            <Text style={styles.summaryText}>{line}</Text>
          </View>
        ))}

        {/* Loved notes chips */}
        {notesLoved.length > 0 && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Notas Favoritas</Text>
            <View style={styles.chipRow}>
              {notesLoved.map(note => (
                <View key={note} style={styles.chipLoved}>
                  <Text style={styles.chipText}>{note}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Disliked notes chips */}
        {notesDisliked.length > 0 && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Notas que Evitas</Text>
            <View style={styles.chipRow}>
              {notesDisliked.map(note => (
                <View key={note} style={styles.chipDisliked}>
                  <Text style={styles.chipTextDisliked}>{note}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Vibe badge */}
        {vibe && (
          <View style={styles.vibeContainer}>
            <Text style={styles.vibeLabel}>A tua vibe</Text>
            <View style={styles.vibeBadge}>
              <Text style={styles.vibeBadgeText}>
                {vibe === 'sophisticated' ? 'Sofisticado' :
                 vibe === 'adventurous' ? 'Aventureiro' :
                 vibe === 'romantic' ? 'Romantico' :
                 vibe === 'relaxed' ? 'Descontraido' :
                 vibe === 'mysterious' ? 'Misterioso' :
                 vibe === 'playful' ? 'Divertido' : vibe}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderOverviewCards = () => {
    const { collectionSize, ownCount, triedCount, topBrands } = data;
    return (
      <View style={styles.overviewRow}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNum}>{ownCount}</Text>
          <Text style={styles.overviewLabel}>Possuo</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNum}>{triedCount}</Text>
          <Text style={styles.overviewLabel}>Provei</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewNum}>{topBrands.length}</Text>
          <Text style={styles.overviewLabel}>Marcas</Text>
        </View>
      </View>
    );
  };

  // -- Loading state --
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>A analisar o teu perfil olfativo...</Text>
      </View>
    );
  }

  // -- Error state --
  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error || 'Erro ao carregar dados'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadTasteProfile}>
          <Text style={styles.retryText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header banner */}
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitle}>Perfil Olfativo</Text>
        <Text style={styles.headerSubtitle}>A tua identidade em fragancias</Text>
        {!data.hasQuizProfile && (
          <TouchableOpacity
            style={styles.quizBanner}
            onPress={() => navigation.navigate('ScentQuiz')}
          >
            <Text style={styles.quizBannerIcon}>🧪</Text>
            <View style={styles.quizBannerContent}>
              <Text style={styles.quizBannerTitle}>Completa o Quiz Olfativo</Text>
              <Text style={styles.quizBannerSub}>Descobre as tuas preferencias de aroma</Text>
            </View>
            <Text style={styles.quizBannerArrow}>›</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Overview */}
      {renderOverviewCards()}

      {/* Scent Family Radar */}
      {renderScentFamilyRadar()}

      {/* Brand Loyalty */}
      {renderBrandLoyalty()}

      {/* Intensity Preference */}
      {renderIntensityPreference()}

      {/* Gender Distribution */}
      {renderGenderDistribution()}

      {/* Seasonal Preference */}
      {renderSeasonalPreference()}

      {/* Taste Summary */}
      {renderTasteSummary()}

      {/* Actions */}
      <View style={styles.actionsSection}>
        {data.hasQuizProfile ? (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ScentQuiz')}
          >
            <Text style={styles.actionButtonText}>Refazer Quiz Olfativo</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionButtonPrimary}
            onPress={() => navigation.navigate('ScentQuiz')}
          >
            <Text style={styles.actionButtonPrimaryText}>Fazer Quiz Olfativo</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Recommendations')}
        >
          <Text style={styles.actionButtonText}>Ver Recomendacoes</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginTop: spacing.md,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.round,
  },
  retryText: {
    color: colors.textPrimary,
    fontWeight: typography.semibold,
    fontSize: typography.body,
  },

  // Header banner
  headerBanner: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    paddingTop: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  quizBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
  },
  quizBannerIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  quizBannerContent: {
    flex: 1,
  },
  quizBannerTitle: {
    fontSize: typography.h6,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  quizBannerSub: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  quizBannerArrow: {
    fontSize: 24,
    color: colors.textTertiary,
  },

  // Overview cards
  overviewRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  overviewNum: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  overviewLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Sections
  section: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.lg,
  },

  // Empty state
  emptyCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.round,
    marginTop: spacing.lg,
  },
  ctaButtonText: {
    color: colors.textPrimary,
    fontWeight: typography.semibold,
    fontSize: typography.body,
  },

  // Scent family bars
  familyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  familyLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 110,
  },
  familyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.sm,
  },
  familyLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  familyBarContainer: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  familyScore: {
    width: 40,
    fontSize: typography.caption,
    color: colors.textTertiary,
    textAlign: 'right',
  },

  // Generic bars (reused from CollectionAnalytics)
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  barLabel: {
    width: 90,
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  barBg: {
    flex: 1,
    height: 10,
    backgroundColor: colors.surfaceLight,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  barFillRounded: {
    borderRadius: 5,
  },
  barValue: {
    width: 30,
    fontSize: typography.caption,
    color: colors.textTertiary,
    textAlign: 'right',
  },

  // Intensity
  intensityContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
    paddingTop: spacing.xl,
  },
  intensityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  intensityLabelLeft: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  intensityLabelCenter: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  intensityLabelRight: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  spectrumBar: {
    flexDirection: 'row',
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
  },
  spectrumSegment: {
    height: '100%',
  },
  intensityIndicator: {
    position: 'absolute',
    bottom: -8,
    alignItems: 'center',
    marginLeft: -8,
  },
  indicatorTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.textPrimary,
    transform: [{ rotate: '180deg' }],
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textPrimary,
    marginTop: -2,
  },
  intensityValueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  intensityValueText: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  intensityValueLabel: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },

  // Gender distribution
  stackedBarContainer: {
    marginBottom: spacing.lg,
  },
  stackedBar: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  stackedSegment: {
    height: '100%',
  },
  genderLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  legendValue: {
    fontSize: typography.caption,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  preferenceTag: {
    alignSelf: 'center',
    backgroundColor: colors.surfaceLight,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    marginTop: spacing.sm,
  },
  preferenceTagText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },

  // Seasonal preference
  seasonsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  seasonCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  seasonCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceLight,
  },
  seasonIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  seasonLabel: {
    fontSize: typography.small,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  seasonLabelActive: {
    color: colors.textPrimary,
    fontWeight: typography.semibold,
  },
  seasonBarBg: {
    width: 20,
    height: 50,
    backgroundColor: colors.backgroundLight,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
  },
  seasonBarFill: {
    width: '100%',
    borderRadius: 4,
  },
  seasonPct: {
    fontSize: typography.small,
    color: colors.textTertiary,
    fontWeight: typography.medium,
  },
  seasonPctActive: {
    color: colors.primary,
    fontWeight: typography.bold,
  },

  // Taste summary
  summaryLine: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    paddingRight: spacing.md,
  },
  summaryDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: spacing.md,
  },
  summaryText: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  // Notes chips
  notesSection: {
    marginTop: spacing.lg,
  },
  notesTitle: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chipLoved: {
    backgroundColor: colors.primaryDark,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: typography.caption,
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  chipDisliked: {
    backgroundColor: colors.surfaceLight,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.error,
  },
  chipTextDisliked: {
    fontSize: typography.caption,
    color: colors.error,
    textTransform: 'capitalize',
  },

  // Vibe
  vibeContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  vibeLabel: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  vibeBadge: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.round,
    ...shadows.md,
  },
  vibeBadgeText: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },

  // Actions
  actionsSection: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  actionButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    color: colors.textPrimary,
    fontSize: typography.h6,
    fontWeight: typography.semibold,
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  actionButtonPrimaryText: {
    color: colors.textPrimary,
    fontSize: typography.h6,
    fontWeight: typography.bold,
  },
});
