"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { PhotoLightbox, preparePhotoLightbox } from "@/components/PhotoLightbox";
import { cloudinaryAsset, cloudinaryUrl } from "@/lib/cloudinary";

export type GalleryItem = {
  title: string;
  alt?: string;
  category: string;
  publicId: string;
  imagePosition?: string;
  fit?: "cover" | "contain";
  cardClassName?: string;
  mobileCardClassName?: string;
  imageClassName?: string;
};

type GalleryProps = {
  items: GalleryItem[];
  lightboxItems?: GalleryItem[];
};

const cardLayouts = [
  "aspect-[4/5] sm:col-span-2 sm:aspect-[16/10] xl:col-span-7 xl:row-span-2 xl:aspect-auto xl:min-h-[560px]",
  "aspect-[4/3] xl:col-span-5 xl:aspect-auto xl:min-h-[272px]",
  "aspect-[4/3] xl:col-span-5 xl:aspect-auto xl:min-h-[272px]",
  "aspect-[3/2] xl:col-span-8 xl:aspect-auto xl:min-h-[600px]",
  "xl:col-span-4 xl:aspect-auto xl:min-h-[600px]"
] as const;

function lightboxSrc(publicId: string) {
  return publicId.startsWith("/") ? publicId : cloudinaryUrl(publicId, { width: 1920, quality: "auto" });
}

export function Gallery({ items, lightboxItems = items }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const slides = useMemo(
    () => lightboxItems.map((item) => ({ src: lightboxSrc(item.publicId), alt: item.alt || item.title })),
    [lightboxItems]
  );

  return (
    <section id="wybrane-prace" className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1320px]" data-scroll-anchor>
        <motion.div
          className="flex flex-col gap-5 border-b border-ink/12 pb-8 sm:flex-row sm:items-end sm:justify-between"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="eyebrow text-cognac">Galeria</p>
            <h2 className="section-title mt-4 max-w-[12ch]">Wybrane zdjęcia</h2>
          </div>
          <Link
            href="/galeria-zdjec"
            className="text-link inline-flex min-h-11 w-fit items-center pb-1 text-[0.78rem] uppercase tracking-[0.12em] text-ink/72"
          >
            Cała galeria <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-12 xl:grid-rows-[272px_272px_600px] xl:gap-4">
          {items.map((item, index) => {
            const isLargeCard = index === 0 || index === 3;
            const image = cloudinaryAsset(item.publicId, {
              width: isLargeCard ? 1900 : 1200,
              quality: isLargeCard ? 75 : 72
            });
            const fitClass = item.fit === "contain" ? "object-contain bg-espresso p-2" : "object-cover";
            const imageSizes =
              index === 0
                ? "(max-width: 639px) 92vw, (max-width: 1279px) 92vw, 58vw"
                : index === 3
                  ? "(max-width: 1279px) 46vw, 66vw"
                  : index === 4
                    ? "32vw"
                    : "(max-width: 639px) 92vw, (max-width: 1279px) 46vw, 40vw";
            const fullGalleryIndex = lightboxItems.findIndex(
              (lightboxItem) => lightboxItem.publicId === item.publicId
            );

            return (
              <motion.button
                key={`${item.publicId}-${item.title}`}
                type="button"
                aria-label={`Otwórz zdjęcie — ${item.category}`}
                onClick={(event) => {
                  lightboxTriggerRef.current = event.currentTarget;
                  void preparePhotoLightbox().finally(() =>
                    setLightboxIndex(fullGalleryIndex >= 0 ? fullGalleryIndex : index)
                  );
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
                transition={{
                  duration: 0.72,
                  delay: Math.min(index * 0.055, 0.24),
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`group relative overflow-hidden rounded-[1.05rem] bg-sand text-left shadow-[0_16px_36px_rgba(36,31,27,0.09)] ${
                  index === 4 ? "hidden xl:block" : index >= 3 ? "hidden sm:block" : "block"
                } ${
                  cardLayouts[index] ?? "aspect-[4/3] xl:col-span-4 xl:min-h-[310px]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={item.alt || `${item.title} — ${item.category}`}
                  fill
                  loading={index < 2 ? "eager" : "lazy"}
                  quality={isLargeCard ? 75 : 72}
                  sizes={imageSizes}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  className={`${fitClass} transition duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.025] group-hover:saturate-[1.04] ${item.imageClassName ?? ""}`}
                  style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-espresso/48 via-transparent to-transparent opacity-55 transition-opacity group-hover:opacity-75" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-cream md:p-5">
                  <span className="block text-[0.69rem] uppercase tracking-[0.15em] text-cream/82">{item.category}</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <PhotoLightbox
        slides={slides}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
        returnFocusRef={lightboxTriggerRef}
      />
    </section>
  );
}
