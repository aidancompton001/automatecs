/**
 * T008 regression tests — Split Hero bugs:
 * 1. bg-brand-charcoal doesn't exist → must use bg-brand-black
 * 2. bg-brand-warm-white doesn't exist → must use bg-brand-white
 * 3. next/image auto-prepends basePath → don't use getImageUrl() for <Image src>
 */
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const HERO_PATH = path.resolve(
  __dirname,
  "../components/sections/HeroSection.tsx"
);
const GLOBALS_PATH = path.resolve(__dirname, "../app/globals.css");

describe("T008 — Split Hero", () => {
  const heroCode = fs.readFileSync(HERO_PATH, "utf-8");
  const globalsCSS = fs.readFileSync(GLOBALS_PATH, "utf-8");

  // Extract defined CSS token names
  const definedTokens = [...globalsCSS.matchAll(/--color-(brand-\w+)/g)].map(
    (m) => m[1]
  );

  it("should NOT use bg-brand-charcoal (token doesn't exist)", () => {
    expect(heroCode).not.toContain("bg-brand-charcoal");
  });

  it("should NOT use bg-brand-warm-white (token doesn't exist)", () => {
    expect(heroCode).not.toContain("bg-brand-warm-white");
  });

  it("should use only defined brand color tokens in split hero", () => {
    // All bg-brand-* classes used in hero
    const bgClasses = [...heroCode.matchAll(/bg-(brand-\w+)/g)].map(
      (m) => m[1]
    );
    for (const cls of bgClasses) {
      expect(definedTokens).toContain(cls);
    }
  });

  it("should NOT use getImageUrl for next/image src (double basePath)", () => {
    // Find <Image ... src={...} /> patterns
    // getImageUrl should only appear in <a href>, not in <Image src>
    const imageTagMatch = heroCode.match(
      /<Image[\s\S]*?src=\{([^}]+)\}[\s\S]*?\/>/
    );
    if (imageTagMatch) {
      const srcValue = imageTagMatch[1];
      expect(srcValue).not.toContain("getImageUrl");
    }
  });

  it("should use getImageUrl for <a href> (raw HTML needs basePath)", () => {
    const aHrefMatch = heroCode.match(/href=\{getImageUrl\(heroImage\)\}/);
    expect(aHrefMatch).not.toBeNull();
  });
});
