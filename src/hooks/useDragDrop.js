import { useRef, useState } from 'react'

export default function useDragDrop(reorderSections) {
  const dragIndexRef = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const onDragStart = (e, index) => {
    dragIndexRef.current = index;
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    const fromIndex = dragIndexRef.current;
    if (fromIndex === null || fromIndex === index) return;
    reorderSections(fromIndex, index);
    dragIndexRef.current = null;
    setDraggingIndex(null);
  };

  const onDragEnd = () => {
    dragIndexRef.current = null;
    setDraggingIndex(null);
  };

  return { draggingIndex, handlers: { onDragStart, onDragOver, onDrop, onDragEnd } };
}
