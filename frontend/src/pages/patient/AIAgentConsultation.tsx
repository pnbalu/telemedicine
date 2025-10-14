// AI Agent Consultation
// Works without backend! Uses Google AI + Browser APIs

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AgentWelcome from '@/components/AgentWelcome';
import LiveKitAgentApp from '@/components/LiveKitAgentApp'; // Official LiveKit implementation
// import SimpleAIAgent from '@/components/SimpleAIAgent'; // For simple mode without backend

export default function AIAgentConsultation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(true);
  const [participantName, setParticipantName] = useState('');

  const providedName = searchParams.get('patientName');

  useEffect(() => {
    if (providedName) {
      setParticipantName(providedName);
      setShowWelcome(false);
    }
  }, [providedName]);

  const handleComplete = async (transcript: string) => {
    console.log('✅ Session complete');
    console.log('📄 Transcript:', transcript);
    
    // TODO: Send to doctor
    // await fetch('/api/consultations/submit', { 
    //   method: 'POST',
    //   body: JSON.stringify({ transcript, participantName, roomName })
    // });
    
    setTimeout(() => {
      navigate('/patient/dashboard');
    }, 2000);
  };

  if (showWelcome) {
    return <AgentWelcome onStart={(name) => {
      setParticipantName(name);
      setShowWelcome(false);
    }} />;
  }

  // OPTION 2: FULL LIVEKIT MODE (Official Implementation) ✅
  return (
    <LiveKitAgentApp 
      patientName={participantName}
      onComplete={handleComplete}
    />
  );

  // OPTION 1: SIMPLE MODE - No backend needed (uncomment to use)
  // return (
  //   <SimpleAIAgent
  //     patientName={participantName}
  //     roomName={roomName}
  //     onComplete={handleComplete}
  //   />
  // );
}
