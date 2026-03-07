import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
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

  const jsonLd = {
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

  return (
    <>
      <Cursor />
      <Nav />
      <main className="px-5 pb-20 pt-28 md:px-10 md:pt-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <article className="mx-auto max-w-[980px] space-y-8">
          <header className="space-y-4">
            <p className="eyebrow text-cognac">Lokalna oferta</p>
            <h1 className="section-title max-w-[12ch]">
              Fotograf <span className="italic">{location.name}</span>
            </h1>
            <p className="max-w-[64ch] text-[1rem] leading-relaxed text-ink/80">
              Szukasz fotografa na terenie {location.name} ({location.regionLabel})? Realizuję
              naturalne sesje portretowe, lifestyle i dla par z naciskiem na swobodę, światło i
              prawdziwe emocje.
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

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/kontakt"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ink/25 bg-[#f3ecdf] px-5 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Umów sesję
            </Link>
            <Link
              href="/fotograf"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.72rem] uppercase tracking-[0.2em] text-ink/80 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Wszystkie lokalizacje
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.72rem] uppercase tracking-[0.2em] text-ink/80 transition-colors duration-700 hover:border-cognac hover:text-cognac"
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
