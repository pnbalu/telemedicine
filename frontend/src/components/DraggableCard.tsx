// Draggable Card Component
import { Card } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraggableCardProps {
  id: string;
  children: React.ReactNode;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onDragEnd: () => void;
  isDragging?: boolean;
  className?: string;
}

export function DraggableCard({
  id,
  children,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging = false,
  className
}: DraggableCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={cn(
        'group relative transition-all duration-200',
        isDragging && 'opacity-50 scale-95',
        !isDragging && 'hover:scale-[1.02]',
        className
      )}
    >
      {/* Drag Handle */}
      <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
        <div className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 shadow-sm">
          <GripVertical className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Card Content */}
      <Card className={cn(
        "h-full border-2 transition-all",
        isDragging ? "border-primary border-dashed" : "border-transparent hover:border-gray-200"
      )}>
        {children}
      </Card>
    </div>
  );
}

