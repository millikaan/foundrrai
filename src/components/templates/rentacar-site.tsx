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
  Users,
  Fuel,
  Settings2,
  ShieldCheck,
  Truck,
  Infinity as InfinityIcon,
  Headphones,
} from "lucide-react";

const navLinks = [
  { label: "Park", href: "#park" },
  { label: "Niyə biz", href: "#niye-biz" },
  { label: "Rəylər", href: "#reyler" },
  { label: "Rezervasiya", href: "#rezervasiya" },
];

const stats = [
  { value: "120+", label: "Avtomobil parkı" },
  { value: "10 il", label: "Bazarda təcrübə" },
  { value: "24/7", label: "Dəstək və çatdırılma" },
  { value: "4.9★", label: "Müştəri reytinqi" },
];

const cars = [
  {
    name: "Mercedes-Benz E-Class",
    cls: "Premium",
    img: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: "5 nəfər",
    gear: "Avtomat",
    fuel: "Benzin",
    price: "180",
  },
  {
    name: "Ford Mustang GT",
    cls: "Sport",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: "4 nəfər",
    gear: "Avtomat",
    fuel: "Benzin",
    price: "220",
  },
  {
    name: "Audi A7 Sportback",
    cls: "Lüks",
    img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: "5 nəfər",
    gear: "Avtomat",
    fuel: "Benzin",
    price: "200",
  },
  {
    name: "Chevrolet Camaro",
    cls: "Sport",
    img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: "4 nəfər",
    gear: "Avtomat",
    fuel: "Benzin",
    price: "165",
  },
  {
    name: "Toyota Camry",
    cls: "Komfort",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: "5 nəfər",
    gear: "Avtomat",
    fuel: "Hibrid",
    price: "75",
  },
  {
    name: "Porsche Panamera",
    cls: "Biznes",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: "4 nəfər",
    gear: "Avtomat",
    fuel: "Benzin",
    price: "210",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Tam sığorta",
    text: "Hər icarə KASKO və icbari sığorta ilə təmin olunur. Yolda tam arxayınlıq.",
  },
  {
    icon: Truck,
    title: "Pulsuz çatdırılma",
    text: "Avtomobili hava limanına, otelə və ya ünvanınıza ödənişsiz gətiririk.",
  },
  {
    icon: InfinityIcon,
    title: "Limitsiz kilometraj",
    text: "Məsafə limiti yoxdur — Bakıdan regionlara qədər istədiyiniz qədər sürün.",
  },
  {
    icon: Headphones,
    title: "24/7 yol dəstəyi",
    text: "Gecə-gündüz əlçatan komanda. Hər hansı problemdə dərhal yanınızdayıq.",
  },
];

const testimonials = [
  {
    name: "Aysel Məmmədova",
    role: "Korporativ müştəri",
    text: "Biznes səfərlərim üçün həmişə Sahil Rent-a-Car seçirəm. Avtomobillər təmiz, xidmət dəqiqdir, çatdırılma vaxtında olur.",
  },
  {
    name: "Elvin Hüseynov",
    role: "Toy mərasimi",
    text: "Toyumuz üçün ağ Mercedes sifariş etdik. Maşın qüsursuz vəziyyətdə idi, komanda hər detalı düşünmüşdü. Tövsiyə edirəm.",
  },
  {
    name: "Nigar Əliyeva",
    role: "Turist",
    text: "Bakıya gələndə hava limanında bizi gözləyirdilər. Rahat, problemsiz və çox peşəkar yanaşma. Növbəti dəfə yenə onlarla.",
  },
];

const footerLinks = {
  Park: ["Premium sinif", "Sport avtomobillər", "Biznes sinif", "Komfort sinif"],
  Şirkət: ["Haqqımızda", "İcarə şərtləri", "Sığorta", "Karyera"],
  Dəstək: ["Tez-tez soruşulanlar", "Çatdırılma", "Əlaqə", "Filiallar"],
};

export function RentacarSite() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-900/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-900">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" />
                <path d="M5 13h14v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
                <circle cx="7.5" cy="15.5" r=".6" fill="currentColor" />
                <circle cx="16.5" cy="15.5" r=".6" fill="currentColor" />
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">
              Sahil <span className="font-normal text-zinc-400">Rent-a-Car</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+994125550199"
              className="hidden items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white lg:flex"
            >
              <Phone className="h-4 w-4" />
              +994 12 555 01 99
            </a>
            <a
              href="#rezervasiya"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-transform hover:scale-[1.03]"
            >
              İcarə et
              <ArrowRight className="h-4 w-4" />
            </a>
            <button type="button" className="text-white md:hidden" aria-label="Menyu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-zinc-900">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-zinc-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 sm:pt-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-zinc-200 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Bakıda premium avtomobil icarəsi
            </span>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl">
              Yolun səviyyəsini
              <br />
              <span className="text-zinc-400">özünüz seçin.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-300">
              Lüks və biznes sinif avtomobillərdən ibarət seçilmiş park. Sığorta,
              çatdırılma və limitsiz kilometraj — hamısı bir icarədə.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#park"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition-transform hover:scale-[1.03]"
              >
                Parkı kəşf et
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#rezervasiya"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Rezervasiya
              </a>
            </div>
          </div>
        </div>

        {/* Booking search bar */}
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl shadow-zinc-900/20">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-zinc-50">
                <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                  <MapPin className="h-3.5 w-3.5" /> Götürülmə yeri
                </label>
                <input
                  type="text"
                  defaultValue="Bakı, Heydər Əliyev hava limanı"
                  className="w-full bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400"
                  placeholder="Şəhər və ya hava limanı"
                />
              </div>
              <div className="flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-zinc-50">
                <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                  <Clock className="h-3.5 w-3.5" /> Götürülmə tarixi
                </label>
                <input
                  type="text"
                  defaultValue="25 İyun, 10:00"
                  className="w-full bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400"
                  placeholder="Tarix və saat"
                />
              </div>
              <div className="flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-zinc-50">
                <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                  <Clock className="h-3.5 w-3.5" /> Qaytarılma tarixi
                </label>
                <input
                  type="text"
                  defaultValue="28 İyun, 10:00"
                  className="w-full bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400"
                  placeholder="Tarix və saat"
                />
              </div>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Axtar
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-8 text-center sm:px-8">
                <div className="text-4xl font-semibold tracking-tight text-zinc-900">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="park" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                Avtomobil parkı
              </span>
              <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
                Hər səfər üçün uyğun maşın
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-zinc-500">
              Komfort sinifdən tutmuş lüks avtomobillərə qədər — qiymətlər gündəlik,
              əlavə gizli ödəniş yoxdur.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <div
                key={car.name}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/5"
              >
                <div className="relative h-52 overflow-hidden bg-zinc-100">
                  <img
                    src={car.img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur">
                    {car.cls}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
                    {car.name}
                  </h3>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-y border-zinc-100 py-4">
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Users className="h-4 w-4 text-zinc-400" />
                      <span className="text-xs text-zinc-600">{car.seats}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 border-x border-zinc-100 text-center">
                      <Settings2 className="h-4 w-4 text-zinc-400" />
                      <span className="text-xs text-zinc-600">{car.gear}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Fuel className="h-4 w-4 text-zinc-400" />
                      <span className="text-xs text-zinc-600">{car.fuel}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-semibold tracking-tight text-zinc-900">
                        {car.price} ₼
                      </span>
                      <span className="text-sm text-zinc-400"> / gün</span>
                    </div>
                    <a
                      href="#rezervasiya"
                      className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                    >
                      İcarə et
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About with image */}
      <section className="bg-zinc-50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                alt=""
                className="h-[460px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl sm:block">
              <div className="flex items-center gap-1 text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                4.9 / 5
              </div>
              <div className="text-sm text-zinc-500">2 400+ rəyə əsasən</div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Haqqımızda
            </span>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
              10 ildir Bakını hərəkətdə saxlayırıq
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600">
              Sahil Rent-a-Car 2014-cü ildən bəri Azərbaycanda etibarlı avtomobil
              icarəsi xidməti göstərir. Hər avtomobilimiz icarədən əvvəl tam texniki
              baxışdan keçir və daxili təmizliklə təhvil verilir.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Şəffaf qiymət — gizli ödəniş yoxdur",
                "Yeni model avtomobillər, orta yaş 2 il",
                "Sürətli rəsmiləşdirmə, 15 dəqiqədə yolda",
                "Korporativ və uzunmüddətli icarə endirimləri",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-zinc-900">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </span>
                  <span className="text-base text-zinc-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why us / benefits */}
      <section id="niye-biz" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Niyə biz
            </span>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
              İcarə zamanı arxayınlıq
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-500">
              Hər təfərrüat müştərinin rahatlığı üçün düşünülüb.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-7 transition-colors hover:border-zinc-300"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reyler" className="bg-zinc-900 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Müştəri rəyləri
            </span>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Onlar bizə etibar etdi
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 flex-1 text-base leading-relaxed text-zinc-200">
                  “{t.text}”
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-900">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-zinc-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation form */}
      <section id="rezervasiya" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image side */}
              <div className="relative hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                  <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white">
                    Rezervasiya cəmi
                    <br />2 dəqiqə çəkir
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-300">
                    Formu doldurun, menecerimiz dərhal sizinlə əlaqə saxlasın və
                    avtomobili təsdiqləsin.
                  </p>
                  <div className="mt-8 space-y-3">
                    <a href="tel:+994125550199" className="flex items-center gap-3 text-sm text-zinc-200">
                      <Phone className="h-4 w-4 text-zinc-400" /> +994 12 555 01 99
                    </a>
                    <a href="tel:+994125508840" className="flex items-center gap-3 text-sm text-zinc-200">
                      <Mail className="h-4 w-4 text-zinc-400" /> +994 12 550 88 40
                    </a>
                    <div className="flex items-center gap-3 text-sm text-zinc-200">
                      <MapPin className="h-4 w-4 text-zinc-400" /> Nizami küç. 203, Bakı
                    </div>
                  </div>
                </div>
              </div>

              {/* Form side */}
              <div className="p-8 sm:p-12">
                <span className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                  Rezervasiya
                </span>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
                  Avtomobilinizi sifariş edin
                </h3>

                <form className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Ad, soyad
                      </label>
                      <input
                        type="text"
                        placeholder="Rəşad Quliyev"
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        placeholder="+994 50 555 00 00"
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                      Avtomobil sinfi
                    </label>
                    <select className="w-full appearance-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900">
                      <option>Premium sinif</option>
                      <option>Sport sinif</option>
                      <option>Lüks sinif</option>
                      <option>Biznes sinif</option>
                      <option>Komfort sinif</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Götürülmə tarixi
                      </label>
                      <input
                        type="text"
                        placeholder="25 İyun"
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Qaytarılma tarixi
                      </label>
                      <input
                        type="text"
                        placeholder="28 İyun"
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                  >
                    Rezervasiyanı təsdiqlə
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs text-zinc-400">
                    Formu göndərməklə icarə şərtləri ilə razılaşırsınız.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-5">
            <div className="col-span-2">
              <a href="#" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-900">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" />
                    <path d="M5 13h14v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
                    <circle cx="7.5" cy="15.5" r=".6" fill="currentColor" />
                    <circle cx="16.5" cy="15.5" r=".6" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-lg font-semibold tracking-tight text-white">
                  Sahil <span className="font-normal text-zinc-400">Rent-a-Car</span>
                </span>
              </a>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
                Bakıda premium avtomobil icarəsi. Sığortalı, çatdırılmalı və limitsiz
                kilometrajla — 2014-cü ildən etibarən.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" stroke="none">
                    <path d="M14 9h2.5l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.8.1 14.8.1 12.5.1 11 1.5 11 4.1V6H8.5v3H11v8h3z" />
                  </svg>
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-white">{title}</h4>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
            <p className="text-sm text-zinc-500">
              © 2025 Sahil Rent-a-Car. Bütün hüquqlar qorunur.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
                Məxfilik
              </a>
              <a href="#" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">
                İcarə şərtləri
              </a>
              <span className="text-sm text-zinc-500">Sahil Rent-a-Car</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
