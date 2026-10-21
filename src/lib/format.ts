import type { ZoneId } from "@/server/config";

export const zoneLabels: Record<ZoneId | string, string> = {
  service: "Service & underhåll",
  diagnos: "Diagnos & felsökning",
  lack: "Lack & reparation",
  verkstad: "Större reparation",
};

export function formatDateShort(iso: string): string {
  try {
    const d = new Date(`${iso}T00:00:00Z`);
    return d.toLocaleDateString("sv-SE", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}
