import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function HelpSupportScreen({ navigation }) {
  const { gradient, primaryColor } = useTheme();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleContact = (type) => {
    switch (type) {
      case 'email':
        Linking.openURL('mailto:support@telemedx.com');
        break;
      case 'phone':
        Linking.openURL('tel:+15551234567');
        break;
      case 'chat':
        Alert.alert(
          'Live Chat Support',
          'Connect with our support team 24/7!\n\n💬 Our live chat agents can help with:\n• Technical issues\n• Account questions\n• Billing inquiries\n• General support\n• Appointment assistance\n\nWould you like to start a chat?',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Start Chat', 
              onPress: () => {
                // Navigate to main tabs and select Messages tab
                navigation.navigate('Main', { 
                  screen: 'Messages'
                });
              }
            }
          ]
        );
        break;
      case 'whatsapp':
        Linking.openURL('https://wa.me/15551234567');
        break;
    }
  };

  const handleFeedback = () => {
    Alert.alert(
      'Send Feedback',
      'We value your feedback! How would you like to share your thoughts?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Rate App', 
          onPress: () => Alert.alert('Thank you!', 'Redirecting to app store...')
        },
        { 
          text: 'Send Email', 
          onPress: () => Linking.openURL('mailto:feedback@telemedx.com')
        }
      ]
    );
  };

  const handleReportIssue = () => {
    Alert.alert(
      'Report an Issue',
      'Please describe the issue you\'re experiencing:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Technical Issue', onPress: () => Alert.alert('Issue Reported', 'Our team will look into this.') },
        { text: 'Payment Issue', onPress: () => Alert.alert('Issue Reported', 'Our team will look into this.') },
        { text: 'Other', onPress: () => Alert.alert('Issue Reported', 'Our team will look into this.') }
      ]
    );
  };

  const handleResource = (resource) => {
    switch (resource) {
      case 'guide':
        Alert.alert(
          'User Guide',
          'Welcome to TeleMedX User Guide!\n\n📋 Topics Available:\n• Getting Started\n• Booking Appointments\n• Video Consultations\n• Managing Prescriptions\n• Lab Results\n• Profile Settings\n\nWould you like to view the full guide?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'View Guide', onPress: () => Linking.openURL('https://telemedx.com/user-guide') }
          ]
        );
        break;
      case 'tutorials':
        Alert.alert(
          'Video Tutorials',
          'Learn how to use TeleMedX with our video tutorials:\n\n🎥 Available Videos:\n• How to Book an Appointment\n• Joining Video Consultations\n• Managing Your Profile\n• Using AI Chat Feature\n• Understanding Lab Results\n• Payment Methods\n\nWatch tutorials on our website?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Watch Videos', onPress: () => Linking.openURL('https://telemedx.com/tutorials') }
          ]
        );
        break;
      case 'docs':
        Alert.alert(
          'Documentation',
          'Access comprehensive documentation:\n\n📄 Documentation Includes:\n• Feature Guides\n• Troubleshooting\n• Security & Privacy\n• Terms of Service\n• FAQ Database\n• API Documentation\n\nView full documentation?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'View Docs', onPress: () => Linking.openURL('https://telemedx.com/docs') }
          ]
        );
        break;
      case 'privacy':
        Alert.alert(
          'Privacy & Security',
          'Your privacy and data security are our top priorities.\n\n🛡️ What You\'ll Find:\n• Privacy Policy\n• Data Protection\n• HIPAA Compliance\n• Security Measures\n• Cookie Policy\n• Terms of Use\n\nRead our privacy policy?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Read Policy', onPress: () => Linking.openURL('https://telemedx.com/privacy') }
          ]
        );
        break;
    }
  };

  const faqs = [
    {
      id: 1,
      category: 'Appointments',
      question: 'How do I book an appointment?',
      answer: 'Go to Dashboard and tap "Book Appointment" button. Select consultation type (Video Call or AI Chat), choose date and time, then confirm your booking. You\'ll receive a confirmation notification.',
    },
    {
      id: 2,
      category: 'Appointments',
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel up to 24 hours before the appointment. Go to Appointments, select your appointment, and tap "Cancel". To reschedule, cancel the current one and book a new time slot.',
    },
    {
      id: 3,
      category: 'Appointments',
      question: 'When can I join my video consultation?',
      answer: 'The "Join" button becomes active 15 minutes before your scheduled time and remains available for 30 minutes after the start time.',
    },
    {
      id: 4,
      category: 'Medical Records',
      question: 'How do I access my prescriptions?',
      answer: 'View all prescriptions in the Prescriptions tab from the bottom menu. You can see active prescriptions, medication details, dosage, and download them as PDF.',
    },
    {
      id: 5,
      category: 'Medical Records',
      question: 'How can I view my lab results?',
      answer: 'Lab results are organized by doctor visits in the Lab Results screen. You can download individual test results or all results as PDF, and share them via email or messaging.',
    },
    {
      id: 6,
      category: 'Medical Records',
      question: 'Can I add my medical history?',
      answer: 'Yes! Go to Profile → Medical History. You can add conditions, allergies, surgeries, and family medical history. This helps doctors provide better care.',
    },
    {
      id: 7,
      category: 'Account & Privacy',
      question: 'Is my health data secure?',
      answer: 'Absolutely! All data is encrypted end-to-end and stored securely. We\'re fully HIPAA compliant and never share your information without explicit consent.',
    },
    {
      id: 8,
      category: 'Account & Privacy',
      question: 'How do I change my theme?',
      answer: 'Go to Profile → Privacy & Security. Choose from 5 beautiful themes: Violet, Green, Orange, Blue, or Red. Your selection persists across sessions.',
    },
    {
      id: 9,
      category: 'Payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept Visa, Mastercard, and other major credit/debit cards. You can add and manage payment methods in Profile → Payment Methods.',
    },
    {
      id: 10,
      category: 'Payment',
      question: 'How do I add a payment card?',
      answer: 'Go to Profile → Payment Methods → Add New Card. You can manually enter card details or use the camera to scan your card for quick entry.',
    },
    {
      id: 11,
      category: 'AI Features',
      question: 'What is AI Chat consultation?',
      answer: 'AI Chat is an AI-powered health assistant that can help with initial consultations, symptom checking, and general health questions 24/7. For serious concerns, we recommend booking a video call with a doctor.',
    },
    {
      id: 12,
      category: 'Technical',
      question: 'I\'m having trouble joining a video call',
      answer: 'Ensure you have a stable internet connection and have granted camera/microphone permissions. If issues persist, try restarting the app or contact support.',
    },
  ];

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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <Text style={styles.headerSubtitle}>We're here to help you 24/7</Text>
        </View>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity 
            style={[styles.quickActionCard, { borderColor: primaryColor + '30' }]}
            onPress={handleFeedback}
          >
            <LinearGradient
              colors={[primaryColor + '15', primaryColor + '05']}
              style={styles.quickActionGradient}
            >
              <Ionicons name="star" size={24} color={primaryColor} />
              <Text style={styles.quickActionText}>Send Feedback</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.quickActionCard, { borderColor: argonTheme.colors.danger + '30' }]}
            onPress={handleReportIssue}
          >
            <LinearGradient
              colors={[argonTheme.colors.danger + '15', argonTheme.colors.danger + '05']}
              style={styles.quickActionGradient}
            >
              <Ionicons name="warning" size={24} color={argonTheme.colors.danger} />
              <Text style={styles.quickActionText}>Report Issue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          
          <TouchableOpacity 
            style={styles.contactCard}
            onPress={() => handleContact('chat')}
          >
            <View style={[styles.contactIcon, { backgroundColor: primaryColor + '20' }]}>
              <Ionicons name="chatbubbles" size={28} color={primaryColor} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Live Chat</Text>
              <Text style={styles.contactSubtitle}>Available 24/7</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactCard}
            onPress={() => handleContact('phone')}
          >
            <View style={[styles.contactIcon, { backgroundColor: argonTheme.colors.success + '20' }]}>
              <Ionicons name="call" size={28} color={argonTheme.colors.success} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Phone Support</Text>
              <Text style={styles.contactSubtitle}>+1 (555) 123-4567</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactCard}
            onPress={() => handleContact('email')}
          >
            <View style={[styles.contactIcon, { backgroundColor: argonTheme.colors.info + '20' }]}>
              <Ionicons name="mail" size={28} color={argonTheme.colors.info} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Email</Text>
              <Text style={styles.contactSubtitle}>support@telemedx.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactCard}
            onPress={() => handleContact('whatsapp')}
          >
            <View style={[styles.contactIcon, { backgroundColor: '#25D366' + '20' }]}>
              <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>WhatsApp</Text>
              <Text style={styles.contactSubtitle}>Chat with us instantly</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <Text style={styles.sectionSubtitle}>{faqs.length} questions</Text>
          </View>
          
          {faqs.map((faq) => (
            <TouchableOpacity 
              key={faq.id} 
              style={styles.faqCard}
              onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
            >
              <View style={styles.faqHeader}>
                <View style={[styles.faqCategoryBadge, { backgroundColor: primaryColor + '15' }]}>
                  <Text style={[styles.faqCategoryText, { color: primaryColor }]}>{faq.category}</Text>
                </View>
              </View>
              <View style={styles.faqQuestionRow}>
                <Ionicons name="help-circle" size={18} color={primaryColor} />
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons 
                  name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"} 
                  size={18} 
                  color={argonTheme.colors.muted} 
                />
              </View>
              {expandedFaq === faq.id && (
                <View style={styles.faqAnswerContainer}>
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  <TouchableOpacity 
                    style={styles.helpfulButton}
                    onPress={() => Alert.alert('Thank you!', 'We\'re glad this was helpful!')}
                  >
                    <Ionicons name="thumbs-up-outline" size={14} color={argonTheme.colors.success} />
                    <Text style={styles.helpfulText}>Was this helpful?</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Helpful Resources</Text>
          
          <View style={styles.resourcesGrid}>
            <TouchableOpacity 
              style={styles.resourceGridItem}
              onPress={() => handleResource('guide')}
            >
              <View style={[styles.resourceIcon, { backgroundColor: argonTheme.colors.warning + '20' }]}>
                <Ionicons name="book-outline" size={28} color={argonTheme.colors.warning} />
              </View>
              <Text style={styles.resourceGridText}>User Guide</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.resourceGridItem}
              onPress={() => handleResource('tutorials')}
            >
              <View style={[styles.resourceIcon, { backgroundColor: argonTheme.colors.danger + '20' }]}>
                <Ionicons name="videocam-outline" size={28} color={argonTheme.colors.danger} />
              </View>
              <Text style={styles.resourceGridText}>Tutorials</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.resourceGridItem}
              onPress={() => handleResource('docs')}
            >
              <View style={[styles.resourceIcon, { backgroundColor: argonTheme.colors.info + '20' }]}>
                <Ionicons name="document-text-outline" size={28} color={argonTheme.colors.info} />
              </View>
              <Text style={styles.resourceGridText}>Docs</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.resourceGridItem}
              onPress={() => handleResource('privacy')}
            >
              <View style={[styles.resourceIcon, { backgroundColor: argonTheme.colors.success + '20' }]}>
                <Ionicons name="shield-checkmark-outline" size={28} color={argonTheme.colors.success} />
              </View>
              <Text style={styles.resourceGridText}>Privacy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Hours */}
        <View style={styles.supportHoursCard}>
          <View style={styles.supportHoursHeader}>
            <Ionicons name="time-outline" size={24} color={primaryColor} />
            <Text style={[styles.supportHoursTitle, { color: primaryColor }]}>Support Hours</Text>
          </View>
          <View style={styles.supportHoursBody}>
            <View style={styles.supportHourRow}>
              <Text style={styles.supportDayText}>Live Chat</Text>
              <Text style={styles.supportTimeText}>24/7 Available</Text>
            </View>
            <View style={styles.supportHourRow}>
              <Text style={styles.supportDayText}>Phone Support</Text>
              <Text style={styles.supportTimeText}>Mon-Fri, 8 AM - 8 PM</Text>
            </View>
            <View style={styles.supportHourRow}>
              <Text style={styles.supportDayText}>Email Response</Text>
              <Text style={styles.supportTimeText}>Within 24 hours</Text>
            </View>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfoCard}>
          <Ionicons name="fitness" size={32} color={primaryColor} style={{ marginBottom: 8 }} />
          <Text style={[styles.appInfoText, { color: primaryColor }]}>TeleMedX</Text>
          <Text style={styles.appVersionText}>Version 1.0.0 (Build 54)</Text>
          <Text style={styles.appCopyrightText}>© 2025 TeleMedX. All rights reserved.</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
  },
  quickActionGradient: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: argonTheme.colors.muted,
    fontWeight: '600',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 12,
    ...argonTheme.shadows.sm,
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
  },
  faqCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 14,
    marginBottom: 10,
    ...argonTheme.shadows.sm,
  },
  faqHeader: {
    marginBottom: 8,
  },
  faqCategoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  faqCategoryText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    flex: 1,
    lineHeight: 20,
  },
  faqAnswerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border + '30',
  },
  faqAnswer: {
    fontSize: 13,
    color: argonTheme.colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
  },
  helpfulText: {
    fontSize: 12,
    color: argonTheme.colors.success,
    fontWeight: '600',
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  resourceGridItem: {
    width: '47%',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    alignItems: 'center',
    gap: 10,
    ...argonTheme.shadows.sm,
  },
  resourceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceGridText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  supportHoursCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 16,
    ...argonTheme.shadows.sm,
  },
  supportHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border + '30',
  },
  supportHoursTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportHoursBody: {
    gap: 12,
  },
  supportHourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  supportDayText: {
    fontSize: 14,
    color: argonTheme.colors.text,
    fontWeight: '500',
  },
  supportTimeText: {
    fontSize: 13,
    color: argonTheme.colors.success,
    fontWeight: '600',
  },
  appInfoCard: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    ...argonTheme.shadows.sm,
  },
  appInfoText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appVersionText: {
    fontSize: 13,
    color: argonTheme.colors.textMuted,
    marginBottom: 8,
  },
  appCopyrightText: {
    fontSize: 11,
    color: argonTheme.colors.muted,
  },
});

