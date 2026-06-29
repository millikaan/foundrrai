import { Phone, Mail, MapPin, Star, Check, ArrowRight, ArrowUpRight, Menu, Clock, Calendar, ChevronRight, Quote, Award, Shield, Sparkles, Smile, Stethoscope } from "lucide-react";

export function ClinicSite() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] font-sans text-slate-800 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#fbfaf7]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-600/30">
              <Smile className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <span className="block text-[15px] font-semibold tracking-tight text-slate-900">Dental Gülüm</span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-teal-700">Diş klinikası</span>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-[14px] font-medium text-slate-600 lg:flex">
            <a href="#xidmetler" className="transition-colors hover:text-teal-700">Xidmətlər</a>
            <a href="#haqqimizda" className="transition-colors hover:text-teal-700">Haqqımızda</a>
            <a href="#hekimler" className="transition-colors hover:text-teal-700">Həkimlər</a>
            <a href="#reyler" className="transition-colors hover:text-teal-700">Rəylər</a>
            <a href="#elaqe" className="transition-colors hover:text-teal-700">Əlaqə</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+994125550112" className="hidden items-center gap-2 text-[14px] font-medium text-slate-700 md:flex">
              <Phone className="h-4 w-4 text-teal-600" />
              +994 12 555 01 12
            </a>
            <a href="#elaqe" className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm shadow-teal-600/30 transition-colors hover:bg-teal-700">
              Onlayn qeydiyyat
              <ArrowRight className="h-4 w-4" />
            </a>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[640px] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl items-center px-6">
              <div className="max-w-2xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-teal-300" />
                  Bakının müasir diş klinikası
                </div>
                <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-[64px]">
                  Sağlam gülüş,<br />
                  <span className="text-teal-300">qayğılı əllərdə.</span>
                </h1>
                <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-200">
                  Dental Gülüm — implantdan ortodontiyaya, ağartmadan uşaq diş həkimliyinə qədər müasir avadanlıq və təcrübəli mütəxəssislərlə bütün xidmətlər bir yerdə.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a href="#elaqe" className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-teal-500/30 transition-colors hover:bg-teal-400">
                    Onlayn qeydiyyat
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a href="#xidmetler" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                    Xidmətlərə bax
                  </a>
                </div>
                <div className="mt-10 flex items-center gap-6 text-[13px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-teal-300" />
                    Sterilizasiya standartları
                  </div>
                  <div className="hidden h-4 w-px bg-white/20 sm:block" />
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-teal-300" />
                    15 illik təcrübə
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="border-b border-slate-200/70 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-3 md:grid-cols-4">
          {[
            { value: "10 000+", label: "Məmnun pasiyent" },
            { value: "15 il", label: "Klinika təcrübəsi" },
            { value: "4.9★", label: "Orta dəyərləndirmə" },
            { value: "12", label: "Sahə üzrə həkim" },
          ].map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <div className="text-3xl font-semibold tracking-tight text-slate-900 md:text-[34px]">{s.value}</div>
              <div className="mt-1.5 text-[13px] font-medium text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="xidmetler" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-teal-700">Xidmətlərimiz</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-[44px]">
            Hər ehtiyaca uyğun diş həlləri
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            Müayinədən kompleks müalicəyə qədər — şəffaf qiymət, fərdi yanaşma və ağrısız prosedurlar.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, title: "İmplant", desc: "Titan implantlar, ömürlük zəmanət və 3D planlama ilə.", price: "850 ₼", unit: "diş başına" },
            { icon: Star, title: "Ağartma", desc: "Bir seansda gözə dəyən nəticə — emaylı qorunaraq.", price: "180 ₼", unit: "seans" },
            { icon: Smile, title: "Ortodontiya", desc: "Breket və şəffaf elaynerlərlə düzgün diş sırası.", price: "1 200 ₼", unit: "kursdan" },
            { icon: Stethoscope, title: "Uşaq diş həkimi", desc: "Balalar üçün rahat, qorxusuz və oyunlu mühit.", price: "60 ₼", unit: "müayinə" },
          ].map((card) => (
            <div key={card.title} className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_18px_40px_-18px_rgba(13,148,136,0.35)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
                <card.icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-[19px] font-semibold tracking-tight text-slate-900">{card.title}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate-600">{card.desc}</p>
              <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-5">
                <div>
                  <div className="text-[22px] font-semibold tracking-tight text-slate-900">{card.price}</div>
                  <div className="text-[12px] text-slate-500">{card.unit}</div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About / Why us */}
      <section id="haqqimizda" className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80"
                alt=""
                className="h-[520px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)] sm:block">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[26px] font-semibold leading-none tracking-tight text-slate-900">98%</div>
                  <div className="mt-1 text-[13px] text-slate-500">təkrar müraciət edən pasiyent</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-teal-700">Niyə Dental Gülüm?</span>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-[44px]">
              Texnologiya və qayğının bir araya gəldiyi yer
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-slate-600">
              2010-cu ildən bəri Bakının mərkəzində fəaliyyət göstəririk. Hər müalicəni rəqəmsal diaqnostika ilə planlaşdırır, pasiyentin rahatlığını hər addımda önə qoyuruq.
            </p>
            <div className="mt-9 space-y-5">
              {[
                { title: "Rəqəmsal diaqnostika", desc: "3D tomoqrafiya və intraoral skaner ilə dəqiq planlama." },
                { title: "Ağrısız müalicə", desc: "Müasir anesteziya protokolları ilə komfortlu prosedurlar." },
                { title: "Şəffaf qiymət", desc: "Müalicədən əvvəl tam smeta — gizli ödəniş yoxdur." },
                { title: "Tam sterilizasiya", desc: "Avropa standartlarına uyğun avtoklav və tək istifadəlik alətlər." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-0.5 text-[14px] leading-relaxed text-slate-600">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="#elaqe" className="mt-10 inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-slate-800">
              Müayinəyə yazıl
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="hekimler" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-teal-700">Komandamız</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-[44px]">
              Təcrübəli həkimlər
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            Hər biri öz sahəsində ixtisaslaşmış, beynəlxalq sertifikatlı mütəxəssislər komandası.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Dr. Nigar Əliyeva", role: "Ortodont", desc: "Şəffaf elaynerlər və estetik diş düzümü üzrə ekspert.", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80" },
            { name: "Dr. Rəşad Quliyev", role: "İmplantoloq", desc: "Cərrahi implantasiya və sümük transplantasiyası mütəxəssisi.", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80" },
            { name: "Dr. Aysel Məmmədova", role: "Uşaq diş həkimi", desc: "Balalarla mehriban yanaşma və profilaktik müalicə.", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80" },
          ].map((doc) => (
            <div key={doc.name} className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.25)]">
              <div className="h-72 overflow-hidden">
                <img src={doc.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-[13px] font-semibold uppercase tracking-wider text-teal-700">{doc.role}</div>
                <h3 className="mt-1.5 text-[20px] font-semibold tracking-tight text-slate-900">{doc.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="reyler" className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-teal-400">Pasiyent rəyləri</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-[44px]">
              Gülüşünə güvənənlər
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { name: "Günel Hüseynova", text: "İmplant prosesindən çox qorxurdum, amma komanda hər addımı izah etdi. Tamamilə ağrısız oldu, nəticədən çox razıyam.", role: "İmplant pasiyenti" },
              { name: "Tural Babayev", text: "Uşağımı ilk dəfə diş həkiminə gətirdik və heç ağlamadı. Dr. Aysel həqiqətən uşaqlarla necə davranacağını bilir.", role: "Valideyn" },
              { name: "Leyla Rəhimova", text: "Ağartmadan sonra gülüşüm tanınmaz dərəcədə dəyişdi. Klinika tər-təmiz, personal son dərəcə peşəkardır.", role: "Ağartma pasiyenti" },
            ].map((t) => (
              <div key={t.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
                <Quote className="h-8 w-8 text-teal-400/60" />
                <div className="mt-4 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-200">{t.text}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="text-[15px] font-semibold text-white">{t.name}</div>
                  <div className="text-[13px] text-slate-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment form */}
      <section id="elaqe" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-[#fbfaf7] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.2)]">
            <div className="grid lg:grid-cols-2">
              {/* Left info */}
              <div className="relative flex flex-col justify-between bg-teal-600 p-10 text-white md:p-12">
                <div>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-teal-100">Onlayn qeydiyyat</span>
                  <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-[42px]">
                    Gülüşünüz üçün ilk addımı atın
                  </h2>
                  <p className="mt-4 text-[16px] leading-relaxed text-teal-50/90">
                    Formu doldurun, 24 saat ərzində sizinlə əlaqə saxlayaq və uyğun vaxtı təyin edək.
                  </p>
                </div>
                <div className="mt-10 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[13px] text-teal-100">Telefon</div>
                      <div className="text-[15px] font-semibold">+994 12 555 01 12</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[13px] text-teal-100">E-poçt</div>
                      <div className="text-[15px] font-semibold">+994 12 408 75 30</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[13px] text-teal-100">Ünvan</div>
                      <div className="text-[15px] font-semibold">Nizami küç. 78, Bakı</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right form */}
              <div className="p-10 md:p-12">
                <form className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">Ad və soyad</label>
                    <input
                      type="text"
                      placeholder="Adınızı daxil edin"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">Telefon</label>
                    <input
                      type="tel"
                      placeholder="+994 __ ___ __ __"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">Xidmət</label>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-700 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
                        <option>İmplant</option>
                        <option>Ağartma</option>
                        <option>Ortodontiya</option>
                        <option>Uşaq diş həkimi</option>
                        <option>Ümumi müayinə</option>
                      </select>
                      <ChevronRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">Tarix</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Gün / Ay / İl"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-[14px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                      />
                      <Calendar className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm shadow-teal-600/30 transition-colors hover:bg-teal-700"
                  >
                    Qeydiyyatı təsdiqlə
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <p className="text-center text-[12px] text-slate-400">
                    Formu göndərməklə məxfilik siyasətimizlə razılaşırsınız.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
                  <Smile className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <span className="text-[16px] font-semibold tracking-tight text-white">Dental Gülüm</span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
                Bakının mərkəzində müasir diş klinikası. Sağlam və gözəl gülüş üçün etibarlı seçim.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-teal-500 hover:text-teal-400">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-teal-500 hover:text-teal-400">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M14 9h2.5V6H14c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3V9.8c0-.5.4-.8 1-.8z" />
                  </svg>
                </a>
                <a href="#" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-teal-500 hover:text-teal-400">
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[14px] font-semibold text-white">Xidmətlər</h4>
              <ul className="mt-4 space-y-3 text-[14px]">
                <li><a href="#xidmetler" className="transition-colors hover:text-teal-400">İmplant</a></li>
                <li><a href="#xidmetler" className="transition-colors hover:text-teal-400">Ağartma</a></li>
                <li><a href="#xidmetler" className="transition-colors hover:text-teal-400">Ortodontiya</a></li>
                <li><a href="#xidmetler" className="transition-colors hover:text-teal-400">Uşaq diş həkimi</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-semibold text-white">Əlaqə</h4>
              <ul className="mt-4 space-y-3 text-[14px]">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-teal-500" />
                  <span>Nizami küç. 78, Nəsimi r., Bakı AZ1000</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 flex-none text-teal-500" />
                  <span>+994 12 555 01 12</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 flex-none text-teal-500" />
                  <span>+994 12 408 75 30</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-semibold text-white">İş saatları</h4>
              <ul className="mt-4 space-y-3 text-[14px]">
                <li className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5"><Clock className="h-4 w-4 flex-none text-teal-500" />B.e – Cümə</span>
                  <span className="text-slate-300">09:00 – 20:00</span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="pl-6">Şənbə</span>
                  <span className="text-slate-300">10:00 – 18:00</span>
                </li>
                <li className="flex items-center justify-between gap-4">
                  <span className="pl-6">Bazar</span>
                  <span className="text-slate-500">Bağlı</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-[13px] sm:flex-row">
            <span>© 2026 Dental Gülüm. Bütün hüquqlar qorunur.</span>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-teal-400">Məxfilik siyasəti</a>
              <a href="#" className="transition-colors hover:text-teal-400">İstifadə şərtləri</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
