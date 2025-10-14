// Exact copy of official agent-starter-react backend logic
// Adapted from: app/api/connection-details/route.ts
// Reference: https://github.com/livekit-examples/agent-starter-react

const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const { RoomConfiguration } = require('@livekit/protocol');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

const PORT = process.env.PORT || 3001;

// POST /api/connection-details
// Exact same endpoint as official example
app.post('/api/connection-details', async (req, res) => {
  try {
    if (LIVEKIT_URL === undefined) {
      throw new Error('LIVEKIT_URL is not defined');
    }
    if (API_KEY === undefined) {
      throw new Error('LIVEKIT_API_KEY is not defined');
    }
    if (API_SECRET === undefined) {
      throw new Error('LIVEKIT_API_SECRET is not defined');
    }

    // Parse agent configuration from request body
    const body = req.body;
    const agentName = body?.room_config?.agents?.[0]?.agent_name || 'medical-assistant';

      // Generate participant token (same logic as official)
    const participantName = 'user';
    const participantIdentity = `voice_assistant_user_${Math.floor(Math.random() * 10_000)}`;
    const roomName = `voice_assistant_room_${Math.floor(Math.random() * 10_000)}`;

    console.log(`📝 Creating room: ${roomName} with agent: ${agentName}`);

    const participantToken = await createParticipantToken(
      { identity: participantIdentity, name: participantName },
      roomName,
      agentName
    );

    // Return connection details
    const data = {
      serverUrl: LIVEKIT_URL,
      roomName,
      participantToken: participantToken,
      participantName,
    };

    res.setHeader('Cache-Control', 'no-store');
    res.json(data);

    console.log(`✅ Token generated for ${participantName} in room ${roomName}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Helper function from official code
async function createParticipantToken(userInfo, roomName, agentName) {
  const at = new AccessToken(API_KEY, API_SECRET, {
    ...userInfo,
    ttl: '15m',
  });

  const grant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  };
  
  at.addGrant(grant);

  // IMPORTANT: Configure room to dispatch agent automatically
  if (agentName) {
    console.log(`🤖 Configuring room to dispatch agent: ${agentName}`);
    at.roomConfig = new RoomConfiguration({
      agents: [{ 
        agentName: agentName  // This should match the agent_name in WorkerOptions
      }],
    });
  }

  return at.toJwt();
}

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 LiveKit Token Server (from agent-starter-react)');
  console.log('================================================');
  console.log(`📍 Endpoint: http://localhost:${PORT}/api/connection-details`);
  console.log('');
  console.log('Environment variables required:');
  console.log('  LIVEKIT_URL=' + (LIVEKIT_URL || '❌ NOT SET'));
  console.log('  LIVEKIT_API_KEY=' + (API_KEY ? '✅ SET' : '❌ NOT SET'));
  console.log('  LIVEKIT_API_SECRET=' + (API_SECRET ? '✅ SET' : '❌ NOT SET'));
  console.log('');
});

