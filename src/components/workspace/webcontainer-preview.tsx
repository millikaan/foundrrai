"use client";

import * as React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

import {
  bootContainer,
  isIsolated,
  killDevProcess,
  setDevProcess,
  toFileSystemTree,
} from "@/lib/workspace/webcontainer";

interface ProjectFile {
  path: string;
  content: string;
}

type Status = "booting" | "installing" | "starting" | "ready" | "error";

const STATUS_LABEL: Record<Exclude<Status, "ready" | "error">, string> = {
  booting: "Mühit hazırlanır…",
  installing: "Paketlər yüklənir…",
  starting: "Server işə salınır…",
};

/** Signatures of real build/compile errors in the Vite dev output. */
const ERROR_RE =
  /\[plugin:|\[postcss\]|Internal server error|Failed to compile|Pre-transform error|does not exist|error during (build|closeBundle)|error TS\d|✘ \[ERROR\]/i;

/** Click-to-select script injected into the PREVIEW's index.html only (never deployed). */
const SELECT_SCRIPT = `(function(){var on=false,last=null;function clr(){if(last&&last.style){last.style.outline='';last.style.outlineOffset='';last.style.cursor='';}last=null;}window.addEventListener('message',function(e){var d=e.data||{};if(d&&d.type==='foundrr:select'){on=!!d.on;if(!on)clr();}});document.addEventListener('mouseover',function(e){if(!on)return;clr();last=e.target;if(last&&last.style){last.style.outline='2px solid #0FA98F';last.style.outlineOffset='1px';last.style.cursor='pointer';}},true);document.addEventListener('click',function(e){if(!on)return;e.preventDefault();e.stopPropagation();var el=e.target||{};var t=((el.innerText||el.textContent||'')+'').trim().slice(0,140);parent.postMessage({type:'foundrr:picked',text:t,tag:((el.tagName||'')+'').toLowerCase()},'*');on=false;clr();},true);})();`;

/** Inline text-edit script: click a text node, type, and on blur report from→to. */
const EDIT_TEXT_SCRIPT = `(function(){var on=false,orig=null,node=null;function end(){if(node){node.removeAttribute('contenteditable');var now=((node.innerText||node.textContent||'')+'').trim();if(orig!=null&&now&&now!==orig){parent.postMessage({type:'foundrr:textedit',from:orig,to:now},'*');}node.style.outline='';node.style.cursor='';}node=null;orig=null;}function editable(el){return el&&el.childElementCount===0&&((el.innerText||'')+'').trim().length>0;}window.addEventListener('message',function(e){var d=e.data||{};if(d&&d.type==='foundrr:edit-text'){on=!!d.on;if(!on)end();}});document.addEventListener('mouseover',function(e){if(!on||node)return;var el=e.target;if(editable(el)){el.style.outline='1px dashed #0FA98F';el.style.cursor='text';}},true);document.addEventListener('mouseout',function(e){if(!on||node)return;var el=e.target;if(el&&el!==node){el.style.outline='';el.style.cursor='';}},true);document.addEventListener('click',function(e){if(!on)return;var el=e.target;if(node){if(el!==node)end();return;}if(editable(el)){e.preventDefault();e.stopPropagation();node=el;orig=((el.innerText||el.textContent||'')+'').trim();el.setAttribute('contenteditable','true');el.style.outline='2px solid #0FA98F';el.focus();}},true);document.addEventListener('keydown',function(e){if(!on||!node)return;if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();node.blur();}else if(e.key==='Escape'){orig=null;node.blur();}},true);document.addEventListener('blur',function(e){if(on&&node&&e.target===node)end();},true);})();`;

/** Image-replace script: highlight images, click one to report its src for swapping. */
const IMG_SCRIPT = `(function(){var on=false,last=null;function clr(){if(last&&last.style){last.style.outline='';last.style.outlineOffset='';last.style.cursor='';}last=null;}window.addEventListener('message',function(e){var d=e.data||{};if(d&&d.type==='foundrr:edit-image'){on=!!d.on;if(!on)clr();}});document.addEventListener('mouseover',function(e){if(!on)return;var el=e.target;if(el&&el.tagName==='IMG'){clr();last=el;el.style.outline='3px solid #0FA98F';el.style.outlineOffset='2px';el.style.cursor='pointer';}},true);document.addEventListener('mouseout',function(e){if(!on)return;if(e.target===last)clr();},true);document.addEventListener('click',function(e){if(!on)return;var el=e.target;if(el&&el.tagName==='IMG'){e.preventDefault();e.stopPropagation();var s=el.getAttribute('src')||el.currentSrc||el.src||'';parent.postMessage({type:'foundrr:imgpick',src:s},'*');clr();}},true);})();`;

function withSelector(files: ProjectFile[]): ProjectFile[] {
  return files.map((f) => {
    if (f.path !== "index.html") return f;
    const tag = `<script>${SELECT_SCRIPT}</script><script>${EDIT_TEXT_SCRIPT}</script><script>${IMG_SCRIPT}</script>`;
    const content = f.content.includes("</body>")
      ? f.content.replace("</body>", `${tag}</body>`)
      : f.content + tag;
    return { ...f, content };
  });
}

interface WebContainerPreviewProps {
  files: ProjectFile[];
  device: "desktop" | "mobile";
  /** Bumped by the parent on each new full build to force a fresh mount + reinstall. */
  buildKey: string;
  /** Called with the captured error text when the dev server reports a build error. */
  onBuildError?: (error: string) => void;
  /** When true, clicking an element in the preview selects it instead of acting. */
  selecting?: boolean;
  /** Fired with the picked element's text + tag when the user clicks one. */
  onPick?: (info: { text: string; tag: string }) => void;
  /** When true, text in the preview becomes directly editable. */
  editingText?: boolean;
  /** Fired with the original + new copy when the user edits text inline. */
  onTextEdit?: (change: { from: string; to: string }) => void;
  /** When true, clicking an image in the preview reports its src for replacing. */
  editingImage?: boolean;
  /** Fired with the clicked image's src so the parent can upload + swap it. */
  onImagePick?: (info: { src: string }) => void;
  /** Increment to force a fresh preview reload (the toolbar refresh button). */
  reloadSignal?: number;
  /** Reports the live preview URL (for the "open in new tab" button). */
  onUrl?: (url: string) => void;
  /** Shows an "uploading image" overlay while a replacement picture uploads. */
  uploading?: boolean;
}

export function WebContainerPreview({
  files,
  device,
  buildKey,
  onBuildError,
  selecting,
  onPick,
  editingText,
  onTextEdit,
  editingImage,
  onImagePick,
  reloadSignal,
  onUrl,
  uploading,
}: WebContainerPreviewProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const onPickRef = React.useRef(onPick);
  const onTextEditRef = React.useRef(onTextEdit);
  const onImagePickRef = React.useRef(onImagePick);
  const onUrlRef = React.useRef(onUrl);
  React.useEffect(() => {
    onPickRef.current = onPick;
    onTextEditRef.current = onTextEdit;
    onImagePickRef.current = onImagePick;
    onUrlRef.current = onUrl;
  });

  // Receive element picks + inline text/image edits from the injected scripts.
  React.useEffect(() => {
    const handler = (e: MessageEvent) => {
      const d = e.data as
        | { type?: string; text?: string; tag?: string; from?: string; to?: string; src?: string }
        | null;
      if (d && d.type === "foundrr:picked") {
        onPickRef.current?.({ text: d.text ?? "", tag: d.tag ?? "" });
      } else if (d && d.type === "foundrr:textedit" && d.from && d.to) {
        onTextEditRef.current?.({ from: d.from, to: d.to });
      } else if (d && d.type === "foundrr:imgpick" && d.src) {
        onImagePickRef.current?.({ src: d.src });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
  const [status, setStatus] = React.useState<Status>("booting");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [url, setUrl] = React.useState<string | null>(null);
  const filesRef = React.useRef<ProjectFile[]>(files);
  // Bumped after an edit to force a fresh preview load (HMR alone can miss
  // structural changes like new pages/routes).
  const [reloadKey, setReloadKey] = React.useState(0);
  const reloadTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(
    () => () => {
      if (reloadTimer.current) clearTimeout(reloadTimer.current);
    },
    [],
  );

  // Report the live URL up to the toolbar (for "open in new tab").
  React.useEffect(() => {
    if (url) onUrlRef.current?.(url);
  }, [url]);

  // Toolbar refresh button → force a fresh reload.
  const lastReloadSignal = React.useRef(reloadSignal ?? 0);
  React.useEffect(() => {
    if (reloadSignal !== undefined && reloadSignal !== lastReloadSignal.current) {
      lastReloadSignal.current = reloadSignal;
      setReloadKey((k) => k + 1);
    }
  }, [reloadSignal]);

  // Keep the latest error callback + a reset-able "last reported" guard in refs.
  const onBuildErrorRef = React.useRef(onBuildError);
  const lastReportedRef = React.useRef("");
  React.useEffect(() => {
    onBuildErrorRef.current = onBuildError;
  });

  // A dependency change (e.g. an edit adds react-router-dom) must trigger a fresh
  // install — key the boot effect on package.json so it re-mounts + reinstalls.
  const pkgContent = files.find((f) => f.path === "package.json")?.content ?? "";

  // ── Boot + mount + install + run dev (per build, or when dependencies change) ──
  React.useEffect(() => {
    let disposed = false;
    filesRef.current = files;

    if (!isIsolated()) {
      setStatus("error");
      setErrorMsg(
        "Önizləmə üçün izolyasiya aktiv deyil. Səhifəni yenilə və ya birbaşa /workspace/build aç.",
      );
      return;
    }

    let buffer = "";
    let errorTimer: ReturnType<typeof setTimeout> | null = null;
    const scanOutput = (chunk: string) => {
      const clean = chunk.replace(/\[[0-9;]*m/g, "");
      buffer = (buffer + clean).slice(-4000);
      if (!ERROR_RE.test(clean)) return;
      if (errorTimer) clearTimeout(errorTimer);
      errorTimer = setTimeout(() => {
        if (disposed) return;
        const text = buffer.trim();
        if (text && text !== lastReportedRef.current) {
          lastReportedRef.current = text;
          onBuildErrorRef.current?.(text);
        }
      }, 700);
    };

    (async () => {
      try {
        setStatus("booting");
        const container = await bootContainer();
        if (disposed) return;

        killDevProcess();
        await container.mount(toFileSystemTree(withSelector(files)));
        if (disposed) return;

        container.on("server-ready", (_port, readyUrl) => {
          if (!disposed) {
            setUrl(readyUrl);
            setStatus("ready");
          }
        });

        setStatus("installing");
        const install = await container.spawn("npm", ["install"]);
        const installCode = await install.exit;
        if (disposed) return;
        if (installCode !== 0) throw new Error("Paketlər yüklənmədi (npm install).");

        setStatus("starting");
        const dev = await container.spawn("npm", ["run", "dev"]);
        setDevProcess(dev);
        dev.output
          .pipeTo(
            new WritableStream({
              write(chunk) {
                if (!disposed) scanOutput(chunk);
              },
            }),
          )
          .catch(() => {});
      } catch (error) {
        if (!disposed) {
          setStatus("error");
          setErrorMsg(error instanceof Error ? error.message : "Önizləmə başladıla bilmədi.");
        }
      }
    })();

    return () => {
      disposed = true;
      if (errorTimer) clearTimeout(errorTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildKey, pkgContent]);

  // ── Hot-patch changed files on edits (Vite HMR picks them up) ──
  React.useEffect(() => {
    const previous = filesRef.current;
    filesRef.current = files;
    if (status !== "ready") return;

    // A dependency change re-installs via the boot effect — skip HMR for it.
    const prevPkg = previous.find((p) => p.path === "package.json")?.content ?? "";
    const curPkg = files.find((f) => f.path === "package.json")?.content ?? "";
    if (prevPkg !== curPkg) return;

    let changed = false;
    (async () => {
      try {
        const container = await bootContainer();
        for (const file of files) {
          const old = previous.find((p) => p.path === file.path);
          if (old && old.content === file.content) continue;
          changed = true;
          const dir = file.path.split("/").slice(0, -1).join("/");
          if (dir) await container.fs.mkdir(dir, { recursive: true }).catch(() => {});
          await container.fs.writeFile(file.path, file.content);
        }
        // Allow a persistent error to re-report after a fix/edit recompiles.
        if (changed) {
          lastReportedRef.current = "";
          // Force a fresh load shortly after the writes land so the new content
          // is guaranteed to show (HMR can miss new pages / routing changes).
          if (reloadTimer.current) clearTimeout(reloadTimer.current);
          reloadTimer.current = setTimeout(() => setReloadKey((k) => k + 1), 450);
        }
      } catch {
        /* HMR write failed — preview will catch up on next edit */
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  // Toggle select-mode inside the preview iframe.
  React.useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "foundrr:select", on: !!selecting },
      "*",
    );
  }, [selecting, url]);

  // Toggle inline text-edit mode inside the preview iframe.
  React.useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "foundrr:edit-text", on: !!editingText },
      "*",
    );
  }, [editingText, url]);

  // Toggle image-replace mode inside the preview iframe.
  React.useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "foundrr:edit-image", on: !!editingImage },
      "*",
    );
  }, [editingImage, url]);

  if (status === "error") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <p className="text-[14px] font-medium">Önizləmə açılmadı</p>
        <p className="max-w-[340px] text-[13px] text-muted-foreground">{errorMsg}</p>
        <p className="text-[12px] text-muted-foreground">
          “Kod” sekmesinə keçib faylları yenə də görə bilərsən.
        </p>
      </div>
    );
  }

  const isMobile = device === "mobile";

  return (
    <div className="relative flex h-full items-center justify-center overflow-auto bg-muted/40 p-4">
      <div
        className="relative h-full overflow-hidden rounded-xl border border-border bg-card shadow-[0_20px_50px_-30px_hsl(var(--foreground)/0.25)] transition-[max-width] duration-300"
        style={{ maxWidth: isMobile ? 390 : "100%", width: "100%" }}
      >
        {url ? (
          <iframe
            ref={iframeRef}
            src={reloadKey > 0 ? `${url}${url.includes("?") ? "&" : "?"}__r=${reloadKey}` : url}
            title="Sayt önizləməsi"
            className="h-full w-full bg-white"
            allow="cross-origin-isolated"
            onLoad={() => {
              // Re-arm the edit modes after each (re)load — the auto-reload swaps
              // the document and resets the injected scripts.
              const win = iframeRef.current?.contentWindow;
              win?.postMessage({ type: "foundrr:select", on: !!selecting }, "*");
              win?.postMessage({ type: "foundrr:edit-text", on: !!editingText }, "*");
              win?.postMessage({ type: "foundrr:edit-image", on: !!editingImage }, "*");
            }}
          />
        ) : null}

        {(selecting || editingText || editingImage) && !uploading ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center p-3">
            <span className="rounded-full bg-foreground/90 px-3 py-1.5 text-[12px] font-medium text-background shadow-lg backdrop-blur">
              {editingImage
                ? "Dəyişmək üçün bir şəklə toxun"
                : editingText
                  ? "Mətnə toxun, yaz, Enter ilə yadda saxla"
                  : "Dəyişmək istədiyin hissəyə toxun"}
            </span>
          </div>
        ) : null}

        {uploading ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-foreground/30 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 rounded-2xl bg-card px-5 py-3.5 shadow-[0_24px_60px_-24px_hsl(240_22%_13%/0.5)]">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-[13px] font-medium">Şəkil yüklənir…</span>
            </div>
          </div>
        ) : null}

        {status !== "ready" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/95 backdrop-blur">
            <div className="relative h-1.5 w-44 overflow-hidden rounded-full bg-border">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-[hsl(var(--grad-blue))] via-[hsl(var(--grad-violet))] to-[hsl(var(--grad-pink))]"
                style={{ animation: "build-shimmer 1.6s ease-in-out infinite" }}
              />
            </div>
            <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
              {STATUS_LABEL[status]}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
