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

const desktopHeights = ["h-[350px] md:h-[480px]", "h-[310px] md:h-[400px]", "h-[390px] md:h-[560px]"];
const mobileHeights = ["aspect-[4/5]", "aspect-[16/10]", "aspect-[4/5]"];
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

  const renderCard = (item: GalleryItem, index: number, variant: "mobile" | "desktop") => {
    const image = cloudinaryAsset(item.publicId, { width: 900 });
    const fitClass =
      item.fit === "contain"
        ? "object-contain bg-[#241a13] p-[6px] md:p-[8px]"
        : "object-cover object-center";
    const isDesktop = variant === "desktop";
    const hoverScaleClass = item.fit === "contain" ? "" : "md:group-hover:scale-[1.018]";
    const desktopClassName = `group relative min-w-[76vw] shrink-0 overflow-hidden text-left sm:min-w-[65vw] md:min-w-[380px] ${
      desktopHeights[index % desktopHeights.length]
    } ${index % 2 === 0 ? "md:min-w-[430px]" : ""} ${
      index % 3 === 1 ? "md:mt-8" : index % 3 === 2 ? "md:mt-2" : ""
    } ${item.cardClassName ?? ""}`;
    const mobileClassName = `group relative w-full overflow-hidden rounded-[1.15rem] text-left ${
      mobileHeights[index % mobileHeights.length]
    }`;
    const labelClassName =
      variant === "mobile"
        ? "inline-flex max-w-[97%] flex-col rounded-[1rem] border border-cream/35 bg-espresso/82 px-3 py-2 text-cream shadow-[0_8px_24px_rgba(28,21,16,0.28)]"
        : "inline-flex max-w-[95%] flex-col rounded-[1.1rem] border border-cream/35 bg-espresso/76 px-4 py-3 text-cream shadow-[0_10px_28px_rgba(28,21,16,0.35)] backdrop-blur-[1.6px] transition-[opacity,transform] duration-700 ease-[var(--ease-editorial)] md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100";
    const imageSizes =
      variant === "mobile"
        ? "100vw"
        : "(max-width: 768px) 70vw, 420px";
    const prioritizedMobileCard = variant === "mobile" && index < 2;
    const imageClassName = isDesktop
      ? `${fitClass} md:brightness-[0.9] md:saturate-[0.88] transition-[transform,filter] duration-[900ms] ease-[var(--ease-editorial)] ${hoverScaleClass} md:group-hover:brightness-100 md:group-hover:saturate-100`
      : `${fitClass} transition-opacity duration-500`;

    return (
      <button
        key={`${item.publicId}-${item.title}-${variant}`}
        type="button"
        onClick={(event) => {
          if (variant === "desktop" && draggedDistance.current > 8) {
            event.preventDefault();
            return;
          }
          setLightboxIndex(index);
        }}
        className={variant === "mobile" ? mobileClassName : desktopClassName}
      >
        <Image
          src={image.src}
          alt={`${item.title} - ${item.category}`}
          fill
          priority={prioritizedMobileCard}
          loading={prioritizedMobileCard ? "eager" : "lazy"}
          sizes={imageSizes}
          className={imageClassName}
          placeholder={variant === "mobile" ? "empty" : "blur"}
          blurDataURL={variant === "mobile" ? undefined : image.blurDataURL}
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
            variant === "mobile"
              ? "from-espresso/42 via-espresso/8 to-transparent"
              : "from-espresso/34 via-transparent to-transparent"
          }`}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4">
          <div className={labelClassName}>
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-cream/90 md:text-[0.68rem]">
              {item.category}
            </p>
            <p className="mt-2 font-display text-[clamp(1.15rem,4.6vw,2rem)] leading-[0.94] text-cream">
              {item.title}
            </p>
          </div>
        </div>
      </button>
    );
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
          <span className="eyebrow text-cognac md:hidden">Dotknij zdjęcia, aby otworzyć podgląd</span>
          <span className="eyebrow hidden text-cognac md:block">Przesuń lub przeciągnij</span>
        </motion.div>

        <div className="flex flex-col gap-3 md:hidden">
          {items.map((item, index) => renderCard(item, index, "mobile"))}
        </div>

        <div
          ref={scrollRef}
          className="no-scrollbar hidden cursor-grab touch-pan-y items-end gap-4 overflow-x-auto pb-2 active:cursor-grabbing md:flex md:gap-6"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          {items.map((item, index) => renderCard(item, index, "desktop"))}
        </div>
      </div>

      {lightboxIndex >= 0 ? (
        <Lightbox
          open
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={slides}
          carousel={{ preload: 3 }}
          animation={{
            swipe: 320,
            navigation: 260,
            easing: {
              swipe: "cubic-bezier(.25,.8,.25,1)",
              navigation: "cubic-bezier(.25,.8,.25,1)",
              fade: "cubic-bezier(.25,.8,.25,1)"
            }
          }}
        />
      ) : null}
    </section>
  );
}
