export const BLOG_CATEGORIES = [
  "instagram",
  "tiktok",
  "strateji",
  "reklam",
  "icerik-uretimi",
] as const;

export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  strateji: "Strateji",
  reklam: "Reklam",
  "icerik-uretimi": "İçerik Üretimi",
};

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  readingTime: number;
  date: string;
  featured: boolean;
  createdAt: string;
}
