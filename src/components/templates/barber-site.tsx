import {
  Phone,
  Mail,
  MapPin,
  Star,
  Check,
  ArrowRight,
  ArrowUpRight,
  Menu,
  Clock,
  Calendar,
  Aperture,
  Share2,
  Quote,
  Sparkles,
  Scissors,
} from "lucide-react";

export function BarberSite() {
  const HERO =
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80";
  const G1 =
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80";
  const G2 =
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80";
  const G3 =
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80";
  const G4 =
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80";
  const ABOUT =
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1600&q=80";

  const navLinks = [
    { label: "Xidmətlər", href: "#xidmetler" },
    { label: "Ustalar", href: "#ustalar" },
    { label: "Qalereya", href: "#qalereya" },
    { label: "Rəylər", href: "#reyler" },
    { label: "Əlaqə", href: "#elaqe" },
  ];

  const services = [
    {
      cat: "Saç",
      items: [
        { name: "Qadın saç kəsimi", desc: "Forma, uzunluq və üz tipinə uyğun", price: "35" },
        { name: "Kişi saç kəsimi", desc: "Klassik, fade və müasir modellər", price: "20" },
        { name: "Saç yığımı / fön", desc: "Tədbir və gündəlik üçün", price: "30" },
      ],
    },
    {
      cat: "Boyama",
      items: [
        { name: "Tam boyama", desc: "Keyfiyyətli, saçı qoruyan boyalar", price: "70" },
        { name: "Ombre / balayaj", desc: "Təbii keçidlər, fərdi ton seçimi", price: "120" },
        { name: "Kök boyama", desc: "Çıxan köklərin yenilənməsi", price: "45" },
      ],
    },
    {
      cat: "Baxım",
      items: [
        { name: "Manikür + lak", desc: "Gigiyenik manikür, gel-lak örtük", price: "40" },
        { name: "Üz baxımı", desc: "Təmizləmə, nəmləndirmə, maska", price: "55" },
        { name: "Kişi qulluğu", desc: "Saqqal forması və üz baxımı", price: "25" },
      ],
    },
  ];

  const team = [
    { name: "Aysel Hüseynova", role: "Baş stilist · Kolorist", years: "12 il", initials: "AH" },
    { name: "Nigar Əliyeva", role: "Saç ustası", years: "8 il", initials: "NƏ" },
    { name: "Leyla Quliyeva", role: "Manikür ustası", years: "6 il", initials: "LQ" },
    { name: "Murad Rəhimov", role: "Kişi qulluğu ustası", years: "9 il", initials: "MR" },
  ];

  const gallery = [
    { src: G1, label: "Salon interyeri" },
    { src: G2, label: "Fön və yığım" },
    { src: G3, label: "Atmosfer" },
    { src: G4, label: "Kişi qulluğu" },
  ];

  const testimonials = [
    {
      quote:
        "İllərdir saçımı yalnız Lümen-ə etibar edirəm. Aysel xanım rəngi tam istədiyim kimi tutdu, nəticə möhtəşəm idi.",
      name: "Günel Məmmədova",
      role: "Daimi müştəri",
    },
    {
      quote:
        "Çox təmiz və rahat mühit. Onlayn növbə sistemi gözləmədən qəbul olunmağa imkan verdi. Tövsiyə edirəm.",
      name: "Rəşad Səfərov",
      role: "Kişi qulluğu",
    },
    {
      quote:
        "Balayaj üçün gəlmişdim — keçidlər çox təbii alındı. Komanda işinə peşəkar yanaşır, ətraf isə zövqlü.",
      name: "Səbinə Vəliyeva",
      role: "Boyama",
    },
  ];

  const stats = [
    { value: "9 il", label: "Bakıda təcrübə" },
    { value: "12K+", label: "Məmnun müştəri" },
    { value: "4.9", label: "Orta reytinq" },
    { value: "8", label: "Peşəkar usta" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-50/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-stone-50">
              <Scissors className="h-4 w-4" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Lümen <span className="font-light text-stone-500">Salon</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#novbe"
              className="hidden items-center gap-1.5 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-800 sm:inline-flex"
            >
              Onlayn növbə
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-700 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[640px] w-full overflow-hidden">
          <img src={HERO} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/45 to-stone-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/55 to-transparent" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Bakının premium saç & gözəllik salonu
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
                Gözəlliyiniz üçün
                <span className="block font-light italic text-stone-200">
                  incə bir toxunuş
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-stone-200">
                Saç, boyama, dırnaq və üz baxımı — təcrübəli ustalar, zövqlü
                mühit və hər müştəriyə fərdi yanaşma. Növbənizi onlayn təyin edin.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#novbe"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-50 px-7 py-3.5 text-sm font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
                >
                  Onlayn növbə tut
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#xidmetler"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Xidmətlərə bax
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-stone-200 px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <div className="text-3xl font-semibold tracking-tight text-stone-900">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-stone-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="xidmetler" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-rose-400">
              <span className="h-px w-8 bg-rose-300" />
              Xidmətlər
            </div>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
              Hər detalda zövq və qayğı
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-stone-500">
            Bütün xidmətlər premium məhsullar və steril alətlərlə həyata
            keçirilir. Qiymətlər başlanğıc dəyəri göstərir.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((group) => (
            <div
              key={group.cat}
              className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <h3 className="text-lg font-semibold tracking-tight text-stone-900">
                  {group.cat}
                </h3>
                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-500">
                  {group.items.length} xidmət
                </span>
              </div>
              <ul className="mt-5 space-y-5">
                {group.items.map((it) => (
                  <li key={it.name} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-stone-900">
                        {it.name}
                      </div>
                      <div className="mt-0.5 text-xs leading-relaxed text-stone-500">
                        {it.desc}
                      </div>
                    </div>
                    <div className="whitespace-nowrap text-sm font-semibold text-stone-900">
                      {it.price} <span className="text-stone-400">₼</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img src={ABOUT} alt="" className="h-[520px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden w-56 rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-lg sm:block">
              <div className="flex items-center gap-1 text-rose-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-sm font-medium leading-snug text-stone-700">
                “Şəhərin ən rahat salonu.”
              </p>
              <p className="mt-1 text-xs text-stone-400">— 1 200+ rəy əsasında</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-rose-400">
              <span className="h-px w-8 bg-rose-300" />
              Haqqımızda
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
              2017-dən bəri
              <span className="block font-light italic text-stone-500">
                gözəlliyə xidmət
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone-600">
              Lümen Salon Bakının mərkəzində, sakit və işıqlı bir məkanda
              qurulub. Komandamız hər müştəriyə tələsmədən, fərdi yanaşır —
              məqsədimiz sizi yalnız gözəl deyil, həm də özünüzü yaxşı hiss
              etdirməkdir.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Beynəlxalq markalı, saçı qoruyan məhsullar",
                "Steril alətlər və gigiyena standartları",
                "Fərdi konsultasiya və ton seçimi",
                "Rahat onlayn növbə sistemi",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-900 text-stone-50">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-stone-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="ustalar" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-rose-400">
            <span className="h-px w-8 bg-rose-300" />
            Ustalar
            <span className="h-px w-8 bg-rose-300" />
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            İşinə aşiq komanda
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div
              key={m.name}
              className="group rounded-2xl border border-stone-200 bg-white p-7 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-xl font-semibold tracking-tight text-stone-700 transition-colors group-hover:bg-stone-900 group-hover:text-stone-50">
                {m.initials}
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-stone-900">
                {m.name}
              </h3>
              <p className="mt-1 text-sm text-rose-400">{m.role}</p>
              <p className="mt-2 text-xs text-stone-400">{m.years} təcrübə</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="qalereya" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-rose-400">
                <span className="h-px w-8 bg-rose-300" />
                Qalereya
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                Salondan görüntülər
              </h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-stone-900"
            >
              Instagram-da daha çox
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.map((g, i) => (
              <div
                key={i}
                className={`group relative h-72 overflow-hidden rounded-2xl ${
                  i === 0 ? "col-span-2 row-span-2 lg:col-span-2 lg:h-full" : ""
                }`}
              >
                <img
                  src={g.src}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {g.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reyler" className="bg-stone-900 py-24 text-stone-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-rose-300">
              <span className="h-px w-8 bg-rose-400/50" />
              Rəylər
              <span className="h-px w-8 bg-rose-400/50" />
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Müştərilərimiz nə deyir
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <Quote className="h-7 w-7 text-rose-300/70" />
                <p className="mt-5 text-base font-light leading-relaxed text-stone-200">
                  {t.quote}
                </p>
                <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-700 text-sm font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-stone-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="novbe" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="relative hidden lg:block">
                <img src={G2} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
              </div>

              <div className="p-10 sm:p-14">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-rose-400">
                  <span className="h-px w-8 bg-rose-300" />
                  Onlayn növbə
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                  Növbənizi təyin edin
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  Formu doldurun — ustamız sizə ən qısa zamanda zəng vurub vaxtı
                  təsdiqləsin.
                </p>

                <form className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-600">
                        Ad, soyad
                      </label>
                      <input
                        type="text"
                        placeholder="Aysel Məmmədova"
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-600">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        placeholder="+994 50 123 45 67"
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-stone-600">
                      Xidmət
                    </label>
                    <select className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:border-stone-900 focus:outline-none">
                      <option>Saç kəsimi</option>
                      <option>Boyama / balayaj</option>
                      <option>Manikür</option>
                      <option>Üz baxımı</option>
                      <option>Kişi qulluğu</option>
                    </select>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-600">
                        Tarix
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="25 İyun"
                          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 pr-10 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
                        />
                        <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-stone-600">
                        Saat
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="14:30"
                          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 pr-10 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
                        />
                        <Clock className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-stone-50 transition-colors hover:bg-stone-800"
                  >
                    Növbəni təsdiqlə
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs text-stone-400">
                    Formu göndərməklə əlaqə şərtlərini qəbul edirsiniz.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="elaqe" className="bg-stone-950 text-stone-400">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <a href="#" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 text-stone-900">
                  <Scissors className="h-4 w-4" />
                </span>
                <span className="text-lg font-semibold tracking-tight text-stone-50">
                  Lümen <span className="font-light text-stone-400">Salon</span>
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed">
                Bakının mərkəzində premium saç və gözəllik salonu. Gözəlliyiniz
                üçün incə bir toxunuş.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {[Aperture, Share2].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-800 text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-50"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-50">
                Naviqasiya
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-stone-50">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-50">
                İş saatları
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center justify-between gap-6">
                  <span>B.e — Cümə</span>
                  <span className="text-stone-300">10:00 — 21:00</span>
                </li>
                <li className="flex items-center justify-between gap-6">
                  <span>Şənbə</span>
                  <span className="text-stone-300">10:00 — 20:00</span>
                </li>
                <li className="flex items-center justify-between gap-6">
                  <span>Bazar</span>
                  <span className="text-stone-300">11:00 — 18:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-50">
                Əlaqə
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-300" />
                  Nizami küç. 96, Səbail, Bakı
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 flex-shrink-0 text-rose-300" />
                  +994 12 408 75 30
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 flex-shrink-0 text-rose-300" />
                  +994 12 408 75 30
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-stone-800 pt-6 text-xs text-stone-500 sm:flex-row">
            <span>© 2026 Lümen Salon. Bütün hüquqlar qorunur.</span>
            <span>Bakı, Azərbaycan</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
