import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const exportDir = process.env.JANICZEK_VIDEO_EXPORT_DIR || "/tmp/janiczek-video-web";
const client = getCliClient({ apiVersion: "2026-07-01" });

const videos = [
  {
    key: "fotoksiazka",
    title: "Fotoksiążka",
    label: "Po sesji",
    video: "fotoksiazka-full.mp4",
    preview: "fotoksiazka-preview.mp4",
    poster: "fotoksiazka-poster.jpg"
  },
  {
    key: "event",
    title: "Na parkiecie",
    label: "Reportaż",
    video: "event-full.mp4",
    preview: "event-preview.mp4",
    poster: "event-poster.jpg"
  },
  {
    key: "sesja-plenerowa",
    title: "Sesja plenerowa",
    label: "Backstage",
    video: "sesja-plenerowa-full.mp4",
    preview: "sesja-plenerowa-preview.mp4",
    poster: "sesja-plenerowa-poster.jpg"
  }
];

function requiredFile(filename) {
  const filePath = path.join(exportDir, filename);
  if (!existsSync(filePath)) throw new Error(`Brak przygotowanego pliku: ${filePath}`);
  return filePath;
}

async function uploadOnce(type, filename) {
  const filePath = requiredFile(filename);
  const remoteFilename = `janiczekfoto-${filename}`;
  const assetType = type === "image" ? "sanity.imageAsset" : "sanity.fileAsset";
  const existingId = await client.fetch(
    `*[_type == $assetType && originalFilename == $filename][0]._id`,
    { assetType, filename: remoteFilename }
  );

  if (existingId) {
    console.log(`Pomijam istniejący plik: ${remoteFilename}`);
    return existingId;
  }

  console.log(`Wysyłam: ${remoteFilename}`);
  const asset = await client.assets.upload(type, createReadStream(filePath), {
    filename: remoteFilename,
    contentType: type === "image" ? "image/jpeg" : "video/mp4"
  });
  return asset._id;
}

async function main() {
  const document = await client.fetch(
    `*[_type == "siteContent" && _id == "siteContent"][0]{_id, homepageVideos}`
  );
  if (!document?._id) throw new Error("Brak dokumentu siteContent w Sanity.");

  if (Array.isArray(document.homepageVideos) && document.homepageVideos.length && !process.argv.includes("--force")) {
    console.log("Lista filmów jest już ustawiona. Import pominięty, aby nie nadpisać zmian z panelu.");
    return;
  }

  const homepageVideos = [];
  for (const item of videos) {
    const videoAssetId = await uploadOnce("file", item.video);
    const previewAssetId = await uploadOnce("file", item.preview);
    const posterAssetId = await uploadOnce("image", item.poster);

    homepageVideos.push({
      _key: item.key,
      _type: "managedVideo",
      title: item.title,
      label: item.label,
      visible: true,
      video: {
        _type: "file",
        asset: { _type: "reference", _ref: videoAssetId }
      },
      preview: {
        _type: "file",
        asset: { _type: "reference", _ref: previewAssetId }
      },
      poster: {
        _type: "image",
        asset: { _type: "reference", _ref: posterAssetId }
      }
    });
  }

  await client.patch("siteContent").set({ homepageVideos }).commit();
  console.log(`Gotowe: dodano ${homepageVideos.length} filmy do strony głównej.`);
}

await main();
