import { describe, it, expect } from "vitest";
import { calculateTotal, getAllOptions, getAllOptionIds } from "@/lib/calculator";
import { formatCentsToEUR, formatCentsCompact } from "@/lib/formatPrice";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import optionsData from "@/data/options.json";
import type { Product, Category, Option } from "@/types";

// ============================================================
// ЖЕЛЕЗНОЕ ПРАВИЛО: ВСЕ расчёты через скрипт. Проверяем каждый.
// ============================================================

describe("formatCentsToEUR", () => {
  it("829000 cents → 8.290,00 €", () => {
    expect(formatCentsToEUR(829000)).toMatch(/8\.290,00/);
  });

  it("619000 cents → 6.190,00 €", () => {
    expect(formatCentsToEUR(619000)).toMatch(/6\.190,00/);
  });

  it("0 cents → 0,00 €", () => {
    expect(formatCentsToEUR(0)).toMatch(/0,00/);
  });

  it("each option price formats correctly", () => {
    expect(formatCentsToEUR(52000)).toMatch(/520,00/);
    expect(formatCentsToEUR(99000)).toMatch(/990,00/);
    expect(formatCentsToEUR(59500)).toMatch(/595,00/);
    expect(formatCentsToEUR(57500)).toMatch(/575,00/);
    expect(formatCentsToEUR(109900)).toMatch(/1\.099,00/);
    expect(formatCentsToEUR(10000)).toMatch(/100,00/);
    expect(formatCentsToEUR(13000)).toMatch(/130,00/);
  });
});

describe("formatCentsCompact", () => {
  it("829000 → 8.290", () => {
    expect(formatCentsCompact(829000)).toBe("8.290");
  });

  it("619000 → 6.190", () => {
    expect(formatCentsCompact(619000)).toBe("6.190");
  });
});

describe("calculateTotal", () => {
  const BASE = 829000; // 8.290€

  it("0 options = base price", () => {
    expect(calculateTotal(BASE, [])).toBe(829000);
  });

  it("single option: Münzwechsler", () => {
    expect(calculateTotal(BASE, ["muenzwechsler"])).toBe(829000 + 52000);
  });

  it("single option: Nayax", () => {
    expect(calculateTotal(BASE, ["nayax"])).toBe(829000 + 99000);
  });

  it("single option: SENVEND UX700", () => {
    expect(calculateTotal(BASE, ["senvend-ux700"])).toBe(829000 + 109900);
  });

  it("two options: Münzwechsler + Nayax", () => {
    expect(calculateTotal(BASE, ["muenzwechsler", "nayax"])).toBe(
      829000 + 52000 + 99000
    );
  });

  it("all 5 KORR options", () => {
    const korrOptions = [
      "muenzwechsler",
      "nayax",
      "ict-xba",
      "ict-dcm5",
      "senvend-ux700",
    ];
    const expected = 829000 + 52000 + 99000 + 59500 + 57500 + 109900;
    expect(calculateTotal(BASE, korrOptions)).toBe(expected);
    expect(expected).toBe(1206900); // verify total manually: 12.069€
  });

  it("all 9 options (KORR + lay_2_GES)", () => {
    const allOptions = getAllOptionIds();
    expect(allOptions).toHaveLength(9);

    const expected =
      829000 + 52000 + 99000 + 59500 + 57500 + 109900 + 10000 + 13000 + 10000 + 10000;
    expect(calculateTotal(BASE, allOptions)).toBe(expected);
    expect(expected).toBe(1249900); // verify: 12.499€
    expect(formatCentsToEUR(expected)).toMatch(/12\.499,00/);
  });

  it("throws on invalid option ID (Landa L3)", () => {
    expect(() => calculateTotal(BASE, ["fake-option"])).toThrow(
      'Invalid option ID: "fake-option"'
    );
  });

  it("throws on empty string option ID", () => {
    expect(() => calculateTotal(BASE, [""])).toThrow("Invalid option ID");
  });

  it("base 0 + options = only options total", () => {
    expect(calculateTotal(0, ["muenzwechsler"])).toBe(52000);
  });
});

describe("Data integrity: categories.json", () => {
  const categories = categoriesData as Category[];

  it("has exactly 4 categories", () => {
    expect(categories).toHaveLength(4);
  });

  it("has correct slugs", () => {
    const slugs = categories.map((c) => c.slug);
    expect(slugs).toContain("snackautomaten");
    expect(slugs).toContain("kaltgetraenkeautomaten");
    expect(slugs).toContain("kaffeeautomaten");
    expect(slugs).toContain("wasserspender");
  });

  it("all categories have required fields", () => {
    for (const cat of categories) {
      expect(cat.slug).toBeTruthy();
      expect(cat.name).toBeTruthy();
      expect(cat.headline).toBeTruthy();
      expect(cat.description).toBeTruthy();
    }
  });
});

describe("Data integrity: products.json", () => {
  const products = productsData as Product[];

  it("has exactly 21 products", () => {
    expect(products).toHaveLength(21);
  });

  it("6 snack, 6 kalt, 6 kaffee, 3 wasser", () => {
    const snack = products.filter((p) => p.category === "snackautomaten");
    const kalt = products.filter((p) => p.category === "kaltgetraenkeautomaten");
    const kaffee = products.filter((p) => p.category === "kaffeeautomaten");
    const wasser = products.filter((p) => p.category === "wasserspender");

    expect(snack).toHaveLength(6);
    expect(kalt).toHaveLength(6);
    expect(kaffee).toHaveLength(6);
    expect(wasser).toHaveLength(3);
  });

  it("all prices are integers (cents, ЖЕЛЕЗНОЕ ПРАВИЛО)", () => {
    for (const p of products) {
      expect(Number.isInteger(p.basePriceCents)).toBe(true);
      expect(Number.isInteger(p.categoryPriceCents)).toBe(true);
    }
  });

  it("snack products are NOT placeholder", () => {
    const snack = products.filter((p) => p.category === "snackautomaten");
    for (const p of snack) {
      expect(p.isPlaceholder).toBe(false);
    }
  });

  it("kalt + kaffee products ARE placeholder (Landa L2)", () => {
    const kalt = products.filter((p) => p.category === "kaltgetraenkeautomaten");
    const kaffee = products.filter((p) => p.category === "kaffeeautomaten");
    for (const p of [...kalt, ...kaffee]) {
      expect(p.isPlaceholder).toBe(true);
    }
  });

  it("wasserspender: basePriceCents = 0, hasConfigurator = false", () => {
    const wasser = products.filter((p) => p.category === "wasserspender");
    for (const p of wasser) {
      expect(p.basePriceCents).toBe(0);
      expect(p.hasConfigurator).toBe(false);
    }
  });

  it("all slugs are unique", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("G Snack Design XII has specs", () => {
    const xii = products.find((p) => p.slug === "g-snack-design-xii");
    expect(xii).toBeDefined();
    expect(xii!.specs).not.toBeNull();
    expect(xii!.specs!.maxSelections).toBe(96);
    expect(xii!.specs!.weight).toBe("410 kg");
  });
});

describe("Data integrity: options.json", () => {
  const options = optionsData as Option[];

  it("has exactly 9 options", () => {
    expect(options).toHaveLength(9);
  });

  it("all prices are integers (cents)", () => {
    for (const o of options) {
      expect(Number.isInteger(o.priceCents)).toBe(true);
      expect(o.priceCents).toBeGreaterThan(0);
    }
  });

  it("all IDs are unique", () => {
    const ids = options.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("KORR options have correct prices", () => {
    const find = (id: string) => options.find((o) => o.id === id)!;
    expect(find("muenzwechsler").priceCents).toBe(52000);
    expect(find("nayax").priceCents).toBe(99000);
    expect(find("ict-xba").priceCents).toBe(59500);
    expect(find("ict-dcm5").priceCents).toBe(57500);
    expect(find("senvend-ux700").priceCents).toBe(109900);
  });

  it("lay_2_GES options have correct prices", () => {
    const find = (id: string) => options.find((o) => o.id === id)!;
    expect(find("sicherheitsschloss").priceCents).toBe(10000);
    expect(find("schluesselsatz").priceCents).toBe(13000);
    expect(find("bodenbefestigung").priceCents).toBe(10000);
    expect(find("zusaetzliche-ebenen").priceCents).toBe(10000);
  });

  it("categories are valid", () => {
    const validCats = ["payment", "security", "equipment"];
    for (const o of options) {
      expect(validCats).toContain(o.category);
    }
  });
});
