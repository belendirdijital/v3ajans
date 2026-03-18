import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { updateService, deleteService, slugify } from "@/lib/services";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const title = (body.title as string)?.trim();
    const description = (body.description as string)?.trim();
    const icon = (body.icon as string)?.trim();
    const slug = (body.slug as string)?.trim();
    const featuresRaw = body.features;
    const features = Array.isArray(featuresRaw)
      ? featuresRaw.filter((f): f is string => typeof f === "string" && f.trim().length > 0)
      : typeof featuresRaw === "string"
        ? featuresRaw
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined;

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (slug !== undefined) updateData.slug = slug;
    if (features !== undefined) updateData.features = features;

    if (title && !slug) {
      updateData.slug = slugify(title);
    }

    if (title === "") {
      return NextResponse.json(
        { error: "Başlık boş olamaz." },
        { status: 400 }
      );
    }

    const updated = await updateService(id, updateData);
    if (!updated) {
      return NextResponse.json(
        { error: "Hizmet bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Service update error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }
  try {
    const { id } = await params;
    const deleted = await deleteService(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Hizmet bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
