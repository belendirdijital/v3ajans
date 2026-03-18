import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-50/80 blur-3xl" />
      </div>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Sosyal Medyada Markanızın Sesi
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Sosyal Medya Hesaplarınızı{" "}
            <span className="text-indigo-600">Profesyonelce Yönetiyoruz</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Instagram, TikTok, Facebook ve tüm platformlarda içerik üretimi,
            hesapların yönetimi ve dijital pazarlama ile markanızı sosyal medyada öne çıkarıyoruz.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/iletisim" size="lg">
              Ücretsiz Teklif Al
            </Button>
            <Button href="/hizmetler" variant="outline" size="lg">
              Hizmetlerimiz
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
