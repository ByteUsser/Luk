import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";
import { assertGalleryResolution } from "./check-gallery-resolution.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const publicDir = path.join(rootDir, "public");
const manifest = JSON.parse(
  readFileSync(path.join(rootDir, "content", "gallery-manifest.json"), "utf8")
);
const client = getCliClient({ apiVersion: "2026-07-01" });

const homepageItems = [
  {
    src: "/portfolio/homepage/wedding-ceremony-dsc00156.jpg",
    title: "Reportaż ślubny",
    alt: "Para młoda podczas ceremonii ślubnej",
    category: "Śluby"
  },
  {
    src: "/portfolio/gallery/052-lekkosc-w-lawendzie.webp",
    title: "Portret w lawendzie",
    alt: "Naturalny portret w lawendzie — Janiczek Foto",
    category: "Portrety"
  },
  {
    src: "/portfolio/homepage/session-pair-dsc02546.jpg",
    title: "Sesja dla par",
    alt: "Dłonie pary podczas reportażu ślubnego",
    category: "Sesje dla par"
  },
  {
    src: "/portfolio/gallery/002-rodzinny-moment.webp",
    title: "Rodzinny moment",
    alt: "Rodzinny moment podczas uroczystości — Janiczek Foto",
    category: "Uroczystości"
  },
  {
    src: "/portfolio/gallery/003-parkiet-i-energia.webp",
    title: "Parkiet i energia",
    alt: "Dynamiczny reportaż z eventu — Janiczek Foto",
    category: "Eventy"
  }
];

function stableKey(value) {
  return value
    .replace(/^.*\//, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .slice(0, 90);
}

function localImagePath(relativePath) {
  const filePath = path.join(publicDir, relativePath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    throw new Error(`Brak pliku: ${filePath}`);
  }
  return filePath;
}

async function uploadOnce(relativePath, label) {
  const filePath = localImagePath(relativePath);
  const filename = `janiczekfoto-${label}-${path.basename(filePath)}`;
  const existingId = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename }
  );

  if (existingId) {
    console.log(`Pomijam istniejący plik: ${filename}`);
    return existingId;
  }

  console.log(`Wysyłam: ${filename}`);
  const asset = await client.assets.upload("image", createReadStream(filePath), { filename });
  return asset._id;
}

function photoObject(item, assetId) {
  return {
    _key: stableKey(item.src),
    _type: "managedPhoto",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId }
    },
    title: item.title,
    alt: item.alt,
    category: item.category,
    visible: true
  };
}

async function main() {
  if (!Array.isArray(manifest) || manifest.length === 0) {
    throw new Error("Galeria lokalna jest pusta.");
  }

  assertGalleryResolution(manifest);

  const existingDocumentId = await client.fetch(`*[_id == "siteContent"][0]._id`);
  if (existingDocumentId && !process.argv.includes("--force")) {
    console.log(
      "Panel ma już opublikowaną zawartość. Migracja została bezpiecznie pominięta, aby nie nadpisać ręcznych zmian."
    );
    return;
  }

  const heroAssetId = await uploadOnce(
    "/portfolio/homepage/wedding-reportage-dsc01972.jpg",
    "homepage-wedding-hero"
  );
  const aboutAssetId = await uploadOnce(
    "/portfolio/o-mnie-lukasz-janiczek-final.webp",
    "o-mnie-final"
  );
  const assetIds = new Map();

  for (const item of manifest) {
    const source = typeof item.jpeg === "string" ? item.jpeg : item.src;
    const assetId = await uploadOnce(source, stableKey(item.src));
    assetIds.set(item.src, assetId);
  }

  for (const item of homepageItems) {
    if (!assetIds.has(item.src)) {
      const assetId = await uploadOnce(item.src, `homepage-${stableKey(item.src)}`);
      assetIds.set(item.src, assetId);
    }
  }

  const gallery = manifest.map((item) => photoObject(item, assetIds.get(item.src)));
  const homepageGallery = homepageItems
    .map((item) => photoObject(item, assetIds.get(item.src)));

  await client.createIfNotExists({
    _id: "siteContent",
    _type: "siteContent",
    internalTitle: "Janiczek Foto"
  });

  await client.patch("siteContent").set({
    heroImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroAssetId }
    },
    heroAlt: "Para młoda podczas sesji ślubnej — Janiczek Foto",
    homepageGallery,
    gallery,
    aboutImage: {
      _type: "image",
      asset: { _type: "reference", _ref: aboutAssetId }
    }
  }).commit();

  console.log(`Gotowe: opublikowano ${gallery.length} zdjęcia w panelu Sanity.`);
}

await main();
