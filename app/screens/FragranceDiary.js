import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius } from '../theme';

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export default function FragranceDiaryScreen({ navigation }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    loadData();
  }, [year, month]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [calData, statsData] = await Promise.all([
        apiCall(`/api/diary/calendar?year=${year}&month=${month}`),
        apiCall('/api/diary/stats'),
      ]);
      setEntries(calData.entries || []);
      setStats(statsData);
    } catch (error) {
      console.error('Diary load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeMonth = (delta) => {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth > 12) { newMonth = 1; newYear++; }
    if (newMonth < 1) { newMonth = 12; newYear--; }
    setMonth(newMonth);
    setYear(newYear);
    setSelectedDay(null);
  };

  // Build calendar grid
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date().toISOString().split('T')[0];

  const entryMap = {};
  for (const e of entries) {
    const day = parseInt(e.date.split('-')[2]);
    entryMap[day] = e;
  }

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const selectedEntry = selectedDay ? entryMap[selectedDay] : null;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Stats header */}
      {stats && (
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{stats.total_days}</Text>
            <Text style={styles.statLabel}>Dias</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{stats.streak}</Text>
            <Text style={styles.statLabel}>Sequencia</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{stats.most_worn?.length || 0}</Text>
            <Text style={styles.statLabel}>Perfumes</Text>
          </View>
        </View>
      )}

      {/* Month nav */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.navArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>{MONTHS[month - 1]} {year}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.navArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Day headers */}
      <View style={styles.weekRow}>
        {DAYS.map((d) => (
          <Text key={d} style={styles.weekDay}>{d}</Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((day, i) => {
          if (day === null) {
            return <View key={`empty-${i}`} style={styles.dayCell} />;
          }
          const entry = entryMap[day];
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isToday = dateStr === today;
          const isSelected = selectedDay === day;

          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayCell,
                entry && styles.dayCellFilled,
                isToday && styles.dayCellToday,
                isSelected && styles.dayCellSelected,
              ]}
              onPress={() => setSelectedDay(isSelected ? null : day)}
            >
              <Text style={[
                styles.dayNum,
                entry && styles.dayNumFilled,
                isToday && styles.dayNumToday,
              ]}>
                {day}
              </Text>
              {entry && <View style={styles.dayDot} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Selected day detail */}
      {selectedEntry && (
        <TouchableOpacity
          style={styles.entryDetail}
          onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: selectedEntry.perfume_id })}
        >
          {selectedEntry.perfume_image ? (
            <Image source={{ uri: selectedEntry.perfume_image }} style={styles.entryImage} />
          ) : (
            <View style={[styles.entryImage, styles.entryImagePlaceholder]}>
              <Text style={{ fontSize: 28 }}>🌸</Text>
            </View>
          )}
          <View style={styles.entryInfo}>
            <Text style={styles.entryBrand}>{selectedEntry.perfume_brand}</Text>
            <Text style={styles.entryName}>{selectedEntry.perfume_name}</Text>
            {selectedEntry.note && (
              <Text style={styles.entryNote}>"{selectedEntry.note}"</Text>
            )}
            <View style={styles.entryTags}>
              {selectedEntry.occasion && (
                <View style={styles.entryTag}>
                  <Text style={styles.entryTagText}>{selectedEntry.occasion}</Text>
                </View>
              )}
              {selectedEntry.mood && (
                <View style={styles.entryTag}>
                  <Text style={styles.entryTagText}>{selectedEntry.mood}</Text>
                </View>
              )}
              {selectedEntry.weather && (
                <View style={styles.entryTag}>
                  <Text style={styles.entryTagText}>{selectedEntry.weather}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}

      {selectedDay && !selectedEntry && (
        <TouchableOpacity
          style={styles.addEntry}
          onPress={() => navigation.navigate('SOTDPicker')}
        >
          <Text style={styles.addEntryText}>+ Adicionar perfume do dia</Text>
        </TouchableOpacity>
      )}

      {/* Most worn */}
      {stats?.most_worn?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mais Usados</Text>
          {stats.most_worn.slice(0, 5).map((p, i) => (
            <TouchableOpacity
              key={p.id}
              style={styles.mostWornItem}
              onPress={() => navigation.navigate('PerfumeDetail', { perfumeId: p.id })}
            >
              <Text style={styles.rankNum}>#{i + 1}</Text>
              {p.image_url ? (
                <Image source={{ uri: p.image_url }} style={styles.mwImage} />
              ) : (
                <View style={[styles.mwImage, styles.mwImagePlaceholder]}>
                  <Text>🌸</Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.mwName}>{p.name}</Text>
                <Text style={styles.mwBrand}>{p.brand}</Text>
              </View>
              <Text style={styles.mwCount}>{p.wear_count}x</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Occasion/Mood/Weather stats */}
      {stats && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Padroes</Text>
          {[
            { data: stats.occasions, label: 'Ocasioes' },
            { data: stats.moods, label: 'Humores' },
            { data: stats.weather, label: 'Climas' },
          ].map(({ data, label }) => {
            if (!data || data.length === 0) return null;
            const max = data[0]?.count || 1;
            return (
              <View key={label} style={styles.patternGroup}>
                <Text style={styles.patternLabel}>{label}</Text>
                {data.map((item) => (
                  <View key={item.occasion || item.mood || item.weather} style={styles.patternRow}>
                    <Text style={styles.patternName}>
                      {item.occasion || item.mood || item.weather}
                    </Text>
                    <View style={styles.patternBar}>
                      <View style={[styles.patternFill, { width: `${(item.count / max) * 100}%` }]} />
                    </View>
                    <Text style={styles.patternCount}>{item.count}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      )}

      <View style={{ height: spacing.xl }} />
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
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNum: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  navArrow: {
    fontSize: typography.h4,
    color: colors.primary,
    fontWeight: typography.bold,
    paddingHorizontal: spacing.md,
  },
  monthTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  weekRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.small,
    color: colors.textTertiary,
    fontWeight: typography.semibold,
    paddingBottom: spacing.xs,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.sm,
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  dayCellFilled: {
    backgroundColor: colors.primaryDark + '40',
  },
  dayCellToday: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  dayCellSelected: {
    backgroundColor: colors.primary + '60',
  },
  dayNum: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  dayNumFilled: {
    color: colors.textPrimary,
    fontWeight: typography.semibold,
  },
  dayNumToday: {
    color: colors.primary,
    fontWeight: typography.bold,
  },
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 2,
  },
  entryDetail: {
    flexDirection: 'row',
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  entryImage: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
    resizeMode: 'contain',
  },
  entryImagePlaceholder: {
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryInfo: {
    flex: 1,
  },
  entryBrand: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: typography.bold,
    textTransform: 'uppercase',
  },
  entryName: {
    fontSize: typography.h6,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginTop: 2,
  },
  entryNote: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  entryTags: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
    flexWrap: 'wrap',
  },
  entryTag: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.round,
  },
  entryTagText: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  addEntry: {
    margin: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  addEntryText: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: typography.semibold,
  },
  section: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sectionTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  mostWornItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rankNum: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.primary,
    width: 28,
  },
  mwImage: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    resizeMode: 'contain',
  },
  mwImagePlaceholder: {
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mwName: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  mwBrand: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  mwCount: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textSecondary,
  },
  patternGroup: {
    marginBottom: spacing.md,
  },
  patternLabel: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  patternRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 4,
  },
  patternName: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    width: 80,
  },
  patternBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  patternFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  patternCount: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    width: 24,
    textAlign: 'right',
  },
});
