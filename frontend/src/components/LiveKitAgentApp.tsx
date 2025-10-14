// LiveKit Agent App (adapted from agent-starter-react for Vite)
// Reference: https://github.com/livekit-examples/agent-starter-react

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Room, RoomEvent } from 'livekit-client';
import { 
  RoomAudioRenderer, 
  RoomContext, 
  StartAudio
} from '@livekit/components-react';
import AgentWelcome from './AgentWelcome';
import LiveKitSessionView from './LiveKitSessionView';

interface ConnectionDetails {
  serverUrl: string;
  participantToken: string;
  roomName: string;
  participantName: string;
}

interface LiveKitAgentAppProps {
  patientName?: string;
  onComplete?: (transcript: string) => void;
}

export default function LiveKitAgentApp({ 
  patientName: providedName,
  onComplete 
}: LiveKitAgentAppProps) {
  const navigate = useNavigate();
  const room = useMemo(() => new Room(), []);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails | null>(null);
  const [participantName, setParticipantName] = useState(providedName || '');

  // Fetch connection details when starting
  const fetchConnectionDetails = async (name: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      console.log(`🔍 Fetching from: ${apiUrl}/api/connection-details`);
      
      const response = await fetch(`${apiUrl}/api/connection-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_config: {
            agents: [{ agent_name: 'medical-assistant' }]
          }
        })
      });
      
      console.log(`📡 Response: ${response.status}`);

      if (!response.ok) {
        throw new Error('Failed to get connection details');
      }

      const data = await response.json();
      console.log('✅ Token received:', data);
      setConnectionDetails(data);
      return data;
    } catch (error) {
      console.error('❌ Backend error:', error);
      alert(`Backend not running!\n\n1. Open new terminal\n2. cd server\n3. npm install\n4. npm start\n\nOr double-click START_SERVER.bat`);
      throw error;
    }
  };

  // Room event handlers
  useEffect(() => {
    const onDisconnected = () => {
      setSessionStarted(false);
      navigate('/patient/dashboard');
    };

    const onMediaDevicesError = (error: Error) => {
      console.error('Media devices error:', error);
      alert(`Media error: ${error.message}`);
    };

    room.on(RoomEvent.MediaDevicesError, onMediaDevicesError);
    room.on(RoomEvent.Disconnected, onDisconnected);

    return () => {
      room.off(RoomEvent.Disconnected, onDisconnected);
      room.off(RoomEvent.MediaDevicesError, onMediaDevicesError);
      room.disconnect();
    };
  }, [room, navigate, onComplete]);

  // Auto-connect when session starts
  useEffect(() => {
    let aborted = false;

    if (sessionStarted && room.state === 'disconnected' && connectionDetails) {
      Promise.all([
        room.localParticipant.setMicrophoneEnabled(true),
        room.connect(connectionDetails.serverUrl, connectionDetails.participantToken)
      ]).catch((error) => {
        if (aborted) return;
        console.error('Connection error:', error);
        alert(`Failed to connect: ${error.message}`);
        setSessionStarted(false);
      });
    }

    return () => {
      aborted = true;
    };
  }, [room, sessionStarted, connectionDetails]);

  // Handle welcome screen
  const handleStart = async (name: string) => {
    setParticipantName(name);
    try {
      await fetchConnectionDetails(name);
      setSessionStarted(true);
    } catch (error) {
      // Error already handled in fetchConnectionDetails
    }
  };

  // Auto-start if name provided
  useEffect(() => {
    if (providedName) {
      handleStart(providedName);
    }
  }, [providedName]);

  // Show welcome if not started
  if (!sessionStarted) {
    return <AgentWelcome onStart={handleStart} />;
  }

  // Show session
  return (
    <RoomContext.Provider value={room}>
      <RoomAudioRenderer />
      <StartAudio label="Click to enable audio" />
      
      <LiveKitSessionView
        participantName={participantName}
        roomName={connectionDetails?.roomName || 'room'}
        sessionStarted={sessionStarted}
        onSessionEnd={(transcript: string) => {
          onComplete?.(transcript);
          navigate('/patient/dashboard');
        }}
      />
    </RoomContext.Provider>
  );
}

