// Simple Working AI Agent - Voice Conversation
// No complicated dependencies, just works!

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Mic,
  MicOff,
  PhoneOff,
  Loader2,
  Volume2
} from 'lucide-react';
import { GoogleAIService } from '@/services/googleAIService';
import { getInstructions } from '@/utils/instructionsLoader';

interface Message {
  role: 'ai' | 'user';
  text: string;
  timestamp: number;
}

interface SimpleAIAgentProps {
  patientName: string;
  roomName: string;
  onComplete?: (transcript: string) => void;
}

export default function SimpleAIAgent({
  patientName,
  roomName,
  onComplete
}: SimpleAIAgentProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [duration, setDuration] = useState(0);

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const conversationHistoryRef = useRef<string[]>([]);
  const googleAIRef = useRef<GoogleAIService | null>(null);
  const isInitializedRef = useRef(false); // Prevent double initialization

  // Initialize speech services
  useEffect(() => {
    // Prevent double initialization (React Strict Mode runs effects twice)
    if (isInitializedRef.current) {
      return;
    }
    isInitializedRef.current = true;

    // Initialize Google AI with instructions from file
    initializeAI();
    
    async function initializeAI() {
      try {
        const instructions = await getInstructions();
        console.log('📄 Loaded instructions from instructions.txt');
        googleAIRef.current = await GoogleAIService.createInstance(instructions);
        
        if (!googleAIRef.current) {
          console.warn('⚠️ Google API key not configured - using simulated responses');
        } else {
          console.log('✅ Google AI initialized with custom instructions');
        }
      } catch (error) {
        console.error('Error loading instructions:', error);
        googleAIRef.current = GoogleAIService.getInstance();
      }
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;
        
        setCurrentTranscript(transcript);

        if (result.isFinal && transcript.trim()) {
          handleUserSpeech(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          // Restart listening
          startListening();
        }
      };

      recognitionRef.current.onend = () => {
        if (isListening && !isThinking && !isAISpeaking) {
          // Restart if it stops unexpectedly
          try {
            recognitionRef.current?.start();
          } catch (e) {
            // Already started
          }
        }
      };
    }

    // Start conversation
    startConversation();

    // Timer
    const timer = setInterval(() => setDuration(prev => prev + 1), 1000);

    return () => {
      clearInterval(timer);
      stopListening();
      stopSpeaking();
      isInitializedRef.current = false; // Reset on cleanup
    };
  }, []);

  const startConversation = async () => {
    const greeting = `Hello ${patientName}! I'm your AI health assistant. I'll ask you a few questions about your health. Let's begin - what brings you here today?`;
    
    await addMessage('ai', greeting);
    await speakText(greeting);
    
    // Start listening after greeting
    setTimeout(() => {
      startListening();
    }, 2000);
  };

  const addMessage = async (role: 'ai' | 'user', text: string) => {
    const message: Message = {
      role,
      text,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, message]);
    conversationHistoryRef.current.push(`${role === 'ai' ? 'AI' : 'Patient'}: ${text}`);
    
    if (role === 'ai') {
      setQuestionCount(prev => prev + 1);
    }
  };

  const speakText = async (text: string): Promise<void> => {
    return new Promise((resolve) => {
      setIsAISpeaking(true);
      stopListening();

      if (!synthesisRef.current) {
        console.warn('Speech synthesis not available');
        setTimeout(() => {
          setIsAISpeaking(false);
          resolve();
        }, 1000);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => {
        setIsAISpeaking(false);
        resolve();
      };

      utterance.onerror = () => {
        setIsAISpeaking(false);
        resolve();
      };

      synthesisRef.current.speak(utterance);
    });
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      console.warn('Speech recognition not available');
      return;
    }

    try {
      setIsListening(true);
      setCurrentTranscript('');
      recognitionRef.current.start();
    } catch (e) {
      // Already started
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Already stopped
      }
      setIsListening(false);
      setCurrentTranscript('');
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    setIsAISpeaking(false);
  };

  const handleUserSpeech = async (text: string) => {
    if (isThinking || isAISpeaking) return;
    
    stopListening();
    setCurrentTranscript(''); // Clear transcript
    setIsThinking(true);

    // Add user message
    await addMessage('user', text);

    // Get AI response
    let aiResponse = '';
    
    try {
      if (googleAIRef.current) {
        // Use Google AI
        aiResponse = await googleAIRef.current.generateResponse(
          text,
          conversationHistoryRef.current
        );
      } else {
        // Use simulated responses
        aiResponse = getSimulatedResponse(questionCount);
      }
    } catch (error) {
      console.error('AI error:', error);
      aiResponse = getSimulatedResponse(questionCount);
    }

    setIsThinking(false);

    // Add AI response
    await addMessage('ai', aiResponse);

    // Speak response
    await speakText(aiResponse);

    // Check if we should end
    if (questionCount >= 6 || aiResponse.toLowerCase().includes('thank you')) {
      setTimeout(() => {
        endSession();
      }, 2000);
    } else {
      // Continue listening
      startListening();
    }
  };

  const getSimulatedResponse = (step: number): string => {
    const responses = [
      "I understand. Can you tell me more about your symptoms? When did they start?",
      "On a scale of 0 to 10, how severe is your discomfort?",
      "Are you currently taking any medications?",
      "Do you have any known allergies to medications?",
      "Do you have any chronic conditions or medical history I should know about?",
      "Thank you for providing all this information. I've recorded everything and a doctor will review your case within 2 hours."
    ];
    return responses[Math.min(step, responses.length - 1)];
  };

  const endSession = () => {
    stopListening();
    stopSpeaking();

    const transcript = messages
      .map(m => `${m.role === 'ai' ? 'AI Assistant' : 'Patient'}: ${m.text}`)
      .join('\n\n');

    if (onComplete) {
      onComplete(transcript);
    } else {
      setTimeout(() => {
        navigate('/patient/dashboard');
      }, 2000);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getProgress = () => Math.min(questionCount * 15, 100);

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
              <p className="text-sm text-gray-400">{patientName}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-gray-400">Progress</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
                <span className="text-white font-bold text-sm">{getProgress()}%</span>
              </div>
            </div>
            <Badge className="bg-green-600">Live</Badge>
            <span className="text-white font-mono">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex p-6 gap-6 overflow-hidden">
        {/* Left - AI Avatar */}
        <div className="w-[420px]">
          <Card className="h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 border-indigo-700">
            <CardContent className="h-full flex flex-col items-center justify-center p-8">
              {/* Avatar */}
              <div className="relative mb-8">
                <div className={`w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl transition-all ${
                  isAISpeaking ? 'scale-110' : 'scale-100'
                }`}>
                  <Brain className="w-32 h-32 text-white" />
                </div>
                {isAISpeaking && (
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-400 animate-ping" />
                )}
              </div>

              {/* Status */}
              <div className="text-center w-full space-y-4">
                <h2 className="text-white text-3xl font-bold">AI Assistant</h2>
                
                {isAISpeaking && (
                  <div className="p-4 bg-purple-600/50 rounded-xl border border-purple-400">
                    <Volume2 className="w-8 h-8 text-white mx-auto mb-2 animate-pulse" />
                    <p className="text-white font-semibold">AI is speaking</p>
                    <p className="text-purple-200 text-sm">Listen...</p>
                  </div>
                )}

                {isListening && !isAISpeaking && (
                  <div className="p-4 bg-green-600/50 rounded-xl border border-green-400">
                    <Mic className="w-8 h-8 text-white mx-auto mb-2 animate-pulse" />
                    <p className="text-white font-semibold">Your turn</p>
                    <p className="text-green-200 text-sm">Speak now...</p>
                    {currentTranscript && (
                      <p className="text-green-100 text-xs mt-2 italic">"{currentTranscript}"</p>
                    )}
                  </div>
                )}

                {isThinking && (
                  <div className="p-4 bg-blue-600/50 rounded-xl border border-blue-400">
                    <Loader2 className="w-8 h-8 text-white mx-auto mb-2 animate-spin" />
                    <p className="text-white font-semibold">Processing</p>
                    <p className="text-blue-200 text-sm">Thinking...</p>
                  </div>
                )}
              </div>

              <div className="mt-auto w-full p-3 bg-black/30 rounded-lg">
                <p className="text-indigo-200 text-xs text-center">
                  {googleAIRef.current ? '✅ Powered by Google Gemini AI' : '⚠️ Demo mode - Add GOOGLE_API_KEY'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right - Transcript */}
        <div className="flex-1">
          <Card className="h-full bg-gray-800 border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-white font-semibold">Live Transcript</h2>
              <p className="text-sm text-gray-400">{messages.length} messages</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                      msg.role === 'ai'
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}>
                      <div className="text-xs font-semibold mb-1 opacity-75">
                        {msg.role === 'ai' ? 'AI Assistant' : 'You'}
                      </div>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
        <div className="flex justify-center gap-4">
          <Button
            variant={isListening ? 'default' : 'secondary'}
            size="lg"
            className="rounded-full w-16 h-16"
            disabled
          >
            {isListening ? <Mic className="w-7 h-7" /> : <MicOff className="w-7 h-7" />}
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={endSession}
            className="rounded-full px-8 h-16"
          >
            <PhoneOff className="w-6 h-6 mr-2" />
            End Session
          </Button>
        </div>
      </div>
    </div>
  );
}

