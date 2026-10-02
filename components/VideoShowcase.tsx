"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buildContactHref } from "@/lib/contact-prefill";
import type { HomepageVideoItem } from "@/sanity/lib/site-content";

type VideoShowcaseProps = {
  items: HomepageVideoItem[];
};

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

const INITIAL_VIDEO_COUNT = 3;

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M8.2 5.35c0-.88.96-1.42 1.71-.96l10.02 6.15a1.12 1.12 0 0 1 0 1.92L9.91 18.61a1.12 1.12 0 0 1-1.71-.96V5.35Z" />
    </svg>
  );
}

function VideoCard({
  item,
  active,
  onOpen,
  onClose
}: {
  item: HomepageVideoItem;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const previewRef = useRef<HTMLVideoElement>(null);
  const playbackRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreTriggerFocusRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [posterReady, setPosterReady] = useState(false);

  useEffect(() => {
    if (active) {
      closeButtonRef.current?.focus();
    } else if (restoreTriggerFocusRef.current) {
      triggerRef.current?.focus();
      restoreTriggerFocusRef.current = false;
    }
  }, [active]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPosterReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(preview);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    const preview = previewRef.current;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData;
    if (!preview || reduceMotion || saveData || active) {
      preview?.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void preview.play().catch(() => undefined);
        } else {
          preview.pause();
        }
      },
      { threshold: 0.55 }
    );

    observer.observe(preview);
    return () => {
      observer.disconnect();
      preview.pause();
    };
  }, [active, reduceMotion]);

  useEffect(() => {
    const playback = playbackRef.current;
    if (!active || !playback) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) playback.pause();
      },
      { threshold: 0.1 }
    );

    observer.observe(playback);
    return () => observer.disconnect();
  }, [active]);

  const cardClassName =
    "relative aspect-[4/5] w-full overflow-hidden rounded-[1.15rem] bg-espresso text-left shadow-[0_22px_55px_rgba(36,31,27,0.16)] sm:aspect-[9/16]";

  if (active) {
    return (
      <div className={cardClassName}>
        <video
          ref={playbackRef}
          src={item.videoUrl}
          poster={item.posterUrl}
          controls
          autoPlay
          playsInline
          preload="metadata"
          aria-label={`Film: ${item.title}`}
          className="h-full w-full bg-black object-contain"
        >
          Twoja przeglądarka nie obsługuje odtwarzania filmu.
        </video>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => {
            restoreTriggerFocusRef.current = true;
            onClose();
          }}
          aria-label={`Zamknij film: ${item.title}`}
          className="type-action absolute right-3 top-3 z-10 min-h-11 rounded-full border border-cream/50 bg-espresso/85 px-4 text-cream transition-colors hover:bg-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          Zamknij
        </button>
      </div>
    );
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={onOpen}
      aria-label={`Odtwórz film: ${item.title}`}
      className={`${cardClassName} group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cognac`}
    >
      <video
        ref={previewRef}
        src={item.previewUrl}
        poster={posterReady ? item.posterUrl : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="pointer-events-none h-full w-full object-cover transition duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.025]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-espresso/82 via-espresso/5 to-espresso/12" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-cream sm:p-5 md:p-6">
        <span>
          <span className="type-meta block text-cream/72">{item.label}</span>
          <span className="type-card mt-1.5 block text-cream">{item.title}</span>
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream/48 bg-cream/14 text-cream backdrop-blur-sm transition duration-500 group-hover:scale-105 group-hover:bg-cream group-hover:text-espresso">
          <PlayIcon />
        </span>
      </span>
    </button>
  );
}

export function VideoShowcase({ items }: VideoShowcaseProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VIDEO_COUNT);
  const visibleItems = items.slice(0, visibleCount);

  if (!items.length) return null;

  return (
    <section id="wideo" className="bg-sand/45 px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1320px]" data-scroll-anchor>
        <div className="border-b border-ink/12 pb-8">
          <p className="eyebrow text-cognac">Wideo</p>
          <h2 className="section-title mt-4 max-w-[10ch]">W ruchu</h2>
          <p className="type-body mt-4 max-w-[45ch] text-ink/75">
            Chcesz dodać krótki film do reportażu? Zapytaj o dostępność i zakres.
          </p>
          <Link
            href={buildContactHref("wideo")}
            className="type-action text-link mt-4 inline-flex min-h-11 w-fit items-center pb-1 text-ink/72"
          >
            Zapytaj o film <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {visibleItems.map((item, index) => (
            <article key={item.id} className={index === 0 ? "col-span-2 sm:col-span-1" : undefined}>
              <VideoCard
                item={item}
                active={activeVideoId === item.id}
                onOpen={() => setActiveVideoId(item.id)}
                onClose={() => setActiveVideoId(null)}
              />
            </article>
          ))}
        </div>

        {visibleCount < items.length ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => Math.min(current + INITIAL_VIDEO_COUNT, items.length))}
              className="type-action button-outline min-h-12 justify-center px-6"
            >
              Pokaż kolejne filmy
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
