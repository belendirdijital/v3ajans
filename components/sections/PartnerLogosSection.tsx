import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Partner } from "@/lib/partners";

function PartnerLogo({ partner }: { partner: Partner }) {
  const content = partner.logo ? (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={120}
      height={48}
      className="h-10 w-auto max-w-[120px] object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
    />
  ) : (
    <span className="text-lg font-bold text-slate-400">
      {partner.initials ?? partner.name.slice(0, 2).toUpperCase()}
    </span>
  );

  const wrapperClass =
    "flex h-16 w-36 items-center justify-center rounded-xl border border-slate-200/80 bg-white px-4 shadow-sm transition-all hover:shadow-md hover:border-slate-200";

  if (partner.url) {
    return (
      <Link
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
        title={partner.name}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={wrapperClass} title={partner.name}>
      {content}
    </div>
  );
}

interface PartnerLogosSectionProps {
  partners: Partner[];
}

export function PartnerLogosSection({ partners }: PartnerLogosSectionProps) {
  if (!partners?.length) return null;

  return (
    <section className="border-y border-slate-200 bg-slate-50/50 py-12 lg:py-16">
      <Container>
        <p className="mb-8 text-center text-sm font-medium text-slate-500">
          Birlikte çalıştığımız markalar
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {partners.map((partner) => (
            <PartnerLogo key={partner.id} partner={partner} />
          ))}
        </div>
      </Container>
    </section>
  );
}
