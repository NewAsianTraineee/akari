"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { fetchToken, request, type Restaurant } from "@/lib/akari-api";

const field =
  "w-full border-b border-ivory/20 bg-transparent py-3 text-[15px] text-ivory placeholder:text-ivory/35 transition-colors duration-500 focus:border-gold focus:outline-none";

const label =
  "mb-1 block text-[10px] font-medium uppercase tracking-[0.24em] text-ash-dim";

/** The restaurant the landing page books against. */
const AKARI = "akari";

type Outcome =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; id: number | null; restaurant: string; partySize: number; dateTime: string }
  | { kind: "error"; message: string };

export function Reservation() {
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const time = String(data.get("time") ?? "").trim();
    const guests = String(data.get("guests") ?? "2");

    if (!name || !email || !date || !time) {
      setOutcome({ kind: "error", message: "Fill in name, email, date and time." });
      return;
    }

    // The API stores a party size, so the private-dining option is not a
    // booking the resource can hold — it goes to the restaurant directly.
    if (guests === "7+") {
      setOutcome({
        kind: "error",
        message: "Parties of seven or more are private dining — write to us directly instead.",
      });
      return;
    }

    setOutcome({ kind: "sending" });

    // A guest may create bookings, which needs the booking:write scope.
    let token: string;
    try {
      token = (await fetchToken("guest")).accessToken;
    } catch (err) {
      setOutcome({
        kind: "error",
        message:
          "Could not reach the identity provider. " +
          (err instanceof Error ? err.message : "Unknown error"),
      });
      return;
    }

    // Look the restaurant up instead of hardcoding its id, because the demo
    // database is in memory and the id only exists once Akari has been created.
    const listed = await request({ method: "GET", path: "/restaurants", token });

    if (listed.status === 401 || listed.status === 403) {
      setOutcome({
        kind: "error",
        message: "The API refused to list restaurants. Sign in on the admin console and try again.",
      });
      return;
    }

    const restaurants = Array.isArray(listed.body) ? (listed.body as Restaurant[]) : [];
    const akari = restaurants.find((r) => r.name.trim().toLowerCase() === AKARI);

    if (!akari) {
      setOutcome({
        kind: "error",
        message:
          "Akari is not registered in the API yet. Open the admin console, sign in as administrator and create the restaurant — the booking needs it to exist.",
      });
      return;
    }

    // POST /bookings requires the booking:write scope, which the guest has.
    const created = await request({
      method: "POST",
      path: "/bookings",
      token,
      body: {
        restaurantId: akari.id,
        dateTime: `${date}T${time}`,
        partySize: Number(guests),
        guestName: name,
        guestEmail: email,
      },
    });

    if (created.status >= 200 && created.status < 300) {
      const body = created.body as { id?: number } | null;
      setOutcome({
        kind: "ok",
        id: typeof body?.id === "number" ? body.id : null,
        restaurant: akari.name,
        partySize: Number(guests),
        dateTime: `${date}T${time}`,
      });
      return;
    }

    const detail =
      typeof created.body === "object" && created.body !== null
        ? ((created.body as { title?: string; detail?: string }).title ??
          (created.body as { detail?: string }).detail)
        : undefined;

    setOutcome({
      kind: "error",
      message:
        detail ??
        (created.status === 0
          ? "The API did not answer. It may still be waking up on Render."
          : `The API answered ${created.status}.`),
    });
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
              {outcome.kind === "ok" ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-light text-ivory">
                    Your table is booked.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ash-dim">
                    {outcome.restaurant} · {outcome.partySize} guests ·{" "}
                    {outcome.dateTime.replace("T", " ")}
                  </p>
                  {outcome.id !== null && (
                    <p className="mt-4 font-mono text-[11px] text-gold">
                      POST /bookings → 201 · booking #{outcome.id}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setOutcome({ kind: "idle" })}
                    className="btn btn-ghost mt-8 !px-6 !py-2.5 !text-[10px]"
                  >
                    Book another evening
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <p className="text-[10px] uppercase tracking-[0.26em] text-ash-dim">
                    Live booking · POST /bookings
                  </p>

                  {outcome.kind === "error" && (
                    <p className="mt-5 border-l-2 border-red-400/60 pl-4 text-sm leading-relaxed text-red-400">
                      {outcome.message}
                    </p>
                  )}

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
                            {n} guests
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
                      <p className="mt-2 text-[11px] leading-relaxed text-ash-dim">
                        Kept out of the API — the booking resource has no field
                        for it yet.
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={outcome.kind === "sending"}
                    className="btn btn-solid mt-9 w-full disabled:opacity-50"
                  >
                    {outcome.kind === "sending" ? "Booking…" : "Request reservation"}
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
