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

export default function MedicationTrackingScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [selectedTab, setSelectedTab] = useState('due');

  const medications = [
    {
      id: 1,
      patient: 'John Doe',
      room: '302-A',
      medication: 'Insulin 10 units',
      route: 'Subcutaneous',
      time: '2:00 PM',
      status: 'due',
      prescribedBy: 'Dr. Smith',
    },
    {
      id: 2,
      patient: 'Sarah Smith',
      room: '305-B',
      medication: 'Antibiotics 500mg',
      route: 'Oral',
      time: '2:30 PM',
      status: 'due',
      prescribedBy: 'Dr. Johnson',
    },
    {
      id: 3,
      patient: 'Mike Wilson',
      room: '301-C',
      medication: 'Pain medication 5mg',
      route: 'IV',
      time: '1:30 PM',
      status: 'administered',
      prescribedBy: 'Dr. Smith',
      administeredAt: '1:32 PM',
      administeredBy: 'You',
    },
    {
      id: 4,
      patient: 'Emily Brown',
      room: '304-A',
      medication: 'Blood thinner 2.5mg',
      route: 'Oral',
      time: '1:00 PM',
      status: 'administered',
      prescribedBy: 'Dr. Lee',
      administeredAt: '1:05 PM',
      administeredBy: 'You',
    },
  ];

  const tabs = [
    { key: 'due', label: 'Due Now', count: medications.filter(m => m.status === 'due').length },
    { key: 'upcoming', label: 'Upcoming', count: 0 },
    { key: 'administered', label: 'Completed', count: medications.filter(m => m.status === 'administered').length },
  ];

  const filteredMedications = medications.filter(med => {
    if (selectedTab === 'due') return med.status === 'due';
    if (selectedTab === 'administered') return med.status === 'administered';
    return med.status === 'upcoming';
  });

  const handleAdminister = (med) => {
    Alert.alert(
      'Administer Medication',
      `Confirm administration of ${med.medication} to ${med.patient}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => Alert.alert('Success', `${med.medication} administered successfully!`)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Medication Tracking</Text>
          <Text style={styles.headerSubtitle}>{medications.length} scheduled today</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={28} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
          {tabs.map((tab) => (
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
        {filteredMedications.map((med) => (
          <View key={med.id} style={styles.medicationCard}>
            <View style={styles.medHeader}>
              <View style={styles.medPatientInfo}>
                <Text style={styles.medPatient}>{med.patient}</Text>
                <View style={styles.roomBadge}>
                  <Ionicons name="bed-outline" size={12} color={primaryColor} />
                  <Text style={[styles.roomText, { color: primaryColor }]}>{med.room}</Text>
                </View>
              </View>
              <View style={styles.medTimeBadge}>
                <Ionicons name="time-outline" size={14} color={argonTheme.colors.warning} />
                <Text style={styles.medTime}>{med.time}</Text>
              </View>
            </View>

            <View style={styles.medBody}>
              <View style={styles.medDetailRow}>
                <Ionicons name="medical" size={16} color={argonTheme.colors.info} />
                <Text style={styles.medName}>{med.medication}</Text>
              </View>
              <View style={styles.medDetailRow}>
                <Ionicons name="arrow-forward-circle-outline" size={16} color={argonTheme.colors.muted} />
                <Text style={styles.medRoute}>Route: {med.route}</Text>
              </View>
              <View style={styles.medDetailRow}>
                <Ionicons name="person-outline" size={16} color={argonTheme.colors.muted} />
                <Text style={styles.medPrescriber}>Prescribed by: {med.prescribedBy}</Text>
              </View>

              {med.status === 'administered' && (
                <View style={styles.administeredInfo}>
                  <Ionicons name="checkmark-circle" size={16} color={argonTheme.colors.success} />
                  <Text style={styles.administeredText}>
                    Administered at {med.administeredAt} by {med.administeredBy}
                  </Text>
                </View>
              )}
            </View>

            {med.status === 'due' && (
              <TouchableOpacity
                style={styles.administerButton}
                onPress={() => handleAdminister(med)}
              >
                <LinearGradient colors={gradient} style={styles.administerGradient}>
                  <Ionicons name="checkmark-circle" size={18} color={argonTheme.colors.white} />
                  <Text style={styles.administerText}>Mark as Administered</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {filteredMedications.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="medical-outline" size={64} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No Medications</Text>
            <Text style={styles.emptyText}>
              {selectedTab === 'due' ? 'All medications have been administered' : 'No medications in this category'}
            </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  tabsContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
  },
  tabsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  tabTextActive: {
    color: argonTheme.colors.white,
  },
  tabBadge: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabBadgeText: {
    fontSize: 11,
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
  medicationCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 14,
    marginBottom: 14,
    ...argonTheme.shadows.sm,
  },
  medHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medPatientInfo: {
    flex: 1,
  },
  medPatient: {
    fontSize: 16,
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
  medBody: {
    gap: 8,
  },
  medDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  medName: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  medRoute: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  medPrescriber: {
    fontSize: 12,
    color: argonTheme.colors.muted,
  },
  administeredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.success + '10',
    padding: 10,
    borderRadius: argonTheme.borderRadius.md,
    marginTop: 8,
    gap: 8,
  },
  administeredText: {
    fontSize: 12,
    color: argonTheme.colors.success,
    fontWeight: '500',
  },
  administerButton: {
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
    marginTop: 12,
  },
  administerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  administerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
});

