import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function LabResultsReviewScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('pending');
  const [expandedResult, setExpandedResult] = useState(null);

  const labResults = [
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'TMX-001',
      testName: 'Complete Blood Count (CBC)',
      date: 'Oct 12, 2025',
      status: 'pending',
      urgency: 'normal',
      tests: [
        { name: 'Hemoglobin', value: 13.5, unit: 'g/dL', range: '13.5-17.5', status: 'normal' },
        { name: 'WBC Count', value: 11.2, unit: 'K/uL', range: '4.5-11.0', status: 'high' },
      ],
    },
    {
      id: 2,
      patient: 'Sarah Smith',
      patientId: 'TMX-002',
      testName: 'Lipid Panel',
      date: 'Oct 11, 2025',
      status: 'pending',
      urgency: 'urgent',
      tests: [
        { name: 'Total Cholesterol', value: 245, unit: 'mg/dL', range: '<200', status: 'high' },
        { name: 'LDL', value: 160, unit: 'mg/dL', range: '<100', status: 'high' },
        { name: 'HDL', value: 42, unit: 'mg/dL', range: '>40', status: 'normal' },
      ],
    },
  ];

  const filters = [
    { id: 'pending', label: 'Pending Review', count: 2 },
    { id: 'reviewed', label: 'Reviewed', count: 0 },
    { id: 'urgent', label: 'Urgent', count: 1 },
  ];

  const handleApprove = (resultId) => {
    Alert.alert(
      'Approve Result',
      'Are you sure you want to approve this lab result?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Approve', 
          onPress: () => Alert.alert('Success', 'Lab result approved')
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
          <Text style={styles.headerTitle}>Lab Results Review</Text>
          <Text style={styles.headerSubtitle}>2 pending reviews</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="search" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && {
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                }
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive
              ]}>
                {filter.label}
              </Text>
              <View style={[
                styles.filterBadge,
                selectedFilter === filter.id && styles.filterBadgeActive
              ]}>
                <Text style={[
                  styles.filterBadgeText,
                  selectedFilter === filter.id && styles.filterBadgeTextActive
                ]}>
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {labResults.map((result) => (
          <View key={result.id} style={[
            styles.resultCard,
            result.urgency === 'urgent' && styles.urgentCard
          ]}>
            {/* Card Header */}
            <TouchableOpacity 
              style={styles.cardHeader}
              onPress={() => setExpandedResult(expandedResult === result.id ? null : result.id)}
            >
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{result.patient}</Text>
                <Text style={styles.patientId}>{result.patientId}</Text>
              </View>
              <Ionicons 
                name={expandedResult === result.id ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={argonTheme.colors.muted}
              />
            </TouchableOpacity>

            {/* Test Info */}
            <View style={styles.testInfo}>
              <View style={styles.testRow}>
                <Ionicons name="flask" size={16} color={primaryColor} />
                <Text style={styles.testName}>{result.testName}</Text>
              </View>
              <View style={styles.testMeta}>
                <Text style={styles.testDate}>{result.date}</Text>
                {result.urgency === 'urgent' && (
                  <View style={styles.urgentBadge}>
                    <Ionicons name="alert-circle" size={12} color={argonTheme.colors.danger} />
                    <Text style={styles.urgentText}>Urgent</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Expanded Details */}
            {expandedResult === result.id && (
              <>
                <View style={styles.divider} />
                <View style={styles.expandedContent}>
                  <Text style={styles.expandedTitle}>Test Results:</Text>
                  {result.tests.map((test, idx) => (
                    <View key={idx} style={styles.testResultRow}>
                      <View style={styles.testResultLeft}>
                        <Text style={styles.testResultName}>{test.name}</Text>
                        <Text style={styles.testResultRange}>Range: {test.range}</Text>
                      </View>
                      <View style={styles.testResultRight}>
                        <Text style={[
                          styles.testResultValue,
                          test.status === 'high' && { color: argonTheme.colors.danger },
                          test.status === 'low' && { color: argonTheme.colors.warning }
                        ]}>
                          {test.value} {test.unit}
                        </Text>
                        {test.status !== 'normal' && (
                          <View style={[
                            styles.statusBadge,
                            test.status === 'high' ? styles.highBadge : styles.lowBadge
                          ]}>
                            <Text style={styles.statusText}>{test.status}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ))}

                  {/* Doctor's Notes */}
                  <Text style={styles.notesLabel}>Doctor's Notes:</Text>
                  <TextInput
                    style={styles.notesInput}
                    placeholder="Add your clinical notes here..."
                    placeholderTextColor={argonTheme.colors.muted}
                    multiline
                    numberOfLines={3}
                  />

                  {/* Actions */}
                  <View style={styles.actions}>
                    <TouchableOpacity 
                      style={styles.actionButtonOutline}
                      onPress={() => Alert.alert('Flag', 'Result flagged for follow-up')}
                    >
                      <Ionicons name="flag-outline" size={16} color={argonTheme.colors.warning} />
                      <Text style={[styles.actionText, { color: argonTheme.colors.warning }]}>Flag</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleApprove(result.id)}
                    >
                      <LinearGradient colors={gradient} style={styles.actionGradient}>
                        <Ionicons name="checkmark-circle" size={16} color={argonTheme.colors.white} />
                        <Text style={styles.actionTextWhite}>Approve & Send</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        ))}

        {labResults.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="flask-outline" size={64} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No Lab Results</Text>
            <Text style={styles.emptyText}>All lab results have been reviewed</Text>
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
    marginRight: 16,
  },
  headerCenter: {
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
  headerButton: {
    padding: 4,
  },
  filtersContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
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
    gap: 8,
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
    paddingTop: 16,
  },
  resultCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 14,
    ...argonTheme.shadows.sm,
  },
  urgentCard: {
    borderLeftWidth: 4,
    borderLeftColor: argonTheme.colors.danger,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 2,
  },
  patientId: {
    fontSize: 12,
    color: argonTheme.colors.muted,
  },
  testInfo: {
    marginBottom: 0,
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  testName: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  testMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  testDate: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.danger + '15',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: '600',
    color: argonTheme.colors.danger,
  },
  divider: {
    height: 1,
    backgroundColor: argonTheme.colors.border + '30',
    marginVertical: 14,
  },
  expandedContent: {},
  expandedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 10,
  },
  testResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: argonTheme.colors.background,
    padding: 10,
    borderRadius: argonTheme.borderRadius.md,
    marginBottom: 8,
  },
  testResultLeft: {
    flex: 1,
  },
  testResultName: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
    marginBottom: 2,
  },
  testResultRange: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  testResultRight: {
    alignItems: 'flex-end',
  },
  testResultValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: argonTheme.colors.success,
    marginBottom: 3,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  highBadge: {
    backgroundColor: argonTheme.colors.danger + '15',
  },
  lowBadge: {
    backgroundColor: argonTheme.colors.warning + '15',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  notesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginTop: 14,
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    padding: 12,
    fontSize: 13,
    color: argonTheme.colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButtonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 12,
    gap: 6,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  actionButton: {
    flex: 2,
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  actionTextWhite: {
    fontSize: 13,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
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
  },
});

