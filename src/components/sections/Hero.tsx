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
          alt="Ōtoro nigiri on dark stone, dramatic light"
          fill
          priority
          sizes="100vw"
          quality={90}
          style={{ objectFit: "cover", animation: "hero-slow-zoom 9s var(--ease-out-expo) forwards" }}
        />
        <div className="absolute inset-0 bg-noir/58" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-transparent to-noir" />
      </div>

      <div className="u-container relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-32">
        <div
          className="flex items-center gap-4"
          style={{ animation: "hero-reveal 1s var(--ease-out-expo) 200ms backwards" }}
        >
          <span className="hairline w-12" />
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-gold">
            {hero.eyebrow}
          </p>
        </div>

        <h1 className="mt-8 font-display text-[clamp(3.4rem,10vw,8.5rem)] font-light leading-[0.95] tracking-tight text-ivory">
          <span
            className="block"
            style={{ animation: "hero-reveal 1.1s var(--ease-out-expo) 380ms backwards" }}
          >
            {hero.headlineA}
          </span>
          <span
            className="block italic"
            style={{ animation: "hero-reveal 1.1s var(--ease-out-expo) 500ms backwards" }}
          >
            {hero.headlineB}
          </span>
        </h1>

        <p
          className="mt-8 max-w-md text-[15px] leading-relaxed text-ivory/75"
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
        <span className="text-[10px] uppercase tracking-[0.4em] text-ivory/50">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/15">
          <span
            className="absolute left-0 top-0 h-1/2 w-px bg-gold"
            style={{ animation: "scroll-line 2.2s var(--ease-out-expo) infinite" }}
          />
        </span>
      </div>
    </section>
  );
}