import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { GalleryServiceDetails } from "@/components/GalleryServiceDetails";
import { PublicPageShell } from "@/components/PublicPageShell";
import {
  GALLERY_CATEGORY_DEFINITIONS,
  findGalleryCategoryBySlug,
  galleryCategoryHref
} from "@/lib/gallery-categories";
import { SITE_CONFIG, SITE_ENTITY_IDS } from "@/lib/site-config";
import { GALLERY_SERVICE_SEO } from "@/lib/gallery-service-seo";
import { getResolvedSiteContent } from "@/sanity/lib/site-content";

type Params = {
  category: string;
};

type GalleryCategoryPageProps = {
  params: Promise<Params>;
};

export function generateStaticParams(): Params[] {
  return GALLERY_CATEGORY_DEFINITIONS.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: GalleryCategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = findGalleryCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "Nie znaleziono galerii" };
  }

  const path = galleryCategoryHref(category.slug);
  const title = category.metaTitle;

  return {
    title,
    description: category.description,
    alternates: { canonical: path },
    openGraph: {
      url: `${SITE_CONFIG.url}${path}`,
      title: `${title} | ${SITE_CONFIG.name}`,
      description: category.description,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: `${category.heading} | ${SITE_CONFIG.name}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description: category.description,
      images: [SITE_CONFIG.ogImage]
    }
  };
}

export default async function GalleryCategoryPage({ params }: GalleryCategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = findGalleryCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const { gallery } = await getResolvedSiteContent();
  const categoryItems = gallery.filter((item) => item.category === category.name);
  const serviceContent = GALLERY_SERVICE_SEO[category.slug];
  const pageUrl = `${SITE_CONFIG.url}${galleryCategoryHref(category.slug)}`;
  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${category.heading} | ${SITE_CONFIG.name}`,
    description: category.description,
    url: pageUrl,
    image: categoryItems.slice(0, 12).map((item) =>
      item.src.startsWith("http") ? item.src : `${SITE_CONFIG.url}${item.src}`
    )
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_CONFIG.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${SITE_CONFIG.url}/galeria-zdjec`
      },
      { "@type": "ListItem", position: 3, name: category.heading, item: pageUrl }
    ]
  };
  const serviceJsonLd = serviceContent
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceContent.serviceType,
        serviceType: serviceContent.serviceType,
        url: pageUrl,
        provider: { "@id": SITE_ENTITY_IDS.business },
        areaServed: SITE_CONFIG.primaryAreas.slice(0, 4).map((name) => ({
          "@type": "AdministrativeArea",
          name
        }))
      }
    : null;

  return (
    <PublicPageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {serviceJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      ) : null}
      <main className="px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <PhotoGalleryGrid
          items={categoryItems}
          availableCategories={[...new Set(gallery.map((item) => item.category))]}
          activeCategory={category.name}
          eyebrow={category.eyebrow}
          heading={category.heading}
          description={category.intro}
          emptyMessage={category.emptyMessage}
          contactSource={`galeria-${category.slug}`}
        />
        {serviceContent ? <GalleryServiceDetails content={serviceContent} /> : null}
      </main>
    </PublicPageShell>
  );
}
