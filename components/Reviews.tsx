"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/site-config";

const reviews = [
  {
    name: "Gabrysia",
    initial: "G",
    text: "Super atmosfera, wszystko na luzie, bez żadnych spięć."
  },
  {
    name: "Iza",
    initial: "I",
    text: "Dba o każdy detal, stawia na naturalne uchwycenie emocji."
  },
  {
    name: "Joanna",
    initial: "J",
    text: "Serdecznie polecam, pełen profesjonalizm."
  }
] as const;

export function Reviews() {
  const reduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [activeReview, setActiveReview] = useState(0);

  const scrollToReview = (index: number) => {
    const card = carouselRef.current?.children.item(index);
    if (!(card instanceof HTMLElement)) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollTo({
      left: card.offsetLeft - carousel.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveReview(index);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const end = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !end) return;

    const deltaX = start.x - end.clientX;
    const deltaY = start.y - end.clientY;
    if (Math.abs(deltaX) < 36 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

    scrollToReview(activeReview + (deltaX > 0 ? 1 : -1));
  };

  return (
    <section className="bg-sand/45 px-5 py-16 md:px-10 md:py-20" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          className="flex flex-col gap-5 border-b border-ink/12 pb-7 sm:flex-row sm:items-end sm:justify-between"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="eyebrow text-cognac">Opinie klientów</p>
            <h2 id="reviews-heading" className="section-title mt-4 max-w-[12ch]">
              Po wspólnych zdjęciach
            </h2>
          </div>
          <Link
            href={SITE_CONFIG.googleBusinessProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="button-outline min-h-12 w-fit px-5 text-[0.78rem] uppercase tracking-[0.12em]"
          >
            Wszystkie opinie w Google
          </Link>
        </motion.div>

        <div
          ref={carouselRef}
          className="no-scrollbar -mx-5 mt-7 flex touch-pan-y snap-x snap-mandatory gap-4 overflow-x-hidden px-5 pb-3 md:mx-0 md:grid md:touch-auto md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0"
          onTouchStart={(event) => {
            const touch = event.touches[0];
            if (touch) touchStartRef.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartRef.current = null;
          }}
          onScroll={(event) => {
            const carousel = event.currentTarget;
            const firstCard = carousel.firstElementChild;
            if (!(firstCard instanceof HTMLElement)) return;

            const step = firstCard.offsetWidth + 16;
            const nextIndex = Math.max(0, Math.min(reviews.length - 1, Math.round(carousel.scrollLeft / step)));
            if (nextIndex !== activeReview) setActiveReview(nextIndex);
          }}
        >
          {reviews.map((review, index) => (
            <motion.figure
              key={review.name}
              className="flex min-h-[230px] min-w-[86%] snap-center flex-col rounded-[1.1rem] border border-ink/12 bg-surface p-5 shadow-[0_14px_34px_rgba(36,31,27,0.07)] sm:min-w-[68%] md:min-w-0 md:p-6"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: 0.68,
                delay: Math.min(index * 0.07, 0.16),
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cognac/25 bg-sand font-display text-[1.45rem] text-ink"
                  aria-hidden="true"
                >
                  {review.initial}
                </span>
                <span className="text-[0.8rem] tracking-[0.16em] text-cognac" aria-label="5 gwiazdek">
                  ★★★★★
                </span>
              </div>
              <blockquote className="mt-7 flex-1 font-display text-[1.65rem] leading-[1.02] text-ink">
                „{review.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-ink/10 pt-4 text-[0.76rem] uppercase tracking-[0.12em] text-ink/62">
                {review.name} · opinia Google
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-3 flex justify-center gap-2 md:hidden" role="group" aria-label="Wybierz opinię">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              aria-label={`Pokaż opinię: ${review.name}`}
              aria-current={activeReview === index ? "true" : undefined}
              onClick={() => scrollToReview(index)}
              className="flex h-11 w-11 items-center justify-center rounded-full"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  activeReview === index ? "h-2 w-6 bg-espresso" : "h-2 w-2 bg-ink/30"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
