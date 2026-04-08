import type { Metadata } from "next";
import { Jost, Open_Sans } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { generateOrgJsonLd } from "@/lib/seo";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Automatecs — Ihr Automatendienstleister in Norddeutschland",
    template: "%s | Automatecs",
  },
  description:
    "Vermietung, Verkauf, Vollservice und Beratung: Snackautomaten, Kaffeeautomaten, Kaltgetränkeautomaten und Wasserspender.",
  metadataBase: new URL("https://automatecs.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Automatecs",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = generateOrgJsonLd();

  return (
    <html lang="de" className={`${jost.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-brand-white text-brand-black font-body antialiased">
        {/* Organization JSON-LD — sitewide (Landa L3) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
