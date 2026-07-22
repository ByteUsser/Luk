"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { rememberFirstVisit } from "@/lib/lead-attribution";
import { trackMarketingEvent } from "@/lib/marketing-analytics";

function classifyLink(anchor: HTMLAnchorElement): Parameters<typeof trackMarketingEvent>[0] | null {
  const href = anchor.getAttribute("href") ?? "";

  if (href.startsWith("tel:")) return "phone_click";
  if (href.includes("google.com/maps")) return "google_reviews_click";
  if (href === "/galeria-zdjec" || href === "#wybrane-prace") return "click_gallery";
  if (href.startsWith("/kontakt") || href === "#kontakt") return "click_contact";
  return null;
}

export function MarketingAnalytics() {
  useEffect(() => {
    rememberFirstVisit();

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const marketingEvent = classifyLink(anchor);
      if (!marketingEvent) return;

      trackMarketingEvent(marketingEvent, {
        path: window.location.pathname
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return <Analytics />;
}
