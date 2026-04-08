import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/catalog";
import { getProductsByCategory } from "@/lib/catalog";
import content from "../../../../content/pages/kaltgetraenkeautomaten.json";
import type { PageContent } from "@/types";

export const metadata: Metadata = {
  title: "Kaltgetränkeautomaten",
  description:
    "Kaltgetränkeautomaten in größtmöglicher Produkt- und Einstellungsflexibilität. Ab 6.190 €.",
};

export default function KaltgetraenkeautomatenPage() {
  const products = getProductsByCategory("kaltgetraenkeautomaten");

  return (
    <CategoryPageLayout
      content={content as PageContent}
      products={products}
      
    />
  );
}
