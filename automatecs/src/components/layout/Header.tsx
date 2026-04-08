"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Automaten-Programm",
    href: "/automaten/",
    children: [
      { label: "Snackautomaten", href: "/automaten/snackautomaten/" },
      {
        label: "Kaltgetränkeautomaten",
        href: "/automaten/kaltgetraenkeautomaten/",
      },
      { label: "Kaffeeautomaten", href: "/automaten/kaffeeautomaten/" },
      { label: "Wasserspender", href: "/automaten/wasserspender/" },
    ],
  },
  { label: "Service", href: "/service/" },
  { label: "Zubehör", href: "/zubehoer/" },
  { label: "Blog", href: "/blog/" },
];

const dropdownVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto" as const,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

const mobileMenuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const staggerItem = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.2 },
  }),
};

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-white border-b border-brand-black/15">
      {/* TopBar */}
      <div className="hidden md:block bg-brand-black text-brand-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <span className="font-body text-xs">
            Vermietung, Verkauf, Vollservice und Beratung: Ihr
            Automatendienstleister in Norddeutschland!
          </span>
          <div className="flex items-center gap-4 text-xs">
            <a href="tel:04172987470" className="hover:text-brand-yellow transition-colors">
              04172 98 74 700
            </a>
            <Link href="/unternehmen/" className="hover:text-brand-yellow transition-colors">
              Unternehmen
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — LUMA Brand Identity */}
        <Link href="/" className="flex items-center gap-2" aria-label="Automatecs Home">
          <img src={`${process.env.__NEXT_ROUTER_BASEPATH || ''}/logo.svg`} alt="Automatecs" width={36} height={36} />
          <span className="font-heading font-light text-lg text-brand-black uppercase tracking-[0.2em]">
            Automatecs
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setDropdownOpen(true)}
              onMouseLeave={() => item.children && setDropdownOpen(false)}
            >
              <Link
                href={item.href}
                className="font-body text-sm text-brand-black/80 hover:text-brand-black transition-colors py-2"
              >
                {item.label}
              </Link>

              {/* Dropdown */}
              {item.children && (
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 bg-brand-white border border-brand-black/15 shadow-elevation-2 rounded-md py-2 min-w-[220px] overflow-hidden"
                    >
                      {item.children.map((child, i) => (
                        <motion.li
                          key={child.href}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm text-brand-black/80 hover:bg-brand-black/5 hover:text-brand-black transition-colors"
                          >
                            {child.label}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Burger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-brand-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-72 bg-brand-white z-50 shadow-elevation-4 p-6 md:hidden overflow-y-auto"
            >
              <button
                className="absolute top-4 right-4 p-2"
                onClick={() => setMobileOpen(false)}
                aria-label="Menü schließen"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <nav className="mt-12 space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div key={item.href} custom={i} variants={staggerItem} initial="hidden" animate="visible">
                    <Link
                      href={item.href}
                      className="block py-3 text-lg font-body text-brand-black/80 hover:text-brand-black border-b border-brand-black/10"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-sm text-brand-black/70 hover:text-brand-black"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile contact */}
              <div className="mt-8 pt-4 border-t border-brand-black/15">
                <a href="tel:04172987470" className="block text-sm text-brand-green font-medium">
                  04172 98 74 700
                </a>
                <a href="mailto:info@automatecs.de" className="block text-sm text-brand-black/70 mt-1">
                  info@automatecs.de
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
