import { UsersList } from "@/components/admin/UsersList";

export const metadata = {
  title: "Yöneticiler | Admin Panel",
  robots: "noindex, nofollow",
};

export default function YoneticilerPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <UsersList />
    </div>
  );
}
