import galleryManifest from "@/content/gallery-manifest.json";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery-categories";

export { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery-categories";

export type PhotoGalleryItem = {
  src: string;
  thumb: string;
  fullSrc?: string;
  title: string;
  alt: string;
  category: GalleryCategory;
  featured: boolean;
  width: number;
  height: number;
};

const categorySet = new Set<string>(GALLERY_CATEGORIES);
const rawGalleryManifest: unknown[] = galleryManifest;

function isGalleryItem(item: unknown): item is PhotoGalleryItem {
  if (!item || typeof item !== "object") {
    return false;
  }

  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.src === "string" &&
    typeof candidate.thumb === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.alt === "string" &&
    typeof candidate.featured === "boolean" &&
    typeof candidate.width === "number" &&
    typeof candidate.height === "number" &&
    typeof candidate.category === "string" &&
    categorySet.has(candidate.category)
  );
}

export const photoGalleryItems: PhotoGalleryItem[] = rawGalleryManifest
  .filter(isGalleryItem)
  .map((item) => {
    const candidate = item as PhotoGalleryItem & { jpeg?: unknown };

    return {
      ...item,
      fullSrc: typeof candidate.jpeg === "string" ? candidate.jpeg : item.src
    };
  });
