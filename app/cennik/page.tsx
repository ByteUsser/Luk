import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OptionalCursor } from "@/components/OptionalCursor";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cennik",
  description:
    "Cennik sesji fotograficznych Janiczek Foto: portret, sesja dla par, komunia/chrzest oraz reportaż ślubny.",
  alternates: {
    canonical: "/cennik"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/cennik`,
    title: `Cennik | ${SITE_CONFIG.name}`,
    description: "Sprawdź orientacyjny cennik sesji i napisz po indywidualną wycenę.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Cennik | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Cennik | ${SITE_CONFIG.name}`,
    description: "Sprawdź orientacyjny cennik sesji i napisz po indywidualną wycenę.",
    images: [SITE_CONFIG.ogImage]
  }
};

const pricingItems = [
  {
    name: "Sesja portretowa",
    price: "od 300 zł",
    description: "Dla jednej osoby lub mini marki osobistej, w naturalnym świetle.",
    includes: ["konsultacja przed sesją", "prowadzenie podczas zdjęć", "autorska selekcja i obróbka"]
  },
  {
    name: "Sesja dla par",
    price: "od 350 zł",
    description: "Spokojna sesja w plenerze lub mieście, z naciskiem na emocje i relację.",
    includes: ["pomoc w wyborze miejsca", "naturalny przebieg bez sztywnego pozowania", "spójna, filmowa kolorystyka"]
  },
  {
    name: "Komunia / chrzest",
    price: "od 550 zł",
    description: "Reportaż rodzinny z uroczystości i przyjęcia, bez sztucznego ustawiania całego dnia.",
    includes: [
      "ustalenie planu dnia i kluczowych momentów",
      "spokojne zdjęcia rodzinne na miejscu",
      "starannie obrobiony materiał gotowy do przekazania",
      "opcjonalnie: dodatkowa osoba do krótkich filmów (+200 zł)"
    ]
  },
  {
    name: "Ślub i wesele",
    price: "od 2 000 zł",
    description: "Reportaż ślubny w spokojnym, naturalnym stylu z elastycznym zakresem godzin.",
    includes: [
      "konsultacja harmonogramu dnia",
      "autentyczny reportaż + krótkie portrety pary",
      "starannie obrobiony materiał gotowy do przekazania",
      "opcjonalnie: dodatkowa osoba do krótkich filmów (+500 zł)"
    ]
  },
  {
    name: "Event / reportaż",
    price: "od 600 zł",
    description: "Fotorelacja wydarzeń, backstage i detale tworzące pełną historię.",
    includes: [
      "ustalenie zakresu reportażu",
      "praca w dynamicznych warunkach",
      "zdjęcia po obróbce: pełna rozdzielczość + lżejsza wersja pod social media i stronę"
    ]
  }
] as const;

const pricingFaq = [
  {
    question: "Czy to ceny ostateczne?",
    answer:
      "Nie. To ceny orientacyjne, które nie stanowią oferty handlowej. Ostateczna wycena zależy od zakresu zlecenia, lokalizacji, czasu pracy i dodatkowych ustaleń."
  },
  {
    question: "Co dokładnie wpływa na końcową cenę?",
    answer:
      "Na cenę wpływają przede wszystkim: czas pracy, lokalizacja, dojazd, charakter wydarzenia, zakres materiału i termin realizacji."
  },
  {
    question: "Czy dojazd jest w cenie?",
    answer:
      "Dojazd na terenie Bochni jest zazwyczaj wliczony w cenę. W przypadku dalszych lokalizacji koszt dojazdu ustalam indywidualnie przed potwierdzeniem zlecenia."
  },
  {
    question: "Czy pobierasz zadatek przy rezerwacji terminu?",
    answer:
      "Tak, ale tylko przy rezerwacji ślubu/wesela. Termin uznaję za zarezerwowany po zaksięgowaniu zadatku i potwierdzeniu współpracy."
  },
  {
    question: "Kiedy następuje płatność końcowa?",
    answer:
      "Płatność końcowa następuje najpóźniej w dniu realizacji usługi lub przed wydaniem gotowego materiału. Materiał przekazywany jest po otrzymaniu pełnej płatności."
  },
  {
    question: "Jak szybko dostanę wstępną wycenę?",
    answer: "Staram się odpowiadać możliwie szybko, najczęściej w ciągu 24-48 godzin roboczych."
  },
  {
    question: "Jaki jest czas oddania gotowego materiału?",
    answer:
      "Termin oddania zależy od rodzaju zlecenia, sezonu i zakresu pracy. Dokładny czas podaję przed potwierdzeniem współpracy."
  },
  {
    question: "Czy można zamówić krótkie filmy z realizacji?",
    answer:
      "Tak. Możliwa jest dodatkowa osoba do krótkich filmów: komunia/chrzest +200 zł, ślub i wesele +500 zł."
  },
  {
    question: "Czy przekazujesz nieobrobione pliki RAW?",
    answer: "Nie przekazuję surowych plików RAW. Otrzymujesz wyselekcjonowany i autorsko obrobiony materiał."
  },
  {
    question: "Czy mogę zgłosić poprawki do zdjęć?",
    answer:
      "Tak, drobne poprawki do wybranych zdjęć są możliwe po oddaniu materiału. Większe, dodatkowe zmiany mogą być wyceniane indywidualnie."
  },
  {
    question: "Czy mogę zamówić krótszy wariant reportażu?",
    answer:
      "Tak, możemy ustalić krótszy zakres godzin. To dobra opcja, jeśli potrzebujesz tylko najważniejszych momentów."
  }
] as const;

export default function PricingPage() {
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Cennik sesji fotograficznych",
    itemListElement: pricingItems.map((item) => ({
      "@type": "Offer",
      name: item.name,
      description: item.description,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "PLN",
        minPrice: item.price.replace("od", "").replace("zł", "").replace(/\s+/g, "")
      }
    }))
  };

  return (
    <>
      <OptionalCursor />
      <Nav />
      <main className="px-5 pb-28 pt-28 md:px-10 md:pb-24 md:pt-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }} />
        <section className="mx-auto max-w-[980px] space-y-8">
          <header className="rounded-[1.5rem] border border-ink/12 bg-[#f3ecdf] p-6 md:p-9">
            <p className="eyebrow text-cognac">Cennik</p>
            <h1 className="section-title mt-4">
              Orientacyjny <span className="italic">cennik</span>
            </h1>
            <p className="mt-6 max-w-[62ch] text-[1rem] leading-relaxed text-ink/80">
              Poniżej znajdziesz orientacyjne ceny startowe dla Bochni i okolic. Każde zlecenie wyceniam
              indywidualnie pod lokalizację, czas pracy i zakres materiału.
            </p>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/75">
              Podane ceny nie stanowią oferty handlowej. Zlecenie uznaję za przyjęte dopiero po moim
              potwierdzeniu, a rezerwacja ślubu/wesela następuje po zaksięgowaniu zadatku.
            </p>
            <div className="mt-5 rounded-2xl border border-cognac/20 bg-cream/80 px-4 py-4 md:px-5">
              <p className="text-[0.95rem] leading-relaxed text-ink/82">
                Jeśli nie widzisz tutaj dokładnie swojej opcji, napisz śmiało. Jestem otwarty na różne
                propozycje, a zakres sesji, czas pracy i budżet możemy spokojnie ustalić tak, żeby wszystko
                było dopasowane do Ciebie.
              </p>
            </div>
          </header>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {pricingItems.map((item) => (
              <article key={item.name} className="rounded-2xl border border-ink/12 bg-[#f3ecdf] p-5">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-cognac">{item.name}</p>
                <p className="mt-4 font-display text-[2.2rem] leading-none">{item.price}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/80">{item.description}</p>
                <ul className="mt-4 space-y-2 text-[0.88rem] leading-relaxed text-ink/78">
                  {item.includes.map((include) => (
                    <li key={include}>• {include}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <section className="rounded-[1.5rem] border border-ink/12 bg-[#f3ecdf] p-6 md:p-8">
            <h2 className="font-display text-[2rem] leading-none">Najczęstsze pytania o cennik</h2>
            <div className="mt-5 space-y-3">
              {pricingFaq.map((item) => (
                <details key={item.question} className="rounded-2xl border border-ink/12 bg-cream/70 p-4">
                  <summary className="cursor-pointer text-[0.94rem] leading-relaxed text-ink">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-ink/80">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/kontakt?source=cennik"
              className="button-primary px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Napisz wiadomość
            </Link>
            <Link
              href="/fotograf?source=cennik"
              className="button-outline px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Lokalizacje
            </Link>
            <Link
              href="/"
              className="button-outline px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Portfolio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
