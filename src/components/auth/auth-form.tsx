"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, Lock, Mail } from "lucide-react";

import { FoundrrLogo, FoundrrLogoMark } from "@/components/brand/foundrr-logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1S8.7 5.9 12 5.9c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.4 12 2.4 6.9 2.4 2.8 6.5 2.8 11.6S6.9 20.8 12 20.8c5.3 0 8.8-3.7 8.8-9 0-.6-.06-1-.15-1.6H12z"
      />
    </svg>
  );
}

function GithubGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

type Loading = null | "google" | "github" | "email";

interface AuthFormProps {
  mode: "login" | "signup";
  next?: string;
}

export function AuthForm({ mode, next = "/workspace" }: AuthFormProps) {
  const isSignup = mode === "signup";
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState<Loading>(null);
  const [resetSent, setResetSent] = React.useState(false);
  const [view, setView] = React.useState<"main" | "forgot">("main");
  const [error, setError] = React.useState<string | null>(null);

  const callbackUrl = () =>
    `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const oauth = async (provider: "google" | "github") => {
    setError(null);
    setLoading(provider);
    const { error } = await createClient().auth.signInWithOAuth({
      provider,
      options: { redirectTo: callbackUrl() },
    });
    if (error) {
      setError(
        "Daxil olmaq alınmadı — bu provayder hələ konfiqurasiya olunmayıb ola bilər.",
      );
      setLoading(null);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const mail = email.trim();
    if (!mail || !password) return;
    if (isSignup && password.length < 6) {
      setError("Şifrə ən azı 6 simvol olmalıdır.");
      return;
    }
    setError(null);
    setLoading("email");
    const supabase = createClient();

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({ email: mail, password });
      setLoading(null);
      if (error) {
        setError(
          /registered|exists/i.test(error.message)
            ? "Bu e-poçt artıq qeydiyyatdadır. Daxil ol."
            : "Hesab yaradıla bilmədi. Bir azdan yenidən cəhd et.",
        );
        return;
      }
      // Instant signup — no confirmation link. (If a session isn't returned, email
      // confirmation is still ON in Supabase; turn it off in Auth → Providers → Email.)
      if (data.session) {
        window.location.assign(next);
      } else {
        setError("Hesab yaradıldı. İndi e-poçt və şifrə ilə daxil ol.");
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: mail, password });
    setLoading(null);
    if (error) {
      setError(
        /not confirmed/i.test(error.message)
          ? "E-poçtunu təsdiqlə — sənə təsdiq linki göndərdik."
          : "E-poçt və ya şifrə yanlışdır.",
      );
      return;
    }
    window.location.assign(next);
  };

  const sendReset = async (event: React.FormEvent) => {
    event.preventDefault();
    const mail = email.trim();
    if (!mail) return;
    setError(null);
    setLoading("email");
    const { error } = await createClient().auth.resetPasswordForEmail(mail, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset`,
    });
    setLoading(null);
    if (error) {
      setError("Link göndərilə bilmədi. Bir azdan yenidən cəhd et.");
      return;
    }
    setResetSent(true);
  };

  if (resetSent) {
    return (
      <div className="w-full max-w-[400px] text-center">
        <FoundrrLogoMark size={28} className="mx-auto" />
        <h1 className="mt-8 text-[24px] font-semibold tracking-tight">E-poçtunu yoxla</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{email}</span> ünvanına şifrə
          sıfırlama linki göndərdik. Linkə klik et və yeni şifrə təyin et.
        </p>
        <button
          onClick={() => {
            setResetSent(false);
            setView("main");
          }}
          className="mt-6 text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
        >
          Girişə qayıt
        </button>
      </div>
    );
  }

  if (view === "forgot") {
    return (
      <div className="w-full max-w-[400px]">
        <Link href="/" className="flex justify-center font-semibold tracking-tight">
          <FoundrrLogo markSize={28} wordmarkClassName="text-lg" />
        </Link>
        <h1 className="mt-8 text-center text-[26px] font-semibold tracking-tight">
          Şifrəni sıfırla
        </h1>
        <p className="mt-2 text-center text-[15px] leading-relaxed text-muted-foreground">
          E-poçtunu yaz — sənə yeni şifrə təyin etmək üçün link göndərək.
        </p>

        {error ? (
          <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-center text-[13px] text-destructive">
            {error}
          </p>
        ) : null}

        <form className="mt-6 flex flex-col gap-2.5" onSubmit={sendReset}>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="ad@nümunə.az"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-full"
            disabled={loading !== null}
          >
            {loading === "email" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sıfırlama linki göndər
          </Button>
        </form>

        <button
          onClick={() => {
            setView("main");
            setError(null);
          }}
          className="mt-6 block w-full text-center text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
        >
          Girişə qayıt
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px]">
      <Link href="/" className="flex justify-center font-semibold tracking-tight">
        <FoundrrLogo markSize={28} wordmarkClassName="text-lg" />
      </Link>

      <h1 className="mt-8 text-center text-[26px] font-semibold tracking-tight">
        {isSignup ? "Foundrr-a xoş gəlmisən" : "Yenidən xoş gəlmisən"}
      </h1>
      <p className="mt-2 text-center text-[15px] leading-relaxed text-muted-foreground">
        {isSignup
          ? "Hesab yarat və 100 pulsuz kredit qazan."
          : "Davam etmək üçün hesabına daxil ol."}
      </p>

      {error ? (
        <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-center text-[13px] text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-2.5">
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          disabled={loading !== null}
          onClick={() => oauth("google")}
        >
          {loading === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleGlyph />}
          Google ilə davam et
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          disabled={loading !== null}
          onClick={() => oauth("github")}
        >
          {loading === "github" ? <Loader2 className="h-4 w-4 animate-spin" /> : <GithubGlyph />}
          GitHub ilə davam et
        </Button>
      </div>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[12px] text-muted-foreground">və ya</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form className="flex flex-col gap-2.5" onSubmit={submit}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="ad@nümunə.az"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            minLength={6}
            placeholder={isSignup ? "Şifrə (ən azı 6 simvol)" : "Şifrə"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        {!isSignup ? (
          <button
            type="button"
            onClick={() => {
              setView("forgot");
              setError(null);
            }}
            className="-mt-0.5 self-end text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Şifrəni unutdun?
          </button>
        ) : null}
        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="w-full"
          disabled={loading !== null}
        >
          {loading === "email" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isSignup ? "Hesab yarat" : "Daxil ol"}
        </Button>
      </form>

      <p className="mt-6 text-center text-[14px] text-muted-foreground">
        {isSignup ? "Artıq hesabın var? " : "Hesabın yoxdur? "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {isSignup ? "Daxil ol" : "Qeydiyyatdan keç"}
        </Link>
      </p>

      {isSignup ? (
        <p className="mt-5 text-center text-[12px] leading-relaxed text-muted-foreground">
          Davam etməklə{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground">
            Şərtlər
          </Link>{" "}
          və{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground">
            Məxfilik Siyasəti
          </Link>{" "}
          ilə razılaşırsan.
        </p>
      ) : null}
    </div>
  );
}
