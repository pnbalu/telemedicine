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

export default function DoctorPrescriptionsScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();

  const prescriptions = [
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'PAT-001',
      medication: 'Lisinopril 10mg',
      dosage: '1 tablet daily',
      duration: '30 days',
      date: 'Oct 10, 2025',
      status: 'active',
      refills: 2,
    },
    {
      id: 2,
      patient: 'Sarah Smith',
      patientId: 'PAT-002',
      medication: 'Albuterol Inhaler',
      dosage: '2 puffs as needed',
      duration: '90 days',
      date: 'Oct 8, 2025',
      status: 'active',
      refills: 1,
    },
    {
      id: 3,
      patient: 'Michael Brown',
      patientId: 'PAT-003',
      medication: 'Atorvastatin 20mg',
      dosage: '1 tablet at bedtime',
      duration: '30 days',
      date: 'Oct 5, 2025',
      status: 'refill-requested',
      refills: 0,
    },
  ];

  const handleWritePrescription = () => {
    navigation.navigate('WritePrescription');
  };

  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <View style={styles.headerContent}>
          {canGoBack && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
            </TouchableOpacity>
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Prescriptions</Text>
            <Text style={styles.headerSubtitle}>{prescriptions.length} total prescriptions</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleWritePrescription}
          >
            <Ionicons name="add-circle-outline" size={28} color={argonTheme.colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {prescriptions.map((prescription) => (
          <View key={prescription.id} style={styles.prescriptionCard}>
            <View style={styles.prescriptionHeader}>
              <View style={styles.patientInfo}>
                <View style={styles.patientAvatar}>
                  <Text style={styles.avatarText}>
                    {prescription.patient.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View>
                  <Text style={styles.patientName}>{prescription.patient}</Text>
                  <Text style={styles.patientId}>{prescription.patientId}</Text>
                </View>
              </View>
              {prescription.status === 'refill-requested' && (
                <View style={styles.refillBadge}>
                  <Ionicons name="refresh" size={12} color={argonTheme.colors.warning} />
                  <Text style={styles.refillText}>Refill</Text>
                </View>
              )}
            </View>

            <View style={styles.medicationContainer}>
              <Ionicons name="medical" size={20} color={primaryColor} />
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationName}>{prescription.medication}</Text>
                <Text style={styles.dosageText}>{prescription.dosage}</Text>
              </View>
            </View>

            <View style={styles.prescriptionDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>{prescription.duration}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Refills:</Text>
                <Text style={styles.detailValue}>{prescription.refills} left</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Prescribed:</Text>
                <Text style={styles.detailValue}>{prescription.date}</Text>
              </View>
            </View>

            <View style={styles.prescriptionActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="eye-outline" size={16} color={argonTheme.colors.info} />
                <Text style={[styles.actionText, { color: argonTheme.colors.info }]}>View Details</Text>
              </TouchableOpacity>
              {prescription.status === 'refill-requested' && (
                <TouchableOpacity 
                  style={styles.actionBtn}
                  onPress={() => Alert.alert('Refill', 'Approve prescription refill?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Approve', onPress: () => Alert.alert('Success', 'Refill approved') }
                  ])}
                >
                  <Ionicons name="checkmark-circle-outline" size={16} color={argonTheme.colors.success} />
                  <Text style={[styles.actionText, { color: argonTheme.colors.success }]}>Approve</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleWritePrescription}
      >
        <LinearGradient colors={gradient} style={styles.fabGradient}>
          <Ionicons name="add" size={28} color={argonTheme.colors.white} />
        </LinearGradient>
      </TouchableOpacity>
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
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
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
  addButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  prescriptionCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    marginBottom: 14,
    ...argonTheme.shadows.md,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: argonTheme.colors.info,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  patientName: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.heading,
  },
  patientId: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  refillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.warning + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  refillText: {
    fontSize: 10,
    fontWeight: '600',
    color: argonTheme.colors.warning,
    textTransform: 'uppercase',
  },
  medicationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 12,
    marginBottom: 12,
    gap: 10,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  dosageText: {
    fontSize: 13,
    color: argonTheme.colors.text,
  },
  prescriptionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: argonTheme.colors.muted,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  prescriptionActions: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border + '30',
    paddingTop: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 28,
    overflow: 'hidden',
    ...argonTheme.shadows.lg,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

