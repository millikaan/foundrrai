import type { TemplateId } from "@/components/landing/browser-card";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  tag: string;
  desc: string;
  /** Example connected domain shown on showcase cards. */
  domain: string;
  /** The build brief used when a visitor remixes this template. */
  prompt: string;
}

/** Shared showcase/template metadata — used by the landing grid + /templates/[id]. */
export const TEMPLATES: ReadonlyArray<TemplateMeta> = [
  {
    id: "rentacar",
    name: "Sahil Rent-a-Car",
    tag: "İcarə",
    domain: "sahilrent.az",
    desc: "Avtomobil icarəsi — premium avtopark və onlayn rezervasiya.",
    prompt:
      "Avtomobil icarəsi şirkəti üçün premium sayt: real avtomobil şəkilləri ilə avtopark, gündəlik/həftəlik qiymətlər, icarə şərtləri, üstünlüklər və rezervasiya forması.",
  },
  {
    id: "restaurant",
    name: "Laləzar Restoran",
    tag: "Restoran",
    domain: "lalezar.az",
    desc: "Restoran — menyu, qalereya və masa rezervasiyası.",
    prompt:
      "Azərbaycan restoranı üçün premium sayt: real yemək şəkilləri ilə menyu və qiymətlər, qalereya, haqqımızda hekayəsi, rəylər və masa rezervasiyası forması.",
  },
  {
    id: "barber",
    name: "Lümen Salon",
    tag: "Salon",
    domain: "lumensalon.az",
    desc: "Gözəllik salonu — saç, dırnaq və üz baxımı, onlayn növbə.",
    prompt:
      "Müasir gözəllik salonu üçün zərif, premium sayt: xidmətlər və qiymətlər (saç, boyama, dırnaq, üz baxımı, kişi qulluğu), ustalar komandası, qalereya, müştəri rəyləri, iş saatları və onlayn növbə forması.",
  },
  {
    id: "clinic",
    name: "Dental Gülüm",
    tag: "Klinika",
    domain: "dentalgulum.az",
    desc: "Diş klinikası — xidmətlər, həkimlər və onlayn qeydiyyat.",
    prompt:
      "Bakıda müasir diş klinikası üçün peşəkar sayt: güclü hero, xidmətlər (implant, ağartma, ortodontiya), həkimlər, qiymətlər, pasiyent rəyləri və onlayn randevu forması.",
  },
  {
    id: "florist",
    name: "Gül Evi",
    tag: "Mağaza",
    domain: "gulevi.az",
    desc: "Çiçək mağazası — buketlər və eyni gün çatdırılma.",
    prompt:
      "Çiçək mağazası üçün zərif sayt: buket kataloqu və qiymətlər, eyni gün çatdırılma, haqqımızda bölməsi, müştəri rəyləri və sifariş forması.",
  },
  {
    id: "store",
    name: "Ayla Store",
    tag: "E-ticarət",
    domain: "aylastore.az",
    desc: "Onlayn mağaza — məhsul kataloqu və səbət.",
    prompt:
      "Onlayn geyim mağazası üçün sayt: məhsul kataloqu, kateqoriyalar, endirim banneri, məhsul kartları və qiymətlər, səbət və əlaqə bölməsi.",
  },
  {
    id: "cafe",
    name: "Köhnə Küçə",
    tag: "Kafe",
    domain: "kohnekuce.az",
    desc: "Qəhvə evi — menyu, atmosfer və masa rezervasiyası.",
    prompt:
      "Bakıda müasir qəhvə evi üçün isti, zərif sayt: menyu və qiymətlər, haqqımızda hekayəsi, müştəri rəyləri, iş saatları və masa rezervasiyası forması.",
  },
  {
    id: "gym",
    name: "Forma Fitnes",
    tag: "Fitnes",
    domain: "formafit.az",
    desc: "Fitnes zalı — proqramlar, abunəlik və pulsuz sınaq.",
    prompt:
      "Müasir fitnes zalı üçün enerjili sayt: proqramlar, abunəlik planları və qiymətlər, avadanlıq, məşqçilər, üzv nəticələri və pulsuz sınaq günü qeydiyyat forması.",
  },
];

export function getTemplate(id: string): TemplateMeta | undefined {
  return TEMPLATES.find((template) => template.id === id);
}
