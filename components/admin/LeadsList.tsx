"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import type { Lead } from "@/lib/leads";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  LEAD_STATUS_COLORS,
} from "@/data/leadStatuses";

export function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "all">("all");
  const router = useRouter();

  const filteredLeads =
    statusFilter === "all"
      ? leads
      : leads.filter((l) => (l.status ?? "yeni") === statusFilter);

  const statusCounts = LEAD_STATUSES.reduce(
    (acc, s) => {
      acc[s.value] = leads.filter((l) => (l.status ?? "yeni") === s.value)
        .length;
      return acc;
    },
    {} as Record<string, number>
  );

  async function fetchLeads() {
    try {
      const res = await fetch("/api/admin/leads");
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) throw new Error("Yüklenemedi");
      const data = await res.json();
      setLeads(data);
    } catch {
      setError("Talepler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  async function updateStatus(id: string, status: Lead["status"]) {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? updated : l))
      );
    } catch {
      setError("Durum güncellenemedi.");
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="py-12 text-center text-slate-600">
          Yükleniyor...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold text-slate-900">Teklif Talepleri</h1>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
      )}

      {/* Durum filtresi */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            statusFilter === "all"
              ? "bg-slate-800 text-white"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Tümü ({leads.length})
        </button>
        {LEAD_STATUSES.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setStatusFilter(s.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              statusFilter === s.value
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {s.label} ({statusCounts[s.value] ?? 0})
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {filteredLeads.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-sm">
            {leads.length === 0
              ? "Henüz teklif talebi bulunmuyor."
              : "Bu filtrede talep bulunmuyor."}
          </p>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        LEAD_STATUS_COLORS[lead.status ?? "yeni"] ??
                        LEAD_STATUS_COLORS.yeni
                      }`}
                    >
                      {LEAD_STATUS_LABELS[lead.status ?? "yeni"] ?? "Yeni"}
                    </span>
                  </div>
                  <p className="mt-1 text-indigo-600">{lead.email}</p>
                  {lead.phone && (
                    <p className="mt-1 text-slate-600">{lead.phone}</p>
                  )}
                  <p className="mt-3 text-slate-700">{lead.message}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(lead.createdAt).toLocaleString("tr-TR")}
                  </p>
                </div>
                <div className="flex gap-2 sm:flex-col sm:items-end">
                  <select
                    value={lead.status ?? "yeni"}
                    onChange={(e) =>
                      updateStatus(lead.id, e.target.value as Lead["status"])
                    }
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}
