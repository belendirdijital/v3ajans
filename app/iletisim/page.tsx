import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "İletişim | V3 Sosyal Medya Ajansı",
  description: "Bizimle iletişime geçin. Ücretsiz danışmanlık için formu doldurun.",
};

export default function IletisimPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="İletişim"
          description="Projeniz hakkında konuşmak için formu doldurun veya doğrudan iletişime geçin."
        />

        <section className="py-12 lg:py-16">
          <Container>
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  İletişim Bilgileri
                </h2>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">E-posta</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-lg text-indigo-600 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Telefon</p>
                    <p className="text-lg text-slate-600">{siteConfig.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Adres</p>
                    <p className="text-slate-600">{siteConfig.address}</p>
                  </div>
                </div>
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
