import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${poppins.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-brand-white text-brand-black font-body antialiased">
        {children}
      </body>
    </html>
  );
}
