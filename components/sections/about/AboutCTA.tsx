import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-700 py-28 lg:py-36">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-400/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </div>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Haydi Başlayalım
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            Markanızı bir sonraki seviyeye birlikte taşıyalım
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-indigo-100 sm:text-xl">
            V3 Ajans olarak sosyal medya, içerik üretimi ve dijital büyüme
            süreçlerinde markanıza özel çözümler sunuyoruz.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
            <Button href="/iletisim" variant="light" size="lg" className="shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/25">
              Teklif Al
            </Button>
            <Button
              href="/hizmetler"
              variant="outline"
              size="lg"
              className="border-2 border-white/80 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white/15"
            >
              Hizmetlerimizi İncele
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
