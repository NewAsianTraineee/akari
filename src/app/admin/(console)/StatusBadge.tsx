import type { BookingStatus } from "@/server/config";

const styles: Record<BookingStatus, string> = {
  pending: "border-gold/40 bg-gold/10 text-gold",
  confirmed: "border-gold/60 bg-gold/15 text-gold",
  in_progress: "border-gold/70 bg-gold/20 text-ivory",
  completed: "border-ash/40 bg-ash/10 text-ash",
  cancelled: "border-ash/30 bg-ash/5 text-ash-dim",
  no_show: "border-ash/30 bg-ash/5 text-ash-dim",
};

const labels: Record<BookingStatus, string> = {
  pending: "Väntar",
  confirmed: "Bekräftad",
  in_progress: "Pågår",
  completed: "Klar",
  cancelled: "Avbokad",
  no_show: "Uteblev",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
