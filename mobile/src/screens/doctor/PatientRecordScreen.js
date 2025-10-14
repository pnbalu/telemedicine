import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function PatientRecordScreen({ navigation, route }) {
  const { patientId } = route.params || {};
  const { gradient, primaryColor } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock patient data
  const patient = {
    id: patientId || 'PAT-001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodType: 'O+',
    dateOfBirth: '01/15/1980',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@email.com',
    address: '123 Main St, New York, NY',
    emergencyContact: 'Jane Doe - Wife - (555) 987-6543',
  };

  const medicalHistory = {
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin - Severe', 'Peanuts - Moderate'],
    surgeries: ['Appendectomy (2018)', 'ACL Repair (2015)'],
    familyHistory: ['Father: Heart Disease', 'Mother: Diabetes'],
  };

  const recentVisits = [
    { date: 'Oct 10, 2025', reason: 'Follow-up checkup', notes: 'BP stable, continue medication' },
    { date: 'Sep 15, 2025', reason: 'Annual physical', notes: 'All vitals normal' },
  ];

  const currentMedications = [
    { name: 'Lisinopril 10mg', dosage: '1 tablet daily', prescribedBy: 'You' },
    { name: 'Metformin 500mg', dosage: '2 tablets daily', prescribedBy: 'You' },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'document-text' },
    { key: 'history', label: 'History', icon: 'time' },
    { key: 'medications', label: 'Medications', icon: 'medical' },
    { key: 'notes', label: 'Notes', icon: 'create' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{patient.name}</Text>
          <Text style={styles.headerSubtitle}>{patient.id} • {patient.age} years • {patient.gender}</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="call" size={24} color={argonTheme.colors.white} />
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
                activeTab === tab.key && { 
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                }
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={14}
                color={activeTab === tab.key ? argonTheme.colors.white : primaryColor}
              />
              <Text style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Patient Info Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Patient Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Blood Type:</Text>
                <Text style={styles.infoValue}>{patient.bloodType}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date of Birth:</Text>
                <Text style={styles.infoValue}>{patient.dateOfBirth}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>{patient.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{patient.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Emergency Contact:</Text>
                <Text style={styles.infoValue}>{patient.emergencyContact}</Text>
              </View>
            </View>

            {/* Medical Conditions */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Active Conditions</Text>
              {medicalHistory.conditions.map((condition, idx) => (
                <View key={idx} style={styles.conditionItem}>
                  <Ionicons name="medical" size={16} color={argonTheme.colors.danger} />
                  <Text style={styles.conditionText}>{condition}</Text>
                </View>
              ))}
            </View>

            {/* Allergies */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Allergies</Text>
              {medicalHistory.allergies.map((allergy, idx) => (
                <View key={idx} style={styles.allergyItem}>
                  <Ionicons name="alert-circle" size={16} color={argonTheme.colors.warning} />
                  <Text style={styles.allergyText}>{allergy}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Recent Visits</Text>
              {recentVisits.map((visit, idx) => (
                <View key={idx} style={styles.visitCard}>
                  <View style={styles.visitHeader}>
                    <Text style={styles.visitDate}>{visit.date}</Text>
                    <Ionicons name="chevron-forward" size={18} color={argonTheme.colors.muted} />
                  </View>
                  <Text style={styles.visitReason}>{visit.reason}</Text>
                  <Text style={styles.visitNotes}>{visit.notes}</Text>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Surgical History</Text>
              {medicalHistory.surgeries.map((surgery, idx) => (
                <View key={idx} style={styles.surgeryItem}>
                  <Ionicons name="cut" size={16} color={argonTheme.colors.info} />
                  <Text style={styles.surgeryText}>{surgery}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Medications Tab */}
        {activeTab === 'medications' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Current Medications</Text>
            {currentMedications.map((med, idx) => (
              <View key={idx} style={styles.medicationCard}>
                <View style={styles.medicationHeader}>
                  <View style={styles.medicationIcon}>
                    <Ionicons name="medical" size={20} color={primaryColor} />
                  </View>
                  <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>{med.name}</Text>
                    <Text style={styles.medicationDosage}>{med.dosage}</Text>
                    <Text style={styles.prescribedBy}>Prescribed by: {med.prescribedBy}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add Clinical Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Enter clinical notes here..."
              placeholderTextColor={argonTheme.colors.muted}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.saveNotesButton}>
              <LinearGradient colors={gradient} style={styles.saveNotesGradient}>
                <Ionicons name="checkmark-circle" size={18} color={argonTheme.colors.white} />
                <Text style={styles.saveNotesText}>Save Notes</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
    minWidth: 80,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  tabTextActive: {
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 14,
    ...argonTheme.shadows.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border + '20',
  },
  infoLabel: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.danger + '10',
    padding: 10,
    borderRadius: argonTheme.borderRadius.md,
    marginBottom: 8,
    gap: 10,
  },
  conditionText: {
    fontSize: 14,
    fontWeight: '500',
    color: argonTheme.colors.text,
  },
  allergyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.warning + '10',
    padding: 10,
    borderRadius: argonTheme.borderRadius.md,
    marginBottom: 8,
    gap: 10,
  },
  allergyText: {
    fontSize: 14,
    fontWeight: '500',
    color: argonTheme.colors.text,
  },
  visitCard: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 12,
    marginBottom: 10,
  },
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  visitDate: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
  },
  visitReason: {
    fontSize: 13,
    fontWeight: '500',
    color: argonTheme.colors.text,
    marginBottom: 4,
  },
  visitNotes: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
    fontStyle: 'italic',
  },
  surgeryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.info + '10',
    padding: 10,
    borderRadius: argonTheme.borderRadius.md,
    marginBottom: 8,
    gap: 10,
  },
  surgeryText: {
    fontSize: 14,
    fontWeight: '500',
    color: argonTheme.colors.text,
  },
  medicationCard: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 12,
    marginBottom: 10,
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  medicationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: argonTheme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  medicationDosage: {
    fontSize: 13,
    color: argonTheme.colors.text,
    marginBottom: 2,
  },
  prescribedBy: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  notesInput: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    padding: 14,
    fontSize: 14,
    color: argonTheme.colors.text,
    minHeight: 200,
    marginBottom: 14,
  },
  saveNotesButton: {
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  saveNotesGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  saveNotesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
});

