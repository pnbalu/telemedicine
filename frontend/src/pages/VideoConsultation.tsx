import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LiveKitRoom from '@/components/LiveKitRoom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, User, Clock, Loader2 } from 'lucide-react';

export default function VideoConsultation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [roomConfig, setRoomConfig] = useState<{
    roomName: string;
    participantName: string;
    participantRole: 'doctor' | 'patient';
  } | null>(null);

  useEffect(() => {
    // Get room configuration from URL params or session storage
    const roomName = searchParams.get('room') || `consultation-${Date.now()}`;
    const participantName = searchParams.get('name') || 'User';
    const participantRole = (searchParams.get('role') || 'patient') as 'doctor' | 'patient';

    setRoomConfig({
      roomName,
      participantName,
      participantRole
    });

    // Simulate loading/setup
    setTimeout(() => setIsLoading(false), 1000);
  }, [searchParams]);

  const handleDisconnect = () => {
    const role = roomConfig?.participantRole || 'patient';
    navigate(`/${role}/dashboard`);
  };

  if (isLoading || !roomConfig) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-2">Setting up your consultation...</h2>
          <p className="text-gray-400">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      roomName={roomConfig.roomName}
      participantName={roomConfig.participantName}
      participantRole={roomConfig.participantRole}
      onDisconnect={handleDisconnect}
      enablePoseDetection={roomConfig.participantRole === 'doctor'}
    />
  );
}
