"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/motion";
import { CTABanner } from "@/components/sections";
import type { CompanyInfo } from "@/types";

interface Props {
  company: CompanyInfo;
}

export function KontaktClient({ company }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nachricht, setNachricht] = useState("");

  const mailtoHref = `mailto:${company.email}?subject=${encodeURIComponent(
    `Anfrage von ${name || "Webseite"}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${nachricht}`
  )}`;

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-brand-green text-brand-white">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <h1 className="font-heading text-3xl md:text-5xl font-bold">
              Kontakt
            </h1>
            <p className="mt-4 font-body text-lg text-brand-white/80">
              Wir freuen uns auf Ihre Anfrage.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-black mb-6">
                  {company.name}
                </h2>
                <address className="not-italic font-body text-brand-black/80 space-y-3">
                  <p>{company.address}</p>
                  <p>
                    {company.zip} {company.city}
                  </p>
                  <p className="mt-4">
                    <span className="text-brand-black/70">Tel:</span>{" "}
                    <a
                      href={`tel:${company.phone.replace(/\s/g, "")}`}
                      className="text-brand-green hover:text-brand-black transition-colors"
                    >
                      {company.phone}
                    </a>
                  </p>
                  <p>
                    <span className="text-brand-black/70">Fax:</span> {company.fax}
                  </p>
                  <p>
                    <span className="text-brand-black/70">E-Mail:</span>{" "}
                    <a
                      href={`mailto:${company.email}`}
                      className="text-brand-green hover:text-brand-black transition-colors"
                    >
                      {company.email}
                    </a>
                  </p>
                </address>
              </div>
            </ScrollReveal>

            {/* Contact Form — mailto заглушка (C3 fix) */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-2xl font-bold text-brand-black mb-6">
                  Nachricht senden
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = mailtoHref;
                  }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-body font-medium text-brand-black/80 mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-brand-black/20 rounded font-body text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-shadow"
                      placeholder="Ihr Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-body font-medium text-brand-black/80 mb-1"
                    >
                      E-Mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-brand-black/20 rounded font-body text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-shadow"
                      placeholder="ihre@email.de"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="nachricht"
                      className="block text-sm font-body font-medium text-brand-black/80 mb-1"
                    >
                      Nachricht
                    </label>
                    <textarea
                      id="nachricht"
                      value={nachricht}
                      onChange={(e) => setNachricht(e.target.value)}
                      required
                      maxLength={500}
                      rows={5}
                      className="w-full px-4 py-3 border border-brand-black/20 rounded font-body text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-shadow resize-none"
                      placeholder="Ihre Nachricht..."
                    />
                    <p className="text-xs text-brand-black/70 font-body mt-1">
                      {nachricht.length}/500 Zeichen. Für längere Anfragen
                      senden Sie uns bitte eine E-Mail direkt an{" "}
                      {company.email}.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-brand-green text-brand-white font-heading font-semibold text-sm md:text-base uppercase tracking-normal md:tracking-wide hover:bg-brand-black transition-colors cursor-pointer"
                  >
                    Nachricht senden
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTABanner text="Rufen Sie uns an: 04172 98 74 700" href="tel:04172987470" />
    </>
  );
}
