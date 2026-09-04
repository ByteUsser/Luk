"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cloudinaryAsset } from "@/lib/cloudinary";

export type Service = {
  title: string;
  eyebrow: string;
  publicId: string;
  href: string;
  price: string;
  fit?: "cover" | "contain";
};

type ServicesProps = {
  items: Service[];
};

export function Services({ items }: ServicesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="oferta" className="bg-espresso px-5 py-16 text-cream md:px-10 md:py-20">
      <div className="mx-auto max-w-[1450px]" data-scroll-anchor>
        <motion.div
          className="border-b border-cream/16 pb-7"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="eyebrow text-[#c8ad8d]">Rodzaje sesji</p>
            <h2 className="section-title mt-4 max-w-[13ch] text-cream">Portrety i reportaże</h2>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const image = cloudinaryAsset(item.publicId, { width: 1200, quality: 80 });
            const fitClass = item.fit === "contain" ? "object-contain bg-sand p-3" : "object-cover";

            return (
              <motion.article
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{
                  duration: 0.72,
                  delay: Math.min(index * 0.08, 0.2),
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Link
                  href={item.href}
                  className="group relative block aspect-[16/11] overflow-hidden rounded-[1.05rem] border border-cream/14 bg-[#211812] sm:aspect-[4/5]"
                >
                  <Image
                    src={image.src}
                    alt={item.title}
                    fill
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 639px) 92vw, (max-width: 767px) 46vw, (max-width: 1023px) 30vw, 33vw"
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
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
