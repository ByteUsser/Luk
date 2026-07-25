"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
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

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
      <path d="m6.5 14.5 5.5-5 5.5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
      <path d="m6.5 9.5 5.5 5 5.5-5" strokeLinecap="round" strokeLinejoin="round" />
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
        className="pointer-events-none h-full w-full object-cover transition duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.025]"
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

function VideoModal({
  items,
  activeIndex,
  onChange,
  onClose
}: {
  items: HomepageVideoItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const item = items[activeIndex];
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const gestureStartRef = useRef<{ x: number; y: number } | null>(null);
  const wheelStateRef = useRef({ accumulated: 0, lastEvent: 0, lockedUntil: 0 });
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const hasMultiple = items.length > 1;

  const navigate = useCallback(
    (step: -1 | 1) => {
      if (!hasMultiple) return;
      setDirection(step);
      onChange((activeIndex + step + items.length) % items.length);
    },
    [activeIndex, hasMultiple, items.length, onChange]
  );

  useEffect(() => {
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    };
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
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

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });
    closeRef.current?.focus();

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      backgroundState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });
      previouslyFocused?.focus({ preventScroll: true });
      window.scrollTo(0, scrollY);

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
          document.documentElement.style.scrollBehavior = previousScrollBehavior;
        });
      });
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        navigate(-1);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        navigate(1);
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
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, onClose]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!hasMultiple || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();

    const now = Date.now();
    const state = wheelStateRef.current;
    if (now < state.lockedUntil) return;
    if (now - state.lastEvent > 180) state.accumulated = 0;

    state.lastEvent = now;
    state.accumulated += event.deltaY;
    if (Math.abs(state.accumulated) < 58) return;

    navigate(state.accumulated > 0 ? 1 : -1);
    state.accumulated = 0;
    state.lockedUntil = now + 650;
  };

  const finishGesture = (x: number, y: number) => {
    const start = gestureStartRef.current;
    gestureStartRef.current = null;
    if (!start || !hasMultiple) return;

    const deltaX = x - start.x;
    const deltaY = y - start.y;
    if (Math.abs(deltaY) < 56 || Math.abs(deltaY) < Math.abs(deltaX) * 1.25) return;
    navigate(deltaY < 0 ? 1 : -1);
  };

  return createPortal(
    <div
      data-video-modal
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-espresso/94 p-3 backdrop-blur-md sm:p-6"
      onWheelCapture={handleWheel}
      onPointerDownCapture={(event) => {
        gestureStartRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUpCapture={(event) => finishGesture(event.clientX, event.clientY)}
      onPointerCancelCapture={() => {
        gestureStartRef.current = null;
      }}
      onMouseDown={(event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest("[data-video-phone], [data-video-navigation], [data-video-close]")) return;
        onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Film: ${item.title}`}
        className="relative flex h-full max-h-[calc(100dvh-1.5rem)] w-full max-w-[min(100%,920px)] flex-col items-center justify-center sm:max-h-[calc(100dvh-3rem)]"
      >
        <div className="mb-3 text-center text-cream sm:mb-4" aria-live="polite">
          <p className="text-[0.62rem] uppercase tracking-[0.19em] text-cream/55">{item.label}</p>
          <p className="mt-1 font-display text-[1.45rem] leading-none sm:text-[1.7rem]">{item.title}</p>
        </div>

        <div className="flex min-h-0 items-center justify-center gap-2.5 sm:gap-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.id}
              data-video-phone
              data-video-id={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: direction * 34, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: direction * -34, scale: 0.985 }}
              transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[9/19.5] w-[min(68vw,285px)] shrink-0 rounded-[2.85rem] border border-white/20 bg-[#090806] p-[7px] shadow-[0_34px_90px_rgba(0,0,0,0.58),inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:w-[min(34vw,310px)] sm:rounded-[3.15rem] sm:p-2"
            >
              <span className="absolute -left-[3px] top-[24%] h-14 w-[3px] rounded-l-full bg-gradient-to-b from-[#77716b] to-[#26231f]" aria-hidden="true" />
              <span className="absolute -left-[3px] top-[35%] h-10 w-[3px] rounded-l-full bg-gradient-to-b from-[#77716b] to-[#26231f]" aria-hidden="true" />
              <span className="absolute -right-[3px] top-[29%] h-20 w-[3px] rounded-r-full bg-gradient-to-b from-[#77716b] to-[#26231f]" aria-hidden="true" />
              <div className="relative h-full w-full overflow-hidden rounded-[2.42rem] bg-black sm:rounded-[2.68rem]">
                <video
                  key={item.videoUrl}
                  src={item.videoUrl}
                  poster={item.posterUrl}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="h-full w-full bg-black object-contain"
                >
                  Twoja przeglądarka nie obsługuje odtwarzania filmu.
                </video>
                <span
                  className="pointer-events-none absolute left-1/2 top-2.5 z-10 flex h-[25px] w-[82px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-2 shadow-[0_2px_8px_rgba(0,0,0,0.5)] ring-1 ring-white/5 sm:top-3 sm:h-[27px] sm:w-[88px]"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#171c20] ring-1 ring-[#313942]" />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {hasMultiple ? (
            <div
              data-video-navigation
              className="flex shrink-0 flex-col items-center gap-2"
              aria-label="Nawigacja pionowa między filmami"
            >
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Poprzedni film"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/28 bg-cream/10 text-cream backdrop-blur-md transition hover:bg-cream hover:text-espresso sm:h-12 sm:w-12"
              >
                <ArrowUpIcon />
              </button>
              <span className="min-w-10 text-center text-[0.68rem] tracking-[0.12em] text-cream/60">
                {activeIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label="Następny film"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/28 bg-cream/10 text-cream backdrop-blur-md transition hover:bg-cream hover:text-espresso sm:h-12 sm:w-12"
              >
                <ArrowDownIcon />
              </button>
            </div>
          ) : null}
        </div>

        <p className="mt-3 text-center text-[0.62rem] uppercase tracking-[0.14em] text-cream/45 sm:mt-4">
          Przesuń pionowo lub użyj ↑ ↓
        </p>

        <button
          data-video-close
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Zamknij film"
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/45 text-2xl font-light leading-none text-white backdrop-blur-md transition hover:bg-white hover:text-espresso sm:right-2 sm:top-2"
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}

export function VideoShowcase({ items }: VideoShowcaseProps) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const closeModal = useCallback(() => setModalIndex(null), []);
  const changeModalVideo = useCallback((index: number) => {
    setModalIndex(index);
    setActiveIndex(index);
  }, []);

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
          data-video-carousel
          className={`no-scrollbar -mx-5 mt-8 grid touch-auto snap-x snap-mandatory grid-flow-col auto-cols-[minmax(255px,78vw)] gap-4 overflow-x-auto overscroll-x-contain px-5 pb-3 sm:-mx-10 sm:auto-cols-[330px] sm:px-10 lg:mx-0 lg:auto-cols-[360px] lg:px-0 ${
            canScroll ? "justify-start" : "justify-center"
          }`}
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
                  setActiveIndex(index);
                  setModalIndex(index);
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

      {modalIndex !== null ? (
        <VideoModal
          items={items}
          activeIndex={modalIndex}
          onChange={changeModalVideo}
          onClose={closeModal}
        />
      ) : null}
    </section>
  );
}
