import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

const useCursorPosition = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    throttle((e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 100), // Adjust the throttle delay as needed
    []
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      handleMouseMove.cancel?.(); // Prevent queued calls after unmount
    };
  }, [handleMouseMove]);

  return cursorPosition;
};

export default useCursorPosition;
