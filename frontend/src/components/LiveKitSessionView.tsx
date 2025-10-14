// LiveKit Session View (adapted from agent-starter-react session-view.tsx)
// Reference: https://github.com/livekit-examples/agent-starter-react

import { useEffect, useState } from 'react';
import {
  useVoiceAssistant,
  useRoomContext,
  useConnectionState,
  type ReceivedChatMessage,
} from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Mic,
  MicOff,
  PhoneOff,
  Send,
  Loader2,
  Brain,
  Activity,
  FileText,
  Volume2
} from 'lucide-react';
import AgentAvatar from '@/components/livekit/AgentAvatar';
import AudioVisualizer from '@/components/livekit/AudioVisualizer';
import useChatAndTranscription from '@/hooks/useChatAndTranscription';
import { ChatEntry } from '@/components/livekit/ChatEntry';
import { ChatMessageView } from '@/components/livekit/ChatMessageView';

interface LiveKitSessionViewProps {
  participantName: string;
  roomName: string;
  onSessionEnd?: (transcript: string) => void;
  sessionStarted: boolean;
}

export default function LiveKitSessionView({
  participantName,
  roomName,
  onSessionEnd,
  sessionStarted
}: LiveKitSessionViewProps) {
  const room = useRoomContext();
  const connectionState = useConnectionState();
  const { state: agentState } = useVoiceAssistant();
  const { messages, send } = useChatAndTranscription();

  const [duration, setDuration] = useState(0);
  const [micEnabled, setMicEnabled] = useState(true);
  const [textInput, setTextInput] = useState('');

  // Timer
  useEffect(() => {
    if (connectionState === ConnectionState.Connected) {
      const timer = setInterval(() => setDuration(prev => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [connectionState]);

  // Check if agent joined (from official code)
  useEffect(() => {
    if (sessionStarted) {
      const timeout = setTimeout(() => {
        const isAgentAvailable = 
          agentState === 'listening' || 
          agentState === 'thinking' || 
          agentState === 'speaking';

        if (!isAgentAvailable) {
          const reason =
            agentState === 'connecting'
              ? 'Agent did not join the room.'
              : 'Agent connected but did not initialize.';
          
          alert(`${reason}\n\nMake sure Python agent is running:\npython agent.py start`);
          room.disconnect();
        }
      }, 20000);

      return () => clearTimeout(timeout);
    }
  }, [agentState, sessionStarted, room]);

  const handleMicToggle = async () => {
    try {
      await room.localParticipant.setMicrophoneEnabled(!micEnabled);
      setMicEnabled(!micEnabled);
    } catch (error) {
      console.error('Mic toggle error:', error);
    }
  };

  const handleSendMessage = async () => {
    if (textInput.trim()) {
      await send(textInput);
      setTextInput('');
    }
  };

  const handleEndSession = async () => {
    if (confirm('End this consultation?')) {
      const transcript = messages
        .map(m => `${m.from?.name || 'Unknown'}: ${m.message}`)
        .join('\n\n');

      room.disconnect();
      onSessionEnd?.(transcript);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const userMessages = messages.filter(m => m.from?.isLocal).length;
    return Math.min(userMessages * 15, 100);
  };

  const isAgentSpeaking = agentState === 'speaking';
  const isAgentListening = agentState === 'listening';
  const isConnected = connectionState === ConnectionState.Connected;

  if (connectionState === ConnectionState.Connecting) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mx-auto mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-2">Connecting to AI Agent...</h2>
          <p className="text-gray-400">Waiting for agent to join...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">AI Health Assistant</h1>
              <p className="text-sm text-gray-400">{participantName} • {roomName}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-gray-400">Progress</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
                <span className="text-white font-bold text-sm">{getProgress()}%</span>
              </div>
            </div>
            <Badge className={isConnected ? 'bg-green-600' : 'bg-gray-600'}>
              <Activity className="w-3 h-3 mr-1 animate-pulse" />
              {isConnected ? 'Live' : 'Offline'}
            </Badge>
            <span className="text-white font-mono text-lg">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex p-6 gap-6 overflow-hidden">
        {/* Left - AI Agent Avatar */}
        <div className="w-[420px]">
          <Card className="h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 border-indigo-700">
            <CardContent className="h-full flex flex-col items-center justify-center p-8">
              <div className="mb-8">
                <AgentAvatar isSpeaking={isAgentSpeaking} size="lg" />
              </div>

              <div className="text-center mb-6 w-full">
                <h2 className="text-white text-3xl font-bold mb-2">LiveKit AI</h2>
                <p className="text-indigo-200 text-sm mb-4">Powered by Google Gemini</p>
                
                <div className="space-y-3">
                  {isAgentSpeaking && (
                    <div className="p-4 bg-purple-600/50 rounded-xl border border-purple-400">
                      <Volume2 className="w-8 h-8 text-white mx-auto mb-2 animate-pulse" />
                      <p className="text-white font-semibold">AI is speaking</p>
                      <p className="text-purple-200 text-sm">Listen...</p>
                    </div>
                  )}

                  {isAgentListening && (
                    <div className="p-4 bg-green-600/50 rounded-xl border border-green-400">
                      <Mic className="w-8 h-8 text-white mx-auto mb-2 animate-pulse" />
                      <p className="text-white font-semibold">AI is listening</p>
                      <p className="text-green-200 text-sm">Speak now</p>
                    </div>
                  )}

                  {agentState === 'thinking' && (
                    <div className="p-4 bg-blue-600/50 rounded-xl border border-blue-400">
                      <Loader2 className="w-8 h-8 text-white mx-auto mb-2 animate-spin" />
                      <p className="text-white font-semibold">Processing</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full mt-auto">
                <AudioVisualizer isActive={isAgentSpeaking} />
                <p className="text-xs text-indigo-300 text-center mt-2">
                  {isAgentSpeaking ? '🔊 Agent Audio' : '⏸️ Idle'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right - Transcript */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 bg-gray-800 border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Live Transcript
                </h2>
                <Badge variant="secondary">{messages.length} messages</Badge>
              </div>
            </div>

            <ChatMessageView className="flex-1 p-6">
              <div className="space-y-3">
                {messages.map((message: ReceivedChatMessage) => (
                  <ChatEntry key={message.id} hideName entry={message} />
                ))}

                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">Waiting for agent...</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {agentState === 'listening' && "Agent is ready, start speaking!"}
                      {agentState === 'connecting' && "Agent is connecting..."}
                      {agentState === 'disconnected' && "Make sure Python agent is running"}
                    </p>
                  </div>
                )}
              </div>
            </ChatMessageView>

            {/* Text Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                />
                <Button onClick={handleSendMessage} disabled={!textInput.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
        <div className="flex items-center justify-center gap-6">
          <Button
            variant={micEnabled ? 'default' : 'destructive'}
            size="lg"
            onClick={handleMicToggle}
            className={`rounded-full w-16 h-16 ${micEnabled ? 'bg-gray-700' : 'bg-red-600'}`}
          >
            {micEnabled ? <Mic className="w-7 h-7" /> : <MicOff className="w-7 h-7" />}
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndSession}
            className="bg-red-600 rounded-full px-8 h-16"
          >
            <PhoneOff className="w-6 h-6 mr-3" />
            End Session
          </Button>
        </div>
      </div>

      <div className="bg-gray-800 px-6 py-3 border-t border-gray-700">
        <div className="flex items-center justify-center text-xs text-gray-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            LiveKit Agents • Powered by Google AI
          </span>
        </div>
      </div>
    </div>
  );
}

