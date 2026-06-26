import { NextResponse } from "next/server";

import { encryptToken } from "@/lib/crypto";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const PROVIDERS = ["vercel", "netlify", "supabase"] as const;
type Provider = (typeof PROVIDERS)[number];

interface ConnectionBody {
  provider?: string;
  token?: string;
  meta?: Record<string, unknown>;
}

/** List which providers the user has connected (never returns the tokens). */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  // Return ONLY the provider name — never meta (which can carry secrets like an
  // encrypted/raw refresh token). The UI only needs to know what's connected.
  const { data } = await supabase
    .from("connections")
    .select("provider")
    .eq("owner_id", user.id);

  return NextResponse.json({ connections: data ?? [] });
}

/** Save (encrypted) a provider token + metadata for the current user. */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: ConnectionBody;
  try {
    body = (await request.json()) as ConnectionBody;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const provider = body.provider as Provider;
  const token = (body.token ?? "").trim();
  if (!PROVIDERS.includes(provider)) {
    return NextResponse.json({ error: "Yanlış provayder." }, { status: 400 });
  }
  if (!token) {
    return NextResponse.json({ error: "Token boşdur." }, { status: 400 });
  }

  let token_encrypted: string;
  try {
    token_encrypted = encryptToken(token);
  } catch {
    return NextResponse.json({ error: "Şifrələmə açarı konfiqurasiya olunmayıb." }, { status: 503 });
  }

  const row = {
    owner_id: user.id,
    provider,
    token_encrypted,
    meta: body.meta ?? {},
  };

  // Upsert by (owner_id, provider) without relying on a DB unique constraint.
  const { data: existing } = await supabase
    .from("connections")
    .select("id")
    .eq("owner_id", user.id)
    .eq("provider", provider)
    .maybeSingle();

  const result = existing
    ? await supabase.from("connections").update(row).eq("id", existing.id)
    : await supabase.from("connections").insert(row);

  if (result.error) {
    return NextResponse.json({ error: "Bağlantı yadda saxlanmadı." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, provider });
}
