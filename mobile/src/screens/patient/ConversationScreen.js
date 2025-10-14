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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function ConversationScreen({ navigation, route }) {
  const { conversation } = route.params;
  const { gradient } = useTheme();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const scrollViewRef = useRef();

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I reviewed your latest lab results.',
      sender: 'doctor',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: true,
    },
    {
      id: 2,
      text: 'Hi Doctor! Thank you. Is everything okay?',
      sender: 'patient',
      timestamp: new Date(Date.now() - 3500000),
      read: true,
    },
    {
      id: 3,
      text: 'Yes, your cholesterol levels have improved significantly. The medication is working well.',
      sender: 'doctor',
      timestamp: new Date(Date.now() - 3400000),
      read: true,
    },
    {
      id: 4,
      text: 'That\'s great to hear! Should I continue with the same dosage?',
      sender: 'patient',
      timestamp: new Date(Date.now() - 3300000),
      read: true,
    },
    {
      id: 5,
      text: 'Yes, continue with Atorvastatin 10mg. Let\'s recheck in 3 months.',
      sender: 'doctor',
      timestamp: new Date(Date.now() - 120000), // 2 min ago
      read: false,
    },
  ]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText.trim(),
        sender: 'patient',
        timestamp: new Date(),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setIsTyping(true);

      // Simulate doctor typing and response
      setTimeout(() => {
        const doctorMessage = {
          id: messages.length + 2,
          text: 'Thank you for your message. I\'ll review this and get back to you shortly.',
          sender: 'doctor',
          timestamp: new Date(),
          read: false,
        };
        setMessages(prev => [...prev, doctorMessage]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleAttachment = (type) => {
    setShowOptions(false);
    switch(type) {
      case 'photo':
        alert('Camera/Photo picker opening...');
        break;
      case 'document':
        alert('Document picker opening...');
        break;
      case 'prescription':
        navigation.navigate('Prescriptions');
        break;
      case 'lab':
        navigation.navigate('LabResults');
        break;
      case 'appointment':
        navigation.navigate('BookAppointment');
        break;
      case 'voice':
        alert('Voice recorder opening...');
        break;
    }
  };

  const renderMessage = (message) => {
    const isPatient = message.sender === 'patient';
    
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isPatient ? styles.patientMessageContainer : styles.doctorMessageContainer
        ]}
      >
        {!isPatient && (
          <View style={styles.doctorAvatar}>
            <Text style={styles.doctorAvatarText}>{conversation.avatar}</Text>
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          isPatient ? styles.patientBubble : styles.doctorBubble
        ]}>
          {!isPatient && (
            <Text style={styles.senderName}>{conversation.doctorName}</Text>
          )}
          <Text style={[
            styles.messageText,
            isPatient ? styles.patientMessageText : styles.doctorMessageText
          ]}>
            {message.text}
          </Text>
          <View style={styles.messageFooter}>
            <Text style={[
              styles.messageTime,
              isPatient ? styles.patientMessageTime : styles.doctorMessageTime
            ]}>
              {formatTime(message.timestamp)}
            </Text>
            {isPatient && (
              <Ionicons 
                name={message.read ? 'checkmark-done' : 'checkmark'} 
                size={14} 
                color={message.read ? gradient[0] : argonTheme.colors.muted} 
                style={styles.readReceipt} 
              />
            )}
          </View>
        </View>
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>{conversation.avatar}</Text>
            {conversation.online && <View style={styles.headerOnlineIndicator} />}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerDoctorName}>{conversation.doctorName}</Text>
            <Text style={styles.headerStatus}>
              {conversation.online ? 'Online' : 'Offline'} • {conversation.specialty}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => alert('More options:\n- View Profile\n- Mute\n- Block\n- Report')}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={argonTheme.colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.doctorMessageContainer]}>
            <View style={styles.doctorAvatar}>
              <Text style={styles.doctorAvatarText}>{conversation.avatar}</Text>
            </View>
            <View style={[styles.messageBubble, styles.doctorBubble]}>
              <Text style={styles.senderName}>{conversation.doctorName}</Text>
              <View style={styles.typingIndicatorContainer}>
                <View style={[styles.typingDot, styles.typingDot1]} />
                <View style={[styles.typingDot, styles.typingDot2]} />
                <View style={[styles.typingDot, styles.typingDot3]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.attachButton}
          onPress={() => setShowOptions(true)}
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
            style={styles.textInput}
            placeholder="Type your message..."
            placeholderTextColor={argonTheme.colors.muted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
          />
        </View>

        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <LinearGradient
            colors={inputText.trim() ? gradient : ['#ccc', '#aaa']}
            style={styles.sendButtonGradient}
          >
            <Ionicons name="send" size={18} color={argonTheme.colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Attachment Options Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showOptions}
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.optionsMenu}>
            <Text style={styles.optionsTitle}>Attach</Text>
            <View style={styles.optionsGrid}>
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => handleAttachment('photo')}
              >
                <LinearGradient colors={argonTheme.colors.gradientInfo} style={styles.optionIcon}>
                  <Ionicons name="camera" size={28} color={argonTheme.colors.white} />
                </LinearGradient>
                <Text style={styles.optionLabel}>Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => handleAttachment('document')}
              >
                <LinearGradient colors={argonTheme.colors.gradientPrimary} style={styles.optionIcon}>
                  <Ionicons name="document-text" size={28} color={argonTheme.colors.white} />
                </LinearGradient>
                <Text style={styles.optionLabel}>Document</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => handleAttachment('prescription')}
              >
                <LinearGradient colors={argonTheme.colors.gradientSuccess} style={styles.optionIcon}>
                  <Ionicons name="medical" size={28} color={argonTheme.colors.white} />
                </LinearGradient>
                <Text style={styles.optionLabel}>Prescription</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => handleAttachment('lab')}
              >
                <LinearGradient colors={argonTheme.colors.gradientWarning} style={styles.optionIcon}>
                  <Ionicons name="flask" size={28} color={argonTheme.colors.white} />
                </LinearGradient>
                <Text style={styles.optionLabel}>Lab Result</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => handleAttachment('appointment')}
              >
                <LinearGradient colors={argonTheme.colors.gradientDanger} style={styles.optionIcon}>
                  <Ionicons name="calendar" size={28} color={argonTheme.colors.white} />
                </LinearGradient>
                <Text style={styles.optionLabel}>Appointment</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => handleAttachment('voice')}
              >
                <LinearGradient colors={argonTheme.colors.gradientPrimary} style={styles.optionIcon}>
                  <Ionicons name="mic" size={28} color={argonTheme.colors.white} />
                </LinearGradient>
                <Text style={styles.optionLabel}>Voice Note</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowOptions(false)}
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
    paddingHorizontal: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  headerAvatarText: {
    fontSize: 24,
  },
  headerOnlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: argonTheme.colors.success,
    borderWidth: 2,
    borderColor: argonTheme.colors.white,
  },
  headerInfo: {
    flex: 1,
  },
  headerDoctorName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  headerStatus: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
  },
  chatContentContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  patientMessageContainer: {
    justifyContent: 'flex-end',
  },
  doctorMessageContainer: {
    justifyContent: 'flex-start',
  },
  doctorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: argonTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    ...argonTheme.shadows.sm,
  },
  doctorAvatarText: {
    fontSize: 18,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
  },
  patientBubble: {
    backgroundColor: argonTheme.colors.primary,
    borderBottomRightRadius: 4,
  },
  doctorBubble: {
    backgroundColor: argonTheme.colors.white,
    borderBottomLeftRadius: 4,
    ...argonTheme.shadows.sm,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.primary,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  patientMessageText: {
    color: argonTheme.colors.white,
  },
  doctorMessageText: {
    color: argonTheme.colors.text,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 11,
  },
  patientMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  doctorMessageTime: {
    color: argonTheme.colors.muted,
  },
  readReceipt: {
    marginLeft: 4,
  },
  typingIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: argonTheme.colors.muted,
  },
  typingDot1: {
    animation: 'pulse 1.4s infinite',
  },
  typingDot2: {
    animation: 'pulse 1.4s infinite 0.2s',
  },
  typingDot3: {
    animation: 'pulse 1.4s infinite 0.4s',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: argonTheme.colors.white,
    borderTopWidth: 1,
    borderTopColor: argonTheme.colors.border,
    gap: 12,
  },
  attachButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  attachButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: argonTheme.colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  textInput: {
    fontSize: 15,
    color: argonTheme.colors.text,
    minHeight: 20,
  },
  sendButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  optionsMenu: {
    backgroundColor: argonTheme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  optionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  optionItem: {
    width: '30%',
    alignItems: 'center',
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 12,
    color: argonTheme.colors.text,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: argonTheme.colors.background,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.text,
  },
});

