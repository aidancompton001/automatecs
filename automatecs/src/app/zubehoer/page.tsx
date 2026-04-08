import type { Metadata } from "next";
import { ZubehoerClient } from "./ZubehoerClient";

export const metadata: Metadata = {
  title: "Zubehör",
  description:
    "Zubehör für Verkaufsautomaten. Kontaktieren Sie uns für weitere Informationen.",
};

export default function ZubehoerPage() {
  return <ZubehoerClient />;
}
