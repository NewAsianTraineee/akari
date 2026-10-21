import Image from "next/image";
import { services } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/Arrow";
import { Arrow } from "@/components/ui/Arrow";

const cardImages = [
  "/images/cuts/cuts-01.jpg",
  "/images/interior/interior-01.jpg",
  "/images/gallery/gallery-01.jpg",
];

export function Services() {
  return (
    <section id="tjanster" className="relative py-24 sm:py-32">
      <div className="u-container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="u-eyebrow">
                <span className="hairline w-10" />
                <span>{services.label}</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.6rem)] font-light leading-[1.02] tracking-tight text-ivory">
                {services.heading}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ash/80">
                {services.body}
              </p>
            </Reveal>
          </div>
          <Reveal delay={260}>
            <MagneticButton href={services.ctaHref} variant="gold">
              {services.cta}
              <Arrow />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.points.map((point, i) => (
            <Reveal
              key={point.title}
              delay={200 + i * 120}
              className="group relative overflow-hidden rounded-sm"
            >
              <div className="relative h-[420px]">
                <Image
                  src={cardImages[i]}
                  alt={point.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1600ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-[10px] uppercase tracking-[0.32em] text-gold">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-light text-ivory">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash/80">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <p className="mt-10 text-center text-[11px] uppercase tracking-[0.3em] text-ash-dim">
            {services.price}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
