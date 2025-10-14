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
import { useTheme } from '../../contexts/ThemeContext';

export default function NewMessageScreen({ navigation }) {
  const { gradient } = useTheme();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      online: true,
      avatar: '👩‍⚕️',
      lastSeen: 'Online',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'General Physician',
      online: true,
      avatar: '👨‍⚕️',
      lastSeen: 'Online',
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      online: false,
      avatar: '👩‍⚕️',
      lastSeen: 'Last seen 1 hour ago',
    },
    {
      id: 4,
      name: 'Dr. Robert Wilson',
      specialty: 'Orthopedist',
      online: false,
      avatar: '👨‍⚕️',
      lastSeen: 'Last seen yesterday',
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Pediatrician',
      online: true,
      avatar: '👩‍⚕️',
      lastSeen: 'Online',
    },
  ];

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (selectedDoctor && messageText.trim()) {
      // Create new conversation
      navigation.navigate('Conversation', {
        conversation: {
          id: Date.now(),
          doctorName: selectedDoctor.name,
          specialty: selectedDoctor.specialty,
          online: selectedDoctor.online,
          avatar: selectedDoctor.avatar,
        }
      });
    }
  };

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
        <Text style={styles.headerTitle}>New Message</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <View style={styles.content}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={argonTheme.colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors..."
            placeholderTextColor={argonTheme.colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Selected Doctor */}
        {selectedDoctor && (
          <View style={styles.selectedDoctorContainer}>
            <Text style={styles.label}>To:</Text>
            <View style={styles.selectedDoctor}>
              <Text style={styles.selectedDoctorText}>{selectedDoctor.name}</Text>
              <TouchableOpacity onPress={() => setSelectedDoctor(null)}>
                <Ionicons name="close-circle" size={20} color={argonTheme.colors.danger} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Message Input */}
        {selectedDoctor && (
          <View style={styles.messageInputContainer}>
            <Text style={styles.label}>Message:</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Type your message..."
              placeholderTextColor={argonTheme.colors.muted}
              value={messageText}
              onChangeText={setMessageText}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity 
              style={styles.sendButtonContainer}
              onPress={handleSend}
              disabled={!messageText.trim()}
            >
              <LinearGradient
                colors={messageText.trim() ? gradient : ['#ccc', '#aaa']}
                style={styles.sendButton}
              >
                <Ionicons name="send" size={20} color={argonTheme.colors.white} />
                <Text style={styles.sendButtonText}>Send Message</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Doctors List */}
        {!selectedDoctor && (
          <>
            <Text style={styles.sectionTitle}>Select a Doctor</Text>
            <ScrollView style={styles.doctorsList} showsVerticalScrollIndicator={false}>
              {filteredDoctors.map((doctor) => (
                <TouchableOpacity
                  key={doctor.id}
                  style={styles.doctorCard}
                  onPress={() => setSelectedDoctor(doctor)}
                >
                  <View style={styles.doctorAvatarContainer}>
                    <View style={styles.doctorAvatar}>
                      <Text style={styles.avatarEmoji}>{doctor.avatar}</Text>
                    </View>
                    {doctor.online && <View style={styles.onlineIndicator} />}
                  </View>

                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.specialty}>{doctor.specialty}</Text>
                    <Text style={styles.lastSeen}>
                      {doctor.online && (
                        <Ionicons name="checkmark-circle" size={12} color={argonTheme.colors.success} />
                      )}
                      {' '}{doctor.lastSeen}
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color={argonTheme.colors.muted} />
                </TouchableOpacity>
              ))}

              {filteredDoctors.length === 0 && (
                <View style={styles.emptyState}>
                  <Ionicons name="people-outline" size={64} color={argonTheme.colors.muted} />
                  <Text style={styles.emptyTitle}>No doctors found</Text>
                  <Text style={styles.emptyText}>Try a different search term</Text>
                </View>
              )}
            </ScrollView>
          </>
        )}
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
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    ...argonTheme.shadows.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: argonTheme.colors.text,
  },
  selectedDoctorContainer: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...argonTheme.shadows.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: argonTheme.colors.muted,
    marginBottom: 8,
  },
  selectedDoctor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: argonTheme.colors.background,
    padding: 12,
    borderRadius: 8,
  },
  selectedDoctorText: {
    fontSize: 15,
    fontWeight: '600',
    color: argonTheme.colors.heading,
  },
  messageInputContainer: {
    backgroundColor: argonTheme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...argonTheme.shadows.sm,
  },
  messageInput: {
    backgroundColor: argonTheme.colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: argonTheme.colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  sendButtonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  sendButtonText: {
    color: argonTheme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginBottom: 16,
  },
  doctorsList: {
    flex: 1,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: argonTheme.colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...argonTheme.shadows.sm,
  },
  doctorAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  doctorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: argonTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 26,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: argonTheme.colors.success,
    borderWidth: 2,
    borderColor: argonTheme.colors.white,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.heading,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: argonTheme.colors.muted,
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 12,
    color: argonTheme.colors.muted,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: argonTheme.colors.muted,
    textAlign: 'center',
  },
});

