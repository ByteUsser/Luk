import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OptionalCursor } from "@/components/OptionalCursor";
import { LOCATION_LANDINGS } from "@/lib/location-pages";
import { SITE_CONFIG } from "@/lib/site-config";

const conversionSteps = [
  {
    title: "1. Wybierz lokalizację",
    description: "Kliknij miejscowość poniżej i zobacz lokalną stronę z dopasowaną ofertą."
  },
  {
    title: "2. Napisz kilka zdań",
    description: "Po kliknięciu „Umów sesję” formularz podpowie gotowy szkic wiadomości."
  },
  {
    title: "3. Otrzymaj plan sesji",
    description: "Wracam z propozycją terminu, miejscówki i krótkim planem przebiegu."
  }
] as const;

const faqItems = [
  {
    question: "Czy realizujesz sesje tylko w Bochni?",
    answer:
      "Nie. Najczęściej pracuję w Bochni i powiecie bocheńskim, ale dojeżdżam też do Krakowa, Limanowej i okolicznych miejscowości."
  },
  {
    question: "Jak szybko odpowiadasz na zapytania?",
    answer:
      "Najczęściej w ciągu 24 godzin. W odpowiedzi otrzymasz propozycję terminu oraz dalsze kroki rezerwacji."
  },
  {
    question: "Czy mogę umówić sesję, jeśli nie mam doświadczenia przed aparatem?",
    answer:
      "Tak. W trakcie sesji prowadzę Cię krok po kroku, tak żeby efekt był naturalny i bez stresu."
  }
] as const;

export const metadata: Metadata = {
  title: "Fotograf Bochnia i okolice",
  description:
    "Fotograf Bochnia, powiat bocheński, Kraków i okolice. Sprawdź lokalne strony dla miejscowości i umów sesję.",
  alternates: {
    canonical: "/fotograf"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/fotograf`,
    title: `Fotograf Bochnia i okolice | ${SITE_CONFIG.name}`,
    description:
      "Sesje portretowe i lifestyle na terenie Bochni, powiatu bocheńskiego, Krakowa i Limanowej.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Fotograf Bochnia i okolice | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Fotograf Bochnia i okolice | ${SITE_CONFIG.name}`,
    description:
      "Sesje portretowe i lifestyle na terenie Bochni, powiatu bocheńskiego, Krakowa i Limanowej.",
    images: [SITE_CONFIG.ogImage]
  }
};

export default function PhotographerAreasPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <OptionalCursor />
      <Nav />
      <main className="px-5 pb-28 pt-28 md:px-10 md:pb-20 md:pt-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <div className="mx-auto max-w-[1200px]">
          <p className="eyebrow text-cognac">Lokalny fotograf</p>
          <h1 className="section-title mt-4 max-w-[13ch]">
            Fotograf Bochnia <span className="italic">i okolice</span>
          </h1>
          <p className="mt-6 max-w-[68ch] text-[1rem] leading-relaxed text-ink/80">
            Tworzę sesje portretowe, lifestyle i dla par w Bochni, powiecie bocheńskim, Limanowej i
            Krakowie. Wybierz miejscowość, aby zobaczyć dedykowaną stronę lokalną.
          </p>

          <section className="mt-8 rounded-[1.5rem] border border-ink/12 bg-[#f3ecdf] p-5 md:p-7">
            <h2 className="font-display text-[2.1rem] leading-none">Jak wygląda rezerwacja?</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {conversionSteps.map((step) => (
                <article key={step.title} className="rounded-2xl border border-ink/12 bg-cream/65 p-4">
                  <h3 className="text-[0.78rem] uppercase tracking-[0.18em] text-cognac">{step.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATION_LANDINGS.map((location) => (
              <Link
                key={location.slug}
                href={`/fotograf/${location.slug}`}
                className="flex min-h-[90px] flex-col justify-center rounded-2xl border border-ink/15 bg-[#f3ecdf] px-5 py-4 transition-colors duration-700 hover:border-cognac"
              >
                <span className="font-display text-[1.7rem] leading-none">{location.name}</span>
                <span className="mt-2 text-[0.75rem] uppercase tracking-[0.18em] text-ink/65">
                  {location.regionLabel}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/kontakt?source=lokalizacje"
              className="button-primary px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Umów sesję
            </Link>
            <Link
              href="/"
              className="button-outline px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Zobacz portfolio
            </Link>
            <Link
              href="/cennik"
              className="button-outline px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Cennik
            </Link>
          </div>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-[2rem] leading-none">Najczęstsze pytania</h2>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-2xl border border-ink/12 bg-[#f3ecdf] p-4">
                  <summary className="cursor-pointer text-[0.94rem] leading-relaxed text-ink">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
