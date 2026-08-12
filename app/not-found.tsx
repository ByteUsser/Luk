import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageShell } from "@/components/PublicPageShell";

export const metadata: Metadata = {
  title: "Strona nie istnieje",
  description: "Nie znaleziono podanej strony w serwisie Janiczek Foto.",
  alternates: {
    canonical: null
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function NotFoundPage() {
  return (
    <PublicPageShell>
      <main className="px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <section className="mx-auto max-w-[900px] rounded-[1.5rem] border border-ink/12 bg-surface p-6 md:p-9">
          <p className="eyebrow text-cognac">404</p>
          <h1 className="section-title mt-4">
            Strona nie istnieje
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1rem] leading-relaxed text-ink/80">
            Adres może być nieaktualny albo wpisany z literówką. Wróć na stronę główną albo napisz do mnie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="button-primary px-5 text-[0.82rem] uppercase tracking-[0.12em]"
            >
              Strona główna
            </Link>
            <Link
              href="/kontakt?source=404#formularz-kontaktowy"
              className="button-outline px-5 text-[0.82rem] uppercase tracking-[0.12em]"
            >
              Napisz wiadomość
            </Link>
            <Link
              href="/cennik"
              className="button-outline px-5 text-[0.82rem] uppercase tracking-[0.12em]"
            >
              Cennik
            </Link>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
