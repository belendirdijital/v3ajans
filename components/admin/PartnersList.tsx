"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { Partner } from "@/lib/partners";

export function PartnersList() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    initials: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  async function fetchPartners() {
    try {
      const res = await fetch("/api/admin/partners");
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) throw new Error("Yüklenemedi");
      const data = await res.json();
      setPartners(data);
    } catch {
      setError("Markalar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPartners();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      if (formData.url) formDataToSend.append("url", formData.url);
      if (formData.initials) formDataToSend.append("initials", formData.initials);
      if (logoFile) formDataToSend.append("logo", logoFile);

      const res = await fetch("/api/admin/partners", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Eklenemedi.");
        return;
      }

      setPartners((prev) => [data, ...prev]);
      setFormData({ name: "", url: "", initials: "" });
      setLogoFile(null);
      setShowForm(false);
    } catch {
      setFormError("Bağlantı hatası.");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu markayı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPartners((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Silinemedi.");
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="py-12 text-center text-slate-600">Yükleniyor...</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Partner Markalar</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "İptal" : "Yeni Marka Ekle"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-slate-900">Yeni Marka</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Firma Adı *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="Örn: Acme Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Logo (PNG, JPG, SVG)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-medium file:text-indigo-600 hover:file:bg-indigo-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Yönlendirme Linki
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, url: e.target.value }))
                }
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="https://firma.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Kısaltma (Logo yoksa gösterilir)
              </label>
              <input
                type="text"
                value={formData.initials}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, initials: e.target.value }))
                }
                maxLength={4}
                className="mt-1 block w-full max-w-xs rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="Örn: AC"
              />
            </div>
          </div>
          {formError && (
            <p className="mt-2 text-sm text-red-600">{formError}</p>
          )}
          <Button type="submit" disabled={formLoading} className="mt-6">
            {formLoading ? "Ekleniyor..." : "Ekle"}
          </Button>
        </form>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
      )}

      <div className="mt-8 space-y-4">
        {partners.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-sm">
            Henüz partner marka eklenmemiş.
          </p>
        ) : (
          partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-36 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={48}
                      className="h-10 w-auto max-w-[120px] object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-slate-400">
                      {partner.initials ?? partner.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{partner.name}</h3>
                  {partner.url && (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-indigo-600 hover:underline"
                    >
                      {partner.url}
                    </a>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(partner.id)}
                className="self-start rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 sm:self-center"
              >
                Sil
              </button>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}
