// Welcome Screen (based on agent-starter-react welcome.tsx)
// Reference: https://github.com/livekit-examples/agent-starter-react

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, Video, MessageSquare, Mic, Sparkles } from 'lucide-react';
import { AGENT_CONFIG } from '@/config/agentConfig';

interface AgentWelcomeProps {
  onStart: (participantName: string) => void;
}

export default function AgentWelcome({ onStart }: AgentWelcomeProps) {
  const [participantName, setParticipantName] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async () => {
    if (!participantName.trim()) return;
    
    setIsStarting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UX
    onStart(participantName.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-6 shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            {AGENT_CONFIG.pageTitle}
          </h1>
          <p className="text-xl text-indigo-200 mb-2">
            {AGENT_CONFIG.pageDescription}
          </p>
          <p className="text-sm text-indigo-300">
            Powered by LiveKit Agents • AI-driven medical consultation
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-8">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <Mic className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Voice Interaction</h3>
                  <p className="text-sm text-gray-300">Real-time voice conversation with AI</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <MessageSquare className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Live Transcripts</h3>
                  <p className="text-sm text-gray-300">Complete conversation history</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-lg bg-pink-500/20">
                  <Sparkles className="w-5 h-5 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Medical AI</h3>
                  <p className="text-sm text-gray-300">Specialized health assistant</p>
                </div>
              </div>
            </div>

            {/* Start Form */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 text-lg h-12"
                  disabled={isStarting}
                />
              </div>

              <Button
                onClick={handleStart}
                disabled={!participantName.trim() || isStarting}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg"
              >
                {isStarting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Starting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    {AGENT_CONFIG.startButtonText}
                  </span>
                )}
              </Button>

              {/* Info */}
              <div className="flex items-center justify-between text-sm text-gray-300 pt-4 border-t border-white/10">
                <span>💵 Cost: ${AGENT_CONFIG.consultationCost}</span>
                <span>⏱️ {AGENT_CONFIG.estimatedDuration}</span>
                <span>🔒 Secure & Private</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-indigo-300">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

