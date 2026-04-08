import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getAllProducts, getAllCategories, getProductBySlug } from "@/lib/catalog";
import { calculateTotal, getAllOptionIds } from "@/lib/calculator";
import { formatCentsToEUR } from "@/lib/formatPrice";

/**
 * T001 Acceptance Criteria — Automated Checklist
 * Each test maps to a checkbox in T001 checklist.
 */

const SRC = path.resolve(__dirname, "..");
const PUBLIC = path.resolve(__dirname, "../../public");
const ROOT = path.resolve(__dirname, "../..");

// ── Функционал ──────────────────────────────────

describe("T001 Checklist: Функционал", () => {
  it("Каталог: 4 категории × N продуктов", () => {
    const cats = getAllCategories();
    expect(cats).toHaveLength(4);
    for (const cat of cats) {
      const products = getAllProducts().filter((p) => p.category === cat.slug);
      expect(products.length).toBeGreaterThan(0);
    }
  });

  it("Калькулятор: base + Σ(selected options) = правильная сумма", () => {
    const base = 829000;
    const all = getAllOptionIds();
    const total = calculateTotal(base, all);
    expect(total).toBe(1249900);
  });

  it("Калькулятор: EUR форматирование (1.234,56 €)", () => {
    expect(formatCentsToEUR(829000)).toMatch(/8\.290,00/);
    expect(formatCentsToEUR(1249900)).toMatch(/12\.499,00/);
  });
});

// ── Анимации ────────────────────────────────────

describe("T001 Checklist: Анимации", () => {
  it("prefers-reduced-motion: ВСЕ анимации отключаются", () => {
    const css = fs.readFileSync(path.join(SRC, "app/globals.css"), "utf-8");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain("animation-duration: 0.01ms");
    expect(css).toContain("transition-duration: 0.01ms");
  });

  it("Все анимации: ТОЛЬКО transform + opacity (motion-variants.ts)", () => {
    const variants = fs.readFileSync(
      path.join(SRC, "lib/motion-variants.ts"),
      "utf-8"
    );
    // fadeUp uses opacity + y (translateY = transform)
    expect(variants).toContain("opacity: 0");
    expect(variants).toContain("opacity: 1");
    expect(variants).toContain("y: 40");
    expect(variants).toContain("y: 0");
    // No width/height/top/left animations
    expect(variants).not.toMatch(/\bwidth\b.*:/);
    expect(variants).not.toMatch(/\bheight\b.*:/);
  });

  it("Page transitions: работают (minimal fade-in)", () => {
    const shell = fs.readFileSync(
      path.join(SRC, "components/layout/LayoutShell.tsx"),
      "utf-8"
    );
    expect(shell).toContain("motion.main");
    expect(shell).toContain("opacity: 0");
    expect(shell).toContain("opacity: 1");
  });
});

// ── DSGVO ───────────────────────────────────────

describe("T001 Checklist: DSGVO", () => {
  it("Cookie-Banner exists (animated slide-up)", () => {
    expect(
      fs.existsSync(path.join(SRC, "components/layout/CookieBanner.tsx"))
    ).toBe(true);
  });

  it("Impressum page exists", () => {
    expect(fs.existsSync(path.join(SRC, "app/impressum/page.tsx"))).toBe(true);
  });

  it("Datenschutz page exists", () => {
    expect(fs.existsSync(path.join(SRC, "app/datenschutz/page.tsx"))).toBe(true);
  });
});

// ── SEO ─────────────────────────────────────────

describe("T001 Checklist: SEO", () => {
  it("robots.txt корректный (НЕ noindex!)", () => {
    const content = fs.readFileSync(path.join(PUBLIC, "robots.txt"), "utf-8");
    expect(content).toContain("Allow: /");
    expect(content).not.toContain("noindex");
    expect(content).not.toContain("Disallow");
  });

  it("sitemap.xml доступен", () => {
    expect(fs.existsSync(path.join(PUBLIC, "sitemap.xml"))).toBe(true);
  });

  it("Organization JSON-LD в layout.tsx", () => {
    const layout = fs.readFileSync(path.join(SRC, "app/layout.tsx"), "utf-8");
    expect(layout).toContain("application/ld+json");
    expect(layout).toContain("generateOrgJsonLd");
  });

  it("OG tags в layout metadata", () => {
    const layout = fs.readFileSync(path.join(SRC, "app/layout.tsx"), "utf-8");
    expect(layout).toContain("openGraph");
    expect(layout).toContain("de_DE");
  });
});

// ── Качество ────────────────────────────────────

describe("T001 Checklist: Качество", () => {
  it("Нет placeholder text в product data", () => {
    for (const p of getAllProducts()) {
      expect(p.name).not.toContain("Lorem");
      expect(p.description).not.toContain("Lorem");
    }
  });

  it("Нет typo in product/content data", () => {
    // Check data and content files for the old site typo
    for (const p of getAllProducts()) {
      expect(p.name).not.toContain("KONFIG" + "ATION"); // split to avoid self-match
      expect(p.description).not.toContain("KONFIG" + "ATION");
    }
  });

  it("Wasserspender: basePriceCents = 0, hasConfigurator = false", () => {
    const wasser = getAllProducts().filter((p) => p.category === "wasserspender");
    for (const p of wasser) {
      expect(p.basePriceCents).toBe(0);
      expect(p.hasConfigurator).toBe(false);
    }
  });

  it("Placeholder products marked (isPlaceholder)", () => {
    const kalt = getAllProducts().filter(
      (p) => p.category === "kaltgetraenkeautomaten"
    );
    const kaffee = getAllProducts().filter(
      (p) => p.category === "kaffeeautomaten"
    );
    for (const p of [...kalt, ...kaffee]) {
      expect(p.isPlaceholder).toBe(true);
    }
  });
});

// ── Инфраструктура ──────────────────────────────

describe("T001 Checklist: Инфраструктура", () => {
  it(".gitignore: node_modules, .next, .env", () => {
    // automatecs has its own .gitignore
    const gitignore = fs.readFileSync(
      path.join(ROOT, ".gitignore"),
      "utf-8"
    );
    expect(gitignore).toContain("node_modules");
    expect(gitignore).toContain(".next");
  });

  it("next.config.ts has output: export", () => {
    const config = fs.readFileSync(
      path.join(ROOT, "next.config.ts"),
      "utf-8"
    );
    expect(config).toContain('"export"');
  });
});

// ── Дополнительные критерии T002 ────────────────

describe("T001 Checklist: T002 fixes", () => {
  it("Custom 404 page exists", () => {
    expect(fs.existsSync(path.join(SRC, "app/not-found.tsx"))).toBe(true);
  });

  it("Error boundary exists", () => {
    expect(fs.existsSync(path.join(SRC, "app/error.tsx"))).toBe(true);
  });

  it("Loading skeleton exists", () => {
    expect(fs.existsSync(path.join(SRC, "app/loading.tsx"))).toBe(true);
  });

  it("TypeScript types defined", () => {
    expect(fs.existsSync(path.join(SRC, "types/index.ts"))).toBe(true);
    const types = fs.readFileSync(path.join(SRC, "types/index.ts"), "utf-8");
    expect(types).toContain("interface Product");
    expect(types).toContain("interface Category");
    expect(types).toContain("interface Option");
    expect(types).toContain("interface PageContent");
  });

  it("Fonts: Poppins + Open Sans in layout", () => {
    const layout = fs.readFileSync(path.join(SRC, "app/layout.tsx"), "utf-8");
    expect(layout).toContain("Poppins");
    expect(layout).toContain("Open_Sans");
  });

  it("Kontakt form → mailto", () => {
    const kontakt = fs.readFileSync(
      path.join(SRC, "app/kontakt/KontaktClient.tsx"),
      "utf-8"
    );
    expect(kontakt).toContain("mailto:");
    expect(kontakt).toContain("company.email"); // uses dynamic email from company.json
  });

  it("G Snack Design XII has specs (11 fields)", () => {
    const p = getProductBySlug("g-snack-design-xii")!;
    expect(p.specs).not.toBeNull();
    expect(Object.keys(p.specs!)).toHaveLength(11);
  });
});
