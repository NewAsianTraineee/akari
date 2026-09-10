import Image from "next/image";
import { omakase } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow, MagneticButton } from "@/components/ui/Arrow";

export function Omakase() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-y border-gold/10 py-28 sm:py-40"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/restaurant/counter.jpg"
          alt="The omakase counter in the evening"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir via-noir/60 to-noir" />
      </div>

      <div className="u-container relative z-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="u-section-label">{omakase.label}</p>
          </Reveal>
          <Reveal variant="mask" delay={80}>
            <h2 className="mt-7 font-display text-[clamp(2.4rem,6vw,4.8rem)] font-light leading-[1.0] tracking-tight text-ivory">
              {omakase.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ivory/75">
              {omakase.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-gold/10 bg-gold/10 sm:grid-cols-3">
          {omakase.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 100} className="bg-noir">
              <div className="p-8 sm:p-10">
                <span className="font-display text-5xl font-light text-gold/40">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-display text-xl font-light text-ivory">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash/75">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-4">
            <p className="text-[11px] uppercase tracking-[0.26em] text-gold">
              {omakase.price}
            </p>
            <MagneticButton href={omakase.ctaHref} variant="gold">
              {omakase.cta}
              <Arrow />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}