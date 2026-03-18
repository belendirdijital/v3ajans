import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  AboutIntro,
  AboutStory,
  MissionVision,
  AboutValues,
  AboutStats,
  AboutCTA,
} from "@/components/sections/about";

export const metadata: Metadata = {
  title: "Hakkımızda | V3 Sosyal Medya Ajansı",
  description:
    "V3 Ajans hakkında bilgi edinin. Niğde'de kurulan dijital medya ve pazarlama ajansımızın misyonu, vizyonu ve değerleri.",
};

export default function HakkimizdaPage() {
  return (
    <>
      <Header />
      <main>
        <AboutIntro />
        <AboutStory />
        <MissionVision />
        <AboutValues />
        <AboutStats />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
