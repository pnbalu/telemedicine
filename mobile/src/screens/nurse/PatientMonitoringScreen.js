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

export default function PatientMonitoringScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 68,
      room: '302-A',
      condition: 'Post-surgery recovery',
      status: 'stable',
      lastVitals: '30 min ago',
      alerts: [],
    },
    {
      id: 2,
      name: 'Sarah Smith',
      age: 45,
      room: '305-B',
      condition: 'Pneumonia',
      status: 'monitoring',
      lastVitals: '1 hour ago',
      alerts: ['Medication due'],
    },
    {
      id: 3,
      name: 'Mike Wilson',
      age: 72,
      room: '301-C',
      condition: 'Cardiac monitoring',
      status: 'critical',
      lastVitals: '15 min ago',
      alerts: ['High BP', 'Irregular heartbeat'],
    },
    {
      id: 4,
      name: 'Emily Brown',
      age: 54,
      room: '304-A',
      condition: 'Diabetes management',
      status: 'stable',
      lastVitals: '2 hours ago',
      alerts: [],
    },
  ];

  const filters = [
    { id: 'all', label: 'All Patients', icon: 'people' },
    { id: 'stable', label: 'Stable', icon: 'checkmark-circle' },
    { id: 'monitoring', label: 'Monitoring', icon: 'pulse' },
    { id: 'critical', label: 'Critical', icon: 'alert-circle' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'stable': return argonTheme.colors.success;
      case 'monitoring': return argonTheme.colors.warning;
      case 'critical': return argonTheme.colors.danger;
      default: return argonTheme.colors.muted;
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={gradient} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Patient Monitoring</Text>
          <Text style={styles.headerSubtitle}>{patients.length} assigned patients</Text>
        </View>
        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={argonTheme.colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or room"
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
            style={[
              styles.patientCard,
              patient.status === 'critical' && styles.criticalCard
            ]}
          >
            <View style={styles.patientHeader}>
              <View style={styles.patientLeft}>
                <View style={[styles.patientAvatar, { backgroundColor: getStatusColor(patient.status) + '15' }]}>
                  <Ionicons name="person" size={24} color={getStatusColor(patient.status)} />
                </View>
                <View style={styles.patientInfo}>
                  <Text style={styles.patientName}>{patient.name}</Text>
                  <Text style={styles.patientAge}>{patient.age} years • {patient.room}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(patient.status) + '15' }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(patient.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(patient.status) }]}>
                  {patient.status}
                </Text>
              </View>
            </View>

            <View style={styles.patientBody}>
              <View style={styles.conditionRow}>
                <Ionicons name="medical-outline" size={16} color={argonTheme.colors.muted} />
                <Text style={styles.conditionText}>{patient.condition}</Text>
              </View>
              <View style={styles.vitalsRow}>
                <Ionicons name="pulse-outline" size={16} color={argonTheme.colors.muted} />
                <Text style={styles.vitalsText}>Last vitals: {patient.lastVitals}</Text>
              </View>
              
              {patient.alerts.length > 0 && (
                <View style={styles.alertsContainer}>
                  {patient.alerts.map((alert, index) => (
                    <View key={index} style={styles.alertBadge}>
                      <Ionicons name="warning" size={12} color={argonTheme.colors.warning} />
                      <Text style={styles.alertText}>{alert}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.patientActions}>
              <TouchableOpacity
                style={[styles.actionButton, { flex: 1 }]}
                onPress={() => navigation.navigate('VitalsRecording', { patient })}
              >
                <LinearGradient colors={gradient} style={styles.actionGradient}>
                  <Ionicons name="pulse" size={16} color={argonTheme.colors.white} />
                  <Text style={styles.actionText}>Record Vitals</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButtonOutline}
                onPress={() => navigation.navigate('PatientRecord', { patientId: patient.id })}
              >
                <Ionicons name="document-text-outline" size={16} color={primaryColor} />
                <Text style={[styles.actionText, { color: primaryColor }]}>View Chart</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filteredPatients.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No Patients Found</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Try a different search term or filter.' : 'No patients match the selected criteria.'}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 13,
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
    borderRadius: argonTheme.borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    ...argonTheme.shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: argonTheme.colors.text,
  },
  filtersContainer: {
    paddingBottom: 12,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    gap: 6,
    ...argonTheme.shadows.sm,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  filterTextActive: {
    color: argonTheme.colors.white,
  },
  filterBadge: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: argonTheme.colors.text,
  },
  filterBadgeTextActive: {
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  patientCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 14,
    marginBottom: 14,
    ...argonTheme.shadows.sm,
  },
  criticalCard: {
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.danger,
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientLeft: {
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
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  patientAge: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  patientBody: {
    marginBottom: 12,
    gap: 8,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  conditionText: {
    fontSize: 13,
    color: argonTheme.colors.text,
  },
  vitalsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vitalsText: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  alertsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.warning + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  alertText: {
    fontSize: 11,
    fontWeight: '600',
    color: argonTheme.colors.warning,
  },
  patientActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  actionText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  actionButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 10,
    gap: 6,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: '80%',
  },
});

