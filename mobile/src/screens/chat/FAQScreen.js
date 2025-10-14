import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';

export default function FAQScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const categories = [
    {
      id: 'appointments',
      title: 'Appointments',
      icon: 'calendar',
      color: argonTheme.colors.primary,
      faqs: [
        {
          id: 1,
          question: 'How do I book an appointment?',
          answer: 'Go to the Dashboard and tap "Book Appointment". Choose between AI consultation or video with a doctor, select your preferred time slot, and confirm.',
        },
        {
          id: 2,
          question: 'Can I cancel or reschedule?',
          answer: 'Yes! You can cancel up to 24 hours before the appointment. Go to Appointments, tap on the appointment, and select "Cancel" or "Reschedule".',
        },
        {
          id: 3,
          question: 'When can I join my appointment?',
          answer: 'You can join 15 minutes before your scheduled time. The "Join Now" button will become active during this window.',
        },
        {
          id: 4,
          question: 'What if I miss my appointment?',
          answer: 'If you miss your appointment, you can reschedule for another time. Some providers may charge a no-show fee.',
        },
      ],
    },
    {
      id: 'prescriptions',
      title: 'Prescriptions',
      icon: 'medical',
      color: argonTheme.colors.success,
      faqs: [
        {
          id: 5,
          question: 'How do I get my prescription?',
          answer: 'After your consultation, the doctor will send your prescription electronically. You\'ll receive a notification and can view it in the Prescriptions tab.',
        },
        {
          id: 6,
          question: 'Can I request a refill?',
          answer: 'Yes! Open the Prescriptions tab, select your medication, and tap "Request Refill". Your doctor will review and approve.',
        },
        {
          id: 7,
          question: 'Where can I pick up my medication?',
          answer: 'Your prescription is sent to your preferred pharmacy. You can also order delivery through our Pharmacy feature.',
        },
      ],
    },
    {
      id: 'insurance',
      title: 'Insurance & Billing',
      icon: 'shield-checkmark',
      color: argonTheme.colors.info,
      faqs: [
        {
          id: 8,
          question: 'Do you accept my insurance?',
          answer: 'We accept most major insurance plans. Add your insurance details in Profile > Insurance Details to verify coverage.',
        },
        {
          id: 9,
          question: 'How much will I pay?',
          answer: 'Your copay depends on your insurance plan. AI consultations are typically $15-25, and doctor visits are $50-100.',
        },
        {
          id: 10,
          question: 'Can I use HSA/FSA?',
          answer: 'Yes! We accept HSA and FSA cards. Select them as payment method during checkout.',
        },
      ],
    },
    {
      id: 'technical',
      title: 'Technical Issues',
      icon: 'settings',
      color: argonTheme.colors.warning,
      faqs: [
        {
          id: 11,
          question: 'Video/audio not working?',
          answer: 'Make sure you\'ve granted camera and microphone permissions in your device settings. Try closing and reopening the app.',
        },
        {
          id: 12,
          question: 'App is slow or freezing',
          answer: 'Try clearing the app cache: Go to Profile > Privacy & Security > Clear Cache. Restart the app after clearing.',
        },
        {
          id: 13,
          question: 'Cannot log in',
          answer: 'Check your email and password. Use "Forgot Password" to reset. If issues persist, contact support.',
        },
      ],
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.faqs.length > 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={argonTheme.colors.gradientWarning}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={argonTheme.colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.8)" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredCategories.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                <Ionicons name={category.icon} size={24} color={category.color} />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryCount}>({category.faqs.length})</Text>
            </View>

            {category.faqs.map((faq) => (
              <TouchableOpacity
                key={faq.id}
                style={[
                  styles.faqCard,
                  expandedId === faq.id && styles.faqCardExpanded
                ]}
                onPress={() => toggleExpand(faq.id)}
              >
                <View style={styles.faqQuestion}>
                  <Ionicons 
                    name="help-circle" 
                    size={20} 
                    color={expandedId === faq.id ? category.color : argonTheme.colors.muted} 
                  />
                  <Text style={[
                    styles.questionText,
                    expandedId === faq.id && { color: category.color }
                  ]}>
                    {faq.question}
                  </Text>
                  <Ionicons 
                    name={expandedId === faq.id ? 'chevron-up' : 'chevron-down'} 
                    size={20} 
                    color={argonTheme.colors.muted} 
                  />
                </View>

                {expandedId === faq.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.answerText}>{faq.answer}</Text>
                    <TouchableOpacity style={styles.helpfulButton}>
                      <Text style={styles.helpfulText}>Was this helpful?</Text>
                      <View style={styles.helpfulActions}>
                        <TouchableOpacity style={styles.thumbButton}>
                          <Ionicons name="thumbs-up-outline" size={16} color={argonTheme.colors.success} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thumbButton}>
                          <Ionicons name="thumbs-down-outline" size={16} color={argonTheme.colors.danger} />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Still need help? */}
        <View style={styles.helpCard}>
          <LinearGradient
            colors={argonTheme.colors.gradientInfo}
            style={styles.helpGradient}
          >
            <Ionicons name="chatbubbles" size={32} color={argonTheme.colors.white} />
            <Text style={styles.helpTitle}>Still need help?</Text>
            <Text style={styles.helpText}>Our support team is available 24/7</Text>
            <TouchableOpacity 
              style={styles.chatButton}
              onPress={() => navigation.navigate('Chat')}
            >
              <Text style={styles.chatButtonText}>Start Live Chat</Text>
              <Ionicons name="arrow-forward" size={16} color={argonTheme.colors.info} />
            </TouchableOpacity>
          </LinearGradient>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: argonTheme.borderRadius.lg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  categoryCount: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
  },
  faqCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 8,
    ...argonTheme.shadows.sm,
  },
  faqCardExpanded: {
    ...argonTheme.shadows.md,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.text,
    lineHeight: 20,
  },
  faqAnswer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border,
  },
  answerText: {
    fontSize: 14,
    color: argonTheme.colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  helpfulText: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  helpfulActions: {
    flexDirection: 'row',
    gap: 12,
  },
  thumbButton: {
    padding: 4,
  },
  helpCard: {
    marginTop: 16,
    marginBottom: 24,
    borderRadius: argonTheme.borderRadius.xl,
    overflow: 'hidden',
    ...argonTheme.shadows.lg,
  },
  helpGradient: {
    padding: 24,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginTop: 12,
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: argonTheme.borderRadius.full,
    gap: 8,
  },
  chatButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.info,
  },
});

