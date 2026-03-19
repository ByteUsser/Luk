"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HashAnchorManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    let frameA = 0;
    let frameB = 0;

    const afterPaint = (callback: () => void) => {
      frameA = window.requestAnimationFrame(() => {
        frameB = window.requestAnimationFrame(callback);
      });
    };

    const rawHash = window.location.hash.slice(1);
    if (!rawHash || rawHash.startsWith(":~:text=")) {
      afterPaint(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });

      return () => {
        window.cancelAnimationFrame(frameA);
        window.cancelAnimationFrame(frameB);
      };
    }

    const targetId = decodeURIComponent(rawHash);
    const target = document.getElementById(targetId);
    if (!target) {
      afterPaint(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });

      return () => {
        window.cancelAnimationFrame(frameA);
        window.cancelAnimationFrame(frameB);
      };
    }

    afterPaint(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        const cleanUrl = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(window.history.state, "", cleanUrl);
    });

    return () => {
      window.cancelAnimationFrame(frameA);
      window.cancelAnimationFrame(frameB);
    };
  }, [pathname]);

  useEffect(() => {
    const handlePageShow = () => {
      const rawHash = window.location.hash.slice(1);
      if (rawHash && !rawHash.startsWith(":~:text=")) {
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return null;
}
