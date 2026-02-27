// API Configuration
// Production URL (deployed on Cloudflare Workers)
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = process.env.API_URL || 'https://fragbase-api.warlet-invest.workers.dev';

// Basic API call (no auth header)
export async function api(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

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
