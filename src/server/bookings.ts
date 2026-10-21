import { db } from "./db";
import {
  occupyingStatuses,
  type BookingStatus,
  type ZoneId,
} from "./config";

export type Booking = {
  id: number;
  guest_name: string;
  email: string;
  phone: string | null;
  date: string;
  time: string;
  party_size: number;
  regnr: string | null;
  mileage: string | null;
  service_type: string;
  zone: string;
  notes: string | null;
  status: BookingStatus;
  source: string;
  created_at: string;
  updated_at: string;
};

export type NewBooking = {
  guest_name: string;
  email: string;
  phone?: string | null;
  date: string;
  time: string;
  party_size?: number;
  regnr?: string | null;
  mileage?: string | null;
  service_type: string;
  zone: string;
  notes?: string | null;
  source?: string;
};

export type ListOptions = {
  status?: BookingStatus | "all";
  date?: string;
  from?: string;
  to?: string;
  zone?: string;
  search?: string;
  limit?: number;
  offset?: number;
};

const occupyingPlaceholders = occupyingStatuses.map(() => "?").join(", ");

function escapeLike(s: string): string {
  return s.replace(/[\\%_]/g, (c) => `\\${c}`);
}

export function createBooking(input: NewBooking): Booking {
  const info = db
    .prepare(
      `INSERT INTO bookings
        (guest_name, email, phone, date, time, party_size, regnr, mileage, service_type, zone, notes, status, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`
    )
    .run(
      input.guest_name,
      input.email,
      input.phone ?? null,
      input.date,
      input.time,
      input.party_size ?? 1,
      input.regnr ?? null,
      input.mileage ?? null,
      input.service_type,
      input.zone,
      input.notes ?? null,
      input.source ?? "web"
    );
  return getBooking(Number(info.lastInsertRowid))!;
}

export function getBooking(id: number): Booking | undefined {
  return db
    .prepare("SELECT * FROM bookings WHERE id = ?")
    .get(id) as Booking | undefined;
}

export function listBookings(opts: ListOptions = {}): {
  rows: Booking[];
  total: number;
} {
  const where: string[] = [];
  const params: (string | number)[] = [];

  if (opts.status && opts.status !== "all") {
    where.push("status = ?");
    params.push(opts.status);
  }
  if (opts.date) {
    where.push("date = ?");
    params.push(opts.date);
  }
  if (opts.from) {
    where.push("date >= ?");
    params.push(opts.from);
  }
  if (opts.to) {
    where.push("date <= ?");
    params.push(opts.to);
  }
  if (opts.zone) {
    where.push("zone = ?");
    params.push(opts.zone);
  }
  if (opts.search && opts.search.trim() !== "") {
    const term = `%${escapeLike(opts.search.trim())}%`;
    where.push(
      "(guest_name LIKE ? ESCAPE '\\' OR email LIKE ? ESCAPE '\\' OR phone LIKE ? ESCAPE '\\' OR regnr LIKE ? ESCAPE '\\' OR notes LIKE ? ESCAPE '\\')"
    );
    params.push(term, term, term, term, term);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const total = (
    db
      .prepare(`SELECT COUNT(*) AS n FROM bookings ${whereSql}`)
      .get(...params) as { n: number }
  ).n;

  const limit = Math.min(Math.max(opts.limit ?? 200, 1), 1000);
  const offset = Math.max(opts.offset ?? 0, 0);

  const rows = db
    .prepare(
      `SELECT * FROM bookings ${whereSql}
       ORDER BY date ASC, time ASC, id ASC
       LIMIT ? OFFSET ?`
    )
    .all(...params, limit, offset) as Booking[];

  return { rows, total };
}

export function updateBooking(
  id: number,
  patch: Partial<Omit<Booking, "id" | "created_at" | "updated_at">>
): Booking | undefined {
  const allowed = [
    "guest_name",
    "email",
    "phone",
    "date",
    "time",
    "party_size",
    "regnr",
    "mileage",
    "service_type",
    "zone",
    "notes",
    "status",
    "source",
  ] as const;

  const sets: string[] = [];
  const params: (string | number | null)[] = [];

  for (const key of allowed) {
    if (key in patch) {
      sets.push(`${key} = ?`);
      params.push((patch as Record<string, unknown>)[key] as never);
    }
  }
  if (sets.length === 0) return getBooking(id);

  sets.push("updated_at = datetime('now')");
  db.prepare(`UPDATE bookings SET ${sets.join(", ")} WHERE id = ?`).run(
    ...params,
    id
  );
  return getBooking(id);
}

export function deleteBooking(id: number): boolean {
  const info = db.prepare("DELETE FROM bookings WHERE id = ?").run(id);
  return info.changes > 0;
}

export type ZoneAvailability = {
  zone: ZoneId;
  capacity: number;
  booked: number;
  available: number;
};

export type SlotAvailability = {
  time: string;
  zones: ZoneAvailability[];
  totalCapacity: number;
  totalBooked: number;
  totalAvailable: number;
  open: boolean;
};

function bookedBySlotZone(
  date: string,
  zones: ZoneId[]
): Map<string, number> {
  const rows = db
    .prepare(
      `SELECT time, zone, SUM(party_size) AS covers
       FROM bookings
       WHERE date = ? AND status IN (${occupyingPlaceholders})
         AND zone IN (${zones.map(() => "?").join(", ")})
       GROUP BY time, zone`
    )
    .all(date, ...occupyingStatuses, ...zones) as Array<{
    time: string;
    zone: string;
    covers: number;
  }>;

  const map = new Map<string, number>();
  for (const r of rows) map.set(`${r.time}|${r.zone}`, r.covers);
  return map;
}

export function getAvailability(
  date: string,
  zoneList: { id: ZoneId; capacity: number }[],
  slots: string[]
): SlotAvailability[] {
  const booked = bookedBySlotZone(
    date,
    zoneList.map((z) => z.id)
  );

  return slots.map((time) => {
    const zones: ZoneAvailability[] = zoneList.map((z) => {
      const b = booked.get(`${time}|${z.id}`) ?? 0;
      return {
        zone: z.id,
        capacity: z.capacity,
        booked: b,
        available: Math.max(z.capacity - b, 0),
      };
    });
    const totalCapacity = zones.reduce((s, z) => s + z.capacity, 0);
    const totalBooked = zones.reduce((s, z) => s + z.booked, 0);
    return {
      time,
      zones,
      totalCapacity,
      totalBooked,
      totalAvailable: Math.max(totalCapacity - totalBooked, 0),
      open: zones.some((z) => z.available > 0),
    };
  });
}

export type DashboardStats = {
  todayDate: string;
  todayBookings: number;
  todayCovers: number;
  pendingCount: number;
  upcomingCount: number;
  weekCovers: number;
  seatedNow: number;
};

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getDashboardStats(): DashboardStats {
  const today = todayIso();

  const todayRow = db
    .prepare(
      `SELECT COUNT(*) AS bookings, COALESCE(SUM(party_size),0) AS covers
       FROM bookings WHERE date = ? AND status IN (${occupyingPlaceholders})`
    )
    .get(today, ...occupyingStatuses) as {
    bookings: number;
    covers: number;
  };

  const pendingCount = (
    db
      .prepare("SELECT COUNT(*) AS n FROM bookings WHERE status = 'pending'")
      .get() as { n: number }
  ).n;

  const upcomingCount = (
    db
      .prepare(
        `SELECT COUNT(*) AS n FROM bookings
         WHERE date >= ? AND status IN ('pending','confirmed','in_progress')`
      )
      .get(today) as { n: number }
  ).n;

  const weekRow = db
    .prepare(
      `SELECT COALESCE(SUM(party_size),0) AS covers FROM bookings
       WHERE date >= ? AND date <= date(?, '+6 day')
         AND status IN (${occupyingPlaceholders})`
    )
    .get(today, today, ...occupyingStatuses) as { covers: number };

  const seatedNow = (
    db
      .prepare("SELECT COUNT(*) AS n FROM bookings WHERE status = 'in_progress'")
      .get() as { n: number }
  ).n;

  return {
    todayDate: today,
    todayBookings: todayRow.bookings,
    todayCovers: todayRow.covers,
    pendingCount,
    upcomingCount,
    weekCovers: weekRow.covers,
    seatedNow,
  };
}

export function getBookingsForDate(date: string): Booking[] {
  return db
    .prepare(
      `SELECT * FROM bookings WHERE date = ?
       ORDER BY time ASC, id ASC`
    )
    .all(date) as Booking[];
}

export function getRecentBookings(limit = 8): Booking[] {
  return db
    .prepare(
      `SELECT * FROM bookings ORDER BY created_at DESC, id DESC LIMIT ?`
    )
    .all(limit) as Booking[];
}
