import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-01" });

const updates = new Map([
  [
    "031-portret-na-imprezie",
    {
      title: "Portret na imprezie",
      alt: "Naturalny portret kobiety podczas wieczornego wydarzenia - Janiczek Foto"
    }
  ],
  [
    "035-chwila-na-imprezie",
    {
      title: "Spontaniczny portret",
      alt: "Spontaniczny portret kobiety podczas wieczornej imprezy - Janiczek Foto"
    }
  ],
  [
    "040-wieczorny-reportaz",
    {
      title: "Wieczorny portret",
      alt: "Swobodny portret kobiety podczas wieczornego wydarzenia - Janiczek Foto"
    }
  ]
]);

const document = await client.fetch(
  `*[_id == "siteContent"][0]{_rev, gallery}`
);

if (!document?._rev || !Array.isArray(document.gallery)) {
  throw new Error("Nie znaleziono opublikowanej galerii siteContent.");
}

const foundKeys = new Set();
const gallery = document.gallery.map((photo) => {
  const update = updates.get(photo?._key);
  if (!update) return photo;

  foundKeys.add(photo._key);
  return {
    ...photo,
    ...update,
    category: "Portrety"
  };
});

const missingKeys = [...updates.keys()].filter((key) => !foundKeys.has(key));
if (missingKeys.length) {
  throw new Error(`Brakuje zdjęć w Sanity: ${missingKeys.join(", ")}`);
}

await client
  .patch("siteContent")
  .ifRevisionId(document._rev)
  .set({ gallery })
  .commit();

console.log(`Zmieniono kategorię na Portrety dla ${foundKeys.size} zdjęć.`);
