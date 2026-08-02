import type { Metadata } from "next";
import { Areas } from "@/components/Areas";
import { Contact } from "@/components/Contact";
import { Gallery, type GalleryItem } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { PublicPageShell } from "@/components/PublicPageShell";
import { Reviews } from "@/components/Reviews";
import { Services, type Service } from "@/components/Services";
import { VideoShowcase } from "@/components/VideoShowcase";
import { SITE_CONFIG } from "@/lib/site-config";
import { getResolvedSiteContent } from "@/sanity/lib/site-content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

const serviceItems: Service[] = [
  {
    eyebrow: "Portret • para • wizerunek",
    title: "Portret i para",
    publicId: "/portfolio/gallery/006-portret-przy-drzwiach.webp",
    href: "/cennik#cennik-portret",
  },
  {
    eyebrow: "Komunia • chrzest • ślub",
    title: "Uroczystości rodzinne",
    publicId: "/portfolio/gallery/007-wnetrze-kosciola.webp",
    href: "/cennik#cennik-komunia-chrzest"
  },
  {
    eyebrow: "Event • firma • backstage",
    title: "Event i firma",
    publicId: "/portfolio/gallery/008-ruch-na-parkiecie.webp",
    href: "/cennik#cennik-event"
  }
];

export default async function HomePage() {
  const content = await getResolvedSiteContent();
  const galleryItems: GalleryItem[] = content.homepageGallery;
  const allGalleryItems: GalleryItem[] = content.gallery.map((item) => ({
    title: item.title,
    alt: item.alt,
    category: item.category,
    publicId: item.src,
    fullSrc: item.fullSrc
  }));
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
    telephone: SITE_CONFIG.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.city,
      addressRegion: "małopolskie",
      addressCountry: "PL"
    },
    alternateName: ["JaniczekFoto", SITE_CONFIG.domain],
    areaServed: SITE_CONFIG.primaryAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name
    })),
    hasMap: SITE_CONFIG.googleBusinessProfile,
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
    <PublicPageShell>
      <script
        type="application/ld+json"
        // JSON-LD for rich results and business entity understanding.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photographerJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <main>
        <Hero
          imagePublicId={content.heroImage.src}
          imagePosition={content.heroImage.position}
          imageBlurDataURL={content.heroImage.blurDataURL}
        />
        <Gallery items={galleryItems} lightboxItems={allGalleryItems} />
        <Services items={serviceItems} />
        <Reviews />
        <VideoShowcase items={content.homepageVideos} />
        <Areas />
        <Contact />
      </main>
    </PublicPageShell>
  );
}
