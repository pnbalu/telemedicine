import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function SignupScreen({ navigation }) {
  const { gradient } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    accountId: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = () => {
    if (!formData.fullName || !formData.email || !formData.accountId || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate account ID format (TMX-123456)
    const accountIdRegex = /^TMX-\d{6}$/;
    if (!accountIdRegex.test(formData.accountId)) {
      alert('Invalid Account ID. Please use format: TMX-123456 (TMX followed by 6 digits)');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    // TODO: Implement actual registration with accountId
    alert(`Account created successfully!\nYour Patient ID: ${formData.accountId}`);
    navigation.replace('Main');
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Ionicons name="medical" size={48} color={argonTheme.colors.white} />
            </View>
            <Text style={styles.appName}>Create Account</Text>
            <Text style={styles.tagline}>Join TeleMedX Today</Text>
          </View>

          {/* Signup Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign Up</Text>
            
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={argonTheme.colors.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={argonTheme.colors.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Patient Account ID */}
            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={20} color={argonTheme.colors.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Patient Account ID (TMX-XXXXXX)"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.accountId}
                onChangeText={(text) => setFormData({ ...formData, accountId: text.toUpperCase() })}
                autoCapitalize="characters"
              />
            </View>

            {/* Phone */}
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color={argonTheme.colors.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={argonTheme.colors.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                  size={20} 
                  color={argonTheme.colors.muted} 
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={argonTheme.colors.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} 
                  size={20} 
                  color={argonTheme.colors.muted} 
                />
              </TouchableOpacity>
            </View>

            {/* Terms Agreement */}
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                {agreeToTerms && (
                  <Ionicons name="checkmark" size={16} color={argonTheme.colors.white} />
                )}
              </View>
              <Text style={styles.checkboxText}>
                I agree to the{' '}
                <Text style={styles.linkText}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity onPress={handleSignup}>
              <LinearGradient
                colors={gradient}
                style={styles.signupButton}
              >
                <Text style={styles.signupButtonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Sign Up */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={20} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    marginBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 50,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  card: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 24,
    marginBottom: 24,
    ...argonTheme.shadows.lg,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 20,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: argonTheme.colors.border,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: argonTheme.colors.success,
    borderColor: argonTheme.colors.success,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: argonTheme.colors.text,
  },
  linkText: {
    color: argonTheme.colors.success,
    fontWeight: '600',
  },
  signupButton: {
    borderRadius: argonTheme.borderRadius.md,
    padding: 16,
    alignItems: 'center',
    ...argonTheme.shadows.md,
  },
  signupButtonText: {
    color: argonTheme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: argonTheme.colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: argonTheme.colors.textMuted,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: argonTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  footerText: {
    color: argonTheme.colors.textMuted,
    fontSize: 14,
  },
  loginText: {
    color: argonTheme.colors.success,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

