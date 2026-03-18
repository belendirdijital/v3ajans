import { readFile, writeFile } from "fs/promises";
import path from "path";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

export type SafeAdminUser = Omit<AdminUser, "passwordHash">;

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

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

async function ensureUsersFile() {
  try {
    await readFile(USERS_FILE);
  } catch {
    await writeFile(
      path.join(process.cwd(), "data", "users.json"),
      JSON.stringify([], null, 2)
    );
  }
}

export async function getUsers(): Promise<SafeAdminUser[]> {
  await ensureUsersFile();
  const data = await readFile(USERS_FILE, "utf-8");
  const users: AdminUser[] = JSON.parse(data);
  return users.map(({ passwordHash: _, ...u }) => u);
}

export async function getUserByEmail(
  email: string
): Promise<(AdminUser & { passwordHash: string }) | null> {
  await ensureUsersFile();
  const data = await readFile(USERS_FILE, "utf-8");
  const users: AdminUser[] = JSON.parse(data);
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
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
  await ensureUsersFile();
  const users: AdminUser[] = JSON.parse(
    await readFile(USERS_FILE, "utf-8")
  );

  const existing = await getUserByEmail(data.email);
  if (existing) {
    throw new Error("Bu e-posta adresi zaten kayıtlı.");
  }

  const newUser: AdminUser = {
    id: crypto.randomUUID(),
    email: data.email.trim().toLowerCase(),
    name: data.name.trim(),
    passwordHash: hashPassword(data.password),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2));

  const { passwordHash: _p, ...result } = newUser;
  return result;
}

export async function hasUsers(): Promise<boolean> {
  await ensureUsersFile();
  const data = await readFile(USERS_FILE, "utf-8");
  const users: AdminUser[] = JSON.parse(data);
  return users.length > 0;
}

export async function updateUser(
  id: string,
  data: { name?: string; email?: string; password?: string }
): Promise<SafeAdminUser | null> {
  await ensureUsersFile();
  const users: AdminUser[] = JSON.parse(await readFile(USERS_FILE, "utf-8"));
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  if (data.name !== undefined) {
    users[index]!.name = data.name.trim();
  }
  if (data.email !== undefined) {
    const email = data.email.trim().toLowerCase();
    const existing = users.find(
      (u) => u.id !== id && u.email.toLowerCase() === email
    );
    if (existing) {
      throw new Error("Bu e-posta adresi başka bir hesapta kullanılıyor.");
    }
    users[index]!.email = email;
  }
  if (data.password !== undefined && data.password.trim().length >= 6) {
    users[index]!.passwordHash = hashPassword(data.password.trim());
  }

  await writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  const { passwordHash: _p, ...result } = users[index]!;
  return result;
}

export async function deleteUser(id: string): Promise<boolean> {
  const users: AdminUser[] = JSON.parse(
    await readFile(USERS_FILE, "utf-8")
  );
  if (users.length <= 1) {
    throw new Error("Son yönetici silinemez.");
  }
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === users.length) return false;
  await writeFile(USERS_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
