import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
function optionValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const sourceDir = path.resolve(optionValue("--source") || path.join(rootDir, "content", "gallery-source"));
const outputDir = path.join(rootDir, "public", "portfolio", "gallery");
const manifestPath = path.join(rootDir, "content", "gallery-manifest.json");
const metadataPath = path.resolve(optionValue("--metadata") || path.join(sourceDir, "gallery.json"));
const listedOnly = process.argv.includes("--listed-only");
const fullImageMaxSize = 2200;
const fullJpegQuality = 84;
const fullWebpQuality = 82;
const thumbMaxSize = 720;
const thumbJpegQuality = 74;
const thumbWebpQuality = 70;
const categories = new Set([
  "Portrety",
  "Sesje dla par",
  "Uroczystości",
  "Eventy",
  "Motoryzacja",
  "Podróże",
  "Event i reportaż"
]);
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".tif", ".tiff"]);

function run(command, args) {
  return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function hasCommand(command) {
  try {
    execFileSync("sh", ["-lc", `command -v ${command}`], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function titleize(value) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function readMetadata() {
  if (!existsSync(metadataPath)) {
    return new Map();
  }

  const raw = JSON.parse(readFileSync(metadataPath, "utf8"));
  if (!Array.isArray(raw)) {
    throw new Error("content/gallery-source/gallery.json musi być tablicą obiektów.");
  }

  return new Map(raw.map((item) => [String(item.file), item]));
}

function imageSize(filePath) {
  const output = run("sips", ["-g", "pixelWidth", "-g", "pixelHeight", filePath]);
  const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1]);

  if (!width || !height) {
    throw new Error(`Nie udało się odczytać wymiarów: ${filePath}`);
  }

  return { width, height };
}

function convertJpeg(inputPath, outputPath, maxSize, quality) {
  if (hasCommand("magick")) {
    run("magick", [
      inputPath,
      "-auto-orient",
      "-resize",
      `${maxSize}x${maxSize}>`,
      "-strip",
      "-interlace",
      "Plane",
      "-quality",
      String(quality),
      outputPath
    ]);
    return;
  }

  run("sips", ["-Z", String(maxSize), "-s", "format", "jpeg", inputPath, "--out", outputPath]);
}

function convertWebp(inputPath, outputPath, quality) {
  run("cwebp", ["-quiet", "-metadata", "none", "-q", String(quality), inputPath, "-o", outputPath]);
}

function normalizeCategory(category) {
  if (typeof category === "string" && categories.has(category)) {
    return category;
  }

  return "Portrety";
}

function metadataOrder(file, metadata) {
  const order = Number(metadata.get(file)?.order);
  return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
}

function cleanOutputDir() {
  for (const file of readdirSync(outputDir)) {
    if (/\.(jpe?g|webp)$/i.test(file)) {
      unlinkSync(path.join(outputDir, file));
    }
  }
}

function main() {
  if (!existsSync(sourceDir)) {
    mkdirSync(sourceDir, { recursive: true });
  }

  mkdirSync(outputDir, { recursive: true });

  const metadata = readMetadata();
  const canWriteWebp = hasCommand("cwebp");
  const sourceFiles = readdirSync(sourceDir)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .filter((file) => !listedOnly || metadata.has(file))
    .sort((a, b) => metadataOrder(a, metadata) - metadataOrder(b, metadata) || a.localeCompare(b, "pl"));

  if (sourceFiles.length === 0) {
    console.log("Brak zdjęć w content/gallery-source. Dodaj eksporty z Lightrooma i uruchom ponownie.");
    return;
  }

  cleanOutputDir();

  const manifest = sourceFiles.map((file, index) => {
    const inputPath = path.join(sourceDir, file);
    const meta = metadata.get(file) ?? {};
    const title = typeof meta.title === "string" && meta.title.trim() ? meta.title.trim() : titleize(file);
    const slug = slugify(`${String(index + 1).padStart(3, "0")}-${title}`);
    const jpegFile = `${slug}.jpg`;
    const webpFile = `${slug}.webp`;
    const thumbJpegFile = `${slug}-thumb.jpg`;
    const thumbWebpFile = `${slug}-thumb.webp`;
    const jpegPath = path.join(outputDir, jpegFile);
    const webpPath = path.join(outputDir, webpFile);
    const thumbJpegPath = path.join(outputDir, thumbJpegFile);
    const thumbWebpPath = path.join(outputDir, thumbWebpFile);

    convertJpeg(inputPath, jpegPath, fullImageMaxSize, fullJpegQuality);
    convertJpeg(inputPath, thumbJpegPath, thumbMaxSize, thumbJpegQuality);

    if (canWriteWebp) {
      convertWebp(jpegPath, webpPath, fullWebpQuality);
      convertWebp(thumbJpegPath, thumbWebpPath, thumbWebpQuality);
      unlinkSync(thumbJpegPath);
    }

    const { width, height } = imageSize(jpegPath);

    return {
      src: `/portfolio/gallery/${canWriteWebp ? webpFile : jpegFile}`,
      thumb: `/portfolio/gallery/${canWriteWebp ? thumbWebpFile : thumbJpegFile}`,
      jpeg: `/portfolio/gallery/${jpegFile}`,
      title,
      alt:
        typeof meta.alt === "string" && meta.alt.trim()
          ? meta.alt.trim()
          : `${title} - Janiczek Foto`,
      category: normalizeCategory(meta.category),
      featured: Boolean(meta.featured),
      width,
      height
    };
  });

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Gotowe: ${manifest.length} zdjęć zapisanych w ${path.relative(rootDir, manifestPath)}.`);
}

main();
