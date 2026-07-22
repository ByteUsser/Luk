"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { InPageLink } from "@/components/InPageLink";

function getStickyLinks(pathname: string) {
  if (pathname === "/") {
    return {
      primaryHref: "#kontakt",
      primaryLabel: "Sprawdź termin"
    };
  }

  if (pathname === "/galeria-zdjec") {
    return {
      primaryHref: "/kontakt?source=galeria",
      primaryLabel: "Sprawdź termin"
    };
  }

  if (pathname === "/kontakt") {
    return {
      primaryHref: "#kontakt",
      primaryLabel: "Formularz"
    };
  }

  return {
    primaryHref: "/kontakt?source=sticky-sitewide",
    primaryLabel: "Sprawdź termin"
  };
}

export function MobileStickyCta() {
  const pathname = usePathname();
  const { primaryHref, primaryLabel } = getStickyLinks(pathname);
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

      setIsVisible(window.scrollY > 360 && !contactIsInView && !footerIsInView);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  if (pathname === "/kontakt" || pathname === "/cennik" || !isVisible) {
    return null;
  }

  const renderStickyLink = (href: string, label: string, className: string) => {
    if (href.startsWith("#")) {
      return (
        <InPageLink key={href} targetId={href.slice(1)} className={className}>
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
    <div data-mobile-sticky-cta className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 px-4 md:hidden">
      <div className="mx-auto flex max-w-[560px] items-center gap-2 rounded-2xl border border-ink/20 bg-cream/95 p-2 shadow-[0_14px_30px_rgba(28,21,16,0.2)] backdrop-blur">
        {renderStickyLink(primaryHref, primaryLabel, "button-sticky-primary flex-1 px-3 text-[0.82rem] uppercase tracking-[0.12em]")}
      </div>
    </div>
  );
}
