"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cloudinaryAsset } from "@/lib/cloudinary";

type HeroProps = {
  imagePublicId: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ imagePublicId }: HeroProps) {
  const image = cloudinaryAsset(imagePublicId, { width: 1800 });

  return (
    <section id="start" className="relative min-h-[100dvh] overflow-hidden md:grid md:grid-cols-[45%_55%]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.13,
              delayChildren: 0.2
            }
          }
        }}
        className="relative order-2 flex min-h-[40dvh] flex-col justify-end bg-cream px-5 pb-12 pt-24 md:order-1 md:min-h-[100dvh] md:px-12 md:pb-16 md:pt-32 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[8vw] translate-x-[96%] bg-cream md:block" />
        <motion.span
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease }}
          className="eyebrow mb-6 text-cognac"
        >
          Polska • Portret • Lifestyle
        </motion.span>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.95, ease }}
          className="hero-title max-w-[10ch] text-ink"
        >
          Łapię <span className="italic">chwile</span>
          <br />
          jak z filmu
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease }}
          className="mt-7 max-w-[34ch] text-[0.98rem] leading-relaxed text-ink/80 md:text-[1.04rem]"
        >
          Portrety, plenery i sesje dla par w ciepłej, analogowej estetyce. Naturalne światło,
          prawdziwe emocje i spokojna atmosfera bez sztywnego pozowania.
        </motion.p>

        <motion.a
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease }}
          href="#kontakt"
          className="mt-10 inline-flex min-h-[44px] max-w-full items-center gap-2 rounded-full border border-ink/30 bg-cream/90 px-4 text-[0.66rem] uppercase tracking-[0.16em] text-ink shadow-[0_8px_22px_rgba(42,36,32,0.12)] backdrop-blur-sm transition-colors duration-700 hover:border-ink/55 hover:bg-cream sm:gap-3 sm:px-5 sm:text-[0.72rem] sm:tracking-[0.22em]"
        >
          Umów sesję
          <span className="h-px w-10 bg-ink/60" />
        </motion.a>

        <motion.p
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.8, ease }}
          className="mt-7 text-[0.74rem] uppercase tracking-[0.22em] text-ink/70"
        >
          Janiczekfoto
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease }}
        className="relative order-1 min-h-[60dvh] md:order-2 md:min-h-[100dvh]"
      >
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src={image.src}
            alt="Kadr podróżniczy o złotej godzinie"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={image.blurDataURL}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-cream/20 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
