export type LocationLanding = {
  slug: string;
  name: string;
  regionLabel: string;
  lead: string;
  metaDescription: string;
  serviceSummary: string;
  placeSummary: string;
  travelSummary: string;
  portfolioImage: {
    src: string;
    alt: string;
  };
  nearbySlugs: string[];
};

export const LOCATION_LANDINGS: LocationLanding[] = [
  {
    slug: "bochnia",
    name: "Bochnia",
    regionLabel: "powiat bocheński",
    lead: "Fotografuję portrety, pary i rodzinne uroczystości w Bochni oraz blisko miasta.",
    metaDescription: "Fotograf Bochnia: naturalne portrety, sesje par, uroczystości i reportaże. Zobacz zdjęcia, cennik i zapytaj o wolny termin.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości rodzinne i reportaże.",
    placeSummary: "Miasto, dom albo plener blisko Bochni — wybieramy miejsce, w którym czujesz się swobodnie.",
    travelSummary: "W Bochni i najbliższej okolicy dojazd zazwyczaj jest w cenie.",
    portfolioImage: {
      src: "/portfolio/gallery/052-lekkosc-w-lawendzie.webp",
      alt: "Kobieta podczas swobodnej sesji plenerowej w lawendzie — Janiczek Foto"
    },
    nearbySlugs: ["trzciana", "nowy-wisnicz", "zegocina"]
  },
  {
    slug: "powiat-bochenski",
    name: "Powiat Bocheński",
    regionLabel: "okolice Bochni",
    lead: "Dojeżdżam na sesje i uroczystości w całym powiecie bocheńskim.",
    metaDescription: "Fotograf w powiecie bocheńskim: portrety, sesje par, uroczystości i wydarzenia z dojazdem. Zobacz zdjęcia i zapytaj o termin.",
    serviceSummary: "Portrety, zdjęcia par, rodzinne uroczystości i wydarzenia.",
    placeSummary: "Możemy spotkać się u Ciebie albo wybrać prosty plener niedaleko Twojej miejscowości.",
    travelSummary: "Godzinę i ewentualny koszt dojazdu ustalamy przy umawianiu terminu.",
    portfolioImage: {
      src: "/portfolio/gallery/006-portret-przy-drzwiach.webp",
      alt: "Kobiecy portret w ciepłym świetle przy drewnianych drzwiach — Janiczek Foto"
    },
    nearbySlugs: ["bochnia", "trzciana", "nowy-wisnicz", "zegocina"]
  },
  {
    slug: "trzciana",
    name: "Trzciana",
    regionLabel: "powiat bocheński",
    lead: "Do Trzciany i okolic dojeżdżam na portrety, sesje par i rodzinne uroczystości.",
    metaDescription: "Fotograf Trzciana: naturalne portrety, sesje par i rodzinne uroczystości z dojazdem. Zobacz zdjęcia, cennik i zapytaj o termin.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości rodzinne i reportaże.",
    placeSummary: "Sesję możemy zrobić w domu, ogrodzie albo w spokojnym plenerze wybranym wspólnie przed zdjęciami.",
    travelSummary: "Dojazd z Bochni i ewentualny koszt potwierdzam przed rezerwacją.",
    portfolioImage: {
      src: "/portfolio/gallery/020-portret-na-pomoscie.webp",
      alt: "Swobodny kobiecy portret na pomoście nad wodą — Janiczek Foto"
    },
    nearbySlugs: ["bochnia", "powiat-bochenski", "zegocina"]
  },
  {
    slug: "nowy-wisnicz",
    name: "Nowy Wiśnicz",
    regionLabel: "powiat bocheński",
    lead: "Do Nowego Wiśnicza dojeżdżam na portrety, zdjęcia par i rodzinne uroczystości.",
    metaDescription: "Fotograf Nowy Wiśnicz: naturalne portrety, sesje par i rodzinne uroczystości z dojazdem. Zobacz zdjęcia i zapytaj o termin.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości rodzinne i reportaże.",
    placeSummary: "Miejsce ustalamy przed sesją — może to być dom, ogród albo prosty plener w okolicy.",
    travelSummary: "Dojazd z Bochni i ewentualny koszt potwierdzam przed rezerwacją.",
    portfolioImage: {
      src: "/portfolio/gallery/001-wiosenny-portret.webp",
      alt: "Naturalny portret kobiety wśród kwitnących drzew — Janiczek Foto"
    },
    nearbySlugs: ["bochnia", "powiat-bochenski", "trzciana"]
  },
  {
    slug: "zegocina",
    name: "Żegocina",
    regionLabel: "powiat bocheński",
    lead: "Do Żegociny i okolic dojeżdżam na portrety, sesje par i rodzinne uroczystości.",
    metaDescription: "Fotograf Żegocina: naturalne portrety, sesje par i rodzinne uroczystości z dojazdem. Zobacz zdjęcia, cennik i zapytaj o termin.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości rodzinne i reportaże.",
    placeSummary: "Miejsce wybieramy wspólnie, zależnie od charakteru zdjęć i warunków w dniu sesji.",
    travelSummary: "Dojazd z Bochni i ewentualny koszt potwierdzam przed rezerwacją.",
    portfolioImage: {
      src: "/portfolio/gallery/051-bliskosc-w-lawendzie.webp",
      alt: "Dłonie pary splecione podczas sesji wśród lawendy — Janiczek Foto"
    },
    nearbySlugs: ["bochnia", "powiat-bochenski", "trzciana"]
  },
  {
    slug: "krakow",
    name: "Kraków",
    regionLabel: "Małopolska",
    lead: "Do Krakowa przyjeżdżam na portrety, zdjęcia par i reportaże.",
    metaDescription: "Portrety, sesje par i reportaże w Krakowie po wcześniejszym ustaleniu terminu oraz kosztu dojazdu z Bochni.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości i reportaże z wydarzeń.",
    placeSummary: "Termin planujemy tak, żeby uniknąć największego tłoku i dobrze wykorzystać światło.",
    travelSummary: "Dojazd z Bochni wyceniam osobno.",
    portfolioImage: {
      src: "/portfolio/gallery/038-portret-z-kwiatami.webp",
      alt: "Kobiecy portret z bukietem jasnych kwiatów — Janiczek Foto"
    },
    nearbySlugs: ["bochnia", "powiat-bochenski"]
  },
  {
    slug: "tarnow",
    name: "Tarnów",
    regionLabel: "Małopolska",
    lead: "W Tarnowie fotografuję portrety, pary, uroczystości i wydarzenia.",
    metaDescription: "Portrety, sesje par, uroczystości i reportaże w Tarnowie po wcześniejszym ustaleniu terminu oraz kosztu dojazdu z Bochni.",
    serviceSummary: "Portrety, zdjęcia par, uroczystości rodzinne i reportaże.",
    placeSummary: "Miejsce i godzinę dobieramy do rodzaju zdjęć oraz światła.",
    travelSummary: "Dojazd z Bochni wyceniam osobno.",
    portfolioImage: {
      src: "/portfolio/gallery/029-portret-o-zachodzie.webp",
      alt: "Kobiecy portret nad wodą o zachodzie słońca — Janiczek Foto"
    },
    nearbySlugs: ["bochnia", "powiat-bochenski"]
  }
];

export const PRIMARY_LOCATIONS = LOCATION_LANDINGS.filter((location) =>
  ["bochnia", "powiat-bochenski", "trzciana", "nowy-wisnicz", "zegocina"].includes(location.slug)
);

// Indeksujemy tylko lokalizacje zgodne z aktualnym kierunkiem biznesowym.
export const SEARCH_INDEXABLE_LOCATION_SLUGS = [
  "bochnia",
  "powiat-bochenski",
  "trzciana",
  "nowy-wisnicz",
  "zegocina"
] as const;

export function isSearchIndexableLocation(slug: string): boolean {
  return SEARCH_INDEXABLE_LOCATION_SLUGS.includes(
    slug as (typeof SEARCH_INDEXABLE_LOCATION_SLUGS)[number]
  );
}

export function findLocationBySlug(slug: string): LocationLanding | undefined {
  return LOCATION_LANDINGS.find((location) => location.slug === slug);
}

export function findLocationByPathname(pathname: string): LocationLanding | undefined {
  const match = pathname.match(/^\/fotograf\/([^/]+)\/?$/);
  if (!match) {
    return undefined;
  }

  try {
    return findLocationBySlug(decodeURIComponent(match[1]));
  } catch {
    return undefined;
  }
}
