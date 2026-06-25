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

  const clientId = process.env.FOUNDRR_VERCEL_CLIENT_ID;
  const clientSecret = process.env.FOUNDRR_VERCEL_CLIENT_SECRET;
  if (!code || !clientId || !clientSecret) {
    return NextResponse.redirect(`${origin}/workspace?connect=vercel_error`);
  }

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

  if (!accessToken) {
    return NextResponse.redirect(`${origin}/workspace?connect=vercel_error`);
  }

  const row = {
    owner_id: user.id,
    provider: "vercel",
    token_encrypted: encryptToken(accessToken),
    meta: { teamId: team, configurationId },
  };
  const { data: existing } = await supabase
    .from("connections")
    .select("id")
    .eq("owner_id", user.id)
    .eq("provider", "vercel")
    .maybeSingle();
  if (existing) {
    await supabase.from("connections").update(row).eq("id", existing.id);
  } else {
    await supabase.from("connections").insert(row);
  }

  return NextResponse.redirect(`${origin}/workspace?connected=vercel`);
}
