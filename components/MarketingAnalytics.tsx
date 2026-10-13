"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { rememberFirstVisit } from "@/lib/lead-attribution";
import { trackMarketingEvent } from "@/lib/marketing-analytics";
import { classifyMarketingLink } from "@/lib/marketing-links";

export function MarketingAnalytics() {
  useEffect(() => {
    rememberFirstVisit();

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const link = classifyMarketingLink(anchor.getAttribute("href") ?? "", window.location.href);
      if (!link) return;

      trackMarketingEvent(link.event, {
        path: window.location.pathname,
        ...(link.destination ? { destination: link.destination } : {})
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return <Analytics />;
}
