import Link from "next/link";
import { MotionReveal } from "@/components/MotionReveal";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";

const localLinks = [
  { href: "/fotograf/bochnia", label: "Bochnia" },
  { href: "/fotograf/krakow", label: "Kraków" },
  { href: "/fotograf/tarnow", label: "Tarnów" }
] as const;

export function Areas() {
  return (
    <section id="obszar" className="px-5 py-16 md:px-10 md:py-20">
      <div
        className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-[0.62fr_1.38fr] lg:items-center"
        data-scroll-anchor
      >
        <MotionReveal>
          <p className="eyebrow text-cognac">Dojazd</p>
          <p className="mt-5 max-w-[38ch] text-[1rem] leading-relaxed text-ink/78">
            Bazą jest Bochnia i okolice. Do Krakowa i Tarnowa dojeżdżam po ustaleniu terminu.
          </p>
          <nav aria-label="Najważniejsze lokalizacje" className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {localLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-link inline-flex min-h-11 items-center text-[0.76rem] uppercase tracking-[0.1em] text-ink/68"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <ServiceAreaMap />
        </MotionReveal>
      </div>
    </section>
  );
}
