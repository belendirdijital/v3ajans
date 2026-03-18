"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BLOG_CATEGORIES, BLOG_CATEGORY_LABELS } from "@/lib/blog-constants";
import type { BlogPost } from "@/lib/blog-constants";

export function BlogsList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "strateji",
    readingTime: "5",
    date: new Date().toISOString().split("T")[0],
    featured: "false",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const router = useRouter();

  async function fetchPosts() {
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) throw new Error("Yüklenemedi");
      const data = await res.json();
      setPosts(data);
    } catch {
      setFormError("Yazılar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function openEditForm(post: BlogPost) {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readingTime: String(post.readingTime),
      date: post.date,
      featured: post.featured ? "true" : "false",
    });
    setImageFile(null);
    setEditingId(post.id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "strateji",
      readingTime: "5",
      date: new Date().toISOString().split("T")[0],
      featured: "false",
    });
    setImageFile(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("slug", formData.slug);
      fd.append("excerpt", formData.excerpt);
      fd.append("content", formData.content);
      fd.append("category", formData.category);
      fd.append("readingTime", formData.readingTime);
      fd.append("date", formData.date);
      fd.append("featured", formData.featured);
      if (imageFile) fd.append("image", imageFile);

      if (editingId) {
        const res = await fetch(`/api/admin/blogs/${editingId}`, {
          method: "PATCH",
          body: fd,
        });
        const data = await res.json();
        if (!res.ok) {
          setFormError(data.error || "Güncellenemedi.");
          return;
        }
        setPosts((prev) =>
          prev.map((p) => (p.id === editingId ? data : p))
        );
      } else {
        const res = await fetch("/api/admin/blogs", {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        if (!res.ok) {
          setFormError(data.error || "Eklenemedi.");
          return;
        }
        setPosts((prev) => [data, ...prev]);
      }
      closeForm();
    } catch {
      setFormError("Bağlantı hatası.");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setFormError("Silinemedi.");
    }
  }

  async function handleSeed() {
    if (!confirm("Her kategori için örnek blog yazıları eklenecek. Devam edilsin mi?")) return;
    setFormError("");
    setSeedLoading(true);
    try {
      const res = await fetch("/api/admin/seed-blogs", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Yazılar eklenemedi.");
        return;
      }
      await fetchPosts();
      setFormError("");
      alert(data.message || "Blog yazıları başarıyla eklendi.");
    } catch {
      setFormError("Bağlantı hatası.");
    } finally {
      setSeedLoading(false);
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
        <h1 className="text-2xl font-bold text-slate-900">Blog Yazıları</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={handleSeed}
            disabled={seedLoading}
          >
            {seedLoading ? "Ekleniyor..." : "Her Kategori İçin Örnek Yazılar Ekle"}
          </Button>
          <Button onClick={() => (showForm ? closeForm() : setShowForm(true))}>
            {showForm ? "İptal" : "Yeni Yazı Ekle"}
          </Button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            {editingId ? "Yazıyı Düzenle" : "Yeni Blog Yazısı"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2"
                placeholder="Yazı başlığı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Slug (boş bırakılırsa otomatik)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, slug: e.target.value }))
                }
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2"
                placeholder="yazi-slug"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Özet
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData((p) => ({ ...p, excerpt: e.target.value }))
              }
              rows={2}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2"
              placeholder="Kısa açıklama"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              İçerik
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData((p) => ({ ...p, content: e.target.value }))
              }
              rows={5}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2"
              placeholder="Yazı içeriği"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, category: e.target.value }))
                }
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2"
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {BLOG_CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Okuma süresi (dk)
              </label>
              <input
                type="number"
                min={1}
                value={formData.readingTime}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, readingTime: e.target.value }))
                }
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Tarih
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, date: e.target.value }))
                }
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Öne Çıkan
              </label>
              <select
                value={formData.featured}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, featured: e.target.value }))
                }
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2"
              >
                <option value="false">Hayır</option>
                <option value="true">Evet</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Kapak Görseli
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full text-sm file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-medium file:text-indigo-600"
            />
          </div>
          {formError && (
            <p className="text-sm text-red-600">{formError}</p>
          )}
          <Button type="submit" disabled={formLoading}>
            {formLoading
              ? editingId
                ? "Güncelleniyor..."
                : "Ekleniyor..."
              : editingId
                ? "Güncelle"
                : "Ekle"}
          </Button>
        </form>
      )}

      <div className="mt-8 space-y-4">
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-600">
            Henüz blog yazısı yok.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                {post.image ? (
                  <div className="relative h-16 w-24 overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                    —
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-slate-900">{post.title}</h3>
                  <p className="text-sm text-slate-500">
                    {BLOG_CATEGORY_LABELS[post.category]} • {post.readingTime} dk
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openEditForm(post)}
                  className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Düzenle
                </button>
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Görüntüle
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
