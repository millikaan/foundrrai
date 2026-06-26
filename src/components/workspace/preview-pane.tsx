"use client";

import * as React from "react";
import {
  Code2,
  ExternalLink,
  Eye,
  Globe,
  ImageIcon,
  Monitor,
  MousePointerClick,
  Redo2,
  Rocket,
  RotateCw,
  Smartphone,
  Type,
  Undo2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Phase } from "@/lib/workspace/build-session";
import { BuildingCanvas } from "@/components/workspace/building-canvas";
import { CodeView } from "@/components/workspace/code-view";
import { WebContainerPreview } from "@/components/workspace/webcontainer-preview";

interface ProjectFile {
  path: string;
  content: string;
}

type Tab = "preview" | "code";
type Device = "desktop" | "mobile";
/** One active visual-edit tool at a time. */
type EditMode = null | "text" | "select" | "image";

interface PreviewPaneProps {
  phase: Phase;
  files: ProjectFile[];
  siteName: string;
  siteId: string | null;
  activeFile: string | null;
  onSelectFile: (path: string) => void;
  onBuildError?: (error: string) => void;
  onPublish?: () => void;
  onElementPick?: (info: { text: string; tag: string }) => void;
  /** Live edit of a file from the in-browser code editor. */
  onChangeFile?: (path: string, content: string) => void;
  /** Inline visual text edit — replace an exact piece of copy across the project. */
  onTextReplace?: (oldText: string, newText: string) => void;
  /** Image clicked in the preview — upload a replacement and swap its src. */
  onImageReplace?: (oldSrc: string) => void;
  /** True while a replacement picture uploads (shows an overlay in the preview). */
  uploadingImage?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 30) || "sayt"
  );
}

export function PreviewPane({
  phase,
  files,
  siteName,
  siteId,
  activeFile,
  onSelectFile,
  onBuildError,
  onPublish,
  onElementPick,
  onChangeFile,
  onTextReplace,
  onImageReplace,
  uploadingImage,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: PreviewPaneProps) {
  const [tab, setTab] = React.useState<Tab>("preview");
  const [device, setDevice] = React.useState<Device>("desktop");
  const [mode, setMode] = React.useState<EditMode>(null);
  const [reloadSignal, setReloadSignal] = React.useState(0);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const built = phase === "built" && files.length > 0;
  const buildKey = siteId ?? "draft";
  const fauxUrl = `${slugify(siteName || "sayt")}.foundrr.app`;

  const toggleMode = (m: Exclude<EditMode, null>) =>
    setMode((cur) => (cur === m ? null : m));

  return (
    <section className="relative flex min-w-0 flex-1 flex-col bg-muted/30">
      {/* ── Toolbar — a browser-like chrome, Lovable-style ── */}
      <div className="flex h-14 items-center gap-2 border-b border-border bg-background/60 px-3 backdrop-blur">
        {built ? (
          <>
            <div className="flex shrink-0 items-center rounded-xl border border-border bg-card p-0.5">
              <TabButton active={tab === "preview"} onClick={() => setTab("preview")} icon={Eye}>
                Önizləmə
              </TabButton>
              <TabButton active={tab === "code"} onClick={() => setTab("code")} icon={Code2}>
                Kod
              </TabButton>
            </div>

            {tab === "preview" ? (
              <>
                {/* undo / redo */}
                <div className="hidden shrink-0 items-center rounded-xl border border-border bg-card p-0.5 sm:flex">
                  <ToolButton
                    onClick={() => onUndo?.()}
                    disabled={!canUndo}
                    label="Geri al"
                    icon={Undo2}
                  />
                  <ToolButton
                    onClick={() => onRedo?.()}
                    disabled={!canRedo}
                    label="İrəli"
                    icon={Redo2}
                  />
                </div>

                {/* address bar */}
                <button
                  onClick={() => setReloadSignal((s) => s + 1)}
                  title="Yenilə"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
                <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3">
                  <Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate font-mono text-[12px] text-muted-foreground">
                    {fauxUrl}
                  </span>
                </div>
                <button
                  onClick={() => previewUrl && window.open(previewUrl, "_blank", "noopener")}
                  disabled={!previewUrl}
                  title="Yeni tabda aç"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>

                {/* visual-edit tools */}
                <div className="flex shrink-0 items-center rounded-xl border border-border bg-card p-0.5">
                  <ToolButton
                    active={mode === "text"}
                    onClick={() => toggleMode("text")}
                    label="Mətni dəyiş"
                    icon={Type}
                  />
                  <ToolButton
                    active={mode === "select"}
                    onClick={() => toggleMode("select")}
                    label="Elementi seç"
                    icon={MousePointerClick}
                  />
                  <ToolButton
                    active={mode === "image"}
                    onClick={() => toggleMode("image")}
                    label="Şəkli dəyiş"
                    icon={ImageIcon}
                  />
                </div>

                {/* device */}
                <div className="hidden shrink-0 items-center rounded-xl border border-border bg-card p-0.5 sm:flex">
                  <IconToggle
                    active={device === "desktop"}
                    onClick={() => setDevice("desktop")}
                    label="Masaüstü"
                    icon={Monitor}
                  />
                  <IconToggle
                    active={device === "mobile"}
                    onClick={() => setDevice("mobile")}
                    label="Mobil"
                    icon={Smartphone}
                  />
                </div>
              </>
            ) : (
              <span className="mx-auto truncate rounded-full bg-card px-4 py-1 font-mono text-[12px] text-muted-foreground">
                {siteName}
              </span>
            )}

            <button
              onClick={onPublish}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_hsl(var(--primary)/0.7)] transition-all hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-hover))]"
            >
              <Rocket className="h-3.5 w-3.5" />
              Yayımla
            </button>
          </>
        ) : (
          <>
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
            </span>
            <span className="mx-auto truncate rounded-full bg-card px-4 py-1 font-mono text-[12px] text-muted-foreground">
              önizləmə
            </span>
            <span className="rounded-md bg-card px-2 py-1 font-mono text-[10px] text-muted-foreground">
              qurulur
            </span>
          </>
        )}
      </div>

      {/* ── Body ── */}
      <div className="min-h-0 flex-1">
        {!built ? (
          <BuildingCanvas phase={phase} />
        ) : (
          <div className="relative h-full">
            {/* Preview stays mounted so the dev server keeps running across tab switches. */}
            <div className={cn("absolute inset-0", tab === "preview" ? "z-10" : "invisible")}>
              <WebContainerPreview
                files={files}
                device={device}
                buildKey={buildKey}
                onBuildError={onBuildError}
                selecting={mode === "select"}
                onPick={(info) => {
                  setMode(null);
                  onElementPick?.(info);
                }}
                editingText={mode === "text"}
                onTextEdit={({ from, to }) => onTextReplace?.(from, to)}
                editingImage={mode === "image"}
                onImagePick={({ src }) => onImageReplace?.(src)}
                reloadSignal={reloadSignal}
                onUrl={setPreviewUrl}
                uploading={uploadingImage}
              />
            </div>
            <div className={cn("absolute inset-0", tab === "code" ? "z-10" : "hidden")}>
              <CodeView
                files={files}
                activeFile={activeFile}
                onSelectFile={onSelectFile}
                siteName={siteName}
                onChangeFile={onChangeFile}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
        active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}

/** Active visual-edit tool — highlighted in the accent colour. */
function ToolButton({
  active = false,
  onClick,
  label,
  icon: Icon,
  disabled = false,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-30",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground disabled:hover:text-muted-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function IconToggle({
  active,
  onClick,
  label,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
        active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
