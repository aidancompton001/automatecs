import type { Metadata } from "next";
import { ServiceClient } from "./ServiceClient";
import content from "../../../content/pages/service.json";
import type { PageContent } from "@/types";

export const metadata: Metadata = {
  title: "Service",
  description:
    "24/7-Service für Vendingautomaten. Full-Service: Befüllung, Reinigung, Wartung, 24h Reparatur.",
};

export default function ServicePage() {
  return <ServiceClient content={content as PageContent} />;
}
