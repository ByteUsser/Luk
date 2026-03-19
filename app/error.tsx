"use client";

import { useEffect } from "react";
import { SITE_CONFIG } from "@/lib/site-config";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App runtime error:", error);
  }, [error]);

  return (
    <main className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[760px] space-y-6">
        <p className="eyebrow text-cognac">Błąd aplikacji</p>
        <h1 className="section-title">
          Coś poszło <span className="italic">nie tak</span>
        </h1>
        <p className="max-w-[52ch] text-[1rem] leading-relaxed text-ink/80">
          Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub skontaktuj się
          przez email: {SITE_CONFIG.email}.
        </p>
        <button
          type="button"
          onClick={reset}
          className="button-secondary px-5 text-[0.72rem] uppercase tracking-[0.2em]"
        >
          Spróbuj ponownie
        </button>
      </div>
    </main>
  );
}
