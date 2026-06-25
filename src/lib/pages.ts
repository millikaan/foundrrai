/**
 * Static content for Foundrr's marketing / legal pages, rendered by the
 * /[slug] route. Keeps the footer links working with clean URLs from one map.
 * All content is in Azerbaijani.
 */

export interface PageSection {
  heading: string;
  paragraphs: string[];
}

export interface InfoPage {
  title: string;
  subtitle: string;
  sections: PageSection[];
}

const PAGES: Record<string, InfoPage> = {
  haqqinda: {
    title: "Foundrr haqqında",
    subtitle: "Azərbaycan üçün AI sayt qurucusu — bir cümlədən hazır sayta.",
    sections: [
      {
        heading: "Missiyamız",
        paragraphs: [
          "Foundrr kiçik bizneslərə kod yazmadan, bir neçə dəqiqəyə peşəkar veb-sayt qurmaq imkanı verir. Məqsədimiz Azərbaycanda hər sahibkarın öz onlayn mövcudluğunu asanlıqla yaratmasıdır.",
        ],
      },
      {
        heading: "Necə fərqlənirik",
        paragraphs: [
          "Biz hostinq və ya domen satmırıq. Saytı sənin öz Vercel hesabında yayımlayır, məlumat bazasını öz Supabase hesabında qururuq — sayt tamamilə sənindir.",
        ],
      },
      {
        heading: "Komanda",
        paragraphs: [
          "Bakıda yerləşən kiçik komandayıq və məhsulu hər gün daha da yaxşılaşdırırıq.",
        ],
      },
    ],
  },
  bloq: {
    title: "Bloq",
    subtitle: "Məhsul yenilikləri, bələdçilər və sahibkarlar üçün məsləhətlər.",
    sections: [
      {
        heading: "Tezliklə",
        paragraphs: [
          "Bloqumuz hazırlanır. Burada yeni funksiyalar, uğur hekayələri və sayt qurmaq üzrə praktiki məsləhətlər paylaşacağıq.",
        ],
      },
      {
        heading: "Xəbərdar ol",
        paragraphs: [
          "Yeniliklərdən ilk xəbər tutmaq üçün hesab yarat — mühüm elanları e-poçtla göndərəcəyik.",
        ],
      },
    ],
  },
  karyera: {
    title: "Karyera",
    subtitle: "Foundrr komandasına qoşul.",
    sections: [
      {
        heading: "Niyə Foundrr",
        paragraphs: [
          "Sürətlə inkişaf edən məhsul üzərində işləyir, Azərbaycanda minlərlə biznesə təsir edirik. Burada öyrənmək və böyümək üçün yer var.",
        ],
      },
      {
        heading: "Açıq vakansiyalar",
        paragraphs: [
          "Hazırda aktiv vakansiya yoxdur. Bizimlə işləmək istəyirsənsə, CV-ni careers@foundrr.online ünvanına göndər — uyğun imkan yaranan kimi əlaqə saxlayacağıq.",
        ],
      },
    ],
  },
  elaqe: {
    title: "Əlaqə",
    subtitle: "Sualın var? Bizimlə əlaqə saxla.",
    sections: [
      {
        heading: "E-poçt",
        paragraphs: [
          "Ümumi suallar üçün: salam@foundrr.online",
          "Dəstək üçün: destek@foundrr.online",
        ],
      },
      {
        heading: "Ünvan",
        paragraphs: ["Bakı, Azərbaycan"],
      },
      {
        heading: "Sosial şəbəkələr",
        paragraphs: [
          "Yeniliklər və elanlar üçün bizi sosial şəbəkələrdə izlə.",
        ],
      },
    ],
  },
  senedler: {
    title: "Sənədlər",
    subtitle: "Foundrr-dan istifadə üzrə bələdçi.",
    sections: [
      {
        heading: "Başlanğıc",
        paragraphs: [
          "Bir cümlə ilə nə qurmaq istədiyini yaz, planı təsdiqlə və Foundrr saytı qursun. Sonra söhbət edərək saytı dəyişə bilərsən.",
        ],
      },
      {
        heading: "Kreditlər",
        paragraphs: [
          "Hər yeni hesab 100 kredit alır. Tam sayt qurmaq 85, hər redaktə mesajı 12 kredit tələb edir. Önizləmə və geri qaytarma pulsuzdur.",
        ],
      },
      {
        heading: "Yayımlama",
        paragraphs: [
          "Hazır saytı öz Vercel hesabına yayımlaya, məlumat bazasını öz Supabase layihənə bağlaya bilərsən.",
        ],
      },
    ],
  },
  beledci: {
    title: "Bələdçi",
    subtitle: "Addım-addım sayt qurma təlimatı.",
    sections: [
      {
        heading: "1. Fikrini yaz",
        paragraphs: [
          "Ana səhifədəki sahəyə biznesini bir cümlə ilə təsvir et, məsələn: “Bakıda diş klinikası üçün sayt”.",
        ],
      },
      {
        heading: "2. Planı təsdiqlə",
        paragraphs: [
          "Foundrr sənə struktur planı təqdim edəcək. Bəyənirsənsə “Bəli, qur” düyməsini bas, yoxsa dəyişiklik istə.",
        ],
      },
      {
        heading: "3. Redaktə et və yayımla",
        paragraphs: [
          "Canlı önizləmədə saytı gör, söhbət edərək dəyişiklik et və hazır olanda öz hesabına yayımla.",
        ],
      },
    ],
  },
  destek: {
    title: "Dəstək",
    subtitle: "Sənə kömək etməyə hazırıq.",
    sections: [
      {
        heading: "Tez-tez verilən suallar",
        paragraphs: [
          "Çox sualın cavabı Sənədlər və Bələdçi bölmələrindədir — əvvəlcə oraya bax.",
        ],
      },
      {
        heading: "Bizimlə əlaqə",
        paragraphs: [
          "Problemini həll edə bilməsən, destek@foundrr.online ünvanına yaz — adətən 24 saat ərzində cavab veririk.",
        ],
      },
    ],
  },
  status: {
    title: "Sistem statusu",
    subtitle: "Foundrr xidmətlərinin cari vəziyyəti.",
    sections: [
      {
        heading: "Hazırkı vəziyyət",
        paragraphs: ["Bütün sistemlər normal işləyir."],
      },
      {
        heading: "Planlı işlər",
        paragraphs: [
          "Hazırda planlaşdırılmış texniki iş yoxdur. Mühüm yeniləmələr barədə əvvəlcədən məlumat verəcəyik.",
        ],
      },
    ],
  },
  sertler: {
    title: "İstifadə şərtləri",
    subtitle: "Foundrr-dan istifadə qaydaları.",
    sections: [
      {
        heading: "Xidmətdən istifadə",
        paragraphs: [
          "Foundrr-dan istifadə edərək bu şərtləri qəbul etmiş olursan. Xidməti yalnız qanuni məqsədlərlə istifadə etməlisən.",
        ],
      },
      {
        heading: "Hesab və kreditlər",
        paragraphs: [
          "Hesabının təhlükəsizliyinə özün cavabdehsən. Kreditlər xidmət daxilində istifadə üçündür və geri qaytarılmır.",
        ],
      },
      {
        heading: "Məsuliyyət",
        paragraphs: [
          "Xidmət “olduğu kimi” təqdim olunur. Yaradılan saytların məzmununa görə istifadəçi cavabdehdir.",
        ],
      },
    ],
  },
  mexfilik: {
    title: "Məxfilik siyasəti",
    subtitle: "Məlumatlarını necə qoruyuruq.",
    sections: [
      {
        heading: "Topladığımız məlumat",
        paragraphs: [
          "Hesab yaratdıqda e-poçt və ad kimi əsas məlumatları toplayırıq. Saytlarını və layihələrini xidməti təmin etmək üçün saxlayırıq.",
        ],
      },
      {
        heading: "Məlumatın istifadəsi",
        paragraphs: [
          "Məlumatlarını yalnız xidməti təqdim etmək və yaxşılaşdırmaq üçün istifadə edirik. Üçüncü tərəflərə satmırıq.",
        ],
      },
      {
        heading: "Provayder açarları",
        paragraphs: [
          "Vercel və Supabase kimi provayder açarların şifrələnmiş şəkildə, yalnız server tərəfində saxlanılır.",
        ],
      },
    ],
  },
  cookie: {
    title: "Cookie siyasəti",
    subtitle: "Veb-saytımızda cookie-lərdən necə istifadə edirik.",
    sections: [
      {
        heading: "Cookie nədir",
        paragraphs: [
          "Cookie-lər brauzerində saxlanılan kiçik fayllardır. Onlardan seansını qorumaq və təcrübəni yaxşılaşdırmaq üçün istifadə edirik.",
        ],
      },
      {
        heading: "İstifadə etdiyimiz cookie-lər",
        paragraphs: [
          "Əsasən giriş seansı üçün zəruri cookie-lərdən istifadə edirik. Bunlar olmadan hesabına daxil ola bilməzsən.",
        ],
      },
      {
        heading: "İdarəetmə",
        paragraphs: [
          "Brauzer ayarlarından cookie-ləri idarə edə bilərsən, lakin bəzi funksiyalar düzgün işləməyə bilər.",
        ],
      },
    ],
  },
};

export const PAGE_SLUGS = Object.keys(PAGES);

export function getPage(slug: string): InfoPage | null {
  return PAGES[slug] ?? null;
}
