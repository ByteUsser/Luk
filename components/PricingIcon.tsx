export type PricingIconName =
  | "portrait"
  | "couple"
  | "sacrament"
  | "wedding"
  | "event"
  | "document"
  | "print";

type PricingIconProps = {
  name: PricingIconName;
  className?: string;
};

export function PricingIcon({ name, className = "h-5 w-5" }: PricingIconProps) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.45,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false
  };

  if (name === "portrait") {
    return (
      <svg {...commonProps}>
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="2.6" />
        <circle cx="12" cy="9" r="2.6" />
        <path d="M7.1 17.25c.55-2.8 2.2-4.3 4.9-4.3s4.35 1.5 4.9 4.3" />
      </svg>
    );
  }

  if (name === "couple") {
    return (
      <svg {...commonProps}>
        <circle cx="8.2" cy="8.2" r="2.55" />
        <circle cx="15.8" cy="8.2" r="2.55" />
        <path d="M3.5 19.2c.4-3.45 1.95-5.25 4.7-5.25 1.65 0 2.9.65 3.8 1.85.9-1.2 2.15-1.85 3.8-1.85 2.75 0 4.3 1.8 4.7 5.25" />
      </svg>
    );
  }

  if (name === "sacrament") {
    return (
      <svg {...commonProps}>
        <path d="M8.2 20.25h7.6M9.4 17.8h5.2M10 17.8V9.7h4v8.1" />
        <path d="M12 3.25c1.4 1.45 2.1 2.65 2.1 3.65A2.1 2.1 0 0 1 12 9a2.1 2.1 0 0 1-2.1-2.1c0-1 .7-2.2 2.1-3.65Z" />
        <path d="M17.5 4.25v5M15 6.75h5" />
      </svg>
    );
  }

  if (name === "wedding") {
    return (
      <svg {...commonProps}>
        <circle cx="9" cy="14" r="5" />
        <circle cx="15" cy="14" r="5" />
        <path d="m12 3.2 2.3 2.5L12 8.2 9.7 5.7 12 3.2Z" />
        <path d="M12 8.2V9" />
      </svg>
    );
  }

  if (name === "event") {
    return (
      <svg {...commonProps}>
        <path d="M12 3.25v3.2M4.4 6.4l2.3 2.25M19.6 6.4l-2.3 2.25M3.25 13h3.2M20.75 13h-3.2" />
        <path d="m12 9.1 1.15 2.65 2.85.25-2.15 1.9.65 2.8-2.5-1.45-2.5 1.45.65-2.8L8 12l2.85-.25L12 9.1Z" />
        <path d="M7.25 18.1 5.5 20.25M16.75 18.1l1.75 2.15" />
      </svg>
    );
  }

  if (name === "print") {
    return (
      <svg {...commonProps}>
        <path d="M7 8V3.75h10V8" />
        <rect x="3.25" y="8" width="17.5" height="9" rx="2.3" />
        <path d="M7 14h10v6.25H7z" />
        <path d="M17.2 11.25h.05" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2.4" />
      <circle cx="8" cy="10.2" r="2.15" />
      <path d="M4.75 16c.35-2.2 1.45-3.35 3.25-3.35s2.9 1.15 3.25 3.35M13.5 9h4.75M13.5 12h4.75M13.5 15h3.25" />
    </svg>
  );
}
