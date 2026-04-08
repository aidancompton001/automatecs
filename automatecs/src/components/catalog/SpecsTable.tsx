"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/components/motion";
import type { Specs } from "@/types";

interface SpecsTableProps {
  specs: Specs;
}

const SPEC_LABELS: { key: keyof Specs; label: string }[] = [
  { key: "dimensions", label: "Abmessungen (H x B x T)" },
  { key: "weight", label: "Nettogewicht" },
  { key: "selectionsPerTray", label: "Auswahlen pro Etage" },
  { key: "trays", label: "Anzahl Etagen" },
  { key: "maxSelections", label: "Max. Auswahlen" },
  { key: "control", label: "Steuerung" },
  { key: "tempRange", label: "Innentemperatur" },
  { key: "maxPower", label: "Max. Leistungsaufnahme" },
  { key: "climateClass", label: "Klimaklasse" },
  { key: "voltage", label: "Elektroanschluss" },
  { key: "consumption", label: "Energieverbrauch" },
];

const rowVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: "easeOut" as const },
  }),
};

export function SpecsTable({ specs }: SpecsTableProps) {
  const { shouldAnimate } = useMotion();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-body">
        <tbody>
          {SPEC_LABELS.map(({ key, label }, i) => {
            const value = specs[key];
            if (value === undefined || value === null) return null;

            const Row = shouldAnimate ? motion.tr : "tr";

            return (
              <Row
                key={key}
                className="border-b border-brand-black/15"
                {...(shouldAnimate
                  ? {
                      variants: rowVariant,
                      initial: "hidden",
                      whileInView: "visible",
                      viewport: { once: true },
                      custom: i,
                    }
                  : {})}
              >
                <td className="py-3 pr-4 text-brand-black/70 w-1/2">{label}</td>
                <td className="py-3 font-medium text-brand-black">
                  {String(value)}
                </td>
              </Row>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
