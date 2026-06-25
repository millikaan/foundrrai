/**
 * Build-session persistence + shared types for the project builder.
 *
 * The chat/conversation is the source of truth for the UI and lives in
 * localStorage (small — file *contents* are never stored here, only metadata).
 * The generated project files themselves live in Supabase (`files` table) and
 * are reloaded by `siteId`, so a refresh or leaving the page never loses state.
 */

export type Phase = "thinking" | "plan" | "building" | "built" | "error";

/** One file that was written or changed during a build/edit, with a line count. */
export interface FileChange {
  path: string;
  lines: number;
  kind: "new" | "edit";
}

/** A single rendered block in the agent conversation. */
export type Block =
  | { id: string; type: "user"; text: string }
  | { id: string; type: "thinking"; steps: string[]; activeIndex: number }
  | { id: string; type: "plan"; steps: string[] }
  | {
      id: string;
      type: "build";
      name: string;
      files: FileChange[];
      revealed: number;
      done: boolean;
    }
  | { id: string; type: "edit"; files: FileChange[]; revealed: number; done: boolean }
  | { id: string; type: "note"; text: string; tone: "ok" | "err" }
  | { id: string; type: "reply"; text: string };

export interface BuildSession {
  prompt: string;
  blocks: Block[];
  phase: Phase;
  siteId: string | null;
  siteName: string;
  logoUrl: string | null;
  docs: { name: string; content: string }[];
  activeFile: string | null;
  /** Set while a build request is in flight, so a refresh can try to recover it. */
  buildStartedAt?: number;
  /** Wall-clock of the last local change — used to reconcile against the DB copy. */
  updatedAt?: number;
}

const SESSION_KEY = "foundrr:build-session";

export function saveSession(session: BuildSession): void {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* quota exceeded or unavailable — non-fatal, DB stays the source of truth */
  }
}

export function loadSession(): BuildSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BuildSession;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

/** Count lines in a file's content (used for the "+N sətir" edit chips). */
export function countLines(content: string): number {
  if (!content) return 0;
  return content.split("\n").length;
}

/** Turn raw generated files into FileChange metadata for the build log. */
export function toFileChanges(
  files: ReadonlyArray<{ path: string; content: string }>,
  existingPaths: ReadonlySet<string>,
): FileChange[] {
  return files.map((f) => ({
    path: f.path,
    lines: countLines(f.content),
    kind: existingPaths.has(f.path) ? "edit" : "new",
  }));
}

/** Stable-enough id for client-only conversation blocks. */
export function makeId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
