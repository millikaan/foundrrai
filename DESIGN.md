# Foundrr — DESIGN.md

The design bible for Foundrr's own marketing site and app UI. Foundrr is **inspired by soft prompt-first AI builder sites**, but it must not be a one-to-one replica. Use Foundrr's own cool cyan/teal/blue palette, Azerbaijani copy, local business examples, and a more product-led hero layout. Pairs with `CLAUDE.md` and `FOUNDRR_AGENT.md`.

> Goal: a polished, prompt-first AI builder landing for the Azerbaijan market — a stranger lands, sees a bright Foundrr-colored hero, understands the one-sentence-to-site workflow, and starts building. The page should resemble the attached references in softness, typography discipline, and prompt-first UX, while clearly using Foundrr's own colors and layout.

> **Business note for all copy:** Foundrr does **not** host sites and does **not** sell domains. The user deploys to **their own** Vercel/Netlify and buys/connects **their own** domain. Never write "hosting included" or "free domain." The promise: *the site is fully yours, on your own account.*

---

## 1. Landing layout (the structural pattern)

- **Light theme.** A bright, cool near-white background — not dark. Generous whitespace, lots of air.
- **Prompt-first hero.** Left-led content with the prompt box as the main action and a Foundrr-styled live build preview beside it on desktop. Keep mobile stacked and clean.
- **Soft gradient wash** behind the hero — cool blue/cyan/teal, not the reference site's warm pink/orange. No circular glow blobs.
- **Community / templates showcase** under the hero: a grid of project thumbnails in little browser frames. Shows real output, builds trust.
- **Light social proof.**
- **Clean sections** after, one accent used sparingly, crisp typography.
- **Pricing is not on the landing page.** Pricing lives only at `/pricing` and is linked from the menu.
- **Workspace (post-signup):** left sidebar with projects + credits + Upgrade; centered "Time to ship, {name}" with a prompt box; the builder adds a right-side live **Preview** with a **Database** tab and a top-right **Publish** button.

Use the reference as inspiration, not a template. The identity that makes it Foundrr is the Azerbaijani copy, the showcase of real AZ businesses, the cool palette, and the product-led hero composition.

---

## 2. Color — the committed palette (Foundrr cool aurora)

Foundrr's current identity is a **cool near-white** light theme with dark slate ink, pale cool panels, and a cyan/teal/blue aurora ramp used in big structural fields. All values are semantic HSL tokens in `globals.css`; prefer tokens and shared primitives over one-off component colors.

- **Light base:** cool near-white background, dark slate ink.
- **Panels:** pale cool off-white for large demo/stat/footer surfaces.
- **Primary action:** teal fill with white text. Outline buttons are white/hairline.
- **Aurora ramp:** blue `--grad-blue` → cyan `--grad-violet` → teal `--grad-pink` → green `--grad-orange`. This ramp belongs in hero/final gradient fields, brand mark, and occasional accent fills.
- **Logo / `.brand-mark`:** small cool aurora rounded mark, not a literal clone of another builder logo.
- Dark color-scheme is intentionally disabled for the marketing surface; the page remains light even on dark OS settings.

Keep contrast strong, focus rings visible, and the system consistent everywhere.

---

## 3. Typography & layout

- **Type:** a clean, characterful geometric sans (Geist is a good default) for display + body; a mono for labels, URLs, and step numbers. Set a clear scale with intentional weights.
  - Hero H1: large, tight tracking, `clamp(38px,6vw,68px)`, line-height ~1.05.
  - Section H2: `clamp(26px,3.4vw,36px)`.
  - Body: 15–16px, line-height 1.5–1.55.
- **Layout:** content max-width ~1120px, 24px side padding, sections ~84px vertical, hero ~150px top.

---

## 4. The signature — colorful B2B SaaS (no bubbles)

Foundrr's mood is **clean, soft, prompt-first AI builder** for the Azerbaijan market. Lean into the large cool gradient fields and sparse white UI, used structurally rather than as decoration. The signature:

- **No decorative kickers by default** — section headings stand on their own, like the reference screenshots.
- **Aurora gradient, used structurally** — full hero field, final CTA field, and brand mark. Avoid gradient text and colorful feature cards unless a specific surface needs it.
- **Quiet feature panels** — pale split containers or large stat blocks with black text, not icon-heavy cards.
- **Show the real product (anti-slop #1)** — the showcase renders real generated AZ sites (`SitePreview` + `TemplateSite`), not abstract gradients. Real product UI is what keeps the page from reading as a generic AI template. (A hero product-frame mockup was tried and removed at the user's request — the hero stays minimal: headline + subtext + prompt box.) References (Mobbin): FLORA, Height, Antimetal.
- **No dark feature band** — the current system stays light from top to bottom.
- **Bold gradient hero** — the hero sits on a full-bleed cool aurora gradient via `.bloom-hero`. Headline is solid dark slate; the prompt box is the primary action.
- **Gradient final CTA with footer panel** — the closing CTA floats over a soft cool gradient, followed by a large rounded pale footer panel.

**Forbidden (reads as bad / as a clone):** pill "bubble" labels (eyebrows), avatar-circle rows, alternating gray bands, and circular blurred glow-blobs. These were removed in the redesign — do **not** reintroduce them.

---

## 5. Global components

- **Nav** — fixed top, transparent at top; on scroll gains a light blurred background + a hairline bottom border. Left: `Foundrr` wordmark with a small gradient mark. Center links: Necə işləyir · Nümunələr · Qiymət (hidden on small screens). Right: `Daxil ol` (ghost) + `Pulsuz başla` (accent).
- **Buttons** — Accent (filled, hover lift + soft accent shadow), Ghost (quiet), Outline (hairline, hover → accent). Build variants in the design system; shadcn outline variants aren't transparent by default, so define states explicitly.
- **Pill / chip** — light surface, hairline border, radius 999px (chips) / 8px (inline), muted → text on hover. Chips carry a small accent `↑`.
- **Browser-frame card** — showcase: top bar (three dim dots + a mono domain URL), a thumbnail, a footer with name + mono tag. Hover: lift + soft shadow.

---

## 6. Landing page — section by section

All copy in **Azerbaijani**, exactly as below.

### 6.1 Hero
- Eyebrow pill: `• AI ilə saniyələr içində sayt`.
- H1 (two lines): **Fikrini yaz.** / **Saytın hazır olsun.** (line 2 may use the accent or a subtle gradient text).
- Sub: *Azərbaycan üçün AI sayt qurucusu. Bir cümlə yaz — dəqiqələr içində hazır sayt. Öz hesabına yayımla, tam sənin olsun.*
- **Prompt box + live preview**: prompt is the main action; on desktop pair it with a Foundrr-styled live build preview showing `Sayt yaradılır`, `Preview yaradılır`, build progress, and module cards. On mobile keep the prompt compact and let the next section title peek into the first viewport.
- Chips (centered): Diş klinikası · Gül mağazası · Restoran · Rent-a-car · Barbershop — each with accent `↑`.
- Social proof uses launch-realistic product facts only; do not invent user volume.

### 6.2 Showcase — "Foundrr ilə qurulanlar"
Subhead: *Bir cümlədən başlayan saytlar*. A 3-col grid (2 / 1 on smaller) of browser-frame cards: Dental Gülüm · Gül Evi · Sahil Rent-a-Car · Laləzar Restoran · Usta Barbershop · Ayla Store. URLs shown are the businesses' **own** connected domains. Replace with real generated sites in production.

### 6.3 How it works — "Üç addımda hazır sayt"
Subhead: *Texniki bilik tələb olunmur*. Three cards, mono step numbers `01/02/03` in the accent:
1. **Yaz** — Biznesini bir cümlə ilə təsvir et. Azərbaycan dilində, öz sözlərinlə.
2. **Qur** — Foundrr saniyələr içində tam hazır saytı yaradır. İstədiyini söylə, dəyişsin.
3. **Yayımla** — Bir kliklə öz Vercel hesabına yayımla. Domenini özün al və qoş — sayt tamamilə sənin.

### 6.4 Why — quiet 4-up row (NO emoji cards)
A bordered container split into 4 cells, bold label + one muted line:
- **Tam Azərbaycan dilində** — Mətn də, dizayn da yerli — tərcümə hiss olunmur.
- **Öz hesabına yayım** — Vercel / Netlify-ə bir kliklə. Sayt tamamilə sənin, kilid yoxdur.
- **Forma & ödəniş bazası** — Sifariş və rezervasiyalar Supabase-ə düşür.
- **Anında dəyişiklik** — Bir cümlə yaz — sayt dərhal yenilənir.

### 6.5 Pricing page — `/pricing`
Pricing must not appear on the landing page. The menu item `Qiymət` routes to `/pricing`. The pricing page has the heading **Sadə qiymət** and subhead *Qurmaq pulsuzdur — krediti bitəndə yenilə*. Three plans, **middle ("Pro") highlighted** with an accent border + "Ən populyar" badge:
- **Pulsuz — 0 ₼** · 5 qurma krediti · Limitsiz önizləmə · Anında redaktə · Bütün şablonlar → outline btn `Başla`.
- **Pro — 19 ₼/ay** · 100 kredit / ay · Öz Vercel/Netlify hesabına yayım · Brendsiz · Forma bazası (Supabase) → accent btn `Pro-ya keç`.
- **Biznes — 49 ₼/ay** · Limitsiz kredit · Ödəniş inteqrasiyası · Komanda · Prioritet dəstək → outline btn `Əlaqə`.

Small line under the grid: *Foundrr hostinq və ya domen satmır — saytı öz hesabına yayımlayır, domenini özün alırsan.* (Tune the numbers as you see fit.)

### 6.6 Final CTA
Centered, a dimmer bloom behind, top hairline. H2: **Bu gün saytını qur**. Sub: *Bir cümlə yaz, qalanını Foundrr etsin.* Button: `Pulsuz başla →`.

### 6.7 Footer
Left: wordmark + *Azərbaycan üçün AI sayt qurucusu. Fikrindən hazır sayta.* Columns (mono uppercase headings): **Məhsul** (Necə işləyir, Nümunələr, Qiymət) · **Şirkət** (Haqqında, Əlaqə, Bloq) · **Hüquqi** (Şərtlər, Məxfilik). Bottom bar: `© 2026 Foundrr` · `Bakı, Azərbaycan`.

---

## 7. Motion (deliberate, minimal)

- **Rotating placeholder** in the prompt box (fade ~220ms): "Bakıda diş klinikası üçün sayt…" → "Gül mağazası üçün sayt…" → "Rent-a-car şirkəti üçün sayt…" → "Restoran üçün sayt…" → "Barbershop üçün sayt…", every ~2.6s.
- **Scroll reveal**: fade + rise ~14px on enter (once).
- **Nav blur** on scroll, **hover lifts** on buttons/cards/chips.
- Respect `prefers-reduced-motion`. No confetti, no bounce, no parallax. Restraint.

---

## 8. App / builder UI

Reuse the same system. **Workspace:** left sidebar (projects, credits remaining, "Pro-ya keç"); center "Vaxtdır, {ad}" with the prompt box; right live **Preview** (iframe) with a device toggle and a **Baza** (Database) tab; top-right **Yayımla**. Preview chrome shows neutral `Önizləmə` while building (Foundrr isn't hosting it); after deploy it shows the user's **own** domain. Same bloom (dimmer), same prompt box throughout.

---

## 9. Build with taste (instead of a banned-color list)

- Light theme, real contrast, one accent used sparingly.
- No emoji feature-card rows. No big-number stat hero as the main element. No glassmorphism-everywhere or shadow soup.
- Don't reach for the most obvious default; make the palette and bloom feel chosen for Foundrr. Execute the chosen system precisely and consistently — that's where it reads as premium.
