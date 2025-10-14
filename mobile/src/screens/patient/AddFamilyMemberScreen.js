import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';
import { useFamilyContext } from '../../contexts/FamilyContext';

export default function AddFamilyMemberScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const { addFamilyMember } = useFamilyContext();
  
  const [formData, setFormData] = useState({
    name: '',
    accountId: '',
    relationship: 'Daughter',
    dateOfBirth: '',
    gender: 'Female',
    bloodType: 'O+',
    photo: null,
    consentGiven: false,
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState({ month: '', day: '', year: '' });

  const relationships = ['Mother', 'Father', 'Spouse', 'Son', 'Daughter', 'Sibling', 'Grandparent', 'Other'];
  const genders = ['Male', 'Female', 'Other'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const pickImage = async () => {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Take Photo',
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission Required', 'Camera permission is needed');
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.5,
            });

            if (!result.canceled) {
              setFormData({ ...formData, photo: result.assets[0].uri });
            }
          }
        },
        {
          text: 'Choose from Library',
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission Required', 'Photo library permission is needed');
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.5,
            });

            if (!result.canceled) {
              setFormData({ ...formData, photo: result.assets[0].uri });
            }
          }
        }
      ]
    );
  };

  const openDatePicker = () => {
    // If there's existing date, parse it
    if (formData.dateOfBirth) {
      const [month, day, year] = formData.dateOfBirth.split('/');
      setTempDate({ month, day, year });
    } else {
      setTempDate({ month: '', day: '', year: '' });
    }
    setShowDatePicker(true);
  };

  const handleDateConfirm = () => {
    if (tempDate.month && tempDate.day && tempDate.year) {
      const formattedDate = `${tempDate.month}/${tempDate.day}/${tempDate.year}`;
      setFormData({ ...formData, dateOfBirth: formattedDate });
      setShowDatePicker(false);
    } else {
      Alert.alert('Incomplete Date', 'Please select month, day, and year');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Missing Information', 'Please enter the family member\'s name');
      return false;
    }

    if (!formData.accountId.trim()) {
      Alert.alert('Missing Information', 'Please enter the patient account ID');
      return false;
    }

    // Validate account ID format (example: TMX-123456)
    const accountIdRegex = /^TMX-\d{6}$/;
    if (!accountIdRegex.test(formData.accountId)) {
      Alert.alert('Invalid Account ID', 'Account ID must be in format: TMX-123456 (TMX followed by 6 digits)');
      return false;
    }

    if (!formData.dateOfBirth) {
      Alert.alert('Missing Information', 'Please enter date of birth');
      return false;
    }

    // Validate date format (MM/DD/YYYY)
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!dateRegex.test(formData.dateOfBirth)) {
      Alert.alert('Invalid Date', 'Please enter date in MM/DD/YYYY format');
      return false;
    }

    // Validate that the date is not in the future
    const [month, day, year] = formData.dateOfBirth.split('/');
    const birthDate = new Date(year, month - 1, day);
    if (birthDate > new Date()) {
      Alert.alert('Invalid Date', 'Date of birth cannot be in the future');
      return false;
    }

    if (!formData.consentGiven) {
      Alert.alert('Consent Required', 'Please confirm that you have consent to manage this person\'s medical information');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    try {
      addFamilyMember(formData);
      Alert.alert(
        'Success',
        `${formData.name} has been added to your family members!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add family member. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Family Member</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            {formData.photo ? (
              <View style={styles.photoPreview}>
                <Text style={styles.photoEmoji}>📷</Text>
              </View>
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera" size={32} color={argonTheme.colors.muted} />
                <Text style={styles.photoText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {/* Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Full Name *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>
          </View>

          {/* Patient Account ID */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Patient Account ID *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                placeholder="Enter patient account ID"
                placeholderTextColor={argonTheme.colors.muted}
                value={formData.accountId}
                onChangeText={(text) => setFormData({ ...formData, accountId: text.toUpperCase() })}
                autoCapitalize="characters"
              />
            </View>
            <Text style={styles.fieldHint}>
              This links to their existing patient account (e.g., TMX-123456)
            </Text>
          </View>

          {/* Relationship */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Relationship *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {relationships.map((rel) => (
                <TouchableOpacity
                  key={rel}
                  style={[
                    styles.chip,
                    formData.relationship === rel && styles.chipSelected
                  ]}
                  onPress={() => setFormData({ ...formData, relationship: rel })}
                >
                  {formData.relationship === rel ? (
                    <LinearGradient
                      colors={gradient}
                      style={styles.chipGradient}
                    >
                      <Text style={styles.chipTextActive}>{rel}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.chipText}>{rel}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Date of Birth */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Date of Birth *</Text>
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={openDatePicker}
            >
              <Ionicons name="calendar-outline" size={20} color={argonTheme.colors.muted} />
              <Text style={[
                styles.datePickerText,
                !formData.dateOfBirth && styles.datePickerPlaceholder
              ]}>
                {formData.dateOfBirth || 'Select Date of Birth'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={argonTheme.colors.muted} />
            </TouchableOpacity>
            <Text style={styles.fieldHint}>Tap to select date</Text>
          </View>

          {/* Gender */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Gender *</Text>
            <View style={styles.chipRow}>
              {genders.map((gen) => (
                <TouchableOpacity
                  key={gen}
                  style={[
                    styles.chipLarge,
                    formData.gender === gen && styles.chipLargeSelected
                  ]}
                  onPress={() => setFormData({ ...formData, gender: gen })}
                >
                  {formData.gender === gen ? (
                    <LinearGradient
                      colors={gradient}
                      style={styles.chipLargeGradient}
                    >
                      <Text style={styles.chipTextActive}>{gen}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.chipText}>{gen}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Blood Type */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Blood Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {bloodTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.chip,
                    formData.bloodType === type && styles.chipSelected
                  ]}
                  onPress={() => setFormData({ ...formData, bloodType: type })}
                >
                  {formData.bloodType === type ? (
                    <LinearGradient
                      colors={gradient}
                      style={styles.chipGradient}
                    >
                      <Text style={styles.chipTextActive}>{type}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={styles.chipText}>{type}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Consent */}
          <TouchableOpacity
            style={styles.consentContainer}
            onPress={() => setFormData({ ...formData, consentGiven: !formData.consentGiven })}
          >
            <Ionicons
              name={formData.consentGiven ? 'checkbox' : 'square-outline'}
              size={24}
              color={formData.consentGiven ? primaryColor : argonTheme.colors.muted}
            />
            <Text style={styles.consentText}>
              I have consent to manage their medical information and appointments
            </Text>
          </TouchableOpacity>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark" size={20} color={argonTheme.colors.info} />
            <Text style={styles.infoText}>
              By adding a family member, you'll be able to book appointments, view lab results, and manage prescriptions on their behalf.
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <LinearGradient colors={gradient} style={styles.submitGradient}>
              <Ionicons name="checkmark-circle" size={20} color={argonTheme.colors.white} />
              <Text style={styles.submitText}>Add Family Member</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.datePickerModal}>
            <View style={styles.datePickerHeader}>
              <Text style={styles.datePickerTitle}>Select Date of Birth</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close-circle" size={28} color={argonTheme.colors.muted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.datePickerContent}>
              {/* Month */}
              <Text style={styles.datePickerLabel}>Month</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                {months.map((m) => (
                  <TouchableOpacity
                    key={m.value}
                    style={[
                      styles.dateChip,
                      tempDate.month === m.value && styles.dateChipSelected
                    ]}
                    onPress={() => setTempDate({ ...tempDate, month: m.value })}
                  >
                    {tempDate.month === m.value ? (
                      <LinearGradient
                        colors={gradient}
                        style={styles.dateChipGradient}
                      >
                        <Text style={styles.dateChipTextActive}>{m.label}</Text>
                      </LinearGradient>
                    ) : (
                      <Text style={styles.dateChipText}>{m.label}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Day */}
              <Text style={styles.datePickerLabel}>Day</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                {Array.from({ length: 31 }, (_, i) => {
                  const day = String(i + 1).padStart(2, '0');
                  return (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dateChip,
                        tempDate.day === day && styles.dateChipSelected
                      ]}
                      onPress={() => setTempDate({ ...tempDate, day })}
                    >
                      {tempDate.day === day ? (
                        <LinearGradient
                          colors={gradient}
                          style={styles.dateChipGradient}
                        >
                          <Text style={styles.dateChipTextActive}>{day}</Text>
                        </LinearGradient>
                      ) : (
                        <Text style={styles.dateChipText}>{day}</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Year */}
              <Text style={styles.datePickerLabel}>Year</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = String(new Date().getFullYear() - i);
                  return (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.dateChip,
                        tempDate.year === year && styles.dateChipSelected
                      ]}
                      onPress={() => setTempDate({ ...tempDate, year })}
                    >
                      {tempDate.year === year ? (
                        <LinearGradient
                          colors={gradient}
                          style={styles.dateChipGradient}
                        >
                          <Text style={styles.dateChipTextActive}>{year}</Text>
                        </LinearGradient>
                      ) : (
                        <Text style={styles.dateChipText}>{year}</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Selected Date Preview */}
              {(tempDate.month || tempDate.day || tempDate.year) && (
                <View style={styles.datePreview}>
                  <Ionicons name="calendar" size={20} color={primaryColor} />
                  <Text style={styles.datePreviewText}>
                    {tempDate.month && tempDate.day && tempDate.year
                      ? `${tempDate.month}/${tempDate.day}/${tempDate.year}`
                      : 'Select month, day, and year'}
                  </Text>
                </View>
              )}
            </ScrollView>

            {/* Confirm Button */}
            <TouchableOpacity onPress={handleDateConfirm} style={styles.dateConfirmButton}>
              <LinearGradient colors={gradient} style={styles.dateConfirmGradient}>
                <Ionicons name="checkmark-circle" size={20} color={argonTheme.colors.white} />
                <Text style={styles.dateConfirmText}>Confirm Date</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  photoButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  photoPreview: {
    width: 100,
    height: 100,
    backgroundColor: argonTheme.colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: argonTheme.colors.primary,
  },
  photoEmoji: {
    fontSize: 40,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: argonTheme.colors.background,
    borderWidth: 2,
    borderColor: argonTheme.colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 12,
    color: argonTheme.colors.muted,
    marginTop: 4,
  },
  form: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 8,
  },
  fieldHint: {
    fontSize: 11,
    color: argonTheme.colors.muted,
    marginTop: 4,
    marginLeft: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    ...argonTheme.shadows.sm,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: argonTheme.colors.text,
    marginLeft: 10,
  },
  chipScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  chip: {
    borderRadius: argonTheme.borderRadius.full,
    backgroundColor: argonTheme.colors.white,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    marginRight: 8,
    overflow: 'hidden',
    ...argonTheme.shadows.sm,
  },
  chipSelected: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  chipGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: argonTheme.borderRadius.full,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10,
  },
  chipLarge: {
    flex: 1,
    borderRadius: argonTheme.borderRadius.md,
    backgroundColor: argonTheme.colors.white,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    overflow: 'hidden',
    ...argonTheme.shadows.sm,
  },
  chipLargeSelected: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  chipLargeGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: argonTheme.borderRadius.md,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipTextActive: {
    color: argonTheme.colors.white,
    fontWeight: 'bold',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    ...argonTheme.shadows.sm,
    gap: 10,
  },
  datePickerText: {
    flex: 1,
    fontSize: 15,
    color: argonTheme.colors.text,
    fontWeight: '500',
  },
  datePickerPlaceholder: {
    color: argonTheme.colors.muted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  datePickerModal: {
    backgroundColor: argonTheme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    ...argonTheme.shadows.lg,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border + '30',
  },
  datePickerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  datePickerContent: {
    padding: 16,
  },
  datePickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
  dateScroll: {
    marginBottom: 8,
  },
  dateChip: {
    borderRadius: argonTheme.borderRadius.md,
    backgroundColor: argonTheme.colors.background,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    marginRight: 8,
    minWidth: 60,
    overflow: 'hidden',
  },
  dateChipSelected: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  dateChipGradient: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: argonTheme.borderRadius.md,
  },
  dateChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  dateChipTextActive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  datePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 14,
    marginTop: 16,
    gap: 10,
  },
  datePreviewText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  dateConfirmButton: {
    margin: 16,
    marginTop: 8,
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
  },
  dateConfirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  dateConfirmText: {
    color: argonTheme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    padding: 14,
    marginBottom: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  consentText: {
    flex: 1,
    fontSize: 13,
    color: argonTheme.colors.text,
    lineHeight: 18,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: argonTheme.colors.info + '10',
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.info,
    borderRadius: argonTheme.borderRadius.md,
    padding: 12,
    marginBottom: 24,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: argonTheme.colors.text,
    lineHeight: 18,
  },
  submitButton: {
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
    marginBottom: 24,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  submitText: {
    color: argonTheme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

