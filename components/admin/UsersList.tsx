"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { SafeAdminUser } from "@/lib/users";

export function UsersList() {
  const [users, setUsers] = useState<SafeAdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/admin/users");
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) throw new Error("Yüklenemedi");
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Yöneticiler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function openEditForm(user: SafeAdminUser) {
    setFormData({ name: user.name, email: user.email, password: "" });
    setEditingId(user.id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormData({ email: "", name: "", password: "" });
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Oluşturulamadı.");
        return;
      }

      setUsers((prev) => [data, ...prev]);
      closeForm();
    } catch {
      setFormError("Bağlantı hatası.");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    setFormError("");
    setFormLoading(true);
    try {
      const payload: { name: string; email: string; password?: string } = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.password.trim().length >= 6) {
        payload.password = formData.password;
      }
      const res = await fetch(`/api/admin/users/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Güncellenemedi.");
        return;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? data : u))
      );
      closeForm();
    } catch {
      setFormError("Bağlantı hatası.");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu yöneticiyi silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Silinemedi.");
        return;
      }
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Bağlantı hatası.");
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
        <h1 className="text-2xl font-bold text-slate-900">Yönetici Hesapları</h1>
        <Button
          onClick={() => {
            if (showForm) closeForm();
            else setShowForm(true);
          }}
        >
          {showForm ? "İptal" : "Yeni Yönetici Ekle"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={editingId ? handleUpdateUser : handleCreateUser}
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            {editingId ? "Yöneticiyi Düzenle" : "Yeni Yönetici"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Ad
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="Ad Soyad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                E-posta
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="yonetici@ornek.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Şifre{" "}
                {editingId
                  ? "(değiştirmek için doldurun, min. 6 karakter)"
                  : "(min. 6 karakter)"}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, password: e.target.value }))
                }
                required={!editingId}
                minLength={editingId ? undefined : 6}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder={editingId ? "••••••••" : "••••••••"}
              />
            </div>
          </div>
          {formError && (
            <p className="mt-2 text-sm text-red-600">{formError}</p>
          )}
          <div className="mt-4 flex gap-3">
            <Button
              type="submit"
              disabled={formLoading}
            >
              {formLoading
                ? editingId
                  ? "Güncelleniyor..."
                  : "Oluşturuluyor..."
                : editingId
                  ? "Güncelle"
                  : "Oluştur"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={closeForm}>
                İptal
              </Button>
            )}
          </div>
        </form>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
      )}

      <div className="mt-8 space-y-4">
        {users.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-sm">
            Henüz yönetici hesabı yok.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-semibold text-slate-900">{user.name}</h3>
                <p className="text-indigo-600">{user.email}</p>
                <p className="mt-1 text-xs text-slate-400">
                  Eklenme:{" "}
                  {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => openEditForm(user)}
                  className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(user.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}
