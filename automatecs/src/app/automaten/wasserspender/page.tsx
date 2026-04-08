import type { Metadata } from "next";
import { CategoryPageLayout } from "@/components/catalog";
import { getProductsByCategory } from "@/lib/catalog";
import content from "../../../../content/pages/wasserspender.json";
import type { PageContent } from "@/types";

export const metadata: Metadata = {
  title: "Wasserspender",
  description:
    "Wasserspender für Wasser das lange frisch bleibt. sempreAqua Produktlinie.",
};

export default function WasserspenderPage() {
  const products = getProductsByCategory("wasserspender");

  return (
    <CategoryPageLayout
      content={content as PageContent}
      products={products}
      backgroundImage="/images/hero-wasser.jpg"
    />
  );
}
