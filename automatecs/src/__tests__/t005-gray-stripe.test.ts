import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("T005: No gray stripe between Hero and CategoryGrid", () => {
  const code = fs.readFileSync(
    path.resolve(__dirname, "../components/sections/CategoryGrid.tsx"),
    "utf-8"
  );

  it("CategoryGrid does NOT have any gray-* classes", () => {
    expect(code).not.toMatch(/gray-\d+/);
  });

  it("CategoryGrid uses brand-white background", () => {
    expect(code).toContain("bg-brand-white");
  });
});

describe("T006: LUMA 5-color palette — no gray classes anywhere", () => {
  const srcDir = path.resolve(__dirname, "..");

  function getAllTsxFiles(dir: string): string[] {
    const files: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== "__tests__" && entry.name !== "node_modules") {
        files.push(...getAllTsxFiles(fullPath));
      } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".css")) {
        files.push(fullPath);
      }
    }
    return files;
  }

  it("no gray-* Tailwind classes in any component or CSS", () => {
    const files = getAllTsxFiles(srcDir);
    const violations: string[] = [];
    for (const file of files) {
      const content = fs.readFileSync(file, "utf-8");
      const matches = content.match(/(?:bg|text|border|ring|divide|placeholder)-gray-\d+/g);
      if (matches) {
        violations.push(path.relative(srcDir, file) + ": " + [...new Set(matches)].join(", "));
      }
    }
    expect(violations).toEqual([]);
  });

  it("no old hex values (#1a1a1a, #ffffff) in component files", () => {
    const files = getAllTsxFiles(srcDir);
    const violations: string[] = [];
    for (const file of files) {
      const content = fs.readFileSync(file, "utf-8");
      if (content.includes("#1a1a1a") || content.includes("#ffffff")) {
        violations.push(path.relative(srcDir, file));
      }
    }
    expect(violations).toEqual([]);
  });

  it("globals.css has no gray token definitions", () => {
    const css = fs.readFileSync(path.resolve(srcDir, "app/globals.css"), "utf-8");
    expect(css).not.toMatch(/--color-gray-/);
  });
});
