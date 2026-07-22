import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicPageShell } from "@/components/PublicPageShell";
import { SITE_CONFIG } from "@/lib/site-config";
import { getResolvedSiteContent } from "@/sanity/lib/site-content";

export const metadata: Metadata = {
  title: "O mnie",
  description:
    "Łukasz Janiczek — fotograf z Bochni. Portrety, sesje dla par, uroczystości i reportaże.",
  alternates: {
    canonical: "/o-mnie"
  },
  openGraph: {
    url: `${SITE_CONFIG.url}/o-mnie`,
    title: `O mnie | ${SITE_CONFIG.name}`,
    description: "Łukasz Janiczek — fotograf z Bochni. Portrety, uroczystości i reportaże.",
    images: [SITE_CONFIG.ogImage]
  }
};

const workPoints = [
  "Przed sesją ustalamy miejsce i prosty plan.",
  "Na miejscu podpowiadam bez sztywnego ustawiania.",
  "Wybrane i obrobione zdjęcia dostajesz w galerii online."
] as const;

export default async function AboutPage() {
  const { aboutImage } = await getResolvedSiteContent();

  return (
    <PublicPageShell>
      <main className="px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <section className="mx-auto grid max-w-[1120px] gap-10 border-y border-ink/12 py-10 md:py-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
          <figure
            className="relative order-2 aspect-[4/5] max-h-[650px] overflow-hidden rounded-[1.2rem] bg-sand text-cream shadow-[0_22px_52px_rgba(23,17,13,0.18)] lg:order-1"
            aria-label="Łukasz Janiczek — fotograf"
          >
            <Image
              src={aboutImage.src}
              alt="Łukasz Janiczek, fotograf Janiczek Foto"
              fill
              priority
              quality={82}
              sizes="(max-width: 1023px) 92vw, 40vw"
              className="object-cover object-center"
              style={aboutImage.position ? { objectPosition: aboutImage.position } : undefined}
            />
          </figure>

          <div className="order-1 lg:order-2">
            <p className="eyebrow text-cognac">O mnie</p>
            <h1 className="section-title mt-4 max-w-[9ch]">Mam na imię Łukasz.</h1>
            <p className="mt-6 max-w-[52ch] text-[1.04rem] leading-relaxed text-ink/82">
              Fotografuję ludzi i wydarzenia. Lubię naturalne światło, swobodny ruch i zdjęcia,
              które nie wyglądają na ustawione.
            </p>
            <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-ink/74">
              Pracuję głównie w Bochni i okolicy. Podczas zdjęć podpowiadam, kiedy trzeba,
              więc nie musisz umieć pozować. Do Krakowa i Tarnowa dojeżdżam po ustaleniu terminu.
            </p>

            <ul className="mt-7 divide-y divide-ink/12 border-y border-ink/12">
              {workPoints.map((point) => (
                <li key={point} className="py-3.5 text-[0.96rem] leading-relaxed text-ink/78">
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kontakt?source=o-mnie"
                className="button-primary min-h-12 px-5 text-[0.78rem] uppercase tracking-[0.12em]"
              >
                Sprawdź termin
              </Link>
              <Link
                href={SITE_CONFIG.googleBusinessProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline min-h-12 px-5 text-[0.78rem] uppercase tracking-[0.12em]"
              >
                Opinie w Google
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
