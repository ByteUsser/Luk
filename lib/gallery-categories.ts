export const GALLERY_CATEGORY_DEFINITIONS = [
  {
    name: "Portrety",
    label: "Portrety",
    slug: "portrety",
    eyebrow: "Naturalny portret",
    heading: "Portrety",
    portfolioGroup: "services",
    metaTitle: "Fotografia portretowa Bochnia",
    description:
      "Naturalne portrety w Bochni i okolicy — w plenerze, mieście i miękkim świetle wnętrz. Bez sztywnego pozowania, z uwagą na emocje i charakter osoby.",
    intro: "Naturalne portrety w Bochni i okolicy — spokojnie, bez sztywnego pozowania.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Portrety pojawią się tutaj automatycznie."
  },
  {
    name: "Sesje dla par",
    label: "Pary",
    slug: "sesje-dla-par",
    eyebrow: "Bliskość i swoboda",
    heading: "Sesje dla par",
    portfolioGroup: "services",
    metaTitle: "Sesje dla par Bochnia",
    description:
      "Swobodne sesje dla par oparte na ruchu, rozmowie i prawdziwej bliskości. Fotografuję w Bochni, okolicach i miejscach, które dobrze pasują do Waszego pomysłu.",
    intro: "Swobodne sesje dla par w Bochni i okolicy, oparte na ruchu i bliskości.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Sesje dla par pojawią się tutaj automatycznie."
  },
  {
    name: "Uroczystości",
    label: "Uroczystości",
    slug: "uroczystosci",
    eyebrow: "Ślub, chrzest i komunia",
    heading: "Uroczystości",
    portfolioGroup: "services",
    metaTitle: "Fotografia uroczystości Bochnia",
    description:
      "Śluby, chrzty, komunie i rodzinne uroczystości w Bochni i okolicy — ceremonia, bliscy oraz detale, które tworzą pełną historię dnia.",
    intro: "Śluby, chrzty, komunie i rodzinne uroczystości fotografowane naturalnie w Bochni i okolicy.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Uroczystości pojawią się tutaj automatycznie."
  },
  {
    name: "Eventy",
    label: "Eventy",
    slug: "eventy",
    eyebrow: "Ludzie, światło i energia",
    heading: "Eventy",
    portfolioGroup: "services",
    metaTitle: "Fotografia eventowa Bochnia",
    description:
      "Fotografia eventowa w Bochni i Małopolsce — najważniejsze momenty, goście, detale i atmosfera bez zatrzymywania przebiegu wydarzenia.",
    intro: "Fotografia eventowa w Bochni i Małopolsce — ludzie, momenty i atmosfera wydarzenia.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Eventy pojawią się tutaj automatycznie."
  },
  {
    name: "Motoryzacja",
    label: "Motoryzacja",
    slug: "motoryzacja",
    eyebrow: "Forma, detal i światło",
    heading: "Motoryzacja",
    portfolioGroup: "personal",
    metaTitle: "Fotografia motoryzacyjna",
    description:
      "Samochody fotografowane z naciskiem na linię nadwozia, detal i otoczenie. Kadry statyczne, lifestyle i materiały przygotowane do publikacji w internecie.",
    intro: "Samochody fotografowane z naciskiem na linię nadwozia, detal i otoczenie.",
    emptyMessage:
      "Ta część portfolio czeka na pierwszą publikację. Zdjęcia przypisane w Sanity do kategorii Motoryzacja pojawią się tutaj automatycznie."
  },
  {
    name: "Podróże",
    label: "Podróże",
    slug: "podroze",
    eyebrow: "Miejsca i światło",
    heading: "Podróże",
    portfolioGroup: "personal",
    metaTitle: "Fotografia podróżnicza",
    description:
      "Kadry z drogi, architektura i krajobraz. Miejsca pokazane naturalnie, z wyczuciem światła, rytmu i detalu.",
    intro: "Kadry z drogi, architektura i krajobraz pokazane z wyczuciem światła.",
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
