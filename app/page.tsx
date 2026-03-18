import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PartnerLogosSection } from "@/components/sections/PartnerLogosSection";
import { getPartners } from "@/lib/partners";
import { getServices } from "@/lib/services";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { WorkProcessSection } from "@/components/sections/WorkProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";

export default async function HomePage() {
  const [partners, services] = await Promise.all([
    getPartners(),
    getServices(),
  ]);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PartnerLogosSection partners={partners} />
        <ServicesSection services={services} />
        <WhyChooseUsSection />
        <WorkProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
