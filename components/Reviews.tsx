"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/site-config";

const featuredReview = {
  name: "Iza",
  initial: "I",
  text: "Dba o każdy detal, stawia na naturalne uchwycenie emocji."
} as const;

export function Reviews() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-sand/45 px-5 py-16 md:px-10 md:py-20" aria-labelledby="reviews-heading">
      <div className="mx-auto grid max-w-[1080px] gap-7 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow text-cognac">Opinia Google</p>
          <h2 id="reviews-heading" className="type-section mt-4 max-w-[10ch]">
            Wasze opinie
          </h2>
          <Link
            href={SITE_CONFIG.googleBusinessProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="type-action text-link mt-5 inline-flex min-h-11 items-center text-cognac"
          >
            Wszystkie opinie <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <motion.figure
          className="rounded-[1.1rem] border border-ink/12 bg-surface p-6 shadow-[0_14px_34px_rgba(36,31,27,0.07)] md:p-8"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="type-card flex h-11 w-11 items-center justify-center rounded-full border border-cognac/25 bg-sand" aria-hidden="true">
              {featuredReview.initial}
            </span>
            <span className="type-meta text-cognac" aria-label="5 gwiazdek">★★★★★</span>
          </div>
          <blockquote className="type-card mt-7 text-ink">„{featuredReview.text}”</blockquote>
          <figcaption className="type-meta mt-6 border-t border-ink/10 pt-4 text-ink/62">
            {featuredReview.name} · opinia Google
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
