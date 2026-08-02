"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ContactIcon } from "@/components/ContactIcon";
import { MotionReveal } from "@/components/MotionReveal";
import { getContactPrefill } from "@/lib/contact-prefill";
import { getLeadAttribution } from "@/lib/lead-attribution";
import { trackMarketingEvent } from "@/lib/marketing-analytics";
import { SITE_CONFIG } from "@/lib/site-config";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

type FieldKey = "name" | "email" | "phone" | "message";
type FieldErrors = Partial<Record<FieldKey, string>>;

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
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

function hasValidPhoneNumber(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 9 || (digits.length === 11 && digits.startsWith("48"));
}

const quickTopics = [
  { label: "Portret", icon: "portrait", message: "Interesuje mnie sesja portretowa. Miejsce:  Termin:  " },
  { label: "Para", icon: "couple", message: "Interesuje mnie sesja dla pary. Miejsce:  Termin:  " },
  { label: "Ślub / uroczystość", icon: "celebration", message: "Szukam fotografa na ślub lub uroczystość. Rodzaj wydarzenia:  Miejsce:  Data:  " },
  { label: "Event", icon: "business", message: "Potrzebuję zdjęć z eventu lub dla firmy. Zakres:  Miejsce:  Termin:  " }
] as const;

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

  return decoded
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function validateForm(
  values: Pick<FormState, "name" | "email" | "phone" | "message">
): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name) {
    errors.name = "Wpisz imię.";
  } else if (values.name.length < 2) {
    errors.name = "Imię powinno mieć minimum 2 znaki.";
  }

  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Wpisz poprawny adres email.";
  }

  if (values.phone && !hasValidPhoneNumber(values.phone)) {
    errors.phone = "Wpisz 9 cyfr lub numer z prefiksem +48.";
  }

  if (!values.email && !values.phone) {
    errors.email = "Podaj email lub numer telefonu.";
  }

  if (!values.message) {
    errors.message = "Wpisz wiadomość.";
  } else if (values.message.length < 10) {
    errors.message = "Wiadomość powinna mieć minimum 10 znaków.";
  }

  return errors;
}

function validateField(
  field: FieldKey,
  values: Pick<FormState, "name" | "email" | "phone" | "message">
): string | undefined {
  const value = values[field].trim();

  if (field === "name") {
    if (!value) return "Wpisz imię.";
    if (value.length < 2) return "Imię powinno mieć minimum 2 znaki.";
  }

  if (field === "email" && value && !EMAIL_PATTERN.test(value)) {
    return "Wpisz poprawny adres email.";
  }

  if (field === "phone" && value && !hasValidPhoneNumber(value)) {
    return "Wpisz 9 cyfr lub numer z prefiksem +48.";
  }

  if (field === "message") {
    if (!value) return "Wpisz wiadomość.";
    if (value.length < 10) return "Wiadomość powinna mieć minimum 10 znaków.";
  }

  return undefined;
}

export function Contact({ headingLevel = "h2", allowQueryPrefill = false }: ContactProps) {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [prefillNotice, setPrefillNotice] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const prefillAppliedRef = useRef(false);
  const prefillMessageRef = useRef("");
  const formStartedRef = useRef(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const HeadingTag = headingLevel;

  const validateOnBlur = (field: FieldKey) => {
    const error = validateField(field, formState);
    setFieldErrors((current) => {
      const next = { ...current };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const updateField = (field: FieldKey, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      const next = { ...current };

      if (current[field]) {
        const error = validateField(field, { ...formState, [field]: value });
        if (error) next[field] = error;
        else delete next[field];
      }

      if (
        (field === "email" || field === "phone") &&
        value.trim() &&
        current.email === "Podaj email lub numer telefonu."
      ) {
        delete next.email;
      }

      return next;
    });
  };

  useEffect(() => {
    if (!allowQueryPrefill || prefillAppliedRef.current) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const locationFromQuery = searchParams.get("lokalizacja") ?? searchParams.get("location") ?? "";
    const sourceFromQuery = searchParams.get("source");
    const normalizedLocation = normalizeLocation(locationFromQuery);
    const prefill = getContactPrefill(sourceFromQuery, normalizedLocation);
    if (!prefill) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setPrefillNotice(prefill.notice);
      prefillMessageRef.current = prefill.message.trim();
      setFormState((prev) =>
        prev.message
          ? prev
          : {
              ...prev,
              message: prefill.message
            }
      );
      prefillAppliedRef.current = true;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [allowQueryPrefill]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedValues = {
      ...formState,
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      message: formState.message.trim()
    };

    const errors = validateForm(normalizedValues);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setStatusMessage("Popraw pola oznaczone poniżej.");
      window.requestAnimationFrame(() => {
        const firstInvalidField = errors.name
          ? nameInputRef.current
          : errors.email
            ? emailInputRef.current
            : errors.phone
              ? phoneInputRef.current
              : messageInputRef.current;

        firstInvalidField?.focus();
      });
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
        body: JSON.stringify({
          ...normalizedValues,
          attribution: getLeadAttribution()
        })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as ApiErrorResponse | null;
        throw new Error(payload?.error ?? "Nie udało się wysłać wiadomości.");
      }

      setStatus("success");
      setStatusMessage("Wiadomość dotarła. Odpowiem w ciągu 24 godzin.");
      trackMarketingEvent("form_submit_success", {
        source: getLeadAttribution().source || "brak"
      });
      setFormState(INITIAL_STATE);
      setActiveTopic(null);
      formStartedRef.current = false;
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Błąd formularza.");
    }
  };

  return (
    <section
      id="kontakt"
      className="relative overflow-hidden bg-espresso px-5 py-16 text-cream md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
        <MotionReveal className="max-w-[460px]">
          <span className="eyebrow text-[#b89d7a]">Kontakt</span>
          <HeadingTag className="section-title mt-5 max-w-[13ch] text-cream">
            Sprawdź termin i otrzymaj wycenę
          </HeadingTag>
          <p className="mt-5 max-w-[42ch] text-[0.98rem] leading-relaxed text-cream/78">
            Podaj rodzaj zdjęć, miejsce i termin. Wycena jest bez zobowiązań — odpowiem mailem lub zadzwonię.
          </p>

          <div className="mt-7 max-w-[220px]">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="group flex min-h-14 items-center gap-3 rounded-2xl border border-cream/14 bg-cream/[0.035] px-3.5 text-[0.76rem] uppercase tracking-[0.1em] text-cream/84 transition hover:border-[#c8ad8d]/55 hover:bg-cream/[0.07] hover:text-[#dfccb3]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/18 text-[#c8ad8d] transition group-hover:border-[#c8ad8d]/55">
                <ContactIcon name="phone" className="h-[17px] w-[17px]" />
              </span>
              Zadzwoń
            </a>
          </div>

        </MotionReveal>

        <MotionReveal delay={0.08}>
          <form
            id="formularz-kontaktowy"
            onSubmit={handleSubmit}
            onFocusCapture={() => {
              if (formStartedRef.current) return;
              formStartedRef.current = true;
              trackMarketingEvent("form_start", {
                path: window.location.pathname
              });
            }}
            className="scroll-mt-24 space-y-5 md:scroll-mt-28"
            data-scroll-anchor
            noValidate
          >
          {prefillNotice ? (
            <p className="rounded-2xl border border-cognac/35 bg-cream/10 px-4 py-3 text-[0.9rem] leading-relaxed text-cream/90">
              {prefillNotice} Dopisz szczegóły albo napisz po swojemu.
            </p>
          ) : null}

          <fieldset>
            <legend className="mb-3 text-[0.72rem] uppercase tracking-[0.12em] text-cream/62">
              Wybierz temat
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {quickTopics.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  aria-pressed={activeTopic === topic.label}
                  onClick={() => {
                    setFormState((prev) => {
                      const activeTemplate = quickTopics.find((item) => item.label === activeTopic)?.message.trim();
                      const currentMessage = prev.message.trim();
                      const untouchedPrefill = prefillMessageRef.current;

                      if (
                        !currentMessage ||
                        currentMessage === activeTemplate ||
                        (untouchedPrefill && currentMessage === untouchedPrefill)
                      ) {
                        return { ...prev, message: topic.message };
                      }

                      if (activeTemplate && currentMessage.startsWith(activeTemplate)) {
                        const ownText = currentMessage.slice(activeTemplate.length).trim();
                        return {
                          ...prev,
                          message: ownText ? `${topic.message.trim()}\n\n${ownText}` : topic.message
                        };
                      }

                      return {
                        ...prev,
                        message: `${topic.message.trim()}\n\n${prev.message}`
                      };
                    });
                    setActiveTopic(topic.label);
                    trackMarketingEvent("select_topic", { topic: topic.label });
                    if (fieldErrors.message) {
                      setFieldErrors((current) => ({ ...current, message: undefined }));
                    }
                    if (window.matchMedia("(max-width: 639px)").matches) {
                      window.requestAnimationFrame(() => nameInputRef.current?.focus());
                    }
                  }}
                  className={`group flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-2.5 text-center text-[0.75rem] uppercase leading-tight tracking-[0.06em] transition ${
                    activeTopic === topic.label
                      ? "border-cream/16 bg-cream/[0.08] text-cream shadow-[0_10px_24px_rgba(0,0,0,0.1)]"
                      : "border-transparent bg-transparent text-cream/68 hover:border-cream/10 hover:bg-cream/[0.04] hover:text-[#dfccb3]"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                      activeTopic === topic.label
                        ? "border-[#c8ad8d] bg-[#c8ad8d] text-espresso"
                        : "border-cream/20 text-[#c8ad8d] group-hover:border-[#c8ad8d]/60"
                    }`}
                  >
                    <ContactIcon name={topic.icon} className="h-[20px] w-[20px]" />
                  </span>
                  <span>{topic.label}</span>
                </button>
              ))}
            </div>
          </fieldset>

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

          <p id="contact-method-help" className="text-[0.84rem] leading-relaxed text-cream/74">
            <span className="uppercase tracking-[0.1em] text-cream/85">Dane kontaktowe *</span>
            <span className="mt-1 block text-cream/68">Wpisz imię i podaj email lub telefon — wystarczy jedno.</span>
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[0.82rem] uppercase tracking-[0.12em] text-cream/80">Imię *</span>
              <input
                ref={nameInputRef}
                value={formState.name}
                onChange={(event) => updateField("name", event.target.value)}
                name="name"
                onBlur={() => validateOnBlur("name")}
                required
                minLength={2}
                autoComplete="given-name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                className="h-11 w-full border-0 border-b border-cream/35 bg-transparent text-base text-cream outline-none transition-colors focus:border-cognac"
                placeholder="Np. Ola"
              />
              {fieldErrors.name ? (
                <p id="contact-name-error" className="mt-2 text-[0.8rem] text-[#f6c9b2]">
                  {fieldErrors.name}
                </p>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-[0.82rem] uppercase tracking-[0.12em] text-cream/80">Email</span>
              <input
                ref={emailInputRef}
                value={formState.email}
                onChange={(event) => updateField("email", event.target.value)}
                name="email"
                type="email"
                onBlur={() => validateOnBlur("email")}
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "contact-email-error contact-method-help" : "contact-method-help"}
                className="h-11 w-full border-0 border-b border-cream/35 bg-transparent text-base text-cream outline-none transition-colors focus:border-cognac"
                placeholder="np@email.com"
              />
              {fieldErrors.email ? (
                <p id="contact-email-error" className="mt-2 text-[0.8rem] text-[#f6c9b2]">
                  {fieldErrors.email}
                </p>
              ) : null}
            </label>
          </div>

          <label className="block">
              <span className="mb-2 block text-[0.82rem] uppercase tracking-[0.12em] text-cream/80">
                Telefon
              </span>
              <input
                ref={phoneInputRef}
                value={formState.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                name="phone"
                type="tel"
                onBlur={() => validateOnBlur("phone")}
                inputMode="tel"
                autoComplete="tel"
                maxLength={20}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "contact-phone-error contact-method-help" : "contact-method-help"}
                className="h-11 w-full border-0 border-b border-cream/35 bg-transparent text-base text-cream outline-none transition-colors focus:border-cognac"
                placeholder="Np. 500 000 000"
              />
              {fieldErrors.phone ? (
                <p id="contact-phone-error" className="mt-2 text-[0.8rem] text-[#f6c9b2]">
                  {fieldErrors.phone}
                </p>
              ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-[0.82rem] uppercase tracking-[0.12em] text-cream/80">Wiadomość *</span>
            <textarea
              ref={messageInputRef}
              value={formState.message}
              onChange={(event) => updateField("message", event.target.value)}
              name="message"
              onBlur={() => validateOnBlur("message")}
              required
              minLength={10}
              rows={5}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
              className="min-h-[170px] w-full resize-y border-0 border-b border-cream/35 bg-transparent py-2 text-base text-cream outline-none transition-colors focus:border-cognac"
              placeholder="Napisz, jakich zdjęć potrzebujesz, gdzie i w jakim terminie."
            />
            {fieldErrors.message ? (
              <p id="contact-message-error" className="mt-2 text-[0.8rem] text-[#f6c9b2]">
                {fieldErrors.message}
              </p>
            ) : null}
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "loading"}
              className="button-dark-solid h-12 min-w-[180px] px-6 text-[0.82rem] uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {status === "loading" ? "Wysyłam..." : "Wyślij zapytanie"}
            </button>

            <p className="max-w-[32ch] text-[0.86rem] leading-relaxed text-cream/72 sm:text-right">
              Zwykle odpisuję w ciągu 24 godzin.
            </p>
          </div>

          {statusMessage ? (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                status === "success"
                  ? "border-cognac/40 bg-cognac/10 text-cream"
                  : status === "error"
                    ? "border-[#f6c9b2]/25 bg-[#f6c9b2]/[0.06] text-[#f6c9b2]"
                    : "border-cream/15 text-cream/80"
              }`}
            >
              <p>{statusMessage}</p>
              {status === "success" ? (
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="mt-2 inline-flex min-h-11 items-center gap-2 text-[#dfccb3] underline decoration-[#dfccb3]/35 underline-offset-4 transition hover:text-cream"
                >
                  Jeśli sprawa jest pilna, zadzwoń: {SITE_CONFIG.phoneDisplay}
                </a>
              ) : null}
            </div>
          ) : null}

          <a
            href={SITE_CONFIG.googleBusinessProfile}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-[0.84rem] text-cream/72 underline decoration-cream/25 underline-offset-4 transition hover:text-[#dfccb3]"
          >
            Opinie klientów w Google →
          </a>

          <p className="text-[0.82rem] leading-relaxed text-cream/64">
            Dane wykorzystam wyłącznie, żeby odpowiedzieć na zapytanie — mailem lub telefonicznie.{" "}
            <a href="/polityka-prywatnosci" className="text-link">
              Polityka prywatności
            </a>
            .
          </p>
          </form>
        </MotionReveal>
      </div>
    </section>
  );
}
