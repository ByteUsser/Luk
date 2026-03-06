"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cloudinaryAsset } from "@/lib/cloudinary";

type Service = {
  title: string;
  description: string;
  publicId: string;
};

type ServicesProps = {
  items: Service[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Services({ items }: ServicesProps) {
  return (
    <section id="oferta" className="px-5 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-[1400px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, ease }}
          className="section-title mb-10"
        >
          Sesje, które <span className="italic">czujesz</span>
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {items.map((item, index) => {
            const image = cloudinaryAsset(item.publicId, { width: 1100 });

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.8, ease, delay: index * 0.08 }}
                className="group relative min-h-[330px] overflow-hidden md:min-h-[420px]"
              >
                <Image
                  src={image.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover brightness-[0.88] transition-[transform,filter] duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04] group-hover:brightness-[0.96]"
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/52 to-espresso/22" />
                <div className="absolute inset-0 flex items-end p-5 text-cream md:p-7">
                  <div className="w-full max-w-[32ch] rounded-2xl border border-cream/28 bg-espresso/64 px-4 py-4 shadow-[0_10px_24px_rgba(28,21,16,0.36)] backdrop-blur-[1.5px]">
                    <h3 className="font-display text-[2rem] leading-[0.92] md:text-[2.15rem]">{item.title}</h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-cream/95 md:translate-y-2 md:opacity-0 md:transition-[opacity,transform] md:duration-700 md:ease-[var(--ease-editorial)] md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
