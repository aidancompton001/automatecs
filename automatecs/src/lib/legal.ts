import fs from "fs";
import path from "path";

/**
 * Load legal markdown file and split into sections.
 * Returns { title, sections: { heading, content }[] }
 */
export interface LegalSection {
  heading: string;
  content: string;
}

export interface LegalDocument {
  title: string;
  sections: LegalSection[];
}

export function loadLegalDocument(filename: string): LegalDocument {
  const filePath = path.join(process.cwd(), "content", "legal", filename);
  const raw = fs.readFileSync(filePath, "utf-8");

  const lines = raw.split("\n");
  let title = "";
  const sections: LegalSection[] = [];
  let currentHeading = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    // Skip HTML comments
    if (line.trim().startsWith("<!--") || line.trim().startsWith("-->")) continue;
    if (line.trim().startsWith("<!--") && line.trim().endsWith("-->")) continue;

    if (line.startsWith("# ") && !title) {
      title = line.replace("# ", "").trim();
    } else if (line.startsWith("## ") || line.startsWith("### ")) {
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join("\n").trim(),
        });
      }
      currentHeading = line.replace(/^#+\s/, "").trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  // Push last section
  if (currentHeading) {
    sections.push({
      heading: currentHeading,
      content: currentContent.join("\n").trim(),
    });
  }

  return { title, sections };
}
