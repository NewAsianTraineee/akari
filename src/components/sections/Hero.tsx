import Image from "next/image";
import { hero } from "@/data/restaurant";
import { MagneticButton } from "@/components/ui/Arrow";
import { Arrow } from "@/components/ui/Arrow";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.jpg"
          alt="Lyxig sportbil i elegant verkstadsmiljö"
          fill
          priority
          sizes="100vw"
          quality={90}
          style={{ objectFit: "cover", animation: "hero-slow-zoom 10s var(--ease-out-expo) forwards" }}
        />
        <div className="absolute inset-0 bg-noir/62" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/78 via-noir/40 to-noir" />
      </div>

      <div className="u-container relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-32">
        <div
          className="flex items-center gap-4"
          style={{ animation: "hero-reveal 1s var(--ease-out-expo) 200ms backwards" }}
        >
          <span className="hairline w-12" />
          <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-gold">
            {hero.eyebrow}
          </p>
        </div>

        <h1 className="mt-8 font-display text-[clamp(3.2rem,10vw,8.8rem)] font-light leading-[0.93] tracking-tight text-ivory">
          <span
            className="block"
            style={{ animation: "hero-reveal 1.1s var(--ease-out-expo) 380ms backwards" }}
          >
            {hero.headlineA}
          </span>
          <span
            className="block"
            style={{ animation: "hero-reveal 1.1s var(--ease-out-expo) 500ms backwards" }}
          >
            {hero.headlineB}
          </span>
        </h1>

        <p
          className="mt-8 max-w-lg text-[15px] leading-relaxed text-ivory/78"
          style={{ animation: "hero-reveal 1.1s var(--ease-out-expo) 700ms backwards" }}
        >
          {hero.sub}
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-4"
          style={{ animation: "hero-reveal 1.1s var(--ease-out-expo) 850ms backwards" }}
        >
          <MagneticButton href={hero.ctaPrimaryHref} variant="gold">
            {hero.ctaPrimary}
            <Arrow />
          </MagneticButton>
          <MagneticButton href={hero.ctaSecondaryHref} variant="ghost">
            {hero.ctaSecondary}
          </MagneticButton>
        </div>
      </div>

      <div
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        style={{ animation: "hero-reveal 1.2s var(--ease-out-expo) 1200ms backwards" }}
      >
        <span className="text-[9px] uppercase tracking-[0.44em] text-ivory/45">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/12">
          <span
            className="absolute left-0 top-0 h-1/2 w-px bg-gold"
            style={{ animation: "scroll-line 2.2s var(--ease-out-expo) infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
