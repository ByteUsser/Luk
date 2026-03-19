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
              className="button-primary px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Strona główna
            </Link>
            <Link
              href="/kontakt?source=404"
              className="button-outline px-5 text-[0.78rem] uppercase tracking-[0.14em]"
            >
              Kontakt
            </Link>
            <Link
              href="/cennik"
              className="button-outline px-5 text-[0.78rem] uppercase tracking-[0.14em]"
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
