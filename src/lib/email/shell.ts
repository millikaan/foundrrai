/**
 * Shared branded email layout — matches the Foundrr landing aesthetic (cool
 * crisp paper, the aurora emerald→teal→cyan→azure gradient, dark headline, dark
 * CTA). Email-safe: a single full HTML document, table layout, inline styles
 * only, with solid-color fallbacks for clients (Outlook) that don't render CSS
 * gradients.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.foundrr.online";

export interface EmailContent {
  /** Hidden inbox-preview text. */
  preheader: string;
  heading: string;
  /** First paragraph (plain text — escaped). */
  intro: string;
  /** Optional extra trusted HTML (e.g. a highlighted line). */
  bodyHtml?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  /** Small muted note under the CTA (plain text — escaped). */
  footnote?: string;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const GRADIENT = "linear-gradient(135deg,#14CC89 0%,#13C3B1 38%,#0ACEF5 72%,#2A81F4 100%)";

export function emailShell(c: EmailContent): string {
  const cta =
    c.ctaLabel && c.ctaUrl
      ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 2px;"><tr>
            <td style="border-radius:14px;background-color:#0e1a1e;">
              <a href="${c.ctaUrl}" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:14px;">${esc(
                c.ctaLabel,
              )} &nbsp;→</a>
            </td></tr></table>`
      : "";

  return `<!doctype html>
<html lang="az"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="light"/>
<meta name="supported-color-schemes" content="light"/>
</head>
<body style="margin:0;padding:0;background:#f5f9fa;-webkit-font-smoothing:antialiased;">
  <span style="display:none!important;opacity:0;color:#f5f9fa;font-size:1px;line-height:1px;max-height:0;max-width:0;overflow:hidden;">${esc(
    c.preheader,
  )}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f9fa;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border:1px solid #e6eef0;border-radius:24px;overflow:hidden;box-shadow:0 24px 60px -34px rgba(15,30,35,0.20);">
        <tr><td style="height:6px;background-color:#0fa98f;background-image:${GRADIENT};"></td></tr>
        <tr><td style="padding:34px 38px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;"><img src="${SITE_URL}/logo.png" width="36" height="36" alt="Foundrr" style="display:block;width:36px;height:36px;border-radius:50%;" /></td>
            <td style="vertical-align:middle;padding-left:11px;font-family:${FONT};font-size:18px;font-weight:700;letter-spacing:-0.01em;color:#0f1b1f;">Foundrr</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:24px 38px 0;font-family:${FONT};">
          <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-0.015em;color:#0f1b1f;">${esc(
            c.heading,
          )}</h1>
          <p style="margin:14px 0 0;font-size:15.5px;line-height:1.65;color:#46555b;">${esc(c.intro)}</p>
          ${c.bodyHtml ?? ""}
          ${cta}
          ${
            c.footnote
              ? `<p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#78868c;">${esc(c.footnote)}</p>`
              : ""
          }
        </td></tr>
        <tr><td style="padding:30px 38px 34px;font-family:${FONT};">
          <div style="height:1px;background:#e6eef0;"></div>
          <p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#8fa0a6;">
            Foundrr · Bakı, Azərbaycan<br/>
            <a href="${SITE_URL}" style="color:#0e9e86;text-decoration:none;">foundrr.online</a> — fikrini yaz, saytın hazır olsun.
          </p>
        </td></tr>
      </table>
      <p style="margin:18px 0 0;font-family:${FONT};font-size:11px;color:#a6b3b8;">© Foundrr</p>
    </td></tr>
  </table>
</body></html>`;
}

export { SITE_URL };
