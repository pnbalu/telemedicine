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

export default function NurseProfileScreen({ navigation }) {
  const { gradient } = useTheme();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: 'person-outline', label: 'Personal Information', screen: 'NursePersonalInfo' },
    { icon: 'shield-outline', label: 'License & Certifications', screen: 'NurseLicense' },
    { icon: 'calendar-outline', label: 'Shift Schedule', screen: 'NurseSchedule' },
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
              {user?.name?.split(' ').map(n => n[0]).join('') || 'RN'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Nurse'}</Text>
          <View style={styles.roleBadge}>
            <Ionicons name="heart" size={14} color={argonTheme.colors.white} />
            <Text style={styles.roleText}>Registered Nurse</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user?.shift || 'Day'}</Text>
              <Text style={styles.statLabel}>Shift</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user?.yearsOfExperience || '8'}</Text>
              <Text style={styles.statLabel}>Years Exp</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user?.department || 'General'}</Text>
              <Text style={styles.statLabel}>Department</Text>
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
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 8,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 6,
    marginBottom: 20,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.white,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
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
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  menuCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border + '20',
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
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 10,
    ...argonTheme.shadows.sm,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.danger,
  },
});

