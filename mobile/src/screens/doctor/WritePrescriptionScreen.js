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

export default function WritePrescriptionScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [formData, setFormData] = useState({
    patient: '',
    medication: '',
    dosage: '',
    frequency: 'Daily',
    duration: '30',
    instructions: '',
    refills: '2',
  });

  const commonMedications = [
    'Lisinopril', 'Metformin', 'Atorvastatin', 'Amlodipine',
    'Omeprazole', 'Levothyroxine', 'Albuterol', 'Gabapentin',
  ];

  const frequencies = ['Daily', 'Twice Daily', 'Three Times Daily', 'As Needed', 'Weekly'];

  const handleSave = () => {
    if (!formData.patient || !formData.medication || !formData.dosage) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Prescription Created',
      `Prescription for ${formData.medication} has been created successfully!`,
      [
        { text: 'Create Another', onPress: () => {
          setFormData({
            patient: formData.patient,
            medication: '',
            dosage: '',
            frequency: 'Daily',
            duration: '30',
            instructions: '',
            refills: '2',
          });
        }},
        { text: 'Done', onPress: () => navigation.goBack() }
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
        <Text style={styles.headerTitle}>Write Prescription</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Patient Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient *</Text>
          <TouchableOpacity style={styles.selectButton}>
            <Ionicons name="person-outline" size={20} color={argonTheme.colors.muted} />
            <Text style={styles.selectButtonText}>
              {formData.patient || 'Select Patient'}
            </Text>
            <Ionicons name="chevron-down" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>
        </View>

        {/* Medication */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medication *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="medical-outline" size={20} color={argonTheme.colors.muted} />
            <TextInput
              style={styles.input}
              placeholder="Search or enter medication name"
              placeholderTextColor={argonTheme.colors.muted}
              value={formData.medication}
              onChangeText={(text) => setFormData({ ...formData, medication: text })}
            />
          </View>
          
          {/* Common Medications */}
          <Text style={styles.subsectionTitle}>Common Medications:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
            {commonMedications.map((med) => (
              <TouchableOpacity
                key={med}
                style={styles.medicationChip}
                onPress={() => setFormData({ ...formData, medication: med })}
              >
                <Text style={styles.chipText}>{med}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Dosage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dosage *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="flask-outline" size={20} color={argonTheme.colors.muted} />
            <TextInput
              style={styles.input}
              placeholder="e.g., 10mg, 1 tablet, 2 puffs"
              placeholderTextColor={argonTheme.colors.muted}
              value={formData.dosage}
              onChangeText={(text) => setFormData({ ...formData, dosage: text })}
            />
          </View>
        </View>

        {/* Frequency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequency *</Text>
          <View style={styles.chipRow}>
            {frequencies.map((freq) => (
              <TouchableOpacity
                key={freq}
                style={[
                  styles.freqChip,
                  formData.frequency === freq && { 
                    backgroundColor: primaryColor,
                    borderColor: primaryColor 
                  }
                ]}
                onPress={() => setFormData({ ...formData, frequency: freq })}
              >
                <Text style={[
                  styles.freqText,
                  formData.frequency === freq && styles.freqTextActive
                ]}>
                  {freq}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Duration & Refills */}
        <View style={styles.row}>
          <View style={[styles.section, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.sectionTitle}>Duration (days) *</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { textAlign: 'center' }]}
                placeholder="30"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.duration}
                onChangeText={(text) => setFormData({ ...formData, duration: text })}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={[styles.section, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.sectionTitle}>Refills Allowed</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { textAlign: 'center' }]}
                placeholder="2"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.refills}
                onChangeText={(text) => setFormData({ ...formData, refills: text })}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <TextInput
            style={styles.instructionsInput}
            placeholder="e.g., Take with food, avoid alcohol..."
            placeholderTextColor={argonTheme.colors.muted}
            value={formData.instructions}
            onChangeText={(text) => setFormData({ ...formData, instructions: text })}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.previewButton}
            onPress={() => Alert.alert('Preview', 'Prescription preview will be shown')}
          >
            <Ionicons name="eye-outline" size={18} color={primaryColor} />
            <Text style={[styles.previewText, { color: primaryColor }]}>Preview</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <LinearGradient colors={gradient} style={styles.saveGradient}>
              <Ionicons name="checkmark-circle" size={18} color={argonTheme.colors.white} />
              <Text style={styles.saveText}>Save & Send</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.muted,
    marginBottom: 8,
    marginTop: 12,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    gap: 10,
  },
  selectButtonText: {
    flex: 1,
    fontSize: 15,
    color: argonTheme.colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: argonTheme.colors.text,
  },
  chipScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  medicationChip: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: argonTheme.colors.text,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  freqChip: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
  },
  freqText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  freqTextActive: {
    color: argonTheme.colors.white,
  },
  instructionsInput: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    padding: 14,
    fontSize: 14,
    color: argonTheme.colors.text,
    minHeight: 100,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  previewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
  },
  previewText: {
    fontSize: 15,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  saveText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
});

