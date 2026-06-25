import { Phone, Mail, MapPin, Star, Check, ArrowRight, ArrowUpRight, Menu, Truck, Shield, Sparkles, Quote, Send, ShoppingBag, Heart } from "lucide-react";

export function StoreSite() {
  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans text-neutral-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-[#faf9f7]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-[#faf9f7]">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <span className="text-lg font-semibold tracking-tight">Ayla Store</span>
          </div>
          <nav className="hidden items-center gap-9 text-sm text-neutral-600 md:flex">
            <a href="#kateqoriya" className="transition-colors hover:text-neutral-900">Kateqoriyalar</a>
            <a href="#mehsullar" className="transition-colors hover:text-neutral-900">Məhsullar</a>
            <a href="#haqqimizda" className="transition-colors hover:text-neutral-900">Haqqımızda</a>
            <a href="#elaqe" className="transition-colors hover:text-neutral-900">Əlaqə</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#mehsullar" className="hidden items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-[#faf9f7] transition-colors hover:bg-neutral-800 sm:inline-flex">
              Alış-veriş
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 md:hidden">
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative mx-auto max-w-7xl px-6 pt-6">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80"
              alt=""
              className="h-[640px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14 lg:px-20">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Yaz / Yay 2026 Kolleksiyası
                </span>
                <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Üslubun yeni
                  <br />
                  ünvanı.
                </h1>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
                  Bakının mərkəzində seçilmiş geyim butiki. Müasir kəsimlər, keyfiyyətli parçalar və hər mövsümə uyğun zövqlü dizaynlar.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a href="#mehsullar" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-transform hover:-translate-y-0.5">
                    Alış-verişə başla
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </a>
                  <a href="#kateqoriya" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                    Kolleksiyalar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo / sale strip */}
      <section className="mx-auto max-w-7xl px-6 pt-5">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 rounded-2xl border border-neutral-200 bg-white px-6 py-4 text-sm text-neutral-700">
          <span className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-neutral-900" strokeWidth={1.75} />
            100 ₼-dan yuxarı pulsuz çatdırılma
          </span>
          <span className="hidden h-4 w-px bg-neutral-200 sm:block" />
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-neutral-900" strokeWidth={1.75} />
            14 gün ərzində dəyişdirmə
          </span>
          <span className="hidden h-4 w-px bg-neutral-200 sm:block" />
          <span className="flex items-center gap-2 font-medium text-neutral-900">
            <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            Yeni kolleksiyaya <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-white">-20%</span>
          </span>
        </div>
      </section>

      {/* Category tiles */}
      <section id="kateqoriya" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">Kateqoriyalar</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Nə axtarırsınız?</h2>
          </div>
          <a href="#mehsullar" className="hidden items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:inline-flex">
            Hamısına bax
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Qadın geyimi", count: "120+ məhsul", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" },
            { name: "Mağaza seçimi", count: "Yeni gələnlər", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" },
            { name: "Aksesuarlar", count: "80+ məhsul", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" },
          ].map((c) => (
            <a key={c.name} href="#mehsullar" className="group relative overflow-hidden rounded-2xl border border-neutral-200">
              <img src={c.img} alt="" className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-white/75">{c.count}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900 transition-transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section id="mehsullar" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">Seçilmişlər</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Populyar məhsullar</h2>
            </div>
            <a href="#elaqe" className="hidden items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:inline-flex">
              Bütün katalog
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Kətan kostyum", tag: "Qadın", price: "189 ₼", old: "240 ₼", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" },
              { name: "Klassik trençkot", tag: "Üst geyim", price: "320 ₼", old: null, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" },
              { name: "İpək köynək", tag: "Yeni", price: "98 ₼", old: null, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" },
              { name: "Yun palto", tag: "Premium", price: "275 ₼", old: "340 ₼", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" },
              { name: "Pambıq bluz", tag: "Qadın", price: "64 ₼", old: null, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" },
              { name: "Geniş kəsim şalvar", tag: "Trend", price: "112 ₼", old: "145 ₼", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" },
              { name: "Trikotaj jaket", tag: "Yeni", price: "138 ₼", old: null, img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" },
              { name: "Mövsüm donu", tag: "Premium", price: "156 ₼", old: "198 ₼", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" },
            ].map((p) => (
              <div key={p.name} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
                  <img src={p.img} alt="" className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {p.old && (
                    <span className="absolute left-3 top-3 rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white">Endirim</span>
                  )}
                  <button type="button" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100">
                    <Heart className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">{p.tag}</p>
                  <h3 className="mt-1 text-base font-medium text-neutral-900">{p.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-neutral-900">{p.price}</span>
                      {p.old && <span className="text-sm text-neutral-400 line-through">{p.old}</span>}
                    </div>
                    <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white">
                      <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.75} />
                      Səbətə at
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / store */}
      <section id="haqqimizda" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
              alt=""
              className="h-[520px] w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">Haqqımızda</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              2018-ci ildən Bakıda zövqlü geyimin ünvanı
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Ayla Store seçilmiş brendləri və öz dizaynlarımızı bir araya gətirən müstəqil butikdir. Hər məhsulu parçasından tikişinə qədər diqqətlə seçirik — gündəlik geyimdən xüsusi anlara qədər.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-6">
              {[
                { k: "8 il", v: "Etibarlı təcrübə" },
                { k: "12K+", v: "Məmnun müştəri" },
                { k: "400+", v: "Aktiv məhsul" },
                { k: "4.9", v: "Orta reytinq" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <p className="text-3xl font-semibold tracking-tight text-neutral-900">{s.k}</p>
                  <p className="mt-1.5 text-sm text-neutral-500">{s.v}</p>
                </div>
              ))}
            </div>
            <a href="#elaqe" className="mt-9 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
              Mağazaya gəlin
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">Rəylər</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Müştərilərimiz nə deyir</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: "Nigar Əliyeva", role: "Daimi müştəri", text: "Keyfiyyət gözləntimdən yüksək çıxdı. Kətan kostyumu artıq ikinci dəfə alıram, kəsimi əla oturur." },
              { name: "Rəşad Hüseynov", role: "Bakı", text: "Çatdırılma sürətli, qablaşdırma səliqəli idi. Mağazadakı işçilər çox köməkçi oldular." },
              { name: "Leyla Məmmədova", role: "Stilist", text: "Müştərilərim üçün buradan seçim edirəm. Həm trend, həm də klassik parçalar bir yerdə." },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-neutral-200 bg-[#faf9f7] p-7">
                <Quote className="h-7 w-7 text-neutral-300" strokeWidth={1.5} />
                <div className="mt-4 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-neutral-900 text-neutral-900" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">{t.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / newsletter */}
      <section id="elaqe" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">Əlaqə</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Yeniliklərdən ilk xəbər tutun
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              Yeni kolleksiyalar, məxsusi endirimlər və mağaza tədbirləri barədə birbaşa məlumat alın. Sualınız varsa, bizimlə əlaqə saxlayın.
            </p>
            <div className="mt-9 space-y-4">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900">
                  <MapPin className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Ünvan</p>
                  <p className="text-sm text-neutral-500">Nizami küçəsi 28, Bakı şəhəri</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900">
                  <Phone className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Telefon</p>
                  <p className="text-sm text-neutral-500">+994 12 555 18 24</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900">
                  <Mail className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium text-neutral-900">E-poçt</p>
                  <p className="text-sm text-neutral-500">salam@aylastore.az</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 sm:p-10">
            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Ad</label>
                  <input type="text" placeholder="Adınız" className="w-full rounded-xl border border-neutral-200 bg-[#faf9f7] px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">Telefon</label>
                  <input type="tel" placeholder="+994" className="w-full rounded-xl border border-neutral-200 bg-[#faf9f7] px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">E-poçt</label>
                <input type="email" placeholder="siz@nümunə.az" className="w-full rounded-xl border border-neutral-200 bg-[#faf9f7] px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Mesaj</label>
                <textarea rows={4} placeholder="Sualınızı yazın..." className="w-full resize-none rounded-xl border border-neutral-200 bg-[#faf9f7] px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900" />
              </div>
              <label className="flex items-start gap-3 text-sm text-neutral-600">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border border-neutral-300 bg-[#faf9f7]">
                  <Check className="h-3.5 w-3.5 text-neutral-900" strokeWidth={2.5} />
                </span>
                Endirim və yeniliklər üçün abunə olmaq istəyirəm
              </label>
              <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
                Göndər
                <Send className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <span className="text-lg font-semibold tracking-tight">Ayla Store</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
                Bakının mərkəzində zövqlü geyim butiki. Müasir kəsimlər, keyfiyyətli parçalar, hər mövsümə uyğun dizayn.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {[
                  <svg key="ig" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>,
                  <svg key="fb" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.2C16.7.1 15.6 0 14.4 0 11.9 0 10 1.5 10 4.3V6H7v3h3v9h4V9z" /></svg>,
                  <svg key="tg" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.6"><path d="M21 4L3 11l6 2 2 6 4-5 4 4 2-14z" strokeLinejoin="round" /></svg>,
                ].map((icon, i) => (
                  <a key={i} href="#elaqe" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Mağaza</p>
              <ul className="mt-4 space-y-3 text-sm text-neutral-500">
                <li><a href="#mehsullar" className="transition-colors hover:text-neutral-900">Məhsullar</a></li>
                <li><a href="#kateqoriya" className="transition-colors hover:text-neutral-900">Kateqoriyalar</a></li>
                <li><a href="#mehsullar" className="transition-colors hover:text-neutral-900">Yeni gələnlər</a></li>
                <li><a href="#mehsullar" className="transition-colors hover:text-neutral-900">Endirimlər</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Şirkət</p>
              <ul className="mt-4 space-y-3 text-sm text-neutral-500">
                <li><a href="#haqqimizda" className="transition-colors hover:text-neutral-900">Haqqımızda</a></li>
                <li><a href="#elaqe" className="transition-colors hover:text-neutral-900">Əlaqə</a></li>
                <li><a href="#elaqe" className="transition-colors hover:text-neutral-900">Çatdırılma</a></li>
                <li><a href="#elaqe" className="transition-colors hover:text-neutral-900">Qaytarma</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">İş saatları</p>
              <ul className="mt-4 space-y-3 text-sm text-neutral-500">
                <li>B.e – Cümə: 10:00–20:00</li>
                <li>Şənbə: 10:00–18:00</li>
                <li>Bazar: 12:00–17:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-sm text-neutral-500 sm:flex-row">
            <p>© 2026 Ayla Store. Bütün hüquqlar qorunur.</p>
            <div className="flex items-center gap-6">
              <a href="#elaqe" className="transition-colors hover:text-neutral-900">Məxfilik</a>
              <a href="#elaqe" className="transition-colors hover:text-neutral-900">Şərtlər</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
