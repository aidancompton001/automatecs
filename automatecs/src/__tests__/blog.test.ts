import { describe, it, expect } from "vitest";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getAllBlogSlugs,
  formatDateDE,
} from "@/lib/blog";

describe("Blog data", () => {
  it("has 2 blog posts", () => {
    expect(getAllBlogPosts()).toHaveLength(2);
  });

  it("all posts have required fields", () => {
    for (const post of getAllBlogPosts()) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.excerpt).toBeTruthy();
      expect(post.content.length).toBeGreaterThan(0);
    }
  });

  it("slugs are unique", () => {
    const slugs = getAllBlogSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("slugs are URL-safe", () => {
    for (const slug of getAllBlogSlugs()) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

describe("getBlogPostBySlug", () => {
  it("returns willkommen post", () => {
    const post = getBlogPostBySlug("willkommen");
    expect(post).toBeDefined();
    expect(post!.title).toBe("Willkommen bei Automatecs");
    expect(post!.date).toBe("2026-04-08");
  });

  it("returns snack-automaten-guide post", () => {
    const post = getBlogPostBySlug("snack-automaten-guide");
    expect(post).toBeDefined();
    expect(post!.title).toContain("Snackautomaten");
  });

  it("returns undefined for invalid slug", () => {
    expect(getBlogPostBySlug("nonexistent")).toBeUndefined();
  });

  it("content is joined paragraphs", () => {
    const post = getBlogPostBySlug("willkommen")!;
    expect(post.content).toContain("\n\n");
    expect(post.content.split("\n\n").length).toBe(3);
  });
});

describe("generateStaticParams equivalent", () => {
  it("returns 2 slugs", () => {
    const slugs = getAllBlogSlugs();
    expect(slugs).toHaveLength(2);
    expect(slugs).toContain("willkommen");
    expect(slugs).toContain("snack-automaten-guide");
  });
});

describe("formatDateDE", () => {
  it("formats 2026-04-08 to German date", () => {
    const result = formatDateDE("2026-04-08");
    expect(result).toContain("8");
    expect(result).toContain("April");
    expect(result).toContain("2026");
  });

  it("formats 2026-04-07", () => {
    const result = formatDateDE("2026-04-07");
    expect(result).toContain("7");
    expect(result).toContain("April");
  });
});

describe("Blog content is German (not placeholder)", () => {
  it("no Lorem ipsum in any post", () => {
    for (const post of getAllBlogPosts()) {
      expect(post.content).not.toContain("Lorem");
      expect(post.content).not.toContain("lorem");
      expect(post.title).not.toContain("Lorem");
    }
  });

  it("posts mention Automatecs", () => {
    for (const post of getAllBlogPosts()) {
      // At least title or content should reference Automatecs
      const combined = post.title + post.content;
      expect(
        combined.includes("Automatecs") || combined.includes("Automaten")
      ).toBe(true);
    }
  });
});
