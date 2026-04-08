import type { Product, Category, CategorySlug } from "@/types";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

const products = productsData as Product[];
const categories = categoriesData as Category[];

export function getAllCategories(): Category[] {
  return categories;
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

/**
 * Get minimum categoryPriceCents per category.
 * Used for "ab X €" display in CategoryGrid (Landa L2).
 */
export function getMinPriceByCategory(): Record<string, number> {
  const result: Record<string, number> = {};

  for (const cat of categories) {
    const catProducts = products.filter((p) => p.category === cat.slug);
    const prices = catProducts
      .map((p) => p.categoryPriceCents)
      .filter((p) => p > 0);

    result[cat.slug] = prices.length > 0 ? Math.min(...prices) : 0;
  }

  return result;
}
