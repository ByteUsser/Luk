import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

function optionValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function safeSlug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function run(args) {
  execFileSync("ffmpeg", args, { stdio: "inherit" });
}

const inputValue = optionValue("--input");
const slug = safeSlug(optionValue("--slug") || "");
const outputDir = path.resolve(optionValue("--output") || "/tmp/janiczek-video-web");
const previewStart = Number(optionValue("--start") || 0);
const previewDuration = Number(optionValue("--duration") || 10);

if (!inputValue) fail("Podaj plik: --input /sciezka/do/filmu.mp4");
if (!slug) fail("Podaj nazwę techniczną: --slug nazwa-filmu");
if (!Number.isFinite(previewStart) || previewStart < 0) fail("--start musi być liczbą równą lub większą od 0.");
if (!Number.isFinite(previewDuration) || previewDuration < 4 || previewDuration > 15) {
  fail("--duration musi mieścić się między 4 a 15 sekund.");
}

const inputPath = path.resolve(inputValue);
if (!existsSync(inputPath)) fail(`Nie znaleziono pliku: ${inputPath}`);

mkdirSync(outputDir, { recursive: true });

const fullPath = path.join(outputDir, `${slug}-full.mp4`);
const previewPath = path.join(outputDir, `${slug}-preview.mp4`);
const posterPath = path.join(outputDir, `${slug}-poster.jpg`);

for (const outputPath of [fullPath, previewPath, posterPath]) {
  if (existsSync(outputPath)) {
    fail(`Plik już istnieje — niczego nie nadpisuję: ${outputPath}`);
  }
}

run([
  "-hide_banner", "-loglevel", "warning", "-n", "-i", inputPath,
  "-map", "0:v:0", "-map", "0:a?",
  "-vf", "scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
  "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p",
  "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", fullPath
]);

run([
  "-hide_banner", "-loglevel", "warning", "-n", "-ss", String(previewStart), "-i", inputPath,
  "-t", String(previewDuration),
  "-vf", "scale=540:960:force_original_aspect_ratio=increase,crop=540:960,fps=30",
  "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "24", "-pix_fmt", "yuv420p",
  "-movflags", "+faststart", previewPath
]);

run([
  "-hide_banner", "-loglevel", "warning", "-n", "-ss", String(previewStart), "-i", inputPath,
  "-frames:v", "1",
  "-vf", "scale=540:960:force_original_aspect_ratio=increase,crop=540:960",
  "-q:v", "3", "-update", "1", posterPath
]);

console.log("Gotowe pliki do panelu Sanity:");
console.log(`- pełny film: ${fullPath}`);
console.log(`- lekki podgląd: ${previewPath}`);
console.log(`- miniatura: ${posterPath}`);
