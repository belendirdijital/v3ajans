"use client";

import { useState } from "react";
import { BlogCard } from "./BlogCard";
import { BlogFilters } from "./BlogFilters";
import type { BlogPost } from "@/lib/blog-constants";

interface BlogPostListProps {
  posts: BlogPost[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <BlogFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length === 0 ? (
          <p className="col-span-full py-12 text-center text-slate-600">
            Bu kategoride henüz yazı yok.
          </p>
        ) : (
          filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        )}
      </div>
    </>
  );
}
