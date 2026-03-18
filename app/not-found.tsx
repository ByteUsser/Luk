import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OptionalCursor } from "@/components/OptionalCursor";

export default function NotFoundPage() {
  return (
    <>
      <OptionalCursor />
      <Nav />
      <main className="px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <section className="mx-auto max-w-[900px] rounded-[1.5rem] border border-ink/12 bg-[#f3ecdf] p-6 md:p-9">
          <p className="eyebrow text-cognac">404</p>
          <h1 className="section-title mt-4">
            Tej strony <span className="italic">nie ma</span>
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1rem] leading-relaxed text-ink/80">
            Link może być nieaktualny albo adres został wpisany z literówką. Wróć na stronę główną
            albo przejdź bezpośrednio do kontaktu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ink/25 bg-[#f3ecdf] px-5 text-[0.78rem] uppercase tracking-[0.14em] text-ink transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Strona główna
            </Link>
            <Link
              href="/kontakt?source=404"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.78rem] uppercase tracking-[0.14em] text-ink/85 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Kontakt
            </Link>
            <Link
              href="/cennik"
              className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.78rem] uppercase tracking-[0.14em] text-ink/85 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Cennik
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
