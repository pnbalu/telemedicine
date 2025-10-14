import React from 'react';
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

export default function ChatHistoryScreen({ navigation }) {
  const chatSessions = [
    {
      id: 1,
      date: 'Today',
      time: '9:00 AM',
      subject: 'Prescription Question',
      lastMessage: 'Thank you for your message. Let me check that for you.',
      unread: 3,
      status: 'active',
    },
    {
      id: 2,
      date: 'Yesterday',
      time: '2:30 PM',
      subject: 'Appointment Booking',
      lastMessage: 'Your appointment has been scheduled for Oct 15.',
      unread: 0,
      status: 'resolved',
    },
    {
      id: 3,
      date: 'Oct 10',
      time: '11:15 AM',
      subject: 'Insurance Coverage',
      lastMessage: 'Your insurance has been verified successfully.',
      unread: 0,
      status: 'resolved',
    },
    {
      id: 4,
      date: 'Oct 8',
      time: '4:45 PM',
      subject: 'Technical Support',
      lastMessage: 'Glad I could help! Let me know if you need anything else.',
      unread: 0,
      status: 'resolved',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={argonTheme.colors.gradientPrimary}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat History</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {chatSessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={styles.sessionCard}
            onPress={() => navigation.navigate('Chat')}
          >
            <View style={styles.sessionIcon}>
              <Ionicons 
                name={session.status === 'active' ? 'chatbubbles' : 'checkmark-circle'} 
                size={24} 
                color={session.status === 'active' ? argonTheme.colors.info : argonTheme.colors.success} 
              />
            </View>

            <View style={styles.sessionContent}>
              <View style={styles.sessionHeader}>
                <Text style={styles.sessionSubject}>{session.subject}</Text>
                <Text style={styles.sessionTime}>{session.time}</Text>
              </View>
              <Text style={styles.sessionMessage} numberOfLines={1}>
                {session.lastMessage}
              </Text>
              <Text style={styles.sessionDate}>{session.date}</Text>
            </View>

            {session.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{session.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        {chatSessions.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No chat history</Text>
            <Text style={styles.emptyText}>
              Start a conversation with our support team
            </Text>
            <TouchableOpacity 
              style={styles.startChatButton}
              onPress={() => navigation.navigate('Chat')}
            >
              <LinearGradient
                colors={argonTheme.colors.gradientPrimary}
                style={styles.startChatGradient}
              >
                <Ionicons name="chatbubbles" size={20} color={argonTheme.colors.white} />
                <Text style={styles.startChatText}>Start New Chat</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    paddingBottom: 20,
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
  content: {
    flex: 1,
    padding: 16,
  },
  sessionCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.lg,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    ...argonTheme.shadows.sm,
  },
  sessionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: argonTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sessionContent: {
    flex: 1,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sessionSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    flex: 1,
  },
  sessionTime: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  sessionMessage: {
    fontSize: 14,
    color: argonTheme.colors.text,
    marginBottom: 4,
  },
  sessionDate: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: argonTheme.colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
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
    marginBottom: 24,
  },
  startChatButton: {
    borderRadius: argonTheme.borderRadius.lg,
    overflow: 'hidden',
  },
  startChatGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 8,
  },
  startChatText: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.white,
  },
});

