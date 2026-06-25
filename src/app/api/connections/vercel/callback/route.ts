import { NextResponse } from "next/server";

import { encryptToken } from "@/lib/crypto";
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
  const fail = (reason: string) =>
    NextResponse.redirect(
      `${origin}/workspace?settings=connections&connect=vercel_error&reason=${reason}`,
    );

  if (!code) return fail("no_code");

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

  const redirectUri = `${origin}/api/connections/vercel/callback`;
  let accessToken: string | null = null;
  let team: string | null = teamId;
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
    const data = (await res.json()) as { access_token?: string; team_id?: string };
    accessToken = data.access_token ?? null;
    team = data.team_id ?? teamId;
  } catch {
    accessToken = null;
  }

  if (!accessToken) return fail("token");

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
