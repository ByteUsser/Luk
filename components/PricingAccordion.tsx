"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MotionReveal } from "@/components/MotionReveal";
import { PricingIcon, type PricingIconName } from "@/components/PricingIcon";

export type PricingAccordionItem = {
  name: string;
  price: string;
  summary: string;
  facts: readonly string[];
  source: string;
  icon: PricingIconName;
  label?: string;
  ctaLabel?: string;
};

type PricingAccordionProps = {
  items: readonly PricingAccordionItem[];
};

export function PricingAccordion({ items }: PricingAccordionProps) {
  useEffect(() => {
    const openServiceFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement && target.classList.contains("pricing-details")) {
        target.open = true;
      }
    };

    openServiceFromHash();
    window.addEventListener("hashchange", openServiceFromHash);
    return () => window.removeEventListener("hashchange", openServiceFromHash);
  }, []);

  return (
    <section className="mt-6" aria-label="Usługi i ceny startowe">
      <div className="space-y-3">
        {items.map((item, index) => (
          <MotionReveal key={item.source} delay={Math.min(index * 0.035, 0.16)} distance={18}>
            <details
              id={item.source}
              className="pricing-details group scroll-mt-28 overflow-hidden rounded-[1.05rem] border border-ink/12 bg-surface shadow-[0_10px_28px_rgba(36,31,27,0.045)]"
            >
              <summary className="grid min-h-[108px] cursor-pointer list-none grid-cols-[2.55rem_minmax(0,1fr)_auto] items-start gap-3 px-4 py-5 marker:hidden sm:min-h-[116px] sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-6 md:px-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cognac/24 bg-sand/55 text-cognac transition duration-500 group-hover:border-cognac/52 group-hover:bg-sand" aria-hidden="true">
                  <PricingIcon name={item.icon} className="h-[21px] w-[21px]" />
                </span>

                <span className="min-w-0">
                  {item.label ? (
                    <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.14em] text-cognac">
                      {item.label}
                    </span>
                  ) : null}
                  <span className="block font-display text-[1.7rem] leading-[0.95] text-ink sm:text-[2rem]">
                    {item.name}
                  </span>
                  <span className="mt-3 block max-w-[58ch] text-[0.9rem] leading-relaxed text-ink/68 sm:text-[0.95rem]">
                    {item.summary}
                  </span>
                </span>

                <span className="flex min-w-[74px] flex-col items-end gap-3 sm:min-w-[124px] sm:flex-row sm:items-center sm:justify-end sm:gap-5">
                  <span className="max-w-[88px] text-right text-[0.68rem] uppercase leading-relaxed tracking-[0.09em] text-cognac sm:max-w-none sm:whitespace-nowrap sm:text-[0.76rem]">
                    {item.price}
                  </span>
                  <span
                    className="pricing-details-icon relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/18 bg-cream text-ink transition duration-500 group-hover:border-cognac/55 sm:h-11 sm:w-11"
                    aria-hidden="true"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current" />
                  </span>
                </span>
              </summary>

              <div className="pricing-details-content">
                <div className="pricing-details-inner">
                  <div className="border-t border-ink/10 px-4 pb-6 pt-5 sm:ml-[5rem] sm:px-0 sm:pb-7 sm:pr-7">
                    <ul className="grid gap-3 text-[0.9rem] leading-relaxed text-ink/72 sm:grid-cols-3 sm:gap-5">
                      {item.facts.map((fact) => (
                        <li key={fact} className="flex gap-2 border-b border-ink/8 pb-3 sm:border-b-0 sm:pb-0">
                          <span className="text-cognac" aria-hidden="true">—</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/kontakt?source=${item.source}`}
                      className="button-primary mt-6 min-h-12 px-5 text-[0.76rem] uppercase tracking-[0.11em]"
                    >
                      {item.ctaLabel ?? "Sprawdź termin"}
                    </Link>
                  </div>
                </div>
              </div>
            </details>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
