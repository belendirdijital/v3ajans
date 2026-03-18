import { sql, ensurePartnersTable } from "./db";

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  initials?: string;
  url?: string;
  createdAt: string;
}

function asRows<T>(result: unknown): T[] {
  return Array.isArray(result) ? result : [];
}

export async function getPartners(): Promise<Partner[]> {
  await ensurePartnersTable();

  const rows = asRows<{
    id: string;
    name: string;
    logo: string | null;
    initials: string | null;
    url: string | null;
    created_at: Date;
  }>(await sql`SELECT * FROM partners ORDER BY created_at ASC`);

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    logo: r.logo ?? undefined,
    initials: r.initials ?? undefined,
    url: r.url ?? undefined,
    createdAt: (r.created_at as Date).toISOString(),
  }));
}

export async function addPartner(data: {
  name: string;
  logo?: string;
  initials?: string;
  url?: string;
}): Promise<Partner> {
  await ensurePartnersTable();

  const id = crypto.randomUUID();
  await sql`
    INSERT INTO partners (id, name, logo, initials, url)
    VALUES (
      ${id},
      ${data.name.trim()},
      ${data.logo ?? null},
      ${data.initials?.trim() ?? null},
      ${data.url?.trim() || null}
    )
  `;

  const inserted = asRows<{
    id: string;
    name: string;
    logo: string | null;
    initials: string | null;
    url: string | null;
    created_at: Date;
  }>(await sql`SELECT * FROM partners WHERE id = ${id} LIMIT 1`);
  const r = inserted[0]!;
  return {
    id: r.id,
    name: r.name,
    logo: r.logo ?? undefined,
    initials: r.initials ?? undefined,
    url: r.url ?? undefined,
    createdAt: (r.created_at as Date).toISOString(),
  };
}

export async function deletePartner(id: string): Promise<boolean> {
  await ensurePartnersTable();
  // Logo dosyasını silmek Vercel'de çalışmaz (read-only) - sessizce atlanır
  const deleted = asRows<{ id: string }>(
    await sql`DELETE FROM partners WHERE id = ${id} RETURNING id`
  );
  return deleted.length > 0;
}
