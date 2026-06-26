import crypto from "crypto";

/**
 * CSRF protection for the provider OAuth/connect flows. The authorize route mints
 * a random `state`, stores it in an httpOnly cookie, and sends it in the authorize
 * URL; the callback rejects the request unless the returned `state` matches the
 * cookie — stopping an attacker from linking THEIR provider account to a victim.
 */
const PREFIX = "foundrr_oauth_state_";

export function makeState(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function stateCookieName(provider: string): string {
  return `${PREFIX}${provider}`;
}

/** Constant-time comparison of the returned state against the cookie value. */
export function validateState(
  cookieValue: string | undefined,
  returned: string | null,
): boolean {
  if (!cookieValue || !returned) return false;
  const a = Buffer.from(cookieValue);
  const b = Buffer.from(returned);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
