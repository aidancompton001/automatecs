import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.resolve(__dirname, "../../public");
const DOCS_DIR = path.resolve(__dirname, "../../../docs");

describe("Decap CMS admin files", () => {
  it("admin/index.html exists", () => {
    expect(
      fs.existsSync(path.join(PUBLIC_DIR, "admin", "index.html"))
    ).toBe(true);
  });

  it("admin/config.yml exists", () => {
    expect(
      fs.existsSync(path.join(PUBLIC_DIR, "admin", "config.yml"))
    ).toBe(true);
  });

  it("index.html loads Decap CMS", () => {
    const html = fs.readFileSync(
      path.join(PUBLIC_DIR, "admin", "index.html"),
      "utf-8"
    );
    expect(html).toContain("decap-cms");
    expect(html).toContain("noindex");
  });
});

describe("Decap CMS config.yml", () => {
  const config = fs.readFileSync(
    path.join(PUBLIC_DIR, "admin", "config.yml"),
    "utf-8"
  );

  it("has GitHub backend", () => {
    expect(config).toContain("name: github");
  });

  it("has repo placeholder (Landa L1)", () => {
    expect(config).toContain("repo:");
  });

  it("has editorial_workflow", () => {
    expect(config).toContain("editorial_workflow");
  });

  it("has media_folder pointing to public/images", () => {
    expect(config).toContain('media_folder: "public/images"');
  });

  it("has locale de", () => {
    expect(config).toContain('locale: "de"');
  });

  it("has pages collection", () => {
    expect(config).toContain('name: "pages"');
    expect(config).toContain('label: "Seiten"');
  });

  it("has all 7 page files", () => {
    expect(config).toContain("content/pages/home.json");
    expect(config).toContain("content/pages/snackautomaten.json");
    expect(config).toContain("content/pages/kaltgetraenkeautomaten.json");
    expect(config).toContain("content/pages/kaffeeautomaten.json");
    expect(config).toContain("content/pages/wasserspender.json");
    expect(config).toContain("content/pages/service.json");
    expect(config).toContain("content/pages/unternehmen.json");
  });

  it("has blog collection", () => {
    expect(config).toContain('name: "blog"');
    expect(config).toContain("blog-posts.json");
  });

  it("has legal collection", () => {
    expect(config).toContain('name: "legal"');
    expect(config).toContain("impressum.md");
    expect(config).toContain("datenschutz.md");
  });

  it("does NOT reference products.json (dev-only, C4 fix)", () => {
    expect(config).not.toContain("products.json");
    expect(config).not.toContain("options.json");
    expect(config).not.toContain("categories.json");
  });
});

describe("CMS Guide documentation (Landa L2)", () => {
  it("CMS_GUIDE.md exists", () => {
    expect(fs.existsSync(path.join(DOCS_DIR, "CMS_GUIDE.md"))).toBe(true);
  });

  it("is in German", () => {
    const content = fs.readFileSync(
      path.join(DOCS_DIR, "CMS_GUIDE.md"),
      "utf-8"
    );
    expect(content).toContain("Anleitung");
    expect(content).toContain("Speichern");
  });

  it("covers main use cases", () => {
    const content = fs.readFileSync(
      path.join(DOCS_DIR, "CMS_GUIDE.md"),
      "utf-8"
    );
    expect(content).toContain("Startseite");
    expect(content).toContain("Blog");
    expect(content).toContain("Impressum");
    expect(content).toContain("Bild");
  });
});
