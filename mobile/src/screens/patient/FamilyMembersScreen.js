import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';
import { useFamilyContext } from '../../contexts/FamilyContext';

export default function FamilyMembersScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const { familyMembers, removeFamilyMember, switchProfile } = useFamilyContext();

  const getRelationshipIcon = (relationship) => {
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
    return icons[relationship] || 'person';
  };

  const getRelationshipColor = (relationship) => {
    const colors = {
      'Mother': argonTheme.colors.danger,
      'Father': argonTheme.colors.info,
      'Spouse': argonTheme.colors.warning,
      'Son': argonTheme.colors.success,
      'Daughter': argonTheme.colors.primary,
      'Sibling': argonTheme.colors.info,
      'Grandparent': argonTheme.colors.muted,
      'Other': argonTheme.colors.text,
    };
    return colors[relationship] || argonTheme.colors.text;
  };

  const handleDelete = (member) => {
    Alert.alert(
      'Remove Family Member',
      `Are you sure you want to remove ${member.name} from your family members? This will delete all their associated data.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeFamilyMember(member.id);
            Alert.alert('Removed', `${member.name} has been removed from your family members.`);
          },
        },
      ]
    );
  };

  const handleViewProfile = (member) => {
    navigation.navigate('FamilyMemberProfile', { memberId: member.id });
  };

  const handleSwitchProfile = (member) => {
    switchProfile(member.id);
    Alert.alert(
      'Profile Switched',
      `Now viewing ${member.name}'s profile. All appointments, lab results, and prescriptions will show their data.`,
      [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('Main', { screen: 'Dashboard' })
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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Family Members</Text>
          <Text style={styles.headerSubtitle}>
            {familyMembers.length} {familyMembers.length === 1 ? 'member' : 'members'}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('AddFamilyMember')}
          style={styles.addButton}
        >
          <Ionicons name="add-circle-outline" size={28} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {familyMembers.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={80} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No Family Members Yet</Text>
            <Text style={styles.emptyText}>
              Add family members to manage their health appointments, view lab results, and more.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddFamilyMember')}
              style={styles.emptyButton}
            >
              <LinearGradient colors={gradient} style={styles.emptyButtonGradient}>
                <Ionicons name="add-circle-outline" size={20} color={argonTheme.colors.white} />
                <Text style={styles.emptyButtonText}>Add Family Member</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={20} color={argonTheme.colors.info} />
              <Text style={styles.infoText}>
                Manage family members' appointments, prescriptions, and medical records all in one place.
              </Text>
            </View>

            {familyMembers.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={styles.memberHeader}>
                  <View style={[
                    styles.memberAvatar,
                    { backgroundColor: getRelationshipColor(member.relationship) + '20' }
                  ]}>
                    {member.photo ? (
                      <Text style={styles.memberPhotoText}>📷</Text>
                    ) : (
                      <Ionicons
                        name={getRelationshipIcon(member.relationship)}
                        size={28}
                        color={getRelationshipColor(member.relationship)}
                      />
                    )}
                  </View>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <View style={styles.memberDetails}>
                      <View style={[
                        styles.relationshipBadge,
                        { backgroundColor: getRelationshipColor(member.relationship) + '15' }
                      ]}>
                        <Text style={[
                          styles.relationshipText,
                          { color: getRelationshipColor(member.relationship) }
                        ]}>
                          {member.relationship}
                        </Text>
                      </View>
                      <Text style={styles.memberAge}>• {member.age} years old</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.memberBody}>
                  {member.accountId && (
                    <View style={styles.detailRow}>
                      <Ionicons name="card" size={14} color={primaryColor} />
                      <Text style={styles.detailLabel}>Account ID:</Text>
                      <Text style={[styles.detailValue, { color: primaryColor, fontWeight: 'bold' }]}>
                        {member.accountId}
                      </Text>
                    </View>
                  )}
                  {member.bloodType && (
                    <View style={styles.detailRow}>
                      <Ionicons name="water" size={14} color={argonTheme.colors.muted} />
                      <Text style={styles.detailLabel}>Blood Type:</Text>
                      <Text style={styles.detailValue}>{member.bloodType}</Text>
                    </View>
                  )}
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar" size={14} color={argonTheme.colors.muted} />
                    <Text style={styles.detailLabel}>Added:</Text>
                    <Text style={styles.detailValue}>
                      {new Date(member.addedDate).toLocaleDateString()}
                    </Text>
                  </View>
                  {member.isMinor && (
                    <View style={styles.minorBadge}>
                      <Ionicons name="shield-checkmark" size={12} color={argonTheme.colors.warning} />
                      <Text style={styles.minorText}>Minor (Under 18)</Text>
                    </View>
                  )}
                </View>

                <View style={styles.memberActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleSwitchProfile(member)}
                  >
                    <Ionicons name="swap-horizontal" size={18} color={primaryColor} />
                    <Text style={[styles.actionText, { color: primaryColor }]}>Switch to Profile</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleViewProfile(member)}
                  >
                    <Ionicons name="eye-outline" size={18} color={argonTheme.colors.info} />
                    <Text style={[styles.actionText, { color: argonTheme.colors.info }]}>View Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(member)}
                  >
                    <Ionicons name="trash-outline" size={18} color={argonTheme.colors.danger} />
                    <Text style={[styles.actionText, { color: argonTheme.colors.danger }]}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
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
    paddingBottom: 28,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  addButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: argonTheme.colors.info + '10',
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.info,
    borderRadius: argonTheme.borderRadius.md,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: argonTheme.colors.text,
    lineHeight: 18,
  },
  memberCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    marginBottom: 14,
    ...argonTheme.shadows.md,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberPhotoText: {
    fontSize: 28,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 6,
  },
  memberDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  relationshipBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  relationshipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  memberAge: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  memberBody: {
    marginBottom: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailLabel: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  detailValue: {
    fontSize: 13,
    color: argonTheme.colors.text,
    fontWeight: '500',
  },
  minorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.warning + '15',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 5,
  },
  minorText: {
    fontSize: 11,
    color: argonTheme.colors.warning,
    fontWeight: '600',
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border + '30',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    ...argonTheme.shadows.md,
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
  },
  emptyButtonText: {
    color: argonTheme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

