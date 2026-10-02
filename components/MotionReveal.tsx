"use client";

import type { ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function MotionReveal({
  children,
  className
}: MotionRevealProps) {
  return <div className={className}>{children}</div>;
}
