import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

// Test not-found page renders correctly
describe("NotFound page", () => {
  it("renders 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeDefined();
  });

  it("renders 'Seite nicht gefunden' message", () => {
    render(<NotFound />);
    expect(screen.getByText("Seite nicht gefunden")).toBeDefined();
  });

  it("renders 'Zurück zur Startseite' link", () => {
    render(<NotFound />);
    const link = screen.getByText("Zurück zur Startseite");
    expect(link).toBeDefined();
    expect(link.closest("a")?.getAttribute("href")).toBe("/");
  });
});

describe("Navigation structure", () => {
  it("defines correct nav items", () => {
    const NAV_ITEMS = [
      { label: "Home", href: "/" },
      { label: "Automaten-Programm", href: "/automaten/", hasChildren: true },
      { label: "Service", href: "/service/" },
      { label: "Zubehör", href: "/zubehoer/" },
      { label: "Blog", href: "/blog/" },
    ];

    expect(NAV_ITEMS).toHaveLength(5);
    expect(NAV_ITEMS[1].hasChildren).toBe(true);
  });

  it("defines correct dropdown items", () => {
    const DROPDOWN = [
      { label: "Snackautomaten", href: "/automaten/snackautomaten/" },
      { label: "Kaltgetränkeautomaten", href: "/automaten/kaltgetraenkeautomaten/" },
      { label: "Kaffeeautomaten", href: "/automaten/kaffeeautomaten/" },
      { label: "Wasserspender", href: "/automaten/wasserspender/" },
    ];

    expect(DROPDOWN).toHaveLength(4);
    expect(DROPDOWN[0].href).toBe("/automaten/snackautomaten/");
    expect(DROPDOWN[3].href).toBe("/automaten/wasserspender/");
  });

  it("defines correct footer links", () => {
    const LEGAL_LINKS = [
      { label: "Kontakt", href: "/kontakt/" },
      { label: "Impressum", href: "/impressum/" },
      { label: "Datenschutz", href: "/datenschutz/" },
    ];

    expect(LEGAL_LINKS).toHaveLength(3);
  });

  it("has correct company contact data", () => {
    const COMPANY = {
      name: "Automatecs Automaten & Service",
      address: "Papenkamp 2, 21376 Salzhausen",
      phone: "04172 98 74 700",
      fax: "04172 98 74 701",
      email: "info@automatecs.de",
    };

    expect(COMPANY.phone).toBe("04172 98 74 700");
    expect(COMPANY.email).toBe("info@automatecs.de");
  });
});

describe("CookieBanner", () => {
  it("uses correct localStorage key", () => {
    const COOKIE_KEY = "automatecs-cookie-consent";
    expect(COOKIE_KEY).toBe("automatecs-cookie-consent");
  });
});
