"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ContactIcon } from "@/components/ContactIcon";
import { InPageLink } from "@/components/InPageLink";
import { buildContactHref } from "@/lib/contact-prefill";
import { findLocationByPathname } from "@/lib/location-pages";
import { SITE_CONFIG } from "@/lib/site-config";

function getStickyLinks(pathname: string, locationName?: string) {
  if (pathname === "/") {
    return {
      primaryHref: "#formularz-kontaktowy",
      primaryLabel: "Zapytaj o termin"
    };
  }

  if (pathname === "/galeria-zdjec" || pathname.startsWith("/galeria-zdjec/")) {
    return {
      primaryHref: buildContactHref("galeria"),
      primaryLabel: "Zapytaj o termin"
    };
  }

  if (pathname === "/cennik") {
    return {
      primaryHref: buildContactHref("cennik-sticky"),
      primaryLabel: "Zapytaj o termin"
    };
  }

  if (pathname === "/kontakt") {
    return {
      primaryHref: "#formularz-kontaktowy",
      primaryLabel: "Formularz"
    };
  }

  if (locationName) {
    return {
      primaryHref: buildContactHref("sticky-lokalizacja", locationName),
      primaryLabel: "Zapytaj o termin"
    };
  }

  return {
    primaryHref: buildContactHref("sticky-sitewide"),
    primaryLabel: "Zapytaj o termin"
  };
}

export function MobileStickyCta() {
  const pathname = usePathname();
  const currentLocation = findLocationByPathname(pathname);
  const { primaryHref, primaryLabel } = getStickyLinks(pathname, currentLocation?.name);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const contactSection = document.getElementById("kontakt");
      const contactRect = contactSection?.getBoundingClientRect();
      const contactIsInView = contactRect
        ? contactRect.top < window.innerHeight * 0.86 && contactRect.bottom > 120
        : false;
      const footer = document.querySelector<HTMLElement>("[data-site-footer]");
      const footerRect = footer?.getBoundingClientRect();
      const footerIsInView = footerRect
        ? footerRect.top < window.innerHeight && footerRect.bottom > 0
        : false;
      const stopSection = document.querySelector<HTMLElement>("[data-sticky-cta-stop]");
      const stopRect = stopSection?.getBoundingClientRect();
      const stopSectionIsInView = stopRect
        ? stopRect.top < window.innerHeight * 0.9 && stopRect.bottom > 0
        : false;

      setIsVisible(
        window.scrollY > 360 && !contactIsInView && !stopSectionIsInView && !footerIsInView
      );
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  if (pathname === "/kontakt" || !isVisible) {
    return null;
  }

  const renderStickyLink = (href: string, label: string, className: string) => {
    if (href.startsWith("#")) {
      return (
        <InPageLink
          key={href}
          targetId={href.slice(1)}
          className={className}
          onNavigate={() => {
            window.requestAnimationFrame(() => {
              document.getElementById("formularz-kontaktowy")?.focus({ preventScroll: true });
            });
          }}
        >
          {label}
        </InPageLink>
      );
    }

    return (
      <Link key={href} href={href} className={className}>
        {label}
      </Link>
    );
  };

  return (
    <div data-mobile-sticky-cta className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 px-4 transition-[opacity,transform] duration-200 md:hidden">
      <div className="mx-auto flex max-w-[560px] items-center gap-2 rounded-2xl border border-ink/20 bg-cream/95 p-2 shadow-[0_14px_30px_rgba(28,21,16,0.2)] backdrop-blur">
        {renderStickyLink(primaryHref, primaryLabel, "type-action button-sticky-primary flex-1 px-3")}
        {pathname === "/cennik" || currentLocation ? (
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="button-sticky-secondary h-11 w-12 shrink-0"
            aria-label={`Zadzwoń: ${SITE_CONFIG.phoneDisplay}`}
          >
            <ContactIcon name="phone" className="h-[19px] w-[19px]" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
