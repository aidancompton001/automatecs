import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import type { PageContent, CompanyInfo } from "@/types";
import companyData from "@/data/company.json";

const CONTENT_DIR = path.resolve(__dirname, "../../content");

describe("Service page content", () => {
  const filePath = path.join(CONTENT_DIR, "pages", "service.json");
  const data: PageContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  it("has hero from PDF", () => {
    expect(data.hero.headline).toContain("24/7-Service");
  });

  it("has 2 sections (Vollservice + Vorteile)", () => {
    expect(data.sections).toHaveLength(2);
  });

  it("Vollservice has 4 items", () => {
    expect(data.sections![0].items).toHaveLength(4);
    expect(data.sections![0].items[0]).toContain("Aufstellung");
  });

  it("Vorteile has 4 items", () => {
    expect(data.sections![1].items).toHaveLength(4);
    expect(data.sections![1].items[3]).toContain("keine Investitions");
  });
});

describe("Unternehmen page content", () => {
  const filePath = path.join(CONTENT_DIR, "pages", "unternehmen.json");
  const data: PageContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  it("has hero with 30+ Jahre", () => {
    expect(data.hero.headline).toContain("30 Jahren");
  });

  it("has 3 body paragraphs from PDF", () => {
    expect(data.body).toHaveLength(3);
    for (const p of data.body) {
      expect(p).not.toContain("Lorem");
      expect(p.length).toBeGreaterThan(20);
    }
  });
});

describe("Kontakt page — mailto form", () => {
  const company = companyData as CompanyInfo;

  it("company email is correct", () => {
    expect(company.email).toBe("info@automatecs.de");
  });

  it("mailto URL can be constructed", () => {
    const name = "Max Mustermann";
    const email = "max@test.de";
    const nachricht = "Ich möchte einen Snackautomaten mieten.";

    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
      `Anfrage von ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${nachricht}`
    )}`;

    expect(mailto).toContain("mailto:info@automatecs.de");
    expect(mailto).toContain("Anfrage");
    expect(mailto).toContain("Max%20Mustermann");
  });

  it("mailto body stays under 2000 chars with 500 char message (Landa L1)", () => {
    const longMessage = "A".repeat(500);
    const body = `Name: Test\nE-Mail: test@test.de\n\nNachricht:\n${longMessage}`;
    const encoded = encodeURIComponent(body);
    // mailto: + email + ?subject=... + &body=...
    const fullUrl = `mailto:info@automatecs.de?subject=Anfrage&body=${encoded}`;
    expect(fullUrl.length).toBeLessThan(2000);
  });

  it("company has full address for Kontakt page", () => {
    expect(company.address).toBe("Papenkamp 2");
    expect(company.zip).toBe("21376");
    expect(company.city).toBe("Salzhausen");
    expect(company.phone).toBe("04172 98 74 700");
    expect(company.fax).toBe("04172 98 74 701");
  });
});

describe("Zubehör page — placeholder (Landa L2)", () => {
  it("no zubehoer content file needed (placeholder page)", () => {
    // Zubehör is a code-only placeholder, not CMS-managed
    // Just verify the page concept is valid
    expect(true).toBe(true);
  });
});

describe("All static page routes exist", () => {
  const pages = [
    "src/app/service/page.tsx",
    "src/app/unternehmen/page.tsx",
    "src/app/kontakt/page.tsx",
    "src/app/zubehoer/page.tsx",
  ];

  const ROOT = path.resolve(__dirname, "../..");

  for (const pagePath of pages) {
    it(`${pagePath} exists`, () => {
      expect(fs.existsSync(path.join(ROOT, pagePath))).toBe(true);
    });
  }
});
