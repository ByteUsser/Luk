import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OptionalCursor } from "@/components/OptionalCursor";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cennik",
  description: "Cennik usług fotograficznych Janiczek Foto.",
  alternates: {
    canonical: "/cennik"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/cennik`,
    title: `Cennik | ${SITE_CONFIG.name}`,
    description: "Cennik usług fotograficznych jest aktualnie w przygotowaniu.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Cennik | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Cennik | ${SITE_CONFIG.name}`,
    description: "Cennik usług fotograficznych jest aktualnie w przygotowaniu.",
    images: [SITE_CONFIG.ogImage]
  }
};

export default function PricingPage() {
  return (
    <>
      <OptionalCursor />
      <Nav />
      <main className="px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <section className="mx-auto max-w-[900px] rounded-[1.5rem] border border-ink/12 bg-[#f3ecdf] p-6 text-center md:p-10">
          <p className="eyebrow text-cognac">Cennik</p>
          <h1 className="section-title mt-4">
            Cennik <span className="italic">w budowie</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[48ch] text-[1rem] leading-relaxed text-ink/80">
            Kończę dopracowywać pakiety i szczegóły oferty. Jeśli chcesz, napisz już teraz i
            przygotuję indywidualną wycenę sesji.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/kontakt?source=cennik"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ink/25 bg-cream px-5 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Zapytaj o wycenę
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.72rem] uppercase tracking-[0.2em] text-ink/80 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Powrót na start
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
