import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/** Hard cap so a runaway conversation can't bloat the row (metadata only, ~tiny). */
const MAX_BYTES = 400_000;

/** Read a project's saved conversation (full chat thread) for cross-device restore. */
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  const siteId = new URL(request.url).searchParams.get("siteId");
  if (!siteId) return NextResponse.json({ conversation: null });

  const { data } = await supabase
    .from("sites")
    .select("conversation")
    .eq("id", siteId)
    .eq("owner_id", user.id)
    .maybeSingle();

  return NextResponse.json({ conversation: data?.conversation ?? null });
}

/** Save a project's full conversation so any device restores the same thread. */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: { siteId?: string; blocks?: unknown[]; phase?: string; updatedAt?: number };
  try {
    body = (await request.json()) as {
      siteId?: string;
      blocks?: unknown[];
      phase?: string;
      updatedAt?: number;
    };
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const { siteId, phase } = body;
  if (!siteId || !Array.isArray(body.blocks)) {
    return NextResponse.json({ error: "Yanlış məlumat." }, { status: 400 });
  }

  // Never store a transient animation phase — those would restore "stuck".
  const safePhase = phase === "plan" || phase === "error" ? phase : "built";
  const updatedAt = typeof body.updatedAt === "number" ? body.updatedAt : Date.now();
  const conversation = { blocks: body.blocks, phase: safePhase, updatedAt };
  if (JSON.stringify(conversation).length > MAX_BYTES) {
    // Too large to store — keep the existing snapshot rather than failing the build.
    return NextResponse.json({ ok: false, reason: "too_large" });
  }

  const { error } = await supabase
    .from("sites")
    .update({ conversation })
    .eq("id", siteId)
    .eq("owner_id", user.id);
  if (error) {
    return NextResponse.json({ error: "Yadda saxlanmadı." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
