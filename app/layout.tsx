import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "V3 Ajans | Sosyal Medya Yönetimi & Dijital Pazarlama",
  description:
    "Sosyal medya yönetimi, içerik üretimi ve dijital pazarlama. Instagram, TikTok, Facebook hesaplarınızı profesyonelce yönetiyoruz.",
  keywords: ["sosyal medya yönetimi", "dijital ajans", "içerik üretimi", "sosyal medya ajansı", "dijital pazarlama"],
  openGraph: {
    title: "V3 Ajans | Sosyal Medya Yönetimi & Dijital Pazarlama",
    description: "Sosyal medya yönetimi ve içerik üretimi ile markanızı sosyal medyada öne çıkarıyoruz.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
