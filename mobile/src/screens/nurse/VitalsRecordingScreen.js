import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function VitalsRecordingScreen({ navigation, route }) {
  const { gradient, primaryColor } = useTheme();
  const patient = route.params?.patient || { name: 'John Doe', room: '302-A' };

  const [vitals, setVitals] = useState({
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    bloodGlucose: '',
    notes: '',
  });

  const vitalTypes = [
    { key: 'bloodPressure', label: 'Blood Pressure', unit: 'mmHg', icon: 'pulse', color: argonTheme.colors.danger },
    { key: 'heartRate', label: 'Heart Rate', unit: 'bpm', icon: 'heart', color: argonTheme.colors.primary },
    { key: 'temperature', label: 'Temperature', unit: '°F', icon: 'thermometer', color: argonTheme.colors.warning },
    { key: 'respiratoryRate', label: 'Respiratory Rate', unit: '/min', icon: 'leaf', color: argonTheme.colors.success },
    { key: 'oxygenSaturation', label: 'O2 Saturation', unit: '%', icon: 'water', color: argonTheme.colors.info },
    { key: 'bloodGlucose', label: 'Blood Glucose', unit: 'mg/dL', icon: 'nutrition', color: argonTheme.colors.warning },
  ];

  const handleSave = () => {
    Alert.alert(
      'Save Vitals',
      'Are you sure you want to save these vital signs?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: () => {
            Alert.alert('Success', 'Vital signs recorded successfully!');
            navigation.goBack();
          }
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
          <Text style={styles.headerTitle}>Record Vitals</Text>
          <Text style={styles.headerSubtitle}>{patient.name} • {patient.room}</Text>
        </View>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Vitals Input */}
        <View style={styles.section}>
          {/* Blood Pressure */}
          <View style={styles.vitalCard}>
            <View style={[styles.vitalIcon, { backgroundColor: argonTheme.colors.danger + '15' }]}>
              <Ionicons name="pulse" size={24} color={argonTheme.colors.danger} />
            </View>
            <View style={styles.vitalContent}>
              <Text style={styles.vitalLabel}>Blood Pressure</Text>
              <View style={styles.bpInputRow}>
                <TextInput
                  style={styles.bpInput}
                  placeholder="Systolic"
                  keyboardType="numeric"
                  value={vitals.bloodPressureSystolic}
                  onChangeText={(text) => setVitals({...vitals, bloodPressureSystolic: text})}
                />
                <Text style={styles.bpSeparator}>/</Text>
                <TextInput
                  style={styles.bpInput}
                  placeholder="Diastolic"
                  keyboardType="numeric"
                  value={vitals.bloodPressureDiastolic}
                  onChangeText={(text) => setVitals({...vitals, bloodPressureDiastolic: text})}
                />
                <Text style={styles.unitText}>mmHg</Text>
              </View>
            </View>
          </View>

          {/* Other Vitals */}
          {vitalTypes.slice(1).map((vital) => (
            <View key={vital.key} style={styles.vitalCard}>
              <View style={[styles.vitalIcon, { backgroundColor: vital.color + '15' }]}>
                <Ionicons name={vital.icon} size={24} color={vital.color} />
              </View>
              <View style={styles.vitalContent}>
                <Text style={styles.vitalLabel}>{vital.label}</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.vitalInput}
                    placeholder={`Enter ${vital.label.toLowerCase()}`}
                    keyboardType="numeric"
                    value={vitals[vital.key]}
                    onChangeText={(text) => setVitals({...vitals, [vital.key]: text})}
                  />
                  <Text style={styles.unitText}>{vital.unit}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Enter any observations or notes..."
            placeholderTextColor={argonTheme.colors.muted}
            value={vitals.notes}
            onChangeText={(text) => setVitals({...vitals, notes: text})}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient colors={gradient} style={styles.saveGradient}>
            <Ionicons name="checkmark-circle" size={20} color={argonTheme.colors.white} />
            <Text style={styles.saveText}>Save Vital Signs</Text>
          </LinearGradient>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 14,
  },
  vitalCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 12,
    gap: 14,
    ...argonTheme.shadows.sm,
  },
  vitalIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vitalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  vitalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vitalInput: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: argonTheme.colors.text,
  },
  bpInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bpInput: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: argonTheme.colors.text,
    textAlign: 'center',
  },
  bpSeparator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.text,
  },
  unitText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.textMuted,
    minWidth: 50,
  },
  notesInput: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    padding: 14,
    fontSize: 14,
    color: argonTheme.colors.text,
    minHeight: 100,
    ...argonTheme.shadows.sm,
  },
  saveButton: {
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: 24,
    ...argonTheme.shadows.md,
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
});

