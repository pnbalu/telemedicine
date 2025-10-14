/**
 * Mobile App Configuration
 * 
 * IMPORTANT: Update BACKEND_URL for iOS/Android testing
 * 
 * To find your computer's IP:
 * Windows: ipconfig (look for IPv4 Address)
 * Mac/Linux: ifconfig (look for inet)
 * 
 * Example IPs:
 * - 192.168.1.100 (home wifi)
 * - 192.168.0.15 (home wifi)
 * - 10.0.0.5 (office network)
 */

import { Platform } from 'react-native';

export const Config = {
  // Backend API Configuration
  BACKEND_URL: Platform.select({
    web: 'http://localhost:3001',      // Works on web
    ios: 'http://192.168.0.15:3001',   // ⚠️ CHANGE THIS to your computer's IP
    android: 'http://10.0.2.2:3001',   // Android emulator uses 10.0.2.2 for localhost
  }),

  // Feature Flags
  ENABLE_LIVEKIT: false,  // Set to true when backend is ready
  ENABLE_REAL_AI: false,  // Set to true for real AI responses (needs backend)
  
  // Demo Mode Settings
  DEMO_MODE: true,  // Shows simulated responses
  
  // Development Settings
  SHOW_DEBUG_INFO: true,  // Show console logs
};

/**
 * Usage in screens:
 * 
 * import { Config } from '../../../config';
 * 
 * const apiUrl = Config.BACKEND_URL;
 * if (Config.ENABLE_LIVEKIT) {
 *   // Connect to LiveKit
 * } else {
 *   // Use demo mode
 * }
 */

