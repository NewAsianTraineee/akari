"use client";

import { useState } from "react";
import Image from "next/image";
import { gallery } from "@/data/gallery";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="galleri" className="relative py-24 sm:py-32">
      <div className="u-container">
        <Reveal>
          <div className="u-eyebrow">
            <span className="hairline w-10" />
            <span>Galleri</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] font-light leading-[1.02] tracking-tight text-ivory">
            Omsorg i varje detalj
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((img, i) => (
            <Reveal
              key={img.src}
              delay={160 + i * 70}
              className={`group relative overflow-hidden rounded-sm ${
                img.wide ? "sm:col-span-2 aspect-[8/5]" : "aspect-[4/5]"
              }`}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Visa bild: ${img.alt}`}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover cursor-zoom-in transition-transform duration-[1600ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105"
                  data-cursor="view"
                />
              </button>
            </Reveal>
          ))}
        </div>

        <Lightbox
          images={gallery}
          index={index}
          onClose={() => setIndex(null)}
          onNavigate={setIndex}
        />
      </div>
    </section>
  );
}
