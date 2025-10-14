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

export default function NotificationsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    appointmentReminders: true,
    medicationReminders: true,
    prescriptionReady: true,
    newMessages: true,
    promotions: false,
    healthTips: true,
    systemUpdates: false,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const NotificationItem = ({ icon, title, description, value, onToggle, color }) => (
    <View style={styles.notificationItem}>
      <View style={[styles.notificationIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
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
        colors={argonTheme.colors.gradientInfo}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointments</Text>
          <View style={styles.card}>
            <NotificationItem
              icon="calendar"
              title="Appointment Reminders"
              description="Get notified before appointments"
              value={settings.appointmentReminders}
              onToggle={() => toggleSetting('appointmentReminders')}
              color={argonTheme.colors.primary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medications</Text>
          <View style={styles.card}>
            <NotificationItem
              icon="medical"
              title="Medication Reminders"
              description="Daily reminders to take medication"
              value={settings.medicationReminders}
              onToggle={() => toggleSetting('medicationReminders')}
              color={argonTheme.colors.success}
            />
            <View style={styles.divider} />
            <NotificationItem
              icon="checkmark-circle"
              title="Prescription Ready"
              description="Pharmacy pickup notifications"
              value={settings.prescriptionReady}
              onToggle={() => toggleSetting('prescriptionReady')}
              color={argonTheme.colors.success}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication</Text>
          <View style={styles.card}>
            <NotificationItem
              icon="chatbubbles"
              title="New Messages"
              description="Doctor replies and messages"
              value={settings.newMessages}
              onToggle={() => toggleSetting('newMessages')}
              color={argonTheme.colors.info}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.card}>
            <NotificationItem
              icon="pricetag"
              title="Promotions & Offers"
              description="Special deals and discounts"
              value={settings.promotions}
              onToggle={() => toggleSetting('promotions')}
              color={argonTheme.colors.warning}
            />
            <View style={styles.divider} />
            <NotificationItem
              icon="heart"
              title="Health Tips"
              description="Daily wellness advice"
              value={settings.healthTips}
              onToggle={() => toggleSetting('healthTips')}
              color={argonTheme.colors.danger}
            />
            <View style={styles.divider} />
            <NotificationItem
              icon="information-circle"
              title="System Updates"
              description="App updates and improvements"
              value={settings.systemUpdates}
              onToggle={() => toggleSetting('systemUpdates')}
              color={argonTheme.colors.muted}
            />
          </View>
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
    ...argonTheme.shadows.sm,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: argonTheme.colors.border,
    marginLeft: 80,
  },
});

