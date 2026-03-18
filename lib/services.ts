import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { Service } from "./service-constants";

export type { Service } from "./service-constants";

const SERVICES_FILE = path.join(process.cwd(), "data", "services.json");

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

async function ensureServicesFile() {
  try {
    await readFile(SERVICES_FILE);
  } catch {
    const defaultServices: Service[] = [
      {
        id: "social",
        title: "Sosyal Medya Yönetimi",
        description: "Instagram, TikTok, Facebook ve diğer platformlarda hesap yönetimi, içerik planlaması ve topluluk yönetimi hizmetleri.",
        features: ["Hesap Yönetimi", "İçerik Planı", "Topluluk Yönetimi"],
        icon: "📱",
        slug: "sosyal-medya-yonetimi",
        createdAt: new Date().toISOString(),
      },
      {
        id: "content",
        title: "İçerik Üretimi",
        description: "Reel, video, görsel ve yazılı içeriklerle markanızı sosyal medyada canlı tutuyoruz.",
        features: ["Reel & Video", "Grafik Tasarım", "Kopya Yazımı"],
        icon: "🎬",
        slug: "icerik-uretimi",
        createdAt: new Date().toISOString(),
      },
      {
        id: "ads",
        title: "Reklam & Kampanya",
        description: "Meta Ads, TikTok Ads ve Google reklamları ile hedef kitlenize ulaşıyoruz.",
        features: ["Meta Ads", "TikTok Ads", "Performans Takibi"],
        icon: "📈",
        slug: "reklam-kampanya",
        createdAt: new Date().toISOString(),
      },
      {
        id: "branding",
        title: "Marka & Tasarım",
        description: "Markanızın sosyal medya görünümünü oluşturuyoruz. Logo, görsel kimlik ve dijital varlıklar.",
        features: ["Görsel Kimlik", "Profil Düzenleme", "Marka Dil"],
        icon: "✨",
        slug: "marka-tasarim",
        createdAt: new Date().toISOString(),
      },
      {
        id: "software",
        title: "Yazılım Geliştirme",
        description: "Web siteleri, özel yazılımlar ve işletmelere özel dijital çözümler geliştiriyoruz. İş süreçlerinizi hızlandıran modern yazılım altyapıları oluşturuyoruz.",
        features: ["Kurumsal Web Siteleri", "Özel Web Yazılımları", "Otomasyon Sistemleri"],
        icon: "💻",
        slug: "yazilim-gelistirme",
        createdAt: new Date().toISOString(),
      },
    ];
    await writeFile(SERVICES_FILE, JSON.stringify(defaultServices, null, 2));
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    await ensureServicesFile();
    const data = await readFile(SERVICES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addService(
  data: Omit<Service, "id" | "createdAt">
): Promise<Service> {
  await ensureServicesFile();
  const services = await getServices();
  const newService: Service = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  services.push(newService);
  await writeFile(SERVICES_FILE, JSON.stringify(services, null, 2));
  return newService;
}

export async function updateService(
  id: string,
  data: Partial<Service>
): Promise<Service | null> {
  const services = await getServices();
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  services[index] = { ...services[index]!, ...data };
  await writeFile(SERVICES_FILE, JSON.stringify(services, null, 2));
  return services[index];
}

export async function deleteService(id: string): Promise<boolean> {
  const services = await getServices();
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === services.length) return false;
  await writeFile(SERVICES_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

export { slugify };
