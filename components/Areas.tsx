import Link from "next/link";
import { LOCATION_LANDINGS } from "@/lib/location-pages";

export function Areas() {
  return (
    <section id="obszar" className="defer-render px-5 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-[1400px] rounded-[1.6rem] border border-ink/10 bg-[#f3ecdf] p-6 md:p-10">
        <p className="eyebrow text-cognac">Obszar działania</p>
        <h2 className="section-title mt-4 max-w-[12ch]">
          Fotografuję w <span className="italic">Bochni</span> i okolicach
        </h2>
        <p className="mt-6 max-w-[72ch] text-[1rem] leading-relaxed text-ink/80">
          Najczęściej pracuję na terenie Bochni i powiatu bocheńskiego, ale realizuję sesje także
          w Krakowie i Limanowej. Poniżej znajdziesz lokalne strony z informacjami o sesjach w
          konkretnych miejscowościach.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {LOCATION_LANDINGS.map((location) => (
            <Link
              key={location.slug}
              href={`/fotograf/${location.slug}`}
              className="button-secondary px-4 text-[0.72rem] uppercase tracking-[0.18em]"
            >
              {location.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
