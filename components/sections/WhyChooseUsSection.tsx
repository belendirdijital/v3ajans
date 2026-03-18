import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { whyChooseUsData } from "@/data/whyChooseUs";

export function WhyChooseUsSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeader
          label="Neden Biz"
          title="Sosyal Medyada Güvenilir Ortağınız"
          description="İçerik kalitesi, tutarlı yönetim ve müşteri memnuniyeti odaklı çalışma anlayışımızla fark yaratıyoruz."
        />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUsData.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-8 shadow-lg shadow-slate-200/50 border border-slate-100 text-center"
            >
              <span className="text-4xl font-bold text-indigo-600">
                {item.stat}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
