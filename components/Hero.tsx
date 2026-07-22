"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cloudinaryAsset } from "@/lib/cloudinary";
import { InPageLink } from "@/components/InPageLink";

type HeroProps = {
  imagePublicId: string;
  imagePosition?: string;
};

export function Hero({ imagePublicId, imagePosition }: HeroProps) {
  const image = cloudinaryAsset(imagePublicId, { width: 1400, quality: 68 });
  const reduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section
      id="start"
      className="relative grid min-h-[100svh] grid-rows-[auto_auto] overflow-hidden bg-cream pt-[86px] md:min-h-[100dvh] md:grid-cols-[48%_52%] md:grid-rows-1 md:pt-0"
    >
      <motion.div
        className="relative z-10 flex flex-col justify-center px-5 pb-7 pt-6 sm:px-8 md:min-h-[100dvh] md:px-12 md:pb-12 md:pt-28 lg:px-16 xl:px-[7vw]"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } }
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[7vw] translate-x-[98%] bg-cream md:block" />

        <motion.p variants={itemVariants} className="eyebrow text-cognac">
          Łukasz Janiczek • fotograf
        </motion.p>

        <motion.h1 variants={itemVariants} className="mt-4 max-w-[12ch] font-display text-[clamp(2.85rem,11vw,4.1rem)] leading-[0.9] tracking-[-0.035em] text-ink md:mt-6 md:text-[clamp(3.7rem,5.1vw,5.8rem)]">
          Naturalnie
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-4 max-w-[43ch] text-[0.96rem] leading-relaxed text-ink/78 md:mt-6 md:text-[1.03rem]">
          Portrety, pary, uroczystości i reportaże. Bochnia i okolice, Kraków oraz Tarnów.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-5 flex flex-col gap-3 min-[390px]:flex-row md:mt-7">
          <InPageLink
            targetId="wybrane-prace"
            className="button-primary min-h-12 justify-center px-5 text-[0.8rem] uppercase tracking-[0.12em] min-[390px]:flex-1 min-[390px]:whitespace-nowrap min-[390px]:px-3 min-[390px]:text-[0.72rem] min-[390px]:tracking-[0.08em] md:flex-none md:px-5 md:text-[0.8rem] md:tracking-[0.12em]"
          >
            Zobacz zdjęcia
          </InPageLink>
          <InPageLink
            targetId="kontakt"
            className="button-outline min-h-12 justify-center px-5 text-[0.8rem] uppercase tracking-[0.12em] min-[390px]:flex-1 min-[390px]:whitespace-nowrap min-[390px]:px-3 min-[390px]:text-[0.72rem] min-[390px]:tracking-[0.08em] md:flex-none md:px-5 md:text-[0.8rem] md:tracking-[0.12em]"
          >
            Sprawdź termin
          </InPageLink>
        </motion.div>

      </motion.div>

      <div className="relative aspect-[2/3] min-h-0 overflow-hidden sm:aspect-[4/5] md:aspect-auto md:min-h-[100dvh]">
        <motion.div
          className="absolute inset-0 md:inset-[-5%]"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={image.src}
            alt="Zdjęcie z portfolio Janiczek Foto"
            fill
            priority
            fetchPriority="high"
            quality={68}
            sizes="(max-width: 767px) 100vw, 52vw"
            className="object-cover object-center"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
            placeholder="empty"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/16 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-espresso/10 to-transparent md:hidden" />
      </div>
    </section>
  );
}
