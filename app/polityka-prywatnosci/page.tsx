import type { Metadata } from "next";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Polityka Prywatności",
  description: "Polityka prywatności strony janiczekfoto.pl",
  alternates: {
    canonical: "/polityka-prywatnosci"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/polityka-prywatnosci`,
    title: `Polityka Prywatności | ${SITE_CONFIG.name}`,
    description: "Informacje o przetwarzaniu danych osobowych i zasadach kontaktu.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `Polityka prywatności | ${SITE_CONFIG.name}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Polityka Prywatności | ${SITE_CONFIG.name}`,
    description: "Informacje o przetwarzaniu danych osobowych i zasadach kontaktu.",
    images: [SITE_CONFIG.ogImage]
  }
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="px-5 pb-20 pt-28 md:px-10 md:pt-32">
        <article className="mx-auto max-w-[860px] space-y-8">
          <header className="space-y-4">
            <p className="eyebrow text-cognac">RODO</p>
            <h1 className="section-title">
              Polityka <span className="italic">prywatności</span>
            </h1>
            <p className="text-[1rem] leading-relaxed text-ink/80">
              Niniejsza polityka opisuje zasady przetwarzania danych osobowych użytkowników strony
              janiczekfoto.pl, w szczególności danych przekazanych przez formularz kontaktowy.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-[2rem] leading-none">Administrator danych</h2>
            <p className="text-[1rem] leading-relaxed text-ink/80">
              Administratorem danych jest Łukasz Janiczek. Kontakt:{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-link">
                {SITE_CONFIG.email}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-[2rem] leading-none">Zakres danych</h2>
            <p className="text-[1rem] leading-relaxed text-ink/80">
              Przetwarzane są dane podane dobrowolnie w formularzu: imię, adres email oraz treść
              wiadomości.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-[2rem] leading-none">Cel i podstawa prawna</h2>
            <p className="text-[1rem] leading-relaxed text-ink/80">
              Dane są przetwarzane wyłącznie w celu obsługi zapytań ofertowych i kontaktu zwrotnego
              (art. 6 ust. 1 lit. b i f RODO).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-[2rem] leading-none">Okres przechowywania</h2>
            <p className="text-[1rem] leading-relaxed text-ink/80">
              Dane są przechowywane przez czas niezbędny do prowadzenia korespondencji i realizacji
              zapytania, nie dłużej niż jest to konieczne.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-[2rem] leading-none">Prawa użytkownika</h2>
            <p className="text-[1rem] leading-relaxed text-ink/80">
              Przysługuje Ci prawo dostępu do danych, sprostowania, usunięcia, ograniczenia
              przetwarzania, wniesienia sprzeciwu oraz skargi do Prezesa UODO.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-[2rem] leading-none">Dostawcy usług</h2>
            <p className="text-[1rem] leading-relaxed text-ink/80">
              Formularz korzysta z usługi wysyłki email (Resend), która przetwarza dane jako podmiot
              przetwarzający wyłącznie w zakresie niezbędnym do doręczenia wiadomości.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
