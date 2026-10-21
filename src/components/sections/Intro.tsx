import { intro } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section id="intro" className="relative py-28 sm:py-36">
      <div className="u-container grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <div className="u-eyebrow">
              <span className="hairline w-10" />
              <span>{intro.label}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.05] tracking-tight text-ivory">
              {intro.headingTop}
              <br />
              <span className="italic">{intro.headingEm}</span>
            </h2>
          </Reveal>
        </div>
        <div className="space-y-6 text-[15px] leading-relaxed text-ash/80">
          {intro.body.map((p, i) => (
            <Reveal key={i} delay={180 + i * 120}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
