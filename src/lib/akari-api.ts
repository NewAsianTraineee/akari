/**
 * Client for the Restaurant booking API.
 *
 * The API is a Spring Boot resource server protected by Keycloak. Every call
 * returns the status code and the headers that matter (Location, ETag,
 * Access-Control-Allow-*) so the demo console can show what the server
 * actually answered instead of only showing a happy path.
 *
 * Nothing here is a secret. The Keycloak client is a public client, which is
 * why the credentials flow is only used for this throwaway demo.
 */

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  "https://zero7-java-web-services-assignment-c30n.onrender.com";

export const KEYCLOAK_BASE =
  process.env.NEXT_PUBLIC_KEYCLOAK_URL ??
  "https://restaurant-keycloak.onrender.com";

export const REALM = "restaurant";
export const CLIENT_ID = "restaurant-api";

export const DEMO_SCOPES =
  "booking:read booking:write restaurant:read profile email";

export type DemoRole = "none" | "guest" | "staff" | "admin";

export type DemoUser = {
  username: string;
  label: string;
  note: string;
  roles: string;
};

export const DEMO_USERS: Record<"guest" | "staff" | "admin", DemoUser> = {
  guest: {
    username: "guest",
    label: "Gäst",
    note: "ROLL GUEST · scope booking:read + booking:write",
    roles: "GUEST",
  },
  staff: {
    username: "staff",
    label: "Personal",
    note: "ROLL STAFF · bekräftar och placerar gäster",
    roles: "STAFF",
  },
  admin: {
    username: "admin",
    label: "Administratör",
    note: "ROLL ADMIN · skapar och ändrar restauranger",
    roles: "ADMIN",
  },
};

export type TokenSession = {
  accessToken: string;
  username: string;
  roles: string[];
  scopes: string[];
  issuedAt: number;
  expiresAt: number;
};

export type ApiCall = {
  method: string;
  path: string;
  status: number;
  statusText: string;
  durationMs: number;
  location: string | null;
  etag: string | null;
  allowOrigin: string | null;
  allowCredentials: string | null;
  body: unknown;
  error: string | null;
};

export type Booking = {
  id: number;
  restaurantId: number | null;
  restaurantName: string | null;
  dateTime: string;
  partySize: number;
  guestName: string;
  guestEmail: string;
  status: string;
  _links?: Record<string, { href: string }>;
};

export type Restaurant = {
  id: number;
  name: string;
  city: string;
  cuisine: string;
  numberOfSeats: number;
};

type KeycloakClaims = {
  preferred_username?: string;
  realm_access?: { roles?: string[] };
  scope?: string;
  issued_at?: number;
  exp?: number;
};

function base64UrlDecode(input: string): string {
  const normalised = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalised.padEnd(Math.ceil(normalised.length / 4) * 4, "=");
  const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/**
 * Decodes a JWT payload locally. This is display only — the API is the one
 * that verifies the signature against the issuer.
 */
export function decodeClaims(token: string): KeycloakClaims {
  try {
    return JSON.parse(base64UrlDecode(token.split(".")[1]));
  } catch {
    return {};
  }
}

export async function fetchToken(username: string): Promise<TokenSession> {
  // Keycloak does not send Access-Control-Allow-Origin on the token response,
  // so the browser cannot call it directly. The Next.js route handler does the
  // call server side instead — see src/app/api/token/route.ts.
  const res = await fetch("/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password: username }),
    cache: "no-store",
  });

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (payload as { error_description?: string; error?: string }).error_description ??
        (payload as { error?: string }).error ??
        `Keycloak svarade ${res.status}`,
    );
  }

  const token = (payload as { access_token: string }).access_token;
  const claims = decodeClaims(token);
  const expiresIn = (payload as { expires_in?: number }).expires_in ?? 300;
  const now = Math.floor(Date.now() / 1000);

  return {
    accessToken: token,
    username: claims.preferred_username ?? username,
    roles: claims.realm_access?.roles?.filter((r) => r !== "default-roles-restaurant") ?? [],
    scopes:
      typeof (payload as { scope?: string }).scope === "string"
        ? ((payload as { scope: string }).scope.split(" "))
        : (claims.scope?.split(" ") ?? []),
    issuedAt: (claims.issued_at ?? now) * 1000,
    expiresAt: (claims.exp ?? now + expiresIn) * 1000,
  };
}

export async function request(opts: {
  method: string;
  path: string;
  token?: string | null;
  body?: unknown;
  ifNoneMatch?: string | null;
}): Promise<ApiCall> {
  const { method, path, token, body, ifNoneMatch } = opts;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (ifNoneMatch) headers["If-None-Match"] = ifNoneMatch;

  const started =
    typeof performance !== "undefined" ? performance.now() : Date.now();

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      mode: "cors",
      cache: "no-store",
    });

    const elapsed =
      typeof performance !== "undefined" ? performance.now() : Date.now();

    const text = await res.text();
    let parsed: unknown = null;
    if (text) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text.slice(0, 300);
      }
    }

    return {
      method,
      path,
      status: res.status,
      statusText: res.statusText,
      durationMs: Math.round(elapsed - started),
      location: res.headers.get("location"),
      etag: res.headers.get("etag"),
      allowOrigin: res.headers.get("access-control-allow-origin"),
      allowCredentials: res.headers.get("access-control-allow-credentials"),
      body: parsed,
      error: null,
    };
  } catch (err) {
    const elapsed =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    return {
      method,
      path,
      status: 0,
      statusText: "Network Error",
      durationMs: Math.round(elapsed - started),
      location: null,
      etag: null,
      allowOrigin: null,
      allowCredentials: null,
      body: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/** Builds the JSON body the API expects when creating a booking. */
export function bookingBody(input: {
  restaurantId: number;
  dateTime: string;
  partySize: number;
  guestName: string;
  guestEmail: string;
}) {
  return input;
}
