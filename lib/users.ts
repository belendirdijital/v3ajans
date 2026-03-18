import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { sql, ensureAdminUsersTable } from "./db";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

export type SafeAdminUser = Omit<AdminUser, "passwordHash">;

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const hashBuffer = scryptSync(password, salt, 64);
    const storedBuffer = Buffer.from(hash, "hex");
    return timingSafeEqual(hashBuffer, storedBuffer);
  } catch {
    return false;
  }
}

function asRows<T>(result: unknown): T[] {
  return Array.isArray(result) ? result : [];
}

export async function getUsers(): Promise<SafeAdminUser[]> {
  await ensureAdminUsersTable();
  const rows = asRows<{ id: string; email: string; name: string; created_at: Date }>(
    await sql`
    SELECT id, email, name, created_at
    FROM admin_users
    ORDER BY created_at ASC
  `
  );
  return rows.map((r) => ({
    id: r.id,
    email: r.email,
    name: r.name,
    createdAt: (r.created_at as Date).toISOString(),
  }));
}

export async function getUserByEmail(
  email: string
): Promise<(AdminUser & { passwordHash: string }) | null> {
  await ensureAdminUsersTable();
  const rows = asRows<{
    id: string;
    email: string;
    name: string;
    password_hash: string;
    created_at: Date;
  }>(
    await sql`
    SELECT id, email, name, password_hash, created_at
    FROM admin_users
    WHERE LOWER(email) = LOWER(${email})
    LIMIT 1
  `
  );
  if (rows.length === 0) return null;
  const r = rows[0]!;
  return {
    id: r.id,
    email: r.email,
    name: r.name,
    passwordHash: r.password_hash,
    createdAt: (r.created_at as Date).toISOString(),
  };
}

export async function verifyUser(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const user = await getUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) return null;
  return { ...user, passwordHash: "" };
}

export async function createUser(
  data: { email: string; name: string; password: string }
): Promise<SafeAdminUser> {
  await ensureAdminUsersTable();

  const existing = await getUserByEmail(data.email);
  if (existing) {
    throw new Error("Bu e-posta adresi zaten kayıtlı.");
  }

  const id = crypto.randomUUID();
  const email = data.email.trim().toLowerCase();
  const name = data.name.trim();
  const passwordHash = hashPassword(data.password);

  await sql`
    INSERT INTO admin_users (id, email, name, password_hash)
    VALUES (${id}, ${email}, ${name}, ${passwordHash})
  `;

  return {
    id,
    email,
    name,
    createdAt: new Date().toISOString(),
  };
}

export async function hasUsers(): Promise<boolean> {
  await ensureAdminUsersTable();
  const rows = asRows<Record<string, unknown>>(
    await sql`SELECT 1 FROM admin_users LIMIT 1`
  );
  return rows.length > 0;
}

export async function updateUser(
  id: string,
  data: { name?: string; email?: string; password?: string }
): Promise<SafeAdminUser | null> {
  await ensureAdminUsersTable();

  const rows = asRows<{
    id: string;
    email: string;
    name: string;
    password_hash: string;
    created_at: Date;
  }>(
    await sql`
    SELECT id, email, name, password_hash, created_at
    FROM admin_users
    WHERE id = ${id}
    LIMIT 1
  `
  );
  if (rows.length === 0) return null;

  let name = rows[0]!.name;
  let email = rows[0]!.email;
  let passwordHash = rows[0]!.password_hash;

  if (data.name !== undefined) {
    name = data.name.trim();
  }
  if (data.email !== undefined) {
    const newEmail = data.email.trim().toLowerCase();
    const existing = asRows<Record<string, unknown>>(
      await sql`
      SELECT 1 FROM admin_users
      WHERE id != ${id} AND LOWER(email) = LOWER(${newEmail})
      LIMIT 1
    `
    );
    if (existing.length > 0) {
      throw new Error("Bu e-posta adresi başka bir hesapta kullanılıyor.");
    }
    email = newEmail;
  }
  if (data.password !== undefined && data.password.trim().length >= 6) {
    passwordHash = hashPassword(data.password.trim());
  }

  await sql`
    UPDATE admin_users
    SET name = ${name}, email = ${email}, password_hash = ${passwordHash}
    WHERE id = ${id}
  `;

  const updated = asRows<{ id: string; email: string; name: string; created_at: Date }>(
    await sql`SELECT id, email, name, created_at FROM admin_users WHERE id = ${id}`
  );
  const r = updated[0]!;
  return {
    id: r.id,
    email: r.email,
    name: r.name,
    createdAt: (r.created_at as Date).toISOString(),
  };
}

export async function deleteUser(id: string): Promise<boolean> {
  await ensureAdminUsersTable();
  const countRows = asRows<{ count: number }>(
    await sql`SELECT COUNT(*)::int as count FROM admin_users`
  );
  const count = countRows[0]?.count ?? 0;
  if (count <= 1) {
    throw new Error("Son yönetici silinemez.");
  }

  const deleted = asRows<{ id: string }>(
    await sql`DELETE FROM admin_users WHERE id = ${id} RETURNING id`
  );
  return deleted.length > 0;
}
