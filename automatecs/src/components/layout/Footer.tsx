"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMotion } from "@/components/motion";

export function Footer() {
  const { shouldAnimate } = useMotion();

  return (
    <footer className="bg-brand-black text-brand-white">
      {/* CTA Banner */}
      <div className="border-b border-brand-white/20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <motion.a
            href="/kontakt/"
            className="inline-block px-4 md:px-8 py-3 md:py-4 border-2 border-brand-gold text-brand-gold font-heading font-semibold text-sm md:text-lg uppercase tracking-normal md:tracking-wide hover:bg-brand-gold hover:text-brand-black transition-colors"
            initial={shouldAnimate ? { borderColor: "rgba(218, 178, 0, 0.5)" } : false}
            animate={shouldAnimate ? { borderColor: "rgba(218, 178, 0, 1)" } : undefined}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            Fordern Sie jetzt Ihr Angebot an
          </motion.a>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading font-light text-lg mb-4">
              Automatecs Automaten &amp; Service
            </h3>
            <address className="not-italic text-sm text-brand-white/80 space-y-1 font-body">
              <p>Papenkamp 2</p>
              <p>21376 Salzhausen</p>
              <p className="mt-3">
                <span className="text-brand-white/70">Tel:</span>{" "}
                <a href="tel:04172987470" className="hover:text-brand-yellow transition-colors">
                  04172 98 74 700
                </a>
              </p>
              <p>
                <span className="text-brand-white/70">Fax:</span> 04172 98 74 701
              </p>
              <p>
                <span className="text-brand-white/70">Mail:</span>{" "}
                <a href="mailto:info@automatecs.de" className="hover:text-brand-yellow transition-colors">
                  info@automatecs.de
                </a>
              </p>
            </address>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-light text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-brand-white/80 font-body">
              <li>
                <Link href="/" className="hover:text-brand-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/automaten/" className="hover:text-brand-white transition-colors">Automaten-Programm</Link>
              </li>
              <li>
                <Link href="/service/" className="hover:text-brand-white transition-colors">Service</Link>
              </li>
              <li>
                <Link href="/unternehmen/" className="hover:text-brand-white transition-colors">Unternehmen</Link>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-brand-white transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-light text-lg mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm text-brand-white/80 font-body">
              <li>
                <Link href="/kontakt/" className="hover:text-brand-white transition-colors">Kontakt</Link>
              </li>
              <li>
                <Link href="/impressum/" className="hover:text-brand-white transition-colors">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz/" className="hover:text-brand-white transition-colors">Datenschutz</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-brand-white/50 font-body">
          &copy; {new Date().getFullYear()} Automatecs Automaten &amp; Service. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
