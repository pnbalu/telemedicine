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

export default function PersonalInfoScreen({ navigation }) {
  const { gradient } = useTheme();
  const [editing, setEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [originalData, setOriginalData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '01/15/1990',
    gender: 'Male',
    address: '123 Main St, New York, NY 10001',
    bloodType: 'O+',
    height: '5\'10"',
    weight: '170 lbs',
  });
  const [formData, setFormData] = useState({...originalData});

  const handleEdit = () => {
    setOriginalData({...formData}); // Save current as backup
    setEditing(true);
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
            setEditing(false);
            setOriginalData({...formData}); // Update backup
            // TODO: Save to backend
            Alert.alert('Success', 'Profile updated successfully!');
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Discard',
          style: 'destructive',
          onPress: () => {
            setFormData({...originalData}); // Restore backup
            setEditing(false);
          }
        }
      ]
    );
  };

  const pickImage = async () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Take Photo',
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission Required', 'Camera permission is needed to take photos');
              return;
            }

                  const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ['images'],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                  });

            if (!result.canceled) {
              setProfilePhoto(result.assets[0].uri);
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
                    quality: 0.8,
                  });

            if (!result.canceled) {
              setProfilePhoto(result.assets[0].uri);
            }
          }
        }
      ]
    );
  };

  const renderField = (label, field, icon, keyboardType = 'default') => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <Ionicons name={icon} size={20} color={editing ? gradient[0] : argonTheme.colors.primary} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      {editing ? (
        <TextInput
          style={styles.input}
          value={formData[field]}
          onChangeText={(text) => setFormData({ ...formData, [field]: text })}
          keyboardType={keyboardType}
          editable={editing}
        />
      ) : (
        <Text style={styles.fieldValue}>{formData[field]}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => editing ? handleCancel() : navigation.goBack()} style={styles.backButton}>
            <Ionicons name={editing ? "close" : "arrow-back"} size={24} color={argonTheme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Information</Text>
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Ionicons 
              name="create-outline" 
              size={24} 
              color={argonTheme.colors.white} 
            />
          </TouchableOpacity>
        </View>

        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <TouchableOpacity 
              style={styles.avatar}
              onPress={editing ? pickImage : null}
              disabled={!editing}
            >
              {profilePhoto ? (
                <Image source={{ uri: profilePhoto }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>JD</Text>
              )}
            </TouchableOpacity>
            {editing && (
              <TouchableOpacity 
                style={styles.editPhotoButton}
                onPress={pickImage}
              >
                <Ionicons name="camera" size={16} color={argonTheme.colors.white} />
              </TouchableOpacity>
            )}
          </View>
          {editing && (
            <Text style={styles.photoHint}>Tap avatar or camera icon to change photo</Text>
          )}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          {renderField('Full Name', 'fullName', 'person-outline', 'default')}
          {renderField('Email', 'email', 'mail-outline', 'email-address')}
          {renderField('Phone', 'phone', 'call-outline', 'phone-pad')}
          {renderField('Date of Birth', 'dateOfBirth', 'calendar-outline', 'default')}
          {renderField('Gender', 'gender', 'male-female-outline', 'default')}
          {renderField('Address', 'address', 'location-outline', 'default')}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Health Information</Text>
          {renderField('Blood Type', 'bloodType', 'water-outline', 'default')}
          {renderField('Height', 'height', 'resize-outline', 'default')}
          {renderField('Weight', 'weight', 'fitness-outline', 'numeric')}
        </View>

        {editing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <LinearGradient
                colors={gradient}
                style={styles.saveButtonGradient}
              >
                <Ionicons name="checkmark-circle" size={20} color={argonTheme.colors.white} />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={handleCancel}
            >
              <Ionicons name="close-circle-outline" size={20} color={argonTheme.colors.danger} />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Edit Mode Info Banner */}
        {editing && (
          <View style={styles.infoBanner}>
            <Ionicons name="information-circle" size={20} color={argonTheme.colors.info} />
            <Text style={styles.infoText}>
              Edit your information and tap "Save Changes" when done
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
    paddingBottom: 80,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
  },
  editButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    flex: 1,
    textAlign: 'center',
  },
  photoSection: {
    alignItems: 'center',
  },
  photoContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: argonTheme.colors.white,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: argonTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: argonTheme.colors.white,
    ...argonTheme.shadows.md,
  },
  photoHint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 10,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginTop: -60,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 20,
    marginBottom: 16,
    ...argonTheme.shadows.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.textMuted,
  },
  fieldValue: {
    fontSize: 16,
    color: argonTheme.colors.text,
    paddingLeft: 28,
  },
  input: {
    fontSize: 16,
    color: argonTheme.colors.text,
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 12,
    marginLeft: 28,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  saveButton: {
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  saveButtonText: {
    color: argonTheme.colors.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: argonTheme.colors.danger,
    gap: 8,
  },
  cancelButtonText: {
    color: argonTheme.colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.info + '15',
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.info,
    borderRadius: argonTheme.borderRadius.md,
    padding: 14,
    marginTop: 16,
    marginBottom: 24,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: argonTheme.colors.info,
    lineHeight: 18,
  },
});

