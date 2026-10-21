"use client";

import { restaurant, hoursList } from "@/data/restaurant";
import { useHomeAnchor } from "@/lib/nav";

export function Footer() {
  const year = new Date().getFullYear();
  const anchor = useHomeAnchor();

  return (
    <footer className="border-t border-gold/10 bg-charcoal">
      <div className="u-container grid gap-14 py-20 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-medium tracking-[0.18em] text-ivory">
            {restaurant.name}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-gold">BILVERKSTAD</p>
          <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-ash-dim">
            {restaurant.tagline} i {restaurant.city}. Lyxig, trovärdig och noggrann service för premiumbilar.
          </p>
        </div>

        <div>
          <p className="u-section-label mb-6">Utforska</p>
          <ul className="space-y-3 text-sm">
            {restaurant.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={anchor(item.href)}
                  className="u-anim-line text-ash/75 transition-colors hover:text-ivory"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/admin" className="u-anim-line text-ash/75 transition-colors hover:text-ivory">
                Adminpanel
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="u-section-label mb-6">Öppettider</p>
          <ul className="space-y-2.5 text-sm text-ash/75">
            {hoursList.map((day) => (
              <li key={day.label} className="flex justify-between gap-4">
                <span>{day.label}</span>
                <span className={day.closed ? "text-ash-dim" : "text-ivory/85"}>
                  {day.closed ? "Stängt" : day.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="u-section-label mb-6">Bokning</p>
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
          <a href={anchor("#boka")} className="btn btn-gold mt-7 !px-6 !py-2.5 text-[10px]">
            Boka service
          </a>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="u-container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ash-dim sm:flex-row">
          <p>
            © {year} {restaurant.name} Bilverkstad. Alla rättigheter förbehållna.
          </p>
          <p>Design &amp; utveckling med fokus på lyx &amp; precision.</p>
        </div>
      </div>
    </footer>
  );
}
