/**
 * Server-side proxy for the Keycloak token endpoint.
 *
 * The token endpoint answers the CORS preflight but does not send
 * Access-Control-Allow-Origin on the actual POST response, so a browser call
 * is rejected even though the client is configured with web origins "/*".
 * Doing the call from the server side removes that dependency entirely.
 *
 * Demo plumbing only. The resource owner password grant must never run in a
 * browser in a real product, and this route exists so the demo console can
 * show the API's own security rules instead of fighting the IdP's CORS.
 */

import { CLIENT_ID, DEMO_SCOPES, KEYCLOAK_BASE, REALM } from "@/lib/akari-api";

export const runtime = "nodejs";

const TIMEOUT_MS = 15_000;

export async function POST(request: Request) {
  let username: unknown;
  let password: unknown;

  try {
    const parsed = (await request.json()) as Record<string, unknown>;
    username = parsed.username;
    password = parsed.password;
  } catch {
    return Response.json(
      { error: "bad_request", error_description: "Expected a JSON body with username and password." },
      { status: 400 },
    );
  }

  if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
    return Response.json(
      { error: "bad_request", error_description: "Both username and password are required." },
      { status: 400 },
    );
  }

  const form = new URLSearchParams({
    grant_type: "password",
    client_id: CLIENT_ID,
    username,
    password,
    scope: DEMO_SCOPES,
  });

  try {
    const res = await fetch(
      `${KEYCLOAK_BASE}/realms/${REALM}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form,
        cache: "no-store",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      },
    );

    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return Response.json(
      {
        error: "upstream_unavailable",
        error_description:
          err instanceof Error ? err.message : "Could not reach the identity provider.",
      },
      { status: 502 },
    );
  }
}
