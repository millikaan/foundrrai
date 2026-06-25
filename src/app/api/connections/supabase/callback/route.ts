import { NextResponse } from "next/server";

import { encryptToken } from "@/lib/crypto";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Supabase OAuth callback. Exchanges the code for an access token scoped to the
 * USER's Supabase account, finds their first project (ref), stores it encrypted.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  const fail = (reason: string) =>
    NextResponse.redirect(
      `${origin}/workspace?settings=connections&connect=supabase_error&reason=${reason}`,
    );

  if (!code) return fail("no_code");

  const clientId = process.env.FOUNDRR_SUPABASE_CLIENT_ID;
  const clientSecret = process.env.FOUNDRR_SUPABASE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return fail("config");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(`${origin}/login?next=/workspace`);
  }

  const redirectUri =
    process.env.FOUNDRR_SUPABASE_REDIRECT_URI ??
    `${origin}/api/connections/supabase/callback`;

  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch("https://api.supabase.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basic}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });
    const data = (await res.json()) as { access_token?: string; refresh_token?: string };
    accessToken = data.access_token ?? null;
    refreshToken = data.refresh_token ?? null;
  } catch {
    accessToken = null;
  }

  if (!accessToken) return fail("token");

  // Find the user's first project — its id is the ref the deploy flow needs.
  let ref: string | null = null;
  try {
    const pjRes = await fetch("https://api.supabase.com/v1/projects", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const projects = (await pjRes.json()) as Array<{ id?: string }>;
    if (Array.isArray(projects) && projects[0]?.id) ref = projects[0].id;
  } catch {
    /* ref stays null — deploy still works for the no-DB path */
  }

  const row = {
    owner_id: user.id,
    provider: "supabase",
    token_encrypted: encryptToken(accessToken),
    meta: { ref, refreshToken },
  };
  const { data: existing } = await supabase
    .from("connections")
    .select("id")
    .eq("owner_id", user.id)
    .eq("provider", "supabase")
    .maybeSingle();
  const result = existing
    ? await supabase.from("connections").update(row).eq("id", existing.id)
    : await supabase.from("connections").insert(row);
  if (result.error) return fail("save");

  return NextResponse.redirect(`${origin}/workspace?settings=connections&connected=supabase`);
}
