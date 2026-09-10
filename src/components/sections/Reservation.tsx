"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";

const field =
  "w-full border-b border-ivory/20 bg-transparent py-3 text-[15px] text-ivory placeholder:text-ivory/35 transition-colors duration-500 focus:border-gold focus:outline-none";

const label =
  "mb-1 block text-[10px] font-medium uppercase tracking-[0.24em] text-ash-dim";

export function Reservation() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="reserve" className="py-28 sm:py-36">
      <div className="u-container">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="u-section-label">Reservations</p>
            </Reveal>
            <Reveal variant="mask" delay={80}>
              <h2 className="mt-7 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-light leading-[1.0] tracking-tight text-ivory">
                An evening,
                <em className="italic text-gold-soft"> held for you.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ash/80">
                Reservations are seated at the counter from 17:00. Parties of
                two to twelve — for more, or for private dining, write to us
                directly.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 space-y-6 border-l border-gold/40 pl-7 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-ash-dim">
                    Counter seating
                  </p>
                  <p className="mt-1.5 text-ivory/85">17:00 &amp; 19:45 — two sittings</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-ash-dim">
                    Private dining
                  </p>
                  <p className="mt-1.5 text-ivory/85">Six guests, seated at will</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-sm border border-gold/15 bg-charcoal p-8 sm:p-12">
              {sent ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-light text-ivory">
                    Thank you — request received.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ash-dim">
                    This is a demo form. Connect a reservation service to
                    deliver requests to the restaurant.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-ash-dim">
                    Demo — connect a booking service later
                  </p>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={label}>
                        Name
                      </label>
                      <input id="name" name="name" required className={field} placeholder="Your name" autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="email" className={label}>
                        Email
                      </label>
                      <input id="email" name="email" type="email" required className={field} placeholder="you@example.com" autoComplete="email" />
                    </div>
                    <div>
                      <label htmlFor="date" className={label}>
                        Date
                      </label>
                      <input id="date" name="date" type="date" required className={`${field} [color-scheme:dark]`} />
                    </div>
                    <div>
                      <label htmlFor="time" className={label}>
                        Time
                      </label>
                      <select id="time" name="time" required className={`${field} [&>option]:bg-noir`}>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                        <option value="19:45">19:45</option>
                        <option value="20:00">20:00</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="guests" className={label}>
                        Guests
                      </label>
                      <select id="guests" name="guests" required className={`${field} [&>option]:bg-noir`}>
                        {[2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 2 ? "guests" : "guests"}
                          </option>
                        ))}
                        <option value="7+">7+ guests — private dining</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="requests" className={label}>
                        Special requests
                      </label>
                      <textarea
                        id="requests"
                        name="requests"
                        rows={3}
                        className={`${field} resize-none`}
                        placeholder="Allergies, occasions, seating near the chef…"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-solid mt-9 w-full">
                    Request reservation
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}