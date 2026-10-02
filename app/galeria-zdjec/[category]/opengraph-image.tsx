import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { findGalleryCategoryBySlug, type GalleryCategorySlug } from "@/lib/gallery-categories";
import { GALLERY_SOCIAL_IMAGES } from "@/lib/gallery-social-images";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Zdjęcie z portfolio Janiczek Foto";

type Props = { params: Promise<{ category: string }> };

// Keep file paths literal so Vercel bundles only these images, not the entire gallery.
function readSocialPhoto(category: GalleryCategorySlug) {
  switch (category) {
    case "portrety":
      return readFile(join(process.cwd(), "public", "portfolio", "gallery", "001-wiosenny-portret.jpg"));
    case "sesje-dla-par":
      return readFile(join(process.cwd(), "public", "portfolio", "gallery", "051-bliskosc-w-lawendzie.jpg"));
    case "sluby":
      return readFile(join(process.cwd(), "public", "og", "wedding-reportage-1200x630.jpg"));
    case "uroczystosci":
      return readFile(join(process.cwd(), "public", "og", "cover-1200x630.jpg"));
    case "eventy":
      return readFile(join(process.cwd(), "public", "portfolio", "gallery", "003-parkiet-i-energia.jpg"));
    case "motoryzacja":
      return readFile(join(process.cwd(), "public", "portfolio", "gallery", "009-samochod-przed-domem.jpg"));
    case "podroze":
      return readFile(join(process.cwd(), "public", "portfolio", "gallery", "005-nadmorski-widok.jpg"));
  }
}

export default async function Image({ params }: Props) {
  const { category } = await params;
  const categoryDefinition = findGalleryCategoryBySlug(category);
  if (!categoryDefinition) notFound();

  const config = GALLERY_SOCIAL_IMAGES[categoryDefinition.slug];
  const photoData = await readSocialPhoto(categoryDefinition.slug);
  const photoSrc = `data:image/jpeg;base64,${photoData.toString("base64")}`;
  const logoData = config.branded
    ? null
    : await readFile(join(process.cwd(), "public", "og", "brand-logo-white.png"));
  const logoSrc = logoData ? `data:image/png;base64,${logoData.toString("base64")}` : null;

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", backgroundColor: "#171714" }}>
      <img
        src={photoSrc}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: config.position ?? "center" }}
      />
      {logoSrc ? (
        <img
          src={logoSrc}
          alt=""
          style={{ position: "absolute", right: 19, bottom: 19, width: 101, height: 30, opacity: 0.78 }}
        />
      ) : null}
    </div>,
    size
  );
}
