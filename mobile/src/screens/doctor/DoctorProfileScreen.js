import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function DoctorProfileScreen({ navigation }) {
  const { gradient } = useTheme();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: 'person-outline', label: 'Personal Information', screen: 'DoctorPersonalInfo' },
    { icon: 'shield-outline', label: 'License & Credentials', screen: 'DoctorCredentials' },
    { icon: 'calendar-outline', label: 'Availability Settings', screen: 'DoctorAvailability' },
    { icon: 'cash-outline', label: 'Earnings & Payments', screen: 'DoctorEarnings' },
    { icon: 'notifications-outline', label: 'Notifications', screen: 'Notifications' },
    { icon: 'shield-checkmark-outline', label: 'Privacy & Security', screen: 'PrivacySecurity' },
    { icon: 'help-circle-outline', label: 'Help & Support', screen: 'HelpSupport' },
  ];

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>
              {user?.name?.split(' ').map(n => n[0]).join('') || 'DR'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Doctor'}</Text>
          <Text style={styles.userSpecialty}>{user?.specialty || 'Physician'}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user?.rating || '4.8'}⭐</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user?.yearsOfExperience || '15'}</Text>
              <Text style={styles.statLabel}>Years Exp</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user?.totalPatients || '450'}</Text>
              <Text style={styles.statLabel}>Patients</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && styles.menuItemBorder
              ]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={22} color={argonTheme.colors.primary} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={argonTheme.colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: argonTheme.colors.white,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 4,
  },
  userSpecialty: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 30,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    marginTop: -20,
    paddingHorizontal: 16,
  },
  menuCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    paddingHorizontal: 16,
    marginBottom: 16,
    ...argonTheme.shadows.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border + '30',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: argonTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: argonTheme.colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    paddingVertical: 16,
    gap: 10,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.danger,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.danger,
  },
});

