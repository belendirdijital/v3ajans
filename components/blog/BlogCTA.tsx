import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function BlogCTA() {
  return (
    <section className="relative overflow-hidden bg-indigo-600 py-20 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/40 blur-3xl" />
      </div>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Sosyal medyada büyümek için profesyonel destek alın
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            V3 Ajans olarak sosyal medya yönetimi ve içerik üretimiyle markanızı
            büyütmenize yardımcı oluyoruz.
          </p>
          <div className="mt-8">
            <Button href="/iletisim" variant="light" size="lg">
              Teklif Al
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
