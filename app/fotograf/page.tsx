import type { Metadata } from "next";
import Link from "next/link";
import { LOCATION_LANDINGS } from "@/lib/location-pages";
import { SITE_CONFIG } from "@/lib/site-config";

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
  return (
    <main className="px-5 pb-20 pt-28 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow text-cognac">Lokalny fotograf</p>
        <h1 className="section-title mt-4 max-w-[13ch]">
          Fotograf Bochnia <span className="italic">i okolice</span>
        </h1>
        <p className="mt-6 max-w-[68ch] text-[1rem] leading-relaxed text-ink/80">
          Tworzę sesje portretowe, lifestyle i dla par w Bochni, powiecie bocheńskim, Limanowej i
          Krakowie. Wybierz miejscowość, aby zobaczyć dedykowaną stronę lokalną.
        </p>

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
      </div>
    </main>
  );
}

