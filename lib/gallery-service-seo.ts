import type { GalleryCategorySlug } from "@/lib/gallery-categories";

export type GalleryServiceSeo = {
  source: string;
  serviceType: string;
  heading: string;
  summary: string;
  facts: [
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string }
  ];
  questions: [
    { question: string; answer: string },
    { question: string; answer: string }
  ];
};

export const GALLERY_SERVICE_SEO: Partial<Record<GalleryCategorySlug, GalleryServiceSeo>> = {
  portrety: {
    source: "galeria-portrety",
    serviceType: "Sesja portretowa",
    heading: "Sesja portretowa w Bochni — spokojnie i bez sztywnego pozowania",
    summary: "Podpowiadam ustawienie i ruch, zostawiając miejsce na naturalne reakcje.",
    facts: [
      { label: "Dla kogo", value: "portret prywatny lub wizerunkowy" },
      { label: "Miejsce", value: "Bochnia i okolice" },
      { label: "Przed sesją", value: "ustalamy klimat i ubiór" }
    ],
    questions: [
      { question: "Co jeśli nie umiem pozować?", answer: "Nie musisz znać żadnych póz. Prowadzę sesję krok po kroku i podpowiadam tylko tyle, ile jest potrzebne." },
      { question: "Czy pomożesz wybrać plener?", answer: "Tak. Najpierw ustalimy klimat zdjęć, a później wybierzemy miejsce i godzinę z odpowiednim światłem." }
    ]
  },
  "sesje-dla-par": {
    source: "galeria-sesje-dla-par",
    serviceType: "Sesja zdjęciowa dla pary",
    heading: "Sesja dla pary w Bochni i okolicy",
    summary: "Spacer, rozmowa i bliskość zamiast odtwarzania gotowej listy póz.",
    facts: [
      { label: "Atmosfera", value: "swobodna i spokojna" },
      { label: "Okazja", value: "rocznica, zaręczyny lub bez okazji" },
      { label: "Plener", value: "park, miasto albo Wasze miejsce" }
    ],
    questions: [
      { question: "Czy sesja może być niespodzianką?", answer: "Tak, ale wcześniej trzeba ustalić dyskretny plan, miejsce spotkania i sposób rozpoczęcia zdjęć." },
      { question: "Kiedy jest najlepsze światło?", answer: "Najczęściej rano lub przed zachodem. Dokładną godzinę dobieramy do miejsca i aktualnej pory roku." }
    ]
  },
  uroczystosci: {
    source: "galeria-uroczystosci",
    serviceType: "Fotografia uroczystości rodzinnych",
    heading: "Fotograf na uroczystość w Bochni i okolicy",
    summary: "Najważniejsze momenty fotografuję dyskretnie, bez zatrzymywania naturalnego przebiegu dnia.",
    facts: [
      { label: "Zakres", value: "ceremonia, portrety lub przyjęcie" },
      { label: "Styl", value: "naturalny reportaż" },
      { label: "Przed wydarzeniem", value: "potwierdzamy plan i miejsca" }
    ],
    questions: [
      { question: "Czy można zamówić tylko ceremonię?", answer: "Tak. Zakres dopasowujemy do wydarzenia i liczby momentów, które mają znaleźć się w materiale." },
      { question: "Czy wykonujesz rodzinne zdjęcie grupowe?", answer: "Tak. Najlepiej zaplanować je od razu po ceremonii lub w innym momencie, gdy wszyscy są jeszcze razem." }
    ]
  },
  eventy: {
    source: "galeria-eventy",
    serviceType: "Fotografia eventowa",
    heading: "Fotograf eventowy w Bochni i Małopolsce",
    summary: "Reportaż pokazuje ludzi, przebieg i atmosferę wydarzenia bez przeszkadzania uczestnikom.",
    facts: [
      { label: "Wydarzenia", value: "eventy, koncerty i spotkania firmowe" },
      { label: "Kadry", value: "ludzie, momenty i detale" },
      { label: "Przed realizacją", value: "ustalamy program i przeznaczenie zdjęć" }
    ],
    questions: [
      { question: "Czy fotografujesz w słabym świetle?", answer: "Tak. Sposób pracy i potrzebny sprzęt dobieram do sali, programu i zasad obowiązujących podczas wydarzenia." },
      { question: "Czy dojeżdżasz poza Bochnię?", answer: "Tak. Realizuję reportaże w okolicy oraz w dalszej części Małopolski po wcześniejszym ustaleniu dojazdu." }
    ]
  }
};
