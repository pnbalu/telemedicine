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

export default function PrescriptionsScreen() {
  const { gradient } = useTheme();
  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: 'Oct 5, 2025',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
        { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' },
      ],
      status: 'active',
    },
    {
      id: 2,
      doctor: 'Dr. Emily Davis',
      date: 'Sep 28, 2025',
      medications: [
        { name: 'Vitamin C', dosage: '1000mg', frequency: 'Once daily' },
      ],
      status: 'completed',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Prescriptions</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {prescriptions.map((prescription) => (
          <View key={prescription.id} style={styles.prescriptionCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.doctorName}>{prescription.doctor}</Text>
                <Text style={styles.date}>{prescription.date}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: prescription.status === 'active' ? argonTheme.colors.success + '20' : argonTheme.colors.muted + '20' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: prescription.status === 'active' ? argonTheme.colors.success : argonTheme.colors.muted }
                ]}>
                  {prescription.status}
                </Text>
              </View>
            </View>

            <View style={styles.medications}>
              {prescription.medications.map((med, index) => (
                <View key={index} style={styles.medRow}>
                  <Ionicons name="medical" size={16} color={argonTheme.colors.success} />
                  <View style={styles.medInfo}>
                    <Text style={styles.medName}>{med.name} {med.dosage}</Text>
                    <Text style={styles.medFrequency}>{med.frequency}</Text>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.refillButton}>
              <Text style={styles.refillButtonText}>Request Refill</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: -16,
  },
  prescriptionCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 16,
    ...argonTheme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  medications: {
    marginBottom: 16,
  },
  medRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.text,
    marginBottom: 2,
  },
  medFrequency: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  refillButton: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  refillButtonText: {
    color: argonTheme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

