import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deletePartner } from "@/lib/partners";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deletePartner(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Partner delete error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}
