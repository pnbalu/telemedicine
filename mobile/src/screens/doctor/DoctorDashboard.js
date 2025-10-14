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

export default function DoctorDashboard({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const { user } = useAuth();

  const now = new Date();
  const getCurrentTime = () => {
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const todayStats = [
    { label: 'Patients', value: '12', icon: 'people', color: primaryColor, subtext: 'Today' },
    { label: 'Consultations', value: '8', icon: 'videocam', color: argonTheme.colors.success, subtext: 'Completed' },
    { label: 'Pending', value: '4', icon: 'alert-circle', color: argonTheme.colors.warning, subtext: 'Tasks' },
    { label: 'Earnings', value: '$680', icon: 'cash', color: argonTheme.colors.info, subtext: 'Today' },
  ];

  const quickActions = [
    { icon: 'add-circle-outline', label: 'New Prescription', screen: 'WritePrescription', color: primaryColor },
    { icon: 'flask-outline', label: 'Review Labs', screen: 'LabResultsReview', color: argonTheme.colors.info, badge: '2' },
    { icon: 'document-text-outline', label: 'Patient Records', screen: 'PatientRecord', color: argonTheme.colors.success },
    { icon: 'call-outline', label: 'Start Consultation', screen: 'ConsultationRoom', color: argonTheme.colors.warning },
  ];

  const pendingTasks = [
    { icon: 'document-text', label: 'Lab reviews pending', count: 2, color: argonTheme.colors.info, screen: 'LabResultsReview' },
    { icon: 'refresh', label: 'Refill requests', count: 1, color: argonTheme.colors.warning, screen: 'DoctorPrescriptions' },
    { icon: 'chatbubbles', label: 'Unread messages', count: 3, color: argonTheme.colors.primary, screen: 'Messages' },
  ];

  const criticalAlerts = [
    { id: 1, patient: 'Sarah Johnson', patientId: 'TMX-002', alert: 'Abnormal lab results', severity: 'high', time: '2h ago' },
    { id: 2, patient: 'Mike Wilson', patientId: 'TMX-005', alert: 'Missed appointment follow-up', severity: 'medium', time: '5h ago' },
  ];

  const recentActivity = [
    { id: 1, action: 'Prescription issued', patient: 'Emily Brown', time: '30 min ago', icon: 'medical' },
    { id: 2, action: 'Lab results reviewed', patient: 'Tom Davis', time: '1h ago', icon: 'flask' },
    { id: 3, action: 'Consultation completed', patient: 'Lisa White', time: '2h ago', icon: 'videocam' },
  ];

  const getGreeting = () => {
    const hour = now.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{getGreeting()} 👋</Text>
            <Text style={styles.doctorName}>{user?.name || 'Doctor'}</Text>
            <View style={styles.specialtyBadge}>
              <Ionicons name="medical" size={12} color={argonTheme.colors.white} />
              <Text style={styles.specialtyText}>{user?.specialty || 'Physician'}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('NotificationsCenter')}
          >
            <Ionicons name="notifications-outline" size={26} color={argonTheme.colors.white} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Stats Grid */}
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            {todayStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statTop}>
                  <View style={[styles.statIconSmall, { backgroundColor: stat.color + '20' }]}>
                    <Ionicons name={stat.icon} size={20} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statSubtext}>{stat.subtext}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pending Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Tasks</Text>
          {pendingTasks.map((task, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.taskCard}
              onPress={() => navigation.navigate(task.screen)}
            >
              <View style={[styles.taskIcon, { backgroundColor: task.color + '15' }]}>
                <Ionicons name={task.icon} size={18} color={task.color} />
              </View>
              <Text style={styles.taskLabel}>{task.label}</Text>
              <View style={[styles.taskBadge, { backgroundColor: task.color }]}>
                <Text style={styles.taskBadgeText}>{task.count}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={argonTheme.colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* My Patients Quick Access */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Patients</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Patients')}>
              <Text style={[styles.seeAllText, { color: primaryColor }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.patientsCard}
            onPress={() => navigation.navigate('Patients')}
          >
            <View style={[styles.patientsIcon, { backgroundColor: primaryColor + '15' }]}>
              <Ionicons name="people" size={32} color={primaryColor} />
            </View>
            <View style={styles.patientsInfo}>
              <Text style={styles.patientsCount}>12 Active Patients</Text>
              <Text style={styles.patientsSubtext}>4 appointments today • 2 critical alerts</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={argonTheme.colors.muted} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                  <Ionicons name={action.icon} size={26} color={action.color} />
                  {action.badge && (
                    <View style={[styles.actionBadge, { backgroundColor: action.color }]}>
                      <Text style={styles.actionBadgeText}>{action.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Critical Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Critical Alerts</Text>
            <View style={styles.alertBadge}>
              <Text style={styles.alertBadgeText}>{criticalAlerts.length}</Text>
            </View>
          </View>

          {criticalAlerts.map((alert) => (
            <TouchableOpacity 
              key={alert.id}
              style={[
                styles.alertCard,
                alert.severity === 'high' && styles.alertCardHigh
              ]}
              onPress={() => navigation.navigate('PatientRecord', { patientId: alert.patientId })}
            >
              <View style={[
                styles.alertSeverity,
                { backgroundColor: alert.severity === 'high' ? argonTheme.colors.danger : argonTheme.colors.warning }
              ]}>
                <Ionicons 
                  name="alert-circle" 
                  size={20} 
                  color={argonTheme.colors.white} 
                />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertPatient}>{alert.patient}</Text>
                <Text style={styles.alertText}>{alert.alert}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={argonTheme.colors.muted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={[styles.activityIcon, { backgroundColor: primaryColor + '15' }]}>
                <Ionicons name={activity.icon} size={16} color={primaryColor} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityPatient}>{activity.patient}</Text>
              </View>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          ))}
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 6,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 8,
  },
  specialtyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  specialtyText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.white,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: argonTheme.colors.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: argonTheme.colors.white,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 14,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    width: '48%',
    ...argonTheme.shadows.sm,
  },
  statTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statIconSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 11,
    color: argonTheme.colors.textMuted,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    ...argonTheme.shadows.sm,
  },
  taskIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: argonTheme.colors.text,
  },
  taskBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  taskBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    alignItems: 'center',
    ...argonTheme.shadows.sm,
  },
  quickActionIcon: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: argonTheme.colors.white,
  },
  actionBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
    textAlign: 'center',
  },
  appointmentCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: argonTheme.colors.border + '40',
    ...argonTheme.shadows.sm,
  },
  appointmentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: argonTheme.colors.white,
    textTransform: 'uppercase',
  },
  appointmentMiddle: {
    marginBottom: 12,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  patientAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: argonTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 2,
  },
  appointmentReason: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.info + '15',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    color: argonTheme.colors.info,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  aptActionBtn: {
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  aptActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 6,
  },
  aptActionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  aptActionBtnOutline: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: argonTheme.colors.background,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    ...argonTheme.shadows.md,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  scheduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: argonTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  scheduleSubtext: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  viewScheduleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  viewScheduleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  alertBadge: {
    backgroundColor: argonTheme.colors.danger,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  alertBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    ...argonTheme.shadows.sm,
  },
  alertCardHigh: {
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.danger,
  },
  alertSeverity: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertPatient: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  alertText: {
    fontSize: 13,
    color: argonTheme.colors.text,
    marginBottom: 3,
  },
  alertTime: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 12,
    marginBottom: 8,
    gap: 12,
    ...argonTheme.shadows.sm,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 2,
  },
  activityPatient: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  activityTime: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  patientsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    gap: 14,
    ...argonTheme.shadows.md,
  },
  patientsIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientsInfo: {
    flex: 1,
  },
  patientsCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  patientsSubtext: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
});


