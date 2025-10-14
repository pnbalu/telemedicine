// Chat Message View (from agent-starter-react)

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

function useAutoScroll(containerRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    function scrollToBottom() {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }

    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(scrollToBottom);
      resizeObserver.observe(containerRef.current);
      scrollToBottom();

      return () => resizeObserver.disconnect();
    }
  }, [containerRef]);
}

interface ChatMessageViewProps {
  children?: React.ReactNode;
  className?: string;
}

export function ChatMessageView({ className, children }: ChatMessageViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useAutoScroll(scrollRef);

  return (
    <div ref={scrollRef} className={cn('flex flex-col justify-end overflow-y-auto', className)}>
      {children}
    </div>
  );
}

