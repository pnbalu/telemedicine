import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { gradient } = useTheme();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter email and password');
      return;
    }

    try {
      const user = await login(email, password);

      // Route based on role returned from login
      switch(user.role) {
        case 'doctor':
          navigation.replace('DoctorMain');
          break;
        case 'nurse':
          navigation.replace('NurseMain');
          break;
        case 'admin':
          navigation.replace('AdminMain');
          break;
        case 'patient':
        default:
          navigation.replace('Main');
          break;
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Invalid email or password');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={gradient}
        style={styles.gradient}
      >
        {/* Logo/Brand */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="fitness" size={60} color={argonTheme.colors.white} />
          </View>
          <Text style={styles.appName}>TeleMedX</Text>
          <Text style={styles.tagline}>Your Health, Connected</Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign In</Text>
          
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={argonTheme.colors.muted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={argonTheme.colors.muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={argonTheme.colors.muted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={argonTheme.colors.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin}>
            <LinearGradient
              colors={gradient}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Demo Credentials Info */}
          <View style={styles.demoCard}>
            <View style={styles.demoHeader}>
              <Ionicons name="information-circle" size={18} color={argonTheme.colors.info} />
              <Text style={styles.demoTitle}>Demo Accounts</Text>
            </View>
            <View style={styles.demoAccounts}>
              <View style={styles.demoAccount}>
                <Ionicons name="person" size={14} color={argonTheme.colors.primary} />
                <Text style={styles.demoText}>Patient: patient@test.com</Text>
              </View>
              <View style={styles.demoAccount}>
                <Ionicons name="medical" size={14} color={argonTheme.colors.success} />
                <Text style={styles.demoText}>Doctor: doctor@test.com</Text>
              </View>
              <View style={styles.demoAccount}>
                <Ionicons name="heart" size={14} color={argonTheme.colors.info} />
                <Text style={styles.demoText}>Nurse: nurse@test.com</Text>
              </View>
              <View style={styles.demoAccount}>
                <Ionicons name="business" size={14} color={argonTheme.colors.warning} />
                <Text style={styles.demoText}>Admin: admin@test.com</Text>
              </View>
              <Text style={styles.demoPassword}>Password: test123</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  card: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 24,
    ...argonTheme.shadows.lg,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: argonTheme.colors.text,
  },
  forgotPassword: {
    color: argonTheme.colors.primary,
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  loginButton: {
    borderRadius: argonTheme.borderRadius.md,
    padding: 16,
    alignItems: 'center',
    ...argonTheme.shadows.md,
  },
  loginButtonText: {
    color: argonTheme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: argonTheme.colors.textMuted,
    fontSize: 14,
  },
  signupText: {
    color: argonTheme.colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  demoCard: {
    backgroundColor: argonTheme.colors.info + '10',
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.info + '30',
    padding: 14,
    marginTop: 24,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  demoTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: argonTheme.colors.info,
  },
  demoAccounts: {
    gap: 6,
  },
  demoAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  demoText: {
    fontSize: 12,
    color: argonTheme.colors.text,
  },
  demoPassword: {
    fontSize: 11,
    color: argonTheme.colors.textMuted,
    marginTop: 8,
    fontStyle: 'italic',
  },
});

