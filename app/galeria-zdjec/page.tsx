import type { Metadata } from "next";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { PublicPageShell } from "@/components/PublicPageShell";
import { SITE_CONFIG } from "@/lib/site-config";
import { getResolvedSiteContent } from "@/sanity/lib/site-content";

export const metadata: Metadata = {
  title: "Portfolio fotograficzne",
  description:
    "Portfolio Janiczek Foto: naturalne portrety, uroczystości i reportaże z Bochni i Małopolski.",
  alternates: {
    canonical: "/galeria-zdjec"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/galeria-zdjec`,
    title: `Portfolio fotograficzne | ${SITE_CONFIG.name}`,
    description:
      "Zobacz wybrane portrety, uroczystości, reportaże i projekty własne.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Portfolio fotograficzne | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Portfolio fotograficzne | ${SITE_CONFIG.name}`,
    description:
      "Wybrane portrety, uroczystości, reportaże i projekty własne Janiczek Foto.",
    images: [SITE_CONFIG.ogImage]
  }
};

export default async function PhotoGalleryPage() {
  const { gallery } = await getResolvedSiteContent();
  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `Portfolio fotograficzne | ${SITE_CONFIG.name}`,
    url: `${SITE_CONFIG.url}/galeria-zdjec`,
    image: gallery.slice(0, 12).map((item) =>
      item.src.startsWith("http") ? item.src : `${SITE_CONFIG.url}${item.src}`
    )
  };

  return (
    <PublicPageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />
      <main className="px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <PhotoGalleryGrid
          items={gallery}
          heading="Portfolio"
          description="Wybrane portrety, reportaże, sesje i projekty własne. Wybierz temat, aby zobaczyć osobną, uporządkowaną galerię."
        />
      </main>
    </PublicPageShell>
  );
}
