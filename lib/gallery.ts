import galleryManifest from "@/content/gallery-manifest.json";
import { describeGalleryImage } from "@/lib/gallery-image-alt";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery-categories";
import { reorderWeddingGallery } from "@/lib/wedding-gallery-order";

export { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery-categories";

export type PhotoGalleryItem = {
  src: string;
  thumb: string;
  fullSrc?: string;
  title: string;
  alt: string;
  blurDataURL?: string;
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

const normalizedGalleryItems: PhotoGalleryItem[] = rawGalleryManifest
  .filter(isGalleryItem)
  .map((item) => {
    const candidate = item as PhotoGalleryItem & { jpeg?: unknown };

    return {
      ...item,
      alt: describeGalleryImage(item.alt, item.src),
      fullSrc: typeof candidate.jpeg === "string" ? candidate.jpeg : item.src
    };
  });

export const photoGalleryItems = reorderWeddingGallery(
  normalizedGalleryItems,
  (item) => item.category,
  (item) => item.fullSrc || item.src
);
