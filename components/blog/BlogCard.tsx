import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog-constants";
import { BLOG_CATEGORY_LABELS } from "@/lib/blog-constants";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.image || `https://placehold.co/600x400/f3f4f6/6366f1?text=${encodeURIComponent(post.title.slice(0, 20))}`;

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/60">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-indigo-600 backdrop-blur-sm">
            {BLOG_CATEGORY_LABELS[post.category] ?? post.category}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime} dk okuma</span>
          </div>
          <h2 className="mt-3 text-xl font-bold leading-snug text-slate-900 group-hover:text-indigo-600">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-slate-600">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
