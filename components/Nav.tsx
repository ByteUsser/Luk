"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/site-config";

const homeNavLinks = [
  { href: "#wybrane-prace", label: "Prace" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#oferta", label: "Oferta" },
  { href: "#kontakt", label: "Kontakt" }
];

const pageNavLinks = [
  { href: "/", label: "Start" },
  { href: "/fotograf", label: "Lokalizacje" },
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuItemClass =
    "inline-flex min-h-[48px] w-full items-center justify-start rounded-full border border-ink/15 bg-[#f4ede2] px-5 text-left text-[1.05rem] leading-none";

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
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
      <header className="fixed inset-x-0 top-0 z-30 px-5 py-5 md:px-10 md:py-7">
        <div
          style={headerStyle}
          className="mx-auto flex max-w-[1400px] min-w-0 items-center justify-between rounded-full border px-3 py-2 transition-[background-color,box-shadow,border-color] duration-500 md:px-6 md:py-3"
        >
          <Link
            href={brandHref}
            className="menu-link relative max-w-[52vw] truncate whitespace-nowrap font-display text-[clamp(1.05rem,4.2vw,1.95rem)] leading-none text-ink sm:max-w-none"
          >
            {SITE_CONFIG.name}
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
                rel="noreferrer"
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
                rel="noreferrer"
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

          <div className="flex shrink-0 items-center gap-1.5 xl:hidden">
            <a
              href={socials[0].href}
              target="_blank"
              rel="noreferrer"
              aria-label={socials[0].label}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 bg-cream/80 transition-colors duration-700 hover:border-cognac hover:text-cognac sm:h-9 sm:w-9"
            >
              <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] sm:h-[14px] sm:w-[14px]" fill="none" aria-hidden="true">
                <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="17.6" cy="6.4" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href={socials[1].href}
              target="_blank"
              rel="noreferrer"
              aria-label={socials[1].label}
              className="hidden min-[390px]:inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 bg-cream/80 transition-colors duration-700 hover:border-cognac hover:text-cognac sm:h-9 sm:w-9"
            >
              <svg viewBox="0 0 24 24" className="h-[12px] w-[12px] sm:h-[13px] sm:w-[13px]" fill="none" aria-hidden="true">
                <path
                  d="M14.4 8.3h2V5.1h-2.3c-2.8 0-4.5 1.8-4.5 4.5v2.1H7.4v3.1h2.2v4.9h3.2v-4.9h2.6l.4-3.1h-3V10c0-1 .5-1.7 1.6-1.7Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <button
              type="button"
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setOpen((prev) => !prev)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 bg-cream/80 shadow-sm backdrop-blur-sm sm:h-10 sm:w-10"
            >
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 sm:w-6 ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 sm:w-6 ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-20 bg-espresso/25 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-20 flex w-[82vw] max-w-[360px] flex-col bg-cream px-8 pb-10 pt-24 transition-transform duration-500 ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
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
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className={mobileMenuItemClass}
          >
            Instagram
          </a>
          <a
            href={SITE_CONFIG.social.facebook}
            target="_blank"
            rel="noreferrer"
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
