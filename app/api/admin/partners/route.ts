import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getPartners, addPartner } from "@/lib/partners";
import path from "path";
import { mkdir } from "fs/promises";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }
  const partners = await getPartners();
  return NextResponse.json(partners);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const url = (formData.get("url") as string) || undefined;
    const initials = (formData.get("initials") as string) || undefined;
    const file = formData.get("logo") as File | null;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Firma adı zorunludur." },
        { status: 400 }
      );
    }

    let logoPath: string | undefined;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "partners");
      await mkdir(uploadDir, { recursive: true });

      const ext = path.extname(file.name) || ".png";
      const filename = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}${ext}`;
      const filePath = path.join(uploadDir, filename);

      const { writeFile } = await import("fs/promises");
      await writeFile(filePath, buffer);

      logoPath = `/partners/${filename}`;
    }

    const partner = await addPartner({
      name: name.trim(),
      logo: logoPath,
      initials: initials?.trim() || undefined,
      url: url?.trim() || undefined,
    });

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Partner add error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}
