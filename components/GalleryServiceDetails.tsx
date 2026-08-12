import Link from "next/link";
import { buildContactHref } from "@/lib/contact-prefill";
import type { GalleryServiceSeo } from "@/lib/gallery-service-seo";

type GalleryServiceDetailsProps = {
  content: GalleryServiceSeo;
};

export function GalleryServiceDetails({ content }: GalleryServiceDetailsProps) {
  return (
    <section className="mx-auto mt-12 max-w-[1280px] border-t border-ink/12 pt-9" aria-labelledby="service-details-heading">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="eyebrow text-cognac">Przed sesją</p>
          <h2 id="service-details-heading" className="type-section mt-3 max-w-[16ch]">
            {content.heading}
          </h2>
        </div>
        <p className="type-body max-w-[56ch] text-ink/72">{content.summary}</p>
      </div>

      <dl className="mt-7 grid gap-px overflow-hidden rounded-[1rem] border border-ink/10 bg-ink/10 md:grid-cols-3">
        {content.facts.map((fact) => (
          <div key={fact.label} className="bg-surface p-5">
            <dt className="type-meta text-cognac">{fact.label}</dt>
            <dd className="type-body mt-2 text-ink/74">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <details className="group mt-5 rounded-[1rem] border border-ink/10 bg-surface px-5 md:px-6">
        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 [&::-webkit-details-marker]:hidden">
          <span className="type-card">Jak wygląda sesja?</span>
          <span className="text-[1.2rem] leading-none text-cognac transition group-open:rotate-45" aria-hidden="true">+</span>
        </summary>
        <div className="border-t border-ink/10 pb-6 pt-5">
          <div className="grid gap-5 md:grid-cols-2">
            {content.questions.map((item) => (
              <div key={item.question}>
                <h3 className="type-meta text-ink/82">{item.question}</h3>
                <p className="type-body mt-2 text-ink/66">{item.answer}</p>
              </div>
            ))}
          </div>
          <Link href="/fotograf" className="type-action text-link mt-5 inline-flex min-h-11 items-center text-cognac">
            Zobacz obszar działania <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </details>

      <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-body max-w-[48ch] text-ink/64">
          Masz już pomysł? Napisz, a dopasujemy miejsce i termin.
        </p>
        <div className="flex flex-wrap gap-3 sm:justify-end">
          <Link
            href="/cennik"
            className="type-action text-link inline-flex min-h-12 items-center text-cognac"
          >
            Zobacz cennik <span className="ml-2" aria-hidden="true">→</span>
          </Link>
          <Link
            href={buildContactHref(content.source)}
            className="type-action button-outline min-h-12 justify-center px-5"
          >
            Zapytaj o termin
          </Link>
        </div>
      </div>
    </section>
  );
}
