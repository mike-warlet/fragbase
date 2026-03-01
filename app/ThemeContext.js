import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'fragbase_theme';

// Shared values (same for both themes, duplicated here to avoid circular deps with theme.js)
const sharedTypography = {
  fontFamily: 'System',
  fontFamilyHeading: 'System',
  h1: 32, h2: 28, h3: 24, h4: 20, h5: 18, h6: 16, body: 14, caption: 12, small: 10,
  light: '300', regular: '400', medium: '500', semibold: '600', bold: '700',
};

const sharedSpacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };

const sharedBorderRadius = { sm: 4, md: 8, lg: 12, xl: 16, round: 999 };

const darkColors = {
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
  primary: '#8b4513',
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

  // Accord colors
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

const lightColors = {
  // Base colors
  background: '#F5F5F0',
  backgroundLight: '#EDEDEA',
  surface: '#FFFFFF',
  surfaceLight: '#E8E8E4',

  // Text colors
  textPrimary: '#1a1a2e',
  textSecondary: '#555555',
  textTertiary: '#888888',

  // Brand colors
  primary: '#8b4513',
  primaryLight: '#a0522d',
  primaryDark: '#654321',

  // UI elements
  border: '#E0E0DC',
  divider: '#EDEDEA',
  shadow: 'rgba(0, 0, 0, 0.15)',

  // Semantic colors
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',

  // Accord colors (same as dark)
  accords: darkColors.accords,

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

const darkShadows = {
  sm: {
    shadowColor: darkColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: darkColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: darkColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};

const lightShadows = {
  sm: {
    shadowColor: lightColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: lightColors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: lightColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
};

const ThemeContext = createContext(null);

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return dark theme defaults when used outside provider (backward compat)
    return {
      isDark: true,
      theme: {
        colors: darkColors,
        typography: sharedTypography,
        spacing: sharedSpacing,
        borderRadius: sharedBorderRadius,
        shadows: darkShadows,
        getAccordColor: (accordName) => {
          const normalized = accordName.toLowerCase().trim();
          return darkColors.accords[normalized] || darkColors.textSecondary;
        },
        getGenderColor: (gender) => {
          const normalized = gender.toLowerCase();
          if (normalized.includes('men') || normalized === 'masculine') return darkColors.masculine;
          if (normalized.includes('women') || normalized === 'feminine') return darkColors.feminine;
          return darkColors.unisex;
        },
      },
      toggleTheme: () => {},
    };
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light') {
        setIsDark(false);
      }
    } catch (e) {
      // Default to dark on error
    } finally {
      setIsLoaded(true);
    }
  };

  const toggleTheme = async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newIsDark ? 'dark' : 'light');
    } catch (e) {
      // Silently fail on storage error
    }
  };

  const currentColors = isDark ? darkColors : lightColors;
  const currentShadows = isDark ? darkShadows : lightShadows;

  const theme = {
    colors: currentColors,
    typography: sharedTypography,
    spacing: sharedSpacing,
    borderRadius: sharedBorderRadius,
    shadows: currentShadows,
    getAccordColor: (accordName) => {
      const normalized = accordName.toLowerCase().trim();
      return currentColors.accords[normalized] || currentColors.textSecondary;
    },
    getGenderColor: (gender) => {
      const normalized = gender.toLowerCase();
      if (normalized.includes('men') || normalized === 'masculine') return currentColors.masculine;
      if (normalized.includes('women') || normalized === 'feminine') return currentColors.feminine;
      return currentColors.unisex;
    },
  };

  const value = {
    isDark,
    theme,
    toggleTheme,
  };

  // Don't render until theme preference is loaded to avoid flash
  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
