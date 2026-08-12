"use client";

import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Bochnia%2C%20Polska&z=10&hl=pl&output=embed";

type ServiceAreaMapProps = {
  className?: string;
};

export function ServiceAreaMap({ className = "" }: ServiceAreaMapProps) {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const desktopViewport = window.matchMedia("(min-width: 768px)");

    const syncMapWithViewport = () => {
      setIsInteractive(desktopViewport.matches);
      setIsLoaded(false);
    };

    syncMapWithViewport();
    desktopViewport.addEventListener("change", syncMapWithViewport);
    return () => desktopViewport.removeEventListener("change", syncMapWithViewport);
  }, []);

  return (
    <div className={`overflow-hidden rounded-[1.35rem] border border-ink/12 bg-surface shadow-[0_22px_56px_rgba(23,17,13,0.16)] ${className}`}>
      <div className="type-meta border-b border-ink/10 bg-surface px-4 py-3 text-ink/72">
        Obszar działania · baza w Bochni
      </div>
      <div className="relative h-[260px] bg-sand md:h-[360px]">
        {isInteractive ? (
          <>
            <div
              className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[linear-gradient(135deg,#efe7da,#faf7f0_55%,#e7ddcd)] transition-opacity duration-500 ${
                isLoaded ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden="true"
            >
              <div className="text-center">
                <span className="mx-auto block h-3 w-3 rounded-full bg-cognac shadow-[0_0_0_10px_rgba(138,98,69,0.12)]" />
                <span className="type-meta mt-5 block text-ink/68">Wczytuję mapę</span>
              </div>
            </div>
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              title="Mapa obszaru działania Janiczek Foto — baza w Bochni"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setIsLoaded(true)}
              className="block h-full w-full border-0"
            />
            <button
              type="button"
              onClick={() => {
                setIsInteractive(false);
                setIsLoaded(false);
              }}
              className="button-secondary absolute right-3 top-3 z-20 min-h-11 px-4 md:hidden"
            >
              Wyłącz mapę
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_48%,#faf7f0_0,#efe7da_46%,#e6dac8_100%)] px-6 text-center">
            <div className="pointer-events-none absolute h-48 w-48 rounded-full border border-cognac/14" aria-hidden="true" />
            <div className="pointer-events-none absolute h-32 w-32 rounded-full border border-cognac/20" aria-hidden="true" />
            <span className="relative h-3 w-3 rounded-full bg-cognac shadow-[0_0_0_10px_rgba(138,98,69,0.14)]" aria-hidden="true" />
            <p className="type-card relative mt-5">Bochnia i okolice</p>
            <p id="map-activation-help" className="type-body relative mt-2 max-w-[31ch] text-ink/72">
              Włącz mapę przyciskiem, aby przypadkowy gest nie zatrzymywał przewijania strony.
            </p>
            <button
              type="button"
              aria-describedby="map-activation-help"
              onClick={() => setIsInteractive(true)}
              className="button-primary relative mt-4 min-h-12 px-5"
            >
              Włącz interaktywną mapę
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center border-t border-ink/10 bg-surface px-4 py-3 sm:justify-end">
        <div className="text-center sm:text-right">
          <a
            href={SITE_CONFIG.googleBusinessProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="type-action text-link inline-flex min-h-11 items-center whitespace-nowrap text-ink/76"
          >
            Otwórz obszar w Mapach Google
          </a>
        </div>
      </div>
    </div>
  );
}
