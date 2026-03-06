"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const target = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) {
      return;
    }

    setEnabled(true);

    let raf = 0;

    const handleMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      dotX.set(event.clientX - 4);
      dotY.set(event.clientY - 4);

      const interactive = (event.target as HTMLElement | null)?.closest(
        "a,button,[data-cursor='hover']"
      );
      setHovering(Boolean(interactive));
    };

    const loop = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.125;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.125;
      ringX.set(ringPos.current.x - 18);
      ringY.set(ringPos.current.y - 18);
      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMove);
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.cancelAnimationFrame(raf);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-50 mix-blend-multiply">
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: hovering ? 1.7 : 1,
          backgroundColor: hovering ? "#8B7355" : "#2A2420"
        }}
        transition={{ duration: 0.2, ease }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.2 : 1,
          borderColor: hovering ? "rgba(139,115,85,0.8)" : "rgba(42,36,32,0.55)"
        }}
        transition={{ duration: 0.3, ease }}
      />
    </div>
  );
}
