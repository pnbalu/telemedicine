import React, { useState } from 'react';
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

export default function DoctorEarningsScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const earningsSummary = {
    today: { amount: 680, consultations: 8 },
    week: { amount: 3240, consultations: 42 },
    month: { amount: 14560, consultations: 178 },
    total: { amount: 87450, consultations: 1025 },
  };

  const recentTransactions = [
    {
      id: 1,
      patient: 'John Doe',
      date: 'Oct 13, 2025',
      time: '2:30 PM',
      type: 'Video Consultation',
      amount: 150,
      status: 'completed',
      paymentMethod: 'Insurance',
    },
    {
      id: 2,
      patient: 'Sarah Smith',
      date: 'Oct 13, 2025',
      time: '11:00 AM',
      type: 'Follow-up Call',
      amount: 75,
      status: 'completed',
      paymentMethod: 'Credit Card',
    },
    {
      id: 3,
      patient: 'Michael Brown',
      date: 'Oct 12, 2025',
      time: '4:00 PM',
      type: 'Video Consultation',
      amount: 150,
      status: 'pending',
      paymentMethod: 'Insurance',
    },
    {
      id: 4,
      patient: 'Emily Wilson',
      date: 'Oct 12, 2025',
      time: '10:30 AM',
      type: 'In-Person Visit',
      amount: 200,
      status: 'completed',
      paymentMethod: 'Cash',
    },
  ];

  const earningsByType = [
    { type: 'Video Consultation', amount: 6750, count: 45, color: argonTheme.colors.primary },
    { type: 'In-Person Visit', amount: 5200, count: 26, color: argonTheme.colors.success },
    { type: 'Follow-up Call', amount: 2610, count: 107, color: argonTheme.colors.info },
  ];

  const payoutHistory = [
    { id: 1, date: 'Oct 1, 2025', amount: 12800, status: 'completed', method: 'Bank Transfer' },
    { id: 2, date: 'Sep 1, 2025', amount: 13450, status: 'completed', method: 'Bank Transfer' },
    { id: 3, date: 'Aug 1, 2025', amount: 11900, status: 'completed', method: 'Bank Transfer' },
  ];

  const bankAccount = {
    accountName: 'Dr. Alice Smith',
    accountNumber: '****1234',
    bankName: 'Chase Bank',
    routingNumber: '****5678',
  };

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'total', label: 'All Time' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return argonTheme.colors.success;
      case 'pending': return argonTheme.colors.warning;
      case 'failed': return argonTheme.colors.danger;
      default: return argonTheme.colors.muted;
    }
  };

  const handleWithdraw = () => {
    Alert.alert(
      'Request Withdrawal',
      `Request withdrawal of $${earningsSummary.month.amount} to your bank account?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => Alert.alert('Success', 'Withdrawal request submitted! Funds will arrive in 2-3 business days.')
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
        <Text style={styles.headerTitle}>Earnings & Payments</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Earnings Card */}
        <View style={styles.earningsCard}>
          <LinearGradient colors={gradient} style={styles.earningsGradient}>
            <View style={styles.earningsHeader}>
              <Text style={styles.earningsLabel}>Total Earnings</Text>
              <TouchableOpacity>
                <Ionicons name="eye-outline" size={20} color={argonTheme.colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.earningsAmount}>${earningsSummary.month.amount.toLocaleString()}</Text>
            <Text style={styles.earningsSubtext}>This Month • {earningsSummary.month.consultations} Consultations</Text>
            
            <View style={styles.earningsStats}>
              <View style={styles.earningsStat}>
                <Text style={styles.earningsStatValue}>${earningsSummary.week.amount}</Text>
                <Text style={styles.earningsStatLabel}>This Week</Text>
              </View>
              <View style={styles.earningsStatDivider} />
              <View style={styles.earningsStat}>
                <Text style={styles.earningsStatValue}>${earningsSummary.today.amount}</Text>
                <Text style={styles.earningsStatLabel}>Today</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
              <Ionicons name="arrow-down-circle-outline" size={20} color={primaryColor} />
              <Text style={[styles.withdrawText, { color: primaryColor }]}>Request Withdrawal</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Period Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.periodSelector}
          contentContainerStyle={styles.periodContent}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodChip,
                selectedPeriod === period.id && {
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                }
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period.id && styles.periodTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Earnings by Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earnings by Type</Text>
          {earningsByType.map((item, index) => (
            <View key={index} style={styles.typeCard}>
              <View style={[styles.typeIcon, { backgroundColor: item.color + '15' }]}>
                <Ionicons name="pulse" size={24} color={item.color} />
              </View>
              <View style={styles.typeInfo}>
                <Text style={styles.typeName}>{item.type}</Text>
                <Text style={styles.typeCount}>{item.count} consultations</Text>
              </View>
              <View style={styles.typeAmount}>
                <Text style={styles.typeAmountValue}>${item.amount}</Text>
                <View style={styles.typeBar}>
                  <View 
                    style={[
                      styles.typeBarFill,
                      { 
                        width: `${(item.amount / earningsByType[0].amount) * 100}%`,
                        backgroundColor: item.color 
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: primaryColor }]}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: getStatusColor(transaction.status) + '15' }
                ]}>
                  <Ionicons 
                    name={transaction.status === 'completed' ? 'checkmark' : 'time'}
                    size={20} 
                    color={getStatusColor(transaction.status)} 
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionPatient}>{transaction.patient}</Text>
                  <Text style={styles.transactionType}>{transaction.type}</Text>
                  <Text style={styles.transactionDate}>{transaction.date} • {transaction.time}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>+${transaction.amount}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(transaction.status) + '15' }
                ]}>
                  <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Bank Account */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bank Account</Text>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={20} color={primaryColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.bankCard}>
            <View style={styles.bankHeader}>
              <View style={[styles.bankIcon, { backgroundColor: argonTheme.colors.success + '15' }]}>
                <Ionicons name="business" size={28} color={argonTheme.colors.success} />
              </View>
              <View style={styles.bankBadge}>
                <Ionicons name="shield-checkmark" size={12} color={argonTheme.colors.success} />
                <Text style={styles.bankBadgeText}>Verified</Text>
              </View>
            </View>

            <Text style={styles.bankName}>{bankAccount.bankName}</Text>
            
            <View style={styles.bankDetails}>
              <View style={styles.bankDetailRow}>
                <Text style={styles.bankDetailLabel}>Account Name</Text>
                <Text style={styles.bankDetailValue}>{bankAccount.accountName}</Text>
              </View>
              <View style={styles.bankDetailRow}>
                <Text style={styles.bankDetailLabel}>Account Number</Text>
                <Text style={styles.bankDetailValue}>{bankAccount.accountNumber}</Text>
              </View>
              <View style={styles.bankDetailRow}>
                <Text style={styles.bankDetailLabel}>Routing Number</Text>
                <Text style={styles.bankDetailValue}>{bankAccount.routingNumber}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payout History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payout History</Text>
          {payoutHistory.map((payout) => (
            <View key={payout.id} style={styles.payoutCard}>
              <View style={styles.payoutLeft}>
                <View style={[styles.payoutIcon, { backgroundColor: argonTheme.colors.success + '15' }]}>
                  <Ionicons name="arrow-down" size={20} color={argonTheme.colors.success} />
                </View>
                <View>
                  <Text style={styles.payoutAmount}>${payout.amount.toLocaleString()}</Text>
                  <Text style={styles.payoutMethod}>{payout.method}</Text>
                </View>
              </View>
              <View style={styles.payoutRight}>
                <Text style={styles.payoutDate}>{payout.date}</Text>
                <View style={[styles.statusBadge, { backgroundColor: argonTheme.colors.success + '15' }]}>
                  <Ionicons name="checkmark-circle" size={12} color={argonTheme.colors.success} />
                  <Text style={[styles.statusText, { color: argonTheme.colors.success }]}>
                    {payout.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Tax Information */}
        <View style={styles.section}>
          <View style={styles.taxCard}>
            <View style={styles.taxHeader}>
              <View style={[styles.taxIcon, { backgroundColor: argonTheme.colors.warning + '15' }]}>
                <Ionicons name="document-text" size={24} color={argonTheme.colors.warning} />
              </View>
              <View style={styles.taxInfo}>
                <Text style={styles.taxTitle}>Tax Documents</Text>
                <Text style={styles.taxSubtext}>Download your 1099 forms and statements</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.taxButton}>
              <Text style={[styles.taxButtonText, { color: primaryColor }]}>Download 2025 Forms</Text>
              <Ionicons name="download-outline" size={18} color={primaryColor} />
            </TouchableOpacity>
          </View>
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
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  earningsCard: {
    borderRadius: argonTheme.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: 20,
    ...argonTheme.shadows.lg,
  },
  earningsGradient: {
    padding: 20,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  earningsLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  earningsAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 6,
  },
  earningsSubtext: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  earningsStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 16,
  },
  earningsStat: {
    flex: 1,
    alignItems: 'center',
  },
  earningsStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 4,
  },
  earningsStatLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  earningsStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 14,
    gap: 8,
  },
  withdrawText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  periodSelector: {
    marginBottom: 20,
  },
  periodContent: {
    gap: 10,
  },
  periodChip: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.full,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    ...argonTheme.shadows.sm,
  },
  periodText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  periodTextActive: {
    color: argonTheme.colors.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    ...argonTheme.shadows.sm,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  typeCount: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  typeAmount: {
    alignItems: 'flex-end',
  },
  typeAmountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.text,
    marginBottom: 6,
  },
  typeBar: {
    width: 80,
    height: 4,
    backgroundColor: argonTheme.colors.background,
    borderRadius: 2,
    overflow: 'hidden',
  },
  typeBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    ...argonTheme.shadows.sm,
  },
  transactionLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionPatient: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  transactionType: {
    fontSize: 12,
    color: argonTheme.colors.text,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.success,
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  bankCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    ...argonTheme.shadows.md,
  },
  bankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.success + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  bankBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: argonTheme.colors.success,
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 16,
  },
  bankDetails: {
    gap: 12,
  },
  bankDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankDetailLabel: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  bankDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  payoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    ...argonTheme.shadows.sm,
  },
  payoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  payoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payoutAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  payoutMethod: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  payoutRight: {
    alignItems: 'flex-end',
  },
  payoutDate: {
    fontSize: 12,
    color: argonTheme.colors.text,
    marginBottom: 6,
  },
  taxCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    padding: 16,
    ...argonTheme.shadows.sm,
  },
  taxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  taxIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taxInfo: {
    flex: 1,
  },
  taxTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 3,
  },
  taxSubtext: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  taxButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 12,
    gap: 8,
  },
  taxButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

