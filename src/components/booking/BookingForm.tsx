"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { zones } from "@/server/config";

type ZoneAvail = { zone: string; available: number };
type Slot = { time: string; zones: ZoneAvail[]; open: boolean };
type Availability = { date: string; slots: Slot[]; failed?: boolean } | null;
type Booking = {
  id: number;
  date: string;
  time: string;
  status: string;
};

const inputBase =
  "w-full rounded-sm border bg-transparent px-4 py-3 text-[15px] text-ivory placeholder:text-ivory/30 transition-colors duration-300 focus:outline-none";
const inputIdle = "border-ivory/15 focus:border-gold";
const inputError = "border-gold/70 focus:border-gold";
const labelCls =
  "mb-2 block text-[9px] font-medium uppercase tracking-[0.28em] text-ash-dim";

const isoOf = (d: Date) => d.toISOString().slice(0, 10);

export function BookingForm() {
  const today = useMemo(() => isoOf(new Date()), []);
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return isoOf(d);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zone, setZone] = useState<string>("service");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("");
  const [regnr, setRegnr] = useState("");
  const [mileage, setMileage] = useState("");
  const [serviceType, setServiceType] = useState("service");
  const [notes, setNotes] = useState("");

  const [availability, setAvailability] = useState<Availability>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState<Booking | null>(null);

  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    fetch(`/api/availability?date=${date}`)
      .then((r) => r.json())
      .then((data: { date: string; slots: Slot[] }) => {
        if (!cancelled && data && Array.isArray(data.slots)) {
          setAvailability({ date: data.date, slots: data.slots });
        } else if (cancelled) {
          return;
        } else {
          setAvailability({ date, slots: [], failed: true });
        }
      })
      .catch(() => {
        if (cancelled) return;
        setAvailability({ date, slots: [], failed: true });
      });
    return () => {
      cancelled = true;
    };
  }, [date]);

  const availLoading = availability === null;
  const availFailed = availability?.failed ?? false;
  const slotsForZone = availability?.slots.filter((s) =>
    s.zones.some((z) => z.zone === zone && z.available > 0)
  ) ?? [];
  const availableTimes = slotsForZone
    .filter((s) => s.open)
    .map((s) => s.time)
    .sort();

  function err(field: string) {
    return errors[field] ? inputError : inputIdle;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setGlobalError("");
    setSuccess(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: name,
          email,
          phone,
          date,
          time,
          service_type: serviceType,
          zone,
          regnr,
          mileage,
          notes,
        }),
      });
      const data = await res.json();
      if (res.status === 201 && data.ok) {
        setSuccess(data.booking as Booking);
        setName("");
        setEmail("");
        setPhone("");
        setTime("");
        setRegnr("");
        setMileage("");
        setNotes("");
      } else if (data.fields) {
        setErrors(data.fields as Record<string, string>);
        setGlobalError(data.error ?? "Vänligen kontrollera fälten.");
      } else {
        setGlobalError(data.error ?? "Något gick fel. Försök igen.");
      }
    } catch {
      setGlobalError("Nätverksfel. Försök igen.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-sm border border-gold/20 bg-charcoal/80 p-8 shadow-[0_40px_160px_-80px_rgba(185,160,108,0.45)] sm:p-10">
      {success ? (
        <div>
          <p className="text-[9px] uppercase tracking-[0.32em] text-gold">
            Bokningsförfrågan mottagen
          </p>
          <h3 className="mt-4 font-display text-3xl font-light text-ivory">
            Tack!
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ash/80">
            Vi har mottagit din bokningsförfrågan och bekräftar snarast. Referensnummer:
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-gold/20 pt-6 text-sm">
            <div>
              <dt className="text-[9px] uppercase tracking-[0.28em] text-ash-dim">Datum</dt>
              <dd className="mt-1 text-ivory">{success.date}</dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-[0.28em] text-ash-dim">Tid</dt>
              <dd className="mt-1 text-ivory">{success.time}</dd>
            </div>
            <div>
              <dt className="text-[9px] uppercase tracking-[0.28em] text-ash-dim">Referens</dt>
              <dd className="mt-1 text-gold">#{success.id}</dd>
            </div>
          </dl>
          <button onClick={() => setSuccess(null)} className="btn btn-gold mt-8">
            Ny bokning
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          {globalError && (
            <div
              role="alert"
              className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold"
            >
              {globalError}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="r-name">Ditt namn</label>
              <input
                id="r-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Namn"
                className={`${inputBase} ${err("guest_name")}`}
              />
              {errors.guest_name && <p className="mt-1.5 text-xs text-gold">{errors.guest_name}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="r-email">E-post</label>
              <input
                id="r-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="namn@epost.se"
                className={`${inputBase} ${err("email")}`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-gold">{errors.email}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="r-phone">Telefon (valfritt)</label>
              <input
                id="r-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+46 70 123 45 67"
                className={`${inputBase} ${err("phone")}`}
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="r-zone">Typ av tjänst</label>
              <select
                id="r-zone"
                value={zone}
                onChange={(e) => {
                  setZone(e.target.value);
                  setTime("");
                }}
                className={`${inputBase} ${inputIdle} [&>option]:bg-charcoal`}
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls} htmlFor="r-serviceType">Detalj</label>
              <select
                id="r-serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className={`${inputBase} ${inputIdle} [&>option]:bg-charcoal`}
              >
                <option value="service">Service &amp; underhåll</option>
                <option value="diagnos">Diagnos</option>
                <option value="lack">Lack &amp; plåt</option>
                <option value="reparation">Större reparation</option>
              </select>
            </div>

            <div>
              <label className={labelCls} htmlFor="r-regnr">Registreringsnummer</label>
              <input
                id="r-regnr"
                value={regnr}
                onChange={(e) => setRegnr(e.target.value.toUpperCase())}
                placeholder="ABC123"
                className={`${inputBase} ${err("regnr")}`}
              />
              {errors.regnr && <p className="mt-1.5 text-xs text-gold">{errors.regnr}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="r-mileage">Mätarställning (mil)</label>
              <input
                id="r-mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="15000"
                className={`${inputBase} ${err("mileage")}`}
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="r-date">Datum</label>
              <input
                id="r-date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setTime("");
                }}
                className={`${inputBase} ${err("date")} [&::-webkit-calendar-picker-indicator]:opacity-60`}
              />
              {errors.date && <p className="mt-1.5 text-xs text-gold">{errors.date}</p>}
            </div>

            <div>
              <label className={labelCls} htmlFor="r-time">Tid</label>
              <select
                id="r-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={availableTimes.length === 0}
                className={`${inputBase} ${err("time")} [&>option]:bg-charcoal disabled:opacity-50`}
              >
                <option value="">
                  {availLoading
                    ? "Kontrollerar tillgänglighet..."
                    : availFailed
                      ? "Kunde inte nå servern"
                      : availableTimes.length === 0
                        ? "Inga tider tillgängliga"
                        : "Välj tid"}
                </option>
                {availableTimes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.time && <p className="mt-1.5 text-xs text-gold">{errors.time}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="r-notes">Meddelande (valfritt)</label>
              <textarea
                id="r-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Beskriv vad som ska göras, felbeskrivning etc."
                className={`${inputBase} ${err("notes")} resize-none`}
              />
              {errors.notes && <p className="mt-1.5 text-xs text-gold">{errors.notes}</p>}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-[10px] uppercase tracking-[0.24em] text-ash-dim">
              Bokningen kräver bekräftelse
            </p>
            <button type="submit" disabled={submitting} className="btn btn-gold">
              {submitting ? "Skickar..." : "Boka service"}
              {!submitting && <Arrow />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
