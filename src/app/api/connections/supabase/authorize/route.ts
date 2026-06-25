import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Kick off Supabase OAuth so the user authorizes Foundrr against THEIR Supabase
 * account. After approval Supabase redirects to our callback with a code.
 */
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const clientId = process.env.FOUNDRR_SUPABASE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(
      `${origin}/workspace?settings=connections&connect=supabase_error&reason=config`,
    );
  }

  const redirectUri =
    process.env.FOUNDRR_SUPABASE_REDIRECT_URI ??
    `${origin}/api/connections/supabase/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    state: "foundrr",
  });

  return NextResponse.redirect(`https://api.supabase.com/v1/oauth/authorize?${params}`);
}
