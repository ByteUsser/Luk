import { photoGalleryItems, GALLERY_CATEGORIES, type GalleryCategory, type PhotoGalleryItem } from "@/lib/gallery";
import { getSanityClient } from "./client";

type SanityImage = {
  asset?: {
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
      lqip?: string;
    };
  };
  hotspot?: {
    x?: number;
    y?: number;
  };
};

type ManagedPhoto = {
  _key?: string;
  image?: SanityImage;
  title?: string;
  alt?: string;
  category?: string;
  visible?: boolean;
};

type ManagedVideo = {
  _key?: string;
  title?: string;
  label?: string;
  visible?: boolean;
  video?: { asset?: { url?: string } };
  preview?: { asset?: { url?: string } };
  poster?: SanityImage;
};

type SiteContentDocument = {
  heroImage?: SanityImage;
  aboutImage?: SanityImage;
  homepageGallery?: ManagedPhoto[];
  homepageVideos?: ManagedVideo[];
  gallery?: ManagedPhoto[];
};

export type HomepageGalleryItem = {
  title: string;
  alt: string;
  category: GalleryCategory;
  publicId: string;
  fullSrc?: string;
  imagePosition?: string;
};

export type ResolvedSiteContent = {
  heroImage: { src: string; position?: string; blurDataURL?: string };
  aboutImage: { src: string; position?: string; blurDataURL?: string };
  homepageGallery: HomepageGalleryItem[];
  homepageVideos: HomepageVideoItem[];
  gallery: PhotoGalleryItem[];
};

export type HomepageVideoItem = {
  id: string;
  title: string;
  label: string;
  videoUrl: string;
  previewUrl: string;
  posterUrl: string;
};

const siteContentQuery = `*[_type == "siteContent" && _id == "siteContent"][0]{
  heroImage{..., asset->{url, metadata{dimensions, lqip}}},
  aboutImage{..., asset->{url, metadata{dimensions, lqip}}},
  homepageGallery[]{
    _key, title, alt, category, visible,
    image{..., asset->{url, metadata{dimensions}}}
  },
  homepageVideos[]{
    _key, title, label, visible,
    video{asset->{url}},
    preview{asset->{url}},
    poster{..., asset->{url, metadata{dimensions}}}
  },
  gallery[]{
    _key, title, alt, category, visible,
    image{..., asset->{url, metadata{dimensions}}}
  }
}`;

const fallbackHomepageSources = [
  "/portfolio/gallery/001-wiosenny-portret.webp",
  "/portfolio/gallery/002-rodzinny-moment.webp",
  "/portfolio/gallery/003-parkiet-i-energia.webp",
  "/portfolio/gallery/004-niebieski-kabriolet.webp",
  "/portfolio/gallery/005-nadmorski-widok.webp"
] as const;

const fallbackAboutBlurDataURL =
  "data:image/jpeg;base64,/9j//gAQTGF2YzYyLjI4LjEwMQD/2wBDAAgQEBMQExYWFhYWFhoYGhsbGxoaGhobGxsdHR0iIiIdHR0bGx0dICAiIiUmJSMjIiMmJigoKDAwLi44ODpFRVP/xAB3AAEBAQEBAAAAAAAAAAAAAAAFBgcCBAEBAQEBAQAAAAAAAAAAAAAAAgQDAAEQAAIBAgQEAgcJAQAAAAAAAAECEQMAEiExBCIFYUFRE1JxgbGRwaLR4lOCoTPwQjRiEQADAQEBAQAAAAAAAAAAAAABABEhAhJx/8AAEQgAJQAYAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8AzJOJXCjPUkDsO1t8sSiJas7KOFBhgwXOUj2W5y/bKrZ6vOYyjEPlfv2tB1LEIEmsr8eJAFDuJEkTIzAiLmtffM1k+aUTQrZwTIMzqOx9RFg426XoXOlxCmQNFWDrln3vPs/RslBGug7R+NdDGfwuzqV0qIkkHETijUSPDsLySkxI4eKPRwN78LW0lVKxiowWBJxK4zM6eWGA6zaONA0Fd3SKcEFYFNQoMdemkWL5S/8APwX7L5c8Qw1BCrAM4sXgBkv63xjqeJ/n5r6JRgiN/UXSbTYmrtndarIQdIxDLxBIsBPld9y7/HU9ZtdmT6jlh9vVQOwekrkSAwJUjrlanm0/wvr+7c9T/cf2++0LyJNdAH//2Q==";

const fallbackHeroBlurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABMNDhEODBMRDxEVFBMXHTAfHRoaHToqLCMwRT1JR0Q9Q0FMVm1dTFFoUkFDX4JgaHF1e3x7SlyGkIV3j214e3b/2wBDARQVFR0ZHTgfHzh2T0NPdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnb/wAARCAAkABgDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAUBAwQCBv/EACYQAAICAQQABQUAAAAAAAAAAAECAAMRBBIhMQUTIkFRJUJxkbH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAQP/xAAaEQEAAwADAAAAAAAAAAAAAAAAAQIREhMx/9oADAMBAAIRAxEAPwBvqaVNYYAkY6WYtmRGQZFRqkwBX6cZ6GOJ5zV6zVaW3ZQqW19q3HK/vuStsW1dMPL+RCJLfFdU1JFgFZz9uP7CLsHib6g/UNa3mFdtec56PUS6hnp04etyQwxZ74aZdYupbV2G9nZl4YuecypGsFe3JCn2+ZnENXd97XbS23gccQk7ewB6l4AhHGIuY7haesknAlBJ25/EIQlKUYlQ2eTxCEIZ9F//2Q==";

const fallbackHomepageVideos: HomepageVideoItem[] = [
  {
    id: "fotoksiazka",
    title: "Fotoksiążka",
    label: "Po sesji",
    videoUrl: "/video/fotoksiazka-full.mp4",
    previewUrl: "/video/fotoksiazka-preview.mp4",
    posterUrl: "/video/fotoksiazka-poster.jpg"
  },
  {
    id: "event",
    title: "Na parkiecie",
    label: "Reportaż",
    videoUrl: "/video/event-full-with-music.mp4",
    previewUrl: "/video/event-preview.mp4",
    posterUrl: "/video/event-poster.jpg"
  },
  {
    id: "sesja-plenerowa",
    title: "Sesja plenerowa",
    label: "Backstage",
    videoUrl: "/video/sesja-plenerowa-full-with-music.mp4",
    previewUrl: "/video/sesja-plenerowa-preview.mp4",
    posterUrl: "/video/sesja-plenerowa-poster.jpg"
  }
];

const categorySet = new Set<string>(GALLERY_CATEGORIES);

function positionFromImage(image?: SanityImage) {
  const x = image?.hotspot?.x;
  const y = image?.hotspot?.y;

  if (typeof x !== "number" || typeof y !== "number") {
    return undefined;
  }

  return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}

function validCategory(category?: string): GalleryCategory {
  if (category === "Event i reportaż") {
    return "Eventy";
  }

  return category && categorySet.has(category) ? (category as GalleryCategory) : "Portrety";
}

function imageUrl(image?: SanityImage) {
  return image?.asset?.url?.trim() || undefined;
}

function mapHomepagePhoto(item: ManagedPhoto): HomepageGalleryItem | null {
  const src = imageUrl(item.image);
  if (!src || item.visible === false) return null;

  const title = item.title?.trim() || "Zdjęcie z portfolio";
  return {
    title,
    alt: item.alt?.trim() || `${title} — Janiczek Foto`,
    category: validCategory(item.category),
    publicId: src,
    fullSrc: src,
    imagePosition: positionFromImage(item.image)
  };
}

function mapGalleryPhoto(item: ManagedPhoto, index: number): PhotoGalleryItem | null {
  const src = imageUrl(item.image);
  if (!src || item.visible === false) return null;

  const title = item.title?.trim() || "Zdjęcie z portfolio";
  const width = item.image?.asset?.metadata?.dimensions?.width || 1600;
  const height = item.image?.asset?.metadata?.dimensions?.height || 1200;
  const separator = src.includes("?") ? "&" : "?";

  return {
    src,
    thumb: `${src}${separator}auto=format&w=900&q=74&fit=max`,
    fullSrc: src,
    title,
    alt: item.alt?.trim() || `${title} — Janiczek Foto`,
    category: validCategory(item.category),
    featured: index < 5,
    width,
    height
  };
}

function mapHomepageVideo(item: ManagedVideo, index: number): HomepageVideoItem | null {
  const videoUrl = item.video?.asset?.url?.trim();
  const previewUrl = item.preview?.asset?.url?.trim();
  const posterUrl = imageUrl(item.poster);

  if (!videoUrl || !previewUrl || !posterUrl || item.visible === false) return null;

  return {
    id: item._key || `video-${index + 1}`,
    title: item.title?.trim() || "Wideo",
    label: item.label?.trim() || "Wideo",
    videoUrl,
    previewUrl,
    posterUrl
  };
}

function fallbackHomepage(): HomepageGalleryItem[] {
  return fallbackHomepageSources
    .map((src) => photoGalleryItems.find((item) => item.src === src))
    .filter((item): item is PhotoGalleryItem => Boolean(item))
    .map((item) => ({
      title: item.title,
      alt: item.alt,
      category: item.category,
      publicId: item.src,
      fullSrc: item.fullSrc
    }));
}

async function fetchSiteContent(): Promise<SiteContentDocument | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<SiteContentDocument | null>(
      siteContentQuery,
      {},
      { next: { revalidate: 60, tags: ["site-content"] } }
    );
  } catch (error) {
    console.error("Nie udało się pobrać opublikowanych zdjęć z Sanity. Używam lokalnej galerii.", error);
    return null;
  }
}

export async function getResolvedSiteContent(): Promise<ResolvedSiteContent> {
  const content = await fetchSiteContent();
  const useLocalPhotoPreview = process.env.NODE_ENV === "development";
  const cmsHomepage = (content?.homepageGallery || [])
    .map(mapHomepagePhoto)
    .filter((item): item is HomepageGalleryItem => Boolean(item));
  const cmsGallery = (content?.gallery || [])
    .map(mapGalleryPhoto)
    .filter((item): item is PhotoGalleryItem => Boolean(item));
  const cmsVideos = (content?.homepageVideos || [])
    .map(mapHomepageVideo)
    .filter((item): item is HomepageVideoItem => Boolean(item));

  return {
    heroImage: {
      src: useLocalPhotoPreview
        ? "/portfolio/hero-lawenda-22.webp"
        : imageUrl(content?.heroImage) || "/portfolio/hero-lawenda-22.webp",
      position: useLocalPhotoPreview
        ? "45% 61%"
        : positionFromImage(content?.heroImage) || "45% 61%",
      blurDataURL: useLocalPhotoPreview
        ? fallbackHeroBlurDataURL
        : content?.heroImage?.asset?.metadata?.lqip || fallbackHeroBlurDataURL
    },
    aboutImage: {
      src: useLocalPhotoPreview
        ? "/portfolio/o-mnie-lukasz-janiczek-final.webp"
        : imageUrl(content?.aboutImage) || "/portfolio/o-mnie-lukasz-janiczek-final.webp",
      position: useLocalPhotoPreview ? undefined : positionFromImage(content?.aboutImage),
      blurDataURL: useLocalPhotoPreview
        ? fallbackAboutBlurDataURL
        : content?.aboutImage?.asset?.metadata?.lqip || fallbackAboutBlurDataURL
    },
    homepageGallery: !useLocalPhotoPreview && cmsHomepage.length ? cmsHomepage.slice(0, 5) : fallbackHomepage(),
    homepageVideos: !useLocalPhotoPreview && cmsVideos.length ? cmsVideos : fallbackHomepageVideos,
    gallery: !useLocalPhotoPreview && cmsGallery.length ? cmsGallery : photoGalleryItems
  };
}
