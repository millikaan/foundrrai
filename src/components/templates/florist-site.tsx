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
  Truck,
  Heart,
  Flower2,
  Quote,
  Send,
  Calendar,
} from "lucide-react";

export function FloristSite() {
  const navLinks = [
    { label: "Buketlər", href: "#buketler" },
    { label: "Haqqımızda", href: "#haqqimizda" },
    { label: "Rəylər", href: "#reyler" },
    { label: "Çatdırılma", href: "#catdirilma" },
    { label: "Əlaqə", href: "#sifaris" },
  ];

  const bouquets = [
    {
      name: "Çəhrayı Pıçıltı",
      desc: "Zərif çəhrayı laləlar və ağ frezia ilə incə kompozisiya.",
      price: "65",
      img: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&w=800&q=80",
    },
    {
      name: "Bahar Çələngi",
      desc: "Mövsümi çiçəklərdən rəngarəng, həyat dolu buket.",
      price: "85",
      img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&w=800&q=80",
    },
    {
      name: "Mələk Toxunuşu",
      desc: "Ağ və krem çalarlarda klassik, romantik aranjman.",
      price: "95",
      img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&w=800&q=80",
    },
  ];

  const stats = [
    { value: "12+", label: "il təcrübə" },
    { value: "8 000+", label: "xoşbəxt sifariş" },
    { value: "2 saat", label: "şəhər daxili çatdırılma" },
    { value: "4.9", label: "müştəri reytinqi" },
  ];

  const testimonials = [
    {
      name: "Nigar Əliyeva",
      role: "İllik müştəri",
      text: "Hər dəfə buketlər təsəvvür etdiyimdən də gözəl olur. Çatdırılma dəqiq vaxtında, çiçəklər tər-təzə. Gül Evi mənim seçimimdir.",
    },
    {
      name: "Rəşad Məmmədov",
      role: "Bakı",
      text: "Həyat yoldaşımın ad günü üçün sifariş etdim. Zəng vurub xırdalıqları soruşdular, nəticə möhtəşəm oldu. Təşəkkürlər!",
    },
    {
      name: "Aysel Hüseynova",
      role: "Toy təşkilatçısı",
      text: "Toy bəzəkləri üçün uzun müddətdir onlarla işləyirik. Zövqlü, peşəkar və həmişə vaxtında. Tam etibar edirəm.",
    },
  ];

  const plans = [
    {
      name: "Gündəlik",
      price: "55",
      note: "tək buket",
      features: [
        "Mövsümi təzə çiçəklər",
        "Zərif kağız bəzək",
        "Şəxsi açıqca",
        "Şəhər daxili çatdırılma",
      ],
      featured: false,
    },
    {
      name: "Münasibət",
      price: "120",
      note: "premium aranjman",
      features: [
        "Seçmə premium çiçəklər",
        "Dizayner kompozisiya",
        "Lüks qutu və lent",
        "Eyni gün 2 saatlıq çatdırılma",
        "Pulsuz açıqca və şokolad",
      ],
      featured: true,
    },
    {
      name: "Abunəlik",
      price: "199",
      note: "ayda 4 buket",
      features: [
        "Həftəlik təzə buket",
        "Hər dəfə fərqli dizayn",
        "Sabit endirimli qiymət",
        "Çevik tarix dəyişikliyi",
      ],
      featured: false,
    },
  ];

  const HERO_IMG =
    "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&w=1600&q=80";
  const STORE_IMG =
    "https://images.unsplash.com/photo-1487070183336-b863922373d4?ixlib=rb-4.0.3&w=1600&q=80";

  return (
    <div className="min-h-screen bg-[#FBF7F4] font-sans text-stone-800 antialiased">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-50 border-b border-stone-200/60 bg-[#FBF7F4]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-300/30 text-rose-500">
              <Flower2 className="h-5 w-5" />
            </span>
            <span className="text-xl font-semibold tracking-tight text-stone-900">
              Gül Evi
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-stone-600 transition-colors hover:text-rose-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+994125550199"
              className="hidden text-sm font-medium text-stone-600 transition-colors hover:text-rose-500 lg:block"
            >
              +994 12 555 01 99
            </a>
            <a
              href="#sifaris"
              className="hidden rounded-full bg-rose-400 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-500 sm:inline-block"
            >
              Sifariş et
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-600 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative">
        <div className="relative h-[640px] w-full overflow-hidden">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/55 via-stone-900/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF7F4]/30 via-transparent to-transparent" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  <Heart className="h-3.5 w-3.5" /> Bakıda çiçək sənəti
                </span>
                <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
                  Hisslərinizi
                  <br />
                  çiçəklərlə danışdırın
                </h1>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
                  Hər səhər seçilən təzə çiçəklərdən əl ilə hazırlanan
                  buketlər. Bakı boyu eyni gün çatdırılma ilə.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#sifaris"
                    className="inline-flex items-center gap-2 rounded-full bg-rose-400 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-900/20 transition-colors hover:bg-rose-500"
                  >
                    Sifariş et
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#buketler"
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                  >
                    Buketlərə bax
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <section id="catdirilma" className="border-b border-stone-200/70 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-3">
          {[
            {
              icon: Truck,
              title: "Eyni gün çatdırılma",
              text: "Saat 15:00-dək verilən sifarişlər həmin gün təhvil verilir.",
            },
            {
              icon: Clock,
              title: "2 saatlıq təhvil",
              text: "Şəhər daxili premium sifarişlər ən geci 2 saata yetişir.",
            },
            {
              icon: Flower2,
              title: "Hər gün təzə",
              text: "Çiçəklər hər səhər seçilir — solğun ləçək satmırıq.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-stone-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-500">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Catalog ===== */}
      <section id="buketler" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
              Kolleksiya
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900">
              Seçilmiş buketlər
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-500">
              Hər buket əllə, zövqlə və sevgi ilə hazırlanır. Sizin
              münasibətinizə uyğun aranjman seçin.
            </p>
          </div>
          <a
            href="#sifaris"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-500 transition-colors hover:text-rose-600"
          >
            Bütün kolleksiya
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {bouquets.map((b) => (
            <div
              key={b.name}
              className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-stone-900/5"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={b.img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur">
                  {b.price} ₼
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-stone-900">
                  {b.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {b.desc}
                </p>
                <a
                  href="#sifaris"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-500 transition-colors hover:text-rose-600"
                >
                  Sifariş et
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="haqqimizda" className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-24 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-stone-200/80 shadow-lg shadow-stone-900/5">
              <img
                src={STORE_IMG}
                alt=""
                className="h-[520px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-stone-200/80 bg-[#FBF7F4] p-6 shadow-xl sm:block">
              <div className="flex items-center gap-1 text-rose-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-sm font-semibold text-stone-900">
                4.9 / 5 reytinq
              </p>
              <p className="text-xs text-stone-500">8 000+ sifariş əsasında</p>
            </div>
          </div>

          <div className="max-w-lg">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
              Haqqımızda
            </span>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-stone-900">
              2012-dən bəri Bakının çiçək ustası
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone-600">
              Gül Evi kiçik bir mağaza kimi başladı, bu gün isə şəhərin ən
              sevilən çiçək studiyalarından biridir. Hər buketi sənət əsəri
              kimi yanaşaraq, yalnız təzə və keyfiyyətli çiçəklərlə işləyirik.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Toy, ad günü, açılış və ya sadəcə "səni düşünürəm" demək üçün —
              hisslərinizi ən gözəl formada çatdırırıq.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-rose-200 pl-4">
                  <div className="text-3xl font-semibold tracking-tight text-stone-900">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-stone-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section id="reyler" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-lg text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
            Müştəri rəyləri
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900">
            Sevgi ilə deyilən sözlər
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm"
            >
              <Quote className="h-8 w-8 text-rose-200" />
              <p className="mt-4 flex-1 text-base leading-relaxed text-stone-700">
                {t.text}
              </p>
              <div className="mt-6 flex items-center gap-1 text-rose-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="mt-4 border-t border-stone-100 pt-4">
                <div className="text-sm font-semibold text-stone-900">
                  {t.name}
                </div>
                <div className="text-sm text-stone-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-lg text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
              Paketlər
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900">
              Hər münasibətə uyğun
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-500">
              Tək buketdən aylıq abunəliyə qədər — sizə uyğun olanı seçin.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.featured
                    ? "relative rounded-2xl border-2 border-rose-300 bg-rose-50/40 p-8 shadow-xl shadow-rose-900/5"
                    : "relative rounded-2xl border border-stone-200/80 bg-[#FBF7F4] p-8"
                }
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-400 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
                    Ən populyar
                  </span>
                )}
                <h3 className="text-lg font-semibold text-stone-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight text-stone-900">
                    {plan.price} ₼
                  </span>
                  <span className="text-sm text-stone-500">/ {plan.note}</span>
                </div>
                <ul className="mt-7 space-y-3.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-stone-600"
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#sifaris"
                  className={
                    plan.featured
                      ? "mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-rose-400 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-500"
                      : "mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:border-rose-300 hover:text-rose-500"
                  }
                >
                  Seç
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Order form ===== */}
      <section id="sifaris" className="mx-auto max-w-7xl px-6 py-24">
        <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-lg shadow-stone-900/5 lg:grid lg:grid-cols-5">
          {/* Left visual / info */}
          <div className="relative hidden lg:col-span-2 lg:block">
            <img
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&w=800&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-10">
              <h3 className="text-2xl font-semibold leading-tight text-white">
                Sifarişinizi
                <br />
                birlikdə hazırlayaq
              </h3>
              <div className="mt-7 space-y-4 text-sm text-white/90">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-rose-200" />
                  +994 12 555 01 99
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-rose-200" />
                  +994 12 488 55 20
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-rose-200" />
                  Nizami küç. 28, Bakı
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-rose-200" />
                  Hər gün 09:00 – 21:00
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="p-8 sm:p-12 lg:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
              Sifariş
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
              Buket sifarişi ver
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              Formu doldurun, 30 dəqiqə ərzində sizinlə əlaqə saxlayaq və
              detalları dəqiqləşdirək.
            </p>

            <form className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Adınız
                </label>
                <input
                  type="text"
                  placeholder="Adınız və soyadınız"
                  className="w-full rounded-xl border border-stone-200 bg-[#FBF7F4] px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none transition-colors focus:border-rose-300 focus:bg-white"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Telefon
                </label>
                <input
                  type="tel"
                  placeholder="+994 __ ___ __ __"
                  className="w-full rounded-xl border border-stone-200 bg-[#FBF7F4] px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none transition-colors focus:border-rose-300 focus:bg-white"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Çatdırılma tarixi
                </label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Gün / Ay / İl"
                    className="w-full rounded-xl border border-stone-200 bg-[#FBF7F4] py-3 pl-11 pr-4 text-sm text-stone-800 placeholder-stone-400 outline-none transition-colors focus:border-rose-300 focus:bg-white"
                  />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Buket
                </label>
                <input
                  type="text"
                  placeholder="Məs. Bahar Çələngi"
                  className="w-full rounded-xl border border-stone-200 bg-[#FBF7F4] px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none transition-colors focus:border-rose-300 focus:bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Çatdırılma ünvanı
                </label>
                <input
                  type="text"
                  placeholder="Şəhər, küçə, bina, mənzil"
                  className="w-full rounded-xl border border-stone-200 bg-[#FBF7F4] px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none transition-colors focus:border-rose-300 focus:bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Qeyd (istəyə bağlı)
                </label>
                <textarea
                  rows={3}
                  placeholder="Açıqca üçün mesaj, xüsusi istəklər..."
                  className="w-full resize-none rounded-xl border border-stone-200 bg-[#FBF7F4] px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none transition-colors focus:border-rose-300 focus:bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-900/15 transition-colors hover:bg-rose-500"
                >
                  Sifarişi göndər
                  <Send className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-xs text-stone-400">
                  Göndərməklə əlaqə şərtlərini qəbul etmiş olursunuz.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-stone-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-300/30 text-rose-500">
                  <Flower2 className="h-5 w-5" />
                </span>
                <span className="text-xl font-semibold tracking-tight text-stone-900">
                  Gül Evi
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-500">
                Bakının çiçək studiyası. Hər səhər təzə, hər buket sevgi ilə.
              </p>
              <div className="mt-5 flex items-center gap-3">
                {/* Instagram (inline svg — lucide brand icons unavailable) */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-colors hover:border-rose-300 hover:text-rose-500"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                {/* Facebook (inline svg) */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-colors hover:border-rose-300 hover:text-rose-500"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M14 9h3l.5-3H14V4.5c0-.8.3-1.5 1.5-1.5H17.5V.2C17.2.1 16.1 0 14.9 0 12.4 0 10.7 1.5 10.7 4.3V6H8v3h2.7v9h3.3V9z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-stone-900">Menyu</h4>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-stone-500 transition-colors hover:text-rose-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-stone-900">Əlaqə</h4>
              <ul className="mt-4 space-y-3 text-sm text-stone-500">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-rose-400" />
                  +994 12 555 01 99
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-rose-400" />
                  +994 12 488 55 20
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-400" />
                  Nizami küç. 28, Səbail, Bakı
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-stone-900">
                İş saatları
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-stone-500">
                <li className="flex items-center justify-between">
                  <span>B.e – Cümə</span>
                  <span className="text-stone-700">09:00 – 21:00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Şənbə</span>
                  <span className="text-stone-700">10:00 – 21:00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Bazar</span>
                  <span className="text-stone-700">10:00 – 19:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-100 pt-8 sm:flex-row">
            <p className="text-sm text-stone-400">
              © 2024 Gül Evi · Bütün hüquqlar qorunur
            </p>
            <div className="flex items-center gap-6 text-sm text-stone-400">
              <a href="#" className="transition-colors hover:text-rose-500">
                Məxfilik
              </a>
              <a href="#" className="transition-colors hover:text-rose-500">
                Şərtlər
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
