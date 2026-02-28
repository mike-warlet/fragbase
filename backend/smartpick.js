// Smart Pick API - Weather-aware fragrance recommendation from user's collection
import { requireAuth } from './auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Season scoring based on temperature
function getSeasonFromTemp(tempC) {
  if (tempC >= 30) return { primary: 'summer', secondary: 'spring' };
  if (tempC >= 22) return { primary: 'spring', secondary: 'summer' };
  if (tempC >= 14) return { primary: 'fall', secondary: 'spring' };
  return { primary: 'winter', secondary: 'fall' };
}

// Accord preferences by weather
const WEATHER_ACCORD_BOOST = {
  hot_dry: ['citrus', 'aquatic', 'fresh', 'green', 'ozonic'],
  hot_humid: ['citrus', 'aquatic', 'fresh', 'aromatic', 'green'],
  warm: ['floral', 'citrus', 'fresh', 'fruity', 'green'],
  mild: ['woody', 'floral', 'aromatic', 'leather', 'fresh'],
  cool: ['woody', 'amber', 'spicy', 'leather', 'smoky'],
  cold: ['oriental', 'amber', 'vanilla', 'oud', 'balsamic', 'sweet'],
  rainy: ['woody', 'earthy', 'green', 'aromatic', 'smoky'],
};

function getWeatherCategory(tempC, humidity) {
  if (tempC >= 30 && humidity < 50) return 'hot_dry';
  if (tempC >= 30) return 'hot_humid';
  if (tempC >= 22) return 'warm';
  if (tempC >= 14) return 'mild';
  if (tempC >= 5) return 'cool';
  return 'cold';
}

// GET /api/smart-pick — Get today's weather-based recommendation
export async function handleSmartPick(request, env) {
  const auth = await requireAuth(request, env);
  if (auth.error) return json({ error: auth.error }, auth.status);

  try {
    const url = new URL(request.url);
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');

    // Default weather if no location provided
    let weather = { temp: 22, humidity: 60, description: 'pleasant', icon: 'partly_cloudy' };

    if (lat && lon) {
      try {
        // Use wttr.in (free, no API key required)
        const weatherResp = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
        if (weatherResp.ok) {
          const wData = await weatherResp.json();
          const current = wData.current_condition?.[0];
          if (current) {
            weather = {
              temp: parseInt(current.temp_C),
              humidity: parseInt(current.humidity),
              description: current.weatherDesc?.[0]?.value || 'unknown',
              feels_like: parseInt(current.FeelsLikeC),
              icon: current.weatherCode,
            };
          }
        }
      } catch {
        // Weather API failed, use defaults
      }
    }

    // Get user's owned perfumes with their voting data
    const { results: ownedPerfumes } = await env.DB.prepare(
      `SELECT p.id, p.name, p.brand, p.image_url, p.type, p.accords,
              COALESCE(p.accords, (SELECT GROUP_CONCAT(pa.accord_name) FROM perfume_accords pa WHERE pa.perfume_id = p.id)) as all_accords,
              w.list_type
       FROM wishlists w
       JOIN perfumes p ON w.perfume_id = p.id
       WHERE w.user_id = ? AND w.list_type = 'own'`
    ).bind(auth.userId).all();

    if (ownedPerfumes.length === 0) {
      return json({
        smart_pick: null,
        weather,
        message: 'Adicione perfumes à sua coleção para receber recomendações diárias!',
      });
    }

    // Get season votes for owned perfumes
    const perfumeIds = ownedPerfumes.map(p => p.id);
    const placeholders = perfumeIds.map(() => '?').join(',');

    const { results: seasonVotes } = await env.DB.prepare(
      `SELECT perfume_id,
              ROUND(AVG(spring), 2) as spring,
              ROUND(AVG(summer), 2) as summer,
              ROUND(AVG(fall), 2) as fall,
              ROUND(AVG(winter), 2) as winter,
              ROUND(AVG(day), 2) as day_score,
              ROUND(AVG(night), 2) as night_score
       FROM season_votes
       WHERE perfume_id IN (${placeholders})
       GROUP BY perfume_id`
    ).bind(...perfumeIds).all();

    const seasonMap = {};
    for (const sv of seasonVotes) {
      seasonMap[sv.perfume_id] = sv;
    }

    // Get performance votes
    const { results: perfVotes } = await env.DB.prepare(
      `SELECT perfume_id,
              ROUND(AVG(longevity), 1) as avg_longevity,
              ROUND(AVG(sillage), 1) as avg_sillage
       FROM performance_votes
       WHERE perfume_id IN (${placeholders})
       GROUP BY perfume_id`
    ).bind(...perfumeIds).all();

    const perfMap = {};
    for (const pv of perfVotes) {
      perfMap[pv.perfume_id] = pv;
    }

    // Check if already wore something today (SOTD)
    const todaySOTD = await env.DB.prepare(
      "SELECT perfume_id FROM sotd WHERE user_id = ? AND date = date('now')"
    ).bind(auth.userId).first();

    // Score each perfume
    const season = getSeasonFromTemp(weather.temp);
    const weatherCat = getWeatherCategory(weather.temp, weather.humidity);
    const boostedAccords = WEATHER_ACCORD_BOOST[weatherCat] || [];
    const isDay = new Date().getHours() >= 6 && new Date().getHours() < 20;

    const scored = ownedPerfumes.map(perfume => {
      let score = 50; // base
      let reasons = [];
      const sv = seasonMap[perfume.id];
      const pv = perfMap[perfume.id];
      const accords = (perfume.all_accords || '').toLowerCase().split(',').map(a => a.trim());

      // Season match (up to +30)
      if (sv) {
        const primaryScore = sv[season.primary] || 0;
        const secondaryScore = sv[season.secondary] || 0;
        score += primaryScore * 30;
        score += secondaryScore * 10;
        if (primaryScore > 0.5) reasons.push(`Great for ${season.primary}`);

        // Day/night match
        const timeScore = isDay ? (sv.day_score || 0) : (sv.night_score || 0);
        score += timeScore * 15;
      }

      // Weather-accord match (up to +25)
      const accordMatches = accords.filter(a => boostedAccords.some(ba => a.includes(ba)));
      if (accordMatches.length > 0) {
        score += Math.min(accordMatches.length * 8, 25);
        reasons.push(`Suits ${weather.description.toLowerCase()} weather`);
      }

      // Performance boost in humidity (high sillage less good in humid)
      if (pv && weather.humidity > 70 && pv.avg_sillage > 7) {
        score -= 10;
      }

      // Penalty if already wore today
      if (todaySOTD && todaySOTD.perfume_id === perfume.id) {
        score -= 30;
        reasons.push('Already worn today');
      }

      // Small random factor for variety
      score += Math.random() * 10;

      return { ...perfume, score: Math.round(score), reasons };
    });

    // Sort by score and take top 3
    scored.sort((a, b) => b.score - a.score);
    const topPicks = scored.slice(0, 3);

    return json({
      smart_pick: topPicks[0],
      alternatives: topPicks.slice(1),
      weather,
      season: season.primary,
      weather_category: weatherCat,
    });
  } catch (error) {
    return json({ error: error.message }, 500);
  }
}
