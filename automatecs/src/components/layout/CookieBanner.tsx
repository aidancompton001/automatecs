"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "automatecs-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-brand-white border-t border-brand-black/15 shadow-elevation-3"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-brand-black/70 font-body">
              Diese Website verwendet nur technisch notwendige Cookies.{" "}
              <Link
                href="/datenschutz/"
                className="text-brand-green underline hover:text-brand-black transition-colors"
              >
                Datenschutzerklärung
              </Link>
            </p>
            <button
              onClick={handleAccept}
              className="shrink-0 px-6 py-2 bg-brand-green text-brand-white font-body font-medium text-sm rounded hover:bg-brand-black transition-colors cursor-pointer"
            >
              Akzeptieren
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
