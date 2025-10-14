import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function AIConsultationScreen({ navigation }) {
  const { gradient } = useTheme();
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Skip LiveKit connection - work offline for now
    initializeDemoMode();
  }, []);

  const initializeDemoMode = () => {
    setIsConnecting(false);
    setIsConnected(true);
    
    // Add welcome message
    setMessages([
      {
        id: 1,
        role: 'ai',
        text: "Hello! I'm your AI health assistant. I'm here to help answer your health questions. What brings you here today?",
        timestamp: new Date(),
      }
    ]);

    // Simulate AI speaking
    setTimeout(() => setIsSpeaking(false), 3000);
    setIsSpeaking(true);
  };

  const connectToLiveKit = async () => {
    // LiveKit connection disabled for mobile testing
    // To enable: update apiUrl to use your computer's IP address
    // Example: const apiUrl = 'http://192.168.0.15:3001';
    Alert.alert(
      'Demo Mode',
      'AI Consultation is running in demo mode. To enable real voice:\n\n1. Start backend server on your computer\n2. Update API URL in code\n3. Rebuild app',
      [{ text: 'OK' }]
    );
  };

  const handleSpeak = () => {
    if (!isConnected) {
      Alert.alert('Not Connected', 'Please wait for connection to establish');
      return;
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      text: '[Voice message - tap mic to speak]',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'ai',
        text: "I understand. Can you tell me more about your symptoms?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);
    }, 1500);
  };

  const handleEndSession = () => {
    Alert.alert(
      'End Session',
      'Are you sure you want to end this consultation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End',
          style: 'destructive',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  if (isConnecting) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={gradient} style={styles.header}>
          <Text style={styles.headerTitle}>Connecting to AI...</Text>
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <LinearGradient colors={gradient} style={styles.loadingAvatar}>
            <Ionicons name="chatbubbles" size={48} color={argonTheme.colors.white} />
          </LinearGradient>
          <Text style={styles.loadingText}>Connecting to LiveKit...</Text>
          <Text style={styles.loadingSubtext}>Room: {connectionDetails?.roomName || 'Initializing...'}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleEndSession} style={styles.backButton}>
          <Ionicons name="close" size={28} color={argonTheme.colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI Health Assistant</Text>
          <Text style={styles.headerSubtitle}>LiveKit Voice Consultation</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.statusDot, { backgroundColor: isConnected ? argonTheme.colors.success : argonTheme.colors.danger }]} />
        </View>
      </LinearGradient>

      {/* Connection Info */}
      {connectionDetails && (
        <View style={styles.infoBar}>
          <Ionicons name="radio" size={14} color={argonTheme.colors.success} />
          <Text style={styles.infoBarText}>
            Connected to Room: {connectionDetails.roomName}
          </Text>
        </View>
      )}

      {/* AI Avatar */}
      <View style={styles.avatarSection}>
        <LinearGradient
          colors={gradient}
          style={[
            styles.aiAvatar,
            isSpeaking && styles.aiAvatarActive
          ]}
        >
          <Ionicons name="chatbubbles" size={48} color={argonTheme.colors.white} />
        </LinearGradient>
        <Text style={styles.aiStatus}>
          {isSpeaking ? '🔊 AI is speaking...' : '🎤 Your turn to speak'}
        </Text>
        <Text style={styles.aiSubStatus}>
          {isConnected ? 'Voice assistant ready' : 'Connecting...'}
        </Text>
      </View>

      {/* Transcript */}
      <ScrollView style={styles.transcript} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.role === 'ai' ? styles.aiBubble : styles.userBubble
            ]}
          >
            <Text style={styles.messageRole}>
              {message.role === 'ai' ? '🤖 AI Assistant' : '👤 You'}
            </Text>
            <Text style={[
              styles.messageText,
              message.role === 'ai' ? styles.aiText : styles.userText
            ]}>
              {message.text}
            </Text>
            <Text style={styles.messageTime}>
              {message.timestamp.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </Text>
          </View>
        ))}
        
        {messages.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={48} color={argonTheme.colors.muted} />
            <Text style={styles.emptyText}>Waiting for AI to start...</Text>
          </View>
        )}
      </ScrollView>

      {/* LiveKit Integration Note */}
      <View style={styles.noteCard}>
        <Ionicons name="information-circle" size={16} color={argonTheme.colors.info} />
        <Text style={styles.noteText}>
          Connected to LiveKit backend. Python agent required for voice.
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.micButton}
          onPress={handleSpeak}
          disabled={!isConnected}
        >
          <LinearGradient
            colors={gradient}
            style={styles.micGradient}
          >
            <Ionicons
              name="mic"
              size={32}
              color={argonTheme.colors.white}
            />
          </LinearGradient>
          <Text style={styles.micText}>Tap to Speak</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.endButton} onPress={handleEndSession}>
          <Text style={styles.endButtonText}>End Session</Text>
        </TouchableOpacity>
      </View>
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
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: argonTheme.colors.muted,
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: argonTheme.colors.success + '10',
    gap: 6,
  },
  infoBarText: {
    fontSize: 12,
    color: argonTheme.colors.success,
    fontWeight: '500',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  aiAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    ...argonTheme.shadows.lg,
  },
  aiAvatarActive: {
    transform: [{ scale: 1.1 }],
  },
  aiStatus: {
    fontSize: 16,
    color: argonTheme.colors.heading,
    fontWeight: '600',
    marginBottom: 4,
  },
  aiSubStatus: {
    fontSize: 13,
    color: argonTheme.colors.muted,
  },
  transcript: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: argonTheme.colors.white,
    ...argonTheme.shadows.sm,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: argonTheme.colors.primary + '15',
    borderWidth: 1,
    borderColor: argonTheme.colors.primary + '30',
  },
  messageRole: {
    fontSize: 11,
    fontWeight: '600',
    color: argonTheme.colors.muted,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  aiText: {
    color: argonTheme.colors.text,
  },
  userText: {
    color: argonTheme.colors.text,
  },
  messageTime: {
    fontSize: 10,
    color: argonTheme.colors.muted,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.muted,
    marginTop: 12,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.info + '10',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: argonTheme.borderRadius.md,
    gap: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 11,
    color: argonTheme.colors.info,
    lineHeight: 16,
  },
  controls: {
    padding: 20,
    backgroundColor: argonTheme.colors.white,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border,
  },
  micButton: {
    alignItems: 'center',
    marginBottom: 12,
  },
  micGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    ...argonTheme.shadows.lg,
  },
  micText: {
    fontSize: 13,
    color: argonTheme.colors.text,
    fontWeight: '500',
    marginTop: 8,
  },
  endButton: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.md,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: argonTheme.colors.danger,
  },
  endButtonText: {
    color: argonTheme.colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
});
