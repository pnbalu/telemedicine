import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function ConsultationRoomScreen({ navigation, route }) {
  const { appointment } = route.params || {};
  const { gradient, primaryColor } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const handleEndCall = () => {
    Alert.alert(
      'End Consultation',
      'Are you sure you want to end this consultation?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'End Call', 
          style: 'destructive',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Video Feeds */}
      <View style={styles.videoContainer}>
        {/* Patient Video (Main) */}
        <View style={styles.mainVideo}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.videoPlaceholder}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.videoOverlay}
          >
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{appointment?.patient || 'John Doe'}</Text>
              <View style={styles.callStatus}>
                <View style={styles.recordingDot} />
                <Text style={styles.callDuration}>12:34</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Doctor Video (PIP) */}
        <View style={styles.pipVideo}>
          <View style={styles.pipPlaceholder}>
            {isVideoOff ? (
              <View style={styles.videoOffOverlay}>
                <Ionicons name="videocam-off" size={30} color={argonTheme.colors.white} />
              </View>
            ) : (
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                style={styles.pipImage}
              />
            )}
          </View>
          <Text style={styles.pipLabel}>You</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity 
            style={styles.topButton}
            onPress={() => setShowNotes(!showNotes)}
          >
            <Ionicons name="document-text-outline" size={22} color={argonTheme.colors.white} />
            <Text style={styles.topButtonText}>Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.topButton}
            onPress={() => Alert.alert('Patient Record', 'Opening patient record...')}
          >
            <Ionicons name="folder-open-outline" size={22} color={argonTheme.colors.white} />
            <Text style={styles.topButtonText}>Records</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.topButton, isRecording && styles.topButtonActive]}
            onPress={() => {
              setIsRecording(!isRecording);
              Alert.alert(
                isRecording ? 'Recording Stopped' : 'Recording Started',
                isRecording ? 'Session recording saved' : 'Session is now being recorded'
              );
            }}
          >
            <Ionicons 
              name={isRecording ? "radio-button-on" : "radio-button-off"}
              size={22} 
              color={isRecording ? argonTheme.colors.danger : argonTheme.colors.white}
            />
            <Text style={[
              styles.topButtonText,
              isRecording && { color: argonTheme.colors.danger }
            ]}>
              {isRecording ? 'Recording' : 'Record'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Main Controls */}
        <View style={styles.mainControls}>
          <TouchableOpacity 
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Ionicons 
              name={isMuted ? "mic-off" : "mic"}
              size={26}
              color={argonTheme.colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, isVideoOff && styles.controlButtonActive]}
            onPress={() => setIsVideoOff(!isVideoOff)}
          >
            <Ionicons 
              name={isVideoOff ? "videocam-off" : "videocam"}
              size={26}
              color={argonTheme.colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => Alert.alert('Share Screen', 'Screen sharing will start')}
          >
            <Ionicons 
              name="desktop-outline"
              size={26}
              color={argonTheme.colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => Alert.alert('Chat', 'Opening chat...')}
          >
            <Ionicons 
              name="chatbubble-outline"
              size={26}
              color={argonTheme.colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, styles.endCallButton]}
            onPress={handleEndCall}
          >
            <Ionicons 
              name="call"
              size={26}
              color={argonTheme.colors.white}
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('WritePrescription')}
          >
            <LinearGradient colors={gradient} style={styles.actionGradient}>
              <Ionicons name="medical" size={18} color={argonTheme.colors.white} />
              <Text style={styles.actionText}>Write Prescription</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Lab Order', 'Creating lab order...')}
          >
            <LinearGradient colors={gradient} style={styles.actionGradient}>
              <Ionicons name="flask" size={18} color={argonTheme.colors.white} />
              <Text style={styles.actionText}>Order Lab Tests</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notes Panel (Overlay) */}
      {showNotes && (
        <View style={styles.notesPanel}>
          <View style={styles.notesPanelHeader}>
            <Text style={styles.notesPanelTitle}>Consultation Notes</Text>
            <TouchableOpacity onPress={() => setShowNotes(false)}>
              <Ionicons name="close-circle" size={24} color={argonTheme.colors.muted} />
            </TouchableOpacity>
          </View>
          <View style={styles.notesPanelContent}>
            <Text style={styles.notesPlaceholder}>
              Quick notes will appear here during the consultation...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: argonTheme.colors.black,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  mainVideo: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    position: 'relative',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  patientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  callStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: argonTheme.colors.danger,
  },
  callDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.white,
  },
  pipVideo: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    ...argonTheme.shadows.lg,
  },
  pipPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2a2a2a',
    position: 'relative',
  },
  pipImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOffOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  pipLabel: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    fontSize: 12,
    fontWeight: '600',
    color: argonTheme.colors.white,
  },
  controlsContainer: {
    backgroundColor: 'rgba(0,0,0,0.95)',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  topButton: {
    alignItems: 'center',
    gap: 4,
  },
  topButtonActive: {
    opacity: 1,
  },
  topButtonText: {
    fontSize: 11,
    color: argonTheme.colors.white,
    fontWeight: '500',
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: argonTheme.colors.danger,
  },
  endCallButton: {
    backgroundColor: argonTheme.colors.danger,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: argonTheme.borderRadius.md,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  notesPanel: {
    position: 'absolute',
    bottom: 200,
    left: 20,
    right: 20,
    backgroundColor: argonTheme.colors.white,
    borderRadius: argonTheme.borderRadius.xl,
    maxHeight: 300,
    ...argonTheme.shadows.lg,
  },
  notesPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: argonTheme.colors.border,
  },
  notesPanelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: argonTheme.colors.heading,
  },
  notesPanelContent: {
    padding: 16,
  },
  notesPlaceholder: {
    fontSize: 14,
    color: argonTheme.colors.textMuted,
    fontStyle: 'italic',
  },
});

