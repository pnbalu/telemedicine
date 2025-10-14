import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme, themes } from '../../contexts/ThemeContext';

export default function PrivacySecurityScreen({ navigation }) {
  const { currentTheme, changeTheme, gradient } = useTheme();
  const [settings, setSettings] = useState({
    biometric: true,
    twoFactor: false,
    dataSharing: false,
    analytics: true,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const themeColors = {
    violet: '#5E72E4',
    green: '#2DCE89',
    orange: '#FB6340',
    blue: '#11CDEF',
    red: '#F5365C',
  };

  const SettingItem = ({ icon, title, description, value, onToggle, color }) => (
    <View style={styles.settingItem}>
      <View style={[styles.settingIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: argonTheme.colors.border, true: argonTheme.colors.primary + '40' }}
        thumbColor={value ? argonTheme.colors.primary : '#f4f3f4'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Theme</Text>
          <View style={styles.card}>
            <Text style={styles.themeDescription}>Choose your preferred color theme for the app</Text>
            <View style={styles.themeGrid}>
              {Object.entries(themes).map(([key, theme]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.themeOption,
                    currentTheme === key && styles.themeOptionSelected
                  ]}
                  onPress={() => changeTheme(key)}
                >
                  <LinearGradient
                    colors={theme.gradient}
                    style={styles.themeColorCircle}
                  >
                    {currentTheme === key && (
                      <Ionicons name="checkmark" size={20} color={argonTheme.colors.white} />
                    )}
                  </LinearGradient>
                  <Text style={[
                    styles.themeName,
                    currentTheme === key && styles.themeNameSelected
                  ]}>
                    {theme.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.card}>
            <SettingItem
              icon="finger-print"
              title="Biometric Login"
              description="Use fingerprint or Face ID"
              value={settings.biometric}
              onToggle={() => toggleSetting('biometric')}
              color={argonTheme.colors.success}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="shield-checkmark"
              title="Two-Factor Authentication"
              description="Extra security for your account"
              value={settings.twoFactor}
              onToggle={() => toggleSetting('twoFactor')}
              color={argonTheme.colors.primary}
            />
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="key-outline" size={20} color={argonTheme.colors.primary} />
            <Text style={styles.actionButtonText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.card}>
            <SettingItem
              icon="share-social"
              title="Data Sharing"
              description="Share anonymized health data for research"
              value={settings.dataSharing}
              onToggle={() => toggleSetting('dataSharing')}
              color={argonTheme.colors.info}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="analytics"
              title="Analytics"
              description="Help improve app experience"
              value={settings.analytics}
              onToggle={() => toggleSetting('analytics')}
              color={argonTheme.colors.warning}
            />
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text-outline" size={20} color={argonTheme.colors.primary} />
            <Text style={styles.actionButtonText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="clipboard-outline" size={20} color={argonTheme.colors.primary} />
            <Text style={styles.actionButtonText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download-outline" size={20} color={argonTheme.colors.success} />
            <Text style={styles.actionButtonText}>Download My Data</Text>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
            <Ionicons name="trash-outline" size={20} color={argonTheme.colors.danger} />
            <Text style={[styles.actionButtonText, styles.dangerText]}>Delete Account</Text>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.danger} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.textMuted,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    marginBottom: 12,
    ...argonTheme.shadows.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: argonTheme.colors.border,
    marginLeft: 80,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 12,
    ...argonTheme.shadows.sm,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: argonTheme.colors.text,
    marginLeft: 12,
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: argonTheme.colors.danger + '40',
  },
  dangerText: {
    color: argonTheme.colors.danger,
  },
  themeDescription: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
    marginBottom: 16,
    lineHeight: 20,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeOption: {
    alignItems: 'center',
    width: '30%',
  },
  themeOptionSelected: {
    transform: [{ scale: 1.05 }],
  },
  themeColorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...argonTheme.shadows.md,
  },
  themeName: {
    fontSize: 13,
    fontWeight: '500',
    color: argonTheme.colors.text,
  },
  themeNameSelected: {
    fontWeight: '700',
    color: argonTheme.colors.primary,
  },
});

