"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || undefined,
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <h2 className="text-xl font-semibold text-slate-900">Bize Ulaşın</h2>
      <p className="mt-2 text-slate-600">
        Formu doldurun, 24 saat içinde size dönüş yapalım.
      </p>
      <div className="mt-6 space-y-4">
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
            name="name"
            required
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
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
            name="email"
            required
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="ornek@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700"
          >
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="+90 5XX XXX XX XX"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700"
          >
            Mesajınız
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="Projeniz hakkında kısaca bilgi verin..."
          />
        </div>
      </div>
      {status === "success" && (
        <p className="mt-4 text-sm font-medium text-green-600">
          Mesajınız alındı. En kısa sürede size dönüş yapacağız.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600">
          Bir hata oluştu. Lütfen tekrar deneyin.
        </p>
      )}
      <div className="mt-6">
        <Button
          type="submit"
          disabled={status === "sending"}
          className="w-full justify-center sm:w-auto"
        >
          {status === "sending" ? "Gönderiliyor..." : "Gönder"}
        </Button>
      </div>
    </form>
  );
}
