// Lightweight gate for the owner-only /dashboard. Not hardened auth — it guards
// low-sensitivity personal metrics (your own repos' GitHub stats), so a single
// shared password (DASHBOARD_PASSWORD env var) is enough. The cookie stores a
// SHA-256 token of the password, never the password itself.
//
// Uses Web Crypto so the same code runs in edge middleware and node routes.

export const DASH_COOKIE = "dash_auth";

export async function authToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`portfolio-dash:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
