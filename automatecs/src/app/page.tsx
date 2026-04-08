import { HomeClient } from "./HomeClient";
import { getAllCategories, getMinPriceByCategory } from "@/lib/catalog";
import homeContent from "../../content/pages/home.json";
import type { PageContent } from "@/types";

const content = homeContent as PageContent;

export default function Home() {
  const categories = getAllCategories();
  const minPrices = getMinPriceByCategory();

  return (
    <HomeClient
      content={content}
      categories={categories}
      minPrices={minPrices}
    />
  );
}
