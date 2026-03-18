import { Container } from "@/components/ui/Container";
import { aboutValues } from "@/data/about";

export function AboutValues() {
  return (
    <section className="border-t border-slate-100 bg-white py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Değerlerimiz
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            Yaklaşımımız
          </h2>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {aboutValues.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200/60 bg-white p-10 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06),0_10px_30px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.03)] hover:border-indigo-200/80 lg:p-12"
            >
              <h3 className="text-lg font-bold tracking-[-0.02em] text-slate-900">
                {item.title}
              </h3>
              <p className="mt-4 text-[17px] leading-[1.7] text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
