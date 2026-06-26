import { NextResponse } from "next/server";

import { getConnection, getFreshSupabaseToken } from "@/lib/connections";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 120;

interface DeployBody {
  siteId?: string;
  title?: string;
  description?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Inject SEO title + description into the site's index.html before deploying. */
function applySeo(
  files: Array<{ file: string; data: string }>,
  title?: string,
  description?: string,
): void {
  if (!title && !description) return;
  const idx = files.find((f) => f.file === "index.html");
  if (!idx) return;
  let html = idx.data;
  if (title) {
    const t = `<title>${escapeHtml(title)}</title>`;
    html = /<title>[\s\S]*?<\/title>/i.test(html)
      ? html.replace(/<title>[\s\S]*?<\/title>/i, t)
      : html.replace(/<head>/i, `<head>\n    ${t}`);
  }
  if (description) {
    const m = `<meta name="description" content="${escapeHtml(description)}" />`;
    html = /<meta\s+name=["']description["'][^>]*>/i.test(html)
      ? html.replace(/<meta\s+name=["']description["'][^>]*>/i, m)
      : html.replace(/<head>/i, `<head>\n    ${m}`);
  }
  idx.data = html;
}

/** Schema created on the user's own Supabase so generated forms can store leads. */
const LEADS_SQL = `
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  message text,
  created_at timestamptz default now()
);
alter table public.leads enable row level security;
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'leads' and policyname = 'leads_insert_anon'
  ) then
    create policy "leads_insert_anon" on public.leads for insert to anon with check (true);
  end if;
end $$;
`;

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: DeployBody;
  try {
    body = (await request.json()) as DeployBody;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }
  const siteId = body.siteId;
  if (!siteId) {
    return NextResponse.json({ error: "Sayt seçilməyib." }, { status: 400 });
  }

  const { data: site } = await supabase
    .from("sites")
    .select("name, schema")
    .eq("id", siteId)
    .eq("owner_id", user.id)
    .single();
  if (!site) {
    return NextResponse.json({ error: "Sayt tapılmadı." }, { status: 404 });
  }

  const { data: fileRows } = await supabase
    .from("files")
    .select("path, content")
    .eq("site_id", siteId);
  const files = (fileRows ?? []).map((f) => ({
    file: f.path as string,
    data: f.content as string,
  }));
  if (files.length === 0) {
    return NextResponse.json({ error: "Sayt faylları tapılmadı." }, { status: 400 });
  }

  // Apply the user's SEO title/description to index.html before deploying.
  applySeo(files, body.title?.trim(), body.description?.trim());

  const vercel = await getConnection(supabase, user.id, "vercel");
  if (!vercel) {
    return NextResponse.json(
      { error: "Əvvəlcə Vercel hesabını qoş (Parametrlər → Bağlantılar)." },
      { status: 400 },
    );
  }

  // ── Optional: push the database schema to the user's own Supabase + inject keys ──
  const env: Record<string, string> = {};
  // Refresh the Management-API token first — the OAuth access token expires ~1h
  // after connecting, which would otherwise silently break the DB wiring.
  const supa = await getFreshSupabaseToken(supabase, user.id);
  const ref = supa?.ref;
  if (supa && ref) {
    try {
      // Always ensure the leads table, then run the app's own backend schema if any.
      const siteSchema = (site.schema as string | null)?.trim();
      const query = siteSchema ? `${LEADS_SQL}\n\n${siteSchema}` : LEADS_SQL;
      await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
        method: "POST",
        headers: { Authorization: `Bearer ${supa.token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const keysRes = await fetch(`https://api.supabase.com/v1/projects/${ref}/api-keys`, {
        headers: { Authorization: `Bearer ${supa.token}` },
      });
      const keys = (await keysRes.json()) as Array<{ name: string; api_key: string }>;
      const anon = Array.isArray(keys) ? keys.find((k) => k.name === "anon")?.api_key : undefined;
      if (anon) {
        env.VITE_SUPABASE_URL = `https://${ref}.supabase.co`;
        env.VITE_SUPABASE_ANON_KEY = anon;
      }
    } catch {
      /* DB push is best-effort — the site still deploys */
    }
  }

  // ── Deploy the project to the user's Vercel account ──
  const teamId = vercel.meta?.teamId as string | undefined;
  const deployEndpoint = `https://api.vercel.com/v13/deployments${teamId ? `?teamId=${teamId}` : ""}`;
  const name =
    (site.name as string).toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 40) || "foundrr-sayt";

  const deployBody: Record<string, unknown> = {
    name,
    files,
    projectSettings: { framework: "vite" },
    target: "production",
  };
  if (Object.keys(env).length > 0) {
    deployBody.build = { env };
    deployBody.env = env;
  }

  let liveUrl: string | null = null;
  try {
    const res = await fetch(deployEndpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${vercel.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(deployBody),
    });
    const data = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.message ?? "Vercel yayımlama xətası." },
        { status: 502 },
      );
    }
    liveUrl = data.url ? `https://${data.url}` : null;
  } catch {
    return NextResponse.json({ error: "Yayımlama alınmadı." }, { status: 502 });
  }

  // Persist the Supabase keys on the user's Vercel PROJECT so they survive future
  // redeploys (the Supabase ↔ Vercel link). Best-effort, upserted.
  if (liveUrl && Object.keys(env).length > 0) {
    const envEndpoint = `https://api.vercel.com/v10/projects/${name}/env?upsert=true${
      teamId ? `&teamId=${teamId}` : ""
    }`;
    await Promise.all(
      Object.entries(env).map(([key, value]) =>
        fetch(envEndpoint, {
          method: "POST",
          headers: { Authorization: `Bearer ${vercel.token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            key,
            value,
            type: "encrypted",
            target: ["production", "preview", "development"],
          }),
        }).catch(() => {}),
      ),
    );
  }

  if (liveUrl) {
    await supabase
      .from("sites")
      .update({ deploy_provider: "vercel", deploy_url: liveUrl, status: "deployed" })
      .eq("id", siteId);
  }

  return NextResponse.json({ url: liveUrl });
}
