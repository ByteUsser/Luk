import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const quickLinks = [
    { href: "/galeria-zdjec", label: "Galeria" },
    { href: "/fotograf", label: "Lokalizacje" },
    { href: "/cennik", label: "Cennik" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/polityka-prywatnosci", label: "Prywatność" }
  ] as const;

  return (
    <footer className="px-5 pb-7 pt-8 md:px-10 md:pb-8 md:pt-10">
      <div className="mx-auto max-w-[1400px] border-t border-ink/15 pt-5 md:pt-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Link href="/" aria-label={SITE_CONFIG.name} className="inline-flex items-center">
            <Image
              src="/logo-black.svg"
              alt={SITE_CONFIG.name}
              width={2200}
              height={650}
              sizes="180px"
              className="h-auto w-[150px] sm:w-[180px]"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="button-icon h-11 w-11"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
              </svg>
            </Link>
            <Link
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="button-icon h-11 w-11"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                <path
                  d="M14.4 8.3h2V5.1h-2.3c-2.8 0-4.5 1.8-4.5 4.5v2.1H7.4v3.1h2.2v4.9h3.2v-4.9h2.6l.4-3.1h-3V10c0-1 .5-1.7 1.6-1.7Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>

        <nav className="mt-6 flex flex-wrap gap-3 text-[0.72rem] uppercase tracking-[0.14em] text-ink/70">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="button-outline h-11 px-4 leading-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-4 flex flex-col gap-1 text-[0.68rem] uppercase tracking-[0.16em] text-ink/60 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:text-[0.72rem]">
          <p>{SITE_CONFIG.city}</p>
          <p>
            © {year} {SITE_CONFIG.name}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
