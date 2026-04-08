import type { Metadata } from "next";
import { ImpressumClient } from "./ImpressumClient";
import { loadLegalDocument } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum — Automatecs Automaten & Service, Salzhausen.",
};

export default function ImpressumPage() {
  const doc = loadLegalDocument("impressum.md");
  return <ImpressumClient doc={doc} />;
}
