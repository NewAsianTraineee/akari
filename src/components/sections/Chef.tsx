import Image from "next/image";
import { chef } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";

export function Chef() {
  return (
    <section id="atelier" className="py-28 sm:py-40">
      <div className="u-container grid gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-charcoal-2">
            <Image
              src="/images/chef/chef.jpg"
              alt="Hands at the counter, evening service"
              width={900}
              height={1200}
              sizes="(min-width:1024px) 40vw, 100vw"
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="u-section-label">{chef.label}</p>
          </Reveal>
          <Reveal variant="mask" delay={80}>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] tracking-tight text-ivory">
              {chef.headingTop}{" "}
              <em className="italic text-gold-soft">{chef.headingEm}</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 text-[15px] leading-relaxed text-ash/80">
              {chef.body}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <blockquote className="mt-12 border-l border-gold/60 pl-7">
              <p className="font-display text-xl font-light italic leading-relaxed text-ivory">
                &ldquo;{chef.quote}&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}