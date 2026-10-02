import Image from "next/image";
import Link from "next/link";
import type { PhotoGalleryItem } from "@/lib/gallery";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import {
  GALLERY_CATEGORY_DEFINITIONS,
  galleryCategoryHref
} from "@/lib/gallery-categories";

type PortfolioNavigatorProps = {
  items: PhotoGalleryItem[];
};

const preferredCoverTitles: Partial<Record<PhotoGalleryItem["category"], string>> = {
  Portrety: "Wiosenny portret"
};

function findCategoryCover(items: PhotoGalleryItem[], category: PhotoGalleryItem["category"]) {
  const preferredTitle = preferredCoverTitles[category];

  return (
    items.find((item) => item.category === category && item.title === preferredTitle) ||
    items.find((item) => item.category === category)
  );
}

const overviewCategoryOrder: PhotoGalleryItem["category"][] = [
  "Śluby",
  "Portrety",
  "Sesje dla par",
  "Uroczystości",
  "Eventy",
  "Motoryzacja",
  "Podróże"
];

function interleaveCategories(items: PhotoGalleryItem[]) {
  const groups = overviewCategoryOrder.map((category) =>
    items.filter((item) => item.category === category)
  );
  const result: PhotoGalleryItem[] = [];

  const maxGroupLength = Math.max(0, ...groups.map((group) => group.length));
  for (let index = 0; index < maxGroupLength; index++) {
    for (const group of groups) {
      if (group[index]) result.push(group[index]);
    }
  }

  const included = new Set(result);
  return [...result, ...items.filter((item) => !included.has(item))];
}

export function PortfolioNavigator({ items }: PortfolioNavigatorProps) {
  const serviceCategories = GALLERY_CATEGORY_DEFINITIONS.filter(
    (category) => category.portfolioGroup === "services"
  );
  const personalCategories = GALLERY_CATEGORY_DEFINITIONS.filter(
    (category) =>
      category.portfolioGroup === "personal" &&
      items.some((item) => item.category === category.name)
  );
  const overviewItems = interleaveCategories(items);

  return (
    <section className="mx-auto max-w-[1500px]" aria-labelledby="portfolio-heading">
      <header className="flex flex-col gap-6 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[42rem]">
          <h1 id="portfolio-heading" className="section-title">
            Portfolio
          </h1>
          <p className="type-body mt-5 text-ink/75">
            Wybierz kategorię albo obejrzyj wszystkie zdjęcia.
          </p>
        </div>
        {items.length > 0 ? (
          <a
            href="#wszystkie-zdjecia"
            className="type-action button-primary min-h-12 w-full justify-center px-6 sm:w-auto"
          >
            Przeglądaj wszystkie zdjęcia
          </a>
        ) : null}
      </header>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
        {serviceCategories.map((category, index) => {
          const cover = findCategoryCover(items, category.name);

          return (
            <Link
              key={category.slug}
              href={galleryCategoryHref(category.slug)}
              aria-label={`Zobacz portfolio: ${category.label}`}
              className="group relative min-h-44 overflow-hidden rounded-xl bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cognac sm:min-h-80 sm:rounded-[1rem]"
            >
              {cover ? (
                <Image
                  src={cover.src}
                  alt=""
                  width={cover.width}
                  height={cover.height}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                  placeholder={cover.blurDataURL ? "blur" : "empty"}
                  blurDataURL={cover.blurDataURL}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.025]"
                />
              ) : null}
              <span className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/10 to-transparent" />
              <span className="absolute inset-x-2 bottom-4 font-display text-[1.25rem] font-normal leading-tight text-cream sm:inset-x-7 sm:bottom-6 sm:text-[clamp(2.2rem,5vw,3.5rem)] sm:leading-[0.94]">
                {category.label}
                <span className="ml-3 hidden text-[0.75em] transition-transform duration-300 group-hover:translate-x-1 sm:inline-block" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      {personalCategories.length > 0 ? (
        <nav className="mt-10 border-t border-ink/10 pt-6" aria-label="Projekty własne">
          <p className="type-meta text-ink/70">Projekty własne</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
            {personalCategories.map((category) => {
              const cover = findCategoryCover(items, category.name);

              return (
                <Link
                  key={category.slug}
                  href={galleryCategoryHref(category.slug)}
                  aria-label={`Zobacz portfolio: ${category.label}`}
                  className="group relative min-h-40 overflow-hidden rounded-xl bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cognac sm:min-h-56 sm:rounded-[1rem]"
                >
                  {cover ? (
                    <Image
                      src={cover.src}
                      alt=""
                      width={cover.width}
                      height={cover.height}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      loading="lazy"
                      placeholder={cover.blurDataURL ? "blur" : "empty"}
                      blurDataURL={cover.blurDataURL}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.025]"
                    />
                  ) : null}
                  <span className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/10 to-transparent" />
                  <span className="absolute inset-x-2 bottom-4 font-display text-[1.25rem] font-normal leading-tight text-cream sm:inset-x-6 sm:bottom-6 sm:text-[clamp(1.6rem,2.6vw,2rem)] sm:leading-none">
                    {category.label}
                    <span className="ml-3 hidden text-[0.75em] transition-transform duration-300 group-hover:translate-x-1 sm:inline-block" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}

      {overviewItems.length > 0 ? (
        <PhotoGalleryGrid items={overviewItems} presentation="overview" />
      ) : null}
    </section>
  );
}
