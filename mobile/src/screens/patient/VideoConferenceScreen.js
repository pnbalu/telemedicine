import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { argonTheme } from '../../theme/argonTheme';
import { useTheme } from '../../contexts/ThemeContext';

export default function VideoConferenceScreen({ navigation, route }) {
  const { gradient, primaryColor } = useTheme();
  const { appointment } = route.params || {};
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    Alert.alert(
      'End Call',
      'Are you sure you want to end this consultation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Call',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={gradient}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.doctorName}>{appointment?.doctor || 'Dr. Sarah Johnson'}</Text>
            <Text style={styles.specialty}>{appointment?.specialty || 'Cardiologist'}</Text>
          </View>
          <View style={styles.duration}>
            <View style={styles.liveDot} />
            <Text style={styles.durationText}>{formatDuration(duration)}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Video Area */}
      <View style={styles.videoContainer}>
        {/* Doctor Video - Main */}
        <View style={styles.doctorVideo}>
          <View style={styles.videoPlaceholder}>
            <LinearGradient
              colors={gradient}
              style={styles.doctorAvatar}
            >
              <Ionicons name="person" size={80} color={argonTheme.colors.white} />
            </LinearGradient>
            <Text style={styles.doctorVideoName}>{appointment?.doctor || 'Dr. Sarah Johnson'}</Text>
            <Text style={styles.connectionStatus}>Connected</Text>
          </View>
        </View>

        {/* Patient Video - Small */}
        <View style={styles.patientVideoSmall}>
          <LinearGradient
            colors={['#2c3e50', '#34495e']}
            style={styles.patientVideoContent}
          >
            {isVideoOn ? (
              <>
                <Ionicons name="person-circle" size={40} color={argonTheme.colors.white} />
                <Text style={styles.patientVideoText}>You</Text>
              </>
            ) : (
              <>
                <Ionicons name="videocam-off" size={30} color={argonTheme.colors.white} />
                <Text style={styles.patientVideoText}>Camera Off</Text>
              </>
            )}
          </LinearGradient>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Ionicons
              name={isMuted ? 'mic-off' : 'mic'}
              size={28}
              color={isMuted ? argonTheme.colors.danger : argonTheme.colors.white}
            />
            <Text style={styles.controlText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, !isVideoOn && styles.controlButtonActive]}
            onPress={() => setIsVideoOn(!isVideoOn)}
          >
            <Ionicons
              name={isVideoOn ? 'videocam' : 'videocam-off'}
              size={28}
              color={!isVideoOn ? argonTheme.colors.danger : argonTheme.colors.white}
            />
            <Text style={styles.controlText}>{isVideoOn ? 'Stop Video' : 'Start Video'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="people" size={28} color={argonTheme.colors.white} />
            <Text style={styles.controlText}>Participants</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="chatbubbles" size={28} color={argonTheme.colors.white} />
            <Text style={styles.controlText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.endCallButton}
          onPress={handleEndCall}
        >
          <LinearGradient
            colors={[argonTheme.colors.danger, '#c0392b']}
            style={styles.endCallGradient}
          >
            <Ionicons name="call" size={28} color={argonTheme.colors.white} />
            <Text style={styles.endCallText}>End Call</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Ionicons name="shield-checkmark" size={16} color={argonTheme.colors.success} />
        <Text style={styles.infoBannerText}>End-to-end encrypted consultation</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  specialty: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: argonTheme.colors.danger,
  },
  durationText: {
    fontSize: 16,
    fontWeight: '600',
    color: argonTheme.colors.white,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  doctorVideo: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorVideoName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
    marginBottom: 8,
  },
  connectionStatus: {
    fontSize: 14,
    color: argonTheme.colors.success,
  },
  patientVideoSmall: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    ...argonTheme.shadows.lg,
  },
  patientVideoContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientVideoText: {
    fontSize: 12,
    color: argonTheme.colors.white,
    marginTop: 8,
  },
  controls: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#1a1a1a',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  controlButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    minWidth: 70,
  },
  controlButtonActive: {
    backgroundColor: 'rgba(245, 54, 92, 0.2)',
  },
  controlText: {
    fontSize: 11,
    color: argonTheme.colors.white,
    marginTop: 6,
  },
  endCallButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  endCallGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  endCallText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: argonTheme.colors.white,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: argonTheme.colors.success + '20',
    gap: 8,
  },
  infoBannerText: {
    fontSize: 12,
    color: argonTheme.colors.success,
    fontWeight: '600',
  },
});

