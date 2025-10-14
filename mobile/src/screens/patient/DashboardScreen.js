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

export default function DashboardScreen({ navigation }) {
  const { gradient } = useTheme();
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>John Doe 👋</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('NotificationsCenter')}
          >
            <Ionicons name="notifications-outline" size={24} color={argonTheme.colors.white} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Row - Compact */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.statsScroll}
          contentContainerStyle={styles.statsContent}
        >
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Prescriptions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>85</Text>
            <Text style={styles.statLabel}>Health Score</Text>
          </View>
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Next Appointment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Next Appointment</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.appointmentCard}
            onPress={() => navigation.navigate('Appointments')}
          >
            <View style={styles.cardLeft}>
              <LinearGradient
                colors={gradient}
                style={styles.doctorAvatar}
              >
                <Ionicons name="person" size={24} color={argonTheme.colors.white} />
              </LinearGradient>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Dr. Sarah Johnson</Text>
              <Text style={styles.cardSubtitle}>Cardiologist</Text>
              <View style={styles.cardDetail}>
                <Ionicons name="time-outline" size={14} color={gradient[0]} />
                <Text style={[styles.cardDetailText, { color: gradient[0] }]}>Oct 15, 10:00 AM</Text>
              </View>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: gradient[0] + '20' }]}>
            <Text style={[styles.statusText, { color: gradient[0] }]}>In 2 days</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Access */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        
        <TouchableOpacity 
          style={styles.quickButton}
          onPress={() => navigation.navigate('BookAppointment')}
        >
          <LinearGradient
            colors={gradient}
            style={styles.quickGradient}
          >
            <Ionicons name="add-circle" size={24} color={argonTheme.colors.white} />
            <Text style={styles.quickText}>Book New Appointment</Text>
            <Ionicons name="arrow-forward" size={20} color={argonTheme.colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          {/* Prescription Item */}
          <TouchableOpacity 
            style={styles.activityCard}
            onPress={() => navigation.navigate('Prescriptions')}
          >
            <View style={[styles.activityIcon, { backgroundColor: argonTheme.colors.success + '20' }]}>
              <Ionicons name="medical" size={20} color={argonTheme.colors.success} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New Prescription</Text>
              <Text style={styles.activitySubtitle}>Lisinopril 10mg • Dr. Sarah Johnson</Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>

          {/* Lab Report Item */}
          <TouchableOpacity 
            style={styles.activityCard}
            onPress={() => navigation.navigate('LabResults')}
          >
            <View style={[styles.activityIcon, { backgroundColor: argonTheme.colors.info + '20' }]}>
              <Ionicons name="document-text" size={20} color={argonTheme.colors.info} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Lab Results Available</Text>
              <Text style={styles.activitySubtitle}>Blood Test • Oct 8, 2025</Text>
              <Text style={styles.activityTime}>4 days ago</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>
        </View>

        {/* Health Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Ionicons name="bulb" size={24} color={argonTheme.colors.warning} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Daily Health Tip</Text>
            <Text style={styles.tipText}>
              Stay hydrated! Aim for 8 glasses of water daily for optimal health.
            </Text>
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
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: argonTheme.colors.danger,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: argonTheme.colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsScroll: {
    marginTop: 8,
  },
  statsContent: {
    paddingRight: 20,
    gap: 12,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  seeAll: {
    color: argonTheme.colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    ...argonTheme.shadows.sm,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
    marginBottom: 4,
  },
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardDetailText: {
    fontSize: 12,
    color: argonTheme.colors.primary,
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: argonTheme.colors.info + '20',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: argonTheme.colors.info,
  },
  quickButton: {
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
  },
  quickGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 10,
  },
  quickText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    flex: 1,
    textAlign: 'center',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 12,
    marginBottom: 10,
    ...argonTheme.shadows.sm,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  activitySubtitle: {
    fontSize: 12,
    color: argonTheme.colors.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: argonTheme.colors.textMuted,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.warning + '10',
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.warning,
  },
  tipIcon: {
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.warning,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: argonTheme.colors.text,
    lineHeight: 18,
  },
});
