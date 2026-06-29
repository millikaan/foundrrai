import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Coffee,
  MapPin,
  Menu,
  Phone,
  Quote,
  Sparkles,
  Star,
  Wifi,
} from "lucide-react";

export function CafeSite() {
  const HERO =
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80";
  const INTERIOR =
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80";
  const BARISTA =
    "https://images.unsplash.com/photo-1511920170033-f8396924c10b?auto=format&fit=crop&w=1200&q=80";

  const menu = [
    {
      cat: "Qəhvə",
      items: [
        {
          name: "Flat White",
          desc: "Double espresso, buxarlı tam yağlı süd",
          price: "6",
          img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Cold Brew",
          desc: "12 saat soyudulmuş, tünd və hamar",
          price: "7",
          img: "https://images.unsplash.com/photo-1517701603779-8a692e1e1a2a?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Matcha Latte",
          desc: "Yapon matchası, badam südü ilə",
          price: "8",
          img: "https://images.unsplash.com/photo-1515823064-d8953a479f2e?auto=format&fit=crop&w=600&q=80",
        },
      ],
    },
    {
      cat: "Desert & Brunch",
      items: [
        {
          name: "Kruasan",
          desc: "Hər səhər təzə, Fransız yağı ilə",
          price: "4",
          img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Avokado tost",
          desc: "Tam buğda çörəyi, pomidor, zeytun yağı",
          price: "9",
          img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Cheesecake",
          desc: "Ev resepti, meyvə sousu ilə",
          price: "8",
          img: "https://images.unsplash.com/photo-1524351199678-855a58a52aea?auto=format&fit=crop&w=600&q=80",
        },
      ],
    },
  ];

  const testimonials = [
    {
      name: "Leyla Məmmədova",
      role: "Dizayner · Nizami",
      text: "Flat white-i şəhərdə ən yaxşısıdır. Sakit atmosfer, sürətli xidmət — remote iş üçün ideal.",
    },
    {
      name: "Orxan Həsənov",
      role: "Həftəlik müştəri",
      text: "Desertlər möhtəşəmdir, xüsusilə cheesecake. Hər bazar günü burada başlayıram.",
    },
    {
      name: "Günay Quliyeva",
      role: "Bakı",
      text: "Wi‑Fi stabil, oturacaqlar rahat, baristalar həmişə gülümsəyir. Sevimli kafem.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0ea] font-sans text-stone-800 antialiased">
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#f5f0ea]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-[#f5f0ea] shadow-[0_8px_24px_-12px_rgba(28,25,23,0.55)]">
              <Coffee className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="leading-none">
              <span className="text-[17px] font-semibold tracking-tight text-stone-900">
                Köhnə Küçə
              </span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
                Qəhvə evi
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-9 text-[13px] font-medium text-stone-600 md:flex">
            <a href="#menyu" className="transition-colors hover:text-stone-900">Menyu</a>
            <a href="#hekimizda" className="transition-colors hover:text-stone-900">Haqqımızda</a>
            <a href="#reyler" className="transition-colors hover:text-stone-900">Rəylər</a>
            <a href="#elaqe" className="transition-colors hover:text-stone-900">Əlaqə</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#elaqe"
              className="hidden items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-[13px] font-semibold text-[#f5f0ea] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Masa tut
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-6 pt-5 sm:pt-6">
        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-50px_rgba(28,25,23,0.45)]">
          <img src={HERO} alt="" className="h-[min(72vh,640px)] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/82 via-stone-950/45 to-stone-950/15" />
          <div className="absolute inset-0 flex flex-col justify-end px-8 pb-12 sm:px-14 sm:pb-16 lg:px-20 lg:pb-20">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Nizami · 2018-dən
            </span>
            <h1 className="mt-6 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight text-white">
              Hər fincan —
              <span className="block text-amber-200/95">sakit bir an.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/78">
              Əl ilə hazırlanan qəhvə, ev bişmiş desertlər və isti atmosfer. Səhər ofisə gedən yolun ən yaxşı dayanacağı.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#menyu"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
              >
                Menyuya bax
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#elaqe"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/30 px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Masa rezervasiyası
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-6">
        <div className="grid grid-cols-2 divide-x divide-stone-200/80 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_1px_2px_rgba(28,25,23,0.04)] md:grid-cols-4">
          {[
            { value: "4.9", label: "Google reytinqi" },
            { value: "18", label: "Qəhvə növü" },
            { value: "08–22", label: "Hər gün açıq" },
            { value: "45", label: "Oturacaq yeri" },
          ].map((s) => (
            <div key={s.label} className="px-5 py-7 text-center sm:px-6 sm:py-8">
              <div className="text-[28px] font-semibold tracking-tight text-stone-900 sm:text-[32px]">
                {s.value}
              </div>
              <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="menyu" className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-900/80">
            Menyu
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-tight text-stone-900">
            Seçilmiş dadlar
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
            Təzə dənli qəhvə, ev bişmiş desertlər və yüngül brunch — hamısı bir fincan sevgi ilə.
          </p>
        </div>

        <div className="space-y-16">
          {menu.map((group) => (
            <div key={group.cat}>
              <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                {group.cat}
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <article
                    key={item.name}
                    className="group overflow-hidden rounded-[1.25rem] border border-stone-200/80 bg-white shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-32px_rgba(28,25,23,0.28)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.img}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <div className="flex items-start justify-between gap-3 p-5">
                      <div>
                        <h4 className="font-semibold text-stone-900">{item.name}</h4>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-stone-500">
                          {item.desc}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-[13px] font-semibold text-amber-900">
                        {item.price} ₼
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="hekimizda" className="border-y border-stone-200 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <img
              src={INTERIOR}
              alt=""
              className="h-[420px] w-full rounded-[1.5rem] object-cover shadow-[0_24px_60px_-40px_rgba(28,25,23,0.35)]"
            />
            <img
              src={BARISTA}
              alt=""
              className="absolute -bottom-6 -right-4 hidden h-44 w-36 rounded-2xl border-4 border-white object-cover shadow-xl sm:block lg:-right-8 lg:h-52 lg:w-44"
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-900/80">
              Haqqımızda
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-stone-900">
              Qəhvə mədəniyyəti,
              <span className="block text-stone-600">sadəcə yaxşı.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-stone-600">
              Köhnə Küçə 2018-ci ildən Nizami rayonunda kiçik bir kafedir. Hər səhər dənli
              qəhvəni özümüz qovururuq, desertləri isə hər gün təzə hazırlayırıq.
            </p>
            <ul className="mt-8 space-y-3.5">
              {[
                { icon: Coffee, text: "Single origin dənli qəhvə" },
                { icon: Check, text: "Vegan və glutensiz seçimlər" },
                { icon: Wifi, text: "Wi‑Fi və sakit iş zonası" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[14px] text-stone-700">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-900">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="reyler" className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mb-12 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-900/80">
            Rəylər
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-stone-900">
            Qonaqlarımız deyir
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-[1.25rem] border border-stone-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(28,25,23,0.04)]"
            >
              <Quote className="h-5 w-5 text-amber-800/60" strokeWidth={1.5} />
              <blockquote className="mt-4 text-[14px] leading-relaxed text-stone-600">
                {t.text}
              </blockquote>
              <div className="mt-5 flex items-center gap-1 text-amber-700">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <figcaption className="mt-4 border-t border-stone-100 pt-4">
                <p className="text-[14px] font-semibold text-stone-900">{t.name}</p>
                <p className="text-[12px] text-stone-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="elaqe" className="bg-stone-900 py-16 text-stone-100 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300/80">
              Əlaqə
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight">
              Bizimlə görüş
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-400">
              Masa rezervasiyası, korporativ sifarişlər və xüsusi tədbirlər üçün zəng edin.
            </p>
            <div className="mt-8 space-y-4 text-[14px]">
              <p className="flex items-center gap-3 text-stone-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8">
                  <MapPin className="h-4 w-4 text-amber-300" />
                </span>
                Köhnə Küçə 14, Nizami, Bakı
              </p>
              <p className="flex items-center gap-3 text-stone-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8">
                  <Phone className="h-4 w-4 text-amber-300" />
                </span>
                +994 12 488 22 10
              </p>
              <p className="flex items-center gap-3 text-stone-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8">
                  <Clock className="h-4 w-4 text-amber-300" />
                </span>
                Hər gün 08:00 – 22:00
              </p>
            </div>
          </div>

          <form className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
            <p className="text-[16px] font-semibold">Masa rezervasiyası</p>
            <p className="mt-1 text-[13px] text-stone-500">2 saat ərzində geri dönüş edirik.</p>
            <div className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="Ad, soyad"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] outline-none placeholder:text-stone-500 focus:border-amber-400/40"
              />
              <input
                type="text"
                placeholder="Tarix və saat"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] outline-none placeholder:text-stone-500 focus:border-amber-400/40"
              />
              <input
                type="tel"
                placeholder="+994 ..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] outline-none placeholder:text-stone-500 focus:border-amber-400/40"
              />
            </div>
            <button
              type="button"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3.5 text-[14px] font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
            >
              Göndər
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
        <p className="mx-auto mt-12 max-w-7xl px-6 text-center text-[12px] text-stone-600">
          © 2026 Köhnə Küçə · Bütün hüquqlar qorunur
        </p>
      </section>
    </div>
  );
}
