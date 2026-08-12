"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { buildContactHref } from "@/lib/contact-prefill";
import { FEATURED_SERVICE_AREA_LOCATIONS, SERVICE_AREA_LOCATIONS } from "@/lib/service-area-locations";

const MAX_RESULTS = 8;

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function locationHref(name: string) {
  return buildContactHref("lokalizacje", name);
}

export function LocationSearch() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query);

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return FEATURED_SERVICE_AREA_LOCATIONS.slice(0, MAX_RESULTS);
    }

    return SERVICE_AREA_LOCATIONS.filter((location) => {
      const values = [location.name, location.region, ...(location.aliases ?? [])];
      return values.some((value) => normalize(value).includes(normalizedQuery));
    }).slice(0, MAX_RESULTS);
  }, [normalizedQuery]);

  const trimmedQuery = query.trim();
  const hasResults = results.length > 0;

  return (
    <section className="rounded-[1.5rem] border border-ink/12 bg-surface p-5 md:p-7">
      <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
        <div>
          <p className="eyebrow text-cognac">Wyszukiwarka</p>
          <h2 className="mt-4 font-display text-[2.35rem] leading-none md:text-[3rem]">
            Sprawdź miejscowość
          </h2>
          <p className="mt-4 max-w-[58ch] text-[0.98rem] leading-relaxed text-ink/78">
            Wpisz miejscowość z okolic Bochni. Dalszy dojazd też jest możliwy — potwierdzę go
            przed rezerwacją.
          </p>
        </div>

        <label className="block">
          <span className="mb-2 block text-[0.78rem] uppercase tracking-[0.14em] text-ink/65">
            Miejscowość
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-14 w-full rounded-full border border-ink/16 bg-cream px-5 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink/42 focus:border-cognac"
            placeholder="Np. Bochnia, Kraków, Tarnów..."
            type="search"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {FEATURED_SERVICE_AREA_LOCATIONS.slice(0, 6).map((location) => (
          <button
            key={location.name}
            type="button"
            onClick={() => setQuery(location.name)}
            className="rounded-full border border-ink/12 bg-cream px-3 py-2 text-[0.76rem] uppercase tracking-[0.11em] text-ink/72 transition-colors hover:border-cognac hover:text-ink"
          >
            {location.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {results.map((location) => (
          <article key={location.name} className="rounded-2xl border border-ink/12 bg-cream/70 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-[1.65rem] leading-none">{location.name}</h3>
                <p className="mt-1 text-[0.78rem] uppercase tracking-[0.12em] text-ink/65">
                  {location.region}
                </p>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ink/78">{location.note}</p>
              </div>
              <Link
                href={locationHref(location.name)}
                className="button-secondary shrink-0 px-4 text-[0.76rem] uppercase tracking-[0.12em]"
              >
                Zapytaj
              </Link>
            </div>
          </article>
        ))}

        {!hasResults ? (
          <article className="rounded-2xl border border-cognac/25 bg-cream p-4 md:col-span-2">
            <h3 className="font-display text-[1.65rem] leading-none">Nie widzę tej miejscowości na liście</h3>
            <p className="mt-3 max-w-[70ch] text-[0.95rem] leading-relaxed text-ink/78">
              To nie znaczy, że odpada. Napisz nazwę miejscowości, termin i temat zdjęć, a ja sprawdzę
              dojazd i dam Ci konkretną odpowiedź.
            </p>
            <Link
              href={locationHref(trimmedQuery || "inna miejscowość")}
              className="button-primary mt-4 px-5 text-[0.8rem] uppercase tracking-[0.12em]"
            >
              Zapytaj o dojazd
            </Link>
          </article>
        ) : null}
      </div>
    </section>
  );
}
