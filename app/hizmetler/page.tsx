import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceCard } from "@/components/hizmetler/ServiceCard";
import { getServices } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hizmetler | V3 Sosyal Medya Ajansı",
  description:
    "Sosyal medya yönetimi, içerik üretimi, reklam kampanyaları ve marka tasarımı hizmetlerimizi keşfedin.",
};

export default async function HizmetlerPage() {
  const services = await getServices();

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Hizmetlerimiz"
          description="Sosyal medyada tam hizmet sunuyoruz."
        />

        <section className="py-12 lg:py-16">
          <Container>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
