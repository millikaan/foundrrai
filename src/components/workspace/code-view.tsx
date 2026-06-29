"use client";

import * as React from "react";
import {
  Braces,
  Check,
  Copy,
  FileCode2,
  FileText,
  FileType2,
  Folder,
  Hash,
  Pencil,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface ProjectFile {
  path: string;
  content: string;
}

interface CodeViewProps {
  files: ProjectFile[];
  activeFile: string | null;
  onSelectFile: (path: string) => void;
  siteName: string;
  /** When provided, the code panel becomes editable and reports edits live. */
  onChangeFile?: (path: string, content: string) => void;
}

function iconForPath(path: string) {
  if (path.endsWith(".json")) return Braces;
  if (path.endsWith(".css")) return Hash;
  if (path.endsWith(".html")) return FileType2;
  if (path.endsWith(".md") || path.endsWith(".txt")) return FileText;
  return FileCode2;
}

/** Group files by their top-level folder for a tidy tree ("src", "root", …). */
function groupByFolder(files: ProjectFile[]): { folder: string; files: ProjectFile[] }[] {
  const groups = new Map<string, ProjectFile[]>();
  for (const file of [...files].sort((a, b) => a.path.localeCompare(b.path))) {
    const slash = file.path.indexOf("/");
    const folder = slash === -1 ? "/" : file.path.slice(0, slash);
    const list = groups.get(folder) ?? [];
    list.push(file);
    groups.set(folder, list);
  }
  // Root files first, then folders alphabetically.
  return [...groups.entries()]
    .sort(([a], [b]) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)))
    .map(([folder, list]) => ({ folder, files: list }));
}

export function CodeView({
  files,
  activeFile,
  onSelectFile,
  siteName,
  onChangeFile,
}: CodeViewProps) {
  const [copied, setCopied] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const active = files.find((f) => f.path === activeFile);
  const groups = React.useMemo(() => groupByFolder(files), [files]);
  const editable = !!onChangeFile;
  const lines = active ? active.content.split("\n") : [];

  // Leaving edit mode whenever the active file changes keeps the view predictable.
  React.useEffect(() => {
    setEditing(false);
  }, [activeFile]);

  const copy = async () => {
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex h-full bg-muted/30">
      {/* File tree */}
      <div className="w-56 shrink-0 overflow-y-auto border-r border-border bg-card/50 py-3">
        <p className="truncate px-4 pb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {siteName}
        </p>
        {groups.map((group) => (
          <div key={group.folder} className="mt-1">
            {group.folder !== "/" ? (
              <div className="flex items-center gap-1.5 px-4 py-1 text-[11px] font-medium text-muted-foreground">
                <Folder className="h-3 w-3" />
                {group.folder}
              </div>
            ) : null}
            <ul className="flex flex-col">
              {group.files.map((file) => {
                const Icon = iconForPath(file.path);
                const label =
                  group.folder === "/" ? file.path : file.path.slice(group.folder.length + 1);
                const isActive = activeFile === file.path;
                return (
                  <li key={file.path}>
                    <button
                      onClick={() => onSelectFile(file.path)}
                      className={cn(
                        "flex w-full items-center gap-2 py-1.5 pr-3 text-left font-mono text-[12px] transition-colors",
                        group.folder === "/" ? "pl-4" : "pl-8",
                        isActive
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      <span className="truncate">{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Code panel */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-10 shrink-0 items-center justify-between border-b border-border bg-card/40 px-4">
          <span className="truncate font-mono text-[12px] text-muted-foreground">
            {active?.path ?? "—"}
            {editing ? <span className="ml-2 text-primary">• düzəliş</span> : null}
          </span>
          {active ? (
            <div className="flex items-center gap-1.5">
              {editable ? (
                <button
                  onClick={() => setEditing((e) => !e)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] transition-colors",
                    editing
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Pencil className="h-3 w-3" />
                  {editing ? "Bitir" : "Düzəlt"}
                </button>
              ) : null}
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-primary" />
                    Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Kopyala
                  </>
                )}
              </button>
            </div>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-card/20">
          {editing && active && onChangeFile ? (
            <textarea
              value={active.content}
              onChange={(e) => onChangeFile(active.path, e.target.value)}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              className="h-full w-full resize-none bg-card/20 px-4 py-4 font-mono text-[12px] leading-[1.6] text-foreground/90 outline-none"
            />
          ) : (
            <div className="flex min-h-full font-mono text-[12px] leading-[1.6]">
              <div className="select-none border-r border-border/60 bg-card/30 px-3 py-4 text-right text-muted-foreground/50">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="flex-1 overflow-x-auto px-4 py-4 text-foreground/90">
                <code>{active?.content ?? ""}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
