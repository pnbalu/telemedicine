import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function ChatScreen({ navigation }) {
  const { gradient } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your TeleMedX assistant. How can I help you today?',
      sender: 'support',
      timestamp: new Date('2025-10-12T09:00:00'),
      read: true,
    },
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date(),
        read: false,
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate support typing response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const supportMessage = {
          id: messages.length + 2,
          text: 'Thank you for your message. Let me check that for you.',
          sender: 'support',
          timestamp: new Date(),
          read: false,
        };
        setMessages(prev => [...prev, supportMessage]);
      }, 2000);
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      appointment: 'I would like to book an appointment.',
      prescription: 'I have a question about my prescription.',
      faq: 'I need help with a common question.',
      emergency: 'This is an urgent medical question.',
    };

    if (actionMessages[action]) {
      const newMessage = {
        id: messages.length + 1,
        text: actionMessages[action],
        sender: 'user',
        timestamp: new Date(),
        read: false,
      };
      setMessages([...messages, newMessage]);
      
      // Auto-response
      setTimeout(() => {
        let response = '';
        switch(action) {
          case 'appointment':
            response = 'Great! I can help you schedule an appointment. Would you prefer:\n\n1. AI Health Assistant ($15, 5-10 min)\n2. Video with Doctor ($75, 30 min)';
            break;
          case 'prescription':
            response = 'I\'d be happy to help with your prescription. Please provide your prescription number or tell me what you need.';
            break;
          case 'faq':
            response = 'Here are our most common topics:\n\n• Appointment booking\n• Prescription refills\n• Insurance coverage\n• Payment methods\n\nWhich topic interests you?';
            break;
          case 'emergency':
            response = '🚨 For medical emergencies, please call 911 immediately.\n\nFor urgent but non-emergency medical questions, I can connect you with a doctor right away.';
            break;
        }
        
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: response,
          sender: 'support',
          timestamp: new Date(),
          read: false,
        }]);
      }, 1500);
    }
  };

  const handleCamera = async () => {
    setShowActionMenu(false);
    
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is needed to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        const photoMessage = {
          id: messages.length + 1,
          type: 'image',
          imageUri: result.assets[0].uri,
          text: 'Photo',
          sender: 'user',
          timestamp: new Date(),
          read: false,
        };
        setMessages([...messages, photoMessage]);
        
        // Support auto-response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: 'Thank you for sharing the photo. I\'ve received it and will review it shortly.',
            sender: 'support',
            timestamp: new Date(),
            read: false,
          }]);
        }, 1500);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera. Please try again.');
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Microphone permission is needed to record voice notes');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      const voiceMessage = {
        id: messages.length + 1,
        type: 'voice',
        voiceUri: uri,
        duration: '0:05', // TODO: Calculate actual duration
        text: 'Voice Note',
        sender: 'user',
        timestamp: new Date(),
        read: false,
      };
      
      setMessages([...messages, voiceMessage]);
      setRecording(null);

      // Support auto-response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: 'I\'ve received your voice note and will listen to it right away.',
          sender: 'support',
          timestamp: new Date(),
          read: false,
        }]);
      }, 1500);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('Error', 'Failed to save recording. Please try again.');
      setRecording(null);
      setIsRecording(false);
    }
  };

  const handleAttachAction = (actionType) => {
    setShowActionMenu(false);
    
    switch(actionType) {
      case 'appointment':
        navigation.navigate('BookAppointment');
        break;
      case 'prescription':
        navigation.navigate('Prescriptions');
        break;
      case 'documents':
        Alert.alert('Upload File', 'File picker will be implemented soon.');
        break;
      case 'camera':
        handleCamera();
        break;
      case 'faq':
        navigation.navigate('FAQList');
        break;
      case 'location':
        Alert.alert('Share Location', 'Location sharing will be implemented soon.');
        break;
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';
    
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.supportMessageContainer
        ]}
      >
        {!isUser && (
          <View style={styles.supportAvatar}>
            <Ionicons name="headset" size={16} color={argonTheme.colors.white} />
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.supportBubble,
          (message.type === 'image' || message.type === 'voice') && styles.mediaBubble
        ]}>
          {!isUser && (
            <Text style={styles.senderName}>Support Team</Text>
          )}
          
          {/* Image Message */}
          {message.type === 'image' && message.imageUri && (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: message.imageUri }} 
                style={styles.messageImage}
                resizeMode="cover"
              />
            </View>
          )}
          
          {/* Voice Message */}
          {message.type === 'voice' && (
            <TouchableOpacity 
              style={styles.voiceNoteContainer}
              onPress={() => Alert.alert('Voice Note', 'Playback will be implemented soon')}
            >
              <View style={[styles.voiceIcon, isUser && styles.voiceIconUser]}>
                <Ionicons 
                  name="play" 
                  size={16} 
                  color={isUser ? argonTheme.colors.white : gradient[0]} 
                />
              </View>
              <View style={styles.voiceInfo}>
                <View style={styles.voiceWaveform}>
                  {[...Array(20)].map((_, i) => (
                    <View 
                      key={i} 
                      style={[
                        styles.waveformBar,
                        { 
                          height: Math.random() * 20 + 10,
                          backgroundColor: isUser 
                            ? 'rgba(255, 255, 255, 0.6)' 
                            : gradient[0] + '60'
                        }
                      ]} 
                    />
                  ))}
                </View>
                <Text style={[
                  styles.voiceDuration,
                  isUser ? styles.userMessageText : styles.supportMessageText
                ]}>
                  {message.duration || '0:05'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          
          {/* Text Message */}
          {(!message.type || message.type === 'text') && (
            <Text style={[
              styles.messageText,
              isUser ? styles.userMessageText : styles.supportMessageText
            ]}>
              {message.text}
            </Text>
          )}
          
          <View style={styles.messageFooter}>
            <Text style={[
              styles.messageTime,
              isUser ? styles.userMessageTime : styles.supportMessageTime
            ]}>
              {formatTime(message.timestamp)}
            </Text>
            {isUser && (
              <Ionicons 
                name={message.read ? 'checkmark-done' : 'checkmark'} 
                size={14} 
                color="rgba(255, 255, 255, 0.7)" 
              />
            )}
          </View>
        </View>
        
        {isUser && (
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={16} color={argonTheme.colors.white} />
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.headerAvatar}>
              <Ionicons name="headset" size={24} color={argonTheme.colors.white} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Live Support</Text>
              <View style={styles.statusRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.headerSubtitle}>Online • Avg. response: 2 min</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('ChatHistory')}
          >
            <Ionicons name="time-outline" size={22} color={argonTheme.colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Divider */}
        <View style={styles.dateDivider}>
          <View style={styles.dateDividerLine} />
          <Text style={styles.dateDividerText}>Today</Text>
          <View style={styles.dateDividerLine} />
        </View>

        {messages.map(renderMessage)}

        {/* Typing Indicator */}
        {isTyping && (
          <View style={[styles.messageContainer, styles.supportMessageContainer]}>
            <View style={styles.supportAvatar}>
              <Ionicons name="headset" size={16} color={argonTheme.colors.white} />
            </View>
            <View style={[styles.messageBubble, styles.supportBubble, styles.typingBubble]}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.quickActionsContent}
        >
          <TouchableOpacity 
            style={styles.quickActionChip}
            onPress={() => handleQuickAction('appointment')}
          >
            <Ionicons name="calendar" size={16} color={argonTheme.colors.primary} />
            <Text style={styles.quickActionText}>Book Appointment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionChip}
            onPress={() => handleQuickAction('prescription')}
          >
            <Ionicons name="medical" size={16} color={argonTheme.colors.success} />
            <Text style={styles.quickActionText}>Prescription Help</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionChip}
            onPress={() => handleQuickAction('faq')}
          >
            <Ionicons name="help-circle" size={16} color={argonTheme.colors.warning} />
            <Text style={styles.quickActionText}>FAQ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickActionChip, styles.emergencyChip]}
            onPress={() => handleQuickAction('emergency')}
          >
            <Ionicons name="alert-circle" size={16} color={argonTheme.colors.danger} />
            <Text style={[styles.quickActionText, { color: argonTheme.colors.danger }]}>Emergency</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.attachButton}
          onPress={() => setShowActionMenu(true)}
        >
          <LinearGradient
            colors={gradient}
            style={styles.attachButtonGradient}
          >
            <Ionicons name="add" size={24} color={argonTheme.colors.white} />
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor={argonTheme.colors.muted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
        </View>

        {/* Voice Recording Button (shows when no text) */}
        {!inputText.trim() && !isRecording && (
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={startRecording}
          >
            <Ionicons name="mic" size={22} color={gradient[0]} />
          </TouchableOpacity>
        )}

        {/* Stop Recording Button (shows when recording) */}
        {isRecording && (
          <TouchableOpacity 
            style={styles.recordingButton}
            onPress={stopRecording}
          >
            <LinearGradient
              colors={[argonTheme.colors.danger, '#ff6b6b']}
              style={styles.recordingButtonGradient}
            >
              <View style={styles.recordingPulse} />
              <Ionicons name="stop" size={18} color={argonTheme.colors.white} />
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Send Button (shows when has text) */}
        {inputText.trim() && !isRecording && (
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSend}
          >
            <LinearGradient
              colors={gradient}
              style={styles.sendButtonGradient}
            >
              <Ionicons name="send" size={18} color={argonTheme.colors.white} />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>

      {/* Recording Indicator */}
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>Recording voice note...</Text>
          <Text style={styles.recordingHint}>Tap stop when done</Text>
        </View>
      )}

      {/* Action Menu Modal */}
      <Modal
        visible={showActionMenu}
        transparent
        animationType="slide"
        onRequestClose={() => setShowActionMenu(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowActionMenu(false)}
        >
          <View style={styles.actionMenu}>
            <View style={styles.actionMenuHandle} />
            
            <Text style={styles.actionMenuTitle}>What would you like to do?</Text>
            
            <View style={styles.actionGrid}>
              <TouchableOpacity 
                style={styles.actionItem}
                onPress={() => handleAttachAction('appointment')}
              >
                <View style={[styles.actionIcon, { backgroundColor: argonTheme.colors.primary + '20' }]}>
                  <Ionicons name="calendar" size={28} color={argonTheme.colors.primary} />
                </View>
                <Text style={styles.actionLabel}>Book Appointment</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionItem}
                onPress={() => handleAttachAction('prescription')}
              >
                <View style={[styles.actionIcon, { backgroundColor: argonTheme.colors.success + '20' }]}>
                  <Ionicons name="medical" size={28} color={argonTheme.colors.success} />
                </View>
                <Text style={styles.actionLabel}>My Prescriptions</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionItem}
                onPress={() => handleAttachAction('camera')}
              >
                <View style={[styles.actionIcon, { backgroundColor: argonTheme.colors.info + '20' }]}>
                  <Ionicons name="camera" size={28} color={argonTheme.colors.info} />
                </View>
                <Text style={styles.actionLabel}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionItem}
                onPress={() => handleAttachAction('documents')}
              >
                <View style={[styles.actionIcon, { backgroundColor: argonTheme.colors.warning + '20' }]}>
                  <Ionicons name="document-attach" size={28} color={argonTheme.colors.warning} />
                </View>
                <Text style={styles.actionLabel}>Upload File</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionItem}
                onPress={() => {
                  setShowActionMenu(false);
                  navigation.navigate('FAQList');
                }}
              >
                <View style={[styles.actionIcon, { backgroundColor: argonTheme.colors.primary + '20' }]}>
                  <Ionicons name="help-circle" size={28} color={argonTheme.colors.primary} />
                </View>
                <Text style={styles.actionLabel}>Browse FAQ</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionItem}
                onPress={() => handleAttachAction('location')}
              >
                <View style={[styles.actionIcon, { backgroundColor: argonTheme.colors.danger + '20' }]}>
                  <Ionicons name="location" size={28} color={argonTheme.colors.danger} />
                </View>
                <Text style={styles.actionLabel}>Share Location</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowActionMenu(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
    marginRight: 6,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  menuButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dateDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: argonTheme.colors.border,
  },
  dateDividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: argonTheme.colors.textMuted,
    fontWeight: '500',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  supportMessageContainer: {
    justifyContent: 'flex-start',
  },
  supportAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: argonTheme.colors.info,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: argonTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  supportBubble: {
    backgroundColor: argonTheme.colors.white,
    borderBottomLeftRadius: 4,
    ...argonTheme.shadows.sm,
  },
  userBubble: {
    backgroundColor: argonTheme.colors.primary,
    borderBottomRightRadius: 4,
  },
  senderName: {
    fontSize: 11,
    fontWeight: '600',
    color: argonTheme.colors.info,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  supportMessageText: {
    color: argonTheme.colors.text,
  },
  userMessageText: {
    color: argonTheme.colors.white,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  messageTime: {
    fontSize: 11,
  },
  supportMessageTime: {
    color: argonTheme.colors.textMuted,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  typingBubble: {
    paddingVertical: 14,
  },
  typingIndicator: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: argonTheme.colors.info,
    opacity: 0.6,
  },
  quickActions: {
    backgroundColor: argonTheme.colors.background,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border + '50',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  quickActionsContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  quickActionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: argonTheme.borderRadius.full,
    gap: 6,
    borderWidth: 1,
    borderColor: argonTheme.colors.border,
    ...argonTheme.shadows.sm,
  },
  emergencyChip: {
    borderColor: argonTheme.colors.danger,
    backgroundColor: argonTheme.colors.danger + '10',
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: argonTheme.colors.white,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border + '50',
    gap: 10,
    ...argonTheme.shadows.lg,
  },
  attachButton: {
    marginBottom: 2,
  },
  attachButtonGradient: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    ...argonTheme.shadows.md,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.xl,
    borderWidth: 1.5,
    borderColor: argonTheme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    minHeight: 42,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    color: argonTheme.colors.text,
    minHeight: 22,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendButton: {
    marginBottom: 2,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    ...argonTheme.shadows.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  actionMenu: {
    backgroundColor: argonTheme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  actionMenuHandle: {
    width: 40,
    height: 4,
    backgroundColor: argonTheme.colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  actionMenuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 20,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  actionItem: {
    width: '30%',
    alignItems: 'center',
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: argonTheme.colors.text,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: argonTheme.borderRadius.lg,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.textMuted,
  },
  voiceButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: argonTheme.colors.white,
    borderWidth: 2,
    borderColor: argonTheme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  recordingButton: {
    marginBottom: 2,
  },
  recordingButtonGradient: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    ...argonTheme.shadows.md,
  },
  recordingPulse: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: argonTheme.colors.danger,
    opacity: 0.3,
  },
  recordingIndicator: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    backgroundColor: argonTheme.colors.danger + '15',
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: argonTheme.colors.danger,
  },
  recordingText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.danger,
  },
  recordingHint: {
    fontSize: 12,
    color: argonTheme.colors.textMuted,
  },
  mediaBubble: {
    padding: 4,
  },
  imageContainer: {
    marginBottom: 4,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  voiceNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 180,
  },
  voiceIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: argonTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceIconUser: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  voiceInfo: {
    flex: 1,
  },
  voiceWaveform: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    gap: 2,
    marginBottom: 4,
  },
  waveformBar: {
    width: 3,
    borderRadius: 1.5,
  },
  voiceDuration: {
    fontSize: 12,
    fontWeight: '600',
  },
});

