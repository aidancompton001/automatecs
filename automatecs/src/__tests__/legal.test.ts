import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { loadLegalDocument } from "@/lib/legal";

const LEGAL_DIR = path.resolve(__dirname, "../../content/legal");

describe("Legal files exist", () => {
  it("impressum.md exists", () => {
    expect(fs.existsSync(path.join(LEGAL_DIR, "impressum.md"))).toBe(true);
  });

  it("datenschutz.md exists", () => {
    expect(fs.existsSync(path.join(LEGAL_DIR, "datenschutz.md"))).toBe(true);
  });
});

describe("Impressum content — TMG §5", () => {
  const raw = fs.readFileSync(path.join(LEGAL_DIR, "impressum.md"), "utf-8");

  it("contains company name", () => {
    expect(raw).toContain("Automatecs Automaten & Service");
  });

  it("contains address", () => {
    expect(raw).toContain("Papenkamp 2");
    expect(raw).toContain("21376 Salzhausen");
  });

  it("contains phone", () => {
    expect(raw).toContain("04172 98 74 700");
  });

  it("contains email", () => {
    expect(raw).toContain("info@automatecs.de");
  });

  it("contains TMG §5 reference", () => {
    expect(raw).toContain("§ 5 TMG");
  });

  it("contains Haftung für Inhalte", () => {
    expect(raw).toContain("Haftung für Inhalte");
  });

  it("contains Haftung für Links", () => {
    expect(raw).toContain("Haftung für Links");
  });

  it("contains Urheberrecht", () => {
    expect(raw).toContain("Urheberrecht");
  });

  it("contains Streitschlichtung", () => {
    expect(raw).toContain("Streitschlichtung");
  });

  it("does NOT contain Lorem ipsum", () => {
    expect(raw).not.toContain("Lorem ipsum");
  });
});

describe("Datenschutz content — DSGVO", () => {
  const raw = fs.readFileSync(path.join(LEGAL_DIR, "datenschutz.md"), "utf-8");

  it("contains company name", () => {
    expect(raw).toContain("Automatecs Automaten & Service");
  });

  it("contains Hosting section (Landa L2)", () => {
    expect(raw).toContain("GitHub Pages");
    expect(raw).toContain("Hosting");
  });

  it("contains Cookies section", () => {
    expect(raw).toContain("Cookies");
    expect(raw).toContain("technisch notwendige Cookies");
  });

  it("confirms NO tracking cookies", () => {
    expect(raw).toContain("keine");
    expect(raw).toContain("Tracking");
  });

  it("mentions cookie consent key", () => {
    expect(raw).toContain("automatecs-cookie-consent");
  });

  it("contains Kontaktformular section", () => {
    expect(raw).toContain("Kontaktformular");
    expect(raw).toContain("mailto");
  });

  it("contains Betroffenenrechte DSGVO Art. 15-21 (Landa L2)", () => {
    expect(raw).toContain("Art. 15");
    expect(raw).toContain("Art. 16");
    expect(raw).toContain("Art. 17");
    expect(raw).toContain("Art. 18");
    expect(raw).toContain("Art. 20");
    expect(raw).toContain("Art. 21");
  });

  it("contains Aufsichtsbehörde (Niedersachsen)", () => {
    expect(raw).toContain("Niedersachsen");
    expect(raw).toContain("Aufsichtsbehörde");
  });

  it("contains SSL section", () => {
    expect(raw).toContain("SSL");
  });

  it("does NOT contain Lorem ipsum", () => {
    expect(raw).not.toContain("Lorem ipsum");
  });
});

describe("loadLegalDocument parser", () => {
  it("parses impressum.md correctly", () => {
    const doc = loadLegalDocument("impressum.md");
    expect(doc.title).toBe("Impressum");
    expect(doc.sections.length).toBeGreaterThan(3);
  });

  it("parses datenschutz.md correctly", () => {
    const doc = loadLegalDocument("datenschutz.md");
    expect(doc.title).toBe("Datenschutzerklärung");
    expect(doc.sections.length).toBeGreaterThan(5);
  });

  it("impressum sections include TMG §5", () => {
    const doc = loadLegalDocument("impressum.md");
    const headings = doc.sections.map((s) => s.heading);
    expect(headings.some((h) => h.includes("§ 5 TMG"))).toBe(true);
  });

  it("datenschutz sections include Hosting", () => {
    const doc = loadLegalDocument("datenschutz.md");
    const headings = doc.sections.map((s) => s.heading);
    expect(headings.some((h) => h.includes("Hosting"))).toBe(true);
  });

  it("datenschutz sections include Cookies", () => {
    const doc = loadLegalDocument("datenschutz.md");
    const headings = doc.sections.map((s) => s.heading);
    expect(headings.some((h) => h.includes("Cookies"))).toBe(true);
  });
});

describe("Legal page routes exist", () => {
  const ROOT = path.resolve(__dirname, "../..");

  it("impressum/page.tsx exists", () => {
    expect(fs.existsSync(path.join(ROOT, "src/app/impressum/page.tsx"))).toBe(true);
  });

  it("datenschutz/page.tsx exists", () => {
    expect(fs.existsSync(path.join(ROOT, "src/app/datenschutz/page.tsx"))).toBe(true);
  });
});
