"use client";

import Image from "next/image";
import Link from "next/link";
import { cloudinaryAsset } from "@/lib/cloudinary";
import {
  GALLERY_CATEGORY_DEFINITIONS,
  galleryCategoryHref,
  type GalleryCategory
} from "@/lib/gallery-categories";
import { SERVICE_STARTING_PRICES } from "@/lib/service-prices";

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
  "col-span-2 aspect-[5/4] sm:aspect-[16/10] xl:col-span-7 xl:row-span-2 xl:aspect-auto xl:min-h-[560px]",
  "aspect-[4/5] sm:aspect-[4/3] xl:col-span-5 xl:aspect-auto xl:min-h-[272px]",
  "aspect-[4/5] sm:aspect-[4/3] xl:col-span-5 xl:aspect-auto xl:min-h-[272px]",
  "aspect-[4/5] sm:aspect-[3/2] xl:col-span-8 xl:aspect-auto xl:min-h-[600px]",
  "aspect-[4/5] sm:aspect-[3/2] xl:col-span-4 xl:aspect-auto xl:min-h-[600px]"
] as const;

export function Gallery({ items }: GalleryProps) {
  return (
    <section id="wybrane-prace" className="px-5 py-14 md:px-10 md:py-20">
      <div id="oferta" className="mx-auto max-w-[1320px]" data-scroll-anchor>
        <div
          className="flex flex-col gap-5 border-b border-ink/12 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="eyebrow text-cognac">Portfolio</p>
            <h2 className="section-title mt-4 max-w-[14ch]">Zobacz, co fotografuję</h2>
          </div>
          <Link
            href="/cennik"
            className="type-action text-link inline-flex min-h-11 w-fit items-center pb-1 text-ink/72"
          >
            Zobacz pełny cennik <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-12 xl:grid-rows-[272px_272px_600px]">
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
            const startingPrice = SERVICE_STARTING_PRICES[item.category as keyof typeof SERVICE_STARTING_PRICES];
            const imageSizes =
              index === 0
                ? "(max-width: 639px) 92vw, (max-width: 1279px) 92vw, 58vw"
                : index === 3
                  ? "(max-width: 1279px) 46vw, 66vw"
                  : index === 4
                    ? "(max-width: 1279px) 46vw, 32vw"
                    : "(max-width: 1279px) 46vw, 40vw";
            return (
              <div
                key={`${item.publicId}-${item.title}`}
                className={`group relative min-w-0 overflow-hidden rounded-[1.05rem] bg-sand text-left shadow-[0_16px_36px_rgba(36,31,27,0.09)] ${
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
                  <span className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-cream sm:p-5">
                    <h3 className={`font-display leading-[0.98] ${index === 0 ? "text-[2rem] sm:text-[2.8rem]" : "text-[1.25rem] sm:text-[2rem]"}`}>
                      {category?.label || item.category} <span aria-hidden="true" className={index === 0 ? undefined : "hidden sm:inline"}>→</span>
                    </h3>
                    {startingPrice ? (
                      <span className="type-meta mt-2 block text-cream/88">{startingPrice}</span>
                    ) : null}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
