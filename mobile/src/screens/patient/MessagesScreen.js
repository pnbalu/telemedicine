import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function MessagesScreen({ navigation }) {
  const { gradient } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      lastMessage: 'Your cholesterol levels look better. Keep up with the medication.',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      avatar: '👩‍⚕️',
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'General Physician',
      lastMessage: 'I reviewed your test results. Everything looks normal.',
      timestamp: '1 hour ago',
      unread: 0,
      online: true,
      avatar: '👨‍⚕️',
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      lastMessage: 'The skin rash should clear up in 3-5 days with the cream.',
      timestamp: '3 hours ago',
      unread: 1,
      online: false,
      avatar: '👩‍⚕️',
    },
    {
      id: 4,
      doctorName: 'Dr. Robert Wilson',
      specialty: 'Orthopedist',
      lastMessage: 'You: Thanks doctor, I feel much better now',
      timestamp: 'Yesterday',
      unread: 0,
      online: false,
      avatar: '👨‍⚕️',
    },
    {
      id: 5,
      doctorName: 'Support Team',
      specialty: 'Customer Support',
      lastMessage: 'How can we help you today?',
      timestamp: '2 days ago',
      unread: 0,
      online: true,
      avatar: '🏥',
    },
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          {canGoBack && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
            </TouchableOpacity>
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Messages</Text>
            <Text style={styles.headerSubtitle}>
              {conversations.filter(c => c.unread > 0).length} unread conversations
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.composeButton}
            onPress={() => navigation.navigate('NewMessage')}
          >
            <Ionicons name="create-outline" size={24} color={argonTheme.colors.white} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={argonTheme.colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
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
      </LinearGradient>

      {/* Conversations List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredConversations.map((conv) => (
          <TouchableOpacity
            key={conv.id}
            style={styles.conversationCard}
            onPress={() => {
              // Navigate to ChatScreen for Support Team, Conversation for doctors
              if (conv.doctorName === 'Support Team') {
                navigation.navigate('ChatScreen');
              } else {
                navigation.navigate('Conversation', { conversation: conv });
              }
            }}
          >
            {/* Avatar with online indicator */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>{conv.avatar}</Text>
              </View>
              {conv.online && <View style={styles.onlineIndicator} />}
            </View>

            {/* Message Content */}
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.doctorName}>{conv.doctorName}</Text>
                <Text style={styles.timestamp}>{conv.timestamp}</Text>
              </View>
              <Text style={styles.specialty}>{conv.specialty}</Text>
              <Text 
                style={[
                  styles.lastMessage,
                  conv.unread > 0 && styles.lastMessageUnread
                ]}
                numberOfLines={1}
              >
                {conv.lastMessage}
              </Text>
            </View>

            {/* Unread badge */}
            {conv.unread > 0 && (
              <View style={[styles.unreadBadge, { backgroundColor: gradient[0] }]}>
                <Text style={styles.unreadText}>{conv.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {filteredConversations.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={argonTheme.colors.muted} />
            <Text style={styles.emptyTitle}>No conversations found</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Try a different search term' : 'Start a new conversation with your doctor'}
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate('NewMessage')}
            >
              <LinearGradient
                colors={gradient}
                style={styles.emptyButtonGradient}
              >
                <Ionicons name="add" size={20} color={argonTheme.colors.white} />
                <Text style={styles.emptyButtonText}>New Message</Text>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  composeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  conversationCard: {
    flexDirection: 'row',
    backgroundColor: argonTheme.colors.white,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    ...argonTheme.shadows.sm,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: argonTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: argonTheme.colors.success,
    borderWidth: 2,
    borderColor: argonTheme.colors.white,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
  },
  timestamp: {
    fontSize: 12,
    color: argonTheme.colors.muted,
  },
  specialty: {
    fontSize: 13,
    color: argonTheme.colors.muted,
    marginBottom: 6,
  },
  lastMessage: {
    fontSize: 14,
    color: argonTheme.colors.text,
    lineHeight: 20,
  },
  lastMessageUnread: {
    fontWeight: '600',
    color: argonTheme.colors.heading,
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  unreadText: {
    color: argonTheme.colors.white,
    fontSize: 12,
    fontWeight: 'bold',
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
    color: argonTheme.colors.muted,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  emptyButtonText: {
    color: argonTheme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

