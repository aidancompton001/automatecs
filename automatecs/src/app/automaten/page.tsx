import type { Metadata } from "next";
import { AutomatenLandingClient } from "./AutomatenLandingClient";
import { getAllCategories, getMinPriceByCategory } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Automaten-Programm",
  description:
    "Snackautomaten, Kaltgetränkeautomaten, Kaffeeautomaten und Wasserspender — individuell konfiguriert.",
};

export default function AutomatenPage() {
  const categories = getAllCategories();
  const minPrices = getMinPriceByCategory();

  return (
    <AutomatenLandingClient categories={categories} minPrices={minPrices} />
  );
}
