"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const INTERACTIVE_SELECTOR = "a, button, input, label, textarea, select";

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

function getMedia(query: string) {
  return () => window.matchMedia(query)?.matches ?? false;
}

function useMedia(query: string) {
  return useSyncExternalStore(
    subscribeMedia(query),
    getMedia(query),
    () => false,
  );
}

export function Cursor() {
  const finePointer = useMedia("(pointer: fine)");
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("cursor-hidden");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;

    const tick = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);

      const target = e.target instanceof Element ? e.target : null;
      const interactive = target?.closest?.(INTERACTIVE_SELECTOR) ?? null;
      const dataCursor = target?.getAttribute?.("data-cursor");

      ring.classList.toggle(
        "is-hover",
        Boolean(interactive) && dataCursor !== "view",
      );
      ring.classList.toggle("is-view", dataCursor === "view");
      ring.classList.add("is-visible");
    };

    const onLeave = () => ring.classList.remove("is-visible");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-hidden");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[300]">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-label">View</span>
      </div>
    </div>
  );
}