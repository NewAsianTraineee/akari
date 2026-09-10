import { restaurant, hoursList } from "@/data/restaurant";
import { Reveal } from "@/components/ui/Reveal";

export function Location() {
  return (
    <section
      id="contact"
      className="border-t border-gold/10 bg-charcoal py-28 sm:py-36"
    >
      <div className="u-container grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="u-section-label">Visit</p>
          </Reveal>
          <Reveal variant="mask" delay={80}>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] tracking-tight text-ivory">
              Find the
              <em className="italic text-gold-soft"> counter.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-10 space-y-8 text-[15px]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-ash-dim">
                  Address
                </p>
                <p className="mt-2 leading-relaxed text-ivory/90">
                  {restaurant.address}
                  <br />
                  {restaurant.city}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-ash-dim">
                  Reservations
                </p>
                <p className="mt-2 text-ivory/90">
                  <a
                    href={`mailto:${restaurant.email}`}
                    className="u-anim-line transition-colors hover:text-gold"
                  >
                    {restaurant.email}
                  </a>
                  <br />
                  {restaurant.phone}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          <Reveal delay={140}>
            <div className="h-full rounded-sm border border-gold/15 p-8">
              <p className="u-section-label mb-8">Opening hours</p>
              <ul className="space-y-3.5 text-sm text-ash/80">
                {hoursList.map((day) => (
                  <li key={day.label} className="flex justify-between gap-4">
                    <span>{day.label}</span>
                    <span className={day.closed ? "text-ash-dim" : "text-ivory/90"}>
                      {day.closed ? "Closed" : day.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-sm border border-gold/15 bg-charcoal-2">
              <div className="absolute inset-0 opacity-[0.35]">
                <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
                  <g fill="none" stroke="#c2a369" strokeWidth="0.6">
                    {Array.from({ length: 14 }).map((_, y) => (
                      <line key={`a${y}`} x1="0" y1={y * 30} x2="400" y2={y * 30} />
                    ))}
                    {Array.from({ length: 14 }).map((_, x) => (
                      <line key={`b${x}`} x1={x * 30} y1="0" x2={x * 30} y2="400" />
                    ))}
                    {Array.from({ length: 9 }).map((_, d) => (
                      <circle key={`c${d}`} cx={40 + d * 40} cy={60 + ((d * 37) % 260)} r={d * 3.5} />
                    ))}
                  </g>
                </svg>
              </div>
              <div className="relative p-8">
                <p className="text-[10px] uppercase tracking-[0.26em] text-ash-dim">
                  Map placeholder
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">
                  Connect a map embed here when the address is confirmed.
                </p>
              </div>
              <p className="relative m-8 mt-0 border-t border-gold/20 pt-4 text-[10px] uppercase tracking-[0.24em] text-gold">
                Akari · {restaurant.city}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}