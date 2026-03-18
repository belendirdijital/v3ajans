import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  getBlogPosts,
  addBlogPost,
  BLOG_CATEGORIES,
} from "@/lib/blogs";
import path from "path";
import { mkdir } from "fs/promises";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }
  const posts = await getBlogPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string) || "";
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const readingTime = parseInt(
      (formData.get("readingTime") as string) || "5",
      10
    );
    const date = (formData.get("date") as string) || new Date().toISOString().split("T")[0];
    const featured = formData.get("featured") === "true";
    const file = formData.get("image") as File | null;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Başlık zorunludur." },
        { status: 400 }
      );
    }

    const postSlug =
      slug?.trim() ||
      title
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    let imagePath: string | undefined;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "blog");
      await mkdir(uploadDir, { recursive: true });
      const ext = path.extname(file.name) || ".jpg";
      const filename = `${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, filename);
      const { writeFile } = await import("fs/promises");
      await writeFile(filePath, buffer);
      imagePath = `/blog/${filename}`;
    }

    const post = await addBlogPost({
      title: title.trim(),
      slug: postSlug,
      excerpt: (excerpt as string)?.trim() || title.trim(),
      content: (content as string)?.trim() || "",
      category: BLOG_CATEGORIES.includes(category as (typeof BLOG_CATEGORIES)[number])
        ? category
        : "strateji",
      image: imagePath,
      readingTime,
      date,
      featured,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Blog add error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}
