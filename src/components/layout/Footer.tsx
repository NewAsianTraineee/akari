import { restaurant, hoursList } from "@/data/restaurant";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/10 bg-charcoal">
      <div className="u-container grid gap-14 py-20 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-medium tracking-[0.16em] text-ivory">
            {restaurant.name}
          </p>
          <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-ash-dim">
            {restaurant.tagline}. An intimate counter in {restaurant.city} —
            an evening shaped by the season.
          </p>
        </div>

        <div>
          <p className="u-section-label mb-6">Explore</p>
          <ul className="space-y-3 text-sm">
            {restaurant.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="u-anim-line text-ash/75 transition-colors hover:text-ivory"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="u-section-label mb-6">Hours</p>
          <ul className="space-y-2.5 text-sm text-ash/75">
            {hoursList.map((day) => (
              <li key={day.label} className="flex justify-between gap-4">
                <span>{day.label}</span>
                <span className={day.closed ? "text-ash-dim" : "text-ivory/85"}>
                  {day.closed ? "Closed" : day.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="u-section-label mb-6">Reservations</p>
          <p className="text-sm leading-relaxed text-ash/75">
            {restaurant.address}
            <br />
            {restaurant.phone}
            <br />
            <a
              href={`mailto:${restaurant.email}`}
              className="u-anim-line text-ivory/85 transition-colors hover:text-gold"
            >
              {restaurant.email}
            </a>
          </p>
          <a href="#reserve" className="btn btn-gold mt-7 !px-6 !py-2.5 text-[11px]">
            Reserve a table
          </a>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="u-container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ash-dim sm:flex-row">
          <p>
            © {year} {restaurant.name}. All rights reserved.
          </p>
          <p>
            Demo site — contact &amp; opening details are placeholders.
          </p>
        </div>
      </div>
    </footer>
  );
}