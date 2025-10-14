import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function MedicalHistoryScreen({ navigation }) {
  const { gradient } = useTheme();
  const [activeTab, setActiveTab] = useState('conditions');

  const conditions = [
    { id: 1, name: 'Hypertension', since: '2020', status: 'Ongoing' },
    { id: 2, name: 'Type 2 Diabetes', since: '2019', status: 'Controlled' },
  ];

  const allergies = [
    { id: 1, name: 'Penicillin', severity: 'Severe', reaction: 'Anaphylaxis' },
    { id: 2, name: 'Peanuts', severity: 'Moderate', reaction: 'Hives' },
  ];

  const surgeries = [
    { id: 1, name: 'Appendectomy', date: 'Mar 2018', hospital: 'City Hospital' },
    { id: 2, name: 'ACL Repair', date: 'Jun 2015', hospital: 'Sports Medical Center' },
  ];

  const familyHistory = [
    { id: 1, relation: 'Father', condition: 'Heart Disease', age: '65' },
    { id: 2, relation: 'Mother', condition: 'Breast Cancer', age: '58' },
  ];

  const renderCondition = (item) => (
    <View key={item.id} style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="medical" size={20} color={argonTheme.colors.danger} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemSubtitle}>Since {item.since}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Ongoing' ? argonTheme.colors.warning + '20' : argonTheme.colors.success + '20' }]}>
          <Text style={[styles.statusText, { color: item.status === 'Ongoing' ? argonTheme.colors.warning : argonTheme.colors.success }]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderAllergy = (item) => (
    <View key={item.id} style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={[styles.iconContainer, { backgroundColor: argonTheme.colors.danger + '20' }]}>
          <Ionicons name="alert-circle" size={20} color={argonTheme.colors.danger} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemSubtitle}>{item.reaction}</Text>
        </View>
        <View style={styles.severityBadge}>
          <Text style={styles.severityText}>{item.severity}</Text>
        </View>
      </View>
    </View>
  );

  const renderSurgery = (item) => (
    <View key={item.id} style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={[styles.iconContainer, { backgroundColor: argonTheme.colors.info + '20' }]}>
          <Ionicons name="cut" size={20} color={argonTheme.colors.info} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemSubtitle}>{item.date} • {item.hospital}</Text>
        </View>
      </View>
    </View>
  );

  const renderFamilyHistory = (item) => (
    <View key={item.id} style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={[styles.iconContainer, { backgroundColor: argonTheme.colors.primary + '20' }]}>
          <Ionicons name="people" size={20} color={argonTheme.colors.primary} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.relation}</Text>
          <Text style={styles.itemSubtitle}>{item.condition} (Age {item.age})</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical History</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddMedicalEntry', { entryType: activeTab })}>
          <Ionicons name="add-circle-outline" size={28} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.tabsContainer}
        >
          {[
            { key: 'conditions', label: 'Conditions', icon: 'medical', count: conditions.length },
            { key: 'allergies', label: 'Allergies', icon: 'alert-circle', count: allergies.length },
            { key: 'surgeries', label: 'Surgeries', icon: 'cut', count: surgeries.length },
            { key: 'family', label: 'Family', icon: 'people', count: familyHistory.length },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && { 
                  backgroundColor: gradient[0],
                  borderColor: gradient[0],
                }
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={14}
                color={activeTab === tab.key ? argonTheme.colors.white : gradient[0]}
              />
              <Text style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
              {tab.count > 0 && (
                <View style={[
                  styles.tabBadge,
                  activeTab === tab.key && styles.tabBadgeActive
                ]}>
                  <Text style={[
                    styles.tabBadgeText,
                    activeTab === tab.key && styles.tabBadgeTextActive
                  ]}>
                    {tab.count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'conditions' && conditions.map(renderCondition)}
        {activeTab === 'allergies' && allergies.map(renderAllergy)}
        {activeTab === 'surgeries' && surgeries.map(renderSurgery)}
        {activeTab === 'family' && familyHistory.map(renderFamilyHistory)}
        
        <View style={{ height: 20 }} />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    flex: 1,
  },
  tabsWrapper: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
    height: 50,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tab: {
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
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  tabTextActive: {
    color: argonTheme.colors.white,
  },
  tabBadge: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: argonTheme.colors.text,
  },
  tabBadgeTextActive: {
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 12,
    ...argonTheme.shadows.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: argonTheme.colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: argonTheme.colors.danger + '20',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.danger,
  },
});

