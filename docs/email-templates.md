# Foundrr — Supabase email templates

Branded, landing-page-style HTML for the auth emails Supabase sends. The **welcome
email** is handled in code (`src/lib/email/welcome.ts`) — these are the ones you
paste into the Supabase dashboard.

**Where:** Supabase → Authentication → Emails → **Templates**. For each template
below, set the **Subject** and replace the message body with the HTML block. Keep
the `{{ .ConfirmationURL }}` variable exactly as-is — Supabase fills it in.

> Tip: also turn on **Authentication → Emails → "Password changed"** notification
> (the toggle you saw) and paste the third template there.

---

## 1. Confirm signup

**Subject:** `Foundrr — e-poçtunu təsdiqlə`

```html
<!doctype html><html lang="az"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="color-scheme" content="light"/></head>
<body style="margin:0;padding:0;background:#faf8f5;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border:1px solid #efe9e1;border-radius:24px;overflow:hidden;box-shadow:0 24px 60px -34px rgba(40,28,20,0.20);">
<tr><td style="height:6px;background-color:#7735e9;background-image:linear-gradient(90deg,#3b6cff,#7735e9,#ff3da6,#ff8a3d);"></td></tr>
<tr><td style="padding:34px 38px 0;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="vertical-align:middle;"><img src="https://www.foundrr.online/logo.png" width="36" height="36" alt="Foundrr" style="display:block;width:36px;height:36px;border-radius:50%;" /></td>
<td style="vertical-align:middle;padding-left:11px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;color:#1b1830;">Foundrr</td>
</tr></table></td></tr>
<tr><td style="padding:24px 38px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
<h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:#1b1830;">E-poçtunu təsdiqlə</h1>
<p style="margin:14px 0 0;font-size:15.5px;line-height:1.65;color:#55506a;">Foundrr-a xoş gəlmisən! Hesabını aktivləşdirmək üçün aşağıdakı düyməyə bir kliklə təsdiqlə — və ilk saytını qurmağa başla.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 2px;"><tr><td style="border-radius:14px;background-color:#16131f;"><a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:14px 28px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:14px;">E-poçtu təsdiqlə &nbsp;→</a></td></tr></table>
<p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#8b859c;">Bu hesabı sən açmamısansa, bu məktubu nəzərə alma.</p>
</td></tr>
<tr><td style="padding:30px 38px 34px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;"><div style="height:1px;background:#efe9e1;"></div>
<p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#a39db4;">Foundrr · Bakı, Azərbaycan<br/><a href="https://www.foundrr.online" style="color:#7735e9;text-decoration:none;">foundrr.online</a></p>
</td></tr></table></td></tr></table></body></html>
```

---

## 2. Reset password

**Subject:** `Foundrr — şifrəni sıfırla`

```html
<!doctype html><html lang="az"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="color-scheme" content="light"/></head>
<body style="margin:0;padding:0;background:#faf8f5;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border:1px solid #efe9e1;border-radius:24px;overflow:hidden;box-shadow:0 24px 60px -34px rgba(40,28,20,0.20);">
<tr><td style="height:6px;background-color:#7735e9;background-image:linear-gradient(90deg,#3b6cff,#7735e9,#ff3da6,#ff8a3d);"></td></tr>
<tr><td style="padding:34px 38px 0;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="vertical-align:middle;"><img src="https://www.foundrr.online/logo.png" width="36" height="36" alt="Foundrr" style="display:block;width:36px;height:36px;border-radius:50%;" /></td>
<td style="vertical-align:middle;padding-left:11px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;color:#1b1830;">Foundrr</td>
</tr></table></td></tr>
<tr><td style="padding:24px 38px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
<h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:#1b1830;">Şifrəni sıfırla</h1>
<p style="margin:14px 0 0;font-size:15.5px;line-height:1.65;color:#55506a;">Şifrəni unutmusan? Narahat olma. Aşağıdakı düymə ilə dərhal yeni şifrə təyin et.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 2px;"><tr><td style="border-radius:14px;background-color:#16131f;"><a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:14px 28px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:14px;">Şifrəni sıfırla &nbsp;→</a></td></tr></table>
<p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#8b859c;">Bu linki sən istəməmisənsə, məhəl qoyma — şifrən dəyişməyəcək.</p>
</td></tr>
<tr><td style="padding:30px 38px 34px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;"><div style="height:1px;background:#efe9e1;"></div>
<p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#a39db4;">Foundrr · Bakı, Azərbaycan<br/><a href="https://www.foundrr.online" style="color:#7735e9;text-decoration:none;">foundrr.online</a></p>
</td></tr></table></td></tr></table></body></html>
```

---

## 3. Password changed (notification)

**Subject:** `Foundrr — şifrən dəyişdirildi`

```html
<!doctype html><html lang="az"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="color-scheme" content="light"/></head>
<body style="margin:0;padding:0;background:#faf8f5;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border:1px solid #efe9e1;border-radius:24px;overflow:hidden;box-shadow:0 24px 60px -34px rgba(40,28,20,0.20);">
<tr><td style="height:6px;background-color:#7735e9;background-image:linear-gradient(90deg,#3b6cff,#7735e9,#ff3da6,#ff8a3d);"></td></tr>
<tr><td style="padding:34px 38px 0;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="vertical-align:middle;"><img src="https://www.foundrr.online/logo.png" width="36" height="36" alt="Foundrr" style="display:block;width:36px;height:36px;border-radius:50%;" /></td>
<td style="vertical-align:middle;padding-left:11px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;color:#1b1830;">Foundrr</td>
</tr></table></td></tr>
<tr><td style="padding:24px 38px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
<h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:#1b1830;">Şifrən dəyişdirildi</h1>
<p style="margin:14px 0 0;font-size:15.5px;line-height:1.65;color:#55506a;">Hesabının şifrəsi yeniləndi. Bu sən idinsə, heç nə etmək lazım deyil.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 2px;"><tr><td style="border-radius:14px;background-color:#16131f;"><a href="https://www.foundrr.online/login" style="display:inline-block;padding:14px 28px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:14px;">Hesaba keç &nbsp;→</a></td></tr></table>
<p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#8b859c;">Bu sən deyildinsə, dərhal şifrəni sıfırla və bizimlə əlaqə saxla.</p>
</td></tr>
<tr><td style="padding:30px 38px 34px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;"><div style="height:1px;background:#efe9e1;"></div>
<p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#a39db4;">Foundrr · Bakı, Azərbaycan<br/><a href="https://www.foundrr.online" style="color:#7735e9;text-decoration:none;">foundrr.online</a></p>
</td></tr></table></td></tr></table></body></html>
```
