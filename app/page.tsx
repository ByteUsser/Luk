import type { Metadata } from "next";
import { About } from "@/components/About";
import { Areas } from "@/components/Areas";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery, type GalleryItem } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { OptionalCursor } from "@/components/OptionalCursor";
import { Services } from "@/components/Services";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

const galleryItems: GalleryItem[] = [
  { title: "Nadmorski kadr", category: "Podróże", publicId: "/portfolio/gallery-01-opt.jpg" },
  { title: "Linie architektury", category: "Miejski", publicId: "/portfolio/gallery-02-opt.jpg" },
  { title: "Odbicie chwili", category: "Detal", publicId: "/portfolio/gallery-03-opt.jpg" },
  {
    title: "Kolory wydarzeń",
    category: "Event",
    publicId: "/portfolio/gallery-04-opt.jpg",
    fit: "contain",
    cardClassName: "md:min-w-[520px]"
  },
  { title: "Nocna karoseria", category: "Motoryzacja", publicId: "/portfolio/gallery-05-opt.jpg" },
  { title: "Czerwone wskazówki", category: "Motoryzacja", publicId: "/portfolio/gallery-06-opt.jpg" }
];

const serviceItems = [
  {
    title: "Motoryzacja",
    description: "Kadry samochodowe z klimatem: detale, refleksy i mocne światło nocne.",
    publicId: "/portfolio/gallery-05-opt.jpg"
  },
  {
    title: "Podróże",
    description: "Reportażowe ujęcia miejsc i przestrzeni z filmową, ciepłą kolorystyką.",
    publicId: "/portfolio/gallery-01-opt.jpg"
  },
  {
    title: "Event",
    description: "Fotografie wydarzeń i detali, które budują opowieść o całej atmosferze.",
    publicId: "/portfolio/gallery-04-opt.jpg"
  }
];

export default function HomePage() {
  const photographerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Photographer",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}/logo-black.svg`,
      width: 2200,
      height: 650
    },
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.city,
      addressCountry: "PL"
    },
    alternateName: ["JaniczekFoto", SITE_CONFIG.domain],
    areaServed: SITE_CONFIG.primaryAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name
    })),
    sameAs: [SITE_CONFIG.social.instagram, SITE_CONFIG.social.facebook]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    alternateName: ["JaniczekFoto", SITE_CONFIG.domain],
    url: SITE_CONFIG.url
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD for rich results and business entity understanding.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photographerJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <OptionalCursor />
      <Nav />
      <main>
        <Hero imagePublicId="/portfolio/hero-opt.jpg" />
        <Gallery items={galleryItems} />
        <About publicId="/portfolio/about-opt.jpg" />
        <Services items={serviceItems} />
        <Areas />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
