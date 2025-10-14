// Token generation API endpoint (for Vite dev server)
// In production, move this to your backend

export async function POST(request: Request) {
  try {
    const { roomName, participantName } = await request.json();

    // This is a development endpoint
    // For production, use a proper backend with livekit-server-sdk
    
    const response = await fetch('http://localhost:3001/api/agent/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName, participantName })
    });

    if (!response.ok) {
      return new Response('Backend not available', { status: 503 });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return new Response('Error generating token', { status: 500 });
  }
}

