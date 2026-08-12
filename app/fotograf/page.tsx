import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/components/PublicPageShell";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { SITE_CONFIG } from "@/lib/site-config";

const faqItems = [
  {
    question: "Czy robisz zdjęcia poza Bochnią?",
    answer:
      "Tak. Najczęściej działam w Bochni i okolicy. Do Krakowa, Tarnowa i innych miejsc w Małopolsce dojeżdżam po ustaleniu."
  },
  {
    question: "Czy dojazd jest dodatkowo płatny?",
    answer:
      "Przy dalszych miejscowościach tak. Dostaniesz pełną wycenę przed potwierdzeniem terminu."
  }
] as const;

const primaryLocations = [
  {
    name: "Bochnia",
    href: "/fotograf/bochnia",
    note: "Portrety, pary i uroczystości."
  },
  {
    name: "Nowy Wiśnicz",
    href: "/fotograf/nowy-wisnicz",
    note: "Sesje, uroczystości i reportaże."
  },
  {
    name: "Trzciana",
    href: "/fotograf/trzciana",
    note: "Portrety, pary i rodzinne uroczystości."
  },
  {
    name: "Żegocina",
    href: "/fotograf/zegocina",
    note: "Sesje, uroczystości i reportaże."
  }
] as const;

export const metadata: Metadata = {
  title: "Fotograf Bochnia i okolice – dojazd",
  description:
    "Fotograf w Bochni i okolicy: Nowy Wiśnicz, Trzciana, Żegocina i powiat bocheński. Dalszy dojazd ustalam indywidualnie.",
  alternates: {
    canonical: "/fotograf"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/fotograf`,
    title: `Fotograf Bochnia i okolice – dojazd | ${SITE_CONFIG.name}`,
    description:
      "Bochnia, Nowy Wiśnicz, Trzciana, Żegocina i powiat bocheński.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Obszar działania | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Fotograf Bochnia i okolice – dojazd | ${SITE_CONFIG.name}`,
    description:
      "Bochnia, Nowy Wiśnicz, Trzciana, Żegocina i powiat bocheński.",
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
    <PublicPageShell>
      <main className="px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <div className="mx-auto max-w-[1220px]">
          <header className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-surface shadow-[0_18px_50px_rgba(36,31,27,0.07)]">
            <div className="grid gap-7 p-6 md:p-9 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="eyebrow text-cognac">Obszar działania</p>
                <h1 className="section-title mt-4 max-w-[11ch]">
                  Fotograf w Bochni i okolicy
                </h1>
                <p className="type-body mt-6 max-w-[62ch] text-ink/80">
                  Najczęściej pracuję w powiecie bocheńskim. Dalszy dojazd, również do Krakowa
                  lub Tarnowa, potwierdzam wraz z pełną wyceną przed rezerwacją.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/kontakt?source=lokalizacje#formularz-kontaktowy"
                  className="type-action button-primary min-h-12 justify-center px-5"
                >
                  Zapytaj o termin
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="type-action button-outline min-h-12 justify-center px-5"
                >
                  Zadzwoń
                </a>
              </div>
            </div>

            <dl className="grid gap-px border-t border-ink/10 bg-ink/10 sm:grid-cols-3">
              <div className="bg-cream px-5 py-4 md:px-7">
                <dt className="type-meta text-cognac">Baza</dt>
                <dd className="type-body mt-1 text-ink/78">Bochnia</dd>
              </div>
              <div className="bg-cream px-5 py-4 md:px-7">
                <dt className="type-meta text-cognac">Najczęściej</dt>
                <dd className="type-body mt-1 text-ink/78">Powiat bocheński</dd>
              </div>
              <div className="bg-cream px-5 py-4 md:px-7">
                <dt className="type-meta text-cognac">Dalszy dojazd</dt>
                <dd className="type-body mt-1 text-ink/78">Po wcześniejszym ustaleniu</dd>
              </div>
            </dl>
          </header>

          <section className="mt-12" aria-labelledby="nearby-locations-heading">
            <p className="eyebrow text-cognac">Najbliższe miejscowości</p>
            <h2 id="nearby-locations-heading" className="type-section mt-4">Wybierz swoją okolicę</h2>
            <nav className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Główny obszar działania">
              {primaryLocations.map((location) => (
                <Link
                  key={location.href}
                  href={location.href}
                  className="group rounded-[1rem] border border-ink/12 bg-surface p-5 shadow-[0_10px_24px_rgba(36,31,27,0.04)] transition duration-500 hover:-translate-y-1 hover:border-cognac/35 hover:shadow-[0_18px_38px_rgba(36,31,27,0.09)]"
                >
                  <span className="type-card block">{location.name}</span>
                  <span className="type-body mt-2 block text-ink/68">{location.note}</span>
                  <span className="type-action mt-4 inline-block text-cognac transition-transform group-hover:translate-x-1">
                    Szczegóły <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </nav>
            <Link
              href="/kontakt?source=inna-lokalizacja#formularz-kontaktowy"
              className="type-action text-link mt-5 inline-flex min-h-11 items-center pb-1 text-ink/72"
            >
              Inna miejscowość? Zapytaj o dojazd <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </section>

          <section className="mt-12 grid gap-7 border-t border-ink/12 pt-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center" aria-labelledby="service-area-map-heading">
            <div>
              <p className="eyebrow text-cognac">Mapa</p>
              <h2 id="service-area-map-heading" className="type-section mt-4 max-w-[12ch]">Zobacz orientacyjny zasięg</h2>
              <p className="type-body mt-5 max-w-[42ch] text-ink/76">
                Nie widzisz swojej miejscowości? To nie wyklucza dojazdu. Podaj miejsce w zapytaniu,
                a potwierdzę możliwość realizacji i pełny koszt.
              </p>
            </div>
            <ServiceAreaMap />
          </section>

          <section className="mt-12 space-y-4 border-t border-ink/12 pt-8" aria-labelledby="travel-faq-heading">
            <h2 id="travel-faq-heading" className="type-section">Pytania o dojazd</h2>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="border-b border-ink/12 py-4">
                  <summary className="type-body flex min-h-11 cursor-pointer items-center text-ink">
                    {item.question}
                  </summary>
                  <p className="type-body mt-3 max-w-[70ch] text-ink/80">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </PublicPageShell>
  );
}
