import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { createSession, isSecureRequest, purgeExpiredSessions, sessionCookieOptions } from "@/server/auth";
import { verifyPassword } from "@/server/password";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const { username, password } = (body ?? {}) as Record<string, unknown>;
  if (typeof username !== "string" || typeof password !== "string") {
    return Response.json({ error: "Ange användarnamn och lösenord." }, { status: 400 });
  }

  purgeExpiredSessions();

  const row = db
    .prepare("SELECT username, password_hash, salt, display_name FROM admin_users WHERE username = ?")
    .get(username.trim()) as { username: string; password_hash: string; salt: string; display_name: string | null } | undefined;

  if (!row || !verifyPassword(password, row.password_hash, row.salt)) {
    return Response.json({ error: "Felaktiga inloggningsuppgifter." }, { status: 401 });
  }

  const token = createSession(row.username);
  const res = NextResponse.json({ ok: true, displayName: row.display_name ?? row.username });
  res.cookies.set("aureum_bil_admin", token, sessionCookieOptions(isSecureRequest(request)));
  return res;
}
