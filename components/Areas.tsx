import Link from "next/link";
import { MotionReveal } from "@/components/MotionReveal";

export function Areas() {
  return (
    <section id="obszar" className="px-5 py-12 md:px-10 md:py-16">
      <MotionReveal>
        <div
          className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[1.4rem] border border-ink/12 bg-surface shadow-[0_20px_52px_rgba(36,31,27,0.08)] lg:grid-cols-[1.05fr_0.95fr]"
          data-scroll-anchor
        >
          <div className="px-6 py-7 md:px-9 md:py-10 lg:px-12 lg:py-12">
            <p className="eyebrow text-cognac">Obszar działania</p>
            <h2 className="type-section mt-4 max-w-[15ch]">Bochnia jest moją bazą</h2>
            <p className="type-body mt-4 max-w-[48ch] text-ink/76">
              Działam głównie w Bochni i powiecie bocheńskim. Przy dalszej trasie potwierdzę dojazd
              i koszt przed rezerwacją.
            </p>
          </div>

          <div className="relative border-t border-ink/10 bg-sand/45 px-6 py-6 md:px-9 md:py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full border border-cognac/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-2 -top-4 h-28 w-28 rounded-full border border-cognac/14" aria-hidden="true" />

            <dl className="relative grid grid-cols-2 gap-px overflow-hidden rounded-[1rem] border border-ink/10 bg-ink/10">
              <div className="bg-surface px-4 py-4 md:px-5 md:py-5">
                <dt className="type-meta text-cognac">Najczęściej</dt>
                <dd className="mt-2 font-display text-[1.35rem] leading-[1.02] text-ink md:text-[1.65rem]">Bochnia i powiat</dd>
              </div>
              <div className="bg-surface px-4 py-4 md:px-5 md:py-5">
                <dt className="type-meta text-cognac">Dalszy dojazd</dt>
                <dd className="mt-2 font-display text-[1.35rem] leading-[1.02] text-ink md:text-[1.65rem]">Po ustaleniu</dd>
              </div>
            </dl>

            <Link
              href="/fotograf"
              className="type-action button-primary relative mt-5 min-h-12 px-5"
            >
              Sprawdź obszar działania <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
