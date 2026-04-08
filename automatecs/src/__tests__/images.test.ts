import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getAllProducts } from "@/lib/catalog";
import { getAllBlogPosts } from "@/lib/blog";
import { getImageUrl } from "@/lib/assets";

const PUBLIC = path.resolve(__dirname, "../../public");

describe("T004: All product images exist", () => {
  const products = getAllProducts();

  for (const p of products) {
    it(`${p.slug} → ${p.imageUrl} exists`, () => {
      const filePath = path.join(PUBLIC, p.imageUrl);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  }

  it("total: 21 product image files", () => {
    const dir = path.join(PUBLIC, "images/products");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".jpg"));
    expect(files.length).toBe(21);
  });
});

describe("T004: All blog images exist", () => {
  const posts = getAllBlogPosts();

  for (const p of posts) {
    it(`${p.slug} → ${p.imageUrl} exists`, () => {
      const filePath = path.join(PUBLIC, p.imageUrl);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  }
});

describe("T004: getImageUrl adds basePath", () => {
  it("prepends /automatecs to relative path", () => {
    expect(getImageUrl("/images/products/test.jpg")).toBe(
      "/automatecs/images/products/test.jpg"
    );
  });

  it("does not double-prepend", () => {
    expect(getImageUrl("/automatecs/images/test.jpg")).toBe(
      "/automatecs/images/test.jpg"
    );
  });

  it("does not modify absolute URLs", () => {
    expect(getImageUrl("https://example.com/img.jpg")).toBe(
      "https://example.com/img.jpg"
    );
  });
});

describe("T004: No layout shift — fixed aspect ratios in components", () => {
  it("ProductCard uses aspect-[3/4] (fixed)", () => {
    const code = fs.readFileSync(
      path.join(__dirname, "../components/catalog/ProductCard.tsx"),
      "utf-8"
    );
    expect(code).toContain("aspect-[3/4]");
    expect(code).not.toContain("h-48"); // removed fixed height
  });

  it("BlogCard uses aspect-video (fixed)", () => {
    const code = fs.readFileSync(
      path.join(__dirname, "../components/blog/BlogCard.tsx"),
      "utf-8"
    );
    expect(code).toContain("aspect-video");
    expect(code).not.toContain("h-48");
  });

  it("ParallaxHero uses min-h-[60vh] (stable)", () => {
    const code = fs.readFileSync(
      path.join(__dirname, "../components/motion/ParallaxHero.tsx"),
      "utf-8"
    );
    expect(code).toContain("min-h-[60vh]");
  });

  it("All image containers use bg-cover bg-center", () => {
    const productCard = fs.readFileSync(
      path.join(__dirname, "../components/catalog/ProductCard.tsx"),
      "utf-8"
    );
    expect(productCard).toContain("bg-cover");
    expect(productCard).toContain("bg-center");
  });
});

describe("T004: No AdobeStock watermark images used", () => {
  it("no stock images in products/ directory", () => {
    // AdobeStock images have specific filenames from PDF extraction
    // Our product images are copies of clean automat photos
    const dir = path.join(PUBLIC, "images/products");
    const files = fs.readdirSync(dir);
    for (const f of files) {
      expect(f).not.toContain("AdobeStock");
      expect(f).not.toContain("Preview");
    }
  });
});
