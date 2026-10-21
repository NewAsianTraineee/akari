import { listBookings } from "@/server/bookings";
import { zones } from "@/server/config";
import { zoneLabels, formatDateShort } from "@/lib/format";
import { StatusBadge } from "../StatusBadge";
import { BookingActions } from "../BookingActions";
import { BookingFilters } from "./BookingFilters";

export const dynamic = "force-dynamic";

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const status = (sp.status as string) ?? "all";
  const date = (sp.date as string) ?? undefined;
  const from = (sp.from as string) ?? undefined;
  const to = (sp.to as string) ?? undefined;
  const zone = (sp.zone as string) ?? undefined;
  const search = (sp.search as string) ?? undefined;

  const { rows, total } = listBookings({
    status: status as never,
    date,
    from,
    to,
    zone,
    search,
    limit: 500,
    offset: 0,
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.36em] text-gold">Schema &amp; bokningar</p>
          <h1 className="mt-2 font-display text-4xl font-light text-ivory sm:text-5xl">
            Alla bokningar
          </h1>
          <p className="mt-2 text-sm text-ash-dim">{total} träff(ar)</p>
        </div>
      </header>

      <BookingFilters zones={zones} />

      <div className="overflow-hidden rounded-sm border border-gold/20">
        <table className="w-full text-left text-sm">
          <thead className="bg-charcoal/80 text-[9px] uppercase tracking-[0.26em] text-gold">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Datum/Tid</th>
              <th className="px-4 py-3 font-medium">Kund</th>
              <th className="px-4 py-3 font-medium">Kontakt</th>
              <th className="px-4 py-3 font-medium">Bil</th>
              <th className="px-4 py-3 font-medium">Tjänst</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Åtgärder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {rows.map((b) => (
              <tr key={b.id} className="bg-noir/40 transition-colors hover:bg-charcoal/60">
                <td className="px-4 py-3 text-ash-dim">#{b.id}</td>
                <td className="px-4 py-3">
                  <p className="text-ivory">{formatDateShort(b.date)}</p>
                  <p className="font-display text-lg text-gold">{b.time}</p>
                </td>
                <td className="px-4 py-3 text-ivory">{b.guest_name}</td>
                <td className="px-4 py-3 text-ash">
                  <p>{b.email}</p>
                  <p className="text-[11px] text-ash-dim">{b.phone || "-"}</p>
                </td>
                <td className="px-4 py-3 text-ash">
                  <p>{b.regnr || "-"}</p>
                  <p className="text-[11px] text-ash-dim">{b.mileage ? `${b.mileage} mil` : ""}</p>
                </td>
                <td className="px-4 py-3 text-ash">{zoneLabels[b.zone] ?? b.zone}</td>
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
        {rows.length === 0 && (
          <p className="p-10 text-center text-sm text-ash-dim">Inga bokningar matchar filtren.</p>
        )}
      </div>

      {rows.some((r) => r.notes) && (
        <section className="space-y-3">
          <h2 className="font-display text-xl text-ivory">Meddelanden</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {rows
              .filter((r) => r.notes)
              .map((r) => (
                <div key={`note-${r.id}`} className="rounded-sm border border-gold/20 bg-charcoal/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-ivory">#{r.id} — {r.guest_name}</p>
                    <p className="text-[11px] text-ash-dim">{r.date} {r.time}</p>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-ash/90">{r.notes}</p>
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
