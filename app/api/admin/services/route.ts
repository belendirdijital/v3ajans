import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getServices, addService, slugify } from "@/lib/services";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }
  const services = await getServices();
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }
  try {
    const body = await request.json();
    const title = (body.title as string)?.trim();
    const description = (body.description as string)?.trim() || "";
    const icon = (body.icon as string)?.trim() || "📋";
    const slug =
      (body.slug as string)?.trim() || (title ? slugify(title) : "");
    const featuresRaw = body.features;
    const features = Array.isArray(featuresRaw)
      ? featuresRaw.filter((f): f is string => typeof f === "string" && f.trim().length > 0)
      : typeof featuresRaw === "string"
        ? featuresRaw
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    if (!title) {
      return NextResponse.json(
        { error: "Başlık zorunludur." },
        { status: 400 }
      );
    }

    const service = await addService({
      title,
      description,
      icon,
      slug: slug || slugify(title),
      features,
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error("Service add error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}
