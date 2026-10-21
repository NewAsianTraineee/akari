import { type NextRequest } from "next/server";
import { requireSession } from "@/server/auth";
import {
  createBooking,
  getAvailability,
  listBookings,
} from "@/server/bookings";
import { validateBooking } from "@/server/validation";
import { zones, serviceSlots } from "@/server/config";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const result = validateBooking(body);
  if (!result.ok) {
    return Response.json(
      { error: "Vänligen kontrollera fälten.", fields: result.errors },
      { status: 422 }
    );
  }

  const value = result.value;

  const availability = getAvailability(value.date, zones, serviceSlots);
  const slot = availability.find((s) => s.time === value.time);
  const zoneAvail = slot?.zones.find((z) => z.zone === value.zone);

  if (!slot || !zoneAvail) {
    return Response.json(
      { error: "Den valda tiden är inte tillgänglig." },
      { status: 409 }
    );
  }
  if (zoneAvail.available < 1) {
    return Response.json(
      {
        error: `Tiden ${value.time} är fullbokad för vald tjänst. Välj annan tid eller tjänst.`,
      },
      { status: 409 }
    );
  }

  const booking = createBooking({ ...value, source: "web" });

  return Response.json(
    {
      ok: true,
      message: "Bokningsförfrågan mottagen — vi bekräftar snarast.",
      booking,
    },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  const session = await requireSession();
  if (!session) {
    return Response.json({ error: "Obehörig." }, { status: 401 });
  }

  const p = request.nextUrl.searchParams;
  const { rows, total } = listBookings({
    status: (p.get("status") ?? "all") as never,
    date: p.get("date") ?? undefined,
    from: p.get("from") ?? undefined,
    to: p.get("to") ?? undefined,
    zone: p.get("zone") ?? undefined,
    search: p.get("search") ?? undefined,
    limit: Number(p.get("limit") ?? 200),
    offset: Number(p.get("offset") ?? 0),
  });

  return Response.json({ rows, total, count: rows.length });
}
