"use client";

import { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS } from "@/lib/blog-constants";

interface BlogFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogFilters({ activeCategory, onCategoryChange }: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onCategoryChange("all")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          activeCategory === "all"
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
            : "bg-white text-slate-600 shadow-sm hover:bg-slate-50"
        }`}
      >
        Tümü
      </button>
      {BLOG_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onCategoryChange(cat)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeCategory === cat
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
              : "bg-white text-slate-600 shadow-sm hover:bg-slate-50"
          }`}
        >
          {BLOG_CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
