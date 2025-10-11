import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  FileText, 
  Settings,
  Monitor,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function VideoConsultation() {
  const navigate = useNavigate();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [callDuration, setCallDuration] = useState('12:34');

  // Demo data
  const participant = {
    name: 'Dr. Sarah Johnson',
    role: 'Cardiologist',
    status: 'Connected'
  };

  const endCall = () => {
    if (confirm('Are you sure you want to end the consultation?')) {
      navigate('/patient/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Video className="w-6 h-6 text-blue-500" />
          <div>
            <h1 className="text-white font-semibold">Video Consultation</h1>
            <p className="text-sm text-gray-400">Session with {participant.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="success" className="bg-green-600">
            <span className="w-2 h-2 rounded-full bg-white mr-2"></span>
            {participant.status}
          </Badge>
          <span className="text-white font-mono">{callDuration}</span>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex gap-4 p-4">
        {/* Primary Video */}
        <div className="flex-1 relative">
          <Card className="h-full bg-gray-800 border-gray-700">
            <CardContent className="h-full flex items-center justify-center p-0">
              {/* Simulated video feed */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <User className="w-32 h-32 mx-auto mb-4 opacity-50" />
                  <p className="text-2xl font-semibold">{participant.name}</p>
                  <p className="text-gray-300">{participant.role}</p>
                </div>
              </div>
              
              {/* Self video preview (small) */}
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border-2 border-gray-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <User className="w-16 h-16 mx-auto opacity-50" />
                  <p className="text-sm mt-2">You</p>
                </div>
              </div>

              {/* Video controls overlay */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                <Button
                  variant={audioEnabled ? 'default' : 'destructive'}
                  size="lg"
                  className="rounded-full w-14 h-14"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                >
                  {audioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </Button>
                
                <Button
                  variant={videoEnabled ? 'default' : 'destructive'}
                  size="lg"
                  className="rounded-full w-14 h-14"
                  onClick={() => setVideoEnabled(!videoEnabled)}
                >
                  {videoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </Button>
                
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700"
                  onClick={endCall}
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
                
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full w-14 h-14"
                  onClick={() => setShowChat(!showChat)}
                >
                  <MessageSquare className="w-6 h-6" />
                </Button>
                
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full w-14 h-14"
                >
                  <Monitor className="w-6 h-6" />
                </Button>
                
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full w-14 h-14"
                >
                  <Settings className="w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel - Chat or Notes */}
        {showChat && (
          <div className="w-80">
            <Card className="h-full bg-gray-800 border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat & Notes
                </h2>
              </div>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Sample messages */}
                <div className="bg-blue-600 text-white rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hello! How are you feeling today?</p>
                  <p className="text-xs opacity-75 mt-1">Dr. Sarah - 12:25 PM</p>
                </div>
                <div className="bg-gray-700 text-white rounded-lg p-3 max-w-[80%] ml-auto">
                  <p className="text-sm">I'm doing better, thank you.</p>
                  <p className="text-xs opacity-75 mt-1">You - 12:26 PM</p>
                </div>
                <div className="bg-blue-600 text-white rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Great! Let's review your test results.</p>
                  <p className="text-xs opacity-75 mt-1">Dr. Sarah - 12:27 PM</p>
                </div>
              </CardContent>
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Connection Info */}
      <div className="bg-gray-800 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span>🟢 Strong Connection</span>
          <span>Quality: HD</span>
          <span>Encrypted End-to-End</span>
        </div>
        <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
          <FileText className="w-4 h-4 mr-2" />
          Generate Prescription
        </Button>
      </div>
    </div>
  );
}

