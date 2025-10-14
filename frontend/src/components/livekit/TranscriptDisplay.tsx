// Transcript Display Component
// Reference: https://github.com/livekit-examples/agent-starter-react

import React, { useEffect, useRef } from 'react';
import { Brain, Mic, MessageSquare } from 'lucide-react';
import { TranscriptMessage } from '@/lib/agent-connection';

interface TranscriptDisplayProps {
  messages: TranscriptMessage[];
  showOnlyFinal?: boolean;
  className?: string;
}

export default function TranscriptDisplay({ 
  messages, 
  showOnlyFinal = true,
  className = '' 
}: TranscriptDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const displayMessages = showOnlyFinal 
    ? messages.filter(m => m.isFinal) 
    : messages;

  if (displayMessages.length === 0) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Waiting for conversation to start...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className={`overflow-y-auto ${className}`}>
      <div className="space-y-4 p-6">
        {displayMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
              message.role === 'agent'
                ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'
                : 'bg-gray-700 text-white'
            }`}>
              <div className="flex items-center gap-2 mb-2 opacity-90">
                {message.role === 'agent' ? (
                  <Brain className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
                <span className="text-xs font-semibold">
                  {message.role === 'agent' ? 'AI Assistant' : 'You'}
                </span>
                <span className="text-xs ml-auto">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{message.text}</p>
              {!message.isFinal && (
                <span className="text-xs opacity-60 mt-1 block">Typing...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

