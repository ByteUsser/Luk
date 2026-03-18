import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OptionalCursor } from "@/components/OptionalCursor";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się w sprawie sesji portretowej, lifestyle lub plenerowej.",
  alternates: {
    canonical: "/kontakt"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/kontakt`,
    title: `Kontakt | ${SITE_CONFIG.name}`,
    description: "Napisz i umów sesję fotograficzną.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Kontakt | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Kontakt | ${SITE_CONFIG.name}`,
    description: "Napisz i umów sesję fotograficzną.",
    images: [SITE_CONFIG.ogImage]
  }
};

export default function ContactPage() {
  return (
    <>
      <OptionalCursor />
      <Nav />
      <main className="pt-20 md:pt-24">
        <section className="px-5 pb-6 pt-10 md:px-10 md:pt-14">
          <div className="mx-auto max-w-[1320px] rounded-[1.3rem] border border-ink/10 bg-[#f3ecdf] p-5 md:flex md:items-center md:justify-between md:gap-6 md:p-7">
            <p className="text-[0.92rem] leading-relaxed text-ink/80">
              Napisz kilka zdań o tym, jakiej sesji szukasz i gdzie chcesz ją zrealizować.
              Odpowiem z konkretną propozycją terminu oraz planem działania.
            </p>
            <div className="mt-4 flex shrink-0 flex-wrap gap-3 md:mt-0">
              <Link
                href="/fotograf"
                className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.76rem] uppercase tracking-[0.14em] text-ink/85 transition-colors duration-700 hover:border-cognac hover:text-cognac"
              >
                Lokalizacje
              </Link>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-ink/25 bg-[#f7f0e4] px-5 text-[0.76rem] uppercase tracking-[0.14em] text-ink transition-colors duration-700 hover:border-cognac hover:text-cognac"
              >
                Napisz maila
              </a>
            </div>
          </div>
        </section>
        <Contact headingLevel="h1" allowQueryPrefill />
      </main>
      <Footer />
    </>
  );
}
