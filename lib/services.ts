import { sql, ensureServicesTable } from "./db";
import type { Service } from "./service-constants";

export type { Service } from "./service-constants";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function asRows<T>(result: unknown): T[] {
  return Array.isArray(result) ? result : [];
}

const DEFAULT_SERVICES: Omit<Service, "createdAt">[] = [
  {
    id: "social",
    title: "Sosyal Medya Yönetimi",
    description:
      "Instagram, TikTok, Facebook ve diğer platformlarda hesap yönetimi, içerik planlaması ve topluluk yönetimi hizmetleri.",
    features: ["Hesap Yönetimi", "İçerik Planı", "Topluluk Yönetimi"],
    icon: "📱",
    slug: "sosyal-medya-yonetimi",
  },
  {
    id: "content",
    title: "İçerik Üretimi",
    description:
      "Reel, video, görsel ve yazılı içeriklerle markanızı sosyal medyada canlı tutuyoruz.",
    features: ["Reel & Video", "Grafik Tasarım", "Kopya Yazımı"],
    icon: "🎬",
    slug: "icerik-uretimi",
  },
  {
    id: "ads",
    title: "Reklam & Kampanya",
    description:
      "Meta Ads, TikTok Ads ve Google reklamları ile hedef kitlenize ulaşıyoruz.",
    features: ["Meta Ads", "TikTok Ads", "Performans Takibi"],
    icon: "📈",
    slug: "reklam-kampanya",
  },
  {
    id: "branding",
    title: "Marka & Tasarım",
    description:
      "Markanızın sosyal medya görünümünü oluşturuyoruz. Logo, görsel kimlik ve dijital varlıklar.",
    features: ["Görsel Kimlik", "Profil Düzenleme", "Marka Dil"],
    icon: "✨",
    slug: "marka-tasarim",
  },
  {
    id: "software",
    title: "Yazılım Geliştirme",
    description:
      "Web siteleri, özel yazılımlar ve işletmelere özel dijital çözümler geliştiriyoruz.",
    features: [
      "Kurumsal Web Siteleri",
      "Özel Web Yazılımları",
      "Otomasyon Sistemleri",
    ],
    icon: "💻",
    slug: "yazilim-gelistirme",
  },
];

async function seedDefaultServicesIfEmpty() {
  const rows = asRows<{ id: string }>(
    await sql`SELECT id FROM services LIMIT 1`
  );
  if (rows.length > 0) return;

  for (const s of DEFAULT_SERVICES) {
    await sql`
      INSERT INTO services (id, title, description, features, icon, slug)
      VALUES (
        ${s.id},
        ${s.title},
        ${s.description},
        ${JSON.stringify(s.features)}::jsonb,
        ${s.icon},
        ${s.slug}
      )
    `;
  }
}

export async function getServices(): Promise<Service[]> {
  await ensureServicesTable();
  await seedDefaultServicesIfEmpty();

  const rows = asRows<{
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: string;
    slug: string;
    created_at: Date;
  }>(await sql`SELECT * FROM services ORDER BY created_at ASC`);

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    features: Array.isArray(r.features) ? r.features : [],
    icon: r.icon,
    slug: r.slug,
    createdAt: (r.created_at as Date).toISOString(),
  }));
}

export async function addService(
  data: Omit<Service, "id" | "createdAt">
): Promise<Service> {
  await ensureServicesTable();

  const slug =
    data.slug?.trim() || slugify(data.title);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await sql`
    INSERT INTO services (id, title, description, features, icon, slug)
    VALUES (
      ${id},
      ${data.title},
      ${data.description},
      ${JSON.stringify(data.features || [])}::jsonb,
      ${data.icon || "📦"},
      ${slug}
    )
  `;

  return { ...data, id, slug, createdAt };
}

export async function updateService(
  id: string,
  data: Partial<Service>
): Promise<Service | null> {
  await ensureServicesTable();

  const rows = asRows<{
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: string;
    slug: string;
    created_at: Date;
  }>(await sql`SELECT * FROM services WHERE id = ${id} LIMIT 1`);
  if (rows.length === 0) return null;

  const current = rows[0]!;
  const title = data.title ?? current.title;
  const description = data.description ?? current.description;
  const features = data.features ?? current.features;
  const icon = data.icon ?? current.icon;
  const slug = data.slug ?? current.slug;

  await sql`
    UPDATE services
    SET title = ${title}, description = ${description}, features = ${JSON.stringify(features)}::jsonb, icon = ${icon}, slug = ${slug}
    WHERE id = ${id}
  `;

  const updated = asRows<{
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: string;
    slug: string;
    created_at: Date;
  }>(await sql`SELECT * FROM services WHERE id = ${id} LIMIT 1`);

  const r = updated[0]!;
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    features: Array.isArray(r.features) ? r.features : [],
    icon: r.icon,
    slug: r.slug,
    createdAt: (r.created_at as Date).toISOString(),
  };
}

export async function deleteService(id: string): Promise<boolean> {
  await ensureServicesTable();
  const deleted = asRows<{ id: string }>(
    await sql`DELETE FROM services WHERE id = ${id} RETURNING id`
  );
  return deleted.length > 0;
}

export { slugify };
