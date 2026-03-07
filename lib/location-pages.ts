export type LocationLanding = {
  slug: string;
  name: string;
  regionLabel: string;
};

export const LOCATION_LANDINGS: LocationLanding[] = [
  { slug: "bochnia", name: "Bochnia", regionLabel: "powiat bocheński" },
  { slug: "powiat-bochenski", name: "Powiat Bocheński", regionLabel: "Małopolska" },
  { slug: "nowy-wisnicz", name: "Nowy Wiśnicz", regionLabel: "powiat bocheński" },
  { slug: "krolowka", name: "Królówka", regionLabel: "powiat bocheński" },
  { slug: "trzciana", name: "Trzciana", regionLabel: "powiat bocheński" },
  { slug: "lapanow", name: "Łapanów", regionLabel: "powiat bocheński" },
  { slug: "lakta-dolna", name: "Łąkta Dolna", regionLabel: "powiat bocheński" },
  { slug: "lakta-gorna", name: "Łąkta Górna", regionLabel: "powiat bocheński" },
  { slug: "zegocina", name: "Żegocina", regionLabel: "powiat bocheński" },
  { slug: "limanowa", name: "Limanowa", regionLabel: "Małopolska" },
  { slug: "krakow", name: "Kraków", regionLabel: "Małopolska" }
];

export const PRIMARY_LOCATIONS = LOCATION_LANDINGS.slice(0, 5);

export function findLocationBySlug(slug: string): LocationLanding | undefined {
  return LOCATION_LANDINGS.find((location) => location.slug === slug);
}

