'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

type BubbleCursorOptions = {
  size?: number;
  springConfig?: {
    damping?: number;
    stiffness?: number;
  };
};

export const useBubbleCursor = (options?: BubbleCursorOptions) => {
  const { size = 20, springConfig } = options || {};

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const cursorXSpring = useSpring(cursorX, {
    damping: springConfig?.damping ?? 25,
    stiffness: springConfig?.stiffness ?? 180,
  });

  const cursorYSpring = useSpring(cursorY, {
    damping: springConfig?.damping ?? 25,
    stiffness: springConfig?.stiffness ?? 180,
  });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size);
      cursorY.set(e.clientY - size);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, size]);

  return {
    cursorXSpring,
    cursorYSpring,
    isHovering,
    setIsHovering,
  };
};
