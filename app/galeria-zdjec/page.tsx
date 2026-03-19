import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OptionalCursor } from "@/components/OptionalCursor";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Galeria zdjęć",
  description:
    "Galeria zdjęć Janiczek Foto jest w przygotowaniu. Wkrótce pojawi się pełny podział na portrety, motoryzację, podróże i inne kadry.",
  alternates: {
    canonical: "/galeria-zdjec"
  },
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/galeria-zdjec`,
    title: `Galeria zdjęć | ${SITE_CONFIG.name}`,
    description:
      "Ta sekcja jest jeszcze w budowie. Wkrótce pojawi się pełna galeria zdjęć z podziałem na kategorie.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Galeria zdjęć | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Galeria zdjęć | ${SITE_CONFIG.name}`,
    description:
      "Ta sekcja jest jeszcze w budowie. Wkrótce pojawi się pełna galeria zdjęć z podziałem na kategorie.",
    images: [SITE_CONFIG.ogImage]
  }
};

const plannedSections = [
  "Portrety",
  "Motoryzacja",
  "Podróże",
  "Event i reportaż",
  "Kadry miejskie"
] as const;

export default function PhotoGalleryPage() {
  return (
    <>
      <OptionalCursor />
      <Nav />
      <main className="px-5 pb-28 pt-28 md:px-10 md:pb-24 md:pt-32">
        <section className="mx-auto max-w-[1080px]">
          <div className="rounded-[1.8rem] border border-ink/12 bg-[#f3ecdf] p-6 md:p-9">
            <p className="eyebrow text-cognac">Galeria zdjęć</p>
            <h1 className="section-title mt-4 max-w-[12ch]">
              Pełna galeria jest <span className="italic">w budowie</span>
            </h1>
            <p className="mt-6 max-w-[60ch] text-[1rem] leading-relaxed text-ink/80">
              Pracuję nad pełnoprawną galerią z wygodnym podziałem na kategorie i lepszym przeglądaniem
              zdjęć. Na ten moment możesz zobaczyć wybrane kadry na stronie głównej, a pełna sekcja pojawi
              się w kolejnych aktualizacjach.
            </p>

            <div className="mt-6 rounded-2xl border border-cognac/20 bg-cream/80 px-4 py-4 md:px-5">
              <p className="text-[0.94rem] leading-relaxed text-ink/82">
                Docelowo znajdziesz tutaj osobne zakładki dla portretów, motoryzacji, podróży, wydarzeń i
                innych realizacji.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#wybrane-prace"
                className="button-primary px-5 text-[0.78rem] uppercase tracking-[0.14em]"
              >
                Zobacz wybrane prace
              </Link>
              <Link
                href="/kontakt?source=galeria-w-budowie"
                className="button-outline px-5 text-[0.78rem] uppercase tracking-[0.14em]"
              >
                Umów sesję
              </Link>
            </div>
          </div>

          <section className="mt-8 rounded-[1.6rem] border border-ink/12 bg-[#f3ecdf] p-6 md:p-8">
            <h2 className="font-display text-[2rem] leading-none">Co tutaj wpadnie?</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {plannedSections.map((section) => (
                <article key={section} className="rounded-2xl border border-ink/12 bg-cream/65 p-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.18em] text-cognac">Planowana kategoria</p>
                  <p className="mt-3 font-display text-[1.8rem] leading-none text-ink">{section}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
