"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { InPageLink } from "@/components/InPageLink";

function getStickyLinks(pathname: string) {
  if (pathname === "/") {
    return {
      primaryHref: "#kontakt",
      secondaryHref: "#wybrane-prace"
    };
  }

  if (pathname === "/kontakt") {
    return {
      primaryHref: "#kontakt",
      secondaryHref: "/"
    };
  }

  return {
    primaryHref: "/kontakt?source=sticky-sitewide",
    secondaryHref: "/"
  };
}

export function MobileStickyCta() {
  const pathname = usePathname();
  const { primaryHref, secondaryHref } = getStickyLinks(pathname);
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
    <div className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 px-4 md:hidden">
      <div className="mx-auto flex max-w-[560px] items-center gap-2 rounded-2xl border border-ink/20 bg-cream/95 p-2 shadow-[0_14px_30px_rgba(28,21,16,0.2)] backdrop-blur">
        {renderStickyLink(primaryHref, "Umów sesję", "button-sticky-primary flex-1 px-3 text-[0.74rem] uppercase tracking-[0.14em]")}
        {renderStickyLink(secondaryHref, "Portfolio", "button-sticky-secondary flex-1 px-3 text-[0.74rem] uppercase tracking-[0.14em]")}
      </div>
    </div>
  );
}
