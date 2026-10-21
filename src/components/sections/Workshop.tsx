import Image from "next/image";
import { workshop } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";

export function Workshop() {
  return (
    <section id="verkstad" className="relative py-24 sm:py-32">
      <div className="u-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Reveal>
            <div className="u-eyebrow">
              <span className="hairline w-10" />
              <span>{workshop.label}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.2rem)] font-light leading-[1.02] tracking-tight text-ivory">
              {workshop.headingTop}
              <br />
              <span className="italic">{workshop.headingEm}</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ash/80">
              {workshop.body}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <blockquote className="mt-10 border-l border-gold/50 pl-6">
              <p className="font-display text-xl italic text-ivory/90">
                &ldquo;{workshop.quote}&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>
        <Reveal className="relative overflow-hidden rounded-sm">
          <div className="relative h-[560px]">
            <Image
              src="/images/interior/interior-02.jpg"
              alt="Ren och ordnad lyxverkstad"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
