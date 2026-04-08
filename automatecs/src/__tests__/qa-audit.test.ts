import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getAllProducts, getAllCategories } from "@/lib/catalog";
import { getAllOptions, getAllOptionIds } from "@/lib/calculator";
import { getAllBlogPosts } from "@/lib/blog";

const SRC_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.resolve(__dirname, "../../public");
const CONTENT_DIR = path.resolve(__dirname, "../../content");

// ============================================================
// QA AUDIT — Comprehensive project verification
// ============================================================

describe("QA: All motion components have 'use client'", () => {
  const motionDir = path.join(SRC_DIR, "components/motion");
  const files = fs.readdirSync(motionDir).filter((f) => f.endsWith(".tsx"));

  for (const file of files) {
    it(`${file} has 'use client'`, () => {
      const content = fs.readFileSync(path.join(motionDir, file), "utf-8");
      expect(content.startsWith('"use client"')).toBe(true);
    });
  }
});

describe("QA: All layout components have 'use client'", () => {
  const layoutDir = path.join(SRC_DIR, "components/layout");
  const tsxFiles = fs.readdirSync(layoutDir).filter((f) => f.endsWith(".tsx"));

  for (const file of tsxFiles) {
    it(`${file} has 'use client'`, () => {
      const content = fs.readFileSync(path.join(layoutDir, file), "utf-8");
      expect(content.startsWith('"use client"')).toBe(true);
    });
  }
});

describe("QA: prefers-reduced-motion in globals.css", () => {
  const css = fs.readFileSync(
    path.join(SRC_DIR, "app/globals.css"),
    "utf-8"
  );

  it("has prefers-reduced-motion media query", () => {
    expect(css).toContain("prefers-reduced-motion: reduce");
  });

  it("resets animation-duration", () => {
    expect(css).toContain("animation-duration: 0.01ms");
  });

  it("resets transition-duration", () => {
    expect(css).toContain("transition-duration: 0.01ms");
  });

  it("resets scroll-behavior", () => {
    expect(css).toContain("scroll-behavior: auto");
  });
});

describe("QA: Data integrity — all prices are integers (cents)", () => {
  it("all product basePriceCents are integers", () => {
    for (const p of getAllProducts()) {
      expect(Number.isInteger(p.basePriceCents)).toBe(true);
      expect(Number.isInteger(p.categoryPriceCents)).toBe(true);
    }
  });

  it("all option priceCents are integers", () => {
    for (const o of getAllOptions()) {
      expect(Number.isInteger(o.priceCents)).toBe(true);
      expect(o.priceCents).toBeGreaterThan(0);
    }
  });
});

describe("QA: Data consistency — slugs", () => {
  it("all product slugs unique", () => {
    const slugs = getAllProducts().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all product slugs URL-safe", () => {
    for (const p of getAllProducts()) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("all blog slugs unique", () => {
    const slugs = getAllBlogPosts().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all option IDs unique", () => {
    const ids = getAllOptionIds();
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("QA: Content files — no Lorem ipsum anywhere", () => {
  const contentPages = fs
    .readdirSync(path.join(CONTENT_DIR, "pages"))
    .filter((f) => f.endsWith(".json"));

  for (const file of contentPages) {
    it(`content/pages/${file} — no Lorem ipsum`, () => {
      const content = fs.readFileSync(
        path.join(CONTENT_DIR, "pages", file),
        "utf-8"
      );
      expect(content.toLowerCase()).not.toContain("lorem ipsum");
    });
  }

  it("impressum.md — no Lorem ipsum", () => {
    const content = fs.readFileSync(
      path.join(CONTENT_DIR, "legal/impressum.md"),
      "utf-8"
    );
    expect(content.toLowerCase()).not.toContain("lorem ipsum");
  });

  it("datenschutz.md — no Lorem ipsum", () => {
    const content = fs.readFileSync(
      path.join(CONTENT_DIR, "legal/datenschutz.md"),
      "utf-8"
    );
    expect(content.toLowerCase()).not.toContain("lorem ipsum");
  });
});

describe("QA: SEO files present", () => {
  it("robots.txt exists and allows indexing", () => {
    const content = fs.readFileSync(
      path.join(PUBLIC_DIR, "robots.txt"),
      "utf-8"
    );
    expect(content).toContain("Allow: /");
    expect(content).not.toContain("Disallow");
  });

  it("sitemap.xml exists", () => {
    expect(fs.existsSync(path.join(PUBLIC_DIR, "sitemap.xml"))).toBe(true);
  });

  it("admin/ CMS files exist", () => {
    expect(
      fs.existsSync(path.join(PUBLIC_DIR, "admin/index.html"))
    ).toBe(true);
    expect(
      fs.existsSync(path.join(PUBLIC_DIR, "admin/config.yml"))
    ).toBe(true);
  });
});

describe("QA: Product counts match expectations", () => {
  it("21 total products", () => {
    expect(getAllProducts()).toHaveLength(21);
  });

  it("4 categories", () => {
    expect(getAllCategories()).toHaveLength(4);
  });

  it("9 options", () => {
    expect(getAllOptions()).toHaveLength(9);
  });

  it("2 blog posts", () => {
    expect(getAllBlogPosts()).toHaveLength(2);
  });

  it("7 page content files", () => {
    const pages = fs
      .readdirSync(path.join(CONTENT_DIR, "pages"))
      .filter((f) => f.endsWith(".json"));
    expect(pages).toHaveLength(7);
  });
});

describe("QA: Error/Loading/404 pages exist", () => {
  const appDir = path.join(SRC_DIR, "app");

  it("error.tsx exists", () => {
    expect(fs.existsSync(path.join(appDir, "error.tsx"))).toBe(true);
  });

  it("loading.tsx exists", () => {
    expect(fs.existsSync(path.join(appDir, "loading.tsx"))).toBe(true);
  });

  it("not-found.tsx exists", () => {
    expect(fs.existsSync(path.join(appDir, "not-found.tsx"))).toBe(true);
  });
});
