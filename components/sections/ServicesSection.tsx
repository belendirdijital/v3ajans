import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/lib/service-constants";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeader
          label="Hizmetlerimiz"
          title="Sosyal Medyada Tam Hizmet"
          description="Sosyal medya yönetiminden içerik üretimine, reklam kampanyalarından marka tasarımına kadar yanınızdayız."
        />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.id} hover>
              <div className="text-3xl">{service.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-slate-600">{service.description}</p>
              <ul className="mt-4 space-y-1">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-indigo-600 font-medium"
                  >
                    • {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/hizmetler" variant="outline">
            Tüm Hizmetler
          </Button>
        </div>
      </Container>
    </section>
  );
}
