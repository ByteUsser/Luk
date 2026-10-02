import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "public", "portfolio", "gallery");
const manifestPath = path.join(projectRoot, "content", "gallery-manifest.json");
const manifestTempPath = `${manifestPath}.importing`;
const selectionPath = path.join(projectRoot, "content", "wedding-additions.json");

function option(name) {
  const index = process.argv.indexOf(name);
  return index < 0 ? undefined : process.argv[index + 1];
}

const fullSourceDir = option("--full-source");
const logoPath = option("--logo");
const dryRun = process.argv.includes("--dry-run");

if (!fullSourceDir || !logoPath) {
  throw new Error("Podaj --full-source <katalog> i --logo <plik PNG>.");
}

const selection = JSON.parse(readFileSync(selectionPath, "utf8"));
const originalManifest = readFileSync(manifestPath, "utf8");
const manifest = JSON.parse(originalManifest);
const existingIds = new Set(
  manifest
    .filter((item) => item.category === "Śluby")
    .map((item) => item.src.match(/DSC\d+/i)?.[0]?.toUpperCase())
    .filter(Boolean)
);

if (!existsSync(logoPath)) {
  throw new Error(`Brak oryginalnego białego logo: ${logoPath}`);
}

const newEntries = selection.filter((item) => {
  if (!/^DSC\d+\.jpg$/.test(item.file) || !item.title?.trim() || !item.alt?.trim()) {
    throw new Error(`Niepoprawny wpis selekcji: ${JSON.stringify(item)}`);
  }

  const inputPath = path.join(fullSourceDir, item.file);
  if (!existsSync(inputPath)) {
    throw new Error(`Brak pełnego eksportu: ${inputPath}`);
  }

  return !existingIds.has(item.file.slice(0, -4).toUpperCase());
});

for (const item of newEntries) {
  const outputPath = path.join(outputDir, `wedding-${item.file}`);
  if (existsSync(outputPath)) {
    throw new Error(`Plik już istnieje, nie nadpisuję: ${outputPath}`);
  }
}

console.log(`Nowych, niedublujących się plików: ${newEntries.length}.`);
if (dryRun || newEntries.length === 0) process.exit(0);

const createdPaths = [];
const temporaryPaths = [];

try {
  const additions = newEntries.map((item) => {
    const inputPath = path.join(fullSourceDir, item.file);
    const outputPath = path.join(outputDir, `wedding-${item.file}`);
    const temporaryPath = `${outputPath}.importing.jpg`;
    temporaryPaths.push(temporaryPath);

    const [width, height] = execFileSync(
      "magick",
      [inputPath, "-auto-orient", "-resize", "2400x2400>", "-format", "%w %h", "info:"],
      { encoding: "utf8" }
    ).trim().split(/\s+/).map(Number);
    const shortEdge = Math.min(width, height);
    const logoWidth = Math.round(shortEdge * 0.16);
    const margin = Math.round(shortEdge * 0.03);

    if (shortEdge < 1200 || Math.max(width, height) < 1800) {
      throw new Error(`Zbyt mały pełny eksport: ${item.file} (${width}x${height}).`);
    }

    execFileSync("magick", [
      inputPath,
      "-auto-orient",
      "-resize", "2400x2400>",
      "-colorspace", "sRGB",
      "(", logoPath, "-resize", `${logoWidth}x`, "-channel", "A", "-evaluate", "multiply", "0.78", "+channel", ")",
      "-gravity", "southeast",
      "-geometry", `+${margin}+${margin}`,
      "-compose", "over", "-composite",
      "-strip",
      "-interlace", "Plane",
      "-quality", "86",
      temporaryPath
    ]);
    renameSync(temporaryPath, outputPath);
    createdPaths.push(outputPath);

    return {
      src: `/portfolio/gallery/wedding-${item.file}`,
      thumb: `/portfolio/gallery/wedding-${item.file}`,
      jpeg: `/portfolio/gallery/wedding-${item.file}`,
      title: item.title,
      alt: item.alt,
      category: "Śluby",
      featured: false,
      width,
      height
    };
  });

  if (readFileSync(manifestPath, "utf8") !== originalManifest) {
    throw new Error("Manifest galerii zmienił się podczas importu. Nie nadpisuję nowszej wersji.");
  }
  writeFileSync(manifestTempPath, `${JSON.stringify([...manifest, ...additions], null, 2)}\n`);
  renameSync(manifestTempPath, manifestPath);
  console.log(`Dodano ${additions.length} zdjęć z logo do lokalnej galerii.`);
} catch (error) {
  for (const filePath of [manifestTempPath, ...temporaryPaths, ...createdPaths]) {
    if (existsSync(filePath)) unlinkSync(filePath);
  }
  throw error;
}
