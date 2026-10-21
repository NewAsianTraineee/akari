import Link from "next/link";
import {
  getBookingsForDate,
  getDashboardStats,
  getRecentBookings,
  todayIso,
} from "@/server/bookings";
import { zoneLabels, formatDateShort } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";
import { BookingActions } from "./BookingActions";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-sm border border-gold/20 bg-charcoal/70 p-6 shadow-[0_40px_160px_-80px_rgba(185,160,108,0.35)]">
      <p className="text-[9px] uppercase tracking-[0.32em] text-gold">
        {label}
      </p>
      <p
        className={`mt-3 font-display text-4xl font-light ${
          accent ? "text-gold" : "text-ivory"
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-[11px] text-ash-dim">{sub}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const stats = getDashboardStats();
  const today = todayIso();
  const todays = getBookingsForDate(today);
  const recent = getRecentBookings(6);

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.36em] text-gold">
            {formatDateShort(today)}
          </p>
          <h1 className="mt-2 font-display text-4xl font-light text-ivory sm:text-5xl">
            Verkstadens schema
          </h1>
          <p className="mt-2 text-sm text-ash-dim">Daglig överblick över bokningar och status.</p>
        </div>
        <Link
          href="/admin/bookings"
          className="btn btn-gold !py-2.5 !text-[10px]"
        >
          Hantera bokningar →
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Dagens bilar"
          value={stats.todayCovers}
          sub={`${stats.todayBookings} bokning(ar)`}
          accent
        />
        <StatCard
          label="Pågående arbete"
          value={stats.seatedNow}
          sub="nu i verkstaden"
        />
        <StatCard
          label="Väntande förfrågningar"
          value={stats.pendingCount}
          sub="behöver bekräftas"
        />
        <StatCard
          label="Kommande 7 dagar"
          value={stats.weekCovers}
          sub={`${stats.upcomingCount} kommande`}
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-light text-ivory">
              Dagens schema
            </h2>
            <span className="text-[10px] uppercase tracking-[0.26em] text-ash-dim">
              {todays.length} bokning(ar)
            </span>
          </div>

          <div className="overflow-hidden rounded-sm border border-gold/20">
            {todays.length === 0 ? (
              <p className="p-10 text-center text-sm text-ash-dim">
                Inga bokningar idag.
              </p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-charcoal/80 text-[9px] uppercase tracking-[0.26em] text-gold">
                  <tr>
                    <th className="px-4 py-3 font-medium">Tid</th>
                    <th className="px-4 py-3 font-medium">Kund</th>
                    <th className="px-4 py-3 font-medium">Regnr / Mil</th>
                    <th className="px-4 py-3 font-medium">Tjänst</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Åtgärder
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  {todays.map((b) => (
                    <tr
                      key={b.id}
                      className="bg-noir/40 transition-colors hover:bg-charcoal/60"
                    >
                      <td className="px-4 py-3 font-display text-base text-gold">
                        {b.time}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-ivory">{b.guest_name}</p>
                        <p className="text-[11px] text-ash-dim">{b.email} {b.phone ? `· ${b.phone}` : ""}</p>
                      </td>
                      <td className="px-4 py-3 text-ash">
                        <p>{b.regnr || "-"}</p>
                        <p className="text-[11px] text-ash-dim">{b.mileage ? `${b.mileage} mil` : ""}</p>
                      </td>
                      <td className="px-4 py-3 text-ash">
                        {zoneLabels[b.zone] ?? b.zone}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <BookingActions id={b.id} status={b.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <section className="lg:col-span-4">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-light text-ivory">
              Senaste förfrågningar
            </h2>
            <Link
              href="/admin/bookings"
              className="text-[10px] uppercase tracking-[0.24em] text-gold hover:text-gold-soft"
            >
              Visa alla
            </Link>
          </div>
          <ul className="space-y-3">
            {recent.map((b) => (
              <li
                key={b.id}
                className="rounded-sm border border-gold/20 bg-charcoal/60 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-ivory">{b.guest_name}</p>
                  <StatusBadge status={b.status} />
                </div>
                <p className="mt-1 text-[11px] text-ash-dim">
                  {b.regnr ? `${b.regnr} · ` : ""}{formatDateShort(b.date)} · {b.time} ·{" "}
                  {zoneLabels[b.zone] ?? b.zone}
                </p>
                {b.notes && (
                  <p className="mt-2 border-l border-gold/40 pl-3 text-[11px] leading-relaxed text-ash/80">
                    {b.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
