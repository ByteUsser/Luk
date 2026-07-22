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
  imagePosition?: string;
};

export type ResolvedSiteContent = {
  heroImage: { src: string; position?: string };
  aboutImage: { src: string; position?: string };
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
  heroImage{..., asset->{url, metadata{dimensions}}},
  aboutImage{..., asset->{url, metadata{dimensions}}},
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
    videoUrl: "/video/event-full.mp4",
    previewUrl: "/video/event-preview.mp4",
    posterUrl: "/video/event-poster.jpg"
  },
  {
    id: "sesja-plenerowa",
    title: "Sesja plenerowa",
    label: "Backstage",
    videoUrl: "/video/sesja-plenerowa-full.mp4",
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
      publicId: item.src
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
      src: useLocalPhotoPreview ? "/portfolio/hero-final.jpg" : imageUrl(content?.heroImage) || "/portfolio/hero-final.jpg",
      position: useLocalPhotoPreview ? undefined : positionFromImage(content?.heroImage)
    },
    aboutImage: {
      src: useLocalPhotoPreview
        ? "/portfolio/o-mnie-lukasz-janiczek-final.webp"
        : imageUrl(content?.aboutImage) || "/portfolio/o-mnie-lukasz-janiczek-final.webp",
      position: useLocalPhotoPreview ? undefined : positionFromImage(content?.aboutImage)
    },
    homepageGallery: !useLocalPhotoPreview && cmsHomepage.length ? cmsHomepage.slice(0, 5) : fallbackHomepage(),
    homepageVideos: cmsVideos.length ? cmsVideos : fallbackHomepageVideos,
    gallery: !useLocalPhotoPreview && cmsGallery.length ? cmsGallery : photoGalleryItems
  };
}
