import Image from "next/image";
import { process } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/Arrow";
import { Arrow } from "@/components/ui/Arrow";

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="u-container grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal className="relative order-2 overflow-hidden rounded-sm lg:order-1">
          <div className="relative h-[560px]">
            <Image
              src="/images/chef/chef-01.jpg"
              alt="Mekaniker arbetar noggrant i verkstaden"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <div className="u-eyebrow">
              <span className="hairline w-10" />
              <span>{process.label}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.2rem)] font-light leading-[1.02] tracking-tight text-ivory">
              {process.heading}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ash/80">
              {process.body}
            </p>
          </Reveal>

          <ol className="mt-10 border-t border-gold/15">
            {process.steps.map((step, i) => (
              <li key={step.title} className="border-b border-gold/15">
                <Reveal delay={240 + i * 110} className="flex gap-6 py-6">
                  <span className="pt-1 font-display text-sm tracking-[0.2em] text-gold">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-light text-ivory">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ash/75">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={700} className="mt-10">
            <MagneticButton href={process.ctaHref} variant="gold">
              {process.cta}
              <Arrow />
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
