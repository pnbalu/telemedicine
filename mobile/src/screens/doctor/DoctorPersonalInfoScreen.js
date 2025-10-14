import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function DoctorPersonalInfoScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    fullName: user?.name || 'Dr. Alice Smith',
    specialty: user?.specialty || 'Cardiologist',
    licenseNumber: 'MD-123456',
    email: user?.email || 'alice.smith@telemedicx.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '03/15/1985',
    gender: 'Female',
    hospitalAffiliation: 'City General Hospital',
    department: 'Cardiology',
    yearsOfExperience: '12',
    education: 'MD, Harvard Medical School',
    certifications: 'Board Certified in Cardiology, ACLS',
    languages: 'English, Spanish',
    availability: 'Mon-Fri, 9AM-5PM',
    consultationFee: '$150',
  });

  const pickImage = async () => {
    Alert.alert(
      'Change Photo',
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
              quality: 0.7,
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
              quality: 0.7,
            });

            if (!result.canceled) {
              setFormData({ ...formData, photo: result.assets[0].uri });
            }
          }
        }
      ]
    );
  };

  const handleSave = () => {
    Alert.alert(
      'Save Changes',
      'Are you sure you want to save these changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: () => {
            setIsEditing(false);
            Alert.alert('Success', 'Your profile has been updated successfully!');
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color={argonTheme.colors.white} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image source={{ uri: formData.photo }} style={styles.photo} />
            {isEditing && (
              <TouchableOpacity style={styles.photoEditButton} onPress={pickImage}>
                <LinearGradient colors={gradient} style={styles.photoEditGradient}>
                  <Ionicons name="camera" size={18} color={argonTheme.colors.white} />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
          {isEditing && <Text style={styles.photoHint}>Tap to change photo</Text>}
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="person-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                editable={isEditing}
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Specialty</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="medical-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.specialty}
                onChangeText={(text) => setFormData({ ...formData, specialty: text })}
                editable={isEditing}
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Medical License Number</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="document-text-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.licenseNumber}
                onChangeText={(text) => setFormData({ ...formData, licenseNumber: text })}
                editable={isEditing}
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.fieldGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.fieldLabel}>Date of Birth</Text>
              <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
                <Ionicons name="calendar-outline" size={20} color={argonTheme.colors.muted} />
                <TextInput
                  style={styles.input}
                  value={formData.dateOfBirth}
                  onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                  editable={isEditing}
                  placeholderTextColor={argonTheme.colors.muted}
                />
              </View>
            </View>

            <View style={[styles.fieldGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.fieldLabel}>Gender</Text>
              <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
                <TextInput
                  style={[styles.input, { paddingLeft: 16 }]}
                  value={formData.gender}
                  onChangeText={(text) => setFormData({ ...formData, gender: text })}
                  editable={isEditing}
                  placeholderTextColor={argonTheme.colors.muted}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="mail-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                editable={isEditing}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="call-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                editable={isEditing}
                keyboardType="phone-pad"
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>
        </View>

        {/* Professional Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Details</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Hospital Affiliation</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="business-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.hospitalAffiliation}
                onChangeText={(text) => setFormData({ ...formData, hospitalAffiliation: text })}
                editable={isEditing}
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Department</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="briefcase-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.department}
                onChangeText={(text) => setFormData({ ...formData, department: text })}
                editable={isEditing}
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Years of Experience</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="trophy-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.yearsOfExperience}
                onChangeText={(text) => setFormData({ ...formData, yearsOfExperience: text })}
                editable={isEditing}
                keyboardType="numeric"
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Education</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="school-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.education}
                onChangeText={(text) => setFormData({ ...formData, education: text })}
                editable={isEditing}
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Certifications</Text>
            <TextInput
              style={[styles.textArea, !isEditing && styles.textAreaDisabled]}
              value={formData.certifications}
              onChangeText={(text) => setFormData({ ...formData, certifications: text })}
              editable={isEditing}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholderTextColor={argonTheme.colors.muted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Languages Spoken</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="language-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.languages}
                onChangeText={(text) => setFormData({ ...formData, languages: text })}
                editable={isEditing}
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>
        </View>

        {/* Practice Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice Information</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Availability</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="time-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.availability}
                onChangeText={(text) => setFormData({ ...formData, availability: text })}
                editable={isEditing}
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Consultation Fee</Text>
            <View style={[styles.inputContainer, !isEditing && styles.inputDisabled]}>
              <Ionicons name="cash-outline" size={20} color={argonTheme.colors.muted} />
              <TextInput
                style={styles.input}
                value={formData.consultationFee}
                onChangeText={(text) => setFormData({ ...formData, consultationFee: text })}
                editable={isEditing}
                placeholderTextColor={argonTheme.colors.muted}
              />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <LinearGradient colors={gradient} style={styles.saveGradient}>
                <Ionicons name="checkmark-circle" size={20} color={argonTheme.colors.white} />
                <Text style={styles.saveButtonText}>Save Changes</Text>
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
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  editButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  photoContainer: {
    position: 'relative',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: argonTheme.colors.white,
    ...argonTheme.shadows.lg,
  },
  photoEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 18,
    overflow: 'hidden',
  },
  photoEditGradient: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoHint: {
    fontSize: 12,
    color: argonTheme.colors.muted,
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
    marginBottom: 8,
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
  inputDisabled: {
    backgroundColor: argonTheme.colors.background,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: argonTheme.colors.text,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
  },
  textArea: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    padding: 14,
    fontSize: 14,
    color: argonTheme.colors.text,
    minHeight: 80,
    ...argonTheme.shadows.sm,
  },
  textAreaDisabled: {
    backgroundColor: argonTheme.colors.background,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  saveButton: {
    flex: 2,
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
});

