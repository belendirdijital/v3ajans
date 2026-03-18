import Link from "next/link";
import type { Service } from "@/lib/service-constants";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_10px_30px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200/80 hover:shadow-[0_20px_50px_-15px_rgba(79,70,229,0.15),0_0_0_1px_rgba(79,70,229,0.08)] md:p-10">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-100">
        {service.icon}
      </div>
      <h2 className="mt-6 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
        {service.title}
      </h2>
      <p className="mt-4 text-slate-600 leading-relaxed">
        {service.description}
      </p>
      <ul className="mt-6 space-y-3">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3 text-sm font-medium text-indigo-600"
          >
            <span className="flex h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link
          href="/iletisim"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-[0.98]"
        >
          Teklif Al
        </Link>
      </div>
    </div>
  );
}
