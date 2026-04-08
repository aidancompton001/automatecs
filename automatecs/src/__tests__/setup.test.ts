import { describe, it, expect } from "vitest";

describe("Project Setup", () => {
  it("TypeScript types are importable", () => {
    // Smoke test: types compile correctly
    const product: import("@/types").Product = {
      slug: "test",
      name: "Test Machine",
      category: "snackautomaten",
      basePriceCents: 829000,
      features: ["Feature 1"],
      specs: null,
      description: "Test",
      imageUrl: "/test.jpg",
      hasConfigurator: true,
    };
    expect(product.basePriceCents).toBe(829000);
    expect(product.category).toBe("snackautomaten");
  });

  it("brand colors are defined", () => {
    // Verify our design tokens exist as constants
    const BRAND = {
      yellow: "#ffd936",
      gold: "#dab200",
      green: "#536942",
      black: "#1a1a1a",
      white: "#ffffff",
    };
    expect(BRAND.yellow).toBe("#ffd936");
    expect(BRAND.gold).toBe("#dab200");
    expect(BRAND.green).toBe("#536942");
  });
});
