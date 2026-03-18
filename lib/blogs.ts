import { sql, ensureBlogPostsTable } from "./db";
import type { BlogPost } from "./blog-constants";

export { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS } from "./blog-constants";
export type { BlogPost } from "./blog-constants";

function asRows<T>(result: unknown): T[] {
  return Array.isArray(result) ? result : [];
}

const DEFAULT_POSTS: Omit<BlogPost, "createdAt">[] = [
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
  },
];

async function seedDefaultBlogsIfEmpty() {
  const rows = asRows<{ id: string }>(
    await sql`SELECT id FROM blog_posts LIMIT 1`
  );
  if (rows.length > 0) return;

  for (const p of DEFAULT_POSTS) {
    await sql`
      INSERT INTO blog_posts (id, title, slug, excerpt, content, category, reading_time, date, featured)
      VALUES (
        ${p.id},
        ${p.title},
        ${p.slug},
        ${p.excerpt},
        ${p.content},
        ${p.category},
        ${p.readingTime},
        ${p.date},
        ${p.featured}
      )
    `;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  await ensureBlogPostsTable();
  await seedDefaultBlogsIfEmpty();

  const rows = asRows<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    image: string | null;
    reading_time: number;
    date: string;
    featured: boolean;
    created_at: Date;
  }>(await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`);

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    content: r.content,
    category: r.category,
    image: r.image ?? undefined,
    readingTime: r.reading_time,
    date: r.date,
    featured: r.featured,
    createdAt: (r.created_at as Date).toISOString(),
  }));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  await ensureBlogPostsTable();
  await seedDefaultBlogsIfEmpty();

  const rows = asRows<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    image: string | null;
    reading_time: number;
    date: string;
    featured: boolean;
    created_at: Date;
  }>(await sql`SELECT * FROM blog_posts WHERE slug = ${slug} LIMIT 1`);
  if (rows.length === 0) return null;

  const r = rows[0]!;
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    content: r.content,
    category: r.category,
    image: r.image ?? undefined,
    readingTime: r.reading_time,
    date: r.date,
    featured: r.featured,
    createdAt: (r.created_at as Date).toISOString(),
  };
}

export async function addBlogPost(
  data: Omit<BlogPost, "id" | "createdAt">
): Promise<BlogPost> {
  await ensureBlogPostsTable();

  const id = crypto.randomUUID();
  await sql`
    INSERT INTO blog_posts (id, title, slug, excerpt, content, category, image, reading_time, date, featured)
    VALUES (
      ${id},
      ${data.title},
      ${data.slug},
      ${data.excerpt},
      ${data.content},
      ${data.category},
      ${data.image ?? null},
      ${data.readingTime ?? 0},
      ${data.date},
      ${data.featured ?? false}
    )
  `;

  const inserted = asRows<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    image: string | null;
    reading_time: number;
    date: string;
    featured: boolean;
    created_at: Date;
  }>(await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`);
  const r = inserted[0]!;
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    content: r.content,
    category: r.category,
    image: r.image ?? undefined,
    readingTime: r.reading_time,
    date: r.date,
    featured: r.featured,
    createdAt: (r.created_at as Date).toISOString(),
  };
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPost>
): Promise<BlogPost | null> {
  await ensureBlogPostsTable();

  const rows = asRows<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    image: string | null;
    reading_time: number;
    date: string;
    featured: boolean;
    created_at: Date;
  }>(await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`);
  if (rows.length === 0) return null;

  const current = rows[0]!;
  const title = data.title ?? current.title;
  const slug = data.slug ?? current.slug;
  const excerpt = data.excerpt ?? current.excerpt;
  const content = data.content ?? current.content;
  const category = data.category ?? current.category;
  const image = data.image ?? current.image ?? null;
  const readingTime = data.readingTime ?? current.reading_time;
  const date = data.date ?? current.date;
  const featured = data.featured ?? current.featured;

  await sql`
    UPDATE blog_posts
    SET title = ${title}, slug = ${slug}, excerpt = ${excerpt}, content = ${content},
        category = ${category}, image = ${image}, reading_time = ${readingTime},
        date = ${date}, featured = ${featured}
    WHERE id = ${id}
  `;

  const updated = asRows<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    image: string | null;
    reading_time: number;
    date: string;
    featured: boolean;
    created_at: Date;
  }>(await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`);
  const r = updated[0]!;
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    content: r.content,
    category: r.category,
    image: r.image ?? undefined,
    readingTime: r.reading_time,
    date: r.date,
    featured: r.featured,
    createdAt: (r.created_at as Date).toISOString(),
  };
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  await ensureBlogPostsTable();
  const deleted = asRows<{ id: string }>(
    await sql`DELETE FROM blog_posts WHERE id = ${id} RETURNING id`
  );
  return deleted.length > 0;
}
