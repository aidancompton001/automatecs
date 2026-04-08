/** Product model (vending machine) */
export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  basePriceCents: number; // e.g. 829000 = 8.290,00 € (configurator start)
  categoryPriceCents: number; // e.g. 619000 = 6.190,00 € (category card display)
  features: string[];
  specs: Specs | null;
  description: string;
  imageUrl: string;
  hasConfigurator: boolean;
  isPlaceholder: boolean; // Landa L2: true for Kalt/Kaffee pending real data from Werner
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
  zip: string;
  city: string;
  phone: string;
  fax: string;
  email: string;
  history: string;
  type: string;
  region: string;
  slogan: string;
  services: string[];
}

/** CMS-managed page content — unified interface (Landa L1) */
export interface PageContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaHref: string;
    sideCallout?: string;
  };
  body: string[];
  sections?: PageSection[];
}

export interface PageSection {
  title: string;
  items: string[];
}
