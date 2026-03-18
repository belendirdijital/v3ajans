import { readFile, writeFile } from "fs/promises";
import path from "path";

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  initials?: string;
  url?: string;
  createdAt: string;
}

const PARTNERS_FILE = path.join(process.cwd(), "data", "partners.json");

async function ensurePartnersFile() {
  try {
    await readFile(PARTNERS_FILE);
  } catch {
    await writeFile(PARTNERS_FILE, JSON.stringify([], null, 2));
  }
}

export async function getPartners(): Promise<Partner[]> {
  try {
    await ensurePartnersFile();
    const data = await readFile(PARTNERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addPartner(data: {
  name: string;
  logo?: string;
  initials?: string;
  url?: string;
}): Promise<Partner> {
  await ensurePartnersFile();
  const partners = await getPartners();
  const newPartner: Partner = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    logo: data.logo,
    initials: data.initials?.trim(),
    url: data.url?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
  partners.push(newPartner);
  await writeFile(PARTNERS_FILE, JSON.stringify(partners, null, 2));
  return newPartner;
}

export async function deletePartner(id: string): Promise<boolean> {
  const partners = await getPartners();
  const partner = partners.find((p) => p.id === id);
  const filtered = partners.filter((p) => p.id !== id);
  if (filtered.length === partners.length) return false;
  await writeFile(PARTNERS_FILE, JSON.stringify(filtered, null, 2));
  // Logo dosyasını sil (varsa)
  if (partner?.logo) {
    try {
      const { unlink } = await import("fs/promises");
      const logoPath = path.join(process.cwd(), "public", partner.logo);
      await unlink(logoPath);
    } catch {
      // Dosya bulunamadıysa sessizce geç
    }
  }
  return true;
}
