import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-24 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-100/60 via-white to-indigo-50/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />
      </div>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Brand badge */}
          <div className="mb-8 flex justify-center">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={140}
              height={36}
              className="h-11 w-auto object-contain opacity-95"
            />
          </div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600/90">
            {siteConfig.tagline}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            Sosyal Medya Hesaplarınızı{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
              Profesyonelce Yönetiyoruz
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-600">
            Instagram, TikTok, Facebook ve tüm platformlarda içerik üretimi,
            hesapların yönetimi ve dijital pazarlama ile markanızı sosyal medyada öne çıkarıyoruz.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
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
