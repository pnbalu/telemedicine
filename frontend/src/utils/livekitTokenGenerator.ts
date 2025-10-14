// LiveKit Token Generator (Frontend - DEVELOPMENT ONLY!)
// WARNING: In production, generate tokens on the backend!
// Never expose API keys in frontend code

export async function generateLiveKitToken(
  roomName: string,
  participantName: string
): Promise<{ token: string; serverUrl: string } | null> {
  const apiKey = import.meta.env.VITE_LIVEKIT_API_KEY;
  const apiSecret = import.meta.env.VITE_LIVEKIT_API_SECRET;
  const serverUrl = import.meta.env.VITE_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !serverUrl) {
    console.warn('⚠️ LiveKit credentials not configured in .env');
    return null;
  }

  if (apiKey === 'your-api-key-here' || apiSecret === 'your-api-secret-here') {
    console.warn('⚠️ LiveKit credentials not set (still using placeholder values)');
    return null;
  }

  try {
    // For development: Generate token using frontend
    // In production: Call backend API endpoint
    
    console.log('🔐 Generating LiveKit token (DEVELOPMENT MODE)');
    console.log('⚠️  WARNING: This exposes API keys in frontend');
    console.log('⚠️  For production, move token generation to backend!');

    // Simple JWT token generation (requires backend in production)
    // For now, return a mock token and let the connection fail gracefully
    const token = await generateTokenViaBackend(roomName, participantName);
    
    return {
      token,
      serverUrl
    };
  } catch (error) {
    console.error('Token generation failed:', error);
    return null;
  }
}

async function generateTokenViaBackend(
  roomName: string,
  participantName: string
): Promise<string> {
  // Try to call backend API
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  
  try {
    const response = await fetch(`${apiUrl}/api/agent/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName, participantName })
    });

    if (response.ok) {
      const data = await response.json();
      return data.token;
    }
  } catch (error) {
    // Backend not available
  }

  throw new Error('Backend token API not available');
}

export function isLiveKitConfigured(): boolean {
  const apiKey = import.meta.env.VITE_LIVEKIT_API_KEY;
  const apiSecret = import.meta.env.VITE_LIVEKIT_API_SECRET;
  const serverUrl = import.meta.env.VITE_LIVEKIT_URL;

  return !!(
    apiKey && 
    apiSecret && 
    serverUrl &&
    apiKey !== 'your-api-key-here' &&
    apiSecret !== 'your-api-secret-here' &&
    serverUrl !== 'wss://your-project.livekit.cloud'
  );
}

