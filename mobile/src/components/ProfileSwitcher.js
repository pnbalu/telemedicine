import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { argonTheme } from '../theme/argonTheme';
import { useTheme } from '../contexts/ThemeContext';
import { useFamilyContext } from '../contexts/FamilyContext';

export default function ProfileSwitcher({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const { activeProfile, familyMembers, switchProfile } = useFamilyContext();
  const [modalVisible, setModalVisible] = useState(false);

  const allProfiles = [
    {
      id: 'self',
      name: 'Me',
      type: 'self',
      relationship: null,
    },
    ...familyMembers.map(member => ({
      ...member,
      type: 'family',
    })),
  ];

  const getRelationshipIcon = (profile) => {
    if (profile.type === 'self') return 'person';
    
    const icons = {
      'Mother': 'woman',
      'Father': 'man',
      'Spouse': 'heart',
      'Son': 'male',
      'Daughter': 'female',
      'Sibling': 'people',
      'Grandparent': 'person',
      'Other': 'person-circle',
    };
    return icons[profile.relationship] || 'person';
  };

  const handleSwitchProfile = (profile) => {
    switchProfile(profile.id);
    setModalVisible(false);
  };

  return (
    <>
      {/* Profile Switcher Banner */}
      {activeProfile.type === 'family' && (
        <TouchableOpacity
          style={[styles.banner, { backgroundColor: primaryColor + '15' }]}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.bannerContent}>
            <Ionicons name="swap-horizontal" size={18} color={primaryColor} />
            <Text style={[styles.bannerText, { color: primaryColor }]}>
              Viewing: {activeProfile.name}
              {activeProfile.relationship ? ` (${activeProfile.relationship})` : ''}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={18} color={primaryColor} />
        </TouchableOpacity>
      )}

      {/* Profile Switcher Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Switch Profile</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={28} color={argonTheme.colors.muted} />
              </TouchableOpacity>
            </View>

            {/* Profile List */}
            <ScrollView style={styles.profileList} showsVerticalScrollIndicator={false}>
              {allProfiles.map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  style={[
                    styles.profileItem,
                    activeProfile.id === profile.id && styles.profileItemActive
                  ]}
                  onPress={() => handleSwitchProfile(profile)}
                >
                  <View style={[
                    styles.profileAvatar,
                    { backgroundColor: profile.type === 'self' ? primaryColor + '20' : argonTheme.colors.info + '20' }
                  ]}>
                    <Ionicons
                      name={getRelationshipIcon(profile)}
                      size={24}
                      color={profile.type === 'self' ? primaryColor : argonTheme.colors.info}
                    />
                  </View>
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{profile.name}</Text>
                    {profile.type === 'family' && (
                      <Text style={styles.profileDetails}>
                        {profile.relationship} • {profile.age} years old
                      </Text>
                    )}
                  </View>
                  {activeProfile.id === profile.id && (
                    <Ionicons name="checkmark-circle" size={24} color={primaryColor} />
                  )}
                </TouchableOpacity>
              ))}

              {/* Add Family Member Button */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AddFamilyMember');
                }}
              >
                <LinearGradient
                  colors={[primaryColor + '15', primaryColor + '05']}
                  style={styles.addGradient}
                >
                  <Ionicons name="add-circle-outline" size={24} color={primaryColor} />
                  <Text style={[styles.addText, { color: primaryColor }]}>Add Family Member</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: argonTheme.borderRadius.md,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  bannerText: {
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: argonTheme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    ...argonTheme.shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border + '30',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  profileList: {
    padding: 16,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  profileItemActive: {
    borderColor: argonTheme.colors.primary,
    backgroundColor: argonTheme.colors.primary + '10',
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 2,
  },
  profileDetails: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  addButton: {
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 16,
  },
  addGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 10,
  },
  addText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

