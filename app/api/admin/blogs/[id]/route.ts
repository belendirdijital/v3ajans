import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteBlogPost, updateBlogPost } from "@/lib/blogs";
import { BLOG_CATEGORIES } from "@/lib/blogs";
import { put } from "@vercel/blob";

export const maxDuration = 60;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }
  try {
    const { id } = await params;
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const readingTime = parseInt(
      (formData.get("readingTime") as string) || "5",
      10
    );
    const date = formData.get("date") as string;
    const featured = formData.get("featured") === "true";
    const file = formData.get("image") as File | null;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Başlık zorunludur." },
        { status: 400 }
      );
    }

    const updateData: Parameters<typeof updateBlogPost>[1] = {
      title: title.trim(),
      slug: slug?.trim(),
      excerpt: (excerpt as string)?.trim(),
      content: (content as string)?.trim(),
      category: BLOG_CATEGORIES.includes(category as (typeof BLOG_CATEGORIES)[number])
        ? category
        : undefined,
      readingTime,
      date: date || undefined,
      featured,
    };

    if (file && file.size > 0) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
          {
            error:
              "Görsel yüklemek için Vercel Blob kurulu olmalı. Storage > Blob store oluşturup projeyi yeniden deploy edin.",
          },
          { status: 500 }
        );
      }
      if (file.size > 4 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Görsel en fazla 4 MB olabilir. Lütfen daha küçük bir dosya seçin." },
          { status: 400 }
        );
      }
      try {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const blob = await put(`blog/${Date.now()}.${ext}`, file, {
          access: "public",
          addRandomSuffix: true,
        });
        updateData.image = blob.url;
      } catch (e) {
        console.error("Blob upload error:", e);
        const msg = e instanceof Error ? e.message : "Görsel yüklenemedi.";
        return NextResponse.json(
          { error: `Görsel yükleme hatası: ${msg}` },
          { status: 500 }
        );
      }
    }

    const updated = await updateBlogPost(id, updateData);
    if (!updated) {
      return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Blog update error:", error);
    const message =
      error instanceof Error ? error.message : "Bir hata oluştu.";
    return NextResponse.json(
      { error: `Bir hata oluştu: ${message}` },
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
    await deleteBlogPost(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
