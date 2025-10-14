import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function PatientListScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const patients = [
    {
      id: 'PAT-001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      conditions: ['Hypertension', 'Diabetes Type 2'],
      lastVisit: 'Oct 10, 2025',
      nextAppointment: 'Oct 15, 2025',
      status: 'active',
      avatar: 'JD',
    },
    {
      id: 'PAT-002',
      name: 'Sarah Smith',
      age: 32,
      gender: 'Female',
      conditions: ['Asthma'],
      lastVisit: 'Oct 8, 2025',
      nextAppointment: 'Oct 20, 2025',
      status: 'active',
      avatar: 'SS',
    },
    {
      id: 'PAT-003',
      name: 'Michael Brown',
      age: 58,
      gender: 'Male',
      conditions: ['Heart Disease', 'High Cholesterol'],
      lastVisit: 'Oct 5, 2025',
      nextAppointment: 'Oct 18, 2025',
      status: 'critical',
      avatar: 'MB',
    },
    {
      id: 'PAT-004',
      name: 'Emily Wilson',
      age: 28,
      gender: 'Female',
      conditions: ['Anxiety'],
      lastVisit: 'Oct 12, 2025',
      nextAppointment: null,
      status: 'active',
      avatar: 'EW',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Patients', icon: 'people' },
    { id: 'active', label: 'Active', icon: 'checkmark-circle' },
    { id: 'critical', label: 'Critical', icon: 'alert-circle' },
    { id: 'recent', label: 'Recent', icon: 'time' },
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.conditions.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>My Patients</Text>
            <Text style={styles.headerSubtitle}>{patients.length} total patients</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={argonTheme.colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patients..."
            placeholderTextColor={argonTheme.colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={argonTheme.colors.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => {
            const count = filter.id === 'all' ? patients.length : 
                         patients.filter(p => p.status === filter.id).length;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.id && { 
                    backgroundColor: primaryColor,
                    borderColor: primaryColor 
                  }
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Ionicons 
                  name={filter.icon} 
                  size={14} 
                  color={selectedFilter === filter.id ? argonTheme.colors.white : primaryColor} 
                />
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.id && styles.filterTextActive
                ]}>
                  {filter.label}
                </Text>
                {count > 0 && (
                  <View style={[
                    styles.filterBadge,
                    selectedFilter === filter.id && styles.filterBadgeActive
                  ]}>
                    <Text style={[
                      styles.filterBadgeText,
                      selectedFilter === filter.id && styles.filterBadgeTextActive
                    ]}>
                      {count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Patient List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredPatients.map((patient) => (
          <TouchableOpacity
            key={patient.id}
            style={styles.patientCard}
            onPress={() => navigation.navigate('PatientRecord', { patientId: patient.id })}
          >
            <View style={styles.patientHeader}>
              <View style={styles.patientInfoRow}>
                <View style={[
                  styles.patientAvatar,
                  { backgroundColor: patient.status === 'critical' ? argonTheme.colors.danger : primaryColor }
                ]}>
                  <Text style={styles.avatarText}>{patient.avatar}</Text>
                </View>
                <View style={styles.patientDetails}>
                  <Text style={styles.patientName}>{patient.name}</Text>
                  <Text style={styles.patientMeta}>
                    {patient.age} years • {patient.gender} • {patient.id}
                  </Text>
                </View>
              </View>
              {patient.status === 'critical' && (
                <View style={styles.criticalBadge}>
                  <Ionicons name="warning" size={12} color={argonTheme.colors.danger} />
                  <Text style={styles.criticalText}>Critical</Text>
                </View>
              )}
            </View>

            {/* Conditions */}
            {patient.conditions.length > 0 && (
              <View style={styles.conditionsContainer}>
                <Ionicons name="medical" size={14} color={argonTheme.colors.muted} />
                <Text style={styles.conditionsText} numberOfLines={1}>
                  {patient.conditions.join(', ')}
                </Text>
              </View>
            )}

            {/* Visits Info */}
            <View style={styles.visitsRow}>
              <View style={styles.visitItem}>
                <Ionicons name="calendar-outline" size={14} color={argonTheme.colors.info} />
                <Text style={styles.visitLabel}>Last Visit:</Text>
                <Text style={styles.visitValue}>{patient.lastVisit}</Text>
              </View>
              {patient.nextAppointment && (
                <View style={styles.visitItem}>
                  <Ionicons name="time-outline" size={14} color={argonTheme.colors.success} />
                  <Text style={styles.visitLabel}>Next:</Text>
                  <Text style={styles.visitValue}>{patient.nextAppointment}</Text>
                </View>
              )}
            </View>

            {/* Actions */}
            <View style={styles.patientActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="folder-open-outline" size={16} color={primaryColor} />
                <Text style={[styles.actionText, { color: primaryColor }]}>View Record</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="chatbubble-outline" size={16} color={argonTheme.colors.info} />
                <Text style={[styles.actionText, { color: argonTheme.colors.info }]}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="call-outline" size={16} color={argonTheme.colors.success} />
                <Text style={[styles.actionText, { color: argonTheme.colors.success }]}>Call</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filteredPatients.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No patients found</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Try a different search term' : 'No patients match the selected filter'}
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
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    ...argonTheme.shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: argonTheme.colors.text,
  },
  filtersContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
    height: 50,
  },
  filtersContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    gap: 5,
    minWidth: 80,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  filterTextActive: {
    color: argonTheme.colors.white,
  },
  filterBadge: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: argonTheme.colors.text,
  },
  filterBadgeTextActive: {
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  patientCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    marginBottom: 14,
    ...argonTheme.shadows.md,
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  patientInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  patientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  patientMeta: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  criticalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.danger + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  criticalText: {
    fontSize: 10,
    fontWeight: '600',
    color: argonTheme.colors.danger,
    textTransform: 'uppercase',
  },
  conditionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    padding: 10,
    marginBottom: 12,
    gap: 8,
  },
  conditionsText: {
    flex: 1,
    fontSize: 13,
    color: argonTheme.colors.text,
    fontWeight: '500',
  },
  visitsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  visitItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  visitLabel: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  visitValue: {
    fontSize: 11,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  patientActions: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border + '30',
    paddingTop: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});

