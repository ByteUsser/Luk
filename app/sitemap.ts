import type { MetadataRoute } from "next";
import { LOCATION_LANDINGS } from "@/lib/location-pages";
import { SITE_CONFIG, STATIC_ROUTES } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date(SITE_CONFIG.updatedAt);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified: updatedAt,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/kontakt" ? 0.8 : 0.7
  }));

  const locationEntries: MetadataRoute.Sitemap = LOCATION_LANDINGS.map((location) => ({
    url: `${SITE_CONFIG.url}/fotograf/${location.slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly",
    priority: location.slug === "bochnia" ? 0.9 : 0.7
  }));

  return [...staticEntries, ...locationEntries];
}
