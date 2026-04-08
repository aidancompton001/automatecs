"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface MotionContextValue {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  shouldAnimate: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  isMobile: false,
  prefersReducedMotion: false,
  shouldAnimate: true,
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const shouldAnimate = !isMobile && !prefersReducedMotion;

  return (
    <MotionContext.Provider
      value={{ isMobile, prefersReducedMotion, shouldAnimate }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
