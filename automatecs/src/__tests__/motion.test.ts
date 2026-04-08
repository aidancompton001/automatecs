import { describe, it, expect } from "vitest";
import {
  fadeUp,
  staggerContainer,
  slideInRight,
  cardTilt,
  priceSpring,
} from "@/lib/motion-variants";
import { formatCentsToEUR } from "@/components/motion/AnimatedCounter";

describe("motion-variants", () => {
  it("exports fadeUp with hidden and visible states", () => {
    expect(fadeUp).toBeDefined();
    expect(fadeUp.hidden).toEqual({ opacity: 0, y: 40 });
    expect(fadeUp.visible).toBeDefined();
  });

  it("exports staggerContainer with staggerChildren", () => {
    expect(staggerContainer).toBeDefined();
    expect(staggerContainer.visible).toBeDefined();
    const visible = staggerContainer.visible as Record<string, unknown>;
    const transition = visible.transition as Record<string, unknown>;
    expect(transition.staggerChildren).toBe(0.08);
  });

  it("exports slideInRight with x offset", () => {
    expect(slideInRight).toBeDefined();
    expect(slideInRight.hidden).toEqual({ opacity: 0, x: 30 });
  });

  it("exports cardTilt with rest and hover states", () => {
    expect(cardTilt).toBeDefined();
    expect(cardTilt.rest).toEqual({ rotateX: 0, rotateY: 0, scale: 1 });
    expect(cardTilt.hover).toBeDefined();
  });

  it("exports priceSpring as spring transition", () => {
    expect(priceSpring).toBeDefined();
    expect(priceSpring.type).toBe("spring");
    expect(priceSpring.stiffness).toBe(300);
    expect(priceSpring.damping).toBe(20);
  });
});

describe("formatCentsToEUR", () => {
  it("formats 829000 cents as 8.290,00 €", () => {
    const result = formatCentsToEUR(829000);
    // Intl.NumberFormat may use non-breaking space before €
    expect(result).toMatch(/8\.290,00/);
    expect(result).toContain("€");
  });

  it("formats 52000 cents as 520,00 €", () => {
    const result = formatCentsToEUR(52000);
    expect(result).toMatch(/520,00/);
    expect(result).toContain("€");
  });

  it("formats 0 cents as 0,00 €", () => {
    const result = formatCentsToEUR(0);
    expect(result).toMatch(/0,00/);
    expect(result).toContain("€");
  });

  it("formats 109900 cents as 1.099,00 €", () => {
    const result = formatCentsToEUR(109900);
    expect(result).toMatch(/1\.099,00/);
  });

  it("handles all Zusatzoptionen prices correctly", () => {
    // Münzwechsler +520€
    expect(formatCentsToEUR(52000)).toMatch(/520,00/);
    // Nayax +990€
    expect(formatCentsToEUR(99000)).toMatch(/990,00/);
    // ICT XBA +595€
    expect(formatCentsToEUR(59500)).toMatch(/595,00/);
    // ICT DCM5 +575€
    expect(formatCentsToEUR(57500)).toMatch(/575,00/);
    // SENVEND UX700 +1.099€
    expect(formatCentsToEUR(109900)).toMatch(/1\.099,00/);
  });

  it("calculates total price correctly: base + all options", () => {
    const baseCents = 829000; // 8.290€
    const options = [52000, 99000, 59500, 57500, 109900];
    const total = baseCents + options.reduce((a, b) => a + b, 0);
    // 829000 + 52000 + 99000 + 59500 + 57500 + 109900 = 1206900
    expect(total).toBe(1206900);
    expect(formatCentsToEUR(total)).toMatch(/12\.069,00/);
  });
});
