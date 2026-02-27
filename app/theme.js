// FragBase Design System - Dark Theme (inspirado no Fragrantica)

export const colors = {
  // Base colors
  background: '#1a1a2e',
  backgroundLight: '#252540',
  surface: '#2a2a45',
  surfaceLight: '#3a3a60',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#b0b0b0',
  textTertiary: '#808080',
  
  // Brand colors
  primary: '#8b4513', // FragBase brown
  primaryLight: '#a0522d',
  primaryDark: '#654321',
  
  // UI elements
  border: '#3a3a60',
  divider: '#2a2a45',
  shadow: 'rgba(0, 0, 0, 0.5)',
  
  // Semantic colors
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  
  // Accord colors (padronizadas)
  accords: {
    amber: '#d4a574',
    smoky: '#8a8a8a',
    woody: '#8B6914',
    balsamic: '#6B4423',
    'warm spicy': '#cc5500',
    'fresh spicy': '#7ab648',
    oud: '#5c4033',
    leather: '#654321',
    floral: '#ff69b4',
    citrus: '#ffd700',
    aquatic: '#4fc3f7',
    sweet: '#ff8a80',
    musky: '#d7ccc8',
    powdery: '#f8bbd0',
    vanilla: '#ffe4b5',
    fruity: '#ff6b6b',
    green: '#8bc34a',
    aromatic: '#9c27b0',
    fresh: '#00bcd4',
    earthy: '#795548',
    animalic: '#5d4037',
    honey: '#ffb300',
    herbal: '#689f38',
    mineral: '#607d8b',
    tropical: '#ff9800',
    ozonic: '#b3e5fc',
    lactonic: '#fff9c4',
  },
  
  // Gender colors
  masculine: '#4a90e2',
  feminine: '#ff69b4',
  unisex: '#9c27b0',
  
  // Rating emoji colors
  love: '#e91e63',
  like: '#4caf50',
  ok: '#ff9800',
  dislike: '#ff5722',
  hate: '#f44336',
};

export const typography = {
  // Font families
  fontFamily: 'System',
  fontFamilyHeading: 'System',
  
  // Font sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 14,
  caption: 12,
  small: 10,
  
  // Font weights
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Helper function to get accord color
export const getAccordColor = (accordName) => {
  const normalized = accordName.toLowerCase().trim();
  return colors.accords[normalized] || colors.textSecondary;
};

// Helper function for gender badge color
export const getGenderColor = (gender) => {
  const normalized = gender.toLowerCase();
  if (normalized.includes('men') || normalized === 'masculine') return colors.masculine;
  if (normalized.includes('women') || normalized === 'feminine') return colors.feminine;
  return colors.unisex;
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  getAccordColor,
  getGenderColor,
};
