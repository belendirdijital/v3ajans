import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { BlogPost } from "./blog-constants";
import { BLOG_CATEGORIES } from "./blog-constants";

export { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS } from "./blog-constants";
export type { BlogPost } from "./blog-constants";

const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

async function ensureBlogsFile() {
  try {
    await readFile(BLOGS_FILE);
  } catch {
    const defaultPosts: BlogPost[] = [
      {
        id: "1",
        title: "2025'te Instagram Reel Trendleri",
        slug: "2025-instagram-reel-trendleri",
        excerpt:
          "Yeni yılda Instagram'da öne çıkacak Reel trendleri ve içerik fikirleri.",
        content: `Instagram Reel'ler her yıl yeni trendlerle gelişiyor. 2025'te kısa format video, trend sesler ve yaratıcı geçişler öne çıkıyor. Markanız için etkileyici Reel içerikleri üretmek, sosyal medyada görünürlüğünüzü artırmanın anahtarıdır.`,
        category: "instagram",
        readingTime: 4,
        date: "2025-03-15",
        featured: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Sosyal Medya İçin İçerik Stratejisi",
        slug: "sosyal-medya-icerik-stratejisi",
        excerpt:
          "Takipçi ve etkileşim artırmak için içerik planlaması nasıl yapılır?",
        content: `Doğru içerik stratejisi takipçi ve etkileşim artırmanın anahtarıdır. Hedef kitle analizi, içerik takvimi oluşturma ve tutarlı paylaşım planı başarılı sosyal medya yönetiminin temel taşlarıdır.`,
        category: "strateji",
        readingTime: 5,
        date: "2025-03-10",
        featured: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "TikTok mu Instagram mı?",
        slug: "tiktok-mu-instagram-mi",
        excerpt:
          "Markanız için hangi platform daha uygun? Karşılaştırma ve öneriler.",
        content: `Markanız için doğru platform seçimi önemlidir. Instagram daha kurumsal markalara uygunken, TikTok genç kitle için ideal olabilir. Hedef kitlenize göre karar verin.`,
        category: "tiktok",
        readingTime: 3,
        date: "2025-03-05",
        featured: false,
        createdAt: new Date().toISOString(),
      },
    ];
    await writeFile(BLOGS_FILE, JSON.stringify(defaultPosts, null, 2));
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    await ensureBlogsFile();
    const data = await readFile(BLOGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function addBlogPost(
  data: Omit<BlogPost, "id" | "createdAt">
): Promise<BlogPost> {
  await ensureBlogsFile();
  const posts = await getBlogPosts();
  const newPost: BlogPost = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  await writeFile(BLOGS_FILE, JSON.stringify(posts, null, 2));
  return newPost;
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index]!, ...data };
  await writeFile(BLOGS_FILE, JSON.stringify(posts, null, 2));
  return posts[index];
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const posts = await getBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  await writeFile(BLOGS_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
