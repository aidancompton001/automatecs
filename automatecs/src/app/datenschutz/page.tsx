import type { Metadata } from "next";
import { DatenschutzClient } from "./DatenschutzClient";
import { loadLegalDocument } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung — Automatecs Automaten & Service. DSGVO-konform.",
};

export default function DatenschutzPage() {
  const doc = loadLegalDocument("datenschutz.md");
  return <DatenschutzClient doc={doc} />;
}
