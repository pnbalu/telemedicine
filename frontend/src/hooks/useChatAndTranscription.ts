// Chat and Transcription Hook (from agent-starter-react)
// Merges transcriptions and chat messages

import { useMemo } from 'react';
import {
  type ReceivedChatMessage,
  useChat,
  useRoomContext,
  useTranscriptions,
} from '@livekit/components-react';
import { transcriptionToChatMessage } from '@/lib/agent-utils';

export function useChatAndTranscription() {
  const transcriptions = useTranscriptions();
  const chat = useChat();
  const room = useRoomContext();

  const mergedMessages = useMemo(() => {
    const merged: Array<ReceivedChatMessage> = [
      ...transcriptions.map((transcription) => transcriptionToChatMessage(transcription, room)),
      ...chat.chatMessages,
    ];
    return merged.sort((a, b) => a.timestamp - b.timestamp);
  }, [transcriptions, chat.chatMessages, room]);

  return { 
    messages: mergedMessages, 
    send: chat.send 
  };
}

export default useChatAndTranscription;

