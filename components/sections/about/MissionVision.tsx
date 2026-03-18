import { Container } from "@/components/ui/Container";

const cards = [
  {
    title: "Misyonumuz",
    content:
      "Markaların dijital dünyada güçlü, tutarlı ve etkili bir şekilde yer almasını sağlamak; yaratıcı içerikler, stratejik planlama ve doğru iletişimle sürdürülebilir büyümelerine katkı sunmak.",
  },
  {
    title: "Vizyonumuz",
    content:
      "Niğde'de başlayan yolculuğumuzu Türkiye geneline ve zamanla Avrupa pazarına taşıyarak, markalar için güvenilir, yaratıcı ve sonuç odaklı bir dijital çözüm ortağı olmak.",
  },
];

export function MissionVision() {
  return (
    <section className="border-t border-slate-100 bg-gradient-to-b from-slate-50/90 to-slate-50 py-24 lg:py-32">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-slate-200/60 bg-white p-10 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06),0_10px_30px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.08),0_20px_50px_-12px_rgba(0,0,0,0.06)] hover:border-slate-200 lg:p-12"
            >
              <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900 lg:text-2xl">
                {card.title}
              </h2>
              <p className="mt-6 text-[17px] leading-[1.75] text-slate-600">
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
