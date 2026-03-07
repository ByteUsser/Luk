import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-5 pb-7 pt-8 md:px-10 md:pb-8 md:pt-10">
      <div className="mx-auto max-w-[1400px] border-t border-ink/15 pt-5 md:pt-6">
        <div className="flex items-center justify-between gap-5">
          <p className="text-[0.76rem] uppercase tracking-[0.22em] sm:text-[0.82rem]">
            {SITE_CONFIG.owner}
          </p>

          <div className="flex items-center gap-4">
            <Link
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-ink/85 transition-colors duration-700 hover:text-cognac"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
              </svg>
            </Link>
            <p className="text-[0.74rem] uppercase tracking-[0.2em] text-ink/70 sm:text-[0.8rem]">
              {SITE_CONFIG.city} • {year}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
