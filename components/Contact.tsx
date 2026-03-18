"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type FieldKey = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldKey, string>>;

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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

function validateForm(values: Pick<FormState, "name" | "email" | "message">): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name) {
    errors.name = "Wpisz imię.";
  } else if (values.name.length < 2) {
    errors.name = "Imię powinno mieć minimum 2 znaki.";
  }

  if (!values.email) {
    errors.email = "Wpisz adres email.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Wpisz poprawny adres email.";
  }

  if (!values.message) {
    errors.message = "Wpisz wiadomość.";
  } else if (values.message.length < 10) {
    errors.message = "Wiadomość powinna mieć minimum 10 znaków.";
  }

  return errors;
}

export function Contact({ headingLevel = "h2", allowQueryPrefill = false }: ContactProps) {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
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

    const normalizedValues = {
      ...formState,
      name: formState.name.trim(),
      email: formState.email.trim(),
      message: formState.message.trim()
    };

    const errors = validateForm(normalizedValues);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setStatusMessage("Popraw pola oznaczone poniżej.");
      return;
    }

    setFieldErrors({});
    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(normalizedValues)
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
          <span className="eyebrow text-[#b89d7a]">Kontakt</span>
          <HeadingTag className="section-title mt-5 max-w-[12ch] text-cream">
            Umówmy sesję <span className="italic">dopasowaną</span> do Ciebie
          </HeadingTag>

          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="mt-8 inline-flex h-12 max-w-full items-center rounded-full border border-cream/45 bg-cream/10 px-5 text-[0.78rem] leading-none tracking-[0.03em] text-cream transition-colors duration-700 hover:border-cognac hover:text-cognac sm:text-[0.82rem]"
          >
            {SITE_CONFIG.email}
          </a>

          <div className="mt-5 flex flex-wrap gap-4 text-[0.66rem] uppercase tracking-[0.16em] text-cream/90 sm:text-[0.68rem] sm:tracking-[0.2em]">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-cream/35 bg-cream/10 px-5 leading-none transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Instagram
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-cream/35 bg-cream/10 px-5 leading-none transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Facebook
            </a>
          </div>

          <a
            href={SITE_CONFIG.googleBusinessProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex max-w-[430px] items-center justify-between gap-4 rounded-[1.35rem] border border-cream/20 bg-gradient-to-br from-cream/14 via-cream/10 to-transparent px-4 py-4 transition-colors duration-700 hover:border-cognac/60 hover:bg-cream/12 sm:px-5"
          >
            <div className="min-w-0">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[#d8c2a8]">Google</p>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-cream">
                Zobacz wizytowke i opinie
              </p>
              <p className="mt-1 text-[0.84rem] leading-relaxed text-cream/72">
                Sprawdz profil firmy w Google i otworz go bezposrednio w mapach.
              </p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-[1.3rem] text-cream transition-colors duration-700 group-hover:border-cognac/60 group-hover:text-[#d8c2a8]">
              G
            </span>
          </a>
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
            <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.14em] text-cream/80">Imię</span>
            <input
              value={formState.name}
              onChange={(event) =>
                setFormState((prev) => {
                  if (fieldErrors.name) {
                    setFieldErrors((current) => ({ ...current, name: undefined }));
                  }
                  return {
                    ...prev,
                    name: event.target.value
                  };
                })
              }
              name="name"
              required
              minLength={2}
              autoComplete="given-name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
              className="h-11 w-full border-0 border-b border-cream/35 bg-transparent text-[0.98rem] text-cream outline-none transition-colors focus:border-cognac"
              placeholder="Np. Ola"
            />
            {fieldErrors.name ? (
              <p id="contact-name-error" className="mt-2 text-[0.8rem] text-cognac">
                {fieldErrors.name}
              </p>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.14em] text-cream/80">Email</span>
            <input
              value={formState.email}
              onChange={(event) =>
                setFormState((prev) => {
                  if (fieldErrors.email) {
                    setFieldErrors((current) => ({ ...current, email: undefined }));
                  }
                  return {
                    ...prev,
                    email: event.target.value
                  };
                })
              }
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
              className="h-11 w-full border-0 border-b border-cream/35 bg-transparent text-[0.98rem] text-cream outline-none transition-colors focus:border-cognac"
              placeholder="np@email.com"
            />
            {fieldErrors.email ? (
              <p id="contact-email-error" className="mt-2 text-[0.8rem] text-cognac">
                {fieldErrors.email}
              </p>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.14em] text-cream/80">Wiadomość</span>
            <textarea
              value={formState.message}
              onChange={(event) =>
                setFormState((prev) => {
                  if (fieldErrors.message) {
                    setFieldErrors((current) => ({ ...current, message: undefined }));
                  }
                  return {
                    ...prev,
                    message: event.target.value
                  };
                })
              }
              name="message"
              required
              minLength={10}
              rows={4}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
              className="w-full resize-none border-0 border-b border-cream/35 bg-transparent py-2 text-[0.98rem] text-cream outline-none transition-colors focus:border-cognac"
              placeholder="Napisz kilka zdań o sesji i lokalizacji."
            />
            {fieldErrors.message ? (
              <p id="contact-message-error" className="mt-2 text-[0.8rem] text-cognac">
                {fieldErrors.message}
              </p>
            ) : null}
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 min-w-[180px] rounded-full border border-cognac bg-cognac px-6 text-[0.7rem] uppercase tracking-[0.24em] text-cream transition-colors duration-700 hover:bg-transparent hover:text-cognac disabled:cursor-not-allowed disabled:opacity-65"
          >
            {status === "loading" ? "Wysyłanie..." : "Wyślij"}
          </button>

          {statusMessage ? (
            <p
              className={`text-sm ${
                status === "success"
                  ? "text-cognac"
                  : status === "error"
                    ? "text-[#f6c9b2]"
                    : "text-cream/80"
              }`}
            >
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
