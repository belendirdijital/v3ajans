import { sql, ensureLeadsTable } from "./db";

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

function asRows<T>(result: unknown): T[] {
  return Array.isArray(result) ? result : [];
}

export async function getLeads(): Promise<Lead[]> {
  await ensureLeadsTable();
  const rows = asRows<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: string;
    created_at: Date;
  }>(
    await sql`
    SELECT id, name, email, phone, message, status, created_at
    FROM leads
    ORDER BY created_at DESC
  `
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone ?? undefined,
    message: r.message,
    status: r.status as Lead["status"],
    createdAt: (r.created_at as Date).toISOString(),
  }));
}

export async function addLead(
  lead: Omit<Lead, "id" | "createdAt" | "status">
) {
  await ensureLeadsTable();

  const id = crypto.randomUUID();
  await sql`
    INSERT INTO leads (id, name, email, phone, message)
    VALUES (${id}, ${lead.name}, ${lead.email}, ${lead.phone ?? null}, ${lead.message})
  `;

  const inserted = asRows<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: string;
    created_at: Date;
  }>(
    await sql`
    SELECT id, name, email, phone, message, status, created_at
    FROM leads WHERE id = ${id}
  `
  );
  const r = inserted[0]!;
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone ?? undefined,
    message: r.message,
    status: r.status as Lead["status"],
    createdAt: (r.created_at as Date).toISOString(),
  };
}

export async function updateLeadStatus(
  id: string,
  status: Lead["status"]
): Promise<Lead | null> {
  await ensureLeadsTable();

  await sql`
    UPDATE leads SET status = ${status!} WHERE id = ${id}
  `;

  const rows = asRows<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: string;
    created_at: Date;
  }>(
    await sql`
    SELECT id, name, email, phone, message, status, created_at
    FROM leads WHERE id = ${id}
  `
  );
  if (rows.length === 0) return null;
  const r = rows[0]!;
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone ?? undefined,
    message: r.message,
    status: r.status as Lead["status"],
    createdAt: (r.created_at as Date).toISOString(),
  };
}
