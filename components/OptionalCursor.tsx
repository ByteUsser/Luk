"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DesktopCursor = dynamic(
  () => import("@/components/Cursor").then((module) => module.Cursor),
  { ssr: false }
);

export function OptionalCursor() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCanHover(window.matchMedia("(hover: hover)").matches);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!canHover) {
    return null;
  }

  return <DesktopCursor />;
}
