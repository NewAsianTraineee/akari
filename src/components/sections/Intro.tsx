import { intro } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section id="intro" className="py-28 sm:py-40">
      <div className="u-container">
        <Reveal>
          <p className="u-section-label">{intro.label}</p>
        </Reveal>

        <Reveal variant="mask" delay={80}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.02] tracking-tight text-ivory">
            {intro.headingTop}{" "}
            <em className="italic text-gold-soft">{intro.headingEm}</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={120} className="lg:col-span-5">
            <span className="hairline block" />
            <p className="mt-10 font-display text-xl font-light italic leading-relaxed text-ivory/85">
              Ma — the space between. We guard it carefully.
            </p>
          </Reveal>
          <div className="space-y-7 text-[15px] leading-relaxed text-ash/80 lg:col-span-6 lg:col-start-7">
            {intro.body.map((p, i) => (
              <Reveal key={i} delay={80 + i * 100}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}