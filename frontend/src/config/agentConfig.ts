// Agent Configuration (based on LiveKit agent-starter-react)
// Reference: https://github.com/livekit-examples/agent-starter-react

export const AGENT_CONFIG = {
  // Branding
  companyName: 'TeleMedX',
  pageTitle: 'AI Health Assistant',
  pageDescription: 'Voice-powered medical intake with LiveKit Agents',
  
  // Features
  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: false, // Disabled for patient consultations
  
  // Visual
  logo: '/logo.svg',
  accent: '#6366f1', // Indigo
  accentDark: '#818cf8',
  
  // UI Text
  startButtonText: 'Start AI Consultation',
  connectingText: 'Connecting to AI Assistant...',
  
  // Agent Settings
  agentType: 'voice', // 'voice' | 'chat' | 'video'
  autoStartVoice: true,
  
  // Medical AI specific
  medicalContext: {
    collectSymptoms: true,
    collectMedications: true,
    collectAllergies: true,
    collectVitalSigns: true,
    collectMedicalHistory: true,
  },
  
  // Conversation settings
  maxDuration: 600, // 10 minutes max
  autoTranscript: true,
  sendToDoctor: true,
  
  // Pricing
  consultationCost: 15,
  estimatedDuration: '5-8 minutes',
};

export type AgentConfig = typeof AGENT_CONFIG;

