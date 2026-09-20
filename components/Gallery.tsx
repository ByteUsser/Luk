"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cloudinaryAsset } from "@/lib/cloudinary";
import {
  GALLERY_CATEGORY_DEFINITIONS,
  galleryCategoryHref,
  type GalleryCategory
} from "@/lib/gallery-categories";

export type GalleryItem = {
  title: string;
  alt?: string;
  category: GalleryCategory;
  publicId: string;
  fullSrc?: string;
  imagePosition?: string;
  fit?: "cover" | "contain";
  cardClassName?: string;
  mobileCardClassName?: string;
  imageClassName?: string;
};

type GalleryProps = {
  items: GalleryItem[];
};

const cardLayouts = [
  "aspect-[4/5] sm:col-span-2 sm:aspect-[16/10] xl:col-span-7 xl:row-span-2 xl:aspect-auto xl:min-h-[560px]",
  "aspect-[4/3] xl:col-span-5 xl:aspect-auto xl:min-h-[272px]",
  "aspect-[4/3] xl:col-span-5 xl:aspect-auto xl:min-h-[272px]",
  "aspect-[3/2] xl:col-span-8 xl:aspect-auto xl:min-h-[600px]",
  "xl:col-span-4 xl:aspect-auto xl:min-h-[600px]"
] as const;

export function Gallery({ items }: GalleryProps) {
  const reduceMotion = useReducedMotion();

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
            <p className="eyebrow text-cognac">Portfolio</p>
            <h2 className="section-title mt-4 max-w-[14ch]">Zobacz, co fotografuję</h2>
          </div>
          <Link
            href="/galeria-zdjec"
            className="type-action text-link inline-flex min-h-11 w-fit items-center pb-1 text-ink/72"
          >
            Zobacz całe portfolio <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-12 xl:grid-rows-[272px_272px_600px] xl:gap-4">
          {items.map((item, index) => {
            const isLargeCard = index === 0 || index === 3;
            const category = GALLERY_CATEGORY_DEFINITIONS.find(
              (definition) => definition.name === item.category
            );
            const categoryHref = category ? galleryCategoryHref(category.slug) : "/galeria-zdjec";
            const image = cloudinaryAsset(item.publicId, {
              width: isLargeCard ? 1900 : 1200,
              quality: isLargeCard ? 84 : 82
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
            return (
              <motion.div
                key={`${item.publicId}-${item.title}`}
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
                <Link
                  href={categoryHref}
                  aria-label={`Zobacz galerię: ${item.category}`}
                  className="group relative block h-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
                >
                  <Image
                    src={image.src}
                    alt={item.alt || `${item.title} — ${item.category}`}
                    fill
                    loading={index < 2 ? "eager" : "lazy"}
                    quality={isLargeCard ? 84 : 82}
                    sizes={imageSizes}
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className={`${fitClass} transition duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.025] group-hover:saturate-[1.04] ${item.imageClassName ?? ""}`}
                    style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-espresso/48 via-transparent to-transparent opacity-55 transition-opacity group-hover:opacity-75" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-cream md:p-5">
                    <span className="type-meta block text-cream/82">
                      {item.category} <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
