import {
  serviceSlots,
  zones,
  isBookableWeekday,
  type ZoneId,
} from "./config";

export type BookingInput = {
  guest_name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  service_type: string;
  zone: string;
  regnr?: string;
  mileage?: string;
  notes?: string;
};

export type ValidationResult =
  | { ok: true; value: Required<Omit<BookingInput, "notes" | "phone" | "regnr" | "mileage">> & { phone: string | null; regnr: string | null; mileage: string | null; notes: string | null } }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function isValidIsoDate(date: string): boolean {
  if (!ISO_RE.test(date)) return false;
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

export function validateBooking(input: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const body = (input ?? {}) as Record<string, unknown>;

  const guest_name = clean(body.guest_name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const date = clean(body.date);
  const time = clean(body.time);
  const zone = clean(body.zone);
  const service_type = clean(body.service_type) || "service";
  const regnr = clean(body.regnr);
  const mileage = clean(body.mileage);
  const notes = clean(body.notes);

  if (guest_name.length < 2) errors.guest_name = "Ange ditt namn.";
  else if (guest_name.length > 80) errors.guest_name = "Namnet är för långt.";

  if (email.length < 5 || !EMAIL_RE.test(email))
    errors.email = "Ange en giltig e-postadress.";
  else if (email.length > 120) errors.email = "E-postadressen är för lång.";

  if (phone && phone.length > 30) errors.phone = "Telefonnumret är för långt.";

  if (!isValidIsoDate(date)) {
    errors.date = "Välj ett giltigt datum.";
  } else if (!isBookableWeekday(date)) {
    errors.date = "Vi har öppet måndag–fredag.";
  } else {
    const today = new Date().toISOString().slice(0, 10);
    if (date < today) errors.date = "Välj ett framtida datum.";
  }

  if (!serviceSlots.includes(time))
    errors.time = "Välj en giltig tid.";

  if (!zones.some((z) => z.id === (zone as ZoneId)))
    errors.zone = "Välj typ av tjänst.";

  if (regnr.length > 10) errors.regnr = "Registreringsnummer är för långt.";
  if (mileage.length > 12) errors.mileage = "Mätarställning är för lång.";
  if (notes.length > 600) errors.notes = "Meddelandet är för långt.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      guest_name,
      email,
      phone: phone || null,
      date,
      time,
      service_type,
      zone,
      regnr: regnr || null,
      mileage: mileage || null,
      notes: notes || null,
    },
  };
}
