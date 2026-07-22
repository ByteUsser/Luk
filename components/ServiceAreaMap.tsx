"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Bochnia%2C%20Polska&z=10&hl=pl&output=embed";

type ServiceAreaMapProps = {
  className?: string;
};

export function ServiceAreaMap({ className = "" }: ServiceAreaMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`overflow-hidden rounded-[1.35rem] border border-ink/12 bg-surface shadow-[0_22px_56px_rgba(23,17,13,0.16)] ${className}`}>
      <div className="border-b border-ink/10 bg-surface px-4 py-3 text-[0.72rem] uppercase tracking-[0.1em] text-ink/68">
        Bochnia • Kraków • Tarnów
      </div>
      <div className="relative h-[260px] bg-sand md:h-[360px]">
        <div
          className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[linear-gradient(135deg,#efe7da,#faf7f0_55%,#e7ddcd)] transition-opacity duration-500 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          <div className="text-center">
            <span className="mx-auto block h-3 w-3 rounded-full bg-cognac shadow-[0_0_0_10px_rgba(138,98,69,0.12)]" />
            <span className="mt-5 block text-[0.72rem] uppercase tracking-[0.14em] text-ink/65">Mapa Google</span>
          </div>
        </div>
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          title="Mapa obszaru dojazdu Janiczek Foto — baza w Bochni"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          className="block h-full w-full border-0"
        />
      </div>
      <div className="flex items-center justify-center border-t border-ink/10 bg-surface px-4 py-3 sm:justify-end">
        <div className="text-center sm:text-right">
          <a
            href={SITE_CONFIG.googleBusinessProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link inline-flex min-h-11 items-center whitespace-nowrap text-[0.72rem] uppercase tracking-[0.1em] text-ink/76"
          >
            Otwórz wizytówkę w Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
