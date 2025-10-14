import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { argonTheme } from '../theme/argonTheme';

const ThemeContext = createContext();

export const themes = {
  violet: {
    name: 'Violet',
    primary: '#5E72E4',
    gradient: ['#5E72E4', '#825EE4'],
    icon: 'violet',
  },
  green: {
    name: 'Green',
    primary: '#2DCE89',
    gradient: ['#2DCE89', '#2DCECC'],
    icon: 'green',
  },
  orange: {
    name: 'Orange',
    primary: '#FB6340',
    gradient: ['#FB6340', '#FBB140'],
    icon: 'orange',
  },
  blue: {
    name: 'Blue',
    primary: '#11CDEF',
    gradient: ['#11CDEF', '#1171EF'],
    icon: 'blue',
  },
  red: {
    name: 'Red',
    primary: '#F5365C',
    gradient: ['#F5365C', '#F56036'],
    icon: 'red',
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('violet');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('selectedTheme');
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(savedTheme);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const changeTheme = async (themeKey) => {
    try {
      // Save theme preference permanently
      // This persists even after logout - user preference is maintained
      await AsyncStorage.setItem('selectedTheme', themeKey);
      setCurrentTheme(themeKey);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const getThemeColors = () => {
    const theme = themes[currentTheme];
    return {
      ...argonTheme.colors,
      primary: theme.primary,
      gradientPrimary: theme.gradient,
    };
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        changeTheme,
        themes,
        colors: getThemeColors(),
        gradient: themes[currentTheme].gradient,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

