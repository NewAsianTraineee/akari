"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-28 sm:py-36">
      <div className="u-container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="u-section-label">Gallery</p>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-tight tracking-tight text-ivory">
                The room, the pieces,
                <em className="italic text-gold-soft"> the quiet.</em>
              </h2>
            </div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-ash-dim">
              Click to view
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid auto-rows-[140px] grid-cols-2 gap-4 sm:auto-rows-[180px] sm:gap-5 lg:grid-cols-4">
          {galleryImages.map((img, i) => {
            const span = img.tall
              ? "row-span-2"
              : img.wide
                ? "col-span-2"
                : "";
            return (
              <Reveal
                key={img.src}
                delay={(i % 4) * 80}
                className={`${span}`}
              >
                <button
                  data-cursor="view"
                  onClick={() => setIndex(i)}
                  className="group relative block h-full w-full overflow-hidden rounded-sm bg-charcoal-2"
                  aria-label={`Open image: ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    style={{
                      objectFit: "cover",
                      transform: "scale(1.03)",
                      transition: "transform 1.4s var(--ease-out-expo)",
                    }}
                    className="group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-noir/15 transition-opacity duration-700 group-hover:opacity-0" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={(i) => setIndex(i)}
      />
    </section>
  );
}