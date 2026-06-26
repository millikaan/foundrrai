import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session on every request (so server components
 * see a valid user) and protects the workspace from logged-out visitors.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // OAuth / magic-link can land the `?code=` on the wrong path (e.g. the Supabase
  // Site URL root) — forward it to the callback so the session gets exchanged.
  // API routes own their `?code=` (e.g. the Vercel integration callback), so never
  // hijack those — otherwise the provider's code gets sent to the Supabase handler.
  const authCode = request.nextUrl.searchParams.get("code");
  if (
    authCode &&
    request.nextUrl.pathname !== "/auth/callback" &&
    !request.nextUrl.pathname.startsWith("/api/")
  ) {
    const callbackUrl = request.nextUrl.clone();
    callbackUrl.pathname = "/auth/callback";
    return NextResponse.redirect(callbackUrl);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect the workspace.
  if (!user && request.nextUrl.pathname.startsWith("/workspace")) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged-in users skip the auth screens — but honor a safe `next` target
  // (so e.g. a Remix link still opens the builder instead of dropping it).
  if (
    user &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup")
  ) {
    const nextParam = request.nextUrl.searchParams.get("next");
    // Only same-origin relative paths — reject protocol-relative (//host) and
    // backslash tricks so `next` can't become an open redirect.
    const safeNext =
      nextParam &&
      nextParam.startsWith("/") &&
      !nextParam.startsWith("//") &&
      !nextParam.startsWith("/\\")
        ? nextParam
        : "/workspace";
    return NextResponse.redirect(new URL(safeNext, request.url));
  }

  return response;
}
