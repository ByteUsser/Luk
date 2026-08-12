"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { InPageLink } from "@/components/InPageLink";
import { buildContactHref } from "@/lib/contact-prefill";
import { findLocationByPathname } from "@/lib/location-pages";
import { SITE_CONFIG } from "@/lib/site-config";

const navLinks = [
  { href: "/galeria-zdjec", label: "Portfolio" },
  { href: "/cennik", label: "Cennik" },
  { href: "/fotograf", label: "Obszar działania" },
  { href: "/o-mnie", label: "O mnie" }
] as const;

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const currentLocation = findLocationByPathname(pathname);
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
    const previousMobileMenuState = document.body.dataset.mobileMenuOpen;
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
    document.body.dataset.mobileMenuOpen = "true";
    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });
    const panel = panelRef.current;
    const focusFrame = window.requestAnimationFrame(() => {
      panel?.querySelector<HTMLElement>("[data-mobile-menu-close]")?.focus();
    });

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
      if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
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
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousMobileMenuState === undefined) {
        delete document.body.dataset.mobileMenuOpen;
      } else {
        document.body.dataset.mobileMenuOpen = previousMobileMenuState;
      }
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

    const isCurrent =
      pathname === href ||
      (href === "/galeria-zdjec" && pathname.startsWith("/galeria-zdjec/")) ||
      (href === "/fotograf" && pathname.startsWith("/fotograf/"));

    return (
      <Link
        key={href}
        href={href}
        className={`${className}${isCurrent ? " is-current" : ""}`}
        onClick={onNavigate}
        aria-current={isCurrent ? "page" : undefined}
      >
        {label}
      </Link>
    );
  };

  const closeMenuAndFocusForm = () => {
    setOpen(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById("formularz-kontaktowy")?.focus({ preventScroll: true });
      });
    });
  };

  const toggleMobileMenu = () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (nextOpen) {
      window.setTimeout(() => {
        panelRef.current?.querySelector<HTMLElement>("[data-mobile-menu-close]")?.focus();
      }, 0);
    }
  };

  const contactButton = (className: string, label = "Zapytaj o termin") =>
    isHome ? (
      <InPageLink
        targetId="formularz-kontaktowy"
        className={className}
        onNavigate={closeMenuAndFocusForm}
      >
        {label}
      </InPageLink>
    ) : (
      <Link
        href={buildContactHref("nawigacja", currentLocation?.name)}
        className={className}
        onClick={() => setOpen(false)}
      >
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

          <nav className="type-action hidden flex-1 items-center justify-end gap-5 min-[1100px]:flex xl:gap-6">
            {navLinks.map((link) =>
              renderNavLink(
                link.href,
                link.label,
                "menu-link text-link inline-flex min-h-11 items-center whitespace-nowrap"
              )
            )}
            {contactButton("type-action button-primary ml-2 min-h-11 whitespace-nowrap px-5")}
          </nav>

          <div className="flex shrink-0 items-center gap-2 min-[1100px]:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              aria-controls={mobileMenuId}
              aria-expanded={open}
              aria-hidden={open || undefined}
              tabIndex={open ? -1 : undefined}
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              onClick={toggleMobileMenu}
              className={`button-icon relative h-11 w-11 transition-opacity sm:h-12 sm:w-12 ${
                open ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <span className={`absolute h-[1.5px] w-[18px] bg-ink transition-transform ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-[1.5px] w-[18px] bg-ink transition-transform ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        tabIndex={-1}
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
        className={`fixed bottom-0 right-0 top-[82px] z-20 flex w-[80vw] max-w-[340px] flex-col overflow-y-auto bg-cream px-6 pb-8 pt-6 shadow-[-20px_0_50px_rgba(23,17,13,0.18)] transition-[transform,visibility] duration-500 sm:top-[94px] sm:px-8 ${
          open ? "visible translate-x-0" : "pointer-events-none invisible translate-x-full"
        } min-[1100px]:hidden`}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow text-cognac">Menu</p>
          <button
            type="button"
            data-mobile-menu-close
            aria-label="Zamknij menu"
            className="button-icon h-11 w-11 shrink-0"
            onClick={() => {
              setOpen(false);
              menuButtonRef.current?.focus();
            }}
          >
            <span aria-hidden="true" className="text-[1.55rem] font-light leading-none">
              ×
            </span>
          </button>
        </div>
        <nav className="mt-6 flex flex-col border-t border-ink/12">
          {navLinks.map((link) =>
            renderNavLink(
              link.href,
              link.label,
              "type-card mobile-menu-link border-b border-ink/12 py-4 text-ink",
              () => setOpen(false)
            )
          )}
        </nav>

        <div className="mt-auto pt-6">
          {contactButton("type-action button-primary w-full min-h-12 justify-center px-5")}
          <div className="type-action mt-5 flex gap-5 text-ink/70">
            <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-link">Instagram</a>
            <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-link">Facebook</a>
          </div>
        </div>
      </aside>
    </>
  );
}
