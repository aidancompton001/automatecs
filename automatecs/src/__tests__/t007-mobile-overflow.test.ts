import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const SRC = path.resolve(__dirname, "..");

describe("T007: Global mobile safety", () => {
  it("body has overflow-x-hidden", () => {
    const layout = fs.readFileSync(path.join(SRC, "app/layout.tsx"), "utf-8");
    expect(layout).toContain("overflow-x-hidden");
  });

  it("body has break-words", () => {
    const layout = fs.readFileSync(path.join(SRC, "app/layout.tsx"), "utf-8");
    expect(layout).toContain("break-words");
  });
});

describe("T007: CTA buttons — responsive tracking", () => {
  const ctaFiles = [
    "components/layout/Footer.tsx",
    "components/sections/HeroSection.tsx",
    "components/sections/CTABanner.tsx",
    "components/catalog/ProductDetail.tsx",
    "app/zubehoer/ZubehoerClient.tsx",
    "app/kontakt/KontaktClient.tsx",
  ];

  for (const file of ctaFiles) {
    it(`${file}: no fixed tracking-wide without md: prefix`, () => {
      const content = fs.readFileSync(path.join(SRC, file), "utf-8");
      // Should use "tracking-normal md:tracking-wide" not just "tracking-wide"
      // Allow tracking-wide ONLY when preceded by md: or lg:
      const lines = content.split("\n");
      for (const line of lines) {
        if (line.includes("tracking-wide") && !line.includes("md:tracking-wide") && !line.includes("tracking-wider")) {
          // tracking-wide without responsive prefix = BAD
          if (line.includes("className")) {
            throw new Error(
              `${file}: found "tracking-wide" without "md:tracking-wide" — will overflow on mobile`
            );
          }
        }
      }
    });
  }
});

describe("T007: Font sizes — responsive on large text", () => {
  it("PriceCalculator total: text-2xl md:text-3xl", () => {
    const code = fs.readFileSync(
      path.join(SRC, "components/catalog/PriceCalculator.tsx"),
      "utf-8"
    );
    expect(code).toContain("text-2xl md:text-3xl");
  });

  it("not-found: text-4xl md:text-6xl", () => {
    const code = fs.readFileSync(path.join(SRC, "app/not-found.tsx"), "utf-8");
    expect(code).toContain("text-4xl md:text-6xl");
  });

  it("error: text-2xl md:text-3xl", () => {
    const code = fs.readFileSync(path.join(SRC, "app/error.tsx"), "utf-8");
    expect(code).toContain("text-2xl md:text-3xl");
  });
});

describe("T007: Legal pages — break-words for URLs", () => {
  it("DatenschutzClient has break-words", () => {
    const code = fs.readFileSync(
      path.join(SRC, "app/datenschutz/DatenschutzClient.tsx"),
      "utf-8"
    );
    expect(code).toContain("break-words");
  });

  it("ImpressumClient has break-words", () => {
    const code = fs.readFileSync(
      path.join(SRC, "app/impressum/ImpressumClient.tsx"),
      "utf-8"
    );
    expect(code).toContain("break-words");
  });
});
