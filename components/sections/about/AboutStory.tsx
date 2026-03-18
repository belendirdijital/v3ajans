import { Container } from "@/components/ui/Container";

export function AboutStory() {
  return (
    <section className="border-t border-slate-100 bg-white py-24 lg:py-32">
      <Container>
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[200px_1fr] lg:gap-20">
          <div className="lg:pt-1">
            <span className="inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50/80 px-5 py-2.5 text-sm font-semibold tracking-wide text-indigo-700 shadow-sm">
              V3 Ajans
            </span>
          </div>
          <div className="max-w-3xl space-y-8 text-[17px] leading-[1.8] text-slate-700">
            <p>
              V3 Ajans, markaların dijital dünyada güçlü ve sürdürülebilir bir
              varlık oluşturmasına yardımcı olmak amacıyla 2026 yılında kurulmuş
              bir dijital medya ve pazarlama ajansıdır. Sosyal medya yönetimi,
              içerik üretimi ve dijital pazarlama stratejileri alanında
              uzmanlaşan ekibimiz, markaların hedef kitleleriyle daha etkili bir
              şekilde buluşmasını sağlamayı amaçlar.
            </p>
            <p>
              Niğde&apos;de başlayan bu yolculuk, üç kişinin ortak vizyonu ve
              büyük hayalleriyle şekillendi. Kısa süre içerisinde birçok farklı
              sektörden firmaya hizmet vererek deneyim kazanan V3 Ajans,
              markaların dijital dünyada büyümesine katkı sağlayan yaratıcı ve
              stratejik çözümler üretmeye devam etmektedir.
            </p>
            <p>
              Bizim için dijital pazarlama yalnızca içerik paylaşmaktan ibaret
              değildir. Her marka için doğru stratejiyi belirlemek, hedef kitleyi
              doğru analiz etmek ve markanın dijital kimliğini güçlü bir şekilde
              inşa etmek en önemli önceliğimizdir. Bu nedenle çalışmalarımızda
              yalnızca estetik değil, aynı zamanda performans ve sürdürülebilir
              büyüme odaklı bir yaklaşım benimsiyoruz.
            </p>
            <p>
              V3 Ajans olarak hedefimiz; Niğde&apos;de başlayan bu yolculuğu
              Türkiye genelinde güçlü bir hizmet ağına dönüştürmek ve zamanla
              Avrupa pazarında da markalara değer katan bir dijital çözüm ortağı
              olmaktır. Yenilikçi bakış açımız, dinamik ekibimiz ve sürekli
              gelişen dijital dünyaya uyum sağlayan çalışma modelimizle markaların
              yanında olmaya devam ediyoruz.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
