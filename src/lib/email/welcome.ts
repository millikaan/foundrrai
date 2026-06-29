/** Branded Azerbaijani welcome email, sent once when a new user first lands. */

import { SITE_URL, emailShell } from "@/lib/email/shell";

export function welcomeEmailHtml(name?: string | null): string {
  const greetName = name?.trim() ? `, ${name.trim()}` : "";
  return emailShell({
    preheader: "Fikrini yaz — saytın hazır olsun. Hesabında 100 pulsuz kredit var.",
    heading: `Foundrr-a xoş gəlmisən${greetName}! 🎉`,
    intro:
      "Fikrini yaz — saytın hazır olsun. Bir cümlə kifayətdir: biznesini təsvir et, Foundrr sənə tam işlək, real sayt qursun.",
    bodyHtml:
      '<p style="margin:12px 0 0;font-size:15.5px;line-height:1.65;color:#46555b;">Hesabında <b style="color:#0f1b1f;">100 pulsuz kredit</b> var — ilk saytını elə indi qura bilərsən.</p>',
    ctaLabel: "İlk saytını qur",
    ctaUrl: `${SITE_URL}/workspace`,
    footnote: "Bu məktubu Foundrr hesabı açdığın üçün aldın.",
  });
}

/** Send the welcome email via the Resend API. Returns false if not configured. */
export async function sendWelcomeEmail(to: string, name?: string | null): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return false;
  const from = process.env.WELCOME_FROM ?? "Foundrr <kaan@guluzada.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: "Foundrr-a xoş gəlmisən 🎉",
        html: welcomeEmailHtml(name),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
