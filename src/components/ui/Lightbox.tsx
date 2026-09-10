"use client";

import { useCallback, useEffect } from "react";
import type { GalleryImage } from "@/data/gallery";

type LightboxProps = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
};

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (index === null) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" && index < images.length - 1)
        onNavigate(index + 1);
      if (e.key === "ArrowLeft" && index > 0) onNavigate(index - 1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, close, onNavigate]);

  if (index === null) return null;

  const image = images[index];

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-noir/92 p-4 backdrop-blur-sm sm:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={close}
    >
      <button
        onClick={close}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-300 hover:border-gold hover:text-gold"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>

      {index > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index - 1);
          }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold sm:flex"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {index < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index + 1);
          }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold sm:flex"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full flex-col items-center gap-4"
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="eager"
          className="max-h-[78vh] max-w-full rounded-sm object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
          style={{ animation: "fade-up 600ms var(--ease-out-expo)" }}
        />
        <figcaption className="text-center text-[11px] uppercase tracking-[0.24em] text-ash-dim">
          {image.alt} — <span className="text-gold">{index + 1} / {images.length}</span>
        </figcaption>
      </figure>
    </div>
  );
}