const steps = [
  {
    title: "Napisz",
    text: "Podaj rodzaj zdjęć, miejsce i przybliżony termin."
  },
  {
    title: "Ustalamy",
    text: "Potwierdzam termin, cenę, zakres i najważniejsze szczegóły."
  },
  {
    title: "Zdjęcia i galeria",
    text: "Prowadzę podczas zdjęć, a po selekcji i obróbce wysyłam gotowe pliki."
  }
] as const;

export function WorkProcess() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="eyebrow text-cognac">Współpraca</p>
            <h2 className="section-title mt-4 max-w-[10ch]">Jak wygląda współpraca</h2>
          </div>

          <ol className="grid gap-3 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="relative overflow-hidden rounded-[1.2rem] border border-ink/12 bg-surface p-5 md:p-6">
                <span className="absolute right-4 top-2 font-display text-[4.5rem] leading-none text-ink/[0.045]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.72rem] uppercase tracking-[0.14em] text-cognac">Krok {index + 1}</p>
                <h3 className="mt-5 max-w-[14ch] font-display text-[1.85rem] leading-[0.98] text-ink">{step.title}</h3>
                <p className="mt-4 max-w-[38ch] text-[0.95rem] leading-relaxed text-ink/74">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
