import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function TopCampaignBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 py-2.5 text-white/95">
      <Container>
        <p className="text-center text-sm font-medium tracking-wide">
          <span className="mr-1.5 opacity-90">🚀</span>
          Açılışa özel %20 indirim — Sosyal medya paketlerinde geçerli.{" "}
          <Link
            href="/iletisim"
            className="font-semibold underline decoration-white/60 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
          >
            Hemen teklif alın →
          </Link>
        </p>
      </Container>
    </div>
  );
}
