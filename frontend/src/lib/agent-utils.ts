// Utility functions from agent-starter-react
// Adapted for Vite

import { Room } from 'livekit-client';
import type { ReceivedChatMessage } from '@livekit/components-react';

export function transcriptionToChatMessage(
  textStream: any,
  room: Room
): ReceivedChatMessage {
  return {
    id: textStream.streamInfo?.id || `trans-${Date.now()}`,
    timestamp: textStream.streamInfo?.timestamp || Date.now(),
    message: textStream.text || '',
    from:
      textStream.participantInfo?.identity === room.localParticipant.identity
        ? room.localParticipant
        : Array.from(room.remoteParticipants.values()).find(
            (p) => p.identity === textStream.participantInfo?.identity
          ),
  };
}

