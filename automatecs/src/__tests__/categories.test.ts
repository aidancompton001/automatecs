import { describe, it, expect } from "vitest";
import { getProductsByCategory, getAllCategories, getProductBySlug } from "@/lib/catalog";
import { formatCentsCompact } from "@/lib/formatPrice";
import type { PageContent } from "@/types";

// Import all category content to verify structure
import snackContent from "../../content/pages/snackautomaten.json";
import kaltContent from "../../content/pages/kaltgetraenkeautomaten.json";
import kaffeeContent from "../../content/pages/kaffeeautomaten.json";
import wasserContent from "../../content/pages/wasserspender.json";

const categoryContents: Record<string, PageContent> = {
  snackautomaten: snackContent as PageContent,
  kaltgetraenkeautomaten: kaltContent as PageContent,
  kaffeeautomaten: kaffeeContent as PageContent,
  wasserspender: wasserContent as PageContent,
};

describe("Category pages content", () => {
  for (const [slug, content] of Object.entries(categoryContents)) {
    describe(slug, () => {
      it("has hero from PDF (not placeholder)", () => {
        expect(content.hero.headline).not.toContain("Lorem");
        expect(content.hero.headline.length).toBeGreaterThan(10);
      });

      it("has body text", () => {
        expect(content.body.length).toBeGreaterThan(0);
      });

      it("has products in catalog", () => {
        const products = getProductsByCategory(slug as any);
        expect(products.length).toBeGreaterThan(0);
      });
    });
  }
});

describe("ProductCard data integrity", () => {
  it("snack products: 6, not placeholder, price > 0", () => {
    const products = getProductsByCategory("snackautomaten");
    expect(products).toHaveLength(6);
    for (const p of products) {
      expect(p.isPlaceholder).toBe(false);
      expect(p.categoryPriceCents).toBe(619000);
      expect(formatCentsCompact(p.categoryPriceCents)).toBe("6.190");
    }
  });

  it("kalt products: 6, ARE placeholder", () => {
    const products = getProductsByCategory("kaltgetraenkeautomaten");
    expect(products).toHaveLength(6);
    for (const p of products) {
      expect(p.isPlaceholder).toBe(true);
    }
  });

  it("kaffee products: 6, ARE placeholder", () => {
    const products = getProductsByCategory("kaffeeautomaten");
    expect(products).toHaveLength(6);
    for (const p of products) {
      expect(p.isPlaceholder).toBe(true);
    }
  });

  it("wasser products: 3, price = 0, no configurator", () => {
    const products = getProductsByCategory("wasserspender");
    expect(products).toHaveLength(3);
    for (const p of products) {
      expect(p.categoryPriceCents).toBe(0);
      expect(p.hasConfigurator).toBe(false);
      expect(p.isPlaceholder).toBe(false);
    }
  });
});

describe("CategoryPageLayout DRY — Landa L1", () => {
  it("all 4 categories use same product data structure", () => {
    const slugs = getAllCategories().map((c) => c.slug);
    expect(slugs).toHaveLength(4);

    for (const slug of slugs) {
      const products = getProductsByCategory(slug as any);
      for (const p of products) {
        // Every product has required fields
        expect(p.slug).toBeTruthy();
        expect(p.name).toBeTruthy();
        expect(p.features.length).toBeGreaterThan(0);
        expect(typeof p.categoryPriceCents).toBe("number");
        expect(typeof p.hasConfigurator).toBe("boolean");
        expect(typeof p.isPlaceholder).toBe("boolean");
      }
    }
  });
});

describe("Product slugs for category links", () => {
  it("snack slugs are valid URL-safe", () => {
    const products = getProductsByCategory("snackautomaten");
    for (const p of products) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("getProductBySlug returns correct product", () => {
    const p = getProductBySlug("g-snack-design-xii");
    expect(p).toBeDefined();
    expect(p!.name).toBe("Sanden Vendo G Snack Design XII");
    expect(p!.basePriceCents).toBe(829000);
  });

  it("getProductBySlug returns undefined for invalid slug", () => {
    expect(getProductBySlug("nonexistent")).toBeUndefined();
  });
});
