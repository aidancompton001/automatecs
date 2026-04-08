import { describe, it, expect } from "vitest";
import { getAllCategories, getMinPriceByCategory, getProductsByCategory } from "@/lib/catalog";
import type { PageContent } from "@/types";
import homeContent from "../../content/pages/home.json";

const content = homeContent as PageContent;

describe("Home page content (home.json)", () => {
  it("has hero with headline from PDF", () => {
    expect(content.hero.headline).toBe(
      "Konfigurieren Sie ganz einfach Ihren Wunschautomaten."
    );
  });

  it("has hero subheadline from PDF", () => {
    expect(content.hero.subheadline).toContain("Kaffee, Erfrischungen und Snacks");
  });

  it("has CTA pointing to /automaten/", () => {
    expect(content.hero.ctaText).toBe("Zu den Automaten");
    expect(content.hero.ctaHref).toBe("/automaten/");
  });

  it("has sideCallout with phone number", () => {
    expect(content.hero.sideCallout).toContain("04172 98 74 700");
  });

  it("has 4 body paragraphs (not lorem ipsum)", () => {
    expect(content.body).toHaveLength(4);
    for (const p of content.body) {
      expect(p).not.toContain("Lorem");
      expect(p.length).toBeGreaterThan(20);
    }
  });
});

describe("CategoryGrid data", () => {
  it("getAllCategories returns 4", () => {
    expect(getAllCategories()).toHaveLength(4);
  });

  it("getMinPriceByCategory returns correct prices", () => {
    const minPrices = getMinPriceByCategory();

    // Snack, Kalt, Kaffee all have 619000 as categoryPriceCents
    expect(minPrices["snackautomaten"]).toBe(619000);
    expect(minPrices["kaltgetraenkeautomaten"]).toBe(619000);
    expect(minPrices["kaffeeautomaten"]).toBe(619000);

    // Wasserspender has 0 (no price)
    expect(minPrices["wasserspender"]).toBe(0);
  });

  it("each category has products", () => {
    expect(getProductsByCategory("snackautomaten")).toHaveLength(6);
    expect(getProductsByCategory("kaltgetraenkeautomaten")).toHaveLength(6);
    expect(getProductsByCategory("kaffeeautomaten")).toHaveLength(6);
    expect(getProductsByCategory("wasserspender")).toHaveLength(3);
  });
});

describe("catalog.ts helpers", () => {
  it("getProductsByCategory returns correct type", () => {
    const snack = getProductsByCategory("snackautomaten");
    for (const p of snack) {
      expect(p.category).toBe("snackautomaten");
      expect(p.basePriceCents).toBeGreaterThan(0);
    }
  });
});
