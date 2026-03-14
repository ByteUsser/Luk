"use client";

import Image from "next/image";
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
      <header className="fixed inset-x-0 top-0 z-30 px-3 py-3 sm:px-5 sm:py-5 md:px-8 md:py-6 xl:px-10 xl:py-7">
        <div
          style={headerStyle}
          className="mx-auto flex max-w-[1400px] min-w-0 items-center justify-between gap-2 rounded-full border px-2.5 py-2 transition-[background-color,box-shadow,border-color] duration-500 sm:px-3 md:px-4 md:py-2.5 xl:px-6 xl:py-3"
        >
          <Link
            href={brandHref}
            aria-label={SITE_CONFIG.name}
            className="menu-link relative flex min-w-0 flex-1 items-center xl:flex-none"
          >
            <Image
              src="/logo.png"
              alt={SITE_CONFIG.name}
              width={1500}
              height={520}
              priority
              sizes="(max-width: 359px) 110px, (max-width: 767px) 140px, (max-width: 1279px) 180px, 220px"
              className="h-auto w-[clamp(110px,31vw,220px)] max-w-full md:w-[clamp(148px,23vw,210px)] xl:w-[220px]"
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

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 xl:hidden">
            <a
              href={socials[0].href}
              target="_blank"
              rel="noreferrer"
              aria-label={socials[0].label}
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-ink/25 bg-cream/80 transition-colors duration-700 hover:border-cognac hover:text-cognac min-[360px]:inline-flex sm:h-9 sm:w-9"
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
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-ink/25 bg-cream/80 transition-colors duration-700 hover:border-cognac hover:text-cognac min-[430px]:inline-flex sm:h-9 sm:w-9"
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
              className="relative flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 bg-cream/80 shadow-sm backdrop-blur-sm min-[360px]:h-9 min-[360px]:w-9 sm:h-10 sm:w-10"
            >
              <span
                className={`absolute h-[1.5px] w-[16px] bg-ink transition-transform duration-300 min-[360px]:w-5 sm:w-6 ${
                  open ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[16px] bg-ink transition-transform duration-300 min-[360px]:w-5 sm:w-6 ${
                  open ? "-rotate-45" : "translate-y-[3px]"
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
        className={`fixed bottom-0 right-0 top-[84px] z-20 flex w-[82vw] max-w-[360px] flex-col bg-cream px-8 pb-10 pt-5 sm:top-[104px] sm:pt-6 md:top-[114px] transition-transform duration-500 ${
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
