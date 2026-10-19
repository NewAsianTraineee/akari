"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  API_BASE,
  CLIENT_ID,
  DEMO_USERS,
  KEYCLOAK_BASE,
  REALM,
  bookingBody,
  fetchToken,
  request,
  type ApiCall,
  type Booking,
  type DemoRole,
  type Restaurant,
  type TokenSession,
} from "@/lib/akari-api";

type LogEntry = {
  id: number;
  label: string;
  rule: string;
  expected: string;
  call: ApiCall | null;
  pending: boolean;
};

const ROLE_ORDER: DemoRole[] = ["none", "guest", "staff", "admin"];

function statusTone(status: number): string {
  if (status === 0) return "text-red-400";
  if (status >= 200 && status < 300) return "text-gold";
  if (status >= 300 && status < 400) return "text-gold-soft";
  return "text-red-400";
}

function pretty(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}

const inputClass =
  "w-full border-b border-ivory/20 bg-transparent py-2 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none";

const labelClass =
  "mb-1 block text-[10px] font-medium uppercase tracking-[0.24em] text-ash-dim";

export function DemoConsole() {
  const [role, setRole] = useState<DemoRole>("none");
  const [session, setSession] = useState<TokenSession | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const nextId = useRef(1);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [detail, setDetail] = useState<ApiCall | null>(null);
  const [lastEtag, setLastEtag] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState(1);

  const [form, setForm] = useState({
    restaurantId: 1,
    dateTime: "2026-11-14T19:00",
    partySize: 2,
    guestName: "Alice Andersson",
    guestEmail: "alice@example.com",
  });

  const [restaurantForm, setRestaurantForm] = useState({
    name: "Akari",
    city: "Göteborg",
    cuisine: "Japanskt",
    numberOfSeats: 24,
  });

  const token = session?.accessToken ?? null;
  const expired = session ? session.expiresAt <= Date.now() : false;

  const run = useCallback(
    async (
      label: string,
      rule: string,
      expected: string,
      opts: {
        method: string;
        path: string;
        body?: unknown;
        ifNoneMatch?: string | null;
        tokenOverride?: string | null;
        /** Used for follow-up fetches so they do not bury the action they belong to. */
        silent?: boolean;
        onResult?: (call: ApiCall) => void;
      },
    ) => {
      // Reserve the log entry before awaiting so the click gives instant
      // feedback instead of looking like a dead button while the request runs.
      const id = nextId.current++;

      if (!opts.silent) {
        setLog((prev) =>
          [{ id, label, rule, expected, call: null, pending: true }, ...prev].slice(0, 40),
        );
      }

      setBusy(true);

      try {
        const call = await request({
          method: opts.method,
          path: opts.path,
          body: opts.body,
          ifNoneMatch: opts.ifNoneMatch,
          token: opts.tokenOverride === undefined ? token : opts.tokenOverride,
        });

        if (!opts.silent) {
          setLog((prev) =>
            prev.map((entry) =>
              entry.id === id ? { ...entry, call, pending: false } : entry,
            ),
          );
        }

        opts.onResult?.(call);
        return call;
      } finally {
        setBusy(false);
      }
    },
    [token],
  );

  const signIn = useCallback(async (nextRole: Exclude<DemoRole, "none">) => {
    setRole(nextRole);
    setAuthError(null);
    setBusy(true);
    try {
      const next = await fetchToken(DEMO_USERS[nextRole].username);
      setSession(next);
    } catch (err) {
      setSession(null);
      setAuthError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }, []);

  const signOut = () => {
    setRole("none");
    setSession(null);
    setAuthError(null);
  };

  // Re-render every second while a token is held so the countdown and the
  // expiry warning stay honest even when the user is not clicking anything.
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!session) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [session]);

  const countdown = useMemo(() => {
    if (!session) return null;
    const left = Math.max(0, session.expiresAt - Date.now());
    const s = Math.ceil(left / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }, [session]);

  const loadRestaurants = (silent = false) =>
    run(
      "Lista restauranger",
      "GET /restaurants → hasAuthority(SCOPE_restaurant:read)",
      "200",
      {
        method: "GET",
        path: "/restaurants?page=0&size=10",
        silent,
        onResult: (call) => {
          if (call.status === 200 && Array.isArray(call.body)) {
            setRestaurants(call.body as Restaurant[]);
          }
        },
      },
    );

  const createRestaurant = () =>
    run(
      "Skapa restaurang",
      "POST /restaurants → hasRole(ADMIN)",
      "201 + Location",
      {
        method: "POST",
        path: "/restaurants",
        body: restaurantForm,
        onResult: (call) => {
          if (call.status === 201) {
            const created = call.body as Restaurant;
            setBookingId(created.id);
            loadRestaurants(true);
          }
        },
      },
    );

  const createBooking = () =>
    run("Skapa bokning", "POST /bookings → hasAuthority(SCOPE_booking:write)", "201 + Location", {
      method: "POST",
      path: "/bookings",
      body: bookingBody(form),
      onResult: (call) => {
        if (call.status === 201) {
          const created = call.body as Booking;
          setBookingId(created.id);
          loadBookings(true);
        }
      },
    });

  const loadBookings = (silent = false) =>
    run("Lista bokningar", "GET /bookings → hasAuthority(SCOPE_booking:read)", "200", {
      method: "GET",
      path: "/bookings",
      silent,
      onResult: (call) => {
        if (call.status === 200 && Array.isArray(call.body)) {
          setBookings(call.body as Booking[]);
        }
      },
    });

  const fetchDetail = () =>
    run(`Hämta bokning ${bookingId}`, "GET /bookings/{id} → hasAuthority(SCOPE_booking:read)", "200 + ETag", {
      method: "GET",
      path: `/bookings/${bookingId}`,
      onResult: (call) => {
        setDetail(call);
        if (call.etag) setLastEtag(call.etag);
      },
    });

  const conditionalGet = () =>
    run(
      `If-None-Match "${lastEtag ?? ""}"`,
      "GET /bookings/{id} med If-None-Match → 304 NOT_MODIFIED",
      "304, tom body",
      {
        method: "GET",
        path: `/bookings/${bookingId}`,
        ifNoneMatch: lastEtag,
        onResult: (call) => setDetail(call),
      },
    );

  const notFound = () =>
    run("Hämta bokning 999999", "GET /bookings/{id} → ResourceNotFoundException → 404", "404 problem+json", {
      method: "GET",
      path: "/bookings/999999",
    });

  const transition = (target: "confirm" | "cancel") =>
    run(
      `${target === "confirm" ? "Bekräfta" : "Avboka"} bokning ${bookingId}`,
      `POST /bookings/{id}/${target} → hasAnyRole(STAFF, ADMIN) + tillståndsmaskin`,
      target === "confirm" ? "200, sedan 409" : "200, sedan 409",
      {
        method: "POST",
        path: `/bookings/${bookingId}/${target}`,
        onResult: (call) => {
          if (call.status >= 200 && call.status < 300) {
            loadBookings(true);
          }
        },
      },
    );

  const noToken = () =>
    run(
      "GET /bookings UTAN token",
      "oauth2ResourceServer → AuthenticationException → 401",
      "401, inte 403",
      { method: "GET", path: "/bookings", tokenOverride: null },
    );

  const fakeToken = () =>
    run(
      "GET /bookings med FEJK-token",
      "JwtDecoder hämtar nycklar från issuer → ogiltig signatur → 401",
      "401",
      {
        method: "GET",
        path: "/bookings",
        tokenOverride: "hejsan123.detta.är.inte-en-jwt",
      },
    );

  const withToken = () =>
    run("GET /bookings MED token", "Riktig token → 200", "200", {
      method: "GET",
      path: "/bookings",
    });

  return (
    <div className="u-container pb-28 pt-28">
      {/* ---------------------------------------------------------- header */}
      <p className="u-section-label">Demo · Restaurant API</p>
      <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,4rem)] font-light leading-[1.05] tracking-tight text-ivory">
        Säkerhetskonsol
        <em className="italic text-gold-soft"> för bokningstjänsten.</em>
      </h1>
      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ash/80">
        Varje knapp nedan skickar ett riktigt anrop mot det driftsatta API:et på{" "}
        <span className="text-ivory">Render</span>. Nyckeln i sidan är att
        statusloggen längst ned visar vad servern <em>svarade</em> och vilken
        regel i <span className="text-gold">SecurityConfig</span> som avgjorde
        svaret.
      </p>

      <div className="mt-6 space-y-1 font-mono text-[11px] leading-relaxed text-ash-dim">
        <p>
          API&nbsp;&nbsp;&nbsp;&nbsp;{API_BASE}
        </p>
        <p>
          ISSUER&nbsp;{KEYCLOAK_BASE}/realms/{REALM}
        </p>
        <p>
          CLIENT&nbsp;{CLIENT_ID} (public, direct access grants)
        </p>
      </div>

      {/* --------------------------------------------------------- session */}
      <section className="mt-14 rounded-sm border border-gold/15 bg-charcoal p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="u-section-label">Steg 1 · Inloggning via Keycloak</p>
          {session && (
            <button onClick={signOut} className="btn btn-ghost !px-5 !py-2 !text-[10px]">
              Logga ut
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {ROLE_ORDER.map((r) => {
            const active = role === r;
            if (r === "none") {
              return (
                <button
                  key={r}
                  onClick={signOut}
                  className={`btn !px-5 !py-2.5 !text-[10px] ${
                    active ? "btn-solid" : "btn-ghost"
                  }`}
                >
                  Utloggad
                </button>
              );
            }
            const user = DEMO_USERS[r];
            return (
              <button
                key={r}
                disabled={busy}
                onClick={() => signIn(r)}
                className={`btn !px-5 !py-2.5 !text-[10px] disabled:opacity-50 ${
                  active && session ? "btn-gold" : "btn-ghost"
                }`}
              >
                {user.label}
              </button>
            );
          })}
        </div>

        {authError && (
          <p className="mt-5 border-l-2 border-red-400/60 pl-4 text-sm text-red-400">
            Keycloak nekade: {authError}
          </p>
        )}

        <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-ash-dim">
          Tokenet hämtas via <span className="text-ash">/api/token</span> — en
          server-side route handler. Keycloak svarar på CORS-preflighten men
          skickar inte{" "}
          <span className="text-gold">Access-Control-Allow-Origin</span> på
          själva tokensvaret, så webbläsaren blockerar ett direkt anrop. Det är
          API:et som är föremål för CORS-demon, inte identitetstjänsten.
        </p>

        <div className="mt-7 grid gap-4 border-t border-gold/10 pt-6 text-sm sm:grid-cols-3">
          <div>
            <p className={labelClass}>Användare</p>
            <p className="text-ivory">{session?.username ?? "—"}</p>
          </div>
          <div>
            <p className={labelClass}>Roller (realm_access.roles)</p>
            <p className="text-ivory">{session?.roles.join(", ") || "—"}</p>
          </div>
          <div>
            <p className={labelClass}>Scopes (scope claim)</p>
            <p className="break-words text-ivory">
              {session?.scopes.filter((s) => s.includes(":")).join(" ") || "—"}
            </p>
          </div>
        </div>

        {session && (
          <p
            className={`mt-4 font-mono text-[11px] ${
              expired ? "text-red-400" : "text-ash-dim"
            }`}
          >
            Token löper ut om {countdown} · accessTokenLifespan är 5 minuter i
            Keycloak
          </p>
        )}

        {expired && (
          <p className="mt-3 border-l-2 border-red-400/60 pl-4 text-[13px] leading-relaxed text-red-400">
            Tokenen har gått ut. Varje anrop ger nu 401 tills du loggar in igen
            — även bekräfta och avboka.
          </p>
        )}
      </section>

      {/* ------------------------------------------------------- restaurants */}
      <section className="mt-14 rounded-sm border border-gold/15 bg-charcoal p-6 sm:p-8">
        <p className="u-section-label">Steg 2 · Restauranger</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => loadRestaurants()} disabled={busy} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Lista restauranger
          </button>
          <button onClick={createRestaurant} disabled={busy} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Skapa restaurang (kräver ADMIN)
          </button>
        </div>

        <div className="mt-8 grid gap-6 border-t border-gold/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className={labelClass}>Namn</p>
            <input className={inputClass} value={restaurantForm.name}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })} />
          </div>
          <div>
            <p className={labelClass}>Stad</p>
            <input className={inputClass} value={restaurantForm.city}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, city: e.target.value })} />
          </div>
          <div>
            <p className={labelClass}>Kök</p>
            <input className={inputClass} value={restaurantForm.cuisine}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, cuisine: e.target.value })} />
          </div>
          <div>
            <p className={labelClass}>Antal platser</p>
            <input type="number" className={inputClass} value={restaurantForm.numberOfSeats}
              onChange={(e) => setRestaurantForm({ ...restaurantForm, numberOfSeats: Number(e.target.value) })} />
          </div>
        </div>

        {restaurants.length > 0 && (
          <pre className="mt-6 max-h-56 overflow-auto rounded-sm bg-noir p-4 font-mono text-[11px] leading-relaxed text-ash">
            {pretty(restaurants)}
          </pre>
        )}
      </section>

      {/* --------------------------------------------------------- bookings */}
      <section className="mt-14 rounded-sm border border-gold/15 bg-charcoal p-6 sm:p-8">
        <p className="u-section-label">Steg 3 · Gästen bokar</p>

        <div className="mt-6 grid gap-6 border-t border-gold/10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className={labelClass}>Restaurang-ID</p>
            <input type="number" className={inputClass} value={form.restaurantId}
              onChange={(e) => setForm({ ...form, restaurantId: Number(e.target.value) })} />
          </div>
          <div>
            <p className={labelClass}>Tidpunkt</p>
            <input type="datetime-local" className={`${inputClass} [color-scheme:dark]`} value={form.dateTime}
              onChange={(e) => setForm({ ...form, dateTime: e.target.value })} />
          </div>
          <div>
            <p className={labelClass}>Sällskap</p>
            <select className={`${inputClass} [&>option]:bg-noir`} value={form.partySize}
              onChange={(e) => setForm({ ...form, partySize: Number(e.target.value) })}>
              {[2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} gäster</option>
              ))}
            </select>
          </div>
          <div>
            <p className={labelClass}>Namn</p>
            <input className={inputClass} value={form.guestName}
              onChange={(e) => setForm({ ...form, guestName: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <p className={labelClass}>E-post</p>
            <input className={inputClass} value={form.guestEmail}
              onChange={(e) => setForm({ ...form, guestEmail: e.target.value })} />
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={createBooking} disabled={busy} className="btn btn-gold !px-6 !py-2.5 !text-[10px] disabled:opacity-50">
            Skapa bokning
          </button>
          <button onClick={() => loadBookings()} disabled={busy} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Lista bokningar
          </button>
        </div>

        {bookings.length > 0 && (
          <pre className="mt-6 max-h-56 overflow-auto rounded-sm bg-noir p-4 font-mono text-[11px] leading-relaxed text-ash">
            {pretty(bookings)}
          </pre>
        )}
      </section>

      {/* ------------------------------------------------------ state machine */}
      <section className="mt-14 rounded-sm border border-gold/15 bg-charcoal p-6 sm:p-8">
        <p className="u-section-label">Steg 4 · Detalj, ETag och tillstånd</p>

        <div className="mt-6 flex flex-wrap items-end gap-6 border-t border-gold/10 pt-6">
          <div className="w-32">
            <p className={labelClass}>Boknings-ID</p>
            <input type="number" className={inputClass} value={bookingId}
              onChange={(e) => setBookingId(Number(e.target.value))} />
          </div>
          <button onClick={fetchDetail} disabled={busy} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Hämta detalj
          </button>
          <button onClick={conditionalGet} disabled={busy || !lastEtag} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            If-None-Match → 304
          </button>
          <button onClick={notFound} disabled={busy} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Hämta 999999 → 404
          </button>
        </div>

        <div className="mt-7 flex flex-wrap gap-3 border-t border-gold/10 pt-6">
          <button onClick={() => transition("confirm")} disabled={busy} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Bekräfta
          </button>
          <button onClick={() => transition("cancel")} disabled={busy} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Avboka
          </button>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-ash">
          Båda knapparna kräver rollen{" "}
          <span className="text-gold">STAFF</span> eller{" "}
          <span className="text-gold">ADMIN</span>. Som gäst får du{" "}
          <span className="text-gold">403</span> här — det är rollen som avgör,
          inte HATEOAS.
        </p>

        <p className="mt-3 text-[13px] leading-relaxed text-ash-dim">
          Bekräfta två gånger i samma ställning ger 409 —{" "}
          <span className="text-ash">BookingStateMachine</span> tillåter inte
          CONFIRMED → CONFIRMED. Länkarna i svaret berättar vilka övergångar som
          är möjliga just nu (HATEOAS).
        </p>

        {detail && (
          <pre className="mt-6 max-h-72 overflow-auto rounded-sm bg-noir p-4 font-mono text-[11px] leading-relaxed text-ash">
            {pretty(detail.body)}
          </pre>
        )}
      </section>

      {/* ------------------------------------------------------------ security */}
      <section className="mt-14 rounded-sm border border-gold/15 bg-charcoal p-6 sm:p-8">
        <p className="u-section-label">Steg 5 · Säkerhet — 401 mot 403 mot CORS</p>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ash/80">
          Det här är kärnan i Del 3. Klicka i ordningen{" "}
          <span className="text-ivory">utan token</span> →{" "}
          <span className="text-ivory">med token</span> →{" "}
          <span className="text-ivory">fejk-token</span> och se att alla tre
          ger olika svar.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={noToken} disabled={busy} className="btn btn-gold !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Utan token
          </button>
          <button onClick={withToken} disabled={busy} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Med token
          </button>
          <button onClick={fakeToken} disabled={busy} className="btn btn-ghost !px-5 !py-2.5 !text-[10px] disabled:opacity-50">
            Fejk-token
          </button>
        </div>

        <div className="mt-7 grid gap-4 border-t border-gold/10 pt-6 text-[13px] leading-relaxed text-ash-dim sm:grid-cols-2">
          <p>
            <span className="text-ivory">401</span> = ingen eller ogiltig
            token. Du vet inte vem du är.
          </p>
          <p>
            <span className="text-ivory">403</span> = giltig token, men rollen
            eller scopet räcker inte.
          </p>
          <p>
            <span className="text-ivory">CORS</span> — svaret kommer bara
            fram för att min origin står i{" "}
            <span className="font-mono text-[11px] text-gold">
              CORS_ALLOWED_ORIGINS
            </span>{" "}
            på Render. En annan origin får 403 med tom body.
          </p>
          <p>
            <span className="text-ivory">Varför syns inte</span>{" "}
            <span className="font-mono text-[11px]">
              access-control-allow-origin
            </span>{" "}
            i loggen? Webbläsaren tillåter inte JavaScript att läsa den headern.
            Att statuskoden gick att läsa alls är beviset.
          </p>
          <p>
            <span className="text-ivory">Preflight</span> — webbläsaren skickar
            ett OPTIONS innan varje anrop med Authorization-headern. Det
            tillåts via{" "}
            <span className="font-mono text-[11px] text-gold">
              OPTIONS /** → permitAll
            </span>
            .
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- log */}
      <section className="mt-14 rounded-sm border border-gold/15 bg-noir p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="u-section-label">Statuslogg · vad servern svarade</p>
          <button onClick={() => setLog([])} className="btn btn-ghost !px-5 !py-2 !text-[10px]">
            Rensa
          </button>
        </div>

        {log.length === 0 ? (
          <p className="mt-6 text-sm text-ash-dim">
            Inga anrop än. Klicka på någon knapp ovan.
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {log.map((entry) => {
              const call = entry.call;

              return (
                <li key={entry.id} className="border-t border-gold/10 pt-4">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-[12px] text-ash-dim">
                      {call?.method ?? "…"}
                    </span>
                    <span className="font-mono text-[12px] text-ivory">
                      {call?.path ?? entry.label}
                    </span>
                    {entry.pending ? (
                      <span className="animate-pulse font-mono text-[13px] font-medium text-gold">
                        väntar på svar…
                      </span>
                    ) : (
                      call && (
                        <span
                          className={`font-mono text-[13px] font-medium ${statusTone(call.status)}`}
                        >
                          {call.status || "ERR"} {call.statusText}
                        </span>
                      )
                    )}
                    {call && !entry.pending && (
                      <span className="font-mono text-[11px] text-ash-dim">
                        {call.durationMs} ms
                      </span>
                    )}
                    <span className="text-[11px] uppercase tracking-[0.18em] text-gold">
                      väntat {entry.expected}
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] text-ash/80">{entry.label}</p>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-ash-dim">
                    {entry.rule}
                  </p>

                  {call && (call.location || call.etag) && (
                    <p className="mt-2 break-all font-mono text-[11px] leading-relaxed text-gold-soft">
                      {call.location && <>Location: {call.location} · </>}
                      {call.etag && <>ETag: {call.etag}</>}
                    </p>
                  )}

                  {call?.error && (
                    <p className="mt-2 text-[12px] leading-relaxed text-red-400">
                      {call.error} — ofta CORS, eller att tjänsten fortfarande
                      vaknar på Render free.
                    </p>
                  )}

                  {call &&
                    (call.status === 404 || call.status === 409) &&
                    typeof call.body === "object" && (
                      <pre className="mt-3 overflow-auto rounded-sm bg-charcoal p-3 font-mono text-[11px] leading-relaxed text-ash">
                        {pretty(call.body)}
                      </pre>
                    )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
