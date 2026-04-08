import type { Product } from "@/types";
import companyData from "@/data/company.json";

const SITE_URL = "https://automatecs.de";

/**
 * Organization JSON-LD — sitewide (layout.tsx)
 * Schema.org: https://schema.org/Organization
 */
export function generateOrgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyData.name,
    url: SITE_URL,
    telephone: companyData.phone,
    email: companyData.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyData.address,
      postalCode: companyData.zip,
      addressLocality: companyData.city,
      addressCountry: "DE",
    },
    description: companyData.slogan,
    areaServed: {
      "@type": "GeoCircle",
      name: companyData.region,
    },
  };
}

/**
 * Product JSON-LD — per product detail page
 * Schema.org: https://schema.org/Product
 */
export function generateProductJsonLd(product: Product) {
  if (product.basePriceCents === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.imageUrl}`,
    offers: {
      "@type": "Offer",
      price: (product.basePriceCents / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: companyData.name,
      },
    },
  };
}

/**
 * BreadcrumbList JSON-LD — per page
 * Schema.org: https://schema.org/BreadcrumbList
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
