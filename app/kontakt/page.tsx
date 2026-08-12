import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PublicPageShell } from "@/components/PublicPageShell";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Zapytaj o termin sesji portretowej, zdjęć dla pary, rodzinnej uroczystości lub reportażu w Bochni i okolicy.",
  alternates: {
    canonical: "/kontakt"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/kontakt`,
    title: `Kontakt | ${SITE_CONFIG.name}`,
    description: "Napisz, co chcesz zrobić. Odpiszę z terminem, pytaniami i kolejnym krokiem.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Kontakt | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Kontakt | ${SITE_CONFIG.name}`,
    description: "Napisz w sprawie zdjęć i ustalimy kolejny krok.",
    images: [SITE_CONFIG.ogImage]
  }
};

export default function ContactPage() {
  return (
    <PublicPageShell>
      <main className="pt-20 md:pt-24">
        <Contact headingLevel="h1" allowQueryPrefill />
      </main>
    </PublicPageShell>
  );
}
