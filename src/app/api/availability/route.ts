import { type NextRequest } from "next/server";
import { getAvailability } from "@/server/bookings";
import { zones, serviceSlots } from "@/server/config";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return Response.json({ error: "date is required" }, { status: 400 });
  }
  const slots = getAvailability(date, zones, serviceSlots);
  return Response.json({ date, slots, zones, serviceSlots });
}
