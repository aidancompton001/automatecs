"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { MotionProvider, useMotion } from "@/components/motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

function MainContent({ children }: { children: ReactNode }) {
  const { shouldAnimate } = useMotion();

  if (!shouldAnimate) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <motion.main
      className="flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
    >
      {children}
    </motion.main>
  );
}

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
      <CookieBanner />
    </MotionProvider>
  );
}
