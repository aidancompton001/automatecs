import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/catalog";
import { getProductBySlug, getAllProducts } from "@/lib/catalog";
import { getAllOptions } from "@/lib/calculator";
import { formatCentsToEUR } from "@/lib/formatPrice";
import includedFeatures from "../../../../src/data/included-features.json";

interface Props {
  params: Promise<{ slug: string }>;
}

// SSG: generate all 21 product pages at build time
export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

// Dynamic metadata per product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produkt nicht gefunden" };

  const priceText = product.basePriceCents > 0
    ? ` ab ${formatCentsToEUR(product.basePriceCents)}`
    : "";

  return {
    title: product.name,
    description: `${product.name}${priceText}. ${product.features.join(", ")}.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

// JSON-LD Product schema (Landa L3)
function generateProductJsonLd(product: ReturnType<typeof getProductBySlug>) {
  if (!product || product.basePriceCents === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: {
      "@type": "Offer",
      price: (product.basePriceCents / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Automatecs Automaten & Service",
      },
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const options = getAllOptions();
  const jsonLd = generateProductJsonLd(product);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetail
        product={product}
        options={options}
        includedFeatures={includedFeatures}
      />
    </>
  );
}
