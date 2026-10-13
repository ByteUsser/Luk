import type { MarketingEvent } from "@/lib/marketing-analytics";

type MarketingLink = {
  event: MarketingEvent;
  destination?: string;
};

export function classifyMarketingLink(href: string, currentUrl: string): MarketingLink | null {
  if (!href.trim()) return null;

  try {
    const current = new URL(currentUrl);
    const target = new URL(href, current);

    // Never send the telephone number, query parameters or form contents.
    if (target.protocol === "tel:") return { event: "phone_click" };
    if (target.protocol !== "https:" && target.protocol !== "http:") return null;

    const isGoogleMaps =
      ["google.com", "www.google.com"].includes(target.hostname) &&
      (target.pathname === "/maps" || target.pathname.startsWith("/maps/"));
    if (isGoogleMaps) return { event: "google_reviews_click" };
    if (target.origin !== current.origin) return null;

    const path = target.pathname.replace(/\/+$/, "") || "/";
    if (path === "/kontakt" || (path === "/" && target.hash === "#kontakt")) {
      return { event: "click_contact", destination: path };
    }
    if (path === "/cennik") return { event: "click_pricing", destination: path };
    if (
      path === "/galeria-zdjec" ||
      path.startsWith("/galeria-zdjec/") ||
      (path === "/" && target.hash === "#wybrane-prace")
    ) {
      return { event: "click_gallery", destination: path };
    }
    return null;
  } catch {
    return null;
  }
}
