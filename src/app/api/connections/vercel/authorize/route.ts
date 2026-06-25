import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Kick off the Vercel OAuth/Integration flow so the user authorizes Foundrr to
 * deploy into THEIR Vercel account. After they approve, Vercel redirects to the
 * integration's configured Redirect URL: /api/connections/vercel/callback.
 */
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const slug = process.env.FOUNDRR_VERCEL_INTEGRATION_SLUG;

  if (!slug) {
    return NextResponse.redirect(`${origin}/workspace?connect=vercel_unconfigured`);
  }

  return NextResponse.redirect(`https://vercel.com/integrations/${slug}/new`);
}
