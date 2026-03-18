import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getUsers, createUser } from "@/lib/users";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "E-posta, ad ve şifre gereklidir." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Şifre en az 6 karakter olmalıdır." },
        { status: 400 }
      );
    }

    const user = await createUser({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      password,
    });

    return NextResponse.json(user);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
