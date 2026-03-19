import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OptionalCursor } from "@/components/OptionalCursor";
import { LOCATION_LANDINGS, findLocationBySlug } from "@/lib/location-pages";
import { SITE_CONFIG } from "@/lib/site-config";

type Params = {
  location: string;
};

export function generateStaticParams(): Params[] {
  return LOCATION_LANDINGS.map((location) => ({ location: location.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const location = findLocationBySlug(params.location);

  if (!location) {
    return {
      title: "Nie znaleziono lokalizacji"
    };
  }

  const pagePath = `/fotograf/${location.slug}`;
  const title = `Fotograf ${location.name}`;
  const description = `Fotograf ${location.name} i okolice. Portrety, sesje lifestyle oraz sesje dla par w naturalnym świetle.`;

  return {
    title,
    description,
    alternates: {
      canonical: pagePath
    },
    openGraph: {
      url: `${SITE_CONFIG.url}${pagePath}`,
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_CONFIG.name}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [SITE_CONFIG.ogImage]
    },
    keywords: [
      `fotograf ${location.name.toLowerCase()}`,
      `sesja zdjęciowa ${location.name.toLowerCase()}`,
      `sesja plenerowa ${location.name.toLowerCase()}`,
      `sesja dla par ${location.name.toLowerCase()}`
    ]
  };
}

export default function PhotographerLocationPage({ params }: { params: Params }) {
  const location = findLocationBySlug(params.location);

  if (!location) {
    notFound();
  }

  const contactHref = `/kontakt?lokalizacja=${location.slug}&source=landing-${location.slug}`;
  const nearbyLocations = location.nearbySlugs
    .map((slug) => findLocationBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const trustHighlights = [
    "Spokojne prowadzenie bez sztywnego pozowania",
    "Konsultacja przed sesją i dobór miejsca do Twojego stylu",
    "Naturalna estetyka i praca na emocjach"
  ];
  const processSteps = [
    {
      title: "Krótka rozmowa",
      description: `Piszesz czego potrzebujesz w lokalizacji ${location.name}, a ja proponuję najlepszy scenariusz sesji.`
    },
    {
      title: "Plan sesji",
      description: "Ustalamy termin, lokalizację, styl zdjęć i prosty plan przebiegu krok po kroku."
    },
    {
      title: "Realizacja",
      description: "Prowadzę Cię przez sesję tak, żeby zdjęcia były naturalne i bez stresu."
    }
  ];
  const faqItems = [
    {
      question: `Czy dojeżdżasz na sesje w lokalizacji ${location.name}?`,
      answer: `Tak, realizuję sesje w lokalizacji ${location.name} i pobliskich miejscowościach. Jeśli planujesz inny obszar, wystarczy krótka wiadomość i dopasujemy szczegóły.`
    },
    {
      question: "Jak umówić termin i jak szybko dostanę odpowiedź?",
      answer:
        "Najwygodniej przez formularz kontaktowy. Odpowiadam zazwyczaj w ciągu 24 godzin z propozycją terminu i planem sesji."
    },
    {
      question: "Czy pomagasz osobom, które nie czują się pewnie przed aparatem?",
      answer:
        "Tak. Prowadzę sesję spokojnie i na bieżąco podpowiadam ustawienie, żeby zdjęcia wyglądały naturalnie, bez sztucznego pozowania."
    }
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Usługi fotograficzne",
    provider: {
      "@type": "Photographer",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.email
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: location.name
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sesje fotograficzne",
      itemListElement: [
        { "@type": "Offer", name: "Sesja portretowa" },
        { "@type": "Offer", name: "Sesja lifestyle" },
        { "@type": "Offer", name: "Sesja dla par" }
      ]
    }
  };
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
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: SITE_CONFIG.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Fotograf",
        item: `${SITE_CONFIG.url}/fotograf`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Fotograf ${location.name}`,
        item: `${SITE_CONFIG.url}/fotograf/${location.slug}`
      }
    ]
  };

  return (
    <>
      <OptionalCursor />
      <Nav />
      <main className="px-5 pb-28 pt-28 md:px-10 md:pb-20 md:pt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <article className="mx-auto max-w-[980px] space-y-8">
          <header className="space-y-4">
            <p className="eyebrow text-cognac">Lokalna oferta</p>
            <h1 className="section-title max-w-[12ch]">
              Fotograf <span className="italic">{location.name}</span>
            </h1>
            <p className="max-w-[64ch] text-[1rem] leading-relaxed text-ink/80">
              Szukasz fotografa na terenie {location.name} ({location.regionLabel})? {location.lead}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-[2rem] leading-none">Co mogę dla Ciebie sfotografować?</h2>
            <p className="text-[1rem] leading-relaxed text-ink/80">
              Najczęściej wykonuję sesje portretowe, sesje dla par oraz sesje lifestyle. Każda sesja
              jest prowadzona w spokojnej atmosferze, bez sztywnego pozowania, z przygotowaniem
              koncepcji pod lokalizację i porę dnia.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-[2rem] leading-none">Dojazd i obszar działania</h2>
            <p className="text-[1rem] leading-relaxed text-ink/80">
              Dojeżdżam na sesje w {location.name} oraz pobliskich miejscowościach. Jeśli planujesz
              zdjęcia poza tym obszarem, napisz przez formularz i ustalimy szczegóły terminu oraz
              dojazdu.
            </p>
          </section>

          <section className="rounded-[1.5rem] border border-ink/12 bg-[#f3ecdf] p-5 md:p-7">
            <h2 className="font-display text-[2rem] leading-none">
              Gdzie najlepiej zrobić sesję w {location.name}?
            </h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-3">
              {location.sessionSpots.map((spot) => (
                <li key={spot} className="rounded-2xl border border-ink/12 bg-cream/65 p-4 text-[0.93rem] text-ink/80">
                  {spot}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-l border-cognac/40 pl-4 text-[0.92rem] italic text-ink/75">
              {location.bestLight}
            </p>
          </section>

          <section className="rounded-[1.5rem] border border-ink/12 bg-[#f3ecdf] p-5 md:p-7">
            <h2 className="font-display text-[2rem] leading-none">
              Dlaczego warto umówić sesję w tej lokalizacji?
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {trustHighlights.map((highlight) => (
                <div key={highlight} className="rounded-2xl border border-ink/12 bg-cream/65 p-4">
                  <p className="text-[0.92rem] leading-relaxed text-ink/80">{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-[2rem] leading-none">Jak wygląda współpraca?</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {processSteps.map((step) => (
                <article key={step.title} className="rounded-2xl border border-ink/12 bg-[#f3ecdf] p-4">
                  <h3 className="text-[0.74rem] uppercase tracking-[0.2em] text-cognac">{step.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-ink/80">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
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

          <section className="space-y-4">
            <h2 className="font-display text-[2rem] leading-none">Pobliskie lokalizacje</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyLocations.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/fotograf/${nearby.slug}`}
                  className="button-secondary px-4 text-[0.76rem] uppercase tracking-[0.14em]"
                >
                  Fotograf {nearby.name}
                </Link>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={contactHref}
              className="button-primary px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Umów sesję
            </Link>
            <Link
              href="/fotograf"
              className="button-outline px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Wszystkie lokalizacje
            </Link>
            <Link
              href="/"
              className="button-outline px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Portfolio
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
