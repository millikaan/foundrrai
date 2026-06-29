import {
  ArrowRight,
  Check,
  Clock,
  Dumbbell,
  MapPin,
  Menu,
  Phone,
  Star,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

export function GymSite() {
  const HERO =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80";

  return (
    <div className="min-h-screen bg-[#0a0a0b] font-sans text-zinc-100 antialiased">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400 text-zinc-950">
              <Dumbbell className="h-4 w-4" strokeWidth={2} />
            </div>
            <span className="text-lg font-bold tracking-tight">Forma Fitnes</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#proqramlar" className="hover:text-white">Proqramlar</a>
            <a href="#qiymetler" className="hover:text-white">Qiymətlər</a>
            <a href="#musteriler" className="hover:text-white">Nəticələr</a>
            <a href="#elaqe" className="hover:text-white">Əlaqə</a>
          </nav>
          <a
            href="#elaqe"
            className="hidden rounded-full bg-lime-400 px-5 py-2.5 text-sm font-bold text-zinc-950 sm:inline-flex"
          >
            Pulsuz sınaq
          </a>
          <button type="button" className="md:hidden">
            <Menu className="h-5 w-5 text-zinc-300" />
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <img src={HERO} alt="" className="h-[560px] w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-lime-300">
              <Zap className="h-3.5 w-3.5" />
              24/7 açıq
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Gücünü kəşf et.
              <span className="block text-lime-400">Hər gün.</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
              Müasir avadanlıq, peşəkar məşqçilər və fərdi proqramlar. Forma Fitnes —
              Bakının ən enerjili məşq məkanı.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#elaqe"
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-zinc-950"
              >
                Pulsuz sınaq günü
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#qiymetler"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white"
              >
                Qiymətlərə bax
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            { value: "1 200+", label: "Aktiv üzv" },
            { value: "18", label: "Məşqçi" },
            { value: "3 500 m²", label: "Zal sahəsi" },
            { value: "4.8", label: "Reytinq" },
          ].map((s) => (
            <div key={s.label} className="px-4 py-8 text-center sm:px-6">
              <div className="text-2xl font-bold text-lime-400 sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="proqramlar" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold tracking-tight">Proqramlar</h2>
        <p className="mt-2 max-w-lg text-zinc-400">
          Hədəfindən asılı olmayaraq — sənin üçün uyğun plan.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Güc & hipertrofiya",
              desc: "Ağırlıq qaldırma, proqressiv yüklənmə və bərpa planı.",
            },
            {
              name: "Kardio & arıqlama",
              desc: "HIIT, velosiped zonası və kalori izləmə.",
            },
            {
              name: "Fərdi məşq",
              desc: "1:1 məşqçi ilə fərdi proqram və izləmə.",
            },
          ].map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-400/15">
                <Dumbbell className="h-5 w-5 text-lime-400" />
              </div>
              <h3 className="font-semibold text-white">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="qiymetler" className="border-y border-white/10 bg-zinc-950 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">Abunəlik planları</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { name: "Standart", price: "79", perks: ["Zal girişi", "Duş və soyuducu", "Qrup dərsləri"] },
              {
                name: "Pro",
                price: "119",
                perks: ["Hamısı + SPA", "Fərdi proqram", "Pulsuz əlcək & dəsmal"],
                featured: true,
              },
              { name: "VIP", price: "199", perks: ["24/7 giriş", "Şəxsi məşqçi", "Parking"] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "rounded-2xl border p-6",
                  plan.featured
                    ? "border-lime-400/50 bg-lime-400/5"
                    : "border-white/10 bg-zinc-900/50",
                )}
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  {plan.name}
                </p>
                <p className="mt-3 text-4xl font-bold text-white">
                  {plan.price}
                  <span className="text-lg font-medium text-zinc-500"> ₼/ay</span>
                </p>
                <ul className="mt-6 space-y-2">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check className="h-4 w-4 shrink-0 text-lime-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="musteriler" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold">Üzvlərimiz deyir</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "3 ayda 12 kq arıqladım. Məşqçilər həmişə motivasiya verir, avadanlıq mükəmməldir.",
            "24/7 açıq olması böyük üstünlükdür. İşdən sonra gəlirəm, heç vaxt dolu olmur.",
          ].map((text) => (
            <div key={text} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
              <div className="flex gap-1 text-lime-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="elaqe" className="border-t border-white/10 bg-zinc-950 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Pulsuz sınaq günü</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Bir gün pulsuz sına — zal, avadanlıq və məşqçilərlə tanış ol.
            </p>
            <div className="mt-6 space-y-3 text-sm text-zinc-300">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-lime-400" />
                Neftçilər pr. 82, Bakı
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-lime-400" />
                +994 12 555 88 40
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-lime-400" />
                Hər gün 06:00 – 00:00
              </p>
            </div>
          </div>
          <form className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
            <p className="font-semibold">Qeydiyyat forması</p>
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Ad, soyad"
                className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm outline-none placeholder:text-zinc-600"
              />
              <input
                type="tel"
                placeholder="+994 ..."
                className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm outline-none placeholder:text-zinc-600"
              />
            </div>
            <button
              type="button"
              className="mt-4 rounded-full bg-lime-400 px-5 py-2.5 text-sm font-bold text-zinc-950"
            >
              Sınaq günü al
            </button>
          </form>
        </div>
        <p className="mx-auto mt-10 max-w-6xl px-6 text-center text-xs text-zinc-600">
          © 2026 Forma Fitnes · Bütün hüquqlar qorunur
        </p>
      </section>
    </div>
  );
}
