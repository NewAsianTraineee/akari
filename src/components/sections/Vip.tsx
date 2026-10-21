import Image from "next/image";
import { vip } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/Arrow";
import { Arrow } from "@/components/ui/Arrow";

export function Vip() {
  return (
    <section id="vip" className="relative py-24 sm:py-32">
      <div className="u-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Reveal>
            <div className="u-eyebrow">
              <span className="hairline w-10" />
              <span>{vip.label}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] font-light leading-[1.02] tracking-tight text-ivory">
              {vip.heading}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ash/80">
              {vip.body}
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            {vip.points.map((p) => (
              <span
                key={p}
                className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.26em] text-gold"
              >
                {p}
              </span>
            ))}
          </Reveal>
          <Reveal delay={320} className="mt-10">
            <MagneticButton href={vip.ctaHref} variant="gold" external>
              {vip.cta}
              <Arrow />
            </MagneticButton>
          </Reveal>
        </div>
        <Reveal className="relative overflow-hidden rounded-sm">
          <div className="relative h-[520px]">
            <Image
              src="/images/gallery/gallery-03.jpg"
              alt="Exklusiv verkstadsdel för premiumbilar"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
