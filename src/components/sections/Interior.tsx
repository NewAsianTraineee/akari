import Image from "next/image";
import { interiorScenes } from "@/data/gallery";
import { Reveal } from "@/components/ui/Reveal";

export function Interior() {
  return (
    <section className="border-y border-gold/10 bg-charcoal py-28 sm:py-36">
      <div className="u-container">
        <Reveal>
          <div className="max-w-xl">
            <p className="u-section-label">The room</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] tracking-tight text-ivory">
              You don&rsquo;t come for sushi.
              <em className="italic text-gold-soft"> You come for the evening.</em>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {interiorScenes.map((scene, i) => (
            <Reveal key={scene.src} delay={i * 100}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-charcoal-2">
                <Image
                  src={scene.src}
                  alt={scene.alt}
                  fill
                  sizes="(min-width:640px) 33vw, 100vw"
                  style={{
                    objectFit: "cover",
                    transform: "scale(1.04)",
                    transition: "transform 1.6s var(--ease-out-expo)",
                  }}
                  className="group-hover:scale-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.28em] text-ivory/85">
                  0{i + 1} — {scene.alt}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}