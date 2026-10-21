"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Zone } from "@/server/config";

const statuses = [
  { v: "all", label: "Alla" },
  { v: "pending", label: "Väntande" },
  { v: "confirmed", label: "Bekräftade" },
  { v: "in_progress", label: "Pågående" },
  { v: "completed", label: "Klart" },
  { v: "cancelled", label: "Avbokade" },
  { v: "no_show", label: "Uteblev" },
];

export function BookingFilters({ zones }: { zones: Zone[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function update(key: string, value: string) {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="grid gap-3 rounded-sm border border-gold/20 bg-charcoal/60 p-4 md:grid-cols-5">
      <div>
        <label className="block text-[9px] uppercase tracking-[0.28em] text-ash-dim">Sök</label>
        <input
          defaultValue={sp.get("search") ?? ""}
          onChange={(e) => update("search", e.target.value)}
          placeholder="Namn, mail, tel, regnr, meddelande..."
          className="mt-1 w-full rounded-sm border border-gold/15 bg-noir/70 px-3 py-2 text-sm text-ivory outline-none"
        />
      </div>
      <div>
        <label className="block text-[9px] uppercase tracking-[0.28em] text-ash-dim">Status</label>
        <select
          defaultValue={sp.get("status") ?? "all"}
          onChange={(e) => update("status", e.target.value)}
          className="mt-1 w-full rounded-sm border border-gold/15 bg-noir/70 px-3 py-2 text-sm text-ivory"
        >
          {statuses.map((s) => (
            <option key={s.v} value={s.v}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[9px] uppercase tracking-[0.28em] text-ash-dim">Datum</label>
        <input
          type="date"
          defaultValue={sp.get("date") ?? ""}
          onChange={(e) => update("date", e.target.value)}
          className="mt-1 w-full rounded-sm border border-gold/15 bg-noir/70 px-3 py-2 text-sm text-ivory"
        />
      </div>
      <div>
        <label className="block text-[9px] uppercase tracking-[0.28em] text-ash-dim">Från</label>
        <input
          type="date"
          defaultValue={sp.get("from") ?? ""}
          onChange={(e) => update("from", e.target.value)}
          className="mt-1 w-full rounded-sm border border-gold/15 bg-noir/70 px-3 py-2 text-sm text-ivory"
        />
      </div>
      <div>
        <label className="block text-[9px] uppercase tracking-[0.28em] text-ash-dim">Till</label>
        <input
          type="date"
          defaultValue={sp.get("to") ?? ""}
          onChange={(e) => update("to", e.target.value)}
          className="mt-1 w-full rounded-sm border border-gold/15 bg-noir/70 px-3 py-2 text-sm text-ivory"
        />
      </div>
      <div>
        <label className="block text-[9px] uppercase tracking-[0.28em] text-ash-dim">Tjänst</label>
        <select
          defaultValue={sp.get("zone") ?? ""}
          onChange={(e) => update("zone", e.target.value)}
          className="mt-1 w-full rounded-sm border border-gold/15 bg-noir/70 px-3 py-2 text-sm text-ivory"
        >
          <option value="">Alla tjänster</option>
          {zones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
