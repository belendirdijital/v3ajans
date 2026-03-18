export const LEAD_STATUSES = [
  { value: "yeni", label: "Yeni" },
  { value: "okundu", label: "Okundu" },
  { value: "donus_yapildi", label: "Dönüş Yapıldı" },
  { value: "teklif_verildi", label: "Teklif Verildi" },
  { value: "kapanis_yapildi", label: "Kapanış Yapıldı" },
  { value: "reddedildi", label: "Reddedildi" },
  { value: "yanitlandi", label: "Yanıtlandı" }, // Eski veri uyumluluğu
] as const;

export const LEAD_STATUS_LABELS: Record<string, string> = {
  yeni: "Yeni",
  okundu: "Okundu",
  donus_yapildi: "Dönüş Yapıldı",
  teklif_verildi: "Teklif Verildi",
  kapanis_yapildi: "Kapanış Yapıldı",
  reddedildi: "Reddedildi",
  yanitlandi: "Yanıtlandı", // Eski veri uyumluluğu
};

export const LEAD_STATUS_COLORS: Record<string, string> = {
  yeni: "bg-amber-100 text-amber-800",
  okundu: "bg-blue-100 text-blue-800",
  donus_yapildi: "bg-indigo-100 text-indigo-800",
  teklif_verildi: "bg-emerald-100 text-emerald-800",
  kapanis_yapildi: "bg-green-100 text-green-800",
  reddedildi: "bg-slate-200 text-slate-700",
  yanitlandi: "bg-green-100 text-green-800",
};
