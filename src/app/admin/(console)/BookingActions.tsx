"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BookingStatus } from "@/server/config";

const actions: { status: BookingStatus; label: string }[] = [
  { status: "confirmed", label: "Bekräfta" },
  { status: "in_progress", label: "Påbörja" },
  { status: "completed", label: "Markera klar" },
  { status: "cancelled", label: "Avboka" },
  { status: "no_show", label: "Uteblev" },
  { status: "pending", label: "Åter till väntande" },
];

export function BookingActions({ id, status }: { id: number; status: BookingStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function setStatus(next: BookingStatus) {
    if (next === status) return;
    setLoading(true);
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => setStatus(e.target.value as BookingStatus)}
      className="rounded-sm border border-gold/20 bg-noir/80 px-2 py-1 text-[11px] text-ivory"
    >
      {actions.map((a) => (
        <option key={a.status} value={a.status}>
          {a.label}
        </option>
      ))}
    </select>
  );
}
