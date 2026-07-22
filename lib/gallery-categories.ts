export const GALLERY_CATEGORY_DEFINITIONS = [
  {
    name: "Portrety",
    label: "Portrety",
    slug: "portrety",
    eyebrow: "Naturalny portret",
    heading: "Portrety",
    metaTitle: "Fotografia portretowa Bochnia",
    description:
      "Naturalne portrety w spokojnej atmosferze — w plenerze, mieście i miękkim świetle wnętrz. Bez sztywnego pozowania, z uwagą na emocje i charakter osoby.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Portrety pojawią się tutaj automatycznie."
  },
  {
    name: "Sesje dla par",
    label: "Pary",
    slug: "sesje-dla-par",
    eyebrow: "Bliskość i swoboda",
    heading: "Sesje dla par",
    metaTitle: "Sesje dla par Bochnia",
    description:
      "Swobodne sesje dla par oparte na ruchu, rozmowie i prawdziwej bliskości. Fotografuję w Bochni, okolicach i miejscach, które dobrze pasują do Waszego pomysłu.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Sesje dla par pojawią się tutaj automatycznie."
  },
  {
    name: "Uroczystości",
    label: "Uroczystości",
    slug: "uroczystosci",
    eyebrow: "Ślub, chrzest i komunia",
    heading: "Uroczystości",
    metaTitle: "Fotografia uroczystości Bochnia",
    description:
      "Śluby, chrzty, komunie i rodzinne uroczystości — ceremonia, bliscy oraz detale, które tworzą pełną historię dnia.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Uroczystości pojawią się tutaj automatycznie."
  },
  {
    name: "Eventy",
    label: "Eventy",
    slug: "eventy",
    eyebrow: "Ludzie, światło i energia",
    heading: "Eventy",
    metaTitle: "Fotografia eventowa Bochnia",
    description:
      "Reportaż z imprez i wydarzeń — najważniejsze momenty, goście, detale i atmosfera bez zatrzymywania przebiegu wydarzenia.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Eventy pojawią się tutaj automatycznie."
  },
  {
    name: "Event i reportaż",
    label: "Reportaż",
    slug: "event-i-reportaz",
    eyebrow: "Prawdziwy przebieg wydarzeń",
    heading: "Event i reportaż",
    metaTitle: "Fotografia eventowa i reportażowa Bochnia",
    description:
      "Reportaż z uroczystości, wydarzeń i spotkań — ważne momenty, detale i atmosfera pokazane w spójnej, naturalnej historii.",
    emptyMessage: "Ta kategoria została podzielona na Uroczystości i Eventy.",
    navigation: false
  },
  {
    name: "Motoryzacja",
    label: "Motoryzacja",
    slug: "motoryzacja",
    eyebrow: "Forma, detal i światło",
    heading: "Motoryzacja",
    metaTitle: "Fotografia motoryzacyjna",
    description:
      "Samochody fotografowane z naciskiem na linię nadwozia, detal i otoczenie. Kadry statyczne, lifestyle i materiały przygotowane do publikacji w internecie.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Motoryzacja pojawią się tutaj automatycznie."
  },
  {
    name: "Podróże",
    label: "Podróże",
    slug: "podroze",
    eyebrow: "Miejsca i światło",
    heading: "Podróże",
    metaTitle: "Fotografia podróżnicza",
    description:
      "Kadry z drogi, architektura i krajobraz. Miejsca pokazane naturalnie, z wyczuciem światła, rytmu i detalu.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Podróże pojawią się tutaj automatycznie."
  }
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORY_DEFINITIONS)[number]["name"];
export type GalleryCategorySlug = (typeof GALLERY_CATEGORY_DEFINITIONS)[number]["slug"];
export type GalleryCategoryDefinition = (typeof GALLERY_CATEGORY_DEFINITIONS)[number];

export const GALLERY_CATEGORIES: GalleryCategory[] = GALLERY_CATEGORY_DEFINITIONS.map(
  (category) => category.name
);

export function findGalleryCategoryBySlug(slug: string) {
  return GALLERY_CATEGORY_DEFINITIONS.find((category) => category.slug === slug);
}

export function galleryCategoryHref(slug: GalleryCategorySlug) {
  return `/galeria-zdjec/${slug}`;
}
