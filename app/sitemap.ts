import type { MetadataRoute } from "next";
import { GALLERY_CATEGORY_DEFINITIONS, galleryCategoryHref } from "@/lib/gallery-categories";
import { LOCATION_LANDINGS, isSearchIndexableLocation } from "@/lib/location-pages";
import { SITE_CONFIG, STATIC_ROUTES } from "@/lib/site-config";
import { getResolvedSiteContent } from "@/sanity/lib/site-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updatedAt = new Date(SITE_CONFIG.updatedAt);
  const { gallery } = await getResolvedSiteContent();

  const absoluteImageUrl = (src: string) =>
    src.startsWith("http") ? src : `${SITE_CONFIG.url}${src}`;

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified: updatedAt,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/kontakt" ? 0.8 : 0.7,
    ...(path === "/galeria-zdjec"
      ? { images: gallery.slice(0, 30).map((item) => absoluteImageUrl(item.fullSrc || item.src)) }
      : {})
  }));

  const locationEntries: MetadataRoute.Sitemap = LOCATION_LANDINGS
    .filter((location) => isSearchIndexableLocation(location.slug))
    .map((location) => ({
      url: `${SITE_CONFIG.url}/fotograf/${location.slug}`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority:
        location.slug === "bochnia"
          ? 0.9
          : location.slug === "powiat-bochenski"
            ? 0.85
            : 0.72
    }));

  const galleryEntries: MetadataRoute.Sitemap = GALLERY_CATEGORY_DEFINITIONS.map((category) => ({
    url: `${SITE_CONFIG.url}${galleryCategoryHref(category.slug)}`,
    lastModified: updatedAt,
    changeFrequency: "monthly",
    images: gallery
      .filter((item) => item.category === category.name)
      .slice(0, 30)
      .map((item) => absoluteImageUrl(item.fullSrc || item.src)),
    priority:
      category.name === "Portrety" || category.name === "Uroczystości" || category.name === "Eventy"
        ? 0.78
        : 0.72
  }));

  return [...staticEntries, ...galleryEntries, ...locationEntries];
}
