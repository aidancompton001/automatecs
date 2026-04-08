import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/catalog";
import { getProductsByCategory } from "@/lib/catalog";
import content from "../../../../content/pages/snackautomaten.json";
import type { PageContent } from "@/types";

export const metadata: Metadata = {
  title: "Snackautomaten",
  description:
    "Snackautomaten für Büro, Wartebereich, Schule oder Fitnessstudio. Grundversion ab 6.190 €.",
};

export default function SnackautomatenPage() {
  const products = getProductsByCategory("snackautomaten");

  return (
    <CategoryPageLayout
      content={content as PageContent}
      products={products}
      
    />
  );
}
