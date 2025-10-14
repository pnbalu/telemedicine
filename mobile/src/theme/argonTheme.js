// Argon Theme for React Native Paper
// Based on Argon Design System Pro
// Compatible with React Native Paper MD3

import { MD3LightTheme } from 'react-native-paper';

// Argon Design System Colors
export const argonTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#5E72E4',
    secondary: '#F4F5F7',
    tertiary: '#11CDEF',
    error: '#F5365C',
    success: '#2DCE89',
    warning: '#FB6340',
    danger: '#F5365C', // Alias for error
    
    // Surface colors
    surface: '#FFFFFF',
    surfaceVariant: '#F4F5F7',
    surfaceDisabled: '#E7E7E7',
    
    // Background
    background: '#F4F5F7',
    
    // Basic colors
    white: '#FFFFFF',
    black: '#000000',
    
    // Text
    text: '#525F7F',
    textMuted: '#8898AA',
    onPrimary: '#FFFFFF',
    onSecondary: '#525F7F',
    onSurface: '#525F7F',
    onSurfaceVariant: '#8898AA',
    onError: '#FFFFFF',
    onBackground: '#525F7F',
    
    // Outline
    outline: '#E7E7E7',
    outlineVariant: '#DCDCDC',
    
    // Backdrop
    backdrop: 'rgba(23, 43, 77, 0.4)',
    
    // Custom Argon colors
    info: '#11CDEF',
    label: '#FE2472',
    muted: '#8898AA',
    active: '#5E72E4',
    heading: '#32325D',
    icon: '#172B4D',
    border: '#E7E7E7',
    block: '#E7E7E7',
    placeholder: '#9FA5AA',
    
    // Input colors
    input: '#DCDCDC',
    inputSuccess: '#7BDEB2',
    inputError: '#FCB3A4',
    
    // Switch colors
    switchOn: '#5E72E4',
    switchOff: '#D4D9DD',
    
    // Gradient colors (for LinearGradient)
    gradientPrimary: ['#5E72E4', '#825EE4'],
    gradientSuccess: ['#2DCE89', '#2DCECC'],
    gradientInfo: ['#11CDEF', '#1171EF'],
    gradientWarning: ['#FB6340', '#FBB140'],
    gradientDanger: ['#F5365C', '#F56036'],
  },
  
  // Additional theme properties
  roundness: 6,
  
  // Custom spacing (for layouts)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Custom font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  // Custom border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  // Custom shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  // Backward compatibility with Galio-style access
  COLORS: {
    PRIMARY: '#5E72E4',
    SECONDARY: '#F4F5F7',
    LABEL: '#FE2472',
    INFO: '#11CDEF',
    ERROR: '#F5365C',
    SUCCESS: '#2DCE89',
    WARNING: '#FB6340',
    MUTED: '#8898AA',
    INPUT: '#DCDCDC',
    ACTIVE: '#5E72E4',
    PLACEHOLDER: '#9FA5AA',
    BORDER_COLOR: '#E7E7E7',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    TEXT: '#525F7F',
    TEXT_MUTED: '#8898AA',
    HEADING: '#32325D',
    BACKGROUND: '#F4F5F7',
    BACKGROUND_LIGHT: '#FFFFFF',
    BACKGROUND_DARK: '#172B4D',
    ICON: '#172B4D',
    BLOCK: '#E7E7E7',
  },
  
  SIZES: {
    BASE: 16,
    FONT: 16,
    BORDER_RADIUS: 6,
    BORDER_WIDTH: 1,
    ICON: 16,
    ICON_MEDIUM: 18,
    ICON_LARGE: 24,
    BUTTON_WIDTH: 230,
    BUTTON_HEIGHT: 48,
  },
};

export default argonTheme;
