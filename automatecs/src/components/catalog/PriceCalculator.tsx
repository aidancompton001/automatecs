"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCounter, useMotion } from "@/components/motion";
import { calculateTotal } from "@/lib/calculator";
import { formatCentsToEUR } from "@/lib/formatPrice";
import type { Option } from "@/types";

interface PriceCalculatorProps {
  basePriceCents: number;
  options: Option[];
}

const CATEGORY_LABELS: Record<string, string> = {
  payment: "Zahlungsmittel-Annahmen",
  security: "Sicherheit & Dokumentenleser",
  equipment: "Zusätzliche Ausstattungen",
};

const checkboxSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export function PriceCalculator({
  basePriceCents,
  options,
}: PriceCalculatorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { shouldAnimate } = useMotion();

  // ЖЕЛЕЗНОЕ ПРАВИЛО: расчёт через calculator.ts, не в голове
  const totalCents = calculateTotal(basePriceCents, selectedIds);

  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Group options by category
  const grouped = options.reduce(
    (acc, opt) => {
      if (!acc[opt.category]) acc[opt.category] = [];
      acc[opt.category].push(opt);
      return acc;
    },
    {} as Record<string, Option[]>
  );

  return (
    <div>
      {/* Options grouped by category */}
      {Object.entries(grouped).map(([category, opts]) => (
        <div key={category} className="mb-8">
          <h4 className="font-heading text-sm font-semibold text-brand-black/70 uppercase tracking-wide mb-4">
            {CATEGORY_LABELS[category] ?? category}
          </h4>

          <div className="space-y-3">
            <AnimatePresence>
              {opts.map((opt) => {
                const isSelected = selectedIds.includes(opt.id);

                return (
                  <motion.div
                    key={opt.id}
                    layout={shouldAnimate}
                    initial={shouldAnimate ? { opacity: 0, x: -10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={checkboxSpring}
                    className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? "border-brand-green bg-brand-green/5"
                        : "border-brand-black/15 hover:border-brand-black/20"
                    }`}
                    onClick={() => toggleOption(opt.id)}
                  >
                    {/* Checkbox */}
                    <motion.div
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-brand-green border-brand-green"
                          : "border-brand-black/20"
                      }`}
                      animate={
                        shouldAnimate
                          ? { scale: isSelected ? [1, 1.2, 1] : 1 }
                          : {}
                      }
                      transition={checkboxSpring}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-brand-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </motion.div>

                    {/* Option Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-medium text-brand-black text-sm">
                        {opt.name}
                      </p>
                      <p className="text-xs text-brand-black/70 font-body mt-1 line-clamp-2">
                        {opt.description}
                      </p>
                    </div>

                    {/* Price */}
                    <span className="font-heading font-semibold text-brand-green shrink-0">
                      +{formatCentsToEUR(opt.priceCents)}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="sticky bottom-0 bg-brand-white border-t border-brand-black/15 py-4 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-brand-black/70 font-body">Gesamtpreis</p>
            <p className="text-xs text-brand-black/70 font-body">
              Grundpreis {formatCentsToEUR(basePriceCents)} + {selectedIds.length}{" "}
              {selectedIds.length === 1 ? "Option" : "Optionen"}
            </p>
          </div>
          <div className="text-right">
            <AnimatedCounter
              valueCents={totalCents}
              className="font-heading text-3xl font-bold text-brand-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
