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
 *
 * Supports both the password grant (sign in) and the refresh grant (renewing
 * an access token before it expires).
 */

import { CLIENT_ID, DEMO_SCOPES, KEYCLOAK_BASE, REALM } from "@/lib/akari-api";

export const runtime = "nodejs";

const TIMEOUT_MS = 15_000;

export async function POST(request: Request) {
  let parsed: Record<string, unknown>;

  try {
    parsed = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json(
      { error: "bad_request", error_description: "Expected a JSON body." },
      { status: 400 },
    );
  }

  const form = new URLSearchParams({ client_id: CLIENT_ID });

  if (typeof parsed.refreshToken === "string" && parsed.refreshToken) {
    form.set("grant_type", "refresh_token");
    form.set("refresh_token", parsed.refreshToken);
  } else if (
    typeof parsed.username === "string" &&
    typeof parsed.password === "string" &&
    parsed.username &&
    parsed.password
  ) {
    form.set("grant_type", "password");
    form.set("username", parsed.username);
    form.set("password", parsed.password);
    form.set("scope", DEMO_SCOPES);
  } else {
    return Response.json(
      {
        error: "bad_request",
        error_description: "Provide username and password, or a refreshToken.",
      },
      { status: 400 },
    );
  }

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
