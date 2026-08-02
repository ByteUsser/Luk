export type LocationLanding = {
  slug: string;
  name: string;
  regionLabel: string;
  lead: string;
  serviceSummary: string;
  placeSummary: string;
  travelSummary: string;
  nearbySlugs: string[];
};

export const LOCATION_LANDINGS: LocationLanding[] = [
  {
    slug: "bochnia",
    name: "Bochnia",
    regionLabel: "powiat bocheński",
    lead: "Fotografuję portrety, pary i rodzinne uroczystości w Bochni oraz blisko miasta.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości rodzinne i reportaże.",
    placeSummary: "Miasto, dom albo plener blisko Bochni — wybieramy miejsce, w którym czujesz się swobodnie.",
    travelSummary: "W Bochni i najbliższej okolicy dojazd zazwyczaj jest w cenie.",
    nearbySlugs: ["trzciana", "nowy-wisnicz", "powiat-bochenski"]
  },
  {
    slug: "powiat-bochenski",
    name: "Powiat Bocheński",
    regionLabel: "okolice Bochni",
    lead: "Dojeżdżam na sesje i uroczystości w całym powiecie bocheńskim.",
    serviceSummary: "Portrety, zdjęcia par, rodzinne uroczystości i wydarzenia.",
    placeSummary: "Możemy spotkać się u Ciebie albo wybrać prosty plener niedaleko Twojej miejscowości.",
    travelSummary: "Godzinę i ewentualny koszt dojazdu ustalamy przy umawianiu terminu.",
    nearbySlugs: ["bochnia", "trzciana", "nowy-wisnicz"]
  },
  {
    slug: "trzciana",
    name: "Trzciana",
    regionLabel: "powiat bocheński",
    lead: "Do Trzciany i okolic dojeżdżam na portrety, sesje par i rodzinne uroczystości.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości rodzinne i reportaże.",
    placeSummary: "Sesję możemy zrobić w domu, ogrodzie albo w spokojnym plenerze wybranym wspólnie przed zdjęciami.",
    travelSummary: "Dojazd z Bochni i ewentualny koszt potwierdzam przed rezerwacją.",
    nearbySlugs: ["bochnia", "powiat-bochenski", "nowy-wisnicz"]
  },
  {
    slug: "nowy-wisnicz",
    name: "Nowy Wiśnicz",
    regionLabel: "powiat bocheński",
    lead: "Do Nowego Wiśnicza dojeżdżam na portrety, zdjęcia par i rodzinne uroczystości.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości rodzinne i reportaże.",
    placeSummary: "Miejsce ustalamy przed sesją — może to być dom, ogród albo prosty plener w okolicy.",
    travelSummary: "Dojazd z Bochni i ewentualny koszt potwierdzam przed rezerwacją.",
    nearbySlugs: ["bochnia", "powiat-bochenski", "trzciana"]
  },
  {
    slug: "krakow",
    name: "Kraków",
    regionLabel: "Małopolska",
    lead: "Do Krakowa przyjeżdżam na portrety, zdjęcia par i reportaże.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości i reportaże z wydarzeń.",
    placeSummary: "Termin planujemy tak, żeby uniknąć największego tłoku i dobrze wykorzystać światło.",
    travelSummary: "Dojazd z Bochni wyceniam osobno.",
    nearbySlugs: ["bochnia", "tarnow", "powiat-bochenski"]
  },
  {
    slug: "tarnow",
    name: "Tarnów",
    regionLabel: "Małopolska",
    lead: "W Tarnowie fotografuję portrety, pary, uroczystości i wydarzenia.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości rodzinne i reportaże.",
    placeSummary: "Miejsce i godzinę dobieramy do rodzaju zdjęć oraz światła.",
    travelSummary: "Dojazd z Bochni wyceniam osobno.",
    nearbySlugs: ["bochnia", "krakow", "powiat-bochenski"]
  }
];

export const PRIMARY_LOCATIONS = LOCATION_LANDINGS.filter((location) =>
  ["bochnia", "powiat-bochenski", "trzciana", "nowy-wisnicz", "krakow", "tarnow"].includes(location.slug)
);

// Indeksujemy tylko lokalizacje zgodne z aktualnym kierunkiem biznesowym.
export const SEARCH_INDEXABLE_LOCATION_SLUGS = [
  "bochnia",
  "powiat-bochenski",
  "trzciana",
  "nowy-wisnicz",
  "krakow",
  "tarnow"
] as const;

export function isSearchIndexableLocation(slug: string): boolean {
  return SEARCH_INDEXABLE_LOCATION_SLUGS.includes(
    slug as (typeof SEARCH_INDEXABLE_LOCATION_SLUGS)[number]
  );
}

export function findLocationBySlug(slug: string): LocationLanding | undefined {
  return LOCATION_LANDINGS.find((location) => location.slug === slug);
}
