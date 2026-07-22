"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { HomepageVideoItem } from "@/sanity/lib/site-content";

type VideoShowcaseProps = {
  items: HomepageVideoItem[];
};

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M8.2 5.35c0-.88.96-1.42 1.71-.96l10.02 6.15a1.12 1.12 0 0 1 0 1.92L9.91 18.61a1.12 1.12 0 0 1-1.71-.96V5.35Z" />
    </svg>
  );
}

function VideoPreview({ item, onOpen }: { item: HomepageVideoItem; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData;
    if (!video || reduceMotion || saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.55 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Odtwórz film: ${item.title}`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[1.15rem] bg-espresso text-left shadow-[0_22px_55px_rgba(36,31,27,0.16)] focus-visible:outline-2"
    >
      <video
        ref={videoRef}
        src={item.previewUrl}
        poster={item.posterUrl}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="h-full w-full object-cover transition duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.025]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-espresso/82 via-espresso/5 to-espresso/12" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-cream md:p-6">
        <span>
          <span className="block text-[0.65rem] uppercase tracking-[0.17em] text-cream/72">{item.label}</span>
          <span className="mt-1.5 block font-display text-[1.9rem] leading-none md:text-[2.15rem]">{item.title}</span>
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream/48 bg-cream/14 text-cream backdrop-blur-sm transition duration-500 group-hover:scale-105 group-hover:bg-cream group-hover:text-espresso">
          <PlayIcon />
        </span>
      </span>
    </button>
  );
}

function VideoModal({ item, onClose }: { item: HomepageVideoItem; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const backgroundElements = [
      document.querySelector<HTMLElement>("header"),
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("[data-site-footer]"),
      document.querySelector<HTMLElement>("[data-mobile-sticky-cta]")
    ].filter((element): element is HTMLElement => Boolean(element));
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden")
    }));

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), video[controls]"
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      backgroundState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/94 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Film: ${item.title}`}
        className="relative flex h-full max-h-[calc(100dvh-1.5rem)] w-full max-w-[min(100%,440px)] items-center justify-center sm:max-h-[calc(100dvh-3rem)]"
      >
        <video
          src={item.videoUrl}
          poster={item.posterUrl}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="max-h-full w-full rounded-[1.05rem] bg-black shadow-[0_32px_90px_rgba(0,0,0,0.55)]"
        >
          Twoja przeglądarka nie obsługuje odtwarzania filmu.
        </video>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Zamknij film"
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/55 text-2xl font-light leading-none text-white backdrop-blur-md transition hover:bg-white hover:text-espresso sm:-right-14 sm:top-0"
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}

export function VideoShowcase({ items }: VideoShowcaseProps) {
  const [activeItem, setActiveItem] = useState<HomepageVideoItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressOpenRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => setCanScroll(track.scrollWidth > track.clientWidth + 2);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  if (!items.length) return null;

  const scrollToVideo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = Math.max(0, Math.min(items.length - 1, index));
    const card = track.children.item(nextIndex);
    if (!(card instanceof HTMLElement)) return;

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth"
    });
    setActiveIndex(nextIndex);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const end = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !end) return;

    const deltaX = start.x - end.clientX;
    const deltaY = start.y - end.clientY;
    if (Math.abs(deltaX) < 36 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

    suppressOpenRef.current = true;
    scrollToVideo(activeIndex + (deltaX > 0 ? 1 : -1));
    window.setTimeout(() => {
      suppressOpenRef.current = false;
    }, 250);
  };

  return (
    <section id="wideo" className="overflow-hidden bg-sand/45 px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1320px]" data-scroll-anchor>
        <motion.div
          className="flex items-end justify-between gap-5 border-b border-ink/12 pb-8"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="eyebrow text-cognac">Wideo</p>
            <h2 className="section-title mt-4 max-w-[10ch]">W ruchu</h2>
          </div>
          {canScroll ? (
            <div className="hidden gap-2 sm:flex" aria-label="Sterowanie listą filmów">
              <button
                type="button"
                onClick={() => scrollToVideo(activeIndex - 1)}
                aria-label="Poprzednie filmy"
                className="button-icon h-12 w-12 text-xl"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollToVideo(activeIndex + 1)}
                aria-label="Następne filmy"
                className="button-icon h-12 w-12 text-xl"
              >
                →
              </button>
            </div>
          ) : null}
        </motion.div>

        <div
          ref={trackRef}
          className={`no-scrollbar -mx-5 mt-8 grid touch-pan-y snap-x snap-mandatory grid-flow-col auto-cols-[minmax(255px,78vw)] gap-4 overflow-x-hidden px-5 pb-3 sm:-mx-10 sm:touch-auto sm:auto-cols-[330px] sm:overflow-x-auto sm:px-10 lg:mx-0 lg:auto-cols-[360px] lg:px-0 ${
            canScroll ? "justify-start" : "justify-center"
          }`}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            if (touch) touchStartRef.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartRef.current = null;
            suppressOpenRef.current = false;
          }}
          onScroll={(event) => {
            const track = event.currentTarget;
            const firstCard = track.firstElementChild;
            if (!(firstCard instanceof HTMLElement)) return;
            const step = firstCard.offsetWidth + 16;
            const nextIndex = Math.max(0, Math.min(items.length - 1, Math.round(track.scrollLeft / step)));
            if (nextIndex !== activeIndex) setActiveIndex(nextIndex);
          }}
        >
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              className="snap-start"
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{
                duration: 0.72,
                delay: Math.min(index * 0.08, 0.24),
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <VideoPreview
                item={item}
                onOpen={() => {
                  if (suppressOpenRef.current) return;
                  setActiveItem(item);
                }}
              />
            </motion.article>
          ))}
        </div>

        {items.length > 1 ? (
          <div className="mt-2 flex justify-center gap-1 sm:hidden" role="group" aria-label="Wybierz film">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Pokaż film: ${item.title}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => scrollToVideo(index)}
                className="flex h-11 w-11 items-center justify-center rounded-full"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    activeIndex === index ? "h-2 w-6 bg-espresso" : "h-2 w-2 bg-ink/30"
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {activeItem ? <VideoModal item={activeItem} onClose={() => setActiveItem(null)} /> : null}
    </section>
  );
}
