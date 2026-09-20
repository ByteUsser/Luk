import Image from "next/image";
import Link from "next/link";
import type { PhotoGalleryItem } from "@/lib/gallery";
import {
  GALLERY_CATEGORY_DEFINITIONS,
  galleryCategoryHref
} from "@/lib/gallery-categories";

type PortfolioNavigatorProps = {
  items: PhotoGalleryItem[];
};

export function PortfolioNavigator({ items }: PortfolioNavigatorProps) {
  const serviceCategories = GALLERY_CATEGORY_DEFINITIONS.filter(
    (category) => category.portfolioGroup === "services"
  );
  const personalCategories = GALLERY_CATEGORY_DEFINITIONS.filter(
    (category) =>
      category.portfolioGroup === "personal" &&
      items.some((item) => item.category === category.name)
  );

  return (
    <section className="mx-auto max-w-[1500px]" aria-labelledby="portfolio-heading">
      <header className="max-w-[42rem] border-b border-ink/12 pb-8">
        <h1 id="portfolio-heading" className="section-title">
          Portfolio
        </h1>
        <p className="type-body mt-5 text-ink/74">
          Wybierz rodzaj zdjęć, który chcesz obejrzeć.
        </p>
      </header>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {serviceCategories.map((category, index) => {
          const cover = items.find((item) => item.category === category.name);

          return (
            <Link
              key={category.slug}
              href={galleryCategoryHref(category.slug)}
              aria-label={`Zobacz portfolio: ${category.label}`}
              className="group relative min-h-64 overflow-hidden rounded-xl bg-espresso sm:min-h-80 sm:rounded-[1rem]"
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
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.025]"
                />
              ) : null}
              <span className="absolute inset-0 bg-gradient-to-t from-espresso/76 via-espresso/12 to-transparent" />
              <span className="type-section absolute inset-x-5 bottom-5 text-cream sm:inset-x-7 sm:bottom-6">
                {category.label}
                <span className="ml-3 inline-block text-[0.75em] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      {personalCategories.length > 0 ? (
        <nav className="mt-10 border-t border-ink/12 pt-6" aria-label="Projekty własne">
          <p className="type-meta text-ink/52">Projekty własne</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {personalCategories.map((category) => {
              const cover = items.find((item) => item.category === category.name);

              return (
                <Link
                  key={category.slug}
                  href={galleryCategoryHref(category.slug)}
                  aria-label={`Zobacz portfolio: ${category.label}`}
                  className="group relative min-h-48 overflow-hidden rounded-xl bg-espresso sm:min-h-56 sm:rounded-[1rem]"
                >
                  {cover ? (
                    <Image
                      src={cover.src}
                      alt=""
                      width={cover.width}
                      height={cover.height}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.025]"
                    />
                  ) : null}
                  <span className="absolute inset-0 bg-gradient-to-t from-espresso/76 via-espresso/12 to-transparent" />
                  <span className="type-card absolute inset-x-5 bottom-5 text-cream sm:inset-x-6 sm:bottom-6">
                    {category.label}
                    <span className="ml-3 inline-block text-[0.75em] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </section>
  );
}
