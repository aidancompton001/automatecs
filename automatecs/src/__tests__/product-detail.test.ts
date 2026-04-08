import { describe, it, expect } from "vitest";
import { getAllProducts, getProductBySlug } from "@/lib/catalog";
import { calculateTotal, getAllOptions, getAllOptionIds } from "@/lib/calculator";
import { formatCentsToEUR } from "@/lib/formatPrice";
import includedFeatures from "@/data/included-features.json";

describe("generateStaticParams — Landa L1", () => {
  it("generates params for ALL 21 products", () => {
    const products = getAllProducts();
    const params = products.map((p) => ({ slug: p.slug }));
    expect(params).toHaveLength(21);
  });

  it("all slugs are unique", () => {
    const slugs = getAllProducts().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(21);
  });

  it("all slugs are URL-safe", () => {
    for (const p of getAllProducts()) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

describe("Product Detail — G Snack Design XII (reference product)", () => {
  const product = getProductBySlug("g-snack-design-xii")!;

  it("exists", () => {
    expect(product).toBeDefined();
  });

  it("has basePriceCents 829000", () => {
    expect(product.basePriceCents).toBe(829000);
  });

  it("has specs with 11 fields", () => {
    expect(product.specs).not.toBeNull();
    const specKeys = Object.keys(product.specs!);
    expect(specKeys).toHaveLength(11);
  });

  it("has hasConfigurator = true", () => {
    expect(product.hasConfigurator).toBe(true);
  });

  it("is NOT placeholder", () => {
    expect(product.isPlaceholder).toBe(false);
  });

  it("specs maxSelections = 96", () => {
    expect(product.specs!.maxSelections).toBe(96);
  });
});

describe("PriceCalculator logic — ЖЕЛЕЗНОЕ ПРАВИЛО", () => {
  const BASE = 829000;
  const options = getAllOptions();

  it("has 9 options available", () => {
    expect(options).toHaveLength(9);
  });

  it("no options selected = base price only", () => {
    expect(calculateTotal(BASE, [])).toBe(829000);
    expect(formatCentsToEUR(829000)).toMatch(/8\.290,00/);
  });

  it("single option Münzwechsler: 829000 + 52000 = 881000", () => {
    const total = calculateTotal(BASE, ["muenzwechsler"]);
    expect(total).toBe(881000);
    expect(formatCentsToEUR(total)).toMatch(/8\.810,00/);
  });

  it("two options: Münzwechsler + Nayax = 980000", () => {
    const total = calculateTotal(BASE, ["muenzwechsler", "nayax"]);
    expect(total).toBe(829000 + 52000 + 99000);
    expect(total).toBe(980000);
  });

  it("all 5 KORR options = 1206900", () => {
    const korr = ["muenzwechsler", "nayax", "ict-xba", "ict-dcm5", "senvend-ux700"];
    const total = calculateTotal(BASE, korr);
    expect(total).toBe(1206900);
    expect(formatCentsToEUR(total)).toMatch(/12\.069,00/);
  });

  it("all 9 options = 1249900", () => {
    const all = getAllOptionIds();
    const total = calculateTotal(BASE, all);
    expect(total).toBe(1249900);
    expect(formatCentsToEUR(total)).toMatch(/12\.499,00/);
  });

  it("toggle on then off = back to base", () => {
    // Simulate toggle
    let selected: string[] = [];
    selected = [...selected, "nayax"]; // add
    expect(calculateTotal(BASE, selected)).toBe(829000 + 99000);
    selected = selected.filter((x) => x !== "nayax"); // remove
    expect(calculateTotal(BASE, selected)).toBe(829000);
  });

  it("invalid option throws", () => {
    expect(() => calculateTotal(BASE, ["fake"])).toThrow();
  });
});

describe("Wasserspender — no configurator", () => {
  const products = getAllProducts().filter(
    (p) => p.category === "wasserspender"
  );

  it("3 products, all hasConfigurator = false", () => {
    expect(products).toHaveLength(3);
    for (const p of products) {
      expect(p.hasConfigurator).toBe(false);
      expect(p.basePriceCents).toBe(0);
    }
  });
});

describe("IncludedFeatures data", () => {
  it("has 14 features", () => {
    expect(includedFeatures).toHaveLength(14);
  });

  it("first = R290 Kühlung, last = Bedienungsanleitung", () => {
    expect(includedFeatures[0]).toContain("R290");
    expect(includedFeatures[13]).toBe("Bedienungsanleitung");
  });
});

describe("JSON-LD Product schema — Landa L3", () => {
  it("product with price generates valid schema", () => {
    const product = getProductBySlug("g-snack-design-xii")!;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      offers: {
        "@type": "Offer",
        price: (product.basePriceCents / 100).toFixed(2),
        priceCurrency: "EUR",
      },
    };

    expect(jsonLd["@type"]).toBe("Product");
    expect(jsonLd.offers.price).toBe("8290.00");
    expect(jsonLd.offers.priceCurrency).toBe("EUR");
  });

  it("product with price 0 should not generate schema", () => {
    const product = getProductBySlug("sempreaqua-ps-20")!;
    expect(product.basePriceCents).toBe(0);
    // No JSON-LD for price=0 products
  });
});
