import { restaurant } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";

export function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    restaurant.mapQuery
  )}&output=embed`;

  return (
    <section id="kontakt" className="relative pb-28">
      <div className="u-container">
        <Reveal>
          <div className="u-eyebrow">
            <span className="hairline w-10" />
            <span>Hitta hit</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,4.8rem)] font-light leading-[1.02] tracking-tight text-ivory">
            Centralt i Stockholm
          </h2>
        </Reveal>
        <Reveal delay={200} className="mt-10 overflow-hidden rounded-sm border border-gold/20">
          <iframe
            title="Karta till Aureum Bilverkstad"
            src={mapSrc}
            width="100%"
            height="520"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full grayscale contrast-125 sm:h-[520px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
