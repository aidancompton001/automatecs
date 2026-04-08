import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/catalog";
import { getProductsByCategory } from "@/lib/catalog";
import content from "../../../../content/pages/kaffeeautomaten.json";
import type { PageContent } from "@/types";

export const metadata: Metadata = {
  title: "Kaffeeautomaten",
  description:
    "Kaffeeautomaten ganz nach Ihren Wünschen. Frischer Kaffee auf Knopfdruck. Ab 6.190 €.",
};

export default function KaffeeautomatenPage() {
  const products = getProductsByCategory("kaffeeautomaten");

  return (
    <CategoryPageLayout
      content={content as PageContent}
      products={products}
      backgroundImage="/images/hero-kaffee.jpg"
    />
  );
}
