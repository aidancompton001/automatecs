"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </MotionProvider>
  );
}
