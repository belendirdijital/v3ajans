export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  stat?: string;
}

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "1",
    title: "Deneyimli Ekip",
    description: "10+ yıllık sektör deneyimi ile uzman kadromuz her projeye profesyonel yaklaşır.",
    stat: "10+",
  },
  {
    id: "2",
    title: "Yönetilen Hesap",
    description: "Sosyal medya hesaplarında yüzlerce başarılı proje ile referans portföyümüz gücümüzü kanıtlıyor.",
    stat: "250+",
  },
  {
    id: "3",
    title: "Mutlu Müşteri",
    description: "Müşteri memnuniyeti odaklı çalışma anlayışımızla uzun vadeli iş birlikleri kuruyoruz.",
    stat: "98%",
  },
  {
    id: "4",
    title: "Zamanında Teslimat",
    description: "Proje takvimi ve teslimat sürelerine titizlikle uyarak güven oluşturuyoruz.",
    stat: "99%",
  },
];
