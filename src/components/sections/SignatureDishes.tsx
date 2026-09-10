import Image from "next/image";
import { signatureDishes } from "@/data/dishes";
import { formatPrice, formatPriceShort } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

export function SignatureDishes() {
  return (
    <section id="signature" className="py-24 sm:py-32">
      <div className="u-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="u-section-label">Signature</p>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-tight tracking-tight text-ivory">
                A few pieces we
                <em className="italic text-gold-soft"> return to.</em>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="flex flex-nowrap text-[11px] uppercase tracking-[0.24em] text-ash-dim">
              Prices shown from · demo
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {signatureDishes.map((dish, i) => (
            <Reveal key={dish.name} delay={i * 90}>
              <a href="#menu" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-charcoal-2">
                  <Image
                    src={dish.image}
                    alt={dish.alt}
                    width={640}
                    height={800}
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    style={{
                      objectFit: "cover",
                      transform: "scale(1.03)",
                      transition: "transform 1.4s var(--ease-out-expo)",
                    }}
                    className="group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-noir/20 transition-opacity duration-700 group-hover:opacity-0" />
                  <div className="absolute bottom-5 left-5 transition-transform duration-700 group-hover:-translate-y-1">
                    <span className="border-b border-gold/70 pb-1 text-[10px] uppercase tracking-[0.3em] text-ivory">
                      {formatPrice(dish.price)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-light text-ivory transition-colors duration-300 group-hover:text-gold">
                      {dish.name}
                    </h3>
                    {dish.nameJp && (
                      <p className="mt-0.5 font-display text-sm italic text-ash-dim">
                        {dish.nameJp}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-gold">
                    {formatPriceShort(dish.price)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ash/75">
                  {dish.description}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}