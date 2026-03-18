import { readFile, writeFile } from "fs/promises";
import path from "path";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  status?:
    | "yeni"
    | "okundu"
    | "donus_yapildi"
    | "teklif_verildi"
    | "kapanis_yapildi"
    | "reddedildi"
    | "yanitlandi";
}

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

async function ensureLeadsFile() {
  try {
    await readFile(LEADS_FILE);
  } catch {
    await writeFile(LEADS_FILE, JSON.stringify([], null, 2));
  }
}

export async function getLeads(): Promise<Lead[]> {
  await ensureLeadsFile();
  const data = await readFile(LEADS_FILE, "utf-8");
  return JSON.parse(data);
}

export async function addLead(lead: Omit<Lead, "id" | "createdAt" | "status">) {
  await ensureLeadsFile();
  const leads = await getLeads();
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "yeni",
  };
  leads.unshift(newLead);
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  return newLead;
}

export async function updateLeadStatus(id: string, status: Lead["status"]) {
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  leads[index]!.status = status;
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  return leads[index];
}
