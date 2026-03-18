import { PartnersList } from "@/components/admin/PartnersList";

export const metadata = {
  title: "Partner Markalar | Admin Panel",
  robots: "noindex, nofollow",
};

export default function PartnerMarkalarPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PartnersList />
    </div>
  );
}
