// Discovery Engine API routes for FragBase (Scent Quiz + Recommendations)
import { requireAuth, authenticate } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Quiz questions definition
const QUIZ_QUESTIONS = [
  {
    id: 'scent_family',
    question: 'Which scent family appeals to you the most?',
    type: 'single',
    options: [
      { value: 'fresh', label: 'Fresh & Clean (citrus, aquatic, green)' },
      { value: 'floral', label: 'Floral (rose, jasmine, lily)' },
      { value: 'oriental', label: 'Oriental & Warm (vanilla, amber, spices)' },
      { value: 'woody', label: 'Woody (cedar, sandalwood, vetiver)' },
      { value: 'gourmand', label: 'Gourmand (chocolate, coffee, caramel)' },
      { value: 'aromatic', label: 'Aromatic (herbs, lavender, sage)' },
    ]
  },
  {
    id: 'scent_family_2',
    question: 'Pick your second favorite scent family:',
    type: 'single',
    options: [
      { value: 'fresh', label: 'Fresh & Clean' },
      { value: 'floral', label: 'Floral' },
      { value: 'oriental', label: 'Oriental & Warm' },
      { value: 'woody', label: 'Woody' },
      { value: 'gourmand', label: 'Gourmand' },
      { value: 'aromatic', label: 'Aromatic' },
    ]
  },
  {
    id: 'intensity',
    question: 'How strong do you like your fragrances?',
    type: 'single',
    options: [
      { value: 'light', label: 'Light & Subtle — barely there' },
      { value: 'moderate', label: 'Moderate — noticeable but not loud' },
      { value: 'strong', label: 'Strong — project and make a statement' },
      { value: 'beast', label: 'Beast mode — fill the room' },
    ]
  },
  {
    id: 'occasion',
    question: 'When do you wear fragrance most often?',
    type: 'single',
    options: [
      { value: 'daily', label: 'Daily wear (office, casual)' },
      { value: 'evening', label: 'Evening & nights out' },
      { value: 'special', label: 'Special occasions only' },
      { value: 'all', label: 'All the time — different scent for each' },
    ]
  },
  {
    id: 'season',
    question: 'Which season is your favorite for fragrance?',
    type: 'single',
    options: [
      { value: 'spring', label: 'Spring — light florals and greens' },
      { value: 'summer', label: 'Summer — fresh and aquatic' },
      { value: 'fall', label: 'Fall — warm spices and leaves' },
      { value: 'winter', label: 'Winter — heavy and cozy' },
      { value: 'no_preference', label: 'No preference' },
    ]
  },
  {
    id: 'gender_pref',
    question: "Do you have a gender preference in fragrances?",
    type: 'single',
    options: [
      { value: 'masculine', label: 'I prefer traditionally masculine scents' },
      { value: 'feminine', label: 'I prefer traditionally feminine scents' },
      { value: 'unisex', label: 'I love unisex/gender-neutral scents' },
      { value: 'no_preference', label: 'No preference — scent matters, not labels' },
    ]
  },
  {
    id: 'notes_love',
    question: 'Which notes do you LOVE? (pick up to 3)',
    type: 'multi',
    max: 3,
    options: [
      { value: 'vanilla', label: 'Vanilla' },
      { value: 'oud', label: 'Oud' },
      { value: 'rose', label: 'Rose' },
      { value: 'bergamot', label: 'Bergamot' },
      { value: 'sandalwood', label: 'Sandalwood' },
      { value: 'musk', label: 'Musk' },
      { value: 'amber', label: 'Amber' },
      { value: 'lavender', label: 'Lavender' },
      { value: 'patchouli', label: 'Patchouli' },
      { value: 'jasmine', label: 'Jasmine' },
      { value: 'tobacco', label: 'Tobacco' },
      { value: 'leather', label: 'Leather' },
    ]
  },
  {
    id: 'notes_dislike',
    question: 'Which notes do you DISLIKE? (pick up to 3)',
    type: 'multi',
    max: 3,
    options: [
      { value: 'vanilla', label: 'Vanilla' },
      { value: 'oud', label: 'Oud' },
      { value: 'rose', label: 'Rose' },
      { value: 'bergamot', label: 'Bergamot' },
      { value: 'sandalwood', label: 'Sandalwood' },
      { value: 'musk', label: 'Musk' },
      { value: 'amber', label: 'Amber' },
      { value: 'lavender', label: 'Lavender' },
      { value: 'patchouli', label: 'Patchouli' },
      { value: 'jasmine', label: 'Jasmine' },
      { value: 'tobacco', label: 'Tobacco' },
      { value: 'leather', label: 'Leather' },
      { value: 'none', label: 'I like everything!' },
    ]
  },
  {
    id: 'budget',
    question: 'What is your typical fragrance budget?',
    type: 'single',
    options: [
      { value: 'budget', label: 'Budget-friendly (under $50)' },
      { value: 'mid', label: 'Mid-range ($50-$150)' },
      { value: 'high', label: 'High-end ($150-$300)' },
      { value: 'niche', label: 'Niche/luxury ($300+)' },
      { value: 'no_limit', label: 'No limit — if it smells good, I buy it' },
    ]
  },
  {
    id: 'experience',
    question: 'How would you describe your fragrance experience?',
    type: 'single',
    options: [
      { value: 'beginner', label: 'Beginner — just starting to explore' },
      { value: 'intermediate', label: 'Intermediate — I own a few favorites' },
      { value: 'advanced', label: 'Advanced — I have a solid collection' },
      { value: 'connoisseur', label: 'Connoisseur — I live and breathe perfume' },
    ]
  },
  {
    id: 'longevity_pref',
    question: 'How important is longevity to you?',
    type: 'single',
    options: [
      { value: 'short', label: 'I like fragrances that fade quickly (2-4 hours)' },
      { value: 'medium', label: 'Medium longevity is fine (4-8 hours)' },
      { value: 'long', label: 'I want it to last all day (8+ hours)' },
      { value: 'doesnt_matter', label: "Doesn't matter — I'll reapply" },
    ]
  },
  {
    id: 'vibe',
    question: 'Which vibe resonates with you most?',
    type: 'single',
    options: [
      { value: 'sophisticated', label: 'Sophisticated & elegant' },
      { value: 'adventurous', label: 'Adventurous & bold' },
      { value: 'romantic', label: 'Romantic & sensual' },
      { value: 'relaxed', label: 'Relaxed & natural' },
      { value: 'mysterious', label: 'Mysterious & dark' },
      { value: 'playful', label: 'Playful & fun' },
    ]
  },
];

// Scent family to accord/note mappings for scoring
const FAMILY_ACCORDS = {
  fresh: ['citrus', 'aquatic', 'green', 'ozonic', 'fresh', 'marine', 'aromatic'],
  floral: ['floral', 'white floral', 'rose', 'jasmine', 'powdery', 'musky'],
  oriental: ['oriental', 'amber', 'spicy', 'warm spicy', 'balsamic', 'sweet'],
  woody: ['woody', 'earthy', 'mossy', 'cedar', 'sandalwood', 'vetiver', 'smoky'],
  gourmand: ['gourmand', 'sweet', 'vanilla', 'chocolate', 'coffee', 'caramel', 'honey'],
  aromatic: ['aromatic', 'herbal', 'lavender', 'fougere', 'fresh spicy', 'sage'],
};

const VIBE_ACCORDS = {
  sophisticated: ['woody', 'amber', 'leather', 'powdery', 'iris'],
  adventurous: ['aromatic', 'citrus', 'spicy', 'fresh', 'ozonic'],
  romantic: ['floral', 'rose', 'musky', 'sweet', 'powdery'],
  relaxed: ['green', 'aquatic', 'fresh', 'citrus', 'aromatic'],
  mysterious: ['oriental', 'smoky', 'oud', 'incense', 'leather', 'dark'],
  playful: ['fruity', 'sweet', 'citrus', 'fresh', 'floral'],
};

// ── Get Quiz Questions ────────────────────────────────────────
export async function handleGetQuiz(request, env) {
  // Check if user already completed quiz
  const user = await authenticate(request, env);
  let completed = false;

  if (user) {
    const existing = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM quiz_responses WHERE user_id = ?'
    ).bind(user.id).first();
    completed = existing.count > 0;
  }

  return json({ questions: QUIZ_QUESTIONS, completed });
}

// ── Submit Quiz Answers ──────────────────────────────────────
export async function handleSubmitQuiz(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { answers } = await request.json();

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return json({ error: 'answers array is required' }, 400);
    }

    // Clear previous responses
    await env.DB.prepare(
      'DELETE FROM quiz_responses WHERE user_id = ?'
    ).bind(auth.userId).run();

    // Save new responses
    for (const answer of answers) {
      if (!answer.question_id || !answer.answer) continue;
      const id = crypto.randomUUID();
      const answerStr = Array.isArray(answer.answer) ? answer.answer.join(',') : answer.answer;
      await env.DB.prepare(
        'INSERT INTO quiz_responses (id, user_id, question_id, answer) VALUES (?, ?, ?, ?)'
      ).bind(id, auth.userId, answer.question_id, answerStr).run();
    }

    // Compute scent profile from answers
    const profile = computeProfileFromAnswers(answers);

    // Clear old profile
    await env.DB.prepare(
      'DELETE FROM user_scent_profile WHERE user_id = ?'
    ).bind(auth.userId).run();

    // Save new profile
    for (const [key, value] of Object.entries(profile)) {
      const id = crypto.randomUUID();
      await env.DB.prepare(
        'INSERT INTO user_scent_profile (id, user_id, preference_key, preference_value, confidence) VALUES (?, ?, ?, ?, ?)'
      ).bind(id, auth.userId, key, value.score, value.confidence).run();
    }

    // Generate recommendations
    await generateRecommendations(env, auth.userId, profile);

    return json({ success: true, profile });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

function computeProfileFromAnswers(answers) {
  const profile = {};
  const answerMap = {};

  for (const a of answers) {
    answerMap[a.question_id] = a.answer;
  }

  // Scent family preferences
  const families = ['fresh', 'floral', 'oriental', 'woody', 'gourmand', 'aromatic'];
  for (const family of families) {
    let score = 0;
    if (answerMap.scent_family === family) score += 1.0;
    if (answerMap.scent_family_2 === family) score += 0.6;
    profile[`family_${family}`] = { score, confidence: 0.8 };
  }

  // Intensity preference
  const intensityMap = { light: 0.2, moderate: 0.5, strong: 0.8, beast: 1.0 };
  profile.intensity = { score: intensityMap[answerMap.intensity] || 0.5, confidence: 0.9 };

  // Occasion preference
  if (answerMap.occasion) {
    profile[`occasion_${answerMap.occasion}`] = { score: 1.0, confidence: 0.7 };
  }

  // Season preference
  if (answerMap.season && answerMap.season !== 'no_preference') {
    profile[`season_${answerMap.season}`] = { score: 1.0, confidence: 0.7 };
  }

  // Gender preference
  if (answerMap.gender_pref && answerMap.gender_pref !== 'no_preference') {
    profile[`gender_${answerMap.gender_pref}`] = { score: 1.0, confidence: 0.6 };
  }

  // Loved notes
  const lovedNotes = answerMap.notes_love;
  if (lovedNotes) {
    const notes = Array.isArray(lovedNotes) ? lovedNotes : lovedNotes.split(',');
    for (const note of notes) {
      profile[`note_love_${note.trim()}`] = { score: 1.0, confidence: 0.9 };
    }
  }

  // Disliked notes
  const dislikedNotes = answerMap.notes_dislike;
  if (dislikedNotes) {
    const notes = Array.isArray(dislikedNotes) ? dislikedNotes : dislikedNotes.split(',');
    for (const note of notes) {
      if (note.trim() !== 'none') {
        profile[`note_dislike_${note.trim()}`] = { score: -1.0, confidence: 0.9 };
      }
    }
  }

  // Budget preference
  const budgetMap = { budget: 0.2, mid: 0.5, high: 0.8, niche: 1.0, no_limit: 1.0 };
  profile.budget = { score: budgetMap[answerMap.budget] || 0.5, confidence: 0.6 };

  // Experience level
  const expMap = { beginner: 0.2, intermediate: 0.5, advanced: 0.8, connoisseur: 1.0 };
  profile.experience = { score: expMap[answerMap.experience] || 0.5, confidence: 0.8 };

  // Longevity preference
  const longMap = { short: 0.2, medium: 0.5, long: 0.9, doesnt_matter: 0.5 };
  profile.longevity_pref = { score: longMap[answerMap.longevity_pref] || 0.5, confidence: 0.7 };

  // Vibe
  if (answerMap.vibe) {
    profile[`vibe_${answerMap.vibe}`] = { score: 1.0, confidence: 0.7 };
  }

  return profile;
}

async function generateRecommendations(env, userId, profile) {
  // Get all perfumes (accords from column or aggregated from perfume_accords table)
  const { results: perfumes } = await env.DB.prepare(
    `SELECT p.id, p.name, p.brand,
            COALESCE(p.accords, (SELECT GROUP_CONCAT(pa.accord_name) FROM perfume_accords pa WHERE pa.perfume_id = p.id)) as accords,
            p.notes_top, p.notes_heart, p.notes_base, p.gender, p.concentration, p.year
     FROM perfumes p LIMIT 1000`
  ).all();

  // Get user's owned/tried perfumes to exclude
  const { results: owned } = await env.DB.prepare(
    "SELECT perfume_id FROM wishlists WHERE user_id = ? AND list_type IN ('own', 'tried')"
  ).bind(userId).all();
  const ownedIds = new Set(owned.map(o => o.perfume_id));

  // Score each perfume
  const scored = [];

  for (const perfume of perfumes) {
    if (ownedIds.has(perfume.id)) continue;

    let score = 0;
    let reasons = [];
    const accords = (perfume.accords || '').toLowerCase().split(',').map(a => a.trim());
    const allNotes = [
      ...(perfume.notes_top || '').toLowerCase().split(',').map(n => n.trim()),
      ...(perfume.notes_heart || '').toLowerCase().split(',').map(n => n.trim()),
      ...(perfume.notes_base || '').toLowerCase().split(',').map(n => n.trim()),
    ].filter(Boolean);

    // Score based on scent family match
    for (const [family, familyAccords] of Object.entries(FAMILY_ACCORDS)) {
      const profileKey = `family_${family}`;
      if (profile[profileKey] && profile[profileKey].score > 0) {
        const matchCount = accords.filter(a => familyAccords.includes(a)).length;
        if (matchCount > 0) {
          const familyScore = (matchCount / familyAccords.length) * profile[profileKey].score * 30;
          score += familyScore;
          if (familyScore > 5) reasons.push(`Matches your ${family} preference`);
        }
      }
    }

    // Score based on loved notes
    for (const [key, val] of Object.entries(profile)) {
      if (key.startsWith('note_love_') && val.score > 0) {
        const noteName = key.replace('note_love_', '').toLowerCase();
        if (allNotes.some(n => n.includes(noteName)) || accords.some(a => a.includes(noteName))) {
          score += 20;
          reasons.push(`Contains ${noteName} you love`);
        }
      }
      if (key.startsWith('note_dislike_') && val.score < 0) {
        const noteName = key.replace('note_dislike_', '').toLowerCase();
        if (allNotes.some(n => n.includes(noteName)) || accords.some(a => a.includes(noteName))) {
          score -= 25;
        }
      }
    }

    // Score based on vibe
    for (const [vibe, vibeAccords] of Object.entries(VIBE_ACCORDS)) {
      const profileKey = `vibe_${vibe}`;
      if (profile[profileKey] && profile[profileKey].score > 0) {
        const matchCount = accords.filter(a => vibeAccords.includes(a)).length;
        if (matchCount > 0) {
          score += matchCount * 8;
          if (matchCount >= 2) reasons.push(`Fits your ${vibe} vibe`);
        }
      }
    }

    // Gender preference match
    const gender = (perfume.gender || '').toLowerCase();
    for (const [key, val] of Object.entries(profile)) {
      if (key.startsWith('gender_') && val.score > 0) {
        const prefGender = key.replace('gender_', '');
        if (gender === prefGender || gender === 'unisex') {
          score += 10;
        } else {
          score -= 5;
        }
      }
    }

    // Intensity / concentration match
    if (profile.intensity) {
      const conc = (perfume.concentration || '').toLowerCase();
      const intensityScore = profile.intensity.score;
      if (intensityScore >= 0.8 && (conc === 'edp' || conc === 'parfum')) score += 8;
      else if (intensityScore <= 0.3 && (conc === 'edt' || conc === 'edc')) score += 8;
      else if (intensityScore >= 0.4 && intensityScore <= 0.6 && conc === 'edt') score += 5;
    }

    if (score > 0) {
      scored.push({
        perfume_id: perfume.id,
        score: Math.round(score * 10) / 10,
        reason: reasons.slice(0, 2).join('. ') || 'Matches your taste profile',
      });
    }
  }

  // Sort by score and keep top 50
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 50);

  // Clear old recommendations
  await env.DB.prepare('DELETE FROM recommendations WHERE user_id = ?').bind(userId).run();

  // Save top recommendations
  for (const rec of top) {
    const id = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO recommendations (id, user_id, perfume_id, score, reason) VALUES (?, ?, ?, ?, ?)'
    ).bind(id, userId, rec.perfume_id, rec.score, rec.reason).run();
  }
}

// ── Get Scent Profile ────────────────────────────────────────
export async function handleGetProfile(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const { results: profileRows } = await env.DB.prepare(
      'SELECT preference_key, preference_value, confidence FROM user_scent_profile WHERE user_id = ? ORDER BY preference_key'
    ).bind(auth.userId).all();

    if (profileRows.length === 0) {
      return json({ profile: null, message: 'Take the scent quiz to build your profile' });
    }

    // Group into categories
    const profile = {
      families: {},
      notes_loved: [],
      notes_disliked: [],
      intensity: null,
      budget: null,
      experience: null,
      longevity_pref: null,
      vibe: null,
      gender_pref: null,
      seasons: [],
      occasions: [],
    };

    for (const row of profileRows) {
      const key = row.preference_key;
      const value = row.preference_value;

      if (key.startsWith('family_')) {
        const family = key.replace('family_', '');
        if (value > 0) profile.families[family] = value;
      } else if (key.startsWith('note_love_')) {
        profile.notes_loved.push(key.replace('note_love_', ''));
      } else if (key.startsWith('note_dislike_')) {
        profile.notes_disliked.push(key.replace('note_dislike_', ''));
      } else if (key.startsWith('season_')) {
        profile.seasons.push(key.replace('season_', ''));
      } else if (key.startsWith('occasion_')) {
        profile.occasions.push(key.replace('occasion_', ''));
      } else if (key.startsWith('gender_')) {
        profile.gender_pref = key.replace('gender_', '');
      } else if (key.startsWith('vibe_')) {
        profile.vibe = key.replace('vibe_', '');
      } else if (key === 'intensity') {
        profile.intensity = value;
      } else if (key === 'budget') {
        profile.budget = value;
      } else if (key === 'experience') {
        profile.experience = value;
      } else if (key === 'longevity_pref') {
        profile.longevity_pref = value;
      }
    }

    return json({ profile });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Get Recommendations ──────────────────────────────────────
export async function handleGetRecommendations(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const { results } = await env.DB.prepare(
      `SELECT r.perfume_id, r.score, r.reason,
              p.name, p.brand, p.image_url, COALESCE(p.accords, (SELECT GROUP_CONCAT(pa.accord_name) FROM perfume_accords pa WHERE pa.perfume_id = p.id)) as accords, p.gender, p.year, p.concentration,
              (SELECT ROUND(AVG(rv.rating), 1) FROM reviews rv WHERE rv.perfume_id = p.id) as avg_rating,
              (SELECT COUNT(*) FROM reviews rv WHERE rv.perfume_id = p.id) as review_count
       FROM recommendations r
       JOIN perfumes p ON r.perfume_id = p.id
       WHERE r.user_id = ?
       ORDER BY r.score DESC
       LIMIT ? OFFSET ?`
    ).bind(auth.userId, limit, offset).all();

    if (results.length === 0) {
      // Check if quiz was taken
      const quiz = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM quiz_responses WHERE user_id = ?'
      ).bind(auth.userId).first();

      if (quiz.count === 0) {
        return json({ recommendations: [], message: 'Take the scent quiz to get personalized recommendations' });
      }

      return json({ recommendations: [], message: 'No more recommendations available' });
    }

    return json({ recommendations: results });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}

// ── Explore (Curated Discovery) ──────────────────────────────
export async function handleExplore(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const sections = [];

    // Section 1: Top Recommendations (from quiz)
    const { results: topRecs } = await env.DB.prepare(
      `SELECT r.perfume_id, r.score, r.reason,
              p.name, p.brand, p.image_url, COALESCE(p.accords, (SELECT GROUP_CONCAT(pa.accord_name) FROM perfume_accords pa WHERE pa.perfume_id = p.id)) as accords, p.gender, p.year,
              (SELECT ROUND(AVG(rv.rating), 1) FROM reviews rv WHERE rv.perfume_id = p.id) as avg_rating
       FROM recommendations r
       JOIN perfumes p ON r.perfume_id = p.id
       WHERE r.user_id = ?
       ORDER BY r.score DESC LIMIT 6`
    ).bind(auth.userId).all();

    if (topRecs.length > 0) {
      sections.push({
        title: 'Recommended for You',
        subtitle: 'Based on your taste profile',
        type: 'recommendations',
        perfumes: topRecs,
      });
    }

    // Section 2: Popular in user's favorite accords
    const { results: profileRows } = await env.DB.prepare(
      "SELECT preference_key FROM user_scent_profile WHERE user_id = ? AND preference_key LIKE 'family_%' AND preference_value > 0 ORDER BY preference_value DESC LIMIT 1"
    ).bind(auth.userId).all();

    if (profileRows.length > 0) {
      const topFamily = profileRows[0].preference_key.replace('family_', '');
      const familyAccords = FAMILY_ACCORDS[topFamily] || [];

      if (familyAccords.length > 0) {
        const likeConds = familyAccords.map(() => 'LOWER(COALESCE(p.accords, (SELECT GROUP_CONCAT(pa.accord_name) FROM perfume_accords pa WHERE pa.perfume_id = p.id))) LIKE ?').join(' OR ');
        const likeParams = familyAccords.map(a => `%${a}%`);

        const { results: familyPerfumes } = await env.DB.prepare(
          `SELECT p.id as perfume_id, p.name, p.brand, p.image_url,
                  COALESCE(p.accords, (SELECT GROUP_CONCAT(pa.accord_name) FROM perfume_accords pa WHERE pa.perfume_id = p.id)) as accords,
                  p.gender, p.year,
                  (SELECT ROUND(AVG(rv.rating), 1) FROM reviews rv WHERE rv.perfume_id = p.id) as avg_rating,
                  (SELECT COUNT(*) FROM reviews rv WHERE rv.perfume_id = p.id) as review_count
           FROM perfumes p
           WHERE (${likeConds})
           ORDER BY review_count DESC, avg_rating DESC
           LIMIT 6`
        ).bind(...likeParams).all();

        if (familyPerfumes.length > 0) {
          sections.push({
            title: `Popular ${topFamily.charAt(0).toUpperCase() + topFamily.slice(1)} Fragrances`,
            subtitle: `Because you love ${topFamily} scents`,
            type: 'family',
            perfumes: familyPerfumes,
          });
        }
      }
    }

    // Section 3: Trending (most reviewed recently)
    const { results: trending } = await env.DB.prepare(
      `SELECT p.id as perfume_id, p.name, p.brand, p.image_url, COALESCE(p.accords, (SELECT GROUP_CONCAT(pa.accord_name) FROM perfume_accords pa WHERE pa.perfume_id = p.id)) as accords, p.gender, p.year,
              ROUND(AVG(rv.rating), 1) as avg_rating,
              COUNT(rv.id) as review_count
       FROM perfumes p
       JOIN reviews rv ON rv.perfume_id = p.id
       GROUP BY p.id
       ORDER BY review_count DESC, avg_rating DESC
       LIMIT 6`
    ).all();

    if (trending.length > 0) {
      sections.push({
        title: 'Trending Now',
        subtitle: 'Most reviewed fragrances',
        type: 'trending',
        perfumes: trending,
      });
    }

    // Section 4: Hidden Gems (high rating, few reviews)
    const { results: gems } = await env.DB.prepare(
      `SELECT p.id as perfume_id, p.name, p.brand, p.image_url, COALESCE(p.accords, (SELECT GROUP_CONCAT(pa.accord_name) FROM perfume_accords pa WHERE pa.perfume_id = p.id)) as accords, p.gender, p.year,
              ROUND(AVG(rv.rating), 1) as avg_rating,
              COUNT(rv.id) as review_count
       FROM perfumes p
       JOIN reviews rv ON rv.perfume_id = p.id
       GROUP BY p.id
       HAVING review_count BETWEEN 1 AND 5 AND avg_rating >= 4.0
       ORDER BY avg_rating DESC
       LIMIT 6`
    ).all();

    if (gems.length > 0) {
      sections.push({
        title: 'Hidden Gems',
        subtitle: 'High-rated, under-the-radar picks',
        type: 'gems',
        perfumes: gems,
      });
    }

    // Section 5: New Arrivals
    const { results: newArrivals } = await env.DB.prepare(
      `SELECT p.id as perfume_id, p.name, p.brand, p.image_url, COALESCE(p.accords, (SELECT GROUP_CONCAT(pa.accord_name) FROM perfume_accords pa WHERE pa.perfume_id = p.id)) as accords, p.gender, p.year,
              (SELECT ROUND(AVG(rv.rating), 1) FROM reviews rv WHERE rv.perfume_id = p.id) as avg_rating
       FROM perfumes p
       ORDER BY p.created_at DESC
       LIMIT 6`
    ).all();

    if (newArrivals.length > 0) {
      sections.push({
        title: 'Recently Added',
        subtitle: 'Fresh additions to the database',
        type: 'new',
        perfumes: newArrivals,
      });
    }

    return json({ sections });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
