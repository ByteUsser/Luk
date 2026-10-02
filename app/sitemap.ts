import type { MetadataRoute } from "next";
import { GALLERY_CATEGORY_DEFINITIONS, galleryCategoryHref } from "@/lib/gallery-categories";
import { LOCATION_LANDINGS, isSearchIndexableLocation } from "@/lib/location-pages";
import { SITE_CONFIG, STATIC_ROUTES } from "@/lib/site-config";
import { getResolvedSiteContent } from "@/sanity/lib/site-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { gallery } = await getResolvedSiteContent();

  const absoluteImageUrl = (src: string) =>
    src.startsWith("http") ? src : `${SITE_CONFIG.url}${src}`;

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_CONFIG.url}${path}`,
    ...(path === "/galeria-zdjec"
      ? { images: gallery.slice(0, 30).map((item) => absoluteImageUrl(item.fullSrc || item.src)) }
      : {})
  }));

  const locationEntries: MetadataRoute.Sitemap = LOCATION_LANDINGS
    .filter((location) => isSearchIndexableLocation(location.slug))
    .map((location) => ({
      url: `${SITE_CONFIG.url}/fotograf/${location.slug}`
    }));

  const galleryEntries: MetadataRoute.Sitemap = GALLERY_CATEGORY_DEFINITIONS.map((category) => ({
    url: `${SITE_CONFIG.url}${galleryCategoryHref(category.slug)}`,
    images: gallery
      .filter((item) => item.category === category.name)
      .map((item) => absoluteImageUrl(item.fullSrc || item.src))
  }));

  return [...staticEntries, ...galleryEntries, ...locationEntries];
}
