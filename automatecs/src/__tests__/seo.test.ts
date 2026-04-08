import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  generateOrgJsonLd,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import { getProductBySlug, getAllProducts } from "@/lib/catalog";

const PUBLIC_DIR = path.resolve(__dirname, "../../public");

// ============================================================
// seo.ts — JSON-LD Generators
// ============================================================

describe("generateOrgJsonLd", () => {
  const org = generateOrgJsonLd();

  it("has @context schema.org", () => {
    expect(org["@context"]).toBe("https://schema.org");
  });

  it("has @type Organization", () => {
    expect(org["@type"]).toBe("Organization");
  });

  it("has correct company name", () => {
    expect(org.name).toBe("Automatecs Automaten & Service");
  });

  it("has correct phone", () => {
    expect(org.telephone).toBe("04172 98 74 700");
  });

  it("has correct email", () => {
    expect(org.email).toBe("info@automatecs.de");
  });

  it("has address with PostalAddress type", () => {
    expect(org.address["@type"]).toBe("PostalAddress");
    expect(org.address.postalCode).toBe("21376");
    expect(org.address.addressCountry).toBe("DE");
  });

  it("has url", () => {
    expect(org.url).toBe("https://automatecs.de");
  });
});

describe("generateProductJsonLd", () => {
  it("generates valid Product schema for Design XII", () => {
    const product = getProductBySlug("g-snack-design-xii")!;
    const jsonLd = generateProductJsonLd(product);

    expect(jsonLd).not.toBeNull();
    expect(jsonLd!["@context"]).toBe("https://schema.org");
    expect(jsonLd!["@type"]).toBe("Product");
    expect(jsonLd!.name).toBe("Sanden Vendo G Snack Design XII");
    expect(jsonLd!.offers["@type"]).toBe("Offer");
    expect(jsonLd!.offers.price).toBe("8290.00");
    expect(jsonLd!.offers.priceCurrency).toBe("EUR");
    expect(jsonLd!.offers.availability).toBe("https://schema.org/InStock");
  });

  it("returns null for products with price 0 (Wasserspender)", () => {
    const product = getProductBySlug("sempreaqua-ps-20")!;
    const jsonLd = generateProductJsonLd(product);
    expect(jsonLd).toBeNull();
  });

  it("all products with price > 0 generate valid schema", () => {
    const products = getAllProducts().filter((p) => p.basePriceCents > 0);
    expect(products.length).toBeGreaterThan(0);

    for (const p of products) {
      const jsonLd = generateProductJsonLd(p);
      expect(jsonLd).not.toBeNull();
      expect(jsonLd!["@type"]).toBe("Product");
      expect(parseFloat(jsonLd!.offers.price)).toBeGreaterThan(0);
    }
  });
});

describe("generateBreadcrumbJsonLd", () => {
  it("generates valid BreadcrumbList", () => {
    const breadcrumbs = generateBreadcrumbJsonLd([
      { name: "Home", href: "/" },
      { name: "Automaten", href: "/automaten/" },
      { name: "Snackautomaten", href: "/automaten/snackautomaten/" },
    ]);

    expect(breadcrumbs["@context"]).toBe("https://schema.org");
    expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbs.itemListElement).toHaveLength(3);
    expect(breadcrumbs.itemListElement[0].position).toBe(1);
    expect(breadcrumbs.itemListElement[0].name).toBe("Home");
    expect(breadcrumbs.itemListElement[2].position).toBe(3);
  });

  it("includes full URL with domain", () => {
    const breadcrumbs = generateBreadcrumbJsonLd([
      { name: "Home", href: "/" },
    ]);
    expect(breadcrumbs.itemListElement[0].item).toBe("https://automatecs.de/");
  });
});

// ============================================================
// robots.txt
// ============================================================

describe("robots.txt", () => {
  const content = fs.readFileSync(
    path.join(PUBLIC_DIR, "robots.txt"),
    "utf-8"
  );

  it("exists", () => {
    expect(content.length).toBeGreaterThan(0);
  });

  it("allows all crawlers", () => {
    expect(content).toContain("User-agent: *");
    expect(content).toContain("Allow: /");
  });

  it("does NOT contain noindex or Disallow", () => {
    expect(content).not.toContain("noindex");
    expect(content).not.toContain("Disallow");
  });

  it("contains Sitemap directive", () => {
    expect(content).toContain("Sitemap:");
    expect(content).toContain("sitemap.xml");
  });
});

// ============================================================
// sitemap.xml
// ============================================================

describe("sitemap.xml", () => {
  const content = fs.readFileSync(
    path.join(PUBLIC_DIR, "sitemap.xml"),
    "utf-8"
  );

  it("exists and is valid XML", () => {
    expect(content).toContain('<?xml version="1.0"');
    expect(content).toContain("<urlset");
    expect(content).toContain("</urlset>");
  });

  it("contains homepage", () => {
    expect(content).toContain("https://automatecs.de/");
  });

  it("contains all main pages", () => {
    const mainPages = [
      "/automaten/",
      "/service/",
      "/unternehmen/",
      "/kontakt/",
      "/zubehoer/",
      "/blog/",
      "/impressum/",
      "/datenschutz/",
    ];
    for (const page of mainPages) {
      expect(content).toContain(page);
    }
  });

  it("contains all 4 category pages", () => {
    expect(content).toContain("/automaten/snackautomaten/");
    expect(content).toContain("/automaten/kaltgetraenkeautomaten/");
    expect(content).toContain("/automaten/kaffeeautomaten/");
    expect(content).toContain("/automaten/wasserspender/");
  });

  it("contains product slugs", () => {
    expect(content).toContain("/automaten/g-snack-design-xii/");
    expect(content).toContain("/automaten/sempreaqua-ps-20/");
  });

  it("contains blog posts", () => {
    expect(content).toContain("/blog/willkommen/");
    expect(content).toContain("/blog/snack-automaten-guide/");
  });

  it("contains update comment (Landa L2)", () => {
    expect(content).toContain("UPDATE THIS FILE");
  });

  it("has priority values", () => {
    expect(content).toContain("<priority>1.0</priority>");
    expect(content).toContain("<priority>0.8</priority>");
  });
});
