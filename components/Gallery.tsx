"use client";

import { type PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "yet-another-react-lightbox/styles.css";
import { cloudinaryAsset, cloudinaryUrl } from "@/lib/cloudinary";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false
});

export type GalleryItem = {
  title: string;
  category: string;
  publicId: string;
  fit?: "cover" | "contain";
  cardClassName?: string;
};

type GalleryProps = {
  items: GalleryItem[];
};

const heights = ["h-[350px] md:h-[480px]", "h-[310px] md:h-[400px]", "h-[390px] md:h-[560px]"];
const ease = [0.22, 1, 0.36, 1] as const;

export function Gallery({ items }: GalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pointerDown = useRef(false);
  const startClientX = useRef(0);
  const startScrollLeft = useRef(0);
  const lastClientX = useRef(0);
  const lastTimestamp = useRef(0);
  const velocity = useRef(0);
  const momentumFrame = useRef<number | null>(null);
  const draggedDistance = useRef(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const slides = useMemo(
    () =>
      items.map((item) => ({
        src: cloudinaryUrl(item.publicId, { width: 2000 }),
        alt: item.title
      })),
    [items]
  );

  const stopMomentum = () => {
    if (momentumFrame.current !== null) {
      window.cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  };

  const runMomentum = () => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }

    stopMomentum();

    const tick = () => {
      if (!scrollRef.current) {
        return;
      }

      scrollRef.current.scrollLeft += velocity.current * 16;
      velocity.current *= 0.93;

      if (Math.abs(velocity.current) > 0.015) {
        momentumFrame.current = window.requestAnimationFrame(tick);
      } else {
        stopMomentum();
      }
    };

    momentumFrame.current = window.requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => stopMomentum();
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const node = scrollRef.current;
    if (!node || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    pointerDown.current = true;
    startClientX.current = event.clientX;
    startScrollLeft.current = node.scrollLeft;
    lastClientX.current = event.clientX;
    lastTimestamp.current = performance.now();
    velocity.current = 0;
    draggedDistance.current = 0;
    stopMomentum();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = scrollRef.current;
    if (!node || !pointerDown.current) {
      return;
    }

    const walk = (event.clientX - startClientX.current) * 1.15;
    node.scrollLeft = startScrollLeft.current - walk;

    draggedDistance.current = Math.max(
      draggedDistance.current,
      Math.abs(event.clientX - startClientX.current)
    );

    const now = performance.now();
    const dt = Math.max(16, now - lastTimestamp.current);
    velocity.current = -(event.clientX - lastClientX.current) / dt;
    lastClientX.current = event.clientX;
    lastTimestamp.current = now;
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerDown.current) {
      return;
    }

    pointerDown.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    runMomentum();
  };

  return (
    <section id="wybrane-prace" className="px-5 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28">
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, ease }}
          className="mb-12 flex items-end justify-between gap-5"
        >
          <h2 className="section-title">
            Wybrane <span className="italic">prace</span>
          </h2>
          <span className="eyebrow hidden text-cognac md:block">Przesuń lub przeciągnij</span>
        </motion.div>

        <div
          ref={scrollRef}
          className="no-scrollbar flex cursor-grab touch-pan-y items-end gap-4 overflow-x-auto pb-2 active:cursor-grabbing md:gap-6"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          {items.map((item, index) => {
            const image = cloudinaryAsset(item.publicId, { width: 800 });
            const fitClass =
              item.fit === "contain"
                ? "object-contain bg-[#241a13] p-[6px] md:p-[8px]"
                : "object-cover object-center";
            const hoverScaleClass = item.fit === "contain" ? "" : "group-hover:scale-[1.018]";

            return (
              <button
                key={`${item.publicId}-${item.title}`}
                type="button"
                onClick={(event) => {
                  if (draggedDistance.current > 8) {
                    event.preventDefault();
                    return;
                  }
                  setLightboxIndex(index);
                }}
                className={`group relative min-w-[76vw] shrink-0 overflow-hidden text-left sm:min-w-[65vw] md:min-w-[380px] ${heights[index % heights.length]} ${
                  index % 2 === 0 ? "md:min-w-[430px]" : ""
                } ${index % 3 === 1 ? "md:mt-8" : index % 3 === 2 ? "md:mt-2" : ""} ${item.cardClassName ?? ""}`}
              >
                <Image
                  src={image.src}
                  alt={`${item.title} - ${item.category}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 70vw, 420px"
                  className={`${fitClass} brightness-[0.9] saturate-[0.88] transition-[transform,filter] duration-[900ms] ease-[var(--ease-editorial)] ${hoverScaleClass} group-hover:brightness-100 group-hover:saturate-100`}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/22 via-transparent to-transparent" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4">
                  <div className="inline-flex max-w-[95%] flex-col rounded-[1.1rem] border border-cream/35 bg-espresso/76 px-4 py-3 text-cream shadow-[0_10px_28px_rgba(28,21,16,0.35)] backdrop-blur-[1.6px] transition-[opacity,transform] duration-700 ease-[var(--ease-editorial)] md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <p className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/90 md:text-[0.68rem]">
                      {item.category}
                    </p>
                    <p className="mt-2 font-display text-[clamp(1.4rem,5vw,2rem)] leading-[0.94] text-cream">
                      {item.title}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {lightboxIndex >= 0 ? (
        <Lightbox
          open
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={slides}
        />
      ) : null}
    </section>
  );
}
