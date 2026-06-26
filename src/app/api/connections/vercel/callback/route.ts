import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { encryptToken } from "@/lib/crypto";
import { stateCookieName, validateState } from "@/lib/oauth-state";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Vercel OAuth callback. Exchanges the one-time code for an access token scoped
 * to the USER's Vercel account/team, stores it encrypted, and returns to the app.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const teamId = searchParams.get("teamId");
  const configurationId = searchParams.get("configurationId");

  // Always send failures to the Connections tab WITH a reason so the user (and we)
  // can see why it failed instead of it silently doing nothing.
  const fail = (reason: string, detail?: string) =>
    NextResponse.redirect(
      `${origin}/workspace?settings=connections&connect=vercel_error&reason=${reason}` +
        (detail ? `&detail=${encodeURIComponent(detail.slice(0, 140))}` : ""),
    );

  if (!code) return fail("no_code");

  // Best-effort CSRF: the Vercel integration install may not echo `state`, so
  // only enforce when it does (never block a legitimate connect that omits it).
  const returnedState = searchParams.get("state");
  if (returnedState) {
    const cookieStore = await cookies();
    if (!validateState(cookieStore.get(stateCookieName("vercel"))?.value, returnedState)) {
      return fail("state");
    }
  }

  const clientId = process.env.FOUNDRR_VERCEL_CLIENT_ID;
  const clientSecret = process.env.FOUNDRR_VERCEL_CLIENT_SECRET;
  if (!clientId || !clientSecret) return fail("config");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(`${origin}/login?next=/workspace`);
  }

  // redirect_uri MUST exactly match the Integration Console's Redirect URL. Pin it
  // via env to avoid www/non-www/origin mismatches (the usual cause of "token").
  const redirectUri =
    process.env.FOUNDRR_VERCEL_REDIRECT_URI ?? `${origin}/api/connections/vercel/callback`;
  let accessToken: string | null = null;
  let team: string | null = teamId;
  let detail = "";
  try {
    const res = await fetch("https://api.vercel.com/v2/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });
    const data = (await res.json()) as {
      access_token?: string;
      team_id?: string;
      error?: string;
      error_description?: string;
    };
    accessToken = data.access_token ?? null;
    team = data.team_id ?? teamId;
    if (!accessToken) detail = data.error_description || data.error || `HTTP ${res.status}`;
  } catch {
    detail = "network";
  }

  if (!accessToken) return fail("token", detail);

  let token_encrypted: string;
  try {
    token_encrypted = encryptToken(accessToken);
  } catch {
    return fail("encrypt");
  }

  const row = {
    owner_id: user.id,
    provider: "vercel",
    token_encrypted,
    meta: { teamId: team, configurationId },
  };
  const { data: existing } = await supabase
    .from("connections")
    .select("id")
    .eq("owner_id", user.id)
    .eq("provider", "vercel")
    .maybeSingle();
  const result = existing
    ? await supabase.from("connections").update(row).eq("id", existing.id)
    : await supabase.from("connections").insert(row);
  if (result.error) return fail("save");

  return NextResponse.redirect(`${origin}/workspace?settings=connections&connected=vercel`);
}
