import type { Metadata } from "next";
import { KontaktClient } from "./KontaktClient";
import companyData from "@/data/company.json";
import type { CompanyInfo } from "@/types";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Automatecs. Telefon: 04172 98 74 700, E-Mail: info@automatecs.de",
};

export default function KontaktPage() {
  return <KontaktClient company={companyData as CompanyInfo} />;
}
