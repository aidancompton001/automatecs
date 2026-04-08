import type { Metadata } from "next";
import { UnternehmenClient } from "./UnternehmenClient";
import content from "../../../content/pages/unternehmen.json";
import companyData from "@/data/company.json";
import type { PageContent, CompanyInfo } from "@/types";

export const metadata: Metadata = {
  title: "Unternehmen",
  description:
    "Seit mehr als 30 Jahren: Automatecs — Ihr kompetenter Partner für Verkaufsautomaten in Norddeutschland.",
};

export default function UnternehmenPage() {
  return (
    <UnternehmenClient
      content={content as PageContent}
      company={companyData as CompanyInfo}
    />
  );
}
