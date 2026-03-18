import { NextResponse } from "next/server";
import { hasUsers, createUser } from "@/lib/users";

export async function POST(request: Request) {
  const hasAnyUsers = await hasUsers();
  if (hasAnyUsers) {
    return NextResponse.json(
      { error: "Zaten yönetici hesabı mevcut." },
      { status: 400 }
    );
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

    await createUser({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      password,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
