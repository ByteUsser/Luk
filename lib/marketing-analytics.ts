"use client";

import { track } from "@vercel/analytics";

type MarketingEvent =
  | "click_contact"
  | "click_gallery"
  | "form_start"
  | "form_submit_success"
  | "google_reviews_click"
  | "phone_click"
  | "select_topic";

export function trackMarketingEvent(
  event: MarketingEvent,
  data?: Record<string, string | number | boolean>
): void {
  try {
    track(event, data);
  } catch {
    // Analityka nie może blokować nawigacji ani formularza.
  }
}
