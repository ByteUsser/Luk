import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const manifestPath = path.join(rootDir, "content", "gallery-manifest.json");
const minimumShortEdge = 1200;
const minimumLongEdge = 1800;

export function findUndersizedGalleryItems(manifest) {
  return manifest.filter((item) => {
    if (!Number.isFinite(item.width) || !Number.isFinite(item.height)) return true;

    const shortEdge = Math.min(item.width, item.height);
    const longEdge = Math.max(item.width, item.height);
    return shortEdge < minimumShortEdge || longEdge < minimumLongEdge;
  });
}

export function assertGalleryResolution(manifest) {
  const undersized = findUndersizedGalleryItems(manifest);
  if (undersized.length === 0) return;

  const details = undersized
    .map((item) => `- ${item.title || item.src}: ${item.width || "?"}x${item.height || "?"}`)
    .join("\n");

  throw new Error(
    `Galeria zawiera pliki zbyt małe do podglądu premium. Minimum: krótszy bok ${minimumShortEdge}px i dłuższy bok ${minimumLongEdge}px.\n${details}`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  assertGalleryResolution(manifest);
  console.log(`Kontrola jakości galerii: OK (${manifest.length} zdjęć).`);
}
