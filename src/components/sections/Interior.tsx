import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Interior() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="u-container">
        <Reveal>
          <div className="u-eyebrow">
            <span className="hairline w-10" />
            <span>Atmosfär</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] font-light leading-[1.02] tracking-tight text-ivory">
            Diskret lyx. Sträng ordning.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="relative overflow-hidden rounded-sm lg:col-span-7">
            <div className="relative h-[520px]">
              <Image
                src="/images/hero/hero-02.jpg"
                alt="Lyxig bil i verkstadsinredning"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="relative overflow-hidden rounded-sm lg:col-span-5">
            <div className="relative h-[520px]">
              <Image
                src="/images/gallery/gallery-02.jpg"
                alt="Detalj i verkstaden"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
