import { type NextRequest, NextResponse } from "next/server";
import { destroySession, isSecureRequest, SESSION_COOKIE, sessionCookieOptions } from "@/server/auth";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  destroySession(token);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(isSecureRequest(request)), maxAge: 0 });
  return res;
}
