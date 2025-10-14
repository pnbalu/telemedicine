import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function DoctorAppointmentsScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [selectedTab, setSelectedTab] = useState('today');

  const appointments = {
    today: [
      {
        id: 1,
        patient: 'John Doe',
        patientId: 'PAT-001',
        time: '2:00 PM',
        type: 'Video Call',
        reason: 'Follow-up checkup',
        status: 'confirmed',
        duration: 30,
      },
      {
        id: 2,
        patient: 'Sarah Smith',
        patientId: 'PAT-002',
        time: '3:00 PM',
        type: 'Video Call',
        reason: 'Initial consultation',
        status: 'confirmed',
        duration: 30,
      },
    ],
    upcoming: [
      {
        id: 3,
        patient: 'Michael Brown',
        patientId: 'PAT-003',
        time: 'Oct 15 • 10:00 AM',
        type: 'Video Call',
        reason: 'Prescription renewal',
        status: 'pending',
        duration: 15,
      },
    ],
    completed: [
      {
        id: 4,
        patient: 'Emily Wilson',
        patientId: 'PAT-004',
        time: 'Oct 12 • 9:30 AM',
        type: 'Video Call',
        reason: 'Anxiety consultation',
        status: 'completed',
        duration: 30,
        notes: 'Prescribed anxiety medication, follow-up in 2 weeks',
      },
    ],
  };

  const currentAppointments = appointments[selectedTab] || [];

  const handleJoinConsultation = (appointment) => {
    navigation.navigate('ConsultationRoom', { appointment });
  };

  const handleViewPatient = (patientId) => {
    navigation.navigate('PatientRecord', { patientId });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <Text style={styles.headerSubtitle}>Manage your consultations</Text>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
          {[
            { key: 'today', label: 'Today', icon: 'today', count: appointments.today.length },
            { key: 'upcoming', label: 'Upcoming', icon: 'calendar', count: appointments.upcoming.length },
            { key: 'completed', label: 'Completed', icon: 'checkmark-done', count: appointments.completed.length },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                selectedTab === tab.key && { 
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                }
              ]}
              onPress={() => setSelectedTab(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={14}
                color={selectedTab === tab.key ? argonTheme.colors.white : primaryColor}
              />
              <Text style={[
                styles.tabText,
                selectedTab === tab.key && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
              {tab.count > 0 && (
                <View style={[
                  styles.tabBadge,
                  selectedTab === tab.key && styles.tabBadgeActive
                ]}>
                  <Text style={[
                    styles.tabBadgeText,
                    selectedTab === tab.key && styles.tabBadgeTextActive
                  ]}>
                    {tab.count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentAppointments.map((apt) => (
          <View key={apt.id} style={styles.appointmentCard}>
            <View style={styles.appointmentTop}>
              <View style={styles.patientInfoRow}>
                <View style={styles.patientAvatar}>
                  <Ionicons name="person" size={20} color={argonTheme.colors.white} />
                </View>
                <View>
                  <Text style={styles.patientName}>{apt.patient}</Text>
                  <Text style={styles.patientId}>{apt.patientId}</Text>
                </View>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: 
                  apt.status === 'confirmed' ? argonTheme.colors.success :
                  apt.status === 'completed' ? argonTheme.colors.info :
                  argonTheme.colors.warning
                }
              ]}>
                <Text style={styles.statusText}>{apt.status}</Text>
              </View>
            </View>

            <View style={styles.appointmentBody}>
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={16} color={primaryColor} />
                <Text style={styles.detailLabel}>Time:</Text>
                <Text style={styles.detailValue}>{apt.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="videocam-outline" size={16} color={primaryColor} />
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>{apt.type}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="document-text-outline" size={16} color={primaryColor} />
                <Text style={styles.detailLabel}>Reason:</Text>
                <Text style={styles.detailValue}>{apt.reason}</Text>
              </View>
            </View>

            {apt.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <Text style={styles.notesText}>{apt.notes}</Text>
              </View>
            )}

            <View style={styles.appointmentActions}>
              {selectedTab !== 'completed' && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleJoinConsultation(apt)}
                >
                  <LinearGradient colors={gradient} style={styles.actionGradient}>
                    <Ionicons name="videocam" size={16} color={argonTheme.colors.white} />
                    <Text style={styles.actionButtonText}>Join Consultation</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={[styles.actionButton, selectedTab === 'completed' && { flex: 1 }]}
                onPress={() => handleViewPatient(apt.patientId)}
              >
                <View style={styles.actionOutline}>
                  <Ionicons name="folder-open-outline" size={16} color={primaryColor} />
                  <Text style={[styles.actionOutlineText, { color: primaryColor }]}>View Patient</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {currentAppointments.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No appointments</Text>
            <Text style={styles.emptyText}>No {selectedTab} appointments scheduled</Text>
          </View>
        )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  tabsContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
    height: 50,
  },
  tabsContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    gap: 5,
    minWidth: 100,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  tabTextActive: {
    color: argonTheme.colors.white,
  },
  tabBadge: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: argonTheme.colors.text,
  },
  tabBadgeTextActive: {
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  appointmentCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    marginBottom: 14,
    ...argonTheme.shadows.md,
  },
  appointmentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: argonTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  patientId: {
    fontSize: 11,
    color: argonTheme.colors.muted,
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
  appointmentBody: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  notesContainer: {
    backgroundColor: argonTheme.colors.info + '10',
    borderLeftWidth: 3,
    borderLeftColor: argonTheme.colors.info,
    borderRadius: argonTheme.borderRadius.md,
    padding: 10,
    marginBottom: 12,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.info,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 12,
    color: argonTheme.colors.text,
    lineHeight: 16,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  actionOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
    backgroundColor: argonTheme.colors.background,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    borderRadius: argonTheme.borderRadius.md,
  },
  actionOutlineText: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
  },
});

