"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { MotionReveal } from "@/components/MotionReveal";
import { PhotoLightbox, preparePhotoLightbox } from "@/components/PhotoLightbox";
import { buildContactHref } from "@/lib/contact-prefill";
import { type GalleryCategory, type PhotoGalleryItem } from "@/lib/gallery";
import {
  GALLERY_CATEGORY_DEFINITIONS,
  galleryCategoryHref
} from "@/lib/gallery-categories";

const GALLERY_BATCH_SIZE = 12;

type PhotoGalleryGridProps = {
  items: PhotoGalleryItem[];
  activeCategory?: GalleryCategory;
  eyebrow?: string;
  heading?: string;
  description?: string;
  emptyMessage?: string;
  contactSource?: string;
  availableCategories?: GalleryCategory[];
};

export function PhotoGalleryGrid({
  items,
  activeCategory,
  eyebrow = "Portfolio",
  heading = "Zdjęcia",
  description,
  emptyMessage = "Ta część portfolio czeka na pierwsze zdjęcia.",
  contactSource = "galeria",
  availableCategories
}: PhotoGalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [visibleBatchCount, setVisibleBatchCount] = useState(1);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();

  const slides = useMemo(
    () =>
      items.map((item) => ({
        src: item.fullSrc || item.src,
        alt: item.alt,
        width: item.width,
        height: item.height
      })),
    [items]
  );

  const visibleItems = items.slice(0, visibleBatchCount * GALLERY_BATCH_SIZE);
  const categorySet = new Set<GalleryCategory>(availableCategories || items.map((item) => item.category));
  if (activeCategory) {
    categorySet.add(activeCategory);
  }
  const navigationCategories = GALLERY_CATEGORY_DEFINITIONS.filter(
    (category) => !("navigation" in category) || category.navigation !== false
  );
  const serviceCategories = navigationCategories.filter(
    (category) => category.portfolioGroup === "services"
  );
  const personalCategories = navigationCategories.filter(
    (category) =>
      category.portfolioGroup === "personal" && categorySet.has(category.name)
  );

  return (
    <section className="mx-auto max-w-[1500px]">
      <motion.div
        className="flex flex-col gap-6 border-b border-ink/12 pb-8 sm:flex-row sm:items-end sm:justify-between"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="eyebrow text-cognac">{eyebrow}</p>
          <h1 className="section-title mt-4 max-w-[14ch]">{heading}</h1>
          {description ? (
            <p className="type-body mt-5 max-w-[56ch] text-ink/74">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3 sm:justify-end">
          <Link
            href="/cennik"
            className="type-action button-outline min-h-12 justify-center px-5"
          >
            Zobacz cennik
          </Link>
          <Link
            href={buildContactHref(`${contactSource}-gora`)}
            className="type-action button-primary min-h-12 justify-center px-5"
          >
            Zapytaj o termin
          </Link>
        </div>
      </motion.div>

      <nav className="mt-5 border-b border-ink/12 pb-5" aria-label="Kategorie portfolio">
        <div className="flex items-center justify-between gap-4">
          <p id="portfolio-services-label" className="type-meta text-cognac">
            Usługi fotograficzne
          </p>
          <Link
            href="/galeria-zdjec"
            aria-current={activeCategory ? undefined : "page"}
            className={`type-action inline-flex min-h-11 items-center border-b transition ${
              activeCategory
                ? "border-transparent text-ink/62 hover:border-sage hover:text-sageDark"
                : "border-cognac text-cognac"
            }`}
          >
            Całe portfolio
          </Link>
        </div>

        <div
          className="mt-3 flex flex-wrap gap-2"
          role="group"
          aria-labelledby="portfolio-services-label"
        >
          {serviceCategories.map((category) => {
            const isActive = activeCategory === category.name;
            return (
              <Link
                key={category.slug}
                href={galleryCategoryHref(category.slug)}
                aria-current={isActive ? "page" : undefined}
                className={`type-action inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border px-4 transition ${
                  isActive
                    ? "border-espresso bg-espresso text-cream"
                    : "border-ink/18 bg-transparent text-ink/68 hover:border-sage hover:text-sageDark"
                }`}
              >
                {category.label}
              </Link>
            );
          })}
        </div>

        {personalCategories.length > 0 ? (
          <div className="mt-4 border-t border-ink/10 pt-4">
            <p id="portfolio-personal-label" className="type-meta text-ink/48">
              Projekty własne
            </p>
            <div
              className="mt-3 flex flex-wrap gap-2"
              role="group"
              aria-labelledby="portfolio-personal-label"
            >
              {personalCategories.map((category) => {
                const isActive = activeCategory === category.name;
                return (
                  <Link
                    key={category.slug}
                    href={galleryCategoryHref(category.slug)}
                    aria-current={isActive ? "page" : undefined}
                    className={`type-action inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border px-4 transition ${
                      isActive
                        ? "border-espresso bg-espresso text-cream"
                        : "border-ink/12 bg-surface/55 text-ink/58 hover:border-sage hover:text-sageDark"
                    }`}
                  >
                    {category.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </nav>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 2xl:columns-4">
        {visibleItems.map((item, globalIndex) => (
          <motion.article
            key={`${item.src}-${item.category}`}
            className="mb-4 min-w-0 break-inside-avoid"
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.62,
              delay: reduceMotion
                ? 0
                : Math.min((globalIndex % GALLERY_BATCH_SIZE) * 0.035, 0.25),
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <button
              type="button"
              aria-label={`Otwórz zdjęcie: ${item.alt}`}
              className="group block w-full overflow-hidden rounded-[1.1rem] bg-sand shadow-[0_12px_30px_rgba(42,36,32,0.08)]"
              onClick={(event) => {
                lightboxTriggerRef.current = event.currentTarget;
                void preparePhotoLightbox();
                setLightboxIndex(globalIndex);
              }}
            >
              <span className="relative block overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1536px) 31vw, 23vw"
                  loading={globalIndex < GALLERY_BATCH_SIZE ? "eager" : "lazy"}
                  fetchPriority={globalIndex === 0 ? "high" : "auto"}
                  decoding="async"
                  quality={82}
                  className="h-auto w-full object-cover transition duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.025] group-hover:saturate-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/44 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
            </button>
          </motion.article>
        ))}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Widoczne zdjęcia: {visibleItems.length} z {items.length}.
      </p>

      {visibleItems.length < items.length ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleBatchCount((current) => current + 1)}
            className="type-action button-outline min-h-12 px-5"
          >
            Pokaż więcej zdjęć
          </button>
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="mt-8 rounded-[1.2rem] border border-ink/12 bg-surface p-6 md:p-8">
          <p className="eyebrow text-cognac">Portfolio w przygotowaniu</p>
          <p className="type-body mt-4 max-w-[62ch] text-ink/76">
            {emptyMessage}
          </p>
        </div>
      ) : null}

      <MotionReveal className="mt-12">
        <div className="rounded-[1.15rem] bg-espresso px-5 py-8 text-cream md:flex md:items-center md:justify-between md:gap-8 md:px-8">
          <div>
            <p className="eyebrow text-[#c8ad8d]">Kontakt</p>
            <h2 className="type-section mt-3 max-w-[15ch] text-cream">Masz pomysł na zdjęcia?</h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:justify-end">
            <Link
              href="/cennik"
              className="type-action button-dark min-h-12 justify-center px-5"
            >
              Zobacz cennik
            </Link>
            <Link
              href={buildContactHref(`${contactSource}-dol`)}
              className="type-action button-dark-solid min-h-12 justify-center px-5"
            >
              Zapytaj o termin
            </Link>
          </div>
        </div>
      </MotionReveal>

      <PhotoLightbox
        slides={slides}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
        returnFocusRef={lightboxTriggerRef}
      />
    </section>
  );
}
