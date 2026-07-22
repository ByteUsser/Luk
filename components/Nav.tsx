"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { InPageLink } from "@/components/InPageLink";
import { SITE_CONFIG } from "@/lib/site-config";

const homeNavLinks = [
  { href: "/galeria-zdjec", label: "Galeria" },
  { href: "#oferta", label: "Oferta" },
  { href: "/cennik", label: "Cennik" },
  { href: "/o-mnie", label: "O mnie" }
] as const;

const pageNavLinks = [
  { href: "/galeria-zdjec", label: "Galeria" },
  { href: "/#oferta", label: "Oferta" },
  { href: "/cennik", label: "Cennik" },
  { href: "/o-mnie", label: "O mnie" }
] as const;

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navLinks = isHome ? homeNavLinks : pageNavLinks;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const mobileMenuId = "mobile-site-menu";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const backgroundElements = [
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
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
      if (!focusable.length) return;
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
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      backgroundState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });
    };
  }, [open]);

  const renderNavLink = (href: string, label: string, className: string, onNavigate?: () => void) => {
    if (isHome && href.startsWith("#")) {
      return (
        <InPageLink key={href} targetId={href.slice(1)} className={className} onNavigate={onNavigate}>
          {label}
        </InPageLink>
      );
    }

    return (
      <Link
        key={href}
        href={href}
        className={`${className}${pathname === href ? " is-current" : ""}`}
        onClick={onNavigate}
        aria-current={pathname === href ? "page" : undefined}
      >
        {label}
      </Link>
    );
  };

  const contactButton = (className: string, label = "Sprawdź termin") =>
    isHome ? (
      <InPageLink targetId="kontakt" className={className} onNavigate={() => setOpen(false)}>
        {label}
      </InPageLink>
    ) : (
      <Link href="/kontakt?source=nawigacja" className={className} onClick={() => setOpen(false)}>
        {label}
      </Link>
    );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 px-3 py-3 sm:px-5 sm:py-4 md:px-8 xl:px-10">
        <div
          className={`mx-auto flex max-w-[1400px] items-center gap-3 rounded-full border px-3 py-2 transition duration-500 md:px-4 xl:px-5 ${
            scrolled
              ? "border-ink/16 bg-surface/95 shadow-[0_12px_34px_rgba(23,17,13,0.13)] backdrop-blur-xl"
              : "border-ink/10 bg-surface/88 shadow-[0_8px_26px_rgba(23,17,13,0.09)] backdrop-blur-xl"
          }`}
        >
          {isHome ? (
            <InPageLink targetId="start" ariaLabel={SITE_CONFIG.name} className="flex min-w-0 flex-1 items-center min-[1100px]:flex-none">
              <Image
                src="/logo-black.svg"
                alt={SITE_CONFIG.name}
                width={2200}
                height={650}
                priority
                sizes="(max-width: 767px) 145px, 230px"
                className="h-auto w-[clamp(128px,36vw,160px)] md:w-[220px] xl:w-[238px]"
              />
            </InPageLink>
          ) : (
            <Link href="/" aria-label={SITE_CONFIG.name} className="flex min-w-0 flex-1 items-center min-[1100px]:flex-none">
              <Image
                src="/logo-black.svg"
                alt={SITE_CONFIG.name}
                width={2200}
                height={650}
                priority
                sizes="(max-width: 767px) 145px, 230px"
                className="h-auto w-[clamp(128px,36vw,160px)] md:w-[220px] xl:w-[238px]"
              />
            </Link>
          )}

          <nav className="hidden flex-1 items-center justify-end gap-5 text-[0.76rem] font-normal uppercase tracking-[0.12em] min-[1100px]:flex xl:gap-6 xl:text-[0.78rem] xl:tracking-[0.14em]">
            {navLinks.map((link) =>
              renderNavLink(
                link.href,
                link.label,
                "menu-link text-link inline-flex min-h-11 items-center whitespace-nowrap"
              )
            )}
            {contactButton("button-primary ml-2 min-h-11 whitespace-nowrap px-5 text-[0.77rem] font-normal tracking-[0.12em]")}
          </nav>

          <div className="flex shrink-0 items-center gap-2 min-[1100px]:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              aria-controls={mobileMenuId}
              aria-expanded={open}
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setOpen((value) => !value)}
              className="button-icon relative h-11 w-11 sm:h-12 sm:w-12"
            >
              <span className={`absolute h-[1.5px] w-[18px] bg-ink transition-transform ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-[1.5px] w-[18px] bg-ink transition-transform ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Zamknij menu"
        className={`fixed inset-0 z-20 bg-espresso/34 transition-opacity duration-300 min-[1100px]:hidden ${open ? "opacity-100" : "pointer-events-none invisible opacity-0"}`}
        onClick={() => {
          setOpen(false);
          menuButtonRef.current?.focus();
        }}
      />

      <aside
        id={mobileMenuId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacyjne"
        aria-hidden={!open}
        className={`fixed bottom-0 right-0 top-[82px] z-20 flex w-[88vw] max-w-[390px] flex-col bg-cream px-6 pb-8 pt-6 shadow-[-20px_0_50px_rgba(23,17,13,0.18)] transition-[transform,visibility] duration-500 sm:top-[94px] sm:px-8 ${
          open ? "visible translate-x-0" : "pointer-events-none invisible translate-x-full"
        } min-[1100px]:hidden`}
      >
        <p className="eyebrow text-cognac">Menu</p>
        <nav className="mt-6 flex flex-col border-t border-ink/12">
          {navLinks.map((link) =>
            renderNavLink(
              link.href,
              link.label,
              "mobile-menu-link border-b border-ink/12 py-4 font-display text-[1.75rem] leading-none text-ink",
              () => setOpen(false)
            )
          )}
        </nav>

        <div className="mt-auto pt-6">
          {contactButton("button-primary w-full min-h-12 justify-center px-5 text-[0.8rem] uppercase tracking-[0.12em]")}
          <div className="mt-5 flex gap-5 text-[0.76rem] uppercase tracking-[0.12em] text-ink/70">
            <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-link">Instagram</a>
            <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-link">Facebook</a>
          </div>
        </div>
      </aside>
    </>
  );
}
