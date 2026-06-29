import { Phone, Mail, MapPin, Star, Check, ArrowRight, Clock, Calendar, Aperture, Share2, Users, Quote, Menu } from "lucide-react";

export function RestaurantSite() {
  return (
    <div className="min-h-screen bg-[#100d0b] font-sans text-stone-100 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#100d0b]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-light tracking-[0.25em] text-amber-400">L</span>
            <div className="leading-none">
              <div className="text-base font-medium tracking-[0.2em] text-stone-50">LALƏZAR</div>
              <div className="mt-1 text-[10px] tracking-[0.35em] text-stone-400">RESTORAN</div>
            </div>
          </div>
          <nav className="hidden items-center gap-9 text-sm text-stone-300 md:flex">
            <a href="#hekaye" className="transition-colors hover:text-amber-400">Hekayə</a>
            <a href="#menyu" className="transition-colors hover:text-amber-400">Menyu</a>
            <a href="#qalereya" className="transition-colors hover:text-amber-400">Qalereya</a>
            <a href="#reylar" className="transition-colors hover:text-amber-400">Rəylər</a>
            <a href="#rezervasiya" className="transition-colors hover:text-amber-400">Əlaqə</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="tel:+994125550199" className="hidden items-center gap-2 text-sm text-stone-300 lg:flex">
              <Phone className="h-4 w-4 text-amber-400" />
              +994 12 555 01 99
            </a>
            <a href="#rezervasiya" className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-medium text-[#100d0b] transition-colors hover:bg-amber-300">
              Rezervasiya
            </a>
            <button type="button" className="text-stone-300 md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=1600&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100d0b] via-[#100d0b]/55 to-[#100d0b]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#100d0b]/70 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-amber-400" />
              <span className="text-xs font-medium tracking-[0.3em] text-amber-400">BAKI · 2009-CU İLDƏN</span>
            </div>
            <h1 className="text-5xl font-light leading-[1.05] tracking-tight text-stone-50 md:text-7xl">
              Azərbaycan mətbəxinin
              <span className="block font-normal italic text-amber-400">incə dadı</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-stone-300">
              Əsrlərin reseptləri, müasir təqdimat. Hər süfrə — Bakının ürəyində bir xatirə. Laləzar sizi isti və zərif bir axşama dəvət edir.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#rezervasiya" className="group inline-flex items-center gap-2.5 rounded-full bg-amber-400 px-8 py-4 text-sm font-medium text-[#100d0b] transition-colors hover:bg-amber-300">
                Masa rezervasiyası
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#menyu" className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-8 py-4 text-sm font-medium text-stone-100 transition-colors hover:border-amber-400 hover:text-amber-400">
                Menyuya bax
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-white/10 bg-[#16110d]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            { value: "15+", label: "İllik təcrübə" },
            { value: "48", label: "İmza yeməyi" },
            { value: "4.9", label: "Google reytinqi" },
            { value: "120", label: "Oturacaq yeri" },
          ].map((s) => (
            <div key={s.label} className="px-6 py-9 text-center">
              <div className="text-3xl font-light text-amber-400 md:text-4xl">{s.value}</div>
              <div className="mt-2 text-xs tracking-[0.15em] text-stone-400">{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About / Hekayə */}
      <section id="hekaye" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&w=1600&q=80"
              alt=""
              className="h-[520px] w-full rounded-2xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-amber-400/20 bg-[#16110d] px-8 py-6 shadow-xl md:block">
              <div className="text-3xl font-light text-amber-400">2009</div>
              <div className="mt-1 text-xs tracking-[0.15em] text-stone-400">QURULDUĞU İL</div>
            </div>
          </div>
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-12 bg-amber-400" />
              <span className="text-xs font-medium tracking-[0.3em] text-amber-400">BİZİM HEKAYƏ</span>
            </div>
            <h2 className="text-4xl font-light leading-tight tracking-tight text-stone-50 md:text-5xl">
              Nəsillərdən gələn <span className="italic text-amber-400">süfrə mədəniyyəti</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone-300">
              Laləzar 2009-cu ildə Bakının mərkəzində kiçik bir ailə süfrəsi kimi açıldı. Bu gün biz Azərbaycanın ən qədim reseptlərini dünya səviyyəli təqdimatla birləşdiririk.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone-400">
              Hər səhər bazardan seçilən təzə ərzaq, mis qazanlarda bişən plov, terras üzərindəki sakit axşamlar — bunların hamısı Laləzarın ruhudur.
            </p>
            <div className="mt-8 space-y-3">
              {["Təzə, yerli və mövsümi ərzaq", "Ənənəvi mis qazan və saç mətbəxi", "Şəhər mənzərəli zərif terras"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/15">
                    <Check className="h-3.5 w-3.5 text-amber-400" />
                  </span>
                  <span className="text-sm text-stone-300">{t}</span>
                </div>
              ))}
            </div>
            <div className="mt-9 border-l-2 border-amber-400/40 pl-5">
              <p className="text-lg font-light italic leading-relaxed text-stone-200">
                "Qonağı süfrəyə dəvət etmək — bizim üçün sənətdir."
              </p>
              <p className="mt-2 text-sm text-stone-400">— Murad Əliyev, baş aşpaz</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menyu" className="border-y border-white/10 bg-[#16110d] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-amber-400" />
              <span className="text-xs font-medium tracking-[0.3em] text-amber-400">İMZA MENYUSU</span>
              <span className="h-px w-12 bg-amber-400" />
            </div>
            <h2 className="text-4xl font-light tracking-tight text-stone-50 md:text-5xl">
              Süfrəmizdən <span className="italic text-amber-400">seçmələr</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone-400">
              Hər yemək əl ilə, ənənəvi üsulla hazırlanır. Mövsümi menyumuz hər ay yenilənir.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&w=800&q=80",
                name: "Şah Plov",
                desc: "Zəfəranlı düyü, quzu əti, qaysı və kişmiş ilə qazmaqda təqdim olunur.",
                price: "24 ₼",
                tag: "İmza",
              },
              {
                img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&w=800&q=80",
                name: "Saç İçi Kabab",
                desc: "Mis saçda közərdilmiş quzu, soğan, pomidor və yerli ədviyyatlarla.",
                price: "19 ₼",
                tag: "Populyar",
              },
              {
                img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&w=800&q=80",
                name: "Ev Dolması",
                desc: "Üzüm yarpağında ət və düyü, nanəli qatıq sousu müşayiəti ilə.",
                price: "16 ₼",
                tag: "Ənənəvi",
              },
            ].map((dish) => (
              <article key={dish.name} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#100d0b] transition-colors hover:border-amber-400/30">
                <div className="relative h-60 overflow-hidden">
                  <img src={dish.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#100d0b]/80 px-3 py-1 text-[10px] font-medium tracking-[0.15em] text-amber-400 backdrop-blur-sm">
                    {dish.tag.toUpperCase()}
                  </span>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-medium text-stone-50">{dish.name}</h3>
                    <span className="whitespace-nowrap text-lg font-light text-amber-400">{dish.price}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{dish.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Secondary menu list */}
          <div className="mx-auto mt-14 grid max-w-4xl gap-x-14 gap-y-5 md:grid-cols-2">
            {[
              { name: "Düşbərə", desc: "Naxış kürəcikləri, sarımsaqlı bulyon", price: "14 ₼" },
              { name: "Qutab", desc: "Göyərti, ət və ya balqabaq", price: "9 ₼" },
              { name: "Lülə Kabab", desc: "Mangalda, sumaqlı soğan ilə", price: "17 ₼" },
              { name: "Badımcan Kababı", desc: "Mövsümi tərəvəz, nar turşusu", price: "13 ₼" },
              { name: "Paxlava", desc: "Ev şəkəri, qoz və kardamon", price: "8 ₼" },
              { name: "Şəkərbura", desc: "Ənənəvi badamlı doldurma", price: "7 ₼" },
            ].map((item) => (
              <div key={item.name} className="border-b border-white/5 pb-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-medium text-stone-100">{item.name}</span>
                  <span className="h-px flex-1 border-b border-dotted border-white/15" />
                  <span className="font-light text-amber-400">{item.price}</span>
                </div>
                <p className="mt-1 text-xs text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="qalereya" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-12 bg-amber-400" />
              <span className="text-xs font-medium tracking-[0.3em] text-amber-400">ATMOSFER</span>
            </div>
            <h2 className="text-4xl font-light tracking-tight text-stone-50 md:text-5xl">
              Bir axşamın <span className="italic text-amber-400">ovqatı</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-stone-400">
            İsti işıqlar, mis detallar və Bakı mənzərəsi — Laləzarda hər masa öz hekayəsini danışır.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&w=1600&q=80"
              alt=""
              className="h-[460px] w-full rounded-2xl object-cover"
            />
          </div>
          <div className="grid gap-5">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&w=800&q=80"
              alt=""
              className="h-[220px] w-full rounded-2xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&w=800&q=80"
              alt=""
              className="h-[220px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reylar" className="border-y border-white/10 bg-[#16110d] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-amber-400" />
              <span className="text-xs font-medium tracking-[0.3em] text-amber-400">QONAQ RƏYLƏRİ</span>
              <span className="h-px w-12 bg-amber-400" />
            </div>
            <h2 className="text-4xl font-light tracking-tight text-stone-50 md:text-5xl">
              Süfrəmizdən <span className="italic text-amber-400">təəssüratlar</span>
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Şah plov sözün əsl mənasında möhtəşəm idi. Terras isə Bakının ən romantik məkanlarından biridir.",
                name: "Aysel Məmmədova",
                role: "Doğum günü qeydi",
              },
              {
                quote: "Xidmət qüsursuz, atmosfer isti. Ailəmizlə hər bayramı məhz Laləzarda keçiririk.",
                name: "Elvin Hüseynov",
                role: "Daimi qonaq",
              },
              {
                quote: "Düşbərə və saç içi kabab dadına söz ola bilməz. Ən təmiz Azərbaycan mətbəxi.",
                name: "Nigar Quliyeva",
                role: "Kulinariya bloqqeri",
              },
            ].map((t) => (
              <figure key={t.name} className="rounded-2xl border border-white/10 bg-[#100d0b] p-8">
                <Quote className="h-8 w-8 text-amber-400/40" />
                <div className="mt-4 flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-5 text-base leading-relaxed text-stone-200">"{t.quote}"</blockquote>
                <figcaption className="mt-7 border-t border-white/10 pt-5">
                  <div className="font-medium text-stone-50">{t.name}</div>
                  <div className="mt-0.5 text-xs text-stone-400">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section id="rezervasiya" className="mx-auto max-w-7xl px-6 py-24">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#16110d]">
          <div className="grid md:grid-cols-2">
            {/* Info */}
            <div className="relative p-10 md:p-14">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-12 bg-amber-400" />
                <span className="text-xs font-medium tracking-[0.3em] text-amber-400">REZERVASIYA</span>
              </div>
              <h2 className="text-4xl font-light leading-tight tracking-tight text-stone-50 md:text-5xl">
                Masanızı <span className="italic text-amber-400">qabaqcadan</span> tutun
              </h2>
              <p className="mt-5 text-base leading-relaxed text-stone-400">
                Axşam saatları üçün rezervasiya tövsiyə olunur. Formu doldurun, biz 15 dəqiqə ərzində sizinlə əlaqə saxlayaq.
              </p>
              <div className="mt-10 space-y-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10">
                    <MapPin className="h-5 w-5 text-amber-400" />
                  </span>
                  <div>
                    <div className="text-sm text-stone-100">Nizami küç. 84, Səbail</div>
                    <div className="text-xs text-stone-500">Bakı, Azərbaycan</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10">
                    <Phone className="h-5 w-5 text-amber-400" />
                  </span>
                  <div>
                    <div className="text-sm text-stone-100">+994 12 555 01 99</div>
                    <div className="text-xs text-stone-500">Hər gün 10:00 — 23:00</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10">
                    <Clock className="h-5 w-5 text-amber-400" />
                  </span>
                  <div>
                    <div className="text-sm text-stone-100">12:00 — 24:00</div>
                    <div className="text-xs text-stone-500">B.e — Bazar günləri</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="border-t border-white/10 bg-[#100d0b] p-10 md:border-l md:border-t-0 md:p-14">
              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs tracking-[0.1em] text-stone-400">AD VƏ SOYAD</label>
                  <input
                    type="text"
                    placeholder="Adınızı daxil edin"
                    className="w-full rounded-xl border border-white/10 bg-[#16110d] px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition-colors focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs tracking-[0.1em] text-stone-400">TELEFON</label>
                  <input
                    type="tel"
                    placeholder="+994 __ ___ __ __"
                    className="w-full rounded-xl border border-white/10 bg-[#16110d] px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition-colors focus:border-amber-400/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.1em] text-stone-400">TARİX</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="25.06.2026"
                        className="w-full rounded-xl border border-white/10 bg-[#16110d] px-4 py-3 pr-10 text-sm text-stone-100 placeholder-stone-500 outline-none transition-colors focus:border-amber-400/50"
                      />
                      <Calendar className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-stone-500" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.1em] text-stone-400">SAAT</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="19:30"
                        className="w-full rounded-xl border border-white/10 bg-[#16110d] px-4 py-3 pr-10 text-sm text-stone-100 placeholder-stone-500 outline-none transition-colors focus:border-amber-400/50"
                      />
                      <Clock className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-stone-500" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs tracking-[0.1em] text-stone-400">QONAQ SAYI</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="2 nəfər"
                      className="w-full rounded-xl border border-white/10 bg-[#16110d] px-4 py-3 pr-10 text-sm text-stone-100 placeholder-stone-500 outline-none transition-colors focus:border-amber-400/50"
                    />
                    <Users className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-stone-500" />
                  </div>
                </div>
                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-amber-400 px-6 py-4 text-sm font-medium text-[#100d0b] transition-colors hover:bg-amber-300"
                >
                  Rezervasiyanı təsdiqlə
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-center text-xs text-stone-500">
                  Təsdiq üçün sizinlə əlaqə saxlanılacaq.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0b0908]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-light tracking-[0.25em] text-amber-400">L</span>
                <div className="leading-none">
                  <div className="text-base font-medium tracking-[0.2em] text-stone-50">LALƏZAR</div>
                  <div className="mt-1 text-[10px] tracking-[0.35em] text-stone-400">RESTORAN</div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-stone-400">
                Bakının ürəyində Azərbaycan mətbəxinin zərif təqdimatı. 2009-cu ildən.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-stone-400 transition-colors hover:border-amber-400/40 hover:text-amber-400">
                  <Aperture className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-stone-400 transition-colors hover:border-amber-400/40 hover:text-amber-400">
                  <Share2 className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] text-stone-300">NAVİQASİYA</h4>
              <ul className="mt-5 space-y-3 text-sm text-stone-400">
                <li><a href="#hekaye" className="transition-colors hover:text-amber-400">Hekayə</a></li>
                <li><a href="#menyu" className="transition-colors hover:text-amber-400">Menyu</a></li>
                <li><a href="#qalereya" className="transition-colors hover:text-amber-400">Qalereya</a></li>
                <li><a href="#reylar" className="transition-colors hover:text-amber-400">Rəylər</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] text-stone-300">İŞ SAATLARI</h4>
              <ul className="mt-5 space-y-3 text-sm text-stone-400">
                <li className="flex justify-between gap-4"><span>B.e — Cümə</span><span className="text-stone-300">12:00 — 24:00</span></li>
                <li className="flex justify-between gap-4"><span>Şənbə</span><span className="text-stone-300">12:00 — 01:00</span></li>
                <li className="flex justify-between gap-4"><span>Bazar</span><span className="text-stone-300">12:00 — 23:00</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium tracking-[0.2em] text-stone-300">ƏLAQƏ</h4>
              <ul className="mt-5 space-y-4 text-sm text-stone-400">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span>Nizami küç. 84, Səbail<br />Bakı, Azərbaycan</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>+994 12 555 01 99</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>+994 12 555 01 99</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-stone-500 md:flex-row">
            <span>© 2026 Laləzar Restoran</span>
            <span>Bütün hüquqlar qorunur</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
