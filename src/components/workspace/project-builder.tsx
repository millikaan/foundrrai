"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Check,
  Coins,
  Eye,
  FileText,
  History,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  type Block,
  type BuildSession,
  type Phase,
  clearSession,
  loadSession,
  makeId,
  saveSession,
  toFileChanges,
} from "@/lib/workspace/build-session";
import { BuildLog } from "@/components/workspace/build-log";
import { CheckpointsPanel } from "@/components/workspace/checkpoints-panel";
import { KnowledgePanel } from "@/components/workspace/knowledge-panel";
import { PreviewPane } from "@/components/workspace/preview-pane";
import { PublishPanel } from "@/components/workspace/publish-panel";
import { getTemplate } from "@/lib/templates";

const PROMPT_STORAGE_KEY = "foundrr:prompt";
const BUILD_COST = 85;

interface ProjectFile {
  path: string;
  content: string;
}

const THINKING_STEPS = [
  "İstəyini oxuyuram…",
  "Biznes növünü müəyyən edirəm…",
  "Uyğun bölmələri və məzmunu araşdırıram…",
  "Planı hazırlayıram…",
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function errMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Xəta baş verdi.";
}

async function callGenerate(payload: Record<string, unknown>) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Xəta baş verdi.");
  return data;
}

async function fetchFiles(
  supabase: ReturnType<typeof createClient>,
  siteId: string,
): Promise<ProjectFile[]> {
  const { data } = await supabase
    .from("files")
    .select("path,content")
    .eq("site_id", siteId);
  return (data ?? []).map((d) => ({ path: d.path as string, content: d.content as string }));
}

/** Re-settle transient block states after restoring a thread; drop empty replies
 *  (an interrupted stream would otherwise restore as a stuck "typing" bubble). */
function normalizeBlocks(blocks: Block[]): Block[] {
  return blocks
    .filter((b) => !(b.type === "reply" && !b.text.trim()))
    .map((b) => {
      if (b.type === "thinking") return { ...b, activeIndex: -1 };
      if (b.type === "build" || b.type === "edit")
        return { ...b, revealed: b.files.length, done: true };
      return b;
    });
}

/** A restored phase must be a settled one — never a driverless animation state. */
function clampPhase(p: Phase | undefined): Phase {
  if (p === "thinking" || p === "building") return "built";
  return p ?? "built";
}

export function ProjectBuilder({ credits: initialCredits }: { credits: number }) {
  const router = useRouter();
  const [prompt, setPrompt] = React.useState("");
  const [phase, setPhase] = React.useState<Phase>("thinking");
  const [blocks, setBlocks] = React.useState<Block[]>([]);
  const [files, setFiles] = React.useState<ProjectFile[]>([]);
  const [activeFile, setActiveFile] = React.useState<string | null>(null);
  const [siteId, setSiteId] = React.useState<string | null>(null);
  const [siteName, setSiteName] = React.useState("Yeni sayt");
  const [credits, setCredits] = React.useState(initialCredits);
  const [refine, setRefine] = React.useState("");
  const [busy, setBusy] = React.useState(true);
  const [logoUrl, setLogoUrl] = React.useState<string | null>(null);
  const [docs, setDocs] = React.useState<{ name: string; content: string }[]>([]);
  const [attaching, setAttaching] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const refineRef = React.useRef<HTMLTextAreaElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const started = React.useRef(false);
  const ready = React.useRef(false);
  // True once the shown conversation has been reconciled with the DB copy — gates
  // DB writes so a stale localStorage thread can't overwrite a newer one.
  const convoSyncedRef = React.useRef(false);
  const buildStartedAt = React.useRef<number | null>(null);
  const fixingRef = React.useRef(false);
  const fixAttemptsRef = React.useRef(0);
  const fixGaveUpRef = React.useRef(false);
  const [publishOpen, setPublishOpen] = React.useState(false);
  const [versionsOpen, setVersionsOpen] = React.useState(false);
  const [mobileView, setMobileView] = React.useState<"chat" | "preview">("chat");
  const [mode, setMode] = React.useState<"agent" | "chat">("agent");
  const [knowledge, setKnowledge] = React.useState("");
  const [knowledgeOpen, setKnowledgeOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close the header overflow menu on outside-click / Escape.
  React.useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /** Restore the live project to a previous checkpoint's file tree. */
  const restoreCheckpoint = (restored: ProjectFile[]) => {
    if (restored.length === 0) return;
    setFiles(restored);
    setActiveFile(restored[0]?.path ?? null);
    setBlocks((prev) => [
      ...prev,
      { id: makeId(), type: "note", text: "Əvvəlki versiya bərpa olundu.", tone: "ok" },
    ]);
  };

  // On mobile, jump to the preview once the site is built so they see the result.
  React.useEffect(() => {
    if (phase === "built") setMobileView("preview");
  }, [phase]);

  // Load this project's saved knowledge / custom instructions.
  React.useEffect(() => {
    if (!siteId) return;
    fetch(`/api/sites/knowledge?siteId=${siteId}`)
      .then((r) => r.json())
      .then((d: { knowledge?: string }) => setKnowledge(d.knowledge ?? ""))
      .catch(() => {});
  }, [siteId]);

  // Debounced per-file persistence for direct edits (code editor + inline text).
  const saveTimers = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const persistFile = React.useCallback(
    (path: string, content: string) => {
      const sid = siteId;
      if (!sid) return;
      const timers = saveTimers.current;
      const existing = timers.get(path);
      if (existing) clearTimeout(existing);
      timers.set(
        path,
        setTimeout(() => {
          timers.delete(path);
          fetch("/api/files", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ siteId: sid, path, content }),
          }).catch(() => {});
        }, 700),
      );
    },
    [siteId],
  );

  /** Live edit from the in-browser code editor (#2) — update preview + persist. */
  const editFileContent = (path: string, content: string) => {
    setFiles((prev) => prev.map((f) => (f.path === path ? { ...f, content } : f)));
    persistFile(path, content);
  };

  /** Inline visual text edit (#5) — replace exact copy across the project (free). */
  const applyTextReplace = (from: string, to: string) => {
    const oldText = from.trim();
    const newText = to.trim();
    if (!oldText || oldText === newText) return;
    const next = files.map((f) =>
      f.content.includes(oldText)
        ? { ...f, content: f.content.split(oldText).join(newText) }
        : f,
    );
    const changed = next.filter((f, i) => f.content !== files[i]?.content);
    if (changed.length === 0) return;
    setFiles(next);
    changed.forEach((f) => persistFile(f.path, f.content));
    setBlocks((prev) => [
      ...prev,
      {
        id: makeId(),
        type: "note",
        text: `Mətn dəyişdirildi: “${oldText.slice(0, 36)}” → “${newText.slice(0, 36)}”`,
        tone: "ok",
      },
    ]);
  };

  /** User clicked an element in the preview — target it in the chat for an edit. */
  const onElementPick = (info: { text: string; tag: string }) => {
    const label = info.text ? `“${info.text}”` : `bu ${info.tag || "element"}`;
    setRefine(`${label} hissəsini dəyiş: `);
    setMobileView("chat");
    setTimeout(() => {
      const el = refineRef.current;
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    }, 60);
  };

  /** Immutably patch a single block by id. */
  const patchBlock = React.useCallback(
    (id: string, fn: (block: Block) => Block) => {
      setBlocks((prev) => prev.map((b) => (b.id === id ? fn(b) : b)));
    },
    [],
  );

  /** Reveal generated files one-by-one for the "streaming" feel. */
  const revealFiles = React.useCallback(
    async (id: string, total: number) => {
      const per = Math.max(120, Math.min(260, Math.round(2600 / Math.max(total, 1))));
      for (let i = 1; i <= total; i += 1) {
        patchBlock(id, (b) =>
          b.type === "build" || b.type === "edit" ? { ...b, revealed: i } : b,
        );
        await sleep(per);
      }
      patchBlock(id, (b) =>
        b.type === "build" || b.type === "edit"
          ? { ...b, revealed: total, done: true }
          : b,
      );
    },
    [patchBlock],
  );

  /** Animate the "thinking" steps, then call the plan API. Appends a thinking + plan block. */
  const continuePlan = React.useCallback(
    async (text: string) => {
      setBusy(true);
      setPhase("thinking");
      const thinkId = makeId();
      setBlocks((prev) => [
        ...prev,
        { id: thinkId, type: "thinking", steps: [], activeIndex: 0 },
      ]);
      for (let i = 0; i < THINKING_STEPS.length; i += 1) {
        patchBlock(thinkId, (b) =>
          b.type === "thinking"
            ? { ...b, steps: THINKING_STEPS.slice(0, i + 1), activeIndex: i }
            : b,
        );
        await sleep(700 + Math.random() * 450);
      }
      patchBlock(thinkId, (b) =>
        b.type === "thinking" ? { ...b, activeIndex: -1 } : b,
      );
      try {
        const data = await callGenerate({ mode: "plan", prompt: text });
        if (typeof data.credits === "number") setCredits(data.credits);
        setBlocks((prev) => [
          ...prev,
          {
            id: makeId(),
            type: "plan",
            steps: Array.isArray(data.plan) ? data.plan : [],
          },
        ]);
        setPhase("plan");
      } catch (error) {
        setBlocks((prev) => [
          ...prev,
          { id: makeId(), type: "note", text: errMessage(error), tone: "err" },
        ]);
        setPhase("error");
      } finally {
        setBusy(false);
      }
    },
    [patchBlock],
  );

  const startFromPrompt = React.useCallback(
    async (text: string) => {
      setPrompt(text);
      setBlocks([{ id: makeId(), type: "user", text }]);
      await continuePlan(text);
    },
    [continuePlan],
  );

  /** Load a previously built site straight from Supabase (e.g. opened from dashboard). */
  const openSite = React.useCallback(
    async (id: string) => {
      setBusy(true);
      try {
        const supabase = createClient();
        const { data: site } = await supabase
          .from("sites")
          .select("name,prompt,conversation")
          .eq("id", id)
          .single();
        const projectFiles = await fetchFiles(supabase, id);

        setPrompt((site?.prompt as string) ?? "");
        setSiteName((site?.name as string) ?? "Sayt");
        setSiteId(id);
        setFiles(projectFiles);
        setActiveFile(projectFiles[0]?.path ?? null);

        // Prefer the full saved conversation (cross-device, identical on every
        // device). Fall back to a minimal thread rebuilt from stored user messages.
        const convo = site?.conversation as { blocks?: Block[]; phase?: Phase } | null;
        if (convo && Array.isArray(convo.blocks) && convo.blocks.length > 0) {
          setBlocks(normalizeBlocks(convo.blocks));
          setPhase(clampPhase(convo.phase));
        } else {
          const { data: msgs } = await supabase
            .from("messages")
            .select("role,content,created_at")
            .eq("site_id", id)
            .order("created_at", { ascending: true });
          const userBlocks: Block[] = (msgs ?? [])
            .filter((m) => m.role === "user")
            .map((m) => ({ id: makeId(), type: "user", text: m.content as string }));
          const restored: Block[] =
            userBlocks.length > 0
              ? userBlocks
              : [{ id: makeId(), type: "user", text: (site?.prompt as string) ?? "" }];
          setBlocks([
            ...restored,
            {
              id: makeId(),
              type: "build",
              name: (site?.name as string) ?? "",
              files: toFileChanges(projectFiles, new Set()),
              revealed: projectFiles.length,
              done: true,
            },
          ]);
          setPhase("built");
        }
        // The DB copy is authoritative here — safe to start mirroring edits.
        convoSyncedRef.current = true;
      } catch {
        router.replace("/workspace");
      } finally {
        setBusy(false);
      }
    },
    [router],
  );

  /** A build request was in flight when the page was left — try to adopt the result. */
  const recoverBuild = React.useCallback(
    async (session: BuildSession) => {
      setBusy(true);
      try {
        const supabase = createClient();
        const { data: rows } = await supabase
          .from("sites")
          .select("id,name,created_at")
          .order("created_at", { ascending: false })
          .limit(1);
        const site = rows?.[0];
        const startedAt = session.buildStartedAt ?? 0;
        const createdAt = site ? new Date(site.created_at as string).getTime() : 0;

        if (site && createdAt >= startedAt - 60000) {
          const projectFiles = await fetchFiles(supabase, site.id as string);
          setFiles(projectFiles);
          setActiveFile(projectFiles[0]?.path ?? null);
          setSiteId(site.id as string);
          setSiteName((site.name as string) ?? "Sayt");
          setBlocks((prev) =>
            prev.map((b) =>
              b.type === "build"
                ? {
                    ...b,
                    name: (site.name as string) ?? "",
                    files: toFileChanges(projectFiles, new Set()),
                    revealed: projectFiles.length,
                    done: true,
                  }
                : b,
            ),
          );
          setPhase("built");
          router.replace(`/workspace/build?site=${site.id}`);
        } else {
          setBlocks((prev) => [
            ...prev.filter((b) => b.type !== "build"),
            {
              id: makeId(),
              type: "note",
              text: "Qurulma yarımçıq qaldı. Aşağıdan yenidən təsdiq et.",
              tone: "err",
            },
          ]);
          setPhase("plan");
        }
      } catch {
        setPhase("plan");
      } finally {
        setBusy(false);
      }
    },
    [router],
  );

  // ── Mount: restore from localStorage / URL, or start fresh from the prompt box ──
  React.useEffect(() => {
    if (started.current) return;
    started.current = true;

    const params = new URLSearchParams(window.location.search);
    const urlSite = params.get("site");
    const fresh = window.sessionStorage.getItem(PROMPT_STORAGE_KEY);
    const saved = loadSession();

    // 0. Remix a template → seed the builder with that template's brief.
    const remixId = params.get("remix");
    if (remixId) {
      const tpl = getTemplate(remixId);
      if (tpl) {
        window.sessionStorage.removeItem(PROMPT_STORAGE_KEY);
        clearSession();
        window.history.replaceState(null, "", "/workspace/build");
        ready.current = true;
        convoSyncedRef.current = true;
        void startFromPrompt(tpl.prompt);
        return;
      }
    }

    // 1. Brand-new build started from the workspace prompt box.
    if (fresh) {
      window.sessionStorage.removeItem(PROMPT_STORAGE_KEY);
      clearSession();
      ready.current = true;
      convoSyncedRef.current = true;
      void startFromPrompt(fresh);
      return;
    }

    // 2. Opening a specific site (dashboard link) that isn't the cached session.
    if (urlSite && saved?.siteId !== urlSite) {
      ready.current = true;
      void openSite(urlSite);
      return;
    }

    // 3. Restore the in-progress / built session from localStorage.
    if (saved && saved.blocks.length > 0) {
      setPrompt(saved.prompt);
      setLogoUrl(saved.logoUrl);
      setDocs(saved.docs ?? []);
      setSiteName(saved.siteName);
      setActiveFile(saved.activeFile);
      setSiteId(saved.siteId);

      // Normalize transient running states so nothing looks stuck.
      const normalized: Block[] = normalizeBlocks(saved.blocks);

      if (saved.phase === "thinking") {
        // The plan call was lost mid-flight — re-run it from the prompt.
        setBlocks(normalized.filter((b) => b.type !== "thinking"));
        ready.current = true;
        convoSyncedRef.current = true;
        void continuePlan(saved.prompt);
        return;
      }
      if (saved.phase === "building") {
        setBlocks(normalized);
        ready.current = true;
        convoSyncedRef.current = true;
        void recoverBuild(saved);
        return;
      }

      // Show the local thread immediately, then reconcile with the DB copy and
      // prefer whichever is newer — so another device's edits are never lost or
      // overwritten. DB writes stay gated until this finishes.
      setBlocks(normalized);
      setPhase(clampPhase(saved.phase));
      setBusy(false);
      ready.current = true;
      if (saved.siteId) {
        const sid = saved.siteId;
        void (async () => {
          const projectFiles = await fetchFiles(createClient(), sid);
          if (projectFiles.length > 0) {
            setFiles(projectFiles);
            setActiveFile((prev) => prev ?? projectFiles[0]?.path ?? null);
          }
          try {
            const res = await fetch(`/api/sites/conversation?siteId=${sid}`);
            const data = await res.json();
            const dbConvo = data?.conversation as
              | { blocks?: Block[]; phase?: Phase; updatedAt?: number }
              | null;
            if (
              dbConvo &&
              Array.isArray(dbConvo.blocks) &&
              dbConvo.blocks.length > 0 &&
              (dbConvo.updatedAt ?? 0) > (saved.updatedAt ?? 0)
            ) {
              setBlocks(normalizeBlocks(dbConvo.blocks));
              setPhase(clampPhase(dbConvo.phase));
            }
          } catch {
            /* offline or no DB copy — keep the local thread */
          }
          convoSyncedRef.current = true;
        })();
      } else {
        convoSyncedRef.current = true;
      }
      return;
    }

    // 4. Nothing to show.
    router.replace("/workspace");
  }, [router, startFromPrompt, openSite, continuePlan, recoverBuild]);

  // ── Persist the conversation whenever it changes ──
  React.useEffect(() => {
    if (!ready.current) return;
    saveSession({
      prompt,
      blocks,
      phase,
      siteId,
      siteName,
      logoUrl,
      docs,
      activeFile,
      buildStartedAt: buildStartedAt.current ?? undefined,
      updatedAt: Date.now(),
    });
  }, [prompt, blocks, phase, siteId, siteName, logoUrl, docs, activeFile]);

  // ── Mirror the full conversation to the DB so every device restores it ──
  // Debounced; only settled, non-busy states, and only after the shown thread has
  // been reconciled with the DB (so a stale local copy can't clobber a newer one).
  const convoTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(() => {
    if (!ready.current || !convoSyncedRef.current || !siteId || blocks.length === 0) return;
    if (busy || phase === "thinking" || phase === "building") return;
    if (convoTimer.current) clearTimeout(convoTimer.current);
    convoTimer.current = setTimeout(() => {
      fetch("/api/sites/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, blocks, phase, updatedAt: Date.now() }),
      }).catch(() => {});
    }, 1200);
    return () => {
      if (convoTimer.current) clearTimeout(convoTimer.current);
    };
  }, [blocks, phase, siteId, busy]);

  // ── Auto-scroll the agent panel ──
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [blocks, phase]);

  /** Auto-detect + auto-fix build errors from the live preview (free, bounded). */
  const handleBuildError = (error: string) => {
    if (phase !== "built" || !siteId || files.length === 0 || fixingRef.current) return;
    if (fixAttemptsRef.current >= 3) {
      if (!fixGaveUpRef.current) {
        fixGaveUpRef.current = true;
        setBlocks((prev) => [
          ...prev,
          {
            id: makeId(),
            type: "note",
            text: "Avtomatik düzəliş alınmadı. Çatda nəyin işləmədiyini yazsan, düzəldərəm.",
            tone: "err",
          },
        ]);
      }
      return;
    }
    fixingRef.current = true;
    fixAttemptsRef.current += 1;
    const noteId = makeId();
    setBlocks((prev) => [
      ...prev,
      { id: noteId, type: "note", text: "Xəta aşkarlandı — avtomatik düzəldilir…", tone: "ok" },
    ]);
    void (async () => {
      try {
        const data = await callGenerate({ mode: "fix", prompt: error, siteId, files });
        const changed: ProjectFile[] = data.files ?? [];
        if (changed.length > 0) {
          setFiles((prev) => {
            const map = new Map(prev.map((f) => [f.path, f]));
            for (const f of changed) map.set(f.path, f);
            return Array.from(map.values());
          });
          patchBlock(noteId, (b) =>
            b.type === "note" ? { ...b, text: "Xəta düzəldildi ✓", tone: "ok" } : b,
          );
        } else {
          patchBlock(noteId, (b) =>
            b.type === "note" ? { ...b, text: "Düzəliş tapılmadı.", tone: "err" } : b,
          );
        }
      } catch {
        patchBlock(noteId, (b) =>
          b.type === "note" ? { ...b, text: "Düzəliş alınmadı.", tone: "err" } : b,
        );
      } finally {
        fixingRef.current = false;
      }
    })();
  };

  const approve = async () => {
    if (busy) return;
    setBusy(true);
    fixAttemptsRef.current = 0;
    fixGaveUpRef.current = false;
    buildStartedAt.current = Date.now();
    const buildId = makeId();
    setBlocks((prev) => [
      ...prev,
      { id: buildId, type: "build", name: "", files: [], revealed: 0, done: false },
    ]);
    setPhase("building");
    try {
      const data = await callGenerate({ mode: "build", prompt, logoUrl, docs, knowledge });
      const built: ProjectFile[] = data.files ?? [];
      const changes = toFileChanges(built, new Set());
      setFiles(built);
      setActiveFile(built[0]?.path ?? null);
      setSiteName(data.name ?? "Yeni sayt");
      setSiteId(data.siteId ?? null);
      if (typeof data.credits === "number") setCredits(data.credits);
      buildStartedAt.current = null;
      patchBlock(buildId, (b) =>
        b.type === "build" ? { ...b, name: data.name ?? "", files: changes } : b,
      );
      setPhase("built");
      if (data.siteId) router.replace(`/workspace/build?site=${data.siteId}`);
      // Logo/docs were applied to this build — clear them from the input.
      setLogoUrl(null);
      setDocs([]);
      await revealFiles(buildId, changes.length);
    } catch (error) {
      buildStartedAt.current = null;
      setBlocks((prev) => [
        ...prev.filter((b) => b.id !== buildId),
        { id: makeId(), type: "note", text: errMessage(error), tone: "err" },
      ]);
      setPhase("plan");
    } finally {
      setBusy(false);
    }
  };

  /** Conversational edit of an already-built site. */
  const runEdit = async (text: string) => {
    setBusy(true);
    // Capture attachments, then clear the input chips so it visibly "sends".
    const attachedLogo = logoUrl;
    const attachedDocs = docs;
    setLogoUrl(null);
    setDocs([]);
    const userId = makeId();
    const editId = makeId();
    setBlocks((prev) => [
      ...prev,
      { id: userId, type: "user", text },
      { id: editId, type: "edit", files: [], revealed: 0, done: false },
    ]);
    try {
      const data = await callGenerate({
        mode: "edit",
        prompt: text,
        siteId,
        files,
        logoUrl: attachedLogo,
        docs: attachedDocs,
        knowledge,
      });
      const changed: ProjectFile[] = data.files ?? [];
      const existing = new Set(files.map((f) => f.path));
      const changes = toFileChanges(changed, existing);
      setFiles((prev) => {
        const map = new Map(prev.map((f) => [f.path, f]));
        for (const f of changed) map.set(f.path, f);
        return Array.from(map.values());
      });
      if (changed[0]) setActiveFile(changed[0].path);
      if (typeof data.credits === "number") setCredits(data.credits);
      patchBlock(editId, (b) => (b.type === "edit" ? { ...b, files: changes } : b));
      await revealFiles(editId, changes.length);
    } catch (error) {
      setBlocks((prev) => [
        ...prev.filter((b) => b.id !== editId),
        { id: makeId(), type: "note", text: errMessage(error), tone: "err" },
      ]);
    } finally {
      setBusy(false);
    }
  };

  /** Chat-only question — answers in a reply bubble, streaming tokens, no file changes. */
  const runChat = async (text: string) => {
    setBusy(true);
    const userId = makeId();
    const replyId = makeId();
    setBlocks((prev) => [
      ...prev,
      { id: userId, type: "user", text },
      { id: replyId, type: "reply", text: "" },
    ]);
    try {
      const res = await fetch("/api/generate/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, siteId, files, knowledge }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Söhbət alınmadı.");
      }
      const headerCredits = Number(res.headers.get("X-Credits"));
      if (!Number.isNaN(headerCredits)) setCredits(headerCredits);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        patchBlock(replyId, (b) => (b.type === "reply" ? { ...b, text: acc } : b));
      }
      if (!acc.trim()) {
        patchBlock(replyId, (b) => (b.type === "reply" ? { ...b, text: "—" } : b));
      }
    } catch (error) {
      patchBlock(replyId, (b) => (b.type === "reply" ? { ...b, text: errMessage(error) } : b));
    } finally {
      setBusy(false);
    }
  };

  const onRefine = (event: React.FormEvent) => {
    event.preventDefault();
    const text = refine.trim();
    const hasAttachment = !!logoUrl || docs.length > 0;
    if ((!text && !hasAttachment) || busy) return;
    setRefine("");

    if (mode === "chat") {
      if (text) void runChat(text);
      return;
    }

    if (phase === "built") {
      // Edit the live site. Attachment-only sends still work (add the logo).
      const message =
        text ||
        (logoUrl
          ? "Bu loqonu saytın başlığına (header) əlavə et."
          : "Əlavə olunan sənədə əsasən saytı yenilə.");
      void runEdit(message);
      return;
    }

    if (phase === "plan" || phase === "error") {
      if (!text) {
        // Only an attachment during planning — keep it staged for the build.
        setBlocks((prev) => [
          ...prev,
          {
            id: makeId(),
            type: "note",
            text: "Loqo/sənəd əlavə olundu — saytı qurarkən istifadə olunacaq.",
            tone: "ok",
          },
        ]);
        return;
      }
      const combined = `${prompt} — dəyişiklik istəyi: ${text}`;
      setPrompt(combined);
      setBlocks((prev) => [...prev, { id: makeId(), type: "user", text }]);
      void continuePlan(combined);
    }
  };

  const onFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const list = event.target.files;
    if (!list || list.length === 0) return;
    setAttaching(true);
    const supabase = createClient();
    for (const file of Array.from(list)) {
      try {
        if (file.type.startsWith("image/")) {
          const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
          const path = `${Date.now()}-${safe}`;
          const { error: upErr } = await supabase.storage
            .from("uploads")
            .upload(path, file, { upsert: false });
          if (!upErr) {
            const { data } = supabase.storage.from("uploads").getPublicUrl(path);
            setLogoUrl(data.publicUrl);
          }
        } else {
          const text = await file.text();
          setDocs((prev) => [...prev, { name: file.name, content: text.slice(0, 12000) }]);
        }
      } catch {
        /* skip unreadable file */
      }
    }
    setAttaching(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const lastPlanId = [...blocks].reverse().find((b) => b.type === "plan")?.id ?? null;

  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      {/* ── Agent panel ── */}
      <section
        className={cn(
          "w-full min-w-0 flex-col border-border bg-card/30 pb-14 md:w-[440px] md:flex-none md:border-r md:pb-0",
          mobileView === "chat" ? "flex flex-1" : "hidden",
          "md:flex",
        )}
      >
        <header className="flex h-14 items-center justify-between border-b border-border px-4">
          <button
            onClick={() => router.push("/workspace")}
            title="Saytlarıma qayıt"
            aria-label="Saytlarıma qayıt"
            className="group inline-flex items-center rounded-full p-1 transition-colors"
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="brand-mark absolute inset-0 rounded-[7px] transition-opacity group-hover:opacity-0" />
              <ArrowLeft className="relative h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span
              title={`${credits} kredit qalıb`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              <Coins className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono tabular-nums text-foreground">{credits}</span>
              kredit
            </span>

            {siteId ? (
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  title="Daha çox"
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground",
                    menuOpen && "bg-muted text-foreground",
                  )}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {menuOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 top-10 z-50 w-48 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-[0_24px_60px_-30px_hsl(240_22%_13%/0.5)]"
                  >
                    <button
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        setKnowledgeOpen(true);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <BookOpen className="h-4 w-4" />
                      </span>
                      <span className="flex flex-col">
                        Bilik
                        <span className="text-[11px] font-normal text-muted-foreground">
                          Layihə təlimatları
                        </span>
                      </span>
                    </button>

                    {phase === "built" ? (
                      <button
                        role="menuitem"
                        onClick={() => {
                          setMenuOpen(false);
                          setVersionsOpen(true);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <History className="h-4 w-4" />
                        </span>
                        <span className="flex flex-col">
                          Versiyalar
                          <span className="text-[11px] font-normal text-muted-foreground">
                            Əvvəlki nüsxələr
                          </span>
                        </span>
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {blocks.map((block) => (
            <ConversationBlock
              key={block.id}
              block={block}
              showApprove={block.id === lastPlanId && phase === "plan" && !busy}
              onApprove={approve}
              onCancel={() => {
                clearSession();
                router.push("/workspace");
              }}
            />
          ))}
        </div>

        <form onSubmit={onRefine} className="border-t border-border p-3">
          {logoUrl || docs.length > 0 ? (
            <div className="mb-2 flex flex-wrap gap-2">
              {logoUrl ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[12px]">
                  <span className="brand-mark h-4 w-4 rounded" />
                  Loqo
                  <button
                    type="button"
                    onClick={() => setLogoUrl(null)}
                    aria-label="Loqonu sil"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ) : null}
              {docs.map((d, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[12px]"
                >
                  <FileText className="h-3 w-3" />
                  <span className="max-w-[120px] truncate">{d.name}</span>
                  <button
                    type="button"
                    onClick={() => setDocs(docs.filter((_, j) => j !== i))}
                    aria-label="Faylı sil"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : null}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.md,.markdown,.txt,.json,.csv"
            onChange={onFiles}
            className="hidden"
          />

          <div className="rounded-2xl border border-border bg-card p-2.5 shadow-[0_10px_30px_-22px_hsl(240_22%_13%/0.4)] transition-colors focus-within:border-[hsl(var(--ring)/0.5)]">
            <textarea
              ref={refineRef}
              value={refine}
              onChange={(e) => setRefine(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onRefine(e as unknown as React.FormEvent);
                }
              }}
              rows={1}
              placeholder={
                mode === "chat"
                  ? "Sual ver — saytı dəyişmir…"
                  : phase === "built"
                    ? "Dəyişiklik istə — “qiymət bölməsi əlavə et”…"
                    : "Planı dəyiş və ya nəsə əlavə et…"
              }
              disabled={busy}
              className="block max-h-[140px] min-h-[24px] w-full resize-none bg-transparent px-1.5 pt-1 text-[14px] leading-relaxed outline-none placeholder:text-muted-foreground disabled:opacity-50"
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={attaching}
                  aria-label="Loqo və ya fayl əlavə et"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                >
                  {attaching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </button>
                <div className="flex items-center rounded-lg bg-muted p-0.5 text-[12px] font-medium">
                  <button
                    type="button"
                    onClick={() => setMode("agent")}
                    title="Saytı dəyişir (kredit istifadə edir)"
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors",
                      mode === "agent" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
                    )}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Agent
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("chat")}
                    title="Sual ver — saytı dəyişmir"
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors",
                      mode === "chat" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
                    )}
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Söhbət
                  </button>
                </div>
              </div>
              <button
                type="submit"
                aria-label="Göndər"
                disabled={busy}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90 disabled:translate-y-0 disabled:opacity-50"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* ── Preview panel ── */}
      <div
        className={cn(
          "min-h-0 min-w-0 pb-14 md:pb-0",
          mobileView === "preview" ? "flex flex-1" : "hidden",
          "md:flex md:flex-1",
        )}
      >
        <PreviewPane
          phase={phase}
          files={files}
          siteName={siteName}
          siteId={siteId}
          activeFile={activeFile}
          onSelectFile={setActiveFile}
          onBuildError={handleBuildError}
          onPublish={() => setPublishOpen(true)}
          onElementPick={onElementPick}
          onChangeFile={editFileContent}
          onTextReplace={applyTextReplace}
        />
      </div>

      {/* mobile chat/preview switcher */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex h-12 border-t border-border bg-card md:hidden">
        <button
          type="button"
          onClick={() => setMobileView("chat")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 text-[13px] font-medium transition-colors",
            mobileView === "chat" ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <Sparkles className="h-4 w-4" />
          Söhbət
        </button>
        <button
          type="button"
          onClick={() => setMobileView("preview")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 text-[13px] font-medium transition-colors",
            mobileView === "preview" ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <Eye className="h-4 w-4" />
          Önizləmə
        </button>
      </div>

      <PublishPanel
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        siteId={siteId}
        siteName={siteName}
      />

      <CheckpointsPanel
        open={versionsOpen}
        onClose={() => setVersionsOpen(false)}
        siteId={siteId}
        onRestore={restoreCheckpoint}
      />

      <KnowledgePanel
        open={knowledgeOpen}
        onClose={() => setKnowledgeOpen(false)}
        siteId={siteId}
        value={knowledge}
        onSaved={setKnowledge}
      />
    </div>
  );
}

/** Renders one conversation block in the agent panel. */
function ConversationBlock({
  block,
  showApprove,
  onApprove,
  onCancel,
}: {
  block: Block;
  showApprove: boolean;
  onApprove: () => void;
  onCancel: () => void;
}) {
  if (block.type === "user") {
    return (
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-4 py-2.5 text-[14px] text-background">
        {block.text}
      </div>
    );
  }

  if (block.type === "thinking") {
    return (
      <div className="rounded-2xl border border-border bg-card p-3.5">
        <div className="flex items-center gap-2 text-[13px] font-medium">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Foundrr düşünür
        </div>
        <ul className="mt-2.5 space-y-1.5">
          {block.steps.map((step, i) => {
            const done = block.activeIndex === -1 || i < block.activeIndex;
            return (
              <li
                key={step}
                className="flex items-center gap-2 text-[13px] text-muted-foreground"
              >
                {done ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                )}
                {step}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (block.type === "plan") {
    return (
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Plan</p>
        <ul className="mt-3 space-y-2">
          {block.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[11px] text-primary">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
        {showApprove ? (
          <>
            <p className="mt-3.5 rounded-lg bg-muted px-3 py-2 text-[12px] text-muted-foreground">
              Loqonu saytda istəyirsənsə, aşağıdakı mesajda “+” ilə əlavə edə bilərsən.
            </p>
            <p className="mt-4 text-[14px] font-medium">Başlamaq istəyirsən?</p>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={onApprove}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-[14px] font-medium text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
              >
                <Check className="h-4 w-4" />
                Bəli, qur ({BUILD_COST} kredit)
              </button>
              <button
                onClick={onCancel}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
                Xeyr
              </button>
            </div>
          </>
        ) : null}
      </div>
    );
  }

  if (block.type === "build" || block.type === "edit") {
    return <BuildLog block={block} />;
  }

  if (block.type === "reply") {
    return (
      <div className="mr-auto w-fit max-w-[90%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-[14px] leading-relaxed text-foreground">
        {block.text ? (
          block.text
        ) : (
          <span className="inline-flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.2s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.1s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" />
          </span>
        )}
      </div>
    );
  }

  // note
  return (
    <p
      className={cn(
        "rounded-xl border px-3 py-2 text-[13px]",
        block.tone === "err"
          ? "border-destructive/30 bg-destructive/5 text-destructive"
          : "border-primary/30 bg-primary/5 text-foreground",
      )}
    >
      {block.text}
    </p>
  );
}
