import { type NextRequest } from "next/server";
import { requireSession } from "@/server/auth";
import { deleteBooking, getBooking, updateBooking } from "@/server/bookings";
import { isBookingStatus } from "@/server/config";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await requireSession();
  if (!session) return Response.json({ error: "Obehörig." }, { status: 401 });
  const { id } = await params;
  const booking = getBooking(Number(id));
  if (!booking) return Response.json({ error: "Hittades inte." }, { status: 404 });
  return Response.json({ booking });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await requireSession();
  if (!session) return Response.json({ error: "Obehörig." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const patch = (body ?? {}) as Record<string, unknown>;
  const { id } = await params;
  const bid = Number(id);

  if (patch.status && typeof patch.status === "string" && !isBookingStatus(patch.status)) {
    return Response.json({ error: "Ogiltig status." }, { status: 400 });
  }

  const updated = updateBooking(bid, patch as never);
  if (!updated) return Response.json({ error: "Hittades inte." }, { status: 404 });
  return Response.json({ ok: true, booking: updated });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await requireSession();
  if (!session) return Response.json({ error: "Obehörig." }, { status: 401 });
  const { id } = await params;
  const ok = deleteBooking(Number(id));
  if (!ok) return Response.json({ error: "Hittades inte." }, { status: 404 });
  return Response.json({ ok: true });
}
