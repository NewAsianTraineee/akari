"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ArrowProps = {
  className?: string;
};

export function Arrow({ className = "" }: ArrowProps) {
  return (
    <svg
      className={`btn-arrow ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 12h17M14 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "ghost" | "solid";
  className?: string;
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  variant = "ghost",
  className = "",
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * 0.14}px, ${dy * 0.14}px)`;
    };

    const leave = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const cls = `btn btn-${variant} ${className}`;

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <a ref={ref} href={href} className={cls}>
      {children}
    </a>
  );
}