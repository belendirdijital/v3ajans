import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  title: string;
  description: string;
  label?: string;
}

export function PageHero({ title, description, label }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-slate-900 py-10 lg:py-12">
      {/* Film şeridi perforasyon efekti */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
        }}
      />
      <div className="absolute left-0 top-0 h-full w-8 border-r border-slate-700/50" />
      <div className="absolute right-0 top-0 h-full w-8 border-l border-slate-700/50" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          {label && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {label}
            </p>
          )}
          <h1
            className={`text-3xl font-bold tracking-tight text-white sm:text-4xl ${label ? "mt-2" : ""}`}
          >
            {title}
          </h1>
          <p className="mt-3 text-base text-slate-400 sm:text-lg">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
