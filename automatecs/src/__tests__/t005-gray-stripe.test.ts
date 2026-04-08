import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("T005: No gray stripe between Hero and CategoryGrid", () => {
  const code = fs.readFileSync(
    path.resolve(__dirname, "../components/sections/CategoryGrid.tsx"),
    "utf-8"
  );

  it("CategoryGrid does NOT have bg-gray-50 (causes gray stripe under dark hero)", () => {
    // bg-gray-50 on CategoryGrid created a visible gray band
    // between dark hero gradient and content
    expect(code).not.toContain("bg-gray-50");
  });

  it("CategoryGrid uses bg-brand-white (clean transition from hero)", () => {
    expect(code).toContain("bg-brand-white");
  });
});
