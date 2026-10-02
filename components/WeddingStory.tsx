"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { InPageLink } from "@/components/InPageLink";

const chapters = [
  {
    title: "Pierwszy gest",
    description: "Obrączka, dłonie i chwila, w której zaczyna się Wasza historia.",
    image: "/portfolio/homepage/wedding-ceremony-dsc00156.jpg",
    alt: "Zakładanie obrączki podczas ceremonii ślubnej",
    position: "50% 52%"
  },
  {
    title: "Wspólna radość",
    description: "Po ceremonii przychodzi radość, którą dzielicie z bliskimi.",
    image: "/portfolio/homepage/wedding-story-dsc00815.jpg",
    alt: "Panna młoda i bliska osoba unoszące bukiety pod pergolą",
    position: "50% 50%"
  },
  {
    title: "To zostaje",
    description: "Miejsce, światło i wspomnienie tego, jak byliście razem.",
    image: "/portfolio/homepage/wedding-reportage-dsc01893.jpg",
    alt: "Para młoda nad morzem w świetle zachodzącego słońca",
    position: "50% 55%"
  }
] as const;

export function WeddingStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setEnhanced(!motionPreference.matches);

    updatePreference();
    motionPreference.addEventListener("change", updatePreference);
    return () => motionPreference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!enhanced) return;

    let frame = 0;
    const updateChapter = () => {
      frame = 0;
      const track = scrollRef.current;
      if (!track) return;

      const bounds = track.getBoundingClientRect();
      const scrollDistance = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / scrollDistance));
      const nextIndex = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateChapter);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enhanced]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      document.body.toggleAttribute("data-wedding-story-visible", entry.isIntersecting);
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      document.body.removeAttribute("data-wedding-story-visible");
    };
  }, []);

  return (
    <section id="opowiesc" ref={sectionRef} aria-labelledby="wedding-story-heading" className="scroll-mt-24 bg-cream">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-7 px-5 pb-16 pt-24 md:flex-row md:items-end md:justify-between md:px-10 md:pb-20 md:pt-32">
        <div>
          <h2 id="wedding-story-heading" className="type-hero max-w-[12ch] text-ink">
            Jedna historia.<br />Trzy momenty.
          </h2>
          <p className="type-body mt-6 max-w-[48ch] text-ink/75">
            Od pierwszego gestu po ostatnie światło. Zobacz, jak jedna chwila prowadzi do następnej.
          </p>
        </div>
        <a
          href="#wybrane-prace"
          className="type-action inline-flex min-h-11 w-fit items-center border-b border-ink/40 text-ink transition-colors hover:border-cognac hover:text-cognac"
        >
          Przejdź do portfolio
        </a>
      </div>

      <div ref={scrollRef} className={enhanced ? "relative hidden h-[340svh] md:block" : "hidden"}>
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-espresso">
          <div className="absolute inset-5 overflow-hidden rounded-[1rem] bg-sand lg:inset-8">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.image}
                aria-hidden={activeIndex !== index}
                className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-editorial)] ${
                  activeIndex === index ? "scale-100 opacity-100" : "scale-[1.035] opacity-0"
                }`}
              >
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  sizes="(min-width: 1400px) 1320px, (min-width: 1024px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                  loading="lazy"
                  quality={75}
                  className="object-cover"
                  style={{ objectPosition: chapter.position }}
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-espresso/10" />
          </div>

          <div key={activeIndex} className="story-caption pointer-events-none absolute bottom-[12%] left-[8%] right-[8%] z-10 max-w-[850px] text-cream">
            <p className="type-meta text-cream/80">{String(activeIndex + 1).padStart(2, "0")} / 03</p>
            <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-[clamp(4rem,7vw,6rem)] leading-[0.88] tracking-[-0.025em]">
              {chapters[activeIndex].title}
            </h3>
            <p className="type-body mt-5 max-w-[42ch] text-cream/90">{chapters[activeIndex].description}</p>
          </div>

          <div aria-hidden="true" className="absolute right-[8%] top-[12%] z-10 flex items-center gap-2">
            {chapters.map((chapter, index) => (
              <span key={chapter.title} className={`h-0.5 w-8 transition-colors duration-300 ${index <= activeIndex ? "bg-cream" : "bg-cream/40"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className={`bg-espresso px-5 py-5 md:px-10 md:py-8 ${enhanced ? "md:hidden" : ""}`}>
        <div className="mx-auto grid max-w-[1320px] gap-5 md:gap-8">
          {chapters.map((chapter, index) => (
            <article key={chapter.image} className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-sand text-cream md:aspect-auto md:h-[min(78svh,800px)]">
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                sizes="(min-width: 1400px) 1320px, (min-width: 768px) calc(100vw - 5rem), calc(100vw - 2.5rem)"
                loading="lazy"
                quality={75}
                className="object-cover"
                style={{ objectPosition: chapter.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-espresso/10" />
              <div className="absolute inset-x-6 bottom-20 md:bottom-12 md:left-[7%] md:right-[7%]">
                <p className="type-meta text-cream/80">{String(index + 1).padStart(2, "0")} / 03</p>
                <h3 className="mt-2 font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,10vw,3.25rem)] leading-[0.92] tracking-[-0.025em] text-cream md:mt-4 md:text-[clamp(4rem,7vw,6rem)]">
                  {chapter.title}
                </h3>
                <p className="type-body mt-3 max-w-[42ch] text-cream/90 md:mt-5">{chapter.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 pb-24 pt-16 md:flex-row md:items-end md:justify-between md:px-10 md:pb-32 md:pt-20">
        <div>
          <h3 className="type-section max-w-[15ch] text-ink">A Wasza historia?</h3>
          <p className="type-body mt-4 max-w-[50ch] text-ink/75">
            Zobacz cały reportaż albo opowiedz mi, co planujecie.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/galeria-zdjec/sluby" className="type-action button-outline min-h-12 justify-center px-5">
            Zobacz śluby
          </Link>
          <InPageLink targetId="kontakt" className="type-action button-primary min-h-12 justify-center px-5">
            Zapytaj o termin
          </InPageLink>
        </div>
      </div>
    </section>
  );
}
