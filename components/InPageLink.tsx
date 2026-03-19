"use client";

import type { MouseEvent, ReactNode } from "react";

type InPageLinkProps = {
  targetId: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  ariaLabel?: string;
};

export function InPageLink({ targetId, className, children, onNavigate, ariaLabel }: InPageLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.();

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });

    if (window.location.hash) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(window.history.state, "", cleanUrl);
    }
  };

  return (
    <a href={`#${targetId}`} aria-label={ariaLabel} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
