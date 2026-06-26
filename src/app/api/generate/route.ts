import { NextResponse } from "next/server";
import OpenAI from "openai";

import {
  BUILD_FALLBACK_MODEL,
  BUILD_SYSTEM,
  CHAT_SYSTEM,
  CREDIT_COSTS,
  EDIT_SYSTEM,
  FIX_SYSTEM,
  MODELS,
  PLAN_SYSTEM,
  type GenerateMode,
} from "@/lib/ai/engine";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 120;

interface GenerateBody {
  mode?: GenerateMode;
  prompt?: string;
  siteId?: string;
  files?: Array<{ path: string; content: string }>;
  logoUrl?: string;
  docs?: Array<{ name: string; content: string }>;
  knowledge?: string;
}

const VALID_MODES: ReadonlyArray<GenerateMode> = ["plan", "build", "edit", "fix", "chat"];

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: GenerateBody;
  try {
    body = (await request.json()) as GenerateBody;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const mode = body.mode;
  const prompt = (body.prompt ?? "").trim();
  if (!mode || !VALID_MODES.includes(mode)) {
    return NextResponse.json({ error: "Yanlış rejim." }, { status: 400 });
  }
  if (!prompt) {
    return NextResponse.json({ error: "Mətn boşdur." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY konfiqurasiya olunmayıb." },
      { status: 503 },
    );
  }

  // Credits — atomically deducted up-front (race-free), refunded on any failure.
  const cost = CREDIT_COSTS[mode];
  let creditsAfter = 0;
  if (cost > 0) {
    const { data: deducted, error: deductError } = await supabase.rpc("deduct_credits", {
      p_cost: cost,
    });
    if (deductError) {
      return NextResponse.json({ error: "Kredit yoxlanıla bilmədi." }, { status: 500 });
    }
    if (deducted === null || deducted === undefined) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();
      return NextResponse.json(
        { error: "Kredit kifayət etmir.", credits: profile?.credits ?? 0 },
        { status: 402 },
      );
    }
    creditsAfter = deducted as number;
  }
  const refundCredits = async () => {
    if (cost <= 0) return;
    try {
      await createAdminClient().rpc("increment_credits", { p_user: user.id, p_delta: cost });
    } catch {
      /* best-effort refund */
    }
  };

  const docExtras = (body.docs ?? [])
    .map((d) => `# ${d.name}\n${d.content}`)
    .join("\n\n");
  const knowledge = (body.knowledge ?? "").trim();
  const extrasSuffix =
    (body.logoUrl
      ? `\n\nİstifadəçinin loqosu (şəkil URL): ${body.logoUrl} — bu loqonu saytın header-ində logo kimi istifadə et.`
      : "") +
    (docExtras ? `\n\nƏlavə sənədlər (kontekst üçün):\n${docExtras}` : "") +
    (knowledge
      ? `\n\nLAYİHƏ BİLİYİ / QAYDALARI — bunları HƏMİŞƏ tətbiq et (rəng, ton, brend, məzmun qaydaları):\n${knowledge}`
      : "");

  const openai = new OpenAI({ apiKey });

  try {
    if (mode === "plan") {
      const completion = await openai.chat.completions.create({
        model: MODELS.plan,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: PLAN_SYSTEM },
          { role: "user", content: prompt + extrasSuffix },
        ],
      });
      const parsed = JSON.parse(
        completion.choices[0]?.message?.content ?? "{}",
      ) as { plan?: string[]; needsLogo?: boolean };

      return NextResponse.json({
        plan: parsed.plan ?? [],
        needsLogo: parsed.needsLogo ?? true,
        credits: creditsAfter,
      });
    }

    if (mode === "chat") {
      const completion = await openai.chat.completions.create({
        model: MODELS.chat,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: CHAT_SYSTEM },
          {
            role: "user",
            content:
              (body.files
                ? `Cari fayllar (kontekst):\n${JSON.stringify(body.files).slice(0, 30000)}\n\n`
                : "") +
              `Sual: ${prompt}` +
              extrasSuffix,
          },
        ],
      });
      const parsed = JSON.parse(
        completion.choices[0]?.message?.content ?? "{}",
      ) as { reply?: string };
      return NextResponse.json({ reply: parsed.reply ?? "—", credits: creditsAfter });
    }

    // build | edit
    const system =
      mode === "build" ? BUILD_SYSTEM : mode === "fix" ? FIX_SYSTEM : EDIT_SYSTEM;
    const model =
      mode === "build" ? MODELS.build : mode === "fix" ? MODELS.fix : MODELS.edit;
    const userContent =
      ((mode === "edit" || mode === "fix") && body.files
        ? `Cari fayllar:\n${JSON.stringify(body.files)}\n\nTapşırıq: ${prompt}`
        : prompt) + extrasSuffix;

    const messages = [
      { role: "system" as const, content: system },
      { role: "user" as const, content: userContent },
    ];
    let completion;
    try {
      completion = await openai.chat.completions.create({
        model,
        response_format: { type: "json_object" },
        messages,
      });
    } catch (modelError) {
      // The powerful build model may be unavailable on this account — fall back
      // to a known-good model so a full build never hard-fails on a bad model id.
      if (mode === "build" && model !== BUILD_FALLBACK_MODEL) {
        completion = await openai.chat.completions.create({
          model: BUILD_FALLBACK_MODEL,
          response_format: { type: "json_object" },
          messages,
        });
      } else {
        throw modelError;
      }
    }
    const parsed = JSON.parse(
      completion.choices[0]?.message?.content ?? "{}",
    ) as {
      name?: string;
      schema?: string;
      files?: Array<{ path: string; content: string }>;
    };
    const files = Array.isArray(parsed.files) ? parsed.files : [];
    const schema = typeof parsed.schema === "string" ? parsed.schema.trim() : "";
    if (files.length === 0) {
      await refundCredits();
      return NextResponse.json({ error: "Sayt yaradıla bilmədi." }, { status: 502 });
    }

    let siteId = body.siteId;
    if (mode === "build") {
      const { data: site, error: insertError } = await supabase
        .from("sites")
        .insert({
          owner_id: user.id,
          name: parsed.name ?? "Yeni sayt",
          prompt,
          status: "built",
          schema: schema || null,
        })
        .select("id")
        .single();
      if (insertError || !site?.id) {
        // Don't charge for a build we failed to save.
        await refundCredits();
        return NextResponse.json({ error: "Sayt yadda saxlanmadı." }, { status: 500 });
      }
      siteId = site.id;
    } else if (mode === "edit" && siteId && schema) {
      // An edit that introduces/extends the backend updates the stored schema.
      await supabase.from("sites").update({ schema }).eq("id", siteId).eq("owner_id", user.id);
    }

    if (siteId) {
      for (const file of files) {
        await supabase
          .from("files")
          .upsert(
            { site_id: siteId, path: file.path, content: file.content },
            { onConflict: "site_id,path" },
          );
      }
      if (mode !== "fix") {
        await supabase
          .from("messages")
          .insert({ site_id: siteId, role: "user", content: prompt });

        // Snapshot the full current file tree as a restorable checkpoint/version.
        const { data: snapshot } = await supabase
          .from("files")
          .select("path,content")
          .eq("site_id", siteId);
        await supabase.from("checkpoints").insert({
          site_id: siteId,
          label: mode === "build" ? (parsed.name ?? "İlk versiya") : prompt.slice(0, 80),
          files: snapshot ?? files,
        });
      }
    }

    return NextResponse.json({
      siteId,
      name: parsed.name,
      files,
      credits: creditsAfter,
    });
  } catch {
    await refundCredits();
    return NextResponse.json({ error: "Generasiya xətası baş verdi." }, { status: 500 });
  }
}
