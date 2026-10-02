import type { GalleryCategory } from "@/lib/gallery-categories";

export const SERVICE_STARTING_PRICES = {
  Portrety: "od 300 zł",
  "Sesje dla par": "od 350 zł",
  Śluby: "od 3 200 zł",
  Uroczystości: "od 550 zł",
  Eventy: "od 600 zł"
} as const satisfies Partial<Record<GalleryCategory, string>>;
