import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';

export default function InsuranceScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('primary');
  const [editing, setEditing] = useState(false);

  const [primaryInsurance, setPrimaryInsurance] = useState({
    provider: 'Blue Cross Blue Shield',
    policyNumber: 'BCBS-123456789',
    groupNumber: 'GRP-987654',
    memberName: 'John Doe',
    memberId: 'MBR-445566',
    planType: 'PPO',
    effectiveDate: '01/01/2023',
    copay: '$25',
    deductible: '$1,500',
    phoneNumber: '1-800-123-4567',
  });

  const [secondaryInsurance, setSecondaryInsurance] = useState({
    provider: 'Aetna',
    policyNumber: 'AET-987654321',
    groupNumber: 'GRP-123456',
    memberName: 'John Doe',
    memberId: 'MBR-778899',
    planType: 'HMO',
    effectiveDate: '01/01/2023',
    copay: '$15',
    deductible: '$500',
    phoneNumber: '1-800-987-6543',
  });

  const handleSave = () => {
    setEditing(false);
    alert('Insurance information updated successfully!');
  };

  const handleUploadCard = (type) => {
    alert(`Upload ${type} insurance card photo`);
  };

  const renderField = (label, value, onChange, icon, insuranceType) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <Ionicons name={icon} size={18} color={argonTheme.colors.primary} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      {editing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) => {
            if (insuranceType === 'primary') {
              setPrimaryInsurance({ ...primaryInsurance, [onChange]: text });
            } else {
              setSecondaryInsurance({ ...secondaryInsurance, [onChange]: text });
            }
          }}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  const renderInsuranceForm = (insurance, type) => (
    <View>
      {/* Insurance Card */}
      <View style={styles.cardPreview}>
        <LinearGradient
          colors={type === 'primary' ? argonTheme.colors.gradientPrimary : argonTheme.colors.gradientSuccess}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardProvider}>{insurance.provider}</Text>
            <View style={[styles.cardBadge, { backgroundColor: type === 'primary' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.3)' }]}>
              <Text style={styles.cardBadgeText}>{type === 'primary' ? 'Primary' : 'Secondary'}</Text>
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>Member ID</Text>
            <Text style={styles.cardNumber}>{insurance.memberId}</Text>
            
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>Plan</Text>
                <Text style={styles.cardFooterText}>{insurance.planType}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>Copay</Text>
                <Text style={styles.cardFooterText}>{insurance.copay}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.uploadCardButton}
            onPress={() => handleUploadCard(type)}
          >
            <Ionicons name="camera" size={16} color={argonTheme.colors.white} />
            <Text style={styles.uploadCardText}>Upload Card Photo</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Insurance Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Insurance Details</Text>
        {renderField('Insurance Provider', insurance.provider, 'provider', 'business-outline', type)}
        {renderField('Policy Number', insurance.policyNumber, 'policyNumber', 'document-text-outline', type)}
        {renderField('Group Number', insurance.groupNumber, 'groupNumber', 'people-outline', type)}
        {renderField('Member Name', insurance.memberName, 'memberName', 'person-outline', type)}
        {renderField('Member ID', insurance.memberId, 'memberId', 'card-outline', type)}
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Coverage Information</Text>
        {renderField('Plan Type', insurance.planType, 'planType', 'shield-checkmark-outline', type)}
        {renderField('Effective Date', insurance.effectiveDate, 'effectiveDate', 'calendar-outline', type)}
        {renderField('Copay', insurance.copay, 'copay', 'cash-outline', type)}
        {renderField('Deductible', insurance.deductible, 'deductible', 'wallet-outline', type)}
        {renderField('Contact Number', insurance.phoneNumber, 'phoneNumber', 'call-outline', type)}
      </View>

      {/* Verification Status */}
      <View style={styles.verificationCard}>
        <View style={styles.verificationIcon}>
          <Ionicons name="checkmark-circle" size={32} color={argonTheme.colors.success} />
        </View>
        <View style={styles.verificationContent}>
          <Text style={styles.verificationTitle}>Insurance Verified</Text>
          <Text style={styles.verificationText}>Last verified on Oct 10, 2025</Text>
        </View>
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Re-verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={argonTheme.colors.gradientInfo}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Insurance Details</Text>
          <TouchableOpacity onPress={editing ? handleSave : () => setEditing(true)}>
            <Ionicons 
              name={editing ? 'checkmark' : 'create-outline'} 
              size={24} 
              color={argonTheme.colors.white} 
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'primary' && styles.activeTab]}
          onPress={() => setActiveTab('primary')}
        >
          <Ionicons 
            name="shield-checkmark" 
            size={20} 
            color={activeTab === 'primary' ? argonTheme.colors.white : argonTheme.colors.primary} 
          />
          <Text style={[styles.tabText, activeTab === 'primary' && styles.activeTabText]}>
            Primary Insurance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'secondary' && styles.activeTab]}
          onPress={() => setActiveTab('secondary')}
        >
          <Ionicons 
            name="shield-half" 
            size={20} 
            color={activeTab === 'secondary' ? argonTheme.colors.white : argonTheme.colors.success} 
          />
          <Text style={[styles.tabText, activeTab === 'secondary' && styles.activeTabText]}>
            Secondary Insurance
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'primary' && renderInsuranceForm(primaryInsurance, 'primary')}
        {activeTab === 'secondary' && renderInsuranceForm(secondaryInsurance, 'secondary')}

        {editing && (
          <TouchableOpacity style={styles.cancelButton} onPress={() => setEditing(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
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
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    flex: 1,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: argonTheme.borderRadius.lg,
    backgroundColor: argonTheme.colors.white,
    gap: 8,
    ...argonTheme.shadows.sm,
  },
  activeTab: {
    backgroundColor: argonTheme.colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  activeTabText: {
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardPreview: {
    marginBottom: 20,
  },
  cardGradient: {
    borderRadius: argonTheme.borderRadius.xl,
    padding: 20,
    ...argonTheme.shadows.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardProvider: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  cardBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.white,
  },
  cardBody: {
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 16,
    letterSpacing: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooterText: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.white,
  },
  uploadCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 10,
    gap: 8,
  },
  uploadCardText: {
    color: argonTheme.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 20,
    marginBottom: 16,
    ...argonTheme.shadows.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.textMuted,
  },
  fieldValue: {
    fontSize: 15,
    color: argonTheme.colors.text,
    paddingLeft: 26,
  },
  input: {
    fontSize: 15,
    color: argonTheme.colors.text,
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 12,
    marginLeft: 26,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  verificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.success + '10',
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 24,
  },
  verificationIcon: {
    marginRight: 12,
  },
  verificationContent: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.success,
    marginBottom: 2,
  },
  verificationText: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  verifyButton: {
    backgroundColor: argonTheme.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.success,
  },
  verifyButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.success,
  },
  cancelButton: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  cancelButtonText: {
    color: argonTheme.colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
});

