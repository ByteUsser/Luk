type ContactIconName =
  | "phone"
  | "mail"
  | "form"
  | "instagram"
  | "facebook"
  | "google"
  | "portrait"
  | "couple"
  | "celebration"
  | "business";

type ContactIconProps = {
  name: ContactIconName;
  className?: string;
};

export function ContactIcon({ name, className = "h-5 w-5" }: ContactIconProps) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false
  };

  if (name === "phone") {
    return (
      <svg {...commonProps}>
        <path d="M7.1 3.75 9.3 8.2 7.75 9.75a14.7 14.7 0 0 0 6.5 6.5l1.55-1.55 4.45 2.2-.7 3.05a2 2 0 0 1-1.95 1.55C9.25 21.5 2.5 14.75 2.5 6.4A2 2 0 0 1 4.05 4.45l3.05-.7Z" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...commonProps}>
        <rect x="2.75" y="5" width="18.5" height="14" rx="2.4" />
        <path d="m4.5 7 7.5 5.75L19.5 7" />
      </svg>
    );
  }

  if (name === "form") {
    return (
      <svg {...commonProps}>
        <path d="M5 3.75h10.5A2.5 2.5 0 0 1 18 6.25V9" />
        <path d="M5 3.75A2.25 2.25 0 0 0 2.75 6v12A2.25 2.25 0 0 0 5 20.25h6.5" />
        <path d="M7 8h6M7 12h4" />
        <path d="m14 18.75.5-2.75 4.9-4.9a1.35 1.35 0 0 1 1.9 1.9l-4.9 4.9-2.4.85Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <path d="M17.65 6.35h.01" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg {...commonProps}>
        <path d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.8-.1-1.6-.15-2.4-.15-2.4 0-4.05 1.45-4.05 4.15v2.3H8.25V13h2.7v8" />
      </svg>
    );
  }

  if (name === "google") {
    return (
      <svg {...commonProps}>
        <path d="M20 12.2c0-.7-.06-1.25-.18-1.8H12v3.2h4.58a4.1 4.1 0 0 1-1.7 2.65" />
        <path d="M12 20a8 8 0 1 1 5.45-13.85l-2.25 2.2A4.75 4.75 0 1 0 16.58 13.6" />
      </svg>
    );
  }

  if (name === "portrait") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.5 20c.55-4 2.8-6.2 6.5-6.2s5.95 2.2 6.5 6.2" />
      </svg>
    );
  }

  if (name === "couple") {
    return (
      <svg {...commonProps}>
        <circle cx="8.25" cy="8.6" r="2.7" />
        <circle cx="15.75" cy="8.6" r="2.7" />
        <path d="M3.25 19.5c.35-3.5 2.05-5.45 5-5.45 1.7 0 2.95.65 3.75 1.8.8-1.15 2.05-1.8 3.75-1.8 2.95 0 4.65 1.95 5 5.45" />
      </svg>
    );
  }

  if (name === "celebration") {
    return (
      <svg {...commonProps}>
        <path d="m7.25 13.25-3.5 7 7-3.5" />
        <path d="m7.1 13.4 3.5 3.5" />
        <path d="M14.5 4.25v3M19.75 8.75l-2.6 1.5M9.25 6.75l1.5 2.6M18.5 3.5l-2.1 2.1" />
        <path d="M14 13.25c1.25-2.15 2.8-2.65 5.25-2.25-1.15 2.2-2.8 2.85-5.25 2.25Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <rect x="3" y="7" width="18" height="12.5" rx="2.2" />
      <path d="M8.5 7V5.75A1.75 1.75 0 0 1 10.25 4h3.5a1.75 1.75 0 0 1 1.75 1.75V7M3 11.5c2.4 1.2 5.4 1.8 9 1.8s6.6-.6 9-1.8M12 12v2.5" />
    </svg>
  );
}
