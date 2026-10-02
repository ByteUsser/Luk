"use client";

import Image from "next/image";
import Link from "next/link";
import { cloudinaryAsset } from "@/lib/cloudinary";

export type Service = {
  title: string;
  eyebrow: string;
  publicId: string;
  imageAlt?: string;
  href: string;
  price: string;
  fit?: "cover" | "contain";
};

type ServicesProps = {
  items: Service[];
};

export function Services({ items }: ServicesProps) {
  return (
    <section id="oferta" className="bg-espresso px-5 py-16 text-cream md:px-10 md:py-20">
      <div className="mx-auto max-w-[1450px]" data-scroll-anchor>
        <div
          className="flex flex-col gap-5 border-b border-cream/16 pb-7 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="eyebrow text-[#c8ad8d]">Rodzaje sesji</p>
            <h2 className="section-title mt-4 max-w-[13ch] text-cream">Portrety i reportaże</h2>
          </div>
          <Link
            href="/cennik"
            className="type-action inline-flex min-h-11 w-fit items-center gap-2 border-b border-cream/35 pb-1 text-cream/78 transition-colors hover:border-cream hover:text-cream"
          >
            Zobacz pełny cennik
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item) => {
            const image = cloudinaryAsset(item.publicId, { width: 1200, quality: 80 });
            const fitClass = item.fit === "contain" ? "object-contain bg-sand p-3" : "object-cover";

            return (
              <article key={item.title}>
                <Link
                  href={item.href}
                  className="group relative block aspect-[16/11] overflow-hidden rounded-[1.05rem] border border-cream/14 bg-[#211812] sm:aspect-[4/5]"
                >
                  <Image
                    src={image.src}
                    alt={item.imageAlt || item.title}
                    fill
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, (max-width: 1279px) 30vw, 20vw"
                    className={`${fitClass} brightness-[0.83] transition duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.035] group-hover:brightness-[0.94]`}
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/24 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <span className="type-meta block text-[#c8ad8d]">{item.eyebrow}</span>
                    <h3 className="type-card mt-2 block max-w-[13ch] text-cream">{item.title}</h3>
                    <div className="mt-3 flex items-end justify-between gap-3 md:mt-4">
                      <span className="type-meta text-cream/78">{item.price}</span>
                      <span className="type-action inline-flex items-center border-b border-cream/38 pb-1 text-cream">
                        Szczegóły <span className="ml-2 text-base" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
