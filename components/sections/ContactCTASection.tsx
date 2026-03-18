import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function ContactCTASection() {
  const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
  return (
    <section className="relative overflow-hidden bg-indigo-600 py-20 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
      </div>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sosyal Medya Hesabınızı Konuşalım
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Sosyal medya hedefleriniz için ücretsiz danışmanlık alın. Size en
            uygun paketi birlikte belirleyelim.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/iletisim" variant="light" size="lg">
              İletişime Geçin
            </Button>
            <a
              href={telHref}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              Hemen Arayın
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
