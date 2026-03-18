import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getLeads, updateLeadStatus } from "@/lib/leads";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const leads = await getLeads();
  return NextResponse.json(leads);
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "id ve status gereklidir." },
        { status: 400 }
      );
    }

    const validStatuses = [
      "yeni",
      "okundu",
      "donus_yapildi",
      "teklif_verildi",
      "kapanis_yapildi",
      "reddedildi",
      "yanitlandi", // Eski veri uyumluluğu
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Geçersiz durum." }, { status: 400 });
    }

    const updated = await updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Talep bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update lead error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}
