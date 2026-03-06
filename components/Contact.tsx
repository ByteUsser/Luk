"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

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

export function Contact() {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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
        throw new Error("Nie udało się wysłać wiadomości.");
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
    <section id="kontakt" className="relative overflow-hidden bg-espresso px-5 py-20 text-cream md:px-10 md:py-28">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cognac/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-cognac/10 blur-3xl" />
      <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow text-cognac">Kontakt</span>
          <h2 className="section-title mt-5 max-w-[12ch] text-cream">
            Zróbmy coś <span className="italic">pięknego</span> razem
          </h2>

          <a
            href="mailto:janiczek.office@gmail.com"
            className="mt-8 inline-flex min-h-[44px] max-w-full items-center rounded-full border border-cream/45 bg-cream/10 px-4 text-[0.78rem] tracking-[0.03em] text-cream transition-colors duration-700 hover:border-cognac hover:text-cognac sm:px-5 sm:text-[0.82rem]"
          >
            janiczek.office@gmail.com
          </a>

          <div className="mt-8 flex flex-wrap gap-3 text-[0.66rem] uppercase tracking-[0.16em] text-cream/90 sm:text-[0.68rem] sm:tracking-[0.2em]">
            <a
              href="https://www.instagram.com/janiczekfoto/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full border border-cream/35 bg-cream/10 px-4 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61586472251565"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full border border-cream/35 bg-cream/10 px-4 transition-colors duration-700 hover:border-cognac hover:text-cognac"
            >
              Facebook
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-7"
          noValidate
        >
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
            Wysyłając formularz akceptujesz{" "}
            <a href="/polityka-prywatnosci" className="text-link">
              politykę prywatności
            </a>
            .
          </p>
        </motion.form>
      </div>
    </section>
  );
}
