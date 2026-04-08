"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Scroll progress hook.
 * Returns 0→1 as element scrolls through viewport.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const ratio = entry.intersectionRatio;
          setProgress(Math.min(1, Math.max(0, ratio)));
        }
      },
      {
        threshold: Array.from({ length: 20 }, (_, i) => i / 19),
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, progress };
}
