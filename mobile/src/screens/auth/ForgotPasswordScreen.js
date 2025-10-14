import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function ForgotPasswordScreen({ navigation }) {
  const { gradient } = useTheme();
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    // TODO: Implement actual password reset
    setResetSent(true);
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
          </TouchableOpacity>
          
          <View style={styles.iconContainer}>
            <Ionicons name="key" size={60} color={argonTheme.colors.white} />
          </View>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            {resetSent 
              ? 'Check your email' 
              : 'No worries, we\'ll send you reset instructions'
            }
          </Text>
        </View>

        {/* Reset Card */}
        <View style={styles.card}>
          {!resetSent ? (
            <>
              <Text style={styles.cardTitle}>Reset Password</Text>
              <Text style={styles.cardDescription}>
                Enter your email address and we'll send you a link to reset your password.
              </Text>
              
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

              <TouchableOpacity onPress={handleResetPassword}>
                <LinearGradient
                  colors={gradient}
                  style={styles.resetButton}
                >
                  <Text style={styles.resetButtonText}>Send Reset Link</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={80} color={argonTheme.colors.success} />
              </View>
              
              <Text style={styles.successTitle}>Email Sent!</Text>
              <Text style={styles.successText}>
                We've sent a password reset link to:
              </Text>
              <Text style={styles.emailText}>{email}</Text>
              
              <View style={styles.infoCard}>
                <Ionicons name="information-circle" size={20} color={argonTheme.colors.info} />
                <Text style={styles.infoText}>
                  Check your spam folder if you don't see it within 5 minutes
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.resendButton}
                onPress={handleResetPassword}
              >
                <Ionicons name="mail-outline" size={18} color={argonTheme.colors.primary} />
                <Text style={styles.resendButtonText}>Resend Email</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.backToLoginButton}
                onPress={() => navigation.navigate('Login')}
              >
                <LinearGradient
                  colors={gradient}
                  style={styles.backToLoginGradient}
                >
                  <Ionicons name="arrow-back" size={18} color={argonTheme.colors.white} />
                  <Text style={styles.backToLoginText}>Back to Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}

          {/* Help */}
          {!resetSent && (
            <View style={styles.footer}>
              <Text style={styles.footerText}>Remember your password? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 24,
    ...argonTheme.shadows.lg,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 16,
    marginBottom: 20,
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
  resetButton: {
    borderRadius: argonTheme.borderRadius.md,
    padding: 16,
    alignItems: 'center',
    ...argonTheme.shadows.md,
  },
  resetButtonText: {
    color: argonTheme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  successIcon: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.success,
    textAlign: 'center',
    marginBottom: 12,
  },
  successText: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.info + '10',
    borderRadius: argonTheme.borderRadius.md,
    padding: 12,
    marginBottom: 20,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: argonTheme.colors.text,
    lineHeight: 18,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 14,
    marginBottom: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  resendButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.primary,
  },
  backToLoginButton: {
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  backToLoginGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  backToLoginText: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: argonTheme.colors.textMuted,
    fontSize: 14,
  },
  loginText: {
    color: argonTheme.colors.warning,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

