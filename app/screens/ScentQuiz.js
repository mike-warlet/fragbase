import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import { apiCall } from '../config';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const { width } = Dimensions.get('window');

export default function ScentQuizScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall('/api/discovery/quiz');
      setQuestions(data.questions || []);
      setCompleted(data.completed || false);
    } catch (err) {
      console.error('Error loading quiz:', err);
      setError('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const animateTransition = (direction, callback) => {
    const exitValue = direction === 'next' ? -width : width;
    const enterValue = direction === 'next' ? width : -width;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: exitValue,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      slideAnim.setValue(enterValue);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleSelect = (questionId, option) => {
    const question = questions[currentIndex];
    if (!question) return;

    if (question.type === 'multi') {
      const current = answers[questionId] || [];
      const isSelected = current.includes(option);

      if (isSelected) {
        setAnswers(prev => ({
          ...prev,
          [questionId]: current.filter(o => o !== option),
        }));
      } else {
        const max = question.max || current.length + 1;
        if (current.length < max) {
          setAnswers(prev => ({
            ...prev,
            [questionId]: [...current, option],
          }));
        }
      }
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: option,
      }));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      animateTransition('next', () => {
        setCurrentIndex(prev => prev + 1);
      });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      animateTransition('back', () => {
        setCurrentIndex(prev => prev - 1);
      });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formattedAnswers = questions.map(q => ({
        question_id: q.id,
        answer: answers[q.id] || (q.type === 'multi' ? [] : null),
      }));

      await apiCall('/api/discovery/quiz', {
        method: 'POST',
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      navigation.navigate('Recommendations');
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  };

  const isOptionSelected = (questionId, option) => {
    const answer = answers[questionId];
    if (Array.isArray(answer)) {
      return answer.includes(option);
    }
    return answer === option;
  };

  const isCurrentAnswered = () => {
    if (questions.length === 0) return false;
    const question = questions[currentIndex];
    const answer = answers[question.id];
    if (question.type === 'multi') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined && answer !== null;
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Error state
  if (error && questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadQuiz}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Already completed state
  if (completed && questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.completedEmoji}>{'\u2705'}</Text>
        <Text style={styles.completedTitle}>Quiz Completo!</Text>
        <Text style={styles.completedText}>
          Ja respondeste ao quiz de perfil olfativo. Podes ver as tuas recomendacoes ou refazer o quiz.
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Recommendations')}
        >
          <Text style={styles.primaryButtonText}>Ver Recomendacoes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            setCompleted(false);
            setAnswers({});
            setCurrentIndex(0);
            loadQuiz();
          }}
        >
          <Text style={styles.secondaryButtonText}>Refazer Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Nenhuma pergunta disponivel</Text>
      </View>
    );
  }

  const question = questions[currentIndex];
  const progress = (currentIndex + 1) / questions.length;
  const isLast = currentIndex === questions.length - 1;

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {questions.length}
        </Text>
      </View>

      {/* Question card */}
      <Animated.View
        style={[
          styles.questionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.text}</Text>
            {question.type === 'multi' && question.max && (
              <Text style={styles.questionHint}>
                Seleciona ate {question.max} opcoes
              </Text>
            )}
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {(question.options || []).map((option, index) => {
              const selected = isOptionSelected(question.id, option);
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.optionCard, selected && styles.optionCardSelected]}
                  onPress={() => handleSelect(question.id, option)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.optionIndicator, selected && styles.optionIndicatorSelected]}>
                    {selected && <View style={styles.optionDot} />}
                  </View>
                  <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Navigation buttons */}
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={handleBack}
          disabled={currentIndex === 0}
        >
          <Text style={[styles.navButtonText, currentIndex === 0 && styles.navButtonTextDisabled]}>
            Anterior
          </Text>
        </TouchableOpacity>

        {isLast ? (
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!isCurrentAnswered() || submitting) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isCurrentAnswered() || submitting}
          >
            {submitting ? (
              <ActivityIndicator size="small" color={colors.textPrimary} />
            ) : (
              <Text style={styles.submitButtonText}>Submeter</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.nextButton, !isCurrentAnswered() && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={!isCurrentAnswered()}
          >
            <Text style={[styles.nextButtonText, !isCurrentAnswered() && styles.nextButtonTextDisabled]}>
              Proximo
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
    paddingHorizontal: spacing.xl,
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.semibold,
    minWidth: 40,
    textAlign: 'right',
  },

  // Question
  questionContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  questionText: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  questionHint: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginTop: spacing.sm,
  },

  // Options
  optionsContainer: {
    gap: spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.sm,
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundLight,
  },
  optionIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  optionIndicatorSelected: {
    borderColor: colors.primary,
  },
  optionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  optionText: {
    flex: 1,
    fontSize: typography.body + 1,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  optionTextSelected: {
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },

  // Navigation
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  navButton: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: typography.body + 1,
    fontWeight: typography.semibold,
    color: colors.textSecondary,
  },
  navButtonTextDisabled: {
    color: colors.textTertiary,
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  nextButtonDisabled: {
    opacity: 0.4,
  },
  nextButtonText: {
    fontSize: typography.body + 1,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  nextButtonTextDisabled: {
    color: colors.textPrimary,
  },
  submitButton: {
    backgroundColor: colors.success,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  submitButtonDisabled: {
    opacity: 0.4,
  },
  submitButtonText: {
    fontSize: typography.body + 1,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },

  // Error state
  errorEmoji: {
    fontSize: 48,
    color: colors.error,
    fontWeight: typography.bold,
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: typography.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
  },
  retryButtonText: {
    fontSize: typography.body + 1,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },

  // Completed state
  completedEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  completedTitle: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  completedText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    width: '100%',
    alignItems: 'center',
    ...shadows.md,
  },
  primaryButtonText: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.primary,
  },

  // Empty
  emptyText: {
    fontSize: typography.body,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});
