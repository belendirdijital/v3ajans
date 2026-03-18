import { Container } from "@/components/ui/Container";
import { aboutStats } from "@/data/about";

export function AboutStats() {
  return (
    <section className="border-t border-slate-100 bg-gradient-to-b from-slate-50 to-slate-100/50 py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Rakamlarla Biz
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-slate-900 sm:text-4xl">
            Gücümüzü Kanıtlıyoruz
          </h2>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {aboutStats.map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-10 text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06),0_12px_35px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.25),0_0_0_1px_rgba(99,102,241,0.1)] hover:border-indigo-200/80 lg:p-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative block text-5xl font-bold text-indigo-600 lg:text-6xl">
                {item.stat}
              </span>
              <p className="relative mt-4 font-semibold text-slate-800">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
