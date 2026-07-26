import type { Metadata } from "next";
import Link from "next/link";
import { PricingAccordion } from "@/components/PricingAccordion";
import { PublicPageShell } from "@/components/PublicPageShell";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cennik fotografa Bochnia – sesje i reportaże",
  description:
    "Ceny sesji portretowych, zdjęć dla par, ślubów, komunii, reportaży i zdjęć do dokumentów z dojazdem. Bochnia i okolice.",
  alternates: {
    canonical: "/cennik"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/cennik`,
    title: `Cennik fotografa Bochnia – sesje i reportaże | ${SITE_CONFIG.name}`,
    description: "Ceny sesji, ślubów, uroczystości i reportaży w Bochni i okolicy.",
    images: [SITE_CONFIG.ogImage]
  },
  twitter: {
    card: "summary_large_image",
    title: `Cennik fotografa Bochnia – sesje i reportaże | ${SITE_CONFIG.name}`,
    description: "Ceny sesji, ślubów, uroczystości i reportaży w Bochni i okolicy.",
    images: [SITE_CONFIG.ogImage]
  }
};

const pricingItems = [
  {
    name: "Sesja portretowa",
    price: "od 300 zł",
    summary: "Zdjęcia dla jednej osoby: prywatnie, zawodowo lub do własnej marki.",
    facts: ["wybór miejsca", "wskazówki podczas zdjęć", "gotowe pliki w galerii online"],
    icon: "portrait",
    source: "cennik-portret"
  },
  {
    name: "Sesja dla par",
    price: "od 350 zł",
    summary: "Wspólna sesja w plenerze, mieście albo w domu.",
    facts: ["wybór miejsca", "wskazówki podczas zdjęć", "gotowe pliki w galerii online"],
    icon: "couple",
    source: "cennik-para"
  },
  {
    name: "Komunia / chrzest",
    price: "od 550 zł",
    summary: "Ceremonia, zdjęcia rodzinne, przyjęcie albo krótki plener.",
    facts: ["plan przed wydarzeniem", "ceremonia i zdjęcia rodzinne", "pliki pełne i do internetu"],
    icon: "sacrament",
    source: "cennik-komunia-chrzest"
  },
  {
    name: "Ślub i wesele",
    price: "od 2 000 zł",
    summary: "Zakres reportażu ustalamy na podstawie planu dnia.",
    facts: ["ustalenie harmonogramu", "reportaż i portrety pary", "gotowe pliki w galerii online"],
    icon: "wedding",
    source: "cennik-slub"
  },
  {
    name: "Event / reportaż",
    price: "od 600 zł",
    summary: "Reportaż z wydarzenia i materiały do strony lub social mediów.",
    facts: ["ustalenie zakresu", "praca według harmonogramu", "pliki pełne i do internetu"],
    icon: "event",
    source: "cennik-event"
  }
] as const;

const documentPricingItem = {
  name: "Zdjęcia do dokumentów z dojazdem",
  price: "100 zł",
  summary:
    "Zdjęcie wykonuję pod wskazanym adresem. Na terenie Bochni całość kosztuje 100 zł; poza miastem może dojść ustalony wcześniej koszt dojazdu.",
  facts: ["dojazd na terenie Bochni w cenie", "poza Bochnią możliwa dopłata za dojazd"],
  icon: "document",
  label: "Usługa dodatkowa",
  source: "cennik-dowod"
} as const;

const printPricingItem = {
  name: "Odbitki 10 × 15 cm",
  price: "od 7 zł / szt.",
  summary: "Odbitki termosublimacyjne na papierze fotograficznym. Jedna sztuka kosztuje 10 zł, od 2 sztuk — 7 zł za sztukę.",
  facts: [
    "Paczkomat 18 zł • kurier 20 zł",
    "wysyłka do 2 dni roboczych od otrzymania lub wyboru zdjęć",
    "przy retuszu lub poprawkach termin może się wydłużyć"
  ],
  icon: "print",
  label: "Usługa dodatkowa",
  source: "cennik-odbitki",
  ctaLabel: "Zapytaj o odbitki"
} as const;

const pricingFaq = [
  {
    question: "Co wpływa na cenę końcową?",
    answer:
      "Na cenę wpływają czas pracy, liczba miejsc, dojazd i zakres zdjęć. Pełną kwotę poznasz przed potwierdzeniem terminu."
  },
  {
    question: "Czy dojazd jest w cenie?",
    answer:
      "W Bochni i najbliższej okolicy zazwyczaj tak. Dalszy dojazd wyceniam osobno."
  },
  {
    question: "Kiedy następuje płatność?",
    answer:
      "Zazwyczaj w dniu zdjęć. Przy ślubie i większych realizacjach termin może wymagać wcześniejszego zadatku."
  },
  {
    question: "Kiedy dostanę gotowe zdjęcia?",
    answer:
      "Termin zależy głównie od ilości materiału i aktualnego obłożenia. Konkretną datę oddania ustalamy przed zdjęciami."
  },
  {
    question: "Czy można zamówić krótkie filmy?",
    answer:
      "Tak. Dodatkowa osoba do krótkich filmów kosztuje od 300 zł przy komunii lub chrzcie i od 800 zł przy ślubie."
  }
] as const;

function minPriceFromLabel(label: string) {
  return label.replace(/\D/g, "");
}

export default function PricingPage() {
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Cennik usług fotograficznych",
    itemListElement: [...pricingItems, documentPricingItem, printPricingItem].map((item) => ({
      "@type": "Offer",
      name: item.name,
      description: item.summary,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "PLN",
        minPrice: minPriceFromLabel(item.price)
      }
    }))
  };

  return (
    <PublicPageShell>
      <main className="px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }} />

        <div className="mx-auto max-w-[1180px]">
          <header className="grid gap-7 rounded-[1.5rem] bg-espresso p-6 text-cream md:p-9 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-[#c8ad8d]">Ceny startowe</p>
              <h1 className="section-title mt-4 max-w-[10ch] text-cream">Cennik</h1>
              <p className="mt-5 max-w-[56ch] text-[1rem] leading-relaxed text-cream/74">
                Wybierz rodzaj zdjęć. Pełną wycenę dostaniesz przed potwierdzeniem terminu.
              </p>
            </div>
            <Link
              href="/kontakt?source=cennik-gora"
              className="button-dark min-h-12 justify-center px-5 text-[0.78rem] uppercase tracking-[0.12em]"
            >
              Sprawdź termin
            </Link>
          </header>

          <PricingAccordion items={[...pricingItems, documentPricingItem, printPricingItem]} />

          <section className="mt-10 border-t border-ink/12 pt-8">
            <h2 className="font-display text-[2.2rem] leading-none">FAQ</h2>
            <div className="mt-5 space-y-3">
              {pricingFaq.map((item) => (
                <details key={item.question} className="border-b border-ink/12 py-4">
                  <summary className="flex min-h-11 cursor-pointer items-center text-[0.96rem] leading-relaxed text-ink">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-[70ch] text-[0.94rem] leading-relaxed text-ink/76">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-10 rounded-[1.4rem] bg-espresso p-6 text-cream md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div>
              <p className="eyebrow text-[#c8ad8d]">Inny temat?</p>
              <p className="mt-3 max-w-[38ch] font-display text-[2.15rem] leading-[0.96]">Napisz do mnie</p>
            </div>
            <Link
              href="/kontakt?source=cennik-inna-opcja"
              className="button-dark mt-6 min-h-12 justify-center px-5 text-[0.78rem] uppercase tracking-[0.12em] md:mt-0"
            >
              Sprawdź termin
            </Link>
          </div>
        </div>
      </main>
    </PublicPageShell>
  );
}
