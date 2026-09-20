import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

function reportSafeError(error) {
  console.error(
    JSON.stringify({
      status: "error",
      code: typeof error?.code === "string" ? error.code : undefined,
      message: error instanceof Error ? error.message : "Nieznany błąd publikacji."
    })
  );
  process.exit(1);
}

process.on("uncaughtException", reportSafeError);
process.on("unhandledRejection", reportSafeError);

const allowedCategories = new Set([
  "Portrety",
  "Sesje dla par",
  "Śluby",
  "Uroczystości",
  "Eventy",
  "Motoryzacja",
  "Podróże"
]);

function option(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function stableKey(value) {
  return value
    .replace(/^.*\//, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .slice(0, 90);
}

const filePath = path.resolve(option("file") || "");
const title = option("title")?.trim();
const alt = option("alt")?.trim();
const category = option("category")?.trim();
const commit = process.argv.includes("--commit");

if (!filePath || !existsSync(filePath)) throw new Error(`Brak pliku: ${filePath}`);
if (!title || title.length > 70) throw new Error("Tytuł musi mieć od 1 do 70 znaków.");
if (!alt || alt.length < 10 || alt.length > 180) {
  throw new Error("Opis alternatywny musi mieć od 10 do 180 znaków.");
}
if (!allowedCategories.has(category)) throw new Error(`Nieprawidłowa kategoria: ${category}`);

const client = getCliClient({ apiVersion: "2026-07-01" });
const filename = `janiczekfoto-${path.basename(filePath)}`;
const key = stableKey(filename);
const document = await client.fetch(
  `*[_id == "siteContent"][0]{_id, _rev, gallery[]{_key, title, image{asset->{_id, url, originalFilename}}}}`
);

if (!document?._id || !document?._rev) throw new Error("Brak dokumentu siteContent w Sanity.");

const existingPhoto = document.gallery?.find(
  (photo) => photo?._key === key || photo?.image?.asset?.originalFilename === filename
);

if (existingPhoto) {
  console.log(JSON.stringify({ status: "already-published", key, photo: existingPhoto }, null, 2));
  process.exit(0);
}

if (!commit) {
  console.log(
    JSON.stringify(
      {
        status: "dry-run",
        documentRevision: document._rev,
        galleryCount: document.gallery?.length || 0,
        filename,
        key,
        title,
        alt,
        category,
        placement: "gallery[0]"
      },
      null,
      2
    )
  );
  process.exit(0);
}

let asset = await client.fetch(
  `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id, url, originalFilename}`,
  { filename }
);

if (!asset?._id) {
  asset = await client.assets.upload("image", createReadStream(filePath), { filename });
}

const photo = {
  _key: key,
  _type: "managedPhoto",
  image: {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id }
  },
  title,
  alt,
  category,
  visible: true
};

let patch = client.patch(document._id).ifRevisionId(document._rev).setIfMissing({ gallery: [] });
patch = document.gallery?.length
  ? patch.insert("before", "gallery[0]", [photo])
  : patch.append("gallery", [photo]);

const result = await patch.commit();

console.log(
  JSON.stringify(
    {
      status: "published",
      documentId: result._id,
      documentRevision: result._rev,
      assetId: asset._id,
      assetUrl: asset.url,
      filename,
      key,
      title,
      alt,
      category,
      placement: "gallery[0]"
    },
    null,
    2
  )
);
