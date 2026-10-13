import Link from "next/link";
import { buildContactHref } from "@/lib/contact-prefill";
import { SERVICE_STARTING_PRICES } from "@/lib/service-prices";

// Descriptions use the existing public offer. Prices share the cennik source.
const services = [
  {
    title: "Ślub i wesele",
    price: SERVICE_STARTING_PRICES.Śluby,
    description: "Reportaż od przygotowań po przyjęcie, według wspólnie ustalonego planu. W harmonogramie możemy uwzględnić portrety pary i zdjęcia z bliskimi.",
    href: "/galeria-zdjec/sluby",
    linkText: "Zobacz fotografię ślubną"
  },
  {
    title: "Sesja portretowa",
    price: SERVICE_STARTING_PRICES.Portrety,
    description: "Portret prywatny lub wizerunkowy. Przed sesją ustalamy klimat, ubiór i miejsce, a podczas zdjęć podpowiadam ustawienie i ruch — nie musisz umieć pozować.",
    href: "/galeria-zdjec/portrety",
    linkText: "Zobacz sesje portretowe"
  },
  {
    title: "Sesja dla par",
    price: SERVICE_STARTING_PRICES["Sesje dla par"],
    description: "Zdjęcia na rocznicę, zaręczyny lub bez okazji. Spotykamy się w plenerze, mieście albo w domu; sesja opiera się na rozmowie, ruchu i Waszej bliskości.",
    href: "/galeria-zdjec/sesje-dla-par",
    linkText: "Zobacz zdjęcia par"
  },
  {
    title: "Chrzest i komunia",
    price: SERVICE_STARTING_PRICES.Uroczystości,
    description: "Ceremonia, rodzinne portrety, przyjęcie albo krótki plener — zakres ustalamy przed wydarzeniem. Możesz zapytać również o fotografowanie samej ceremonii.",
    href: "/galeria-zdjec/uroczystosci",
    linkText: "Zobacz uroczystości rodzinne"
  },
  {
    title: "Event i reportaż",
    price: SERVICE_STARTING_PRICES.Eventy,
    description: "Zdjęcia z wydarzeń, koncertów i spotkań firmowych. Przed realizacją omawiamy program oraz przeznaczenie materiału, na przykład na stronę lub do mediów społecznościowych.",
    href: "/galeria-zdjec/eventy",
    linkText: "Zobacz reportaże z wydarzeń"
  }
] as const;

export function BochniaOffer() {
  return (
    <>
      <section aria-labelledby="bochnia-offer-heading">
        <p className="eyebrow text-cognac">Oferta i portfolio</p>
        <h2 id="bochnia-offer-heading" className="section-title mt-4">
          Jakich zdjęć potrzebujesz?
        </h2>
        <p className="type-body mt-4 max-w-[65ch] text-ink/76">
          Wybierz rodzaj fotografii, żeby obejrzeć zdjęcia i poznać sposób pracy.
          Podane kwoty to ceny początkowe. Ostateczną cenę i zakres potwierdzam przed rezerwacją.
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.href} className="flex flex-col rounded-[1.2rem] border border-ink/12 bg-surface p-6">
              <p className="type-meta text-cognac">{service.price}</p>
              <h3 className="type-card mt-3">{service.title}</h3>
              <p className="type-body mb-4 mt-3 text-ink/76">{service.description}</p>
              <Link href={service.href} className="type-action text-link mt-auto inline-flex min-h-11 items-center self-start text-cognac">
                {service.linkText} <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
          <article className="flex flex-col rounded-[1.2rem] border border-ink/12 bg-surface p-6">
            <p className="eyebrow text-cognac">Usługa z dojazdem</p>
            <h3 className="type-card mt-3">Zdjęcia do dokumentów</h3>
            <p className="type-body mb-4 mt-3 text-ink/76">
              Zdjęcie wykonuję pod wskazanym adresem w Bochni. Poza miastem może dojść ustalony wcześniej koszt dojazdu.
              Warunki tej usługi i cenę znajdziesz w cenniku.
            </p>
            <Link href="/cennik" className="type-action text-link mt-auto inline-flex min-h-11 items-center self-start text-cognac">
              Sprawdź cennik i dojazd <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>

      <section aria-labelledby="bochnia-booking-heading" className="grid gap-7 border-t border-ink/12 pt-8 md:grid-cols-2">
        <div>
          <h2 id="bochnia-booking-heading" className="font-display text-[2rem] leading-tight">
            Jak umówić zdjęcia w Bochni?
          </h2>
          <ol className="type-body mt-5 list-decimal space-y-3 pl-5 text-ink/76">
            <li>Napisz, jakich zdjęć potrzebujesz, gdzie mają powstać i jaki termin bierzesz pod uwagę.</li>
            <li>Ustalimy miejsce, zakres, cenę oraz ewentualny dojazd. Przy reportażu omówimy plan wydarzenia.</li>
            <li>Po zdjęciach, selekcji i obróbce otrzymasz gotowe pliki. Szczegóły zamówienia ustalimy przed rezerwacją.</li>
          </ol>
          <Link href={buildContactHref("landing-bochnia", "Bochnia")} className="type-action button-primary mt-6 min-h-12 px-5">
            Zapytaj o termin w Bochni
          </Link>
        </div>
        <div>
          <h2 className="font-display text-[2rem] leading-tight">Kto zrobi Twoje zdjęcia?</h2>
          <p className="type-body mt-5 text-ink/76">
            Nazywam się Łukasz Janiczek. Fotografuję naturalnie, bez sztywnego pozowania.
            Sesję możemy zaplanować w mieście, w domu lub w plenerze blisko Bochni;
            miejsce dobieramy do rodzaju zdjęć i tego, w czym czujesz się swobodnie.
          </p>
          <Link href="/o-mnie" className="type-action text-link mt-4 inline-flex min-h-11 items-center text-cognac">
            Poznaj fotografa <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
