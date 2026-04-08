"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Parallax scroll hook.
 * Returns translateY offset based on scroll position * speed factor.
 * SSR-safe: initial offset = 0, activates after mount.
 */
export function useParallax(speed: number = 0.3) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop;
      setOffset(relativeScroll * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}
