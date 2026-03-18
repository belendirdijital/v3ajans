"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Teklif Talepleri" },
  { href: "/admin/partner-markalar", label: "Partner Markalar" },
  { href: "/admin/services", label: "Hizmetler" },
  { href: "/admin/bloglar", label: "Blog Yazıları" },
  { href: "/admin/yoneticiler", label: "Yöneticiler" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logout: true }),
    });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <nav className="flex gap-1 rounded-xl bg-white p-1 shadow-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-red-600"
      >
        Çıkış
      </button>
    </div>
  );
}
