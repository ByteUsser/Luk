"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { MotionReveal } from "@/components/MotionReveal";
import { PhotoLightbox, preparePhotoLightbox } from "@/components/PhotoLightbox";
import { type GalleryCategory, type PhotoGalleryItem } from "@/lib/gallery";
import {
  GALLERY_CATEGORY_DEFINITIONS,
  galleryCategoryHref
} from "@/lib/gallery-categories";

const GALLERY_BATCH_SIZE = 12;
const GALLERY_COLUMN_QUERIES = [
  "(min-width: 640px)",
  "(min-width: 1024px)",
  "(min-width: 1536px)"
] as const;

function getGalleryColumnCount() {
  if (typeof window === "undefined") return 1;
  if (window.matchMedia(GALLERY_COLUMN_QUERIES[2]).matches) return 4;
  if (window.matchMedia(GALLERY_COLUMN_QUERIES[1]).matches) return 3;
  if (window.matchMedia(GALLERY_COLUMN_QUERIES[0]).matches) return 2;
  return 1;
}

function subscribeToGalleryColumns(onChange: () => void) {
  const mediaQueries = GALLERY_COLUMN_QUERIES.map((query) => window.matchMedia(query));
  mediaQueries.forEach((query) => query.addEventListener("change", onChange));

  return () => mediaQueries.forEach((query) => query.removeEventListener("change", onChange));
}

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
  eyebrow = "Galeria",
  heading = "Zdjęcia",
  description,
  emptyMessage = "Ta część galerii czeka na pierwsze zdjęcia.",
  contactSource = "galeria",
  availableCategories
}: PhotoGalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [visibleBatchCount, setVisibleBatchCount] = useState(1);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const columnCount = useSyncExternalStore(
    subscribeToGalleryColumns,
    getGalleryColumnCount,
    () => 1
  );

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
  const masonryColumns = useMemo(() => {
    const columns = Array.from(
      { length: columnCount },
      () => [] as Array<{ item: PhotoGalleryItem; globalIndex: number }>
    );
    const columnHeights = Array.from({ length: columnCount }, () => 0);

    visibleItems.forEach((item, globalIndex) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      columns[shortestColumn].push({ item, globalIndex });
      columnHeights[shortestColumn] += item.height / item.width + 0.04;
    });

    return columns;
  }, [columnCount, visibleItems]);
  const categorySet = new Set<GalleryCategory>(availableCategories || items.map((item) => item.category));
  const navigationCategories = GALLERY_CATEGORY_DEFINITIONS.filter(
    (category) => (!("navigation" in category) || category.navigation !== false) && categorySet.has(category.name)
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
            <p className="mt-5 max-w-[68ch] text-[1rem] leading-relaxed text-ink/74">
              {description}
            </p>
          ) : null}
        </div>
        <Link
          href={`/kontakt?source=${contactSource}-gora`}
          className="text-link inline-flex min-h-11 w-fit items-center pb-1 text-[0.76rem] uppercase tracking-[0.12em] text-ink/72"
        >
          Sprawdź termin <span aria-hidden="true">→</span>
        </Link>
      </motion.div>

      <div className="mt-5 border-b border-ink/12 pb-5">
        <div className="flex flex-wrap gap-2" aria-label="Kategorie galerii">
          <Link
            href="/galeria-zdjec"
            aria-current={activeCategory ? undefined : "page"}
            className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border px-4 text-[0.76rem] font-normal uppercase tracking-[0.09em] transition ${
              activeCategory
                ? "border-ink/18 bg-transparent text-ink/68 hover:border-sage hover:text-sageDark"
                : "border-espresso bg-espresso text-cream"
            }`}
          >
            Wszystkie
          </Link>
          {navigationCategories.map((category) => {
            const isActive = activeCategory === category.name;
            return (
              <Link
                key={category.slug}
                href={galleryCategoryHref(category.slug)}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border px-4 text-[0.76rem] font-normal uppercase tracking-[0.09em] transition ${
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
      </div>

      <div
        className="mt-8 grid items-start gap-4"
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {masonryColumns.map((column, columnIndex) => (
          <div
            key={`gallery-column-${columnIndex}`}
            className="flex min-w-0 flex-col gap-4"
          >
            {column.map(({ item, globalIndex }) => (
                <motion.article
                  key={`${item.src}-${item.category}`}
                  className="min-w-0"
                  initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.62,
                    delay: reduceMotion ? 0 : Math.min((globalIndex % GALLERY_BATCH_SIZE) * 0.035, 0.25),
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <button
                    type="button"
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
                        loading={globalIndex < 3 ? "eager" : "lazy"}
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
            className="button-outline min-h-12 px-5 text-[0.78rem] uppercase tracking-[0.12em]"
          >
            Pokaż więcej zdjęć
          </button>
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="mt-8 rounded-[1.2rem] border border-ink/12 bg-surface p-6 md:p-8">
          <p className="eyebrow text-cognac">Galeria w przygotowaniu</p>
          <p className="mt-4 max-w-[62ch] text-[1rem] leading-relaxed text-ink/76">
            {emptyMessage}
          </p>
        </div>
      ) : null}

      <MotionReveal className="mt-12">
        <div className="rounded-[1.15rem] bg-espresso px-5 py-8 text-cream md:flex md:items-center md:justify-between md:gap-8 md:px-8">
          <div>
            <p className="eyebrow text-[#c8ad8d]">Kontakt</p>
            <h2 className="mt-3 max-w-[15ch] font-display text-[2.3rem] leading-[0.95]">Masz pomysł na zdjęcia?</h2>
          </div>
          <Link
            href={`/kontakt?source=${contactSource}-dol`}
            className="button-dark mt-6 min-h-12 justify-center px-5 text-[0.78rem] uppercase tracking-[0.12em] md:mt-0"
          >
            Sprawdź termin
          </Link>
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
