import { privateDining } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow, MagneticButton } from "@/components/ui/Arrow";

export function PrivateDining() {
  return (
    <section
      id="private"
      className="relative overflow-hidden border-y border-gold/10 py-28 sm:py-36"
    >
      <div className="u-container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="u-section-label">{privateDining.label}</p>
          </Reveal>
          <Reveal variant="mask" delay={80}>
            <h2 className="mt-7 font-display text-[clamp(2.4rem,6vw,4.8rem)] font-light leading-[1.0] tracking-tight text-ivory">
              {privateDining.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ash/80">
              {privateDining.body}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <MagneticButton
              href={privateDining.ctaHref}
              variant="gold"
              external
            >
              {privateDining.cta}
              <Arrow />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="flex items-center lg:col-span-4 lg:col-start-9">
          <Reveal delay={180}>
            <ul className="w-full space-y-5 border border-gold/15 p-8">
              {privateDining.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-4 text-sm text-ivory/80"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}