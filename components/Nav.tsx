"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/site-config";

const homeNavLinks = [
  { href: "#wybrane-prace", label: "Prace" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#oferta", label: "Oferta" },
  { href: "/fotograf", label: "Lokalizacje" },
  { href: "/cennik", label: "Cennik" },
  { href: "#kontakt", label: "Kontakt" }
];

const pageNavLinks = [
  { href: "/#wybrane-prace", label: "Prace" },
  { href: "/#o-mnie", label: "O mnie" },
  { href: "/#oferta", label: "Oferta" },
  { href: "/fotograf", label: "Lokalizacje" },
  { href: "/cennik", label: "Cennik" },
  { href: "/kontakt", label: "Kontakt" }
];

const socials = [
  { href: SITE_CONFIG.social.instagram, label: "Instagram" },
  { href: SITE_CONFIG.social.facebook, label: "Facebook" }
];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navLinks = isHome ? homeNavLinks : pageNavLinks;
  const brandHref = isHome ? "#start" : "/";
  const mobileMenuId = "mobile-site-menu";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLElement>(null);
  const mobileMenuItemClass =
    "inline-flex h-12 w-full items-center justify-start rounded-full border border-ink/15 bg-[#f4ede2] px-5 text-left text-[1.05rem] leading-none";

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = menuPanelRef.current;
    const focusableElements = panel?.querySelectorAll<HTMLElement>(
      "a[href],button:not([disabled]),[tabindex]:not([tabindex='-1'])"
    );
    focusableElements?.[0]?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const focusable = panel.querySelectorAll<HTMLElement>(
        "a[href],button:not([disabled]),[tabindex]:not([tabindex='-1'])"
      );
      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const headerStyle = scrolled
    ? {
        backgroundColor: "rgba(250, 248, 244, 0.94)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 24px rgba(28, 21, 16, 0.14)",
        borderColor: "rgba(42, 36, 32, 0.2)"
      }
    : {
        backgroundColor: "rgba(250, 248, 244, 0.86)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 6px 20px rgba(28, 21, 16, 0.1)",
        borderColor: "rgba(42, 36, 32, 0.14)"
      };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 px-3 py-3 sm:px-5 sm:py-5 md:px-8 md:py-6 xl:px-10 xl:py-5">
        <div
          style={headerStyle}
          className="mx-auto flex max-w-[1400px] min-w-0 items-center justify-between gap-2 rounded-full border px-2.5 py-2 transition-[background-color,box-shadow,border-color] duration-500 sm:px-3 md:px-4 md:py-2.5 xl:px-6 xl:py-2.5"
        >
          <Link
            href={brandHref}
            aria-label={SITE_CONFIG.name}
            className="menu-link relative flex min-w-0 flex-1 items-center xl:flex-none"
          >
            <Image
              src="/logo-black.svg"
              alt={SITE_CONFIG.name}
              width={2200}
              height={650}
              priority
              sizes="(max-width: 359px) 132px, (max-width: 767px) 172px, (max-width: 1279px) 220px, 260px"
              className="h-auto w-[clamp(132px,31vw,210px)] max-w-full md:w-[clamp(185px,24vw,250px)] xl:w-[260px]"
            />
          </Link>

          <nav className="relative hidden items-center gap-8 text-[0.8rem] uppercase tracking-[0.22em] xl:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="menu-link text-link">
                {link.label}
              </Link>
            ))}
            <div className="ml-1 flex items-center gap-2">
              <a
                href={socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socials[0].label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/25 bg-cream/85 transition-colors duration-700 hover:border-cognac hover:text-cognac"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                  <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="17.6" cy="6.4" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href={socials[1].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socials[1].label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/25 bg-cream/85 transition-colors duration-700 hover:border-cognac hover:text-cognac"
              >
                <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" aria-hidden="true">
                  <path
                    d="M14.4 8.3h2V5.1h-2.3c-2.8 0-4.5 1.8-4.5 4.5v2.1H7.4v3.1h2.2v4.9h3.2v-4.9h2.6l.4-3.1h-3V10c0-1 .5-1.7 1.6-1.7Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <a
              href={socials[0].href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socials[0].label}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 bg-cream/80 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" aria-hidden="true">
                <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="17.6" cy="6.4" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href={socials[1].href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socials[1].label}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 bg-cream/80 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
                <path
                  d="M14.4 8.3h2V5.1h-2.3c-2.8 0-4.5 1.8-4.5 4.5v2.1H7.4v3.1h2.2v4.9h3.2v-4.9h2.6l.4-3.1h-3V10c0-1 .5-1.7 1.6-1.7Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-controls={mobileMenuId}
              aria-expanded={open}
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setOpen((prev) => !prev)}
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 bg-cream/80 shadow-sm backdrop-blur-sm"
            >
              <span
                className={`absolute h-[1.5px] w-[16px] bg-ink transition-transform duration-300 sm:w-6 ${
                  open ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[16px] bg-ink transition-transform duration-300 sm:w-6 ${
                  open ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-20 bg-espresso/25 transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => {
          setOpen(false);
          menuButtonRef.current?.focus();
        }}
      />
      <aside
        id={mobileMenuId}
        ref={menuPanelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacyjne"
        aria-hidden={!open}
        className={`fixed bottom-0 right-0 top-[84px] z-20 flex w-[82vw] max-w-[360px] flex-col bg-cream px-8 pb-10 pt-5 transition-[transform,visibility] duration-500 sm:top-[104px] sm:pt-6 md:top-[114px] xl:hidden ${
          open ? "translate-x-0 visible" : "pointer-events-none invisible translate-x-full"
        }`}
      >
        <nav className="flex w-full flex-col gap-3 text-lg font-light">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={mobileMenuItemClass}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={mobileMenuItemClass}
          >
            Instagram
          </a>
          <a
            href={SITE_CONFIG.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={mobileMenuItemClass}
          >
            Facebook
          </a>
        </nav>
      </aside>
    </>
  );
}
