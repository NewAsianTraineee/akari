"use client";

import { useInView } from "@/lib/motion";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "figure";
  variant?: "up" | "mask" | "fade";
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  variant = "up",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  const Tag = as;

  const styles = {
    up: {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 900ms var(--ease-out-expo) ${delay}ms, transform 900ms var(--ease-out-expo) ${delay}ms`,
    },
    fade: {
      opacity: inView ? 1 : 0,
      transition: `opacity 1200ms ease ${delay}ms`,
    },
    mask: {
      clipPath: inView ? "inset(0 0 -12% 0)" : "inset(0 0 100% 0)",
      transform: inView ? "translateY(0)" : "translateY(60%)",
      transition: `clip-path 1100ms var(--ease-out-expo) ${delay}ms, transform 1100ms var(--ease-out-expo) ${delay}ms`,
    },
  }[variant] as CSSProperties;

  return (
    <Tag ref={ref as never} className={className} style={styles}>
      {children}
    </Tag>
  );
}