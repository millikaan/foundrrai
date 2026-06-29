"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, Lock } from "lucide-react";

import { FoundrrLogo } from "@/components/brand/foundrr-logo";
import { Button } from "@/components/ui/button";
import { Bloom } from "@/components/landing/bloom";
import { createClient } from "@/lib/supabase/client";

/**
 * "Set a new password" page. The reset email links here via /auth/callback, which
 * exchanges the recovery code into a session — so by the time this renders the
 * user has a recovery session and `updateUser({ password })` works.
 */
export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState<"checking" | "ok" | "invalid">("checking");

  React.useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setReady(data.user ? "ok" : "invalid"))
      .catch(() => setReady("invalid"));
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 6) {
      setError("Şifrə ən azı 6 simvol olmalıdır.");
      return;
    }
    if (password !== confirm) {
      setError("Şifrələr uyğun gəlmir.");
      return;
    }
    setError(null);
    setLoading(true);
    const { error } = await createClient().auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError("Şifrə yenilənmədi. Link köhnəlmiş ola bilər — yenidən cəhd et.");
      return;
    }
    window.location.assign("/workspace");
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
      <Bloom variant="closing" />
      <div className="relative z-10 w-full max-w-[400px]">
        <Link href="/" className="flex justify-center font-semibold tracking-tight">
          <FoundrrLogo markSize={28} wordmarkClassName="text-lg" />
        </Link>
        <h1 className="mt-8 text-center text-[26px] font-semibold tracking-tight">
          Yeni şifrə təyin et
        </h1>

        {ready === "invalid" ? (
          <>
            <p className="mt-3 text-center text-[15px] leading-relaxed text-muted-foreground">
              Link köhnəlib və ya keçərsizdir. Yenidən şifrə sıfırlama linki istə.
            </p>
            <Link
              href="/login"
              className="mt-6 block text-center text-[14px] font-medium text-foreground underline-offset-4 hover:underline"
            >
              Girişə qayıt
            </Link>
          </>
        ) : (
          <>
            <p className="mt-2 text-center text-[15px] leading-relaxed text-muted-foreground">
              Hesabın üçün yeni şifrə seç.
            </p>

            {error ? (
              <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-center text-[13px] text-destructive">
                {error}
              </p>
            ) : null}

            <form className="mt-6 flex flex-col gap-2.5" onSubmit={submit}>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="Yeni şifrə (ən azı 6 simvol)"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="Yeni şifrəni təkrarla"
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  className={inputClass}
                />
              </div>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-full"
                disabled={loading || ready !== "ok"}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Şifrəni yenilə
              </Button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
