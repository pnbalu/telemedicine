import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Users, Play, Info, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function LiveKitDemo() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('demo-' + Math.random().toString(36).substr(2, 9));
  const [participantName, setParticipantName] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');

  const startCall = () => {
    if (!participantName.trim()) {
      alert('Please enter your name');
      return;
    }
    navigate(`/video-call?room=${roomName}&name=${participantName}&role=${role}`);
  };

  const copyRoomLink = (forRole: 'patient' | 'doctor') => {
    const link = `${window.location.origin}/video-call?room=${roomName}&name=${forRole === 'patient' ? 'Patient' : 'Doctor'}&role=${forRole}`;
    navigator.clipboard.writeText(link);
    alert(`Link copied for ${forRole}!\nShare this to test with another browser/device.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">LiveKit Video Demo</h1>
          <p className="text-gray-600 text-lg">Test real-time video consultations</p>
        </div>

        {/* Installation Status */}
        <Card className="border-0 shadow-lg mb-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="border-b border-blue-100">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Setup Status</h3>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">LiveKit service created</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">LiveKitRoom component ready</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Video consultation page integrated</span>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mt-4">
                <p className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Installation Required</p>
                <p className="text-sm text-yellow-800 mb-3">
                  Run <code className="bg-yellow-100 px-2 py-1 rounded">npm install</code> to install LiveKit packages
                </p>
                <p className="text-sm text-yellow-800">
                  See <strong>INSTALLATION.md</strong> for detailed instructions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Configuration */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Start Video Consultation</h3>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Room Name</Label>
                <Input
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="consultation-12345"
                />
                <p className="text-xs text-gray-500">Unique identifier for this consultation</p>
              </div>

              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label>Join as</Label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setRole('patient')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      role === 'patient'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Users className={`w-6 h-6 mx-auto mb-2 ${role === 'patient' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <p className={`font-semibold ${role === 'patient' ? 'text-blue-900' : 'text-gray-700'}`}>
                      Patient
                    </p>
                  </button>
                  <button
                    onClick={() => setRole('doctor')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      role === 'doctor'
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Users className={`w-6 h-6 mx-auto mb-2 ${role === 'doctor' ? 'text-teal-600' : 'text-gray-400'}`} />
                    <p className={`font-semibold ${role === 'doctor' ? 'text-teal-900' : 'text-gray-700'}`}>
                      Doctor
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={startCall}
              disabled={!participantName.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg py-6"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Video Consultation
            </Button>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                💡 Test with Multiple Participants
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => copyRoomLink('patient')}
                  className="flex-1"
                >
                  Copy Patient Link
                </Button>
                <Button
                  variant="outline"
                  onClick={() => copyRoomLink('doctor')}
                  className="flex-1"
                >
                  Copy Doctor Link
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Open in another browser/incognito window to simulate 2 participants
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Quick Access</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/patient/dashboard')}
                className="justify-start"
              >
                Patient Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/doctor/dashboard')}
                className="justify-start"
              >
                Doctor Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/dashboard')}
                className="justify-start"
              >
                Admin Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/LIVEKIT_SETUP.md', '_blank')}
                className="justify-start"
              >
                Setup Guide
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <p className="text-xs text-gray-600 text-center">
            <strong>Note:</strong> LiveKit packages must be installed via <code className="bg-gray-200 px-2 py-1 rounded">npm install</code>.
            See <strong>INSTALLATION.md</strong> for instructions.
          </p>
        </div>
      </div>
    </div>
  );
}

