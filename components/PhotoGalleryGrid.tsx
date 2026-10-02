"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { MotionReveal } from "@/components/MotionReveal";
import { PhotoLightbox, preparePhotoLightbox } from "@/components/PhotoLightbox";
import { buildContactHref } from "@/lib/contact-prefill";
import { type GalleryCategory, type PhotoGalleryItem } from "@/lib/gallery";
import {
  GALLERY_CATEGORY_DEFINITIONS,
  galleryCategoryHref
} from "@/lib/gallery-categories";

type PhotoGalleryGridProps = {
  items: PhotoGalleryItem[];
  activeCategory?: GalleryCategory;
  eyebrow?: string;
  heading?: string;
  description?: string;
  emptyMessage?: string;
  contactSource?: string;
  availableCategories?: GalleryCategory[];
  presentation?: "category" | "overview";
};

const INITIAL_GALLERY_SIZE = 24;
const INITIAL_OVERVIEW_SIZE = 12;
const GALLERY_BATCH_SIZE = 24;
const LIGHTBOX_WIDTHS = [640, 1080, 1280, 1920] as const;

function optimizedLightboxSrc(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=82`;
}

function buildLightboxSlide(item: PhotoGalleryItem) {
  const source = item.fullSrc || item.src;

  return {
    src: optimizedLightboxSrc(source, LIGHTBOX_WIDTHS.at(-1)!),
    alt: item.alt,
    width: item.width,
    height: item.height,
    srcSet: LIGHTBOX_WIDTHS.map((width) => ({
      src: optimizedLightboxSrc(source, width),
      width,
      height: Math.round((width * item.height) / item.width)
    }))
  };
}

export function PhotoGalleryGrid({
  items,
  activeCategory,
  eyebrow = "Portfolio",
  heading = "Zdjęcia",
  description,
  emptyMessage = "Ta część portfolio czeka na pierwsze zdjęcia.",
  contactSource = "galeria",
  availableCategories,
  presentation = "category"
}: PhotoGalleryGridProps) {
  const isOverview = presentation === "overview";
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(
    isOverview ? INITIAL_OVERVIEW_SIZE : INITIAL_GALLERY_SIZE
  );
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);

  const hasMoreItems = items.length > visibleCount;
  const visibleItems = hasMoreItems ? items.slice(0, visibleCount) : items;

  const slides = useMemo(
    () => items.map(buildLightboxSlide),
    [items]
  );

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
    <section
      id={isOverview ? "wszystkie-zdjecia" : undefined}
      aria-labelledby={isOverview ? "wszystkie-zdjecia-heading" : undefined}
      className={`mx-auto max-w-[1500px] ${isOverview ? "scroll-mt-28 border-t border-ink/10 pt-12 md:pt-16" : ""}`}
    >
      {isOverview ? (
        <div className="max-w-[42rem]">
          <h2 id="wszystkie-zdjecia-heading" className="section-title">
            Wszystkie zdjęcia
          </h2>
          <p className="type-body mt-5 text-ink/75">
            Różne historie w jednym miejscu. Otwórz zdjęcie, by zobaczyć je w całości.
          </p>
        </div>
      ) : (
        <>
      <div
        className="flex flex-col gap-6 border-b border-ink/12 pb-8 sm:flex-row sm:items-end sm:justify-between"
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
      </div>

      <nav className="mt-5 border-b border-ink/12 pb-5" aria-label="Kategorie portfolio">
        <div className="flex items-center justify-between gap-4">
          <p id="portfolio-services-label" className="type-meta text-cognac">
            Usługi fotograficzne
          </p>
          <Link
            href="/galeria-zdjec"
            aria-current={activeCategory ? undefined : "page"}
            className={`type-action inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cognac ${
              activeCategory
                ? "border-cognac bg-cognac/10 text-espresso hover:bg-cognac hover:text-cream"
                : "border-espresso bg-espresso text-cream"
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
            <p id="portfolio-personal-label" className="type-meta text-ink/68">
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
                        : "border-ink/12 bg-surface/55 text-ink/68 hover:border-sage hover:text-sageDark"
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
        </>
      )}

      <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
        {visibleItems.map((item, globalIndex) => {
          const isPrimaryImage = !isOverview && globalIndex === 0;

          return (
            <article
              key={`${item.src}-${item.category}`}
              className="min-w-0"
            >
              <button
                type="button"
                aria-label={`Otwórz zdjęcie ${globalIndex + 1} z ${items.length}: ${item.alt}`}
                className="group block w-full overflow-hidden rounded-xl bg-sand shadow-[0_12px_30px_rgba(42,36,32,0.08)] transition-transform active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cognac motion-reduce:transition-none sm:rounded-[1.1rem]"
                onClick={(event) => {
                  lightboxTriggerRef.current = event.currentTarget;
                  void preparePhotoLightbox();
                  setLightboxIndex(globalIndex);
                }}
              >
                <span className="relative block aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 639px) 46vw, (max-width: 1023px) 46vw, (max-width: 1535px) 31vw, 23vw"
                    loading={isPrimaryImage ? "eager" : "lazy"}
                    fetchPriority={isPrimaryImage ? "high" : "auto"}
                    decoding="async"
                    quality={82}
                    placeholder={item.blurDataURL ? "blur" : "empty"}
                    blurDataURL={item.blurDataURL}
                    className="object-cover transition duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.025] group-hover:saturate-[1.04] motion-reduce:transition-none"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
              </button>
            </article>
          );
        })}
      </div>

      {hasMoreItems ? (
        <div className="mt-7 flex flex-col items-center gap-3">
          <p className="type-meta text-ink/70" aria-live="polite">
            Pokazano {visibleItems.length} z {items.length} zdjęć
          </p>
          <button
            type="button"
            className="type-action button-outline min-h-12 justify-center px-6"
            onClick={() =>
              setVisibleCount((current) => Math.min(items.length, current + GALLERY_BATCH_SIZE))
            }
          >
            Pokaż kolejne zdjęcia
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

      {!isOverview ? (
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
      ) : null}

      <PhotoLightbox
        slides={slides}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
        returnFocusRef={lightboxTriggerRef}
      />
    </section>
  );
}
