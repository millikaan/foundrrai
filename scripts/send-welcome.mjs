// Dev utility: send the Foundrr welcome email to any address via Resend.
//
//   node --env-file=.env.local scripts/send-welcome.mjs kaantest66@gmail.com
//   # or:
//   RESEND_API_KEY=re_xxx node scripts/send-welcome.mjs kaantest66@gmail.com
//
// Mirrors src/lib/email/welcome.ts so you can preview the real email in an inbox.

const to = process.argv[2];
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.WELCOME_FROM ?? "Foundrr <kaan@guluzada.dev>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.foundrr.online";
const name = process.argv[3] ?? "Kaan";

if (!to) {
  console.error("Usage: node scripts/send-welcome.mjs <email> [name]");
  process.exit(1);
}
if (!apiKey) {
  console.error("Missing RESEND_API_KEY. Run with --env-file=.env.local or RESEND_API_KEY=...");
  process.exit(1);
}

const GRADIENT = "linear-gradient(135deg,#3b6cff 0%,#7735e9 38%,#ff3da6 72%,#ff8a3d 100%)";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const html = `<!doctype html>
<html lang="az"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="color-scheme" content="light"/></head>
<body style="margin:0;padding:0;background:#faf8f5;-webkit-font-smoothing:antialiased;">
  <span style="display:none!important;opacity:0;color:#faf8f5;font-size:1px;line-height:1px;max-height:0;max-width:0;overflow:hidden;">Fikrini yaz — saytın hazır olsun. Hesabında 100 pulsuz kredit var.</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 16px;"><tr><td align="center">
    <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border:1px solid #efe9e1;border-radius:24px;overflow:hidden;box-shadow:0 24px 60px -34px rgba(40,28,20,0.20);">
      <tr><td style="height:6px;background-color:#7735e9;background-image:${GRADIENT};"></td></tr>
      <tr><td style="padding:34px 38px 0;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="vertical-align:middle;"><img src="${SITE_URL}/logo.png" width="36" height="36" alt="Foundrr" style="display:block;width:36px;height:36px;border-radius:50%;" /></td>
        <td style="vertical-align:middle;padding-left:11px;font-family:${FONT};font-size:18px;font-weight:700;color:#1b1830;">Foundrr</td>
      </tr></table></td></tr>
      <tr><td style="padding:24px 38px 0;font-family:${FONT};">
        <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:#1b1830;">Foundrr-a xoş gəlmisən, ${name}! 🎉</h1>
        <p style="margin:14px 0 0;font-size:15.5px;line-height:1.65;color:#55506a;">Fikrini yaz — saytın hazır olsun. Bir cümlə kifayətdir: biznesini təsvir et, Foundrr sənə tam işlək, real sayt qursun.</p>
        <p style="margin:12px 0 0;font-size:15.5px;line-height:1.65;color:#55506a;">Hesabında <b style="color:#1b1830;">100 pulsuz kredit</b> var — ilk saytını elə indi qura bilərsən.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 2px;"><tr><td style="border-radius:14px;background-color:#16131f;"><a href="${SITE_URL}/workspace" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:14px;">İlk saytını qur &nbsp;→</a></td></tr></table>
        <p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#8b859c;">Bu məktubu Foundrr hesabı açdığın üçün aldın.</p>
      </td></tr>
      <tr><td style="padding:30px 38px 34px;font-family:${FONT};"><div style="height:1px;background:#efe9e1;"></div>
        <p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#a39db4;">Foundrr · Bakı, Azərbaycan<br/><a href="${SITE_URL}" style="color:#7735e9;text-decoration:none;">foundrr.online</a> — fikrini yaz, saytın hazır olsun.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  body: JSON.stringify({ from, to, subject: "Foundrr-a xoş gəlmisən 🎉", html }),
});

if (res.ok) {
  console.log(`✅ Welcome email sent to ${to}`);
} else {
  console.error(`❌ Failed (${res.status}): ${await res.text()}`);
  process.exit(1);
}
