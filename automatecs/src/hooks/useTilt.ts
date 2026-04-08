"use client";

import { useState, useCallback, type MouseEvent } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
}

/**
 * 3D tilt effect hook.
 * Tracks mouse position relative to element center → rotateX/Y.
 * Resets on mouse leave (Landa fix L2).
 */
export function useTilt(maxDeg: number = 5) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      setTilt({
        rotateX: -percentY * maxDeg,
        rotateY: percentX * maxDeg,
      });
    },
    [maxDeg]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return { tilt, handleMouseMove, handleMouseLeave };
}
