// Konfiguration för bokningssystem: tjänster, tillgängliga tider och kapacitet.
// Ändra här för att justera vad kunder kan boka online.

export type ZoneId = "service" | "diagnos" | "lack" | "verkstad";

export type Zone = {
  id: ZoneId;
  label: string;
  hint: string;
  capacity: number;
};

export const zones: Zone[] = [
  {
    id: "service",
    label: "Service & underhåll",
    hint: "Oljeservice, filter, däck & kontroll",
    capacity: 12,
  },
  {
    id: "diagnos",
    label: "Diagnos & felsökning",
    hint: "Datorläsning och felsökning",
    capacity: 8,
  },
  {
    id: "lack",
    label: "Lack & reparation",
    hint: "Smärre skador, plåt och lack",
    capacity: 6,
  },
  {
    id: "verkstad",
    label: "Större reparation",
    hint: "Mer omfattande arbete efter offert",
    capacity: 6,
  },
];

export const zoneById = (id: string): Zone | undefined =>
  zones.find((z) => z.id === id);

export const serviceSlots: string[] = [
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

export const isValidSlot = (time: string): boolean =>
  serviceSlots.includes(time);

export const maxOnlineParty = 1; // per bokning (bil)

export const bookableWeekdays: number[] = [1, 2, 3, 4, 5];

export const isBookableWeekday = (isoDate: string): boolean => {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return false;
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  // JS: 0=Söndag,1=Måndag,...,6=Lördag
  return bookableWeekdays.includes(day);
};

export const bookingStatuses = [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
  "no_show",
] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export const isBookingStatus = (v: string): v is BookingStatus =>
  (bookingStatuses as readonly string[]).includes(v);

export const occupyingStatuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "in_progress",
];
