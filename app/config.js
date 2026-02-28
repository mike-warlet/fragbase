// API Configuration
// Production URL (deployed on Cloudflare Workers)
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = process.env.API_URL || 'https://fragbase-api.warlet-invest.workers.dev';

// In-memory cache with TTL
const cache = new Map();
const CACHE_TTL = {
  '/api/perfumes': 5 * 60 * 1000,       // 5 min
  '/api/perfumes/trending': 5 * 60 * 1000,
  '/api/discovery/explore': 5 * 60 * 1000,
  '/api/discovery/quiz': 10 * 60 * 1000, // 10 min
  '/api/gamification/badges': 10 * 60 * 1000,
  '/api/gamification/leaderboard': 2 * 60 * 1000,
  '/api/challenges': 5 * 60 * 1000,
};

function getCacheTTL(endpoint) {
  const base = endpoint.split('?')[0];
  return CACHE_TTL[base] || 0;
}

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data, ttl) {
  if (cache.size > 100) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
  cache.set(key, { data, expiry: Date.now() + ttl });
}

export function invalidateCache(pattern) {
  for (const key of cache.keys()) {
    if (key.includes(pattern)) cache.delete(key);
  }
}

// Basic API call (no auth header)
export async function api(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const method = options.method || 'GET';

  // Check cache for GET requests
  if (method === 'GET') {
    const ttl = getCacheTTL(endpoint);
    if (ttl > 0) {
      const cached = getCached(endpoint);
      if (cached) return cached;
    }
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  // Cache GET responses with configured TTL
  if (method === 'GET') {
    const ttl = getCacheTTL(endpoint);
    if (ttl > 0) setCache(endpoint, data, ttl);
  }

  return data;
}

// Authenticated API call (auto-injects JWT token)
export async function apiCall(endpoint, options = {}) {
  const token = await AsyncStorage.getItem('token');

  return api(endpoint, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}

// Authenticated file upload (multipart/form-data)
export async function apiUpload(endpoint, formData) {
  const token = await AsyncStorage.getItem('token');
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Upload failed');
  }

  return data;
}
