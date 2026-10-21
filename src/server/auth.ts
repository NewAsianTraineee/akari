import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "./db";

export const SESSION_COOKIE = "aureum_bil_admin";
const SESSION_TTL_DAYS = 7;

export type Session = {
  username: string;
  displayName: string | null;
  expiresAt: string;
};

export function createSession(username: string): string {
  const token = randomBytes(32).toString("hex");
  db.prepare(
    `INSERT INTO sessions (token, username, expires_at)
     VALUES (?, ?, datetime('now', ?))`
  ).run(token, username, `+${SESSION_TTL_DAYS} days`);
  return token;
}

export function getSession(token: string | undefined): Session | null {
  if (!token) return null;
  const row = db
    .prepare(
      `SELECT s.username, s.expires_at AS expiresAt, a.display_name AS displayName
       FROM sessions s
       JOIN admin_users a ON a.username = s.username
       WHERE s.token = ? AND s.expires_at > datetime('now')`
    )
    .get(token) as Session | undefined;
  return row ?? null;
}

export function destroySession(token: string | undefined): void {
  if (!token) return;
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

export function purgeExpiredSessions(): void {
  db.prepare("DELETE FROM sessions WHERE expires_at <= datetime('now')").run();
}

export async function getCurrentSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return getSession(token);
}

export async function requireSession(): Promise<Session | null> {
  return getCurrentSession();
}

type NextRequestLike = {
  headers: { get(name: string): string | null };
  nextUrl: { protocol: string };
};

export function sessionCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
  };
}

export function isSecureRequest(request: NextRequestLike): boolean {
  const forwarded = request.headers.get("x-forwarded-proto");
  const proto = forwarded ?? request.nextUrl.protocol;
  return proto.replace(":", "").split(",")[0].trim() === "https";
}
