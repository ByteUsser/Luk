export type ServiceAreaLocation = {
  name: string;
  region: string;
  note: string;
  aliases?: string[];
  featured?: boolean;
};

export const SERVICE_AREA_LOCATIONS: ServiceAreaLocation[] = [
  {
    name: "Bochnia",
    region: "główny obszar działania",
    note: "Najwięcej dostępnych terminów i najprostszy dojazd.",
    featured: true
  },
  {
    name: "Kraków",
    region: "kierunek dodatkowy",
    note: "Dojazd i koszt potwierdzam przed rezerwacją.",
    aliases: ["Krakow"],
    featured: true
  },
  {
    name: "Tarnów",
    region: "kierunek dodatkowy",
    note: "Dojazd i koszt potwierdzam przed rezerwacją.",
    aliases: ["Tarnow"],
    featured: true
  },
  {
    name: "Powiat Bocheński",
    region: "Bochnia i okolice",
    note: "Napisz nazwę miejscowości — potwierdzę dojazd przed rezerwacją.",
    aliases: ["powiat bochenski"],
    featured: true
  },
  {
    name: "Brzesko",
    region: "okolice Bochni",
    note: "Dojazd ustalam przy rezerwacji.",
    featured: true
  },
  {
    name: "Łapanów",
    region: "powiat bocheński",
    note: "Dojazd prosty do ustalenia przy rezerwacji.",
    aliases: ["Lapanow"],
    featured: true
  },
  {
    name: "Żegocina",
    region: "powiat bocheński",
    note: "Lokalny dojazd i naturalne plenery.",
    aliases: ["Zegocina"],
    featured: true
  },
  {
    name: "Nowy Wiśnicz",
    region: "powiat bocheński",
    note: "Dojazd z Bochni ustalam przy rezerwacji.",
    aliases: ["Wisnicz", "Nowy Wisnicz"]
  },
  {
    name: "Królówka",
    region: "powiat bocheński",
    note: "Lokalny dojazd i spokojne miejsca na zdjęcia.",
    aliases: ["Krolowka"]
  },
  {
    name: "Trzciana",
    region: "powiat bocheński",
    note: "Lokalny dojazd, plenery i mniejsze uroczystości."
  },
  {
    name: "Łąkta Dolna",
    region: "powiat bocheński",
    note: "Blisko głównego obszaru działania.",
    aliases: ["Lakta Dolna"]
  },
  {
    name: "Łąkta Górna",
    region: "powiat bocheński",
    note: "Blisko głównego obszaru działania.",
    aliases: ["Lakta Gorna"]
  },
  {
    name: "Rzezawa",
    region: "powiat bocheński",
    note: "Krótki dojazd z Bochni."
  },
  {
    name: "Limanowa",
    region: "kierunek dodatkowy",
    note: "Dojazd i koszt potwierdzam przed rezerwacją."
  }
];

export const FEATURED_SERVICE_AREA_LOCATIONS = SERVICE_AREA_LOCATIONS.filter(
  (location) => location.featured
);
