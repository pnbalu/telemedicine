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

export default function NurseDashboard({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const { user } = useAuth();

  const todayStats = [
    { label: 'Patients', value: '18', icon: 'people', color: primaryColor, subtext: 'Assigned' },
    { label: 'Vitals', value: '32', icon: 'pulse', color: argonTheme.colors.success, subtext: 'Recorded' },
    { label: 'Medications', value: '45', icon: 'medical', color: argonTheme.colors.info, subtext: 'Administered' },
    { label: 'Alerts', value: '3', icon: 'alert-circle', color: argonTheme.colors.danger, subtext: 'Critical' },
  ];

  const urgentTasks = [
    { id: 1, patient: 'John Doe', room: '302-A', task: 'BP check - High reading', priority: 'high', time: '30 min ago' },
    { id: 2, patient: 'Sarah Smith', room: '305-B', task: 'Medication due', priority: 'medium', time: 'Now' },
    { id: 3, patient: 'Mike Wilson', room: '301-C', task: 'Vital signs monitoring', priority: 'high', time: '15 min ago' },
  ];

  const upcomingMedications = [
    { id: 1, patient: 'Emily Brown', room: '304-A', medication: 'Insulin 10 units', time: '2:00 PM' },
    { id: 2, patient: 'Tom Davis', room: '303-B', medication: 'Antibiotics 500mg', time: '2:30 PM' },
    { id: 3, patient: 'Lisa White', room: '306-C', medication: 'Pain relief', time: '3:00 PM' },
  ];

  const quickActions = [
    { icon: 'pulse-outline', label: 'Record Vitals', screen: 'VitalsRecording', color: argonTheme.colors.success },
    { icon: 'medical-outline', label: 'Medications', screen: 'MedicationTracking', color: argonTheme.colors.info },
    { icon: 'people-outline', label: 'My Patients', screen: 'PatientMonitoring', color: primaryColor },
    { icon: 'clipboard-outline', label: 'Nursing Notes', screen: 'NursingNotes', color: argonTheme.colors.warning },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return argonTheme.colors.danger;
      case 'medium': return argonTheme.colors.warning;
      case 'low': return argonTheme.colors.info;
      default: return argonTheme.colors.muted;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
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
            <Text style={styles.nurseName}>{user?.name || 'Nurse'}</Text>
            <View style={styles.shiftBadge}>
              <Ionicons name="time" size={12} color={argonTheme.colors.white} />
              <Text style={styles.shiftText}>{user?.shift || 'Day Shift'}</Text>
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
        {/* Today's Stats */}
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

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                  <Ionicons name={action.icon} size={26} color={action.color} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Urgent Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Urgent Tasks</Text>
            <View style={styles.urgentBadge}>
              <Text style={styles.urgentBadgeText}>{urgentTasks.length}</Text>
            </View>
          </View>

          {urgentTasks.map((task) => (
            <TouchableOpacity key={task.id} style={styles.taskCard}>
              <View style={[styles.priorityBar, { backgroundColor: getPriorityColor(task.priority) }]} />
              <View style={styles.taskContent}>
                <View style={styles.taskHeader}>
                  <View style={styles.taskLeft}>
                    <Text style={styles.taskPatient}>{task.patient}</Text>
                    <View style={styles.roomBadge}>
                      <Ionicons name="bed-outline" size={12} color={primaryColor} />
                      <Text style={[styles.roomText, { color: primaryColor }]}>{task.room}</Text>
                    </View>
                  </View>
                  <Text style={styles.taskTime}>{task.time}</Text>
                </View>
                <Text style={styles.taskDescription}>{task.task}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Medications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Medications</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MedicationTracking')}>
              <Text style={[styles.seeAllText, { color: primaryColor }]}>View All</Text>
            </TouchableOpacity>
          </View>

          {upcomingMedications.map((med) => (
            <View key={med.id} style={styles.medicationCard}>
              <View style={[styles.medIcon, { backgroundColor: argonTheme.colors.info + '15' }]}>
                <Ionicons name="medical" size={24} color={argonTheme.colors.info} />
              </View>
              <View style={styles.medInfo}>
                <Text style={styles.medPatient}>{med.patient}</Text>
                <Text style={styles.medName}>{med.medication}</Text>
                <View style={styles.medMeta}>
                  <Ionicons name="bed-outline" size={12} color={argonTheme.colors.muted} />
                  <Text style={styles.medRoom}>{med.room}</Text>
                </View>
              </View>
              <View style={styles.medRight}>
                <View style={styles.medTimeBadge}>
                  <Ionicons name="time-outline" size={14} color={argonTheme.colors.warning} />
                  <Text style={styles.medTime}>{med.time}</Text>
                </View>
              </View>
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
  nurseName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 8,
  },
  shiftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  shiftText: {
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
    paddingHorizontal: 5,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
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
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
    textAlign: 'center',
  },
  urgentBadge: {
    backgroundColor: argonTheme.colors.danger,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  urgentBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    marginBottom: 10,
    overflow: 'hidden',
    ...argonTheme.shadows.sm,
  },
  priorityBar: {
    width: 4,
  },
  taskContent: {
    flex: 1,
    padding: 14,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskLeft: {
    flex: 1,
  },
  taskPatient: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  roomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  roomText: {
    fontSize: 12,
    fontWeight: '600',
  },
  taskTime: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  taskDescription: {
    fontSize: 13,
    color: argonTheme.colors.text,
  },
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 12,
    marginBottom: 10,
    gap: 12,
    ...argonTheme.shadows.sm,
  },
  medIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medInfo: {
    flex: 1,
  },
  medPatient: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  medName: {
    fontSize: 13,
    color: argonTheme.colors.text,
    marginBottom: 4,
  },
  medMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  medRoom: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  medRight: {
    justifyContent: 'center',
  },
  medTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.warning + '15',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  medTime: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.warning,
  },
});

