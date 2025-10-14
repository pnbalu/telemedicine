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

export default function FamilyMemberProfileScreen({ navigation, route }) {
  const { memberId } = route.params;
  const { gradient, primaryColor } = useTheme();
  const { familyMembers, switchProfile } = useFamilyContext();

  const member = familyMembers.find(m => m.id === memberId);

  if (!member) {
    navigation.goBack();
    return null;
  }

  const handleSwitchProfile = () => {
    switchProfile(member.id);
    Alert.alert(
      'Profile Switched',
      `Now viewing ${member.name}'s profile.`,
      [
        { 
          text: 'Go to Dashboard', 
          onPress: () => navigation.navigate('Main', { screen: 'Dashboard' })
        },
        { text: 'Stay Here', style: 'cancel' }
      ]
    );
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{member.name}</Text>
          <Text style={styles.headerSubtitle}>{member.relationship}</Text>
        </View>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={[
            styles.avatar,
            { backgroundColor: getRelationshipColor(member.relationship) + '20' }
          ]}>
            <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
          </View>
          <Text style={styles.profileName}>{member.name}</Text>
          <View style={[
            styles.relationshipBadge,
            { backgroundColor: getRelationshipColor(member.relationship) + '15' }
          ]}>
            <Text style={[
              styles.relationshipText,
              { color: getRelationshipColor(member.relationship) }
            ]}>
              {member.relationship} • {member.age} years old
            </Text>
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.card}>
            {member.accountId && (
              <>
                <View style={styles.infoRow}>
                  <View style={styles.infoLabel}>
                    <Ionicons name="card-outline" size={18} color={primaryColor} />
                    <Text style={styles.labelText}>Account ID</Text>
                  </View>
                  <Text style={[styles.infoValue, { color: primaryColor, fontWeight: 'bold' }]}>
                    {member.accountId}
                  </Text>
                </View>
                <View style={styles.divider} />
              </>
            )}

            <View style={styles.infoRow}>
              <View style={styles.infoLabel}>
                <Ionicons name="person-outline" size={18} color={primaryColor} />
                <Text style={styles.labelText}>Full Name</Text>
              </View>
              <Text style={styles.infoValue}>{member.name}</Text>
            </View>
            
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoLabel}>
                <Ionicons name="calendar-outline" size={18} color={primaryColor} />
                <Text style={styles.labelText}>Date of Birth</Text>
              </View>
              <Text style={styles.infoValue}>{member.dateOfBirth}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoLabel}>
                <Ionicons name="male-female-outline" size={18} color={primaryColor} />
                <Text style={styles.labelText}>Gender</Text>
              </View>
              <Text style={styles.infoValue}>{member.gender}</Text>
            </View>

            {member.bloodType && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <View style={styles.infoLabel}>
                    <Ionicons name="water-outline" size={18} color={primaryColor} />
                    <Text style={styles.labelText}>Blood Type</Text>
                  </View>
                  <Text style={styles.infoValue}>{member.bloodType}</Text>
                </View>
              </>
            )}

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoLabel}>
                <Ionicons name="time-outline" size={18} color={primaryColor} />
                <Text style={styles.labelText}>Added On</Text>
              </View>
              <Text style={styles.infoValue}>
                {new Date(member.addedDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Status */}
        {member.isMinor && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.card}>
              <View style={styles.minorCard}>
                <Ionicons name="shield-checkmark" size={24} color={argonTheme.colors.warning} />
                <View style={styles.minorInfo}>
                  <Text style={styles.minorTitle}>Minor (Under 18)</Text>
                  <Text style={styles.minorText}>
                    As a minor, you have full parental control over their medical appointments and records.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handleSwitchProfile}
          >
            <View style={[styles.actionIcon, { backgroundColor: primaryColor + '20' }]}>
              <Ionicons name="swap-horizontal" size={24} color={primaryColor} />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Switch to This Profile</Text>
              <Text style={styles.actionDescription}>
                View all appointments, lab results, and prescriptions for {member.name}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => {
              switchProfile(member.id);
              navigation.navigate('BookAppointment');
            }}
          >
            <View style={[styles.actionIcon, { backgroundColor: argonTheme.colors.success + '20' }]}>
              <Ionicons name="calendar" size={24} color={argonTheme.colors.success} />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Book Appointment</Text>
              <Text style={styles.actionDescription}>
                Schedule a consultation for {member.name}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => {
              switchProfile(member.id);
              navigation.navigate('LabResults');
            }}
          >
            <View style={[styles.actionIcon, { backgroundColor: argonTheme.colors.info + '20' }]}>
              <Ionicons name="flask" size={24} color={argonTheme.colors.info} />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>View Lab Results</Text>
              <Text style={styles.actionDescription}>
                Access {member.name}'s laboratory test results
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={20} color={argonTheme.colors.info} />
          <Text style={styles.infoCardText}>
            All medical information for family members is kept private and secure. You can manage their appointments and view their records with their consent.
          </Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    ...argonTheme.shadows.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 8,
  },
  relationshipBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  relationshipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 12,
  },
  card: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    ...argonTheme.shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  labelText: {
    fontSize: 14,
    color: argonTheme.colors.text,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: argonTheme.colors.heading,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: argonTheme.colors.border + '30',
  },
  minorCard: {
    flexDirection: 'row',
    gap: 12,
  },
  minorInfo: {
    flex: 1,
  },
  minorTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.warning,
    marginBottom: 4,
  },
  minorText: {
    fontSize: 13,
    color: argonTheme.colors.text,
    lineHeight: 18,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    ...argonTheme.shadows.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  actionDescription: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
    lineHeight: 16,
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
  infoCardText: {
    flex: 1,
    fontSize: 12,
    color: argonTheme.colors.text,
    lineHeight: 18,
  },
});

