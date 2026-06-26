import type { SupabaseClient } from "@supabase/supabase-js";

import { decryptToken, encryptToken } from "@/lib/crypto";

export interface ProviderConnection {
  token: string;
  meta: Record<string, unknown>;
}

/** Server-side: fetch + decrypt a user's stored provider token (or null). */
export async function getConnection(
  supabase: SupabaseClient,
  userId: string,
  provider: "vercel" | "netlify" | "supabase" | "github",
): Promise<ProviderConnection | null> {
  const { data } = await supabase
    .from("connections")
    .select("token_encrypted, meta")
    .eq("owner_id", userId)
    .eq("provider", provider)
    .maybeSingle();

  if (!data?.token_encrypted) return null;
  try {
    return {
      token: decryptToken(data.token_encrypted as string),
      meta: (data.meta as Record<string, unknown>) ?? {},
    };
  } catch {
    return null;
  }
}

/**
 * Returns a FRESH Supabase Management-API access token + project ref. The OAuth
 * access token expires ~1h after connecting, so we exchange the stored (encrypted)
 * refresh token first and persist the rotated tokens. Falls back to the existing
 * access token if a refresh isn't possible, so it never makes things worse.
 */
export async function getFreshSupabaseToken(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ token: string; ref?: string } | null> {
  const conn = await getConnection(supabase, userId, "supabase");
  if (!conn) return null;

  const ref = conn.meta?.ref as string | undefined;
  const clientId = process.env.FOUNDRR_SUPABASE_CLIENT_ID;
  const clientSecret = process.env.FOUNDRR_SUPABASE_CLIENT_SECRET;
  const encryptedRefresh = conn.meta?.refreshToken as string | undefined;

  // No creds / no stored refresh token → use the access token as-is (best effort).
  if (!clientId || !clientSecret || !encryptedRefresh) {
    return { token: conn.token, ref };
  }

  let refreshToken: string;
  try {
    refreshToken = decryptToken(encryptedRefresh);
  } catch {
    return { token: conn.token, ref };
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch("https://api.supabase.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basic}`,
      },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    });
    if (!res.ok) return { token: conn.token, ref };
    const data = (await res.json()) as { access_token?: string; refresh_token?: string };
    if (!data.access_token) return { token: conn.token, ref };

    // Supabase rotates the refresh token on use — persist both, encrypted.
    await supabase
      .from("connections")
      .update({
        token_encrypted: encryptToken(data.access_token),
        meta: {
          ...conn.meta,
          refreshToken: data.refresh_token ? encryptToken(data.refresh_token) : encryptedRefresh,
        },
      })
      .eq("owner_id", userId)
      .eq("provider", "supabase");

    return { token: data.access_token, ref };
  } catch {
    return { token: conn.token, ref };
  }
}
