import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/PublicPageShell";
import { cloudinaryAsset } from "@/lib/cloudinary";
import { LOCATION_LANDINGS, findLocationBySlug, isSearchIndexableLocation } from "@/lib/location-pages";
import { SITE_CONFIG } from "@/lib/site-config";

type Params = {
  location: string;
};

type LocationPageProps = {
  params: Promise<Params>;
};

export function generateStaticParams(): Params[] {
  return LOCATION_LANDINGS.map((location) => ({ location: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location: locationSlug } = await params;
  const location = findLocationBySlug(locationSlug);

  if (!location) {
    return {
      title: "Nie znaleziono lokalizacji"
    };
  }

  const pagePath = `/fotograf/${location.slug}`;
  const isBochnia = location.slug === "bochnia";
  const title = isBochnia
    ? "Fotograf Bochnia – portrety, śluby i reportaże"
    : `Fotograf ${location.name}`;
  const description = isBochnia
    ? "Naturalne portrety, sesje dla par, śluby, komunie i reportaże w Bochni. Zobacz portfolio, ceny i sprawdź wolny termin."
    : location.lead;

  return {
    title,
    description,
    alternates: {
      canonical: pagePath
    },
    robots: {
      index: isSearchIndexableLocation(location.slug),
      follow: true
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
    }
  };
}

export default async function PhotographerLocationPage({ params }: LocationPageProps) {
  const { location: locationSlug } = await params;
  const location = findLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  const contactHref = `/kontakt?lokalizacja=${encodeURIComponent(location.name)}&source=landing-${location.slug}`;
  const portfolioImage = cloudinaryAsset("/portfolio/gallery/001-wiosenny-portret.webp", {
    width: 1100,
    quality: 72
  });
  const nearbyLocations = location.nearbySlugs
    .map((slug) => findLocationBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Usługi fotograficzne",
    provider: {
      "@type": "Photographer",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone
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
        { "@type": "Offer", name: "Reportaż z wydarzenia" },
        { "@type": "Offer", name: "Zdjęcia indywidualne lub firmowe" }
      ]
    }
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
    <PublicPageShell>
      <main className="px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <article className="mx-auto max-w-[1120px] space-y-10">
          <header className="grid overflow-hidden rounded-[1.2rem] bg-espresso text-cream lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-center p-6 md:p-9 lg:p-12">
              <p className="eyebrow text-[#c8ad8d]">{location.regionLabel}</p>
              <h1 className="section-title mt-4 max-w-[12ch] text-cream">
                Fotograf {location.name}
              </h1>
              <p className="mt-5 max-w-[52ch] text-[1rem] leading-relaxed text-cream/76">
                {location.lead}
              </p>
              <nav aria-label={`Najważniejsze linki — ${location.name}`} className="mt-7 flex flex-wrap gap-x-2 gap-y-3">
                <Link
                  href={contactHref}
                  className="button-dark-solid min-h-12 px-3 text-[0.76rem] uppercase tracking-[0.1em] sm:px-5 sm:text-[0.78rem] sm:tracking-[0.12em]"
                >
                  Sprawdź termin
                </Link>
                {location.slug === "bochnia" ? (
                  <>
                    <Link
                      href="/galeria-zdjec"
                      className="text-link inline-flex min-h-12 items-center text-[0.72rem] uppercase tracking-[0.12em] text-cream/78"
                    >
                      Portfolio
                    </Link>
                    <Link
                      href="/cennik"
                      className="text-link inline-flex min-h-12 items-center text-[0.72rem] uppercase tracking-[0.12em] text-cream/78"
                    >
                      Cennik
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/galeria-zdjec"
                    className="button-dark min-h-12 px-5 text-[0.78rem] uppercase tracking-[0.12em]"
                  >
                    Portfolio
                  </Link>
                )}
              </nav>
            </div>
            <figure className="relative min-h-[300px] lg:min-h-[520px]">
              <Image
                src={portfolioImage.src}
                alt="Portret wykonany przez Janiczek Foto"
                fill
                priority
                quality={72}
                sizes="(max-width: 1023px) 92vw, 52vw"
                className="object-cover"
                unoptimized
                placeholder="blur"
                blurDataURL={portfolioImage.blurDataURL}
              />
            </figure>
          </header>

          <section className="grid border-y border-ink/12 md:grid-cols-3 md:divide-x md:divide-ink/12">
            {[
              ["Zdjęcia", location.serviceSummary],
              ["Miejsce", location.placeSummary],
              ["Dojazd", location.travelSummary]
            ].map(([title, text]) => (
              <div key={title} className="border-b border-ink/12 py-6 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0">
                <h2 className="font-display text-[1.8rem] leading-none">{title}</h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/76">{text}</p>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-[2rem] leading-none">Inne lokalizacje</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {nearbyLocations.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/fotograf/${nearby.slug}`}
                  className="text-link inline-flex min-h-11 items-center pb-1 text-[0.76rem] uppercase tracking-[0.1em] text-ink/68"
                >
                  {nearby.name}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
    </PublicPageShell>
  );
}
