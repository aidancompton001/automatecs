import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import type { PageContent, CompanyInfo } from "@/types";
import companyData from "@/data/company.json";
import includedFeatures from "@/data/included-features.json";

// Content directory (relative to project root)
const CONTENT_DIR = path.resolve(__dirname, "../../content");

describe("company.json", () => {
  const company = companyData as CompanyInfo;

  it("has correct phone", () => {
    expect(company.phone).toBe("04172 98 74 700");
  });

  it("has correct email", () => {
    expect(company.email).toBe("info@automatecs.de");
  });

  it("has correct address", () => {
    expect(company.address).toBe("Papenkamp 2");
    expect(company.zip).toBe("21376");
    expect(company.city).toBe("Salzhausen");
  });

  it("has 4 services", () => {
    expect(company.services).toHaveLength(4);
    expect(company.services).toContain("Vermietung");
    expect(company.services).toContain("Vollservice");
  });

  it("has slogan from PDF", () => {
    expect(company.slogan).toContain("Automatendienstleister in Norddeutschland");
  });
});

describe("included-features.json", () => {
  it("has exactly 14 features from PDF", () => {
    expect(includedFeatures).toHaveLength(14);
  });

  it("starts with R290 Kühlung", () => {
    expect(includedFeatures[0]).toContain("R290 Kühlung");
  });

  it("ends with Bedienungsanleitung", () => {
    expect(includedFeatures[13]).toBe("Bedienungsanleitung");
  });

  it("contains LED Beleuchtung", () => {
    expect(includedFeatures.some((f: string) => f.includes("LED Beleuchtung"))).toBe(true);
  });
});

describe("content/pages/ — PageContent structure", () => {
  const pageFiles = [
    "home.json",
    "snackautomaten.json",
    "kaltgetraenkeautomaten.json",
    "kaffeeautomaten.json",
    "wasserspender.json",
    "service.json",
    "unternehmen.json",
  ];

  it("has exactly 7 page files", () => {
    const pagesDir = path.join(CONTENT_DIR, "pages");
    const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".json"));
    expect(files).toHaveLength(7);
  });

  for (const file of pageFiles) {
    describe(file, () => {
      const filePath = path.join(CONTENT_DIR, "pages", file);
      const data: PageContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      it("has hero with headline, subheadline, ctaText, ctaHref", () => {
        expect(data.hero).toBeDefined();
        expect(data.hero.headline).toBeTruthy();
        expect(data.hero.subheadline).toBeTruthy();
        expect(data.hero.ctaText).toBeTruthy();
        expect(data.hero.ctaHref).toBeTruthy();
      });

      it("has non-empty body array", () => {
        expect(Array.isArray(data.body)).toBe(true);
        expect(data.body.length).toBeGreaterThan(0);
      });

      it("headline is German text (not lorem ipsum)", () => {
        expect(data.hero.headline).not.toContain("Lorem");
        expect(data.hero.headline).not.toContain("lorem");
        expect(data.hero.headline.length).toBeGreaterThan(10);
      });

      it("body text is German (not placeholder)", () => {
        for (const paragraph of data.body) {
          expect(paragraph).not.toContain("Lorem ipsum");
          expect(paragraph).not.toContain("TODO");
          expect(paragraph.length).toBeGreaterThan(10);
        }
      });
    });
  }
});

describe("content/pages/service.json — sections", () => {
  const filePath = path.join(CONTENT_DIR, "pages", "service.json");
  const data: PageContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  it("has 2 sections (Vollservice + Vorteile)", () => {
    expect(data.sections).toBeDefined();
    expect(data.sections).toHaveLength(2);
  });

  it("first section is Vollservice with 4 items", () => {
    expect(data.sections![0].title).toContain("Vollservice");
    expect(data.sections![0].items).toHaveLength(4);
  });

  it("second section is Vorteile with 4 items", () => {
    expect(data.sections![1].title).toContain("Vorteile");
    expect(data.sections![1].items).toHaveLength(4);
  });
});

describe("content/legal/ — placeholder files", () => {
  it("impressum.md exists", () => {
    const filePath = path.join(CONTENT_DIR, "legal", "impressum.md");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("datenschutz.md exists", () => {
    const filePath = path.join(CONTENT_DIR, "legal", "datenschutz.md");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("impressum contains TMG §5 and company data", () => {
    const content = fs.readFileSync(
      path.join(CONTENT_DIR, "legal", "impressum.md"),
      "utf-8"
    );
    expect(content).toContain("§ 5 TMG");
    expect(content).toContain("Automatecs");
    expect(content).toContain("04172 98 74 700");
  });

  it("datenschutz contains DSGVO sections", () => {
    const content = fs.readFileSync(
      path.join(CONTENT_DIR, "legal", "datenschutz.md"),
      "utf-8"
    );
    expect(content).toContain("DSGVO");
    expect(content).toContain("Cookies");
    expect(content).toContain("Hosting");
  });
});

describe("content/blog/ — demo post", () => {
  it("willkommen.mdx exists", () => {
    const filePath = path.join(CONTENT_DIR, "blog", "willkommen.mdx");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("contains frontmatter with title and date", () => {
    const content = fs.readFileSync(
      path.join(CONTENT_DIR, "blog", "willkommen.mdx"),
      "utf-8"
    );
    expect(content).toContain("title:");
    expect(content).toContain("date:");
    expect(content).toContain("Automatecs");
  });
});
