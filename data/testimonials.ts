export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    title: "CEO",
    company: "TechStart A.Ş.",
    content: "V3 ile sosyal medya hesaplarımızı yönettik. İçerik kalitesi ve hesap yönetimi sayesinde takipçi sayımız 3 ayda %200 arttı.",
    avatar: "/placeholder-avatars/1.jpg",
    rating: 5,
  },
  {
    id: "2",
    name: "Zeynep Kaya",
    title: "Pazarlama Müdürü",
    company: "Moda Marka Ltd.",
    content: "Instagram ve TikTok hesaplarımızı teslim ettik. Yaratıcı Reel'ler ve düzenli paylaşımlarla markamız sosyal medyada çok güçlendi.",
    avatar: "/placeholder-avatars/2.jpg",
    rating: 5,
  },
  {
    id: "3",
    name: "Mehmet Demir",
    title: "Kurucu",
    company: "StartupHub",
    content: "Sosyal medya yönetimi ve reklam kampanyaları ile müşteri erişimimiz katlandı. Profesyonel ve sonuç odaklı bir ekip.",
    avatar: "/placeholder-avatars/3.jpg",
    rating: 5,
  },
];
