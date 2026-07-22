import Image from "next/image";
import Link from "next/link";
import { cloudinaryAsset } from "@/lib/cloudinary";
import { InPageLink } from "@/components/InPageLink";
import { SITE_CONFIG } from "@/lib/site-config";

type AboutProps = {
  publicId: string;
};

const facts = ["Bochnia", "Spokojne prowadzenie", "Gotowe pliki online"] as const;

export function About({ publicId }: AboutProps) {
  const image = cloudinaryAsset(publicId, { width: 1000, quality: 72 });

  return (
    <section id="o-mnie" className="relative overflow-hidden bg-sand/52 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="relative" data-scroll-anchor>
          <p className="eyebrow text-cognac">Po drugiej stronie aparatu</p>
          <h2 className="section-title mt-4 max-w-[11ch]">Cześć, jestem Łukasz</h2>

          <p className="mt-7 max-w-[55ch] text-[1.04rem] leading-relaxed text-ink/80">
            Fotografuję ludzi, relacje i wydarzenia. Najbardziej zależy mi na zdjęciach,
            które wyglądają naturalnie. Pomagam z miejscem i planem, a podczas zdjęć podpowiadam,
            co robić — bez sztywnego ustawiania.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {facts.map((fact) => (
              <span key={fact} className="rounded-full border border-ink/14 bg-surface/70 px-3 py-2 text-[0.72rem] uppercase tracking-[0.1em] text-ink/70">
                {fact}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <InPageLink targetId="kontakt" className="button-primary min-h-12 px-5 text-[0.78rem] uppercase tracking-[0.12em]">
              Napisz do mnie
            </InPageLink>
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

        <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-espresso shadow-[0_24px_60px_rgba(23,17,13,0.16)]">
          <Image
            src={image.src}
            alt="Krajobraz w ciepłym świetle — inspiracja Janiczek Foto"
            fill
            loading="lazy"
            quality={72}
            sizes="(max-width: 1023px) 92vw, 44vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={image.blurDataURL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 text-cream md:p-6">
            <p className="max-w-[32ch] font-display text-[1.8rem] leading-[1.02]">Światło, emocje i spokojny rytm — tego szukam w zdjęciach.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
