import { LeadsList } from "@/components/admin/LeadsList";

export const metadata = {
  title: "Teklif Talepleri | Admin Panel",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <LeadsList />
    </div>
  );
}
