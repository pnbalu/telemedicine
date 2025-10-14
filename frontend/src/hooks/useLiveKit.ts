// Custom React Hook for LiveKit Integration
import { useState, useEffect, useCallback, useRef } from 'react';
import { livekitService } from '@/services/livekitService';

interface UseLiveKitOptions {
  roomName: string;
  participantName: string;
  participantRole: 'doctor' | 'patient';
  autoConnect?: boolean;
}

export function useLiveKit(options: UseLiveKitOptions) {
  const { roomName, participantName, participantRole, autoConnect = true } = options;
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');

  const callStartTime = useRef<number | null>(null);
  const durationInterval = useRef<number | null>(null);

  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Generate token (in production, call backend API)
      const token = await livekitService.constructor.generateToken(
        roomName,
        participantName,
        participantRole
      );

      const livekitUrl = import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';

      await livekitService.connect({
        url: livekitUrl,
        token,
        roomName,
        participantName
      });

      // Setup event listeners
      livekitService.on('participantConnected', () => {
        setParticipants(livekitService.getParticipants());
      });

      livekitService.on('participantDisconnected', () => {
        setParticipants(livekitService.getParticipants());
      });

      livekitService.on('connectionQualityChanged', ({ quality }: any) => {
        setConnectionQuality(quality);
      });

      // Enable camera and microphone
      await livekitService.setCameraEnabled(true);
      await livekitService.setMicrophoneEnabled(true);

      setIsConnected(true);
      setIsConnecting(false);

      // Start call duration timer
      callStartTime.current = Date.now();
      durationInterval.current = window.setInterval(() => {
        if (callStartTime.current) {
          setCallDuration(Math.floor((Date.now() - callStartTime.current) / 1000));
        }
      }, 1000);

    } catch (err: any) {
      console.error('Connection error:', err);
      setError(err.message || 'Failed to connect to video room');
      setIsConnecting(false);
    }
  }, [roomName, participantName, participantRole]);

  const disconnect = useCallback(async () => {
    await livekitService.disconnect();
    setIsConnected(false);
    
    if (durationInterval.current) {
      clearInterval(durationInterval.current);
      durationInterval.current = null;
    }
  }, []);

  const toggleCamera = useCallback(async () => {
    try {
      await livekitService.setCameraEnabled(!videoEnabled);
      setVideoEnabled(!videoEnabled);
    } catch (err) {
      console.error('Error toggling camera:', err);
    }
  }, [videoEnabled]);

  const toggleMicrophone = useCallback(async () => {
    try {
      await livekitService.setMicrophoneEnabled(!audioEnabled);
      setAudioEnabled(!audioEnabled);
    } catch (err) {
      console.error('Error toggling microphone:', err);
    }
  }, [audioEnabled]);

  const toggleScreenShare = useCallback(async () => {
    try {
      if (isScreenSharing) {
        await livekitService.stopScreenShare();
      } else {
        await livekitService.startScreenShare();
      }
      setIsScreenSharing(!isScreenSharing);
    } catch (err) {
      console.error('Error toggling screen share:', err);
    }
  }, [isScreenSharing]);

  const sendMessage = useCallback(async (message: string) => {
    try {
      await livekitService.sendChatMessage(message);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    isConnecting,
    isConnected,
    error,
    participants,
    videoEnabled,
    audioEnabled,
    isScreenSharing,
    callDuration,
    connectionQuality,
    connect,
    disconnect,
    toggleCamera,
    toggleMicrophone,
    toggleScreenShare,
    sendMessage
  };
}

