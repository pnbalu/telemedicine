// Agent Avatar Component with Animation
// Reference: https://github.com/livekit-examples/agent-starter-react

import React from 'react';
import { Brain } from 'lucide-react';

interface AgentAvatarProps {
  isSpeaking: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AgentAvatar({ 
  isSpeaking, 
  size = 'lg',
  className = '' 
}: AgentAvatarProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-64 h-64'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Avatar */}
      <div className={`
        ${sizeClasses[size]}
        rounded-full 
        bg-gradient-to-br from-indigo-500 to-purple-500 
        flex items-center justify-center 
        shadow-2xl 
        transition-all duration-300
        ${isSpeaking ? 'scale-110 shadow-indigo-500/50' : 'scale-100'}
      `}>
        <Brain className={`${iconSizes[size]} text-white`} />
      </div>
      
      {/* Pulsing Rings when Speaking */}
      {isSpeaking && (
        <>
          <div 
            className="absolute inset-0 rounded-full border-4 border-indigo-400 animate-ping opacity-75"
            style={{ animationDuration: '1.5s' }}
          />
          <div 
            className="absolute inset-0 rounded-full border-4 border-purple-400 animate-ping opacity-50"
            style={{ animationDuration: '1.5s', animationDelay: '0.3s' }}
          />
          <div 
            className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-25"
            style={{ animationDuration: '1.5s', animationDelay: '0.6s' }}
          />
        </>
      )}
    </div>
  );
}

