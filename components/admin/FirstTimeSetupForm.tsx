"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function FirstTimeSetupForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bootstrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Oluşturulamadı.");
        return;
      }
      router.refresh();
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-6 flex justify-center">
        <Image
          src={siteConfig.logo}
          alt={siteConfig.name}
          width={160}
          height={36}
          className="h-10 w-auto object-contain"
        />
      </div>
      <h1 className="text-xl font-bold text-slate-900">İlk Yönetici Oluştur</h1>
      <p className="mt-2 text-sm text-slate-600">
        Henüz yönetici hesabı yok. İlk hesabı oluşturun.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Ad Soyad
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            required
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="Adınız Soyadınız"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            E-posta
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({ ...p, email: e.target.value }))
            }
            required
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="ornek@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Şifre (en az 6 karakter)
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((p) => ({ ...p, password: e.target.value }))
            }
            required
            minLength={6}
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Oluşturuluyor..." : "Hesap Oluştur"}
        </Button>
      </form>
    </div>
  );
}
