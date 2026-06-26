import { NextResponse } from "next/server";

import { makeState, stateCookieName } from "@/lib/oauth-state";

export const runtime = "nodejs";

/**
 * Kick off GitHub OAuth so the user authorizes Foundrr to push the generated
 * project into a repo on THEIR account. After approval GitHub redirects to
 * /api/connections/github/callback.
 */
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const clientId = process.env.FOUNDRR_GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(`${origin}/workspace?connect=github_unconfigured`);
  }

  const redirectUri =
    process.env.FOUNDRR_GITHUB_REDIRECT_URI ?? `${origin}/api/connections/github/callback`;

  const state = makeState();
  const url =
    `https://github.com/login/oauth/authorize?` +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "repo",
      allow_signup: "true",
      state,
    }).toString();

  const res = NextResponse.redirect(url);
  res.cookies.set(stateCookieName("github"), state, {
    httpOnly: true,
    secure: new URL(request.url).protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}
