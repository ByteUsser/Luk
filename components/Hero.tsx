import Image from "next/image";
import { cloudinaryAsset } from "@/lib/cloudinary";
import { SITE_CONFIG } from "@/lib/site-config";

type HeroProps = {
  imagePublicId: string;
};

export function Hero({ imagePublicId }: HeroProps) {
  const image = cloudinaryAsset(imagePublicId, { width: 1200, quality: 62 });

  return (
    <section id="start" className="relative grid min-h-[100dvh] overflow-hidden md:grid-cols-[45%_55%]">
      <div className="relative order-2 flex min-h-[40dvh] flex-col justify-end bg-cream px-5 pb-12 pt-24 md:order-1 md:min-h-[100dvh] md:px-12 md:pb-16 md:pt-40 lg:px-16 lg:pt-44 xl:pt-40">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[8vw] translate-x-[96%] bg-cream md:block" />
        <span className="eyebrow mb-6 text-cognac">
          Polska • Portret • Lifestyle
        </span>

        <h1 className="hero-title max-w-[10ch] text-ink">
          Łapię <span className="italic">chwile</span>
          <br />
          jak z filmu
        </h1>

        <p className="mt-7 max-w-[34ch] text-[0.98rem] leading-relaxed text-ink/80 md:text-[1.04rem]">
          Portrety, plenery i sesje dla par w ciepłej, analogowej estetyce. Naturalne światło,
          prawdziwe emocje i spokojna atmosfera bez sztywnego pozowania.
        </p>

        <a
          href="#kontakt"
          className="mt-10 inline-flex min-h-[44px] max-w-full items-center gap-2 rounded-full border border-ink/30 bg-cream/90 px-4 text-[0.66rem] uppercase tracking-[0.16em] text-ink shadow-[0_8px_22px_rgba(42,36,32,0.12)] backdrop-blur-sm transition-colors duration-700 hover:border-ink/55 hover:bg-cream sm:gap-3 sm:px-5 sm:text-[0.72rem] sm:tracking-[0.22em]"
        >
          Umów sesję
          <span className="h-px w-10 bg-ink/60" />
        </a>

        <p className="mt-7 text-[0.74rem] uppercase tracking-[0.22em] text-ink/70">
          {SITE_CONFIG.name}
        </p>
      </div>

      <div className="relative order-1 min-h-[60dvh] md:order-2 md:min-h-[100dvh]">
        <div className="absolute inset-0">
          <Image
            src={image.src}
            alt="Kadr podróżniczy o złotej godzinie"
            fill
            priority
            fetchPriority="high"
            quality={62}
            sizes="(max-width: 767px) 92vw, 55vw"
            className="object-cover"
            placeholder="empty"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-cream/20 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
