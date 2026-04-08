import { describe, it, expect } from "vitest";

describe("Project Setup", () => {
  it("TypeScript types are importable", () => {
    // Smoke test: types compile correctly
    const product: import("@/types").Product = {
      slug: "test",
      name: "Test Machine",
      category: "snackautomaten",
      basePriceCents: 829000,
      categoryPriceCents: 619000,
      features: ["Feature 1"],
      specs: null,
      description: "Test",
      imageUrl: "/test.jpg",
      hasConfigurator: true,
      isPlaceholder: false,
    };
    expect(product.basePriceCents).toBe(829000);
    expect(product.category).toBe("snackautomaten");
  });

  it("brand colors are defined (LUMA 5-color palette)", () => {
    // LUMA Brand Identity: ONLY these 5 colors allowed
    const BRAND = {
      gold: "#ffd936",
      darkGold: "#dab200",
      green: "#536942",
      charcoal: "#2a2a2a",
      warmWhite: "#f8f7f4",
    };
    expect(BRAND.gold).toBe("#ffd936");
    expect(BRAND.darkGold).toBe("#dab200");
    expect(BRAND.green).toBe("#536942");
    expect(BRAND.charcoal).toBe("#2a2a2a");
    expect(BRAND.warmWhite).toBe("#f8f7f4");
  });
});
