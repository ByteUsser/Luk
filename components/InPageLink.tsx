"use client";

import type { MouseEvent, ReactNode } from "react";
import { scrollToAnchor } from "@/lib/anchor-scroll";

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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const didScroll = scrollToAnchor(targetId, prefersReducedMotion ? "auto" : "smooth", {
      stabilize: true
    });
    if (!didScroll) {
      return;
    }

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
