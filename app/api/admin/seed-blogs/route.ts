import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { addBlogPost, getBlogPosts } from "@/lib/blogs";
import { BLOG_CATEGORIES } from "@/lib/blog-constants";

type Category = (typeof BLOG_CATEGORIES)[number];

const SEED_POSTS: Array<{
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  readingTime: number;
  date: string;
  featured: boolean;
}> = [
  // Instagram
  {
    title: "Instagram Stories İçin Yaratıcı Fikirler",
    slug: "instagram-stories-yaratici-fikirler",
    excerpt:
      "Takipçilerinizin ilgisini çekecek etkileşimli Stories örnekleri ve ipuçları.",
    content: `Instagram Stories, markanızla takipçileriniz arasında samimi bir köprü kurmanın en iyi yoludur. Soru-cevap sticker'ları, anketler, quiz'ler ve "Geri sayım" gibi etkileşimli öğeler kullanarak katılımı artırın. Ark plan müzik ekleyerek içeriklerinize duygusal derinlik katın. Günlük hikayeler yerine düzenli ve planlı Stories paylaşımı marka farkındalığınızı güçlendirir.`,
    category: "instagram",
    readingTime: 4,
    date: "2025-03-14",
    featured: false,
  },
  {
    title: "Instagram Hashtag Stratejisi 2025",
    slug: "instagram-hashtag-stratejisi-2025",
    excerpt:
      "Doğru hashtag kullanımı ile organik erişiminizi nasıl artırırsınız?",
    content: `Hashtag stratejisi Instagram algoritmasında hâlâ önemli bir rol oynuyor. Karışık kategorilerden hashtag seçin: büyük (#instagram), orta (#sosyalmedyaajansi) ve niş (#istanbulmarka) hashtagler birlikte kullanıldığında en iyi sonucu verir. Hashtag setlerinizi kaydedip içerik türüne göre döndürün. Yerel hashtagler hedef kitlenize ulaşmanızı kolaylaştırır. Aylık performans takibi ile çalışmayan hashtagleri listeden çıkarın.`,
    category: "instagram",
    readingTime: 5,
    date: "2025-03-11",
    featured: false,
  },
  // TikTok
  {
    title: "TikTok Algoritması Nasıl Çalışır?",
    slug: "tiktok-algoritmasi-nasil-calisir",
    excerpt:
      "For You Page'de öne çıkmak için algoritma sırları ve içerik ipuçları.",
    content: `TikTok algoritması kullanıcı davranışına göre içerik önerir. Tam izlenme oranı, yeniden izleme ve yorum-etkileşim önemli sinyallerdir. İlk 3 saniyede dikkat çekin; hook kullanın. Uzun içerikler tam izlenme oranını düşürebilir, bu yüzden başlangıçta kısa format deneyin. Trend sesleri ve efektleri kullanmak keşfedilme şansınızı artırır. Tutarlı paylaşım ve niş odaklı içerik algoritmanın sizi doğru kitleyle eşleştirmesine yardımcı olur.`,
    category: "tiktok",
    readingTime: 5,
    date: "2025-03-09",
    featured: false,
  },
  {
    title: "TikTok Shop: Türkiye'de E-Ticaret Fırsatları",
    slug: "tiktok-shop-turkiye-e-ticaret",
    excerpt:
      "TikTok Shop ile satış yapmanın püf noktaları ve başarı hikayeleri.",
    content: `TikTok Shop, video tabanlı alışveriş deneyimi sunarak e-ticaret ve içerik üretimini birleştiriyor. Canlı yayınlar, ürün linkli videolar ve mağaza sekmesi ile doğrudan satış yapabilirsiniz. Ürün tanıtım videolarında gerçek kullanım sahneleri ve hikaye anlatımı kullanın. Promosyonlu içerikler için TikTok Ads ile bütçe ayırın. Ürün seçiminde trend ve viral potansiyeli yüksek kategorilere odaklanın.`,
    category: "tiktok",
    readingTime: 6,
    date: "2025-03-07",
    featured: false,
  },
  // Strateji
  {
    title: "Sosyal Medya Kriz Yönetimi",
    slug: "sosyal-medya-kriz-yonetimi",
    excerpt:
      "Olumsuz yorumlar ve kriz durumlarında doğru adımlar nelerdir?",
    content: `Sosyal medya krizleri hızlı ve şeffaf yanıt gerektirir. Önceden kriz protokolü oluşturun: kim yanıt verecek, hangi ton kullanılacak, ne zaman özür dilenecek. Trolle cevap vermekten kaçının; gerçek sorunlara odaklanın. İç iletişimde hızlı karar almak için yetki devri yapın. Kriz sonrası analiz yapıp süreçleri güçlendirin. Proaktif topluluk yönetimi sorunların büyümeden çözülmesine yardımcı olur.`,
    category: "strateji",
    readingTime: 6,
    date: "2025-03-08",
    featured: false,
  },
  {
    title: "Marka Sesi Oluşturma: Tone of Voice Rehberi",
    slug: "marka-sesi-tone-of-voice-rehberi",
    excerpt:
      "Sosyal medyada tutarlı ve akılda kalıcı bir marka dili nasıl kurulur?",
    content: `Tone of Voice (marka sesi) tüm iletişiminizin temelidir. Resmi mi, samimi mi, eğlenceli mi olacak önce belirleyin. Değerlerinizi yansıtan kelime dağarcığı ve cümle kalıpları oluşturun. İçerik öncesi bu rehbere göre kontrol yapın. Müşteri hizmetleri, reklam metinleri ve organik paylaşımlarda aynı dili kullanın. Zaman içinde topluluk geri bildirimine göre ince ayar yapın.`,
    category: "strateji",
    readingTime: 5,
    date: "2025-03-06",
    featured: false,
  },
  // Reklam
  {
    title: "Instagram Reklam Bütçesi Nasıl Planlanır?",
    slug: "instagram-reklam-butcesi-planlama",
    excerpt:
      "Küçük bütçeyle maksimum ROI için Meta Ads ipuçları.",
    content: `Reklam bütçenizi stratejik dağıtın: test aşamasında günlük 50-100 TL ile birden fazla hedefleme ve kreatif deneyin. Kazanan kombinasyonları tespit ettikten sonra bütçeyi artırın. Retargeting için Lookalike Audience kullanın. Conversion odaklı kampanyalarda pixel kurulumu şarttır. Aylık performans raporları ile CPA ve ROAS takibi yapın. Organik içerik performansını analiz edip reklamda güçlü formatları kullanın.`,
    category: "reklam",
    readingTime: 6,
    date: "2025-03-13",
    featured: false,
  },
  {
    title: "UGC Reklamları: Kullanıcı İçeriği ile Pazarlama",
    slug: "ugc-reklamlari-kullanici-icerigi-pazarlama",
    excerpt:
      "Influencer ve kullanıcı üretimi içeriklerle reklam performansını artırın.",
    content: `UGC (User Generated Content) reklamları, marka üretimi reklamlara göre daha yüksek tıklama ve dönüşüm oranları sunar. Mikro influencer'larla iş birliği yaparak otantik ürün tanıtım videoları elde edin. Müşteri yorumları ve fotoğraflarını izin alarak reklamda kullanın. UGC için yaratıcı brief hazırlayın: hikaye, format ve CTA net olmalı. A/B testlerinde UGC ve marka reklamlarını karşılaştırıp bütçe dağılımını optimize edin.`,
    category: "reklam",
    readingTime: 5,
    date: "2025-03-10",
    featured: false,
  },
  // İçerik Üretimi
  {
    title: "CapCut ile Profesyonel Reel Düzenleme",
    slug: "capcut-profesyonel-reel-duzenleme",
    excerpt:
      "Ücretsiz araçlarla viral potansiyeli yüksek video içerik üretimi.",
    content: `CapCut, hızlı ve profesyonel video düzenleme için ideal bir araçtır. Hazır şablonlar trend geçişler ve efektler sunar. Otomatik altyazı özelliği erişilebilirlik ve izlenebilirliği artırır. Birden fazla video aynı anda düzenleyerek içerik stokunuzu hızla oluşturun. Müzik kütüphanesi ve ses efektleri ile duygusal etkiyi güçlendirin. Dışa aktarırken format ve çözünürlüğü platforma göre ayarlayın.`,
    category: "icerik-uretimi",
    readingTime: 5,
    date: "2025-03-09",
    featured: false,
  },
  {
    title: "Batch Content: Toplu İçerik Üretim Stratejisi",
    slug: "batch-content-toplu-icerik-uretim",
    excerpt:
      "Zaman tasarrufu sağlayan toplu içerik üretim yöntemleri.",
    content: `Batch content (toplu içerik üretimi) verimliliği artırır. Belirli günlerde tek seferde haftalık veya aylık içerikleri planlayın. Önce içerik takvimini çıkarın, sonra tüm görselleri ve metinleri aynı oturumda hazırlayın. Yeniden kullanılabilir şablonlar oluşturun: başlık, hook ve CTA kalıpları. Planlama araçları (Meta Business Suite, Later) ile paylaşımı otomatikleştirin. Rutin oluşturmak yaratıcı enerjinizi sürdürülebilir kılar.`,
    category: "icerik-uretimi",
    readingTime: 4,
    date: "2025-03-07",
    featured: false,
  },
];

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const existing = await getBlogPosts();
    const existingSlugs = new Set(existing.map((p) => p.slug));

    const toAdd = SEED_POSTS.filter((p) => !existingSlugs.has(p.slug));
    const created: Array<{ id: string; title: string; category: string }> = [];

    for (const post of toAdd) {
      const added = await addBlogPost({ ...post });
      created.push({ id: added.id, title: added.title, category: added.category });
    }

    const msg =
      toAdd.length === 0
        ? "Eklenebilecek yeni örnek yazı yok; hepsi zaten mevcut."
        : `${created.length} blog yazısı eklendi.`;

    return NextResponse.json({ ok: true, message: msg, created });
  } catch (error) {
    console.error("Seed blogs error:", error);
    return NextResponse.json(
      { error: "Blog yazıları eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
