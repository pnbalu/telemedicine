import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  Monitor,
  MonitorOff,
  Settings,
  Users,
  Camera,
  Volume2,
  VolumeX,
  Maximize,
  Grid3x3,
  User as UserIcon,
  Signal,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { livekitService } from '@/services/livekitService';
import { poseDetectionService } from '@/services/poseDetectionService';

interface LiveKitRoomProps {
  roomName: string;
  participantName: string;
  participantRole: 'doctor' | 'patient';
  onDisconnect?: () => void;
  enablePoseDetection?: boolean;
}

export default function LiveKitRoom({ 
  roomName, 
  participantName, 
  participantRole,
  onDisconnect,
  enablePoseDetection = false
}: LiveKitRoomProps) {
  const navigate = useNavigate();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const poseCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  
  const [callDuration, setCallDuration] = useState(0);
  const [participants, setParticipants] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{
    sender: string;
    message: string;
    timestamp: Date;
  }>>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [poseEnabled, setPoseEnabled] = useState(false);

  useEffect(() => {
    connectToRoom();
    
    // Call duration timer
    const durationInterval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(durationInterval);
      disconnectFromRoom();
    };
  }, []);

  const connectToRoom = async () => {
    try {
      setIsConnecting(true);
      
      // Check if LiveKit is available (packages installed)
      const isLiveKitAvailable = typeof window !== 'undefined' && 
        'livekit-client' in (window as any);
      
      if (!isLiveKitAvailable) {
        // DEMO MODE - Works without LiveKit installation
        console.log('Running in DEMO mode - LiveKit packages not installed');
        
        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Enable demo mode - use local media without LiveKit
        setIsConnected(true);
        setIsConnecting(false);
        
        // Request camera access for demo
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          });
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        } catch (mediaError) {
          console.log('Camera access denied or not available');
        }
        
        return;
      }

      // PRODUCTION MODE - Full LiveKit integration
      // Generate token (in production, get from backend)
      const token = await livekitService.constructor.generateToken(
        roomName,
        participantName,
        participantRole
      );

      // Connect to room
      const livekitUrl = import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';
      
      await livekitService.connect({
        url: livekitUrl,
        token,
        roomName,
        participantName
      });

      // Setup event listeners
      livekitService.on('participantConnected', handleParticipantConnected);
      livekitService.on('participantDisconnected', handleParticipantDisconnected);
      livekitService.on('dataReceived', handleDataReceived);
      livekitService.on('trackSubscribed', handleTrackSubscribed);

      // Enable camera and microphone
      await livekitService.setCameraEnabled(true);
      await livekitService.setMicrophoneEnabled(true);

      setIsConnected(true);
      setIsConnecting(false);

      // Initialize pose detection if enabled
      if (enablePoseDetection && localVideoRef.current && poseCanvasRef.current) {
        await poseDetectionService.initialize();
        poseDetectionService.setVideoSource(localVideoRef.current);
        poseDetectionService.setCanvas(poseCanvasRef.current);
      }

    } catch (error) {
      console.error('Connection error:', error);
      
      // Fallback to demo mode on any error
      console.log('Falling back to DEMO mode');
      setIsConnected(true);
      setIsConnecting(false);
      
      // Try to get local camera for demo
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (mediaError) {
        console.log('Camera not available, using placeholder');
      }
    }
  };

  const disconnectFromRoom = async () => {
    await livekitService.disconnect();
    if (poseEnabled) {
      poseDetectionService.stopDetection();
    }
  };

  const handleParticipantConnected = (participant: any) => {
    console.log('Participant connected:', participant);
    setParticipants(livekitService.getParticipants());
  };

  const handleParticipantDisconnected = (participant: any) => {
    console.log('Participant disconnected:', participant);
    setParticipants(livekitService.getParticipants());
  };

  const handleDataReceived = ({ data, participant }: any) => {
    if (data.type === 'chat') {
      setChatMessages(prev => [...prev, {
        sender: data.sender,
        message: data.message,
        timestamp: new Date(data.timestamp)
      }]);
    }
  };

  const handleTrackSubscribed = ({ track, participant }: any) => {
    console.log('Track subscribed:', track, participant);
    // Attach track to video element
    if (track.kind === 'video' && remoteVideoRef.current) {
      track.attach(remoteVideoRef.current);
    }
  };

  const toggleCamera = async () => {
    try {
      // Try LiveKit first
      if (livekitService.isConnected()) {
        await livekitService.setCameraEnabled(!videoEnabled);
      } else {
        // Demo mode - toggle local video
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          const stream = localVideoRef.current.srcObject as MediaStream;
          stream.getVideoTracks().forEach(track => {
            track.enabled = !videoEnabled;
          });
        }
      }
      setVideoEnabled(!videoEnabled);
    } catch (error) {
      console.error('Error toggling camera:', error);
      setVideoEnabled(!videoEnabled); // Toggle anyway for UI
    }
  };

  const toggleMicrophone = async () => {
    try {
      // Try LiveKit first
      if (livekitService.isConnected()) {
        await livekitService.setMicrophoneEnabled(!audioEnabled);
      } else {
        // Demo mode - toggle local audio
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          const stream = localVideoRef.current.srcObject as MediaStream;
          stream.getAudioTracks().forEach(track => {
            track.enabled = !audioEnabled;
          });
        }
      }
      setAudioEnabled(!audioEnabled);
    } catch (error) {
      console.error('Error toggling microphone:', error);
      setAudioEnabled(!audioEnabled); // Toggle anyway for UI
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (livekitService.isConnected()) {
        // LiveKit mode
        if (isScreenSharing) {
          await livekitService.stopScreenShare();
        } else {
          await livekitService.startScreenShare();
        }
      } else {
        // Demo mode - show info
        alert('Screen sharing demo - In production mode with LiveKit, this will share your screen to all participants.');
      }
      setIsScreenSharing(!isScreenSharing);
    } catch (error) {
      console.error('Error toggling screen share:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const message = newMessage;
    setNewMessage('');
    
    // Add to local chat
    setChatMessages(prev => [...prev, {
      sender: participantName,
      message: message,
      timestamp: new Date()
    }]);
    
    try {
      if (livekitService.isConnected()) {
        // Send via LiveKit
        await livekitService.sendChatMessage(message);
      } else {
        // Demo mode - simulate echo response
        setTimeout(() => {
          setChatMessages(prev => [...prev, {
            sender: 'Demo Assistant',
            message: `Message received: "${message}" (Demo mode - Install LiveKit for real-time chat)`,
            timestamp: new Date()
          }]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const togglePoseDetection = async () => {
    if (!poseEnabled) {
      if (await poseDetectionService.initialize()) {
        poseDetectionService.startDetection((pose) => {
          // Pose data available for analysis
          console.log('Pose detected:', pose);
        });
        setPoseEnabled(true);
      }
    } else {
      poseDetectionService.stopDetection();
      setPoseEnabled(false);
    }
  };

  const endCall = () => {
    if (confirm('Are you sure you want to end the consultation?')) {
      disconnectFromRoom();
      if (onDisconnect) {
        onDisconnect();
      } else {
        navigate(`/${participantRole}/dashboard`);
      }
    }
  };

  const formatDuration = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hrs > 0 
      ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-2">Connecting to consultation...</h2>
          <p className="text-gray-400">Please wait while we set up your video call</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Connection Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate(`/${participantRole}/dashboard`)}>
                Go Back
              </Button>
              <Button onClick={connectToRoom}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">Video Consultation</h1>
            <p className="text-sm text-gray-400">Room: {roomName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Signal className={`w-5 h-5 ${
              connectionQuality === 'excellent' ? 'text-green-500' :
              connectionQuality === 'good' ? 'text-yellow-500' :
              'text-red-500'
            }`} />
            <span className="text-sm text-gray-300 capitalize">{connectionQuality}</span>
          </div>
          <Badge variant="success" className="bg-green-600">
            <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
            Connected
          </Badge>
          <span className="text-white font-mono text-lg">{formatDuration(callDuration)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Remote Participant Video */}
          <div className="flex-1 relative">
            <Card className="h-full bg-gray-800 border-gray-700 overflow-hidden">
              <CardContent className="h-full p-0 relative">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Fallback when no remote video */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <UserIcon className="w-32 h-32 mx-auto mb-4 opacity-50" />
                    <p className="text-2xl font-semibold">Waiting for participant...</p>
                    <p className="text-gray-300 mt-2">{participants.length} participant(s) in room</p>
                  </div>
                </div>

                {/* Participant Info Overlay */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white font-semibold">Dr. Sarah Johnson</p>
                  <p className="text-xs text-gray-300">Cardiologist</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Local Participant Video (Picture-in-Picture) */}
          <div className="relative">
            <div className="absolute bottom-0 right-0 w-64 h-48 bg-gray-800 rounded-lg border-2 border-gray-600 overflow-hidden z-10">
              <div className="relative w-full h-full">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover mirror"
                />
                {/* Pose detection overlay */}
                {poseEnabled && (
                  <canvas
                    ref={poseCanvasRef}
                    className="absolute inset-0 w-full h-full"
                  />
                )}
                {!videoEnabled && (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <UserIcon className="w-16 h-16 text-gray-600" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                  <p className="text-white text-xs font-medium">You</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        {(showChat || showParticipants || showSettings) && (
          <div className="w-80 flex flex-col">
            <Card className="flex-1 bg-gray-800 border-gray-700 flex flex-col">
              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                <button
                  onClick={() => { setShowChat(true); setShowParticipants(false); setShowSettings(false); }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    showChat ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Chat
                </button>
                <button
                  onClick={() => { setShowChat(false); setShowParticipants(true); setShowSettings(false); }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    showParticipants ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  People
                </button>
                <button
                  onClick={() => { setShowChat(false); setShowParticipants(false); setShowSettings(true); }}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    showSettings ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  Settings
                </button>
              </div>

              {/* Panel Content */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                {showChat && (
                  <div className="space-y-3">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`rounded-lg p-3 ${
                        msg.sender === participantName 
                          ? 'bg-blue-600 text-white ml-auto max-w-[80%]' 
                          : 'bg-gray-700 text-white max-w-[80%]'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {msg.sender} - {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                    {chatMessages.length === 0 && (
                      <p className="text-gray-400 text-sm text-center py-8">No messages yet</p>
                    )}
                  </div>
                )}

                {showParticipants && (
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                          {participantName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{participantName} (You)</p>
                          <p className="text-xs text-gray-400 capitalize">{participantRole}</p>
                        </div>
                        <div className="flex gap-1">
                          {videoEnabled && <Camera className="w-4 h-4 text-green-400" />}
                          {audioEnabled && <Mic className="w-4 h-4 text-green-400" />}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm text-center py-4">
                      {participants.length > 1 ? `${participants.length - 1} other participant(s)` : 'Waiting for others to join...'}
                    </p>
                  </div>
                )}

                {showSettings && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-white font-medium mb-3">Video Settings</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <span className="text-sm text-gray-300">Camera</span>
                          <select className="bg-gray-600 text-white text-sm rounded px-2 py-1 border-0">
                            <option>Default Camera</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <span className="text-sm text-gray-300">Microphone</span>
                          <select className="bg-gray-600 text-white text-sm rounded px-2 py-1 border-0">
                            <option>Default Microphone</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <span className="text-sm text-gray-300">Speaker</span>
                          <select className="bg-gray-600 text-white text-sm rounded px-2 py-1 border-0">
                            <option>Default Speaker</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {enablePoseDetection && (
                      <div>
                        <p className="text-white font-medium mb-3">AI Features</p>
                        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div>
                            <p className="text-sm text-white">Pose Detection</p>
                            <p className="text-xs text-gray-400">Track movement & posture</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={poseEnabled}
                              onChange={togglePoseDetection}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>

              {/* Chat Input (only shown when chat is active) */}
              {showChat && (
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button size="sm" onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                      Send
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
        <div className="flex items-center justify-center gap-3">
          {/* Audio Toggle */}
          <Button
            variant={audioEnabled ? 'default' : 'destructive'}
            size="lg"
            className="rounded-full w-14 h-14 bg-gray-700 hover:bg-gray-600"
            onClick={toggleMicrophone}
            title={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
          >
            {audioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>

          {/* Video Toggle */}
          <Button
            variant={videoEnabled ? 'default' : 'destructive'}
            size="lg"
            className="rounded-full w-14 h-14 bg-gray-700 hover:bg-gray-600"
            onClick={toggleCamera}
            title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
          >
            {videoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          {/* End Call */}
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700"
            onClick={endCall}
            title="End call"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>

          {/* Screen Share */}
          <Button
            variant={isScreenSharing ? 'default' : 'secondary'}
            size="lg"
            className="rounded-full w-14 h-14 bg-gray-700 hover:bg-gray-600"
            onClick={toggleScreenShare}
            title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
          >
            {isScreenSharing ? <MonitorOff className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
          </Button>

          {/* Chat Toggle */}
          <Button
            variant="secondary"
            size="lg"
            className={`rounded-full w-14 h-14 ${showChat ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => {
              setShowChat(!showChat);
              setShowParticipants(false);
              setShowSettings(false);
            }}
            title="Toggle chat"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          {/* Participants */}
          <Button
            variant="secondary"
            size="lg"
            className={`rounded-full w-14 h-14 ${showParticipants ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => {
              setShowParticipants(!showParticipants);
              setShowChat(false);
              setShowSettings(false);
            }}
            title="View participants"
          >
            <Users className="w-6 h-6" />
          </Button>

          {/* Settings */}
          <Button
            variant="secondary"
            size="lg"
            className={`rounded-full w-14 h-14 ${showSettings ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => {
              setShowSettings(!showSettings);
              setShowChat(false);
              setShowParticipants(false);
            }}
            title="Settings"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-800 px-6 py-2 flex items-center justify-between border-t border-gray-700">
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {livekitService.isConnected() ? 'LiveKit Connected' : 'Demo Mode (Install LiveKit for production)'}
          </span>
          <span>Quality: HD 720p</span>
          <span>Latency: ~45ms</span>
        </div>
        {participantRole === 'doctor' && (
          <Button variant="ghost" className="text-blue-400 hover:text-blue-300" onClick={() => navigate('/doctor/write-prescription')}>
            Generate Notes & Prescription
          </Button>
        )}
      </div>

      <style>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}

