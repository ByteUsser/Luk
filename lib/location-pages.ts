export type LocationLanding = {
  slug: string;
  name: string;
  regionLabel: string;
  lead: string;
  sessionSpots: string[];
  bestLight: string;
  nearbySlugs: string[];
};

export const LOCATION_LANDINGS: LocationLanding[] = [
  {
    slug: "bochnia",
    name: "Bochnia",
    regionLabel: "powiat bocheński",
    lead: "Bochnia daje mieszankę miejskich kadrów i spokojnych zielonych miejsc, idealnych na naturalną sesję.",
    sessionSpots: ["okolice rynku i starej zabudowy", "kameralne alejki i parki", "otwarte kadry poza centrum o zachodzie"],
    bestLight: "Najczęściej planuję sesje w złotej godzinie, tuż przed zachodem słońca.",
    nearbySlugs: ["nowy-wisnicz", "krolowka", "lapanow"]
  },
  {
    slug: "powiat-bochenski",
    name: "Powiat Bocheński",
    regionLabel: "Małopolska",
    lead: "W całym powiecie bocheńskim łatwo znaleźć plener dopasowany do stylu sesji: miejski, rustykalny albo leśny.",
    sessionSpots: ["lokalne miejscowości z kameralną zabudową", "tereny zielone i leśne ścieżki", "otwarte przestrzenie z miękkim światłem"],
    bestLight: "W plenerze najlepiej sprawdzają się godziny poranne lub późne popołudnie.",
    nearbySlugs: ["bochnia", "trzciana", "zegocina"]
  },
  {
    slug: "nowy-wisnicz",
    name: "Nowy Wiśnicz",
    regionLabel: "powiat bocheński",
    lead: "Nowy Wiśnicz świetnie sprawdza się do klimatycznych ujęć z historycznym tłem i spokojnym tempem pracy.",
    sessionSpots: ["okolice starej zabudowy", "kameralne uliczki i place", "plener poza centrum z naturalnym światłem"],
    bestLight: "Najładniejsze efekty dają sesje popołudniowe z ciepłym światłem.",
    nearbySlugs: ["bochnia", "krolowka", "trzciana"]
  },
  {
    slug: "krolowka",
    name: "Królówka",
    regionLabel: "powiat bocheński",
    lead: "Królówka to dobra lokalizacja na spokojne sesje lifestyle i portretowe bez miejskiego pośpiechu.",
    sessionSpots: ["lokalne drogi i naturalne tło", "łąki i pola z dużą przestrzenią", "leśne fragmenty dające miękki kontrast"],
    bestLight: "W Królówce dobrze działa łagodne światło poranne i zachód słońca.",
    nearbySlugs: ["nowy-wisnicz", "bochnia", "lapanow"]
  },
  {
    slug: "trzciana",
    name: "Trzciana",
    regionLabel: "powiat bocheński",
    lead: "Trzciana daje naturalne plenery i spokojną atmosferę, która pomaga przełamać stres przed aparatem.",
    sessionSpots: ["otwarte plenery z widokiem", "leśne i półleśne ścieżki", "lokalne, mniej uczęszczane miejsca"],
    bestLight: "Najczęściej planuję tu sesje o miękkim świetle: rano lub przed zachodem.",
    nearbySlugs: ["zegocina", "lapanow", "powiat-bochenski"]
  },
  {
    slug: "lapanow",
    name: "Łapanów",
    regionLabel: "powiat bocheński",
    lead: "W Łapanowie łatwo stworzyć naturalny reportażowy klimat i kadry z dużą ilością przestrzeni.",
    sessionSpots: ["spokojne tereny zielone", "lokalne drogi i subtelna architektura", "otwarte kadry o zachodzie słońca"],
    bestLight: "Najlepiej sprawdza się ciepłe światło późnego popołudnia.",
    nearbySlugs: ["trzciana", "krolowka", "bochnia"]
  },
  {
    slug: "lakta-dolna",
    name: "Łąkta Dolna",
    regionLabel: "powiat bocheński",
    lead: "Łąkta Dolna sprawdza się na sesje plenerowe z naturalnym, spokojnym tłem i swobodnym ruchem.",
    sessionSpots: ["łąki i naturalne ścieżki", "ciche miejsca poza główną drogą", "kadry z dużą ilością zieleni"],
    bestLight: "W tej lokalizacji najlepszy efekt daje równomierne światło pod koniec dnia.",
    nearbySlugs: ["lakta-gorna", "zegocina", "bochnia"]
  },
  {
    slug: "lakta-gorna",
    name: "Łąkta Górna",
    regionLabel: "powiat bocheński",
    lead: "Łąkta Górna to dobre miejsce na kadry z krajobrazem i ciepłym, filmowym światłem.",
    sessionSpots: ["wyżej położone otwarte plenery", "naturalne tło z drzewami i polami", "kameralne miejsca na sesję dla par"],
    bestLight: "Najlepiej fotografuje się tu w złotej godzinie i chwilę po zachodzie.",
    nearbySlugs: ["lakta-dolna", "zegocina", "limanowa"]
  },
  {
    slug: "zegocina",
    name: "Żegocina",
    regionLabel: "powiat bocheński",
    lead: "Żegocina pozwala łączyć kadry krajobrazowe z bardziej intymnymi portretami w spokojnym tempie.",
    sessionSpots: ["plener z widokiem i otwartą przestrzenią", "kameralne miejsca z zielenią", "trasy spacerowe poza centrum"],
    bestLight: "Tu często celujemy w zachód, żeby zachować miękki, analogowy klimat.",
    nearbySlugs: ["trzciana", "lakta-gorna", "limanowa"]
  },
  {
    slug: "limanowa",
    name: "Limanowa",
    regionLabel: "Małopolska",
    lead: "Limanowa daje różnorodne plenery i świetne warunki na sesje portretowe oraz lifestyle.",
    sessionSpots: ["miejskie kadry z lokalnym charakterem", "tereny zielone i spokojne parki", "plener na obrzeżach miasta"],
    bestLight: "W Limanowej dobrze działają sesje poranne i końcówka dnia.",
    nearbySlugs: ["zegocina", "lakta-gorna", "krakow"]
  },
  {
    slug: "krakow",
    name: "Kraków",
    regionLabel: "Małopolska",
    lead: "Kraków daje duży wybór klimatów: od miejskiej elegancji po spokojne zielone kadry na obrzeżach.",
    sessionSpots: ["historyczna tkanka miejska i detale", "nowoczesne kadry uliczne", "parki i spokojniejsze okolice poza centrum"],
    bestLight: "W Krakowie najczęściej umawiam sesje wcześnie rano lub przed zachodem, żeby uniknąć tłoku.",
    nearbySlugs: ["bochnia", "limanowa", "powiat-bochenski"]
  }
];

export const PRIMARY_LOCATIONS = LOCATION_LANDINGS.slice(0, 5);

export function findLocationBySlug(slug: string): LocationLanding | undefined {
  return LOCATION_LANDINGS.find((location) => location.slug === slug);
}
