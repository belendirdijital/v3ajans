import { NextResponse } from "next/server";
import { setAdminCookie, clearAdminCookie } from "@/lib/auth";
import { verifyUser } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, logout } = body;

    if (logout) {
      await clearAdminCookie();
      return NextResponse.json({ success: true });
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-posta ve şifre gereklidir." },
        { status: 400 }
      );
    }

    const user = await verifyUser(email.trim().toLowerCase(), password);
    if (!user) {
      return NextResponse.json(
        { error: "Geçersiz e-posta veya şifre." },
        { status: 401 }
      );
    }

    await setAdminCookie();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}
