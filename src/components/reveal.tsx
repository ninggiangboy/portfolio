"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  y = 18,
  as = "div",
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
