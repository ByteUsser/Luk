import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się w sprawie sesji portretowej, lifestyle lub plenerowej.",
  alternates: {
    canonical: "/kontakt"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/kontakt`,
    title: `Kontakt | ${SITE_CONFIG.name}`,
    description: "Napisz i umów sesję fotograficzną.",
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
    description: "Napisz i umów sesję fotograficzną.",
    images: [SITE_CONFIG.ogImage]
  }
};

export default function ContactPage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="pt-20 md:pt-24">
        <Contact headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
