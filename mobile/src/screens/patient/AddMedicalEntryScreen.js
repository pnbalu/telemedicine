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

export default function AddMedicalEntryScreen({ navigation, route }) {
  const { gradient } = useTheme();
  const { entryType = 'conditions' } = route.params || {};
  
  // Map plural tab names to singular entry types
  const typeMapping = {
    'conditions': 'condition',
    'allergies': 'allergy',
    'surgeries': 'surgery',
    'family': 'family',
  };
  
  const mappedType = typeMapping[entryType] || 'condition';
  
  const [formData, setFormData] = useState({
    // For Conditions
    conditionName: '',
    since: '',
    status: 'Ongoing',
    
    // For Allergies
    allergyName: '',
    severity: 'Mild',
    reaction: '',
    
    // For Surgeries
    surgeryName: '',
    date: '',
    hospital: '',
    
    // For Family History
    relation: '',
    familyCondition: '',
    age: '',
  });

  const entryTypes = {
    condition: { title: 'Condition', icon: 'medical', color: argonTheme.colors.danger },
    allergy: { title: 'Allergy', icon: 'alert-circle', color: argonTheme.colors.warning },
    surgery: { title: 'Surgery', icon: 'cut', color: argonTheme.colors.info },
    family: { title: 'Family History', icon: 'people', color: argonTheme.colors.primary },
  };

  const [selectedType, setSelectedType] = useState(mappedType);
  const currentType = entryTypes[selectedType] || entryTypes['condition'];

  const handleSave = () => {
    // Basic validation
    let isValid = false;
    let message = '';

    switch(selectedType) {
      case 'condition':
        isValid = formData.conditionName.trim() && formData.since.trim();
        message = isValid ? 'Medical condition added successfully!' : 'Please fill in condition name and year';
        break;
      case 'allergy':
        isValid = formData.allergyName.trim() && formData.reaction.trim();
        message = isValid ? 'Allergy added successfully!' : 'Please fill in allergy name and reaction';
        break;
      case 'surgery':
        isValid = formData.surgeryName.trim() && formData.date.trim();
        message = isValid ? 'Surgery record added successfully!' : 'Please fill in surgery name and date';
        break;
      case 'family':
        isValid = formData.relation.trim() && formData.familyCondition.trim();
        message = isValid ? 'Family history added successfully!' : 'Please fill in relation and condition';
        break;
    }

    if (isValid) {
      Alert.alert('Success', message, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Required Fields', message);
    }
  };

  const renderConditionForm = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Condition Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Hypertension, Diabetes"
          placeholderTextColor={argonTheme.colors.muted}
          value={formData.conditionName}
          onChangeText={(text) => setFormData({ ...formData, conditionName: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Since (Year) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 2020"
          placeholderTextColor={argonTheme.colors.muted}
          value={formData.since}
          onChangeText={(text) => setFormData({ ...formData, since: text })}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusOptions}>
          {['Ongoing', 'Controlled', 'Resolved'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusOption,
                formData.status === status && { 
                  backgroundColor: gradient[0],
                  borderColor: gradient[0],
                }
              ]}
              onPress={() => setFormData({ ...formData, status })}
            >
              <Text style={[
                styles.statusOptionText,
                formData.status === status && styles.statusOptionTextActive
              ]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );

  const renderAllergyForm = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Allergy Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Penicillin, Peanuts"
          placeholderTextColor={argonTheme.colors.muted}
          value={formData.allergyName}
          onChangeText={(text) => setFormData({ ...formData, allergyName: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Severity</Text>
        <View style={styles.statusOptions}>
          {['Mild', 'Moderate', 'Severe'].map((severity) => (
            <TouchableOpacity
              key={severity}
              style={[
                styles.statusOption,
                formData.severity === severity && { 
                  backgroundColor: gradient[0],
                  borderColor: gradient[0],
                }
              ]}
              onPress={() => setFormData({ ...formData, severity })}
            >
              <Text style={[
                styles.statusOptionText,
                formData.severity === severity && styles.statusOptionTextActive
              ]}>
                {severity}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Reaction *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Hives, Anaphylaxis"
          placeholderTextColor={argonTheme.colors.muted}
          value={formData.reaction}
          onChangeText={(text) => setFormData({ ...formData, reaction: text })}
        />
      </View>
    </>
  );

  const renderSurgeryForm = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Surgery Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Appendectomy"
          placeholderTextColor={argonTheme.colors.muted}
          value={formData.surgeryName}
          onChangeText={(text) => setFormData({ ...formData, surgeryName: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Mar 2020"
          placeholderTextColor={argonTheme.colors.muted}
          value={formData.date}
          onChangeText={(text) => setFormData({ ...formData, date: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hospital/Facility</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., City Hospital"
          placeholderTextColor={argonTheme.colors.muted}
          value={formData.hospital}
          onChangeText={(text) => setFormData({ ...formData, hospital: text })}
        />
      </View>
    </>
  );

  const renderFamilyForm = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Relation *</Text>
        <View style={styles.statusOptions}>
          {['Father', 'Mother', 'Sibling', 'Grandparent', 'Other'].map((rel) => (
            <TouchableOpacity
              key={rel}
              style={[
                styles.statusOption,
                formData.relation === rel && { 
                  backgroundColor: gradient[0],
                  borderColor: gradient[0],
                }
              ]}
              onPress={() => setFormData({ ...formData, relation: rel })}
            >
              <Text style={[
                styles.statusOptionText,
                formData.relation === rel && styles.statusOptionTextActive
              ]}>
                {rel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Condition *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Heart Disease, Diabetes"
          placeholderTextColor={argonTheme.colors.muted}
          value={formData.familyCondition}
          onChangeText={(text) => setFormData({ ...formData, familyCondition: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age at Diagnosis</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 55"
          placeholderTextColor={argonTheme.colors.muted}
          value={formData.age}
          onChangeText={(text) => setFormData({ ...formData, age: text })}
          keyboardType="numeric"
        />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close" size={28} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add {currentType.title}</Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Entry Type Selector */}
        <View style={styles.typeSelector}>
          <Text style={styles.sectionTitle}>Entry Type</Text>
          <View style={styles.typeGrid}>
            {Object.entries(entryTypes).map(([key, type]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.typeCard,
                  selectedType === key && styles.typeCardActive
                ]}
                onPress={() => setSelectedType(key)}
              >
                {selectedType === key ? (
                  <LinearGradient
                    colors={gradient}
                    style={styles.typeCardGradient}
                  >
                    <Ionicons name={type.icon} size={28} color={argonTheme.colors.white} />
                    <Text style={styles.typeCardTextActive}>{type.title}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.typeCardContent}>
                    <Ionicons name={type.icon} size={28} color={type.color} />
                    <Text style={styles.typeCardText}>{type.title}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <View style={[styles.formIcon, { backgroundColor: currentType.color + '20' }]}>
              <Ionicons name={currentType.icon} size={24} color={currentType.color} />
            </View>
            <Text style={styles.formTitle}>{currentType.title} Details</Text>
          </View>

          {selectedType === 'condition' && renderConditionForm()}
          {selectedType === 'allergy' && renderAllergyForm()}
          {selectedType === 'surgery' && renderSurgeryForm()}
          {selectedType === 'family' && renderFamilyForm()}
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={20} color={argonTheme.colors.info} />
          <Text style={styles.infoText}>
            This information helps your doctor provide better care. All fields marked with * are required.
          </Text>
        </View>

        {/* Action Buttons */}
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
              <Text style={styles.saveButtonText}>Save Entry</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-circle-outline" size={20} color={argonTheme.colors.danger} />
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  typeSelector: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 16,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '48%',
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    backgroundColor: argonTheme.colors.white,
  },
  typeCardActive: {
    borderColor: 'transparent',
  },
  typeCardContent: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 8,
  },
  typeCardGradient: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 8,
  },
  typeCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
    textAlign: 'center',
  },
  typeCardTextActive: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.white,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 20,
    marginBottom: 20,
    ...argonTheme.shadows.md,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
    gap: 12,
  },
  formIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 14,
    fontSize: 15,
    color: argonTheme.colors.text,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  statusOptions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  statusOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: argonTheme.borderRadius.full,
    backgroundColor: argonTheme.colors.white,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
  },
  statusOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  statusOptionTextActive: {
    color: argonTheme.colors.white,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.info + '15',
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.info,
    borderRadius: argonTheme.borderRadius.md,
    padding: 14,
    marginBottom: 20,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: argonTheme.colors.info,
    lineHeight: 18,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 40,
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
});

