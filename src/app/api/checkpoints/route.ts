import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

interface ProjectFile {
  path: string;
  content: string;
}

async function ownsSite(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  siteId: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("sites")
    .select("id")
    .eq("id", siteId)
    .eq("owner_id", userId)
    .maybeSingle();
  return !!data;
}

/** List the saved versions (checkpoints) for a site, newest first. */
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  const siteId = new URL(request.url).searchParams.get("siteId");
  if (!siteId || !(await ownsSite(supabase, user.id, siteId))) {
    return NextResponse.json({ checkpoints: [] });
  }

  const { data } = await supabase
    .from("checkpoints")
    .select("id, label, created_at")
    .eq("site_id", siteId)
    .order("created_at", { ascending: false })
    .limit(40);

  return NextResponse.json({ checkpoints: data ?? [] });
}

/** Restore a site's files to a previous checkpoint snapshot. */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: { siteId?: string; checkpointId?: string };
  try {
    body = (await request.json()) as { siteId?: string; checkpointId?: string };
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const { siteId, checkpointId } = body;
  if (!siteId || !checkpointId || !(await ownsSite(supabase, user.id, siteId))) {
    return NextResponse.json({ error: "Tapılmadı." }, { status: 404 });
  }

  // Atomic restore — the RPC deletes + reinserts the snapshot in ONE transaction,
  // so a mid-restore failure rolls back and the original tree is never lost.
  const { data, error } = await supabase.rpc("restore_checkpoint", {
    p_site_id: siteId,
    p_checkpoint_id: checkpointId,
  });
  if (error) {
    return NextResponse.json({ error: "Bərpa alınmadı." }, { status: 500 });
  }
  const files = (data as ProjectFile[] | null) ?? null;
  if (!files || files.length === 0) {
    return NextResponse.json({ error: "Versiya boşdur." }, { status: 400 });
  }

  return NextResponse.json({ files });
}
