export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Sosyal medya yönetimi süresi ne kadar?",
    answer: "Paketlere göre değişir. Aylık yönetim paketleri minimum 1 ay, proje bazlı çalışmalar 2-8 hafta sürebilir. Detaylı teklif aşamasında net süre belirlenir.",
  },
  {
    id: "2",
    question: "Hangi platformlarda hizmet veriyorsunuz?",
    answer: "Instagram, TikTok, Facebook, LinkedIn ve YouTube'da hesap yönetimi ve içerik üretimi yapıyoruz. İhtiyacınıza göre platform seçimi birlikte yapılır.",
  },
  {
    id: "3",
    question: "İçerikler hazır mı geliyor?",
    answer: "Evet, tüm içerikler (Reel, video, görsel, yazı) bizim tarafımızdan planlanır ve üretilir. Siz sadece onay verir, biz yayınlarız.",
  },
  {
    id: "4",
    question: "Raporlama var mı?",
    answer: "Aylık performans raporları sunuyoruz. Takipçi artışı, etkileşim, erişim ve kampanya sonuçları düzenli olarak paylaşılır.",
  },
];
