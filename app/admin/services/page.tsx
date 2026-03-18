import { ServicesList } from "@/components/admin/ServicesList";

export const metadata = {
  title: "Hizmetler | Admin Panel",
  robots: "noindex, nofollow",
};

export default function AdminServicesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ServicesList />
    </div>
  );
}
