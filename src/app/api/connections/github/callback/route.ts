import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { encryptToken } from "@/lib/crypto";
import { stateCookieName, validateState } from "@/lib/oauth-state";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * GitHub OAuth callback. Exchanges the one-time code for an access token scoped
 * to the USER's GitHub account, stores it encrypted, and returns to the app.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");

  const fail = (reason: string, detail?: string) =>
    NextResponse.redirect(
      `${origin}/workspace?settings=connections&connect=github_error&reason=${reason}` +
        (detail ? `&detail=${encodeURIComponent(detail.slice(0, 140))}` : ""),
    );

  if (!code) return fail("no_code");

  // CSRF: the returned state must match the cookie set at authorize time.
  const cookieStore = await cookies();
  if (!validateState(cookieStore.get(stateCookieName("github"))?.value, returnedState)) {
    return fail("state");
  }

  const clientId = process.env.FOUNDRR_GITHUB_CLIENT_ID;
  const clientSecret = process.env.FOUNDRR_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) return fail("config");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(`${origin}/login?next=/workspace`);
  }

  let accessToken: string | null = null;
  let detail = "";
  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = (await res.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };
    accessToken = data.access_token ?? null;
    if (!accessToken) detail = data.error_description || data.error || `HTTP ${res.status}`;
  } catch {
    detail = "network";
  }

  if (!accessToken) return fail("token", detail);

  // Look up the username so pushes can target the right account.
  let login = "";
  try {
    const me = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "Foundrr",
      },
    });
    const meData = (await me.json()) as { login?: string };
    login = meData.login ?? "";
  } catch {
    /* username is best-effort */
  }

  let token_encrypted: string;
  try {
    token_encrypted = encryptToken(accessToken);
  } catch {
    return fail("encrypt");
  }

  const row = {
    owner_id: user.id,
    provider: "github",
    token_encrypted,
    meta: { login },
  };
  const { data: existing } = await supabase
    .from("connections")
    .select("id")
    .eq("owner_id", user.id)
    .eq("provider", "github")
    .maybeSingle();
  const result = existing
    ? await supabase.from("connections").update(row).eq("id", existing.id)
    : await supabase.from("connections").insert(row);
  if (result.error) return fail("save");

  return NextResponse.redirect(`${origin}/workspace?settings=connections&connected=github`);
}
