"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  message: "",
  website: ""
};

type ContactProps = {
  headingLevel?: "h1" | "h2";
  allowQueryPrefill?: boolean;
};

type ApiErrorResponse = {
  error?: string;
};

function normalizeLocation(raw: string): string {
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  decoded = decoded.replaceAll("-", " ").trim();
  if (!decoded) {
    return "";
  }

  return decoded.charAt(0).toUpperCase() + decoded.slice(1);
}

function prefillMessageForLocation(location: string): string {
  return `Cześć, chcę umówić sesję w ${location}. Interesuje mnie sesja portretowa/lifestyle i proszę o propozycję terminu.`;
}

export function Contact({ headingLevel = "h2", allowQueryPrefill = false }: ContactProps) {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [prefillLocation, setPrefillLocation] = useState("");
  const prefillAppliedRef = useRef(false);
  const HeadingTag = headingLevel;

  useEffect(() => {
    if (!allowQueryPrefill || prefillAppliedRef.current) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const locationFromQuery = searchParams.get("lokalizacja") ?? searchParams.get("location") ?? "";
    const normalizedLocation = normalizeLocation(locationFromQuery);
    if (!normalizedLocation) {
      return;
    }

    setPrefillLocation(normalizedLocation);
    setFormState((prev) =>
      prev.message
        ? prev
        : {
            ...prev,
            message: prefillMessageForLocation(normalizedLocation)
          }
    );
    prefillAppliedRef.current = true;
  }, [allowQueryPrefill]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      setStatusMessage("Uzupełnij wszystkie pola.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as ApiErrorResponse | null;
        throw new Error(payload?.error ?? "Nie udało się wysłać wiadomości.");
      }

      setStatus("success");
      setStatusMessage("Dziękuję, odezwę się najszybciej jak to możliwe.");
      setFormState(INITIAL_STATE);
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Błąd formularza.");
    }
  };

  return (
    <section
      id="kontakt"
      className="defer-render relative overflow-hidden bg-espresso px-5 py-20 text-cream md:px-10 md:py-28"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cognac/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-cognac/10 blur-3xl" />
      <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-14">
        <div>
          <span className="eyebrow text-cognac">Kontakt</span>
          <HeadingTag className="section-title mt-5 max-w-[12ch] text-cream">
            Zróbmy coś <span className="italic">pięknego</span> razem
          </HeadingTag>

          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="mt-8 inline-flex min-h-[44px] max-w-full items-center rounded-full border border-cream/45 bg-cream/10 px-4 text-[0.78rem] tracking-[0.03em] text-cream transition-colors duration-700 hover:border-cognac hover:text-cognac sm:px-5 sm:text-[0.82rem]"
          >
            {SITE_CONFIG.email}
          </a>

          <div className="mt-8 flex flex-wrap gap-3 text-[0.66rem] uppercase tracking-[0.16em] text-cream/90 sm:text-[0.68rem] sm:tracking-[0.2em]">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full border border-cream/35 bg-cream/10 px-4 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Instagram
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full border border-cream/35 bg-cream/10 px-4 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Facebook
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
          noValidate
        >
          {prefillLocation ? (
            <p className="rounded-2xl border border-cognac/35 bg-cream/10 px-4 py-3 text-[0.83rem] text-cream/90">
              Wstępnie uzupełniłem wiadomość dla lokalizacji: <strong>{prefillLocation}</strong>.
              Możesz ją dowolnie edytować.
            </p>
          ) : null}

          <label className="hidden" aria-hidden="true">
            <span className="sr-only">Website</span>
            <input
              value={formState.website}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  website: event.target.value
                }))
              }
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <label className="block">
            <span className="sr-only">Imię</span>
            <input
              value={formState.name}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  name: event.target.value
                }))
              }
              name="name"
              required
              minLength={2}
              className="h-11 w-full border-0 border-b border-cream/35 bg-transparent text-[0.98rem] text-cream outline-none transition-colors focus:border-cognac"
              placeholder="Imię"
            />
          </label>

          <label className="block">
            <span className="sr-only">Email</span>
            <input
              value={formState.email}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  email: event.target.value
                }))
              }
              name="email"
              type="email"
              required
              className="h-11 w-full border-0 border-b border-cream/35 bg-transparent text-[0.98rem] text-cream outline-none transition-colors focus:border-cognac"
              placeholder="Email"
            />
          </label>

          <label className="block">
            <span className="sr-only">Wiadomość</span>
            <textarea
              value={formState.message}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  message: event.target.value
                }))
              }
              name="message"
              required
              rows={4}
              className="w-full resize-none border-0 border-b border-cream/35 bg-transparent py-2 text-[0.98rem] text-cream outline-none transition-colors focus:border-cognac"
              placeholder="Wiadomość"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 min-w-[180px] rounded-full border border-cognac bg-cognac px-6 text-[0.7rem] uppercase tracking-[0.24em] text-cream transition-colors duration-700 hover:bg-transparent hover:text-cognac disabled:cursor-not-allowed disabled:opacity-65"
          >
            {status === "loading" ? "Wysyłanie..." : "Wyślij"}
          </button>

          {statusMessage ? (
            <p className={`text-sm ${status === "success" ? "text-cognac" : "text-cream/80"}`}>
              {statusMessage}
            </p>
          ) : null}

          <p className="text-[0.76rem] text-cream/70">
            Zwykle odpowiadam w ciągu 24 godzin.
          </p>

          <p className="text-[0.76rem] text-cream/70">
            Wysyłając formularz akceptujesz{" "}
            <a href="/polityka-prywatnosci" className="text-link">
              politykę prywatności
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
