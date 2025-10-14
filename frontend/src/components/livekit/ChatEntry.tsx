// Chat Entry Component (from agent-starter-react)

import type { ReceivedChatMessage } from '@livekit/components-react';
import { cn } from '@/lib/utils';

export interface ChatEntryProps {
  entry: ReceivedChatMessage;
  hideName?: boolean;
  hideTimestamp?: boolean;
  className?: string;
}

export function ChatEntry({
  entry,
  hideName,
  hideTimestamp,
  className,
}: ChatEntryProps) {
  const time = new Date(entry.timestamp);
  const name = entry.from?.name || entry.from?.identity || 'Unknown';
  const isUser = entry.from?.isLocal ?? false;

  return (
    <li
      className={cn('group flex flex-col gap-0.5', className)}
      title={time.toLocaleTimeString()}
    >
      {!hideName && (
        <strong className="text-sm text-gray-400 mt-2">{name}</strong>
      )}

      <span className={cn(
        'max-w-[80%] rounded-[20px] p-3',
        isUser ? 'bg-gray-700 ml-auto' : 'bg-indigo-600 mr-auto'
      )}>
        {entry.message}
      </span>

      {!hideTimestamp && (
        <span className="ml-auto font-mono text-xs text-gray-500 opacity-0 group-hover:opacity-100">
          {time.toLocaleTimeString([], { timeStyle: 'short' })}
        </span>
      )}
    </li>
  );
}

