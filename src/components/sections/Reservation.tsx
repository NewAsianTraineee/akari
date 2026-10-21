import { Reveal } from "@/components/ui/Reveal";
import { BookingForm } from "@/components/booking/BookingForm";
import { restaurant } from "@/data/restaurant";

export function Reservation() {
  return (
    <section id="boka" className="relative py-24 sm:py-32">
      <div className="u-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <Reveal>
            <div className="u-eyebrow">
              <span className="hairline w-10" />
              <span>Bokning</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] font-light leading-[1.02] tracking-tight text-ivory">
              Boka din service
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ash/80">
              Välj önskad tjänst, datum och tid. Fyll i bilens uppgifter så kontaktar vi dig för att bekräfta bokningen och ge en tydlig offert vid behov.
            </p>
          </Reveal>
          <Reveal delay={280} className="mt-10 space-y-4 text-sm text-ash/80">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Adress</p>
              <p className="mt-2">{restaurant.address}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Kontakt</p>
              <p className="mt-2">{restaurant.phone}</p>
              <p className="mt-1">{restaurant.email}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Öppettider</p>
              <p className="mt-2">Mån–Fre 07:00 – 17:00</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
