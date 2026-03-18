import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function TopCampaignBanner() {
  return (
    <div className="bg-indigo-600 py-2.5 text-white">
      <Container>
        <p className="text-center text-sm font-medium">
          🚀 Açılışa özel %20 indirim! Sosyal medya yönetimi paketlerinde geçerli.{" "}
          <Link
            href="/iletisim"
            className="underline decoration-2 underline-offset-2 hover:no-underline"
          >
            Hemen teklif alın
          </Link>
        </p>
      </Container>
    </div>
  );
}
