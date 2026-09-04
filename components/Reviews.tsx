"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/site-config";

const reviews = [
  {
    name: "Gabrysia",
    initial: "G",
    text: "Super atmosfera — wszystko na luzie, bez żadnych spięć."
  },
  {
    name: "Iza",
    initial: "I",
    text: "Dba o każdy detal i stawia na naturalne uchwycenie emocji."
  },
  {
    name: "Joanna",
    initial: "J",
    text: "Serdecznie polecam — pełen profesjonalizm."
  }
] as const;

export function Reviews() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-sand/45 px-5 py-16 md:px-10 md:py-20" aria-labelledby="reviews-heading">
      <div className="mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="reviews-heading" className="type-section mt-4 max-w-[10ch]">
            Wasze opinie
          </h2>
          <p className="mt-5 flex items-baseline gap-2 text-ink">
            <span className="font-display text-[3rem] leading-none">5,0</span>
            <span className="type-meta text-cognac">★★★★★ · 6 opinii Google</span>
          </p>
          <Link
            href={SITE_CONFIG.googleBusinessProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="type-action text-link mt-5 inline-flex min-h-11 items-center text-cognac"
          >
            Wszystkie opinie <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <motion.div
          className="grid gap-3 sm:grid-cols-3"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {reviews.map((review) => (
            <figure key={review.name} className="flex min-h-[225px] flex-col rounded-[1.1rem] border border-ink/12 bg-surface p-5 shadow-[0_14px_34px_rgba(36,31,27,0.07)]">
              <div className="flex items-center justify-between gap-4">
                <span className="type-card flex h-10 w-10 items-center justify-center rounded-full border border-cognac/25 bg-sand" aria-hidden="true">
                  {review.initial}
                </span>
                <span className="type-meta text-cognac" aria-label="5 gwiazdek">★★★★★</span>
              </div>
              <blockquote className="type-card mt-6 text-ink">„{review.text}”</blockquote>
              <figcaption className="type-meta mt-auto border-t border-ink/10 pt-4 text-ink/62">
                {review.name} · opinia Google
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
