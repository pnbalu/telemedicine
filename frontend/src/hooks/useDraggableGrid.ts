// Custom hook for draggable grid layout
import { useState } from 'react';

export interface DraggableItem {
  id: string;
  order: number;
}

export function useDraggableGrid<T extends DraggableItem>(initialItems: T[]) {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    // Update order
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setItems(reorderedItems);
    setDraggedItem(null);

    // Save to localStorage
    localStorage.setItem('dashboardLayout', JSON.stringify(reorderedItems));
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const resetLayout = () => {
    setItems(initialItems);
    localStorage.removeItem('dashboardLayout');
  };

  return {
    items,
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    resetLayout,
  };
}

