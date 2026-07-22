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
    name: "Kraków",
    href: "/fotograf/krakow",
    note: "Portrety, pary i reportaże."
  },
  {
    name: "Tarnów",
    href: "/fotograf/tarnow",
    note: "Sesje, uroczystości i wydarzenia."
  }
] as const;

export const metadata: Metadata = {
  title: "Dojazd na sesje – Bochnia, Kraków i Tarnów",
  description:
    "Obszar działania Janiczek Foto: Bochnia i okolice oraz dojazd do Krakowa i Tarnowa. Sprawdź warunki dojazdu i wolny termin.",
  alternates: {
    canonical: "/fotograf"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/fotograf`,
    title: `Dojazd na sesje – Bochnia, Kraków i Tarnów | ${SITE_CONFIG.name}`,
    description:
      "Bochnia i okolice oraz dojazd do Krakowa i Tarnowa. Sprawdź warunki dojazdu i wolny termin.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Dojazd na sesje | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Dojazd na sesje – Bochnia, Kraków i Tarnów | ${SITE_CONFIG.name}`,
    description:
      "Bochnia i okolice oraz dojazd do Krakowa i Tarnowa.",
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
          <section className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="eyebrow text-cognac">Dojazd</p>
              <h1 className="section-title mt-4 max-w-[11ch]">
                Dojazd na sesje fotograficzne
              </h1>
              <p className="mt-6 max-w-[64ch] text-[1rem] leading-relaxed text-ink/80">
                Najczęściej pracuję w Bochni i okolicy. Do Krakowa, Tarnowa i innych miejsc
                w Małopolsce dojeżdżam po ustaleniu terminu.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/kontakt?source=lokalizacje"
                  className="button-primary px-5 text-[0.82rem] uppercase tracking-[0.14em]"
                >
                  Sprawdź termin
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="button-outline px-5 text-[0.82rem] uppercase tracking-[0.14em]"
                >
                  Zadzwoń
                </a>
              </div>
            </div>

            <ServiceAreaMap />
          </section>

          <section className="mt-10">
            <p className="eyebrow text-cognac">Lokalizacje</p>
            <h2 className="mt-4 font-display text-[2.35rem] leading-none md:text-[3rem]">Najważniejsze kierunki</h2>
            <nav className="mt-6 grid border-y border-ink/12 md:grid-cols-3 md:divide-x md:divide-ink/12" aria-label="Główny obszar działania">
              {primaryLocations.map((location) => (
                <Link
                  key={location.href}
                  href={location.href}
                  className="group border-b border-ink/12 py-5 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0"
                >
                  <span className="block font-display text-[1.9rem] leading-none">{location.name}</span>
                  <span className="mt-2 block text-[0.9rem] leading-relaxed text-ink/66">{location.note}</span>
                  <span className="mt-4 inline-block text-[0.72rem] uppercase tracking-[0.1em] text-cognac transition-transform group-hover:translate-x-1">
                    Zobacz <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </nav>
            <Link
              href="/kontakt?source=inna-lokalizacja"
              className="text-link mt-5 inline-flex min-h-11 items-center pb-1 text-[0.76rem] uppercase tracking-[0.1em] text-ink/68"
            >
              Inna miejscowość? Napisz <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </section>

          <section className="mt-10 space-y-4 border-t border-ink/12 pt-8">
            <h2 className="font-display text-[2rem] leading-none">Dojazd</h2>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="border-b border-ink/12 py-4">
                  <summary className="flex min-h-11 cursor-pointer items-center text-[0.94rem] leading-relaxed text-ink">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </PublicPageShell>
  );
}
