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
import * as ImagePicker from 'expo-image-picker';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function DoctorCredentialsScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const [credentials, setCredentials] = useState({
    medicalLicense: {
      number: 'MD-123456',
      issuingState: 'California',
      issueDate: '01/15/2010',
      expiryDate: '01/15/2026',
      status: 'Active',
      document: null,
    },
    boardCertifications: [
      {
        id: 1,
        specialty: 'Cardiology',
        board: 'American Board of Internal Medicine',
        certNumber: 'ABIM-789012',
        issueDate: '06/20/2012',
        expiryDate: '06/20/2026',
        status: 'Active',
      },
      {
        id: 2,
        specialty: 'Internal Medicine',
        board: 'American Board of Internal Medicine',
        certNumber: 'ABIM-345678',
        issueDate: '05/10/2010',
        expiryDate: '05/10/2025',
        status: 'Active',
      },
    ],
    deaLicense: {
      number: 'DEA-AB1234567',
      issueDate: '03/01/2015',
      expiryDate: '03/01/2025',
      status: 'Active',
    },
    npiNumber: '1234567890',
    malpracticeInsurance: {
      provider: 'Medical Protective',
      policyNumber: 'MP-987654321',
      coverage: '$1,000,000 / $3,000,000',
      expiryDate: '12/31/2025',
      status: 'Active',
    },
  });

  const uploadDocument = async (docType) => {
    Alert.alert(
      'Upload Document',
      'Choose document source',
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
              quality: 0.8,
            });

            if (!result.canceled) {
              Alert.alert('Success', 'Document uploaded successfully');
            }
          }
        },
        {
          text: 'Choose File',
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission Required', 'Library permission is needed');
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: false,
              quality: 0.8,
            });

            if (!result.canceled) {
              Alert.alert('Success', 'Document uploaded successfully');
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return argonTheme.colors.success;
      case 'Expiring Soon': return argonTheme.colors.warning;
      case 'Expired': return argonTheme.colors.danger;
      default: return argonTheme.colors.muted;
    }
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
            Alert.alert('Success', 'Your credentials have been updated successfully!');
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
        <Text style={styles.headerTitle}>License & Credentials</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color={argonTheme.colors.white} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Medical License */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: primaryColor + '15' }]}>
              <Ionicons name="shield-checkmark" size={24} color={primaryColor} />
            </View>
            <Text style={styles.sectionTitle}>Medical License</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>License Number</Text>
              <Text style={styles.credentialValue}>{credentials.medicalLicense.number}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Issuing State</Text>
              <Text style={styles.credentialValue}>{credentials.medicalLicense.issuingState}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Issue Date</Text>
              <Text style={styles.credentialValue}>{credentials.medicalLicense.issueDate}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Expiry Date</Text>
              <Text style={styles.credentialValue}>{credentials.medicalLicense.expiryDate}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(credentials.medicalLicense.status) + '15' }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(credentials.medicalLicense.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(credentials.medicalLicense.status) }]}>
                  {credentials.medicalLicense.status}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={() => uploadDocument('license')}
            >
              <Ionicons name="cloud-upload-outline" size={18} color={primaryColor} />
              <Text style={[styles.uploadText, { color: primaryColor }]}>
                {credentials.medicalLicense.document ? 'Replace Document' : 'Upload License Document'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Board Certifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: argonTheme.colors.info + '15' }]}>
              <Ionicons name="ribbon" size={24} color={argonTheme.colors.info} />
            </View>
            <Text style={styles.sectionTitle}>Board Certifications</Text>
          </View>

          {credentials.boardCertifications.map((cert) => (
            <View key={cert.id} style={styles.card}>
              <View style={styles.certHeader}>
                <Text style={styles.certSpecialty}>{cert.specialty}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(cert.status) + '15' }]}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(cert.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(cert.status) }]}>
                    {cert.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.certBoard}>{cert.board}</Text>
              <View style={styles.certDetails}>
                <View style={styles.certDetailItem}>
                  <Text style={styles.certDetailLabel}>Cert Number</Text>
                  <Text style={styles.certDetailValue}>{cert.certNumber}</Text>
                </View>
                <View style={styles.certDetailItem}>
                  <Text style={styles.certDetailLabel}>Expires</Text>
                  <Text style={styles.certDetailValue}>{cert.expiryDate}</Text>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle-outline" size={20} color={primaryColor} />
            <Text style={[styles.addButtonText, { color: primaryColor }]}>Add Certification</Text>
          </TouchableOpacity>
        </View>

        {/* DEA License */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: argonTheme.colors.warning + '15' }]}>
              <Ionicons name="medical" size={24} color={argonTheme.colors.warning} />
            </View>
            <Text style={styles.sectionTitle}>DEA License</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>DEA Number</Text>
              <Text style={styles.credentialValue}>{credentials.deaLicense.number}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Issue Date</Text>
              <Text style={styles.credentialValue}>{credentials.deaLicense.issueDate}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Expiry Date</Text>
              <Text style={styles.credentialValue}>{credentials.deaLicense.expiryDate}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(credentials.deaLicense.status) + '15' }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(credentials.deaLicense.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(credentials.deaLicense.status) }]}>
                  {credentials.deaLicense.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* NPI Number */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: argonTheme.colors.success + '15' }]}>
              <Ionicons name="finger-print" size={24} color={argonTheme.colors.success} />
            </View>
            <Text style={styles.sectionTitle}>NPI Number</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>National Provider Identifier</Text>
              <Text style={styles.credentialValue}>{credentials.npiNumber}</Text>
            </View>
          </View>
        </View>

        {/* Malpractice Insurance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: argonTheme.colors.danger + '15' }]}>
              <Ionicons name="shield" size={24} color={argonTheme.colors.danger} />
            </View>
            <Text style={styles.sectionTitle}>Malpractice Insurance</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Provider</Text>
              <Text style={styles.credentialValue}>{credentials.malpracticeInsurance.provider}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Policy Number</Text>
              <Text style={styles.credentialValue}>{credentials.malpracticeInsurance.policyNumber}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Coverage</Text>
              <Text style={styles.credentialValue}>{credentials.malpracticeInsurance.coverage}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Expiry Date</Text>
              <Text style={styles.credentialValue}>{credentials.malpracticeInsurance.expiryDate}</Text>
            </View>
            <View style={styles.credentialRow}>
              <Text style={styles.credentialLabel}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(credentials.malpracticeInsurance.status) + '15' }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(credentials.malpracticeInsurance.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(credentials.malpracticeInsurance.status) }]}>
                  {credentials.malpracticeInsurance.status}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={() => uploadDocument('insurance')}
            >
              <Ionicons name="cloud-upload-outline" size={18} color={argonTheme.colors.danger} />
              <Text style={[styles.uploadText, { color: argonTheme.colors.danger }]}>Upload Insurance Certificate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Verification Info */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color={argonTheme.colors.info} />
          <Text style={styles.infoText}>
            All credentials are verified by our compliance team. Documents must be clear and current.
          </Text>
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
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
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  sectionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  card: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    marginBottom: 12,
    ...argonTheme.shadows.sm,
  },
  credentialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border + '20',
  },
  credentialLabel: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  credentialValue: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 12,
    marginTop: 12,
    gap: 8,
  },
  uploadText: {
    fontSize: 13,
    fontWeight: '600',
  },
  certHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  certSpecialty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  certBoard: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
    marginBottom: 12,
  },
  certDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  certDetailItem: {
    flex: 1,
  },
  certDetailLabel: {
    fontSize: 11,
    color: argonTheme.colors.muted,
    marginBottom: 4,
  },
  certDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: argonTheme.colors.border,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.info + '10',
    borderRadius: argonTheme.borderRadius.md,
    padding: 14,
    gap: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: argonTheme.colors.text,
    lineHeight: 18,
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

