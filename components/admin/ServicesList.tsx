"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/lib/service-constants";

export function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "📋",
    slug: "",
    features: "" as string,
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  async function fetchServices() {
    try {
      const res = await fetch("/api/admin/services");
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) throw new Error("Yüklenemedi");
      const data = await res.json();
      setServices(data);
    } catch {
      setFormError("Hizmetler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  function openEditForm(service: Service) {
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      slug: service.slug,
      features: service.features.join("\n"),
    });
    setEditingId(service.id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      icon: "📋",
      slug: "",
      features: "",
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        icon: formData.icon.trim() || "📋",
        slug: formData.slug.trim() || undefined,
        features: formData.features
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (editingId) {
        const res = await fetch(`/api/admin/services/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setFormError(data.error || "Güncellenemedi.");
          return;
        }
        setServices((prev) =>
          prev.map((s) => (s.id === editingId ? data : s))
        );
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setFormError(data.error || "Eklenemedi.");
          return;
        }
        setServices((prev) => [...prev, data]);
      }
      closeForm();
    } catch {
      setFormError("Bağlantı hatası.");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setFormError("Silinemedi.");
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
        <h1 className="text-2xl font-bold text-slate-900">Hizmetler</h1>
        <Button
          onClick={() => {
            if (showForm) {
              closeForm();
              setShowForm(false);
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm ? "İptal" : "Yeni Hizmet Ekle"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            {editingId ? "Hizmeti Düzenle" : "Yeni Hizmet"}
          </h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Başlık *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="Örn: Sosyal Medya Yönetimi"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, description: e.target.value }))
                }
                rows={4}
                className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="Hizmet açıklaması"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                İkon (emoji)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, icon: e.target.value }))
                }
                className="mt-1 block w-full max-w-[100px] rounded-xl border border-slate-300 px-4 py-3 text-2xl shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="📋"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Slug (boş bırakılırsa başlıktan oluşturulur)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, slug: e.target.value }))
                }
                className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="sosyal-medya-yonetimi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Alt maddeler (her satıra bir madde)
              </label>
              <textarea
                value={formData.features}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, features: e.target.value }))
                }
                rows={5}
                className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="Hesap Yönetimi&#10;İçerik Planı&#10;Topluluk Yönetimi"
              />
            </div>
          </div>
          {formError && (
            <p className="mt-4 text-sm text-red-600">{formError}</p>
          )}
          <div className="mt-6 flex gap-3">
            <Button type="submit" disabled={formLoading}>
              {formLoading ? "Kaydediliyor..." : editingId ? "Güncelle" : "Ekle"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                closeForm();
                setShowForm(false);
              }}
            >
              İptal
            </Button>
          </div>
        </form>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                İkon
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Başlık
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Slug
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {services.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  Henüz hizmet eklenmemiş.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4 text-2xl">
                    {service.icon}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">
                      {service.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {service.slug}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => openEditForm(service)}
                      className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      Düzenle
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(service.id)}
                      className="ml-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
