"use client";

import Image from "next/image";
import { cloudinaryAsset } from "@/lib/cloudinary";
import { InPageLink } from "@/components/InPageLink";

type HeroProps = {
  imagePublicId: string;
  imageAlt: string;
  imagePosition?: string;
  imageBlurDataURL?: string;
};

export function Hero({ imagePublicId, imageAlt, imagePosition, imageBlurDataURL }: HeroProps) {
  const image = cloudinaryAsset(imagePublicId, { width: 1920, quality: 82 });

  return (
    <section
      id="start"
      className="relative grid min-h-[100svh] grid-rows-[auto_auto] overflow-hidden bg-cream pt-[86px] md:min-h-[100dvh] md:grid-cols-[48%_52%] md:grid-rows-1 md:pt-0"
    >
      <div
        className="relative z-10 flex flex-col justify-center px-5 pb-7 pt-6 sm:px-8 md:min-h-[100dvh] md:px-12 md:pb-12 md:pt-28 lg:px-16 xl:px-[7vw]"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[7vw] translate-x-[98%] bg-cream md:block" />

        <p className="eyebrow text-cognac">
          Łukasz Janiczek · fotograf
        </p>

        <h1 className="type-hero mt-4 max-w-[11ch] text-ink md:mt-6">
          Naturalne zdjęcia w Bochni
        </h1>

        <p className="type-body mt-4 max-w-[43ch] text-ink/78 md:mt-6">
          Portrety, pary, uroczystości i eventy — spokojnie, bez sztywnego pozowania.
        </p>

        <div className="mt-5 flex flex-col gap-3 min-[390px]:flex-row md:mt-7">
          <InPageLink
            targetId="wybrane-prace"
            className="type-action button-primary min-h-12 justify-center px-5 min-[390px]:flex-1 min-[390px]:whitespace-nowrap min-[390px]:px-3 md:flex-none md:px-5"
          >
            Zobacz portfolio
          </InPageLink>
          <InPageLink
            targetId="kontakt"
            className="type-action button-outline min-h-12 justify-center px-5 min-[390px]:flex-1 min-[390px]:whitespace-nowrap min-[390px]:px-3 md:flex-none md:px-5"
          >
            Zapytaj o termin
          </InPageLink>
        </div>

      </div>

      <div className="relative aspect-[2/3] min-h-0 overflow-hidden sm:aspect-[4/5] md:aspect-auto md:min-h-[100dvh]">
        <div className="absolute inset-0 md:inset-[-2%]">
          <Image
            src={image.src}
            alt={imageAlt}
            fill
            priority
            fetchPriority="high"
            quality={84}
            sizes="(max-width: 767px) 100vw, 58vw"
            className="object-cover object-center"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
            placeholder="blur"
            blurDataURL={imageBlurDataURL || image.blurDataURL}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-cream/[0.04]" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-espresso/8 to-transparent md:hidden" />
      </div>
    </section>
  );
}
