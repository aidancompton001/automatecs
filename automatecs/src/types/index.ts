/** Product model (vending machine) */
export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  basePriceCents: number; // e.g. 829000 = 8.290,00 €
  features: string[];
  specs: Specs | null;
  description: string;
  imageUrl: string;
  hasConfigurator: boolean;
}

/** Product category */
export interface Category {
  slug: CategorySlug;
  name: string;
  headline: string;
  subheadline: string;
  description: string;
  heroImageUrl: string;
}

export type CategorySlug =
  | "snackautomaten"
  | "kaltgetraenkeautomaten"
  | "kaffeeautomaten"
  | "wasserspender";

/** Zusatzoption for price configurator */
export interface Option {
  id: string;
  name: string;
  description: string;
  priceCents: number; // e.g. 52000 = +520,00 €
  category: "payment" | "security" | "equipment";
}

/** Technical specifications */
export interface Specs {
  dimensions: string; // "1830 x 1290 x 900 mm"
  weight: string; // "410 kg"
  selectionsPerTray: string;
  trays: string;
  maxSelections: number;
  control: string;
  tempRange: string;
  maxPower: string;
  climateClass: string;
  voltage: string;
  consumption: string;
}

/** Blog post */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string; // ISO date
  imageUrl: string;
}

/** Company information */
export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  history: string;
  type: string;
  region: string;
  slogan: string;
}
