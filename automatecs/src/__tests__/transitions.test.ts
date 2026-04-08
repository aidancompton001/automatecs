import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const LAYOUT_SHELL = path.resolve(
  __dirname,
  "../components/layout/LayoutShell.tsx"
);

describe("Page Transitions — Phase 12 (minimal fade-in)", () => {
  const code = fs.readFileSync(LAYOUT_SHELL, "utf-8");

  it("LayoutShell exists", () => {
    expect(fs.existsSync(LAYOUT_SHELL)).toBe(true);
  });

  it("uses motion.main for fade-in", () => {
    expect(code).toContain("motion.main");
  });

  it("has initial opacity 0", () => {
    expect(code).toContain("opacity: 0");
  });

  it("has animate opacity 1", () => {
    expect(code).toContain("opacity: 1");
  });

  it("does NOT use AnimatePresence (no exit animation — Landa L1)", () => {
    expect(code).not.toContain("AnimatePresence");
  });

  it("does NOT use template.tsx (C5 fix)", () => {
    // Verify no template.tsx exists in app directory
    const appDir = path.resolve(__dirname, "../app");
    expect(fs.existsSync(path.join(appDir, "template.tsx"))).toBe(false);
  });

  it("respects shouldAnimate (disabled on mobile)", () => {
    expect(code).toContain("shouldAnimate");
    // When !shouldAnimate, renders plain <main> without motion
    expect(code).toContain('<main className="flex-1">');
  });

  it("transition duration is 300ms", () => {
    expect(code).toContain("duration: 0.3");
  });
});
