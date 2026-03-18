import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { workProcessSteps } from "@/data/workProcess";

export function WorkProcessSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeader
          label="Çalışma Sürecimiz"
          title="Projelerinizi Adım Adım Hayata Geçiriyoruz"
          description="Şeffaf ve düzenli süreç yönetimi ile her aşamada sizinle birlikte ilerliyoruz."
        />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {workProcessSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl bg-white p-8 shadow-lg shadow-slate-200/50 border border-slate-100 transition-shadow hover:shadow-xl"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white">
                {step.step}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
