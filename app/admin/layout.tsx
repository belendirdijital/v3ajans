import { isAdmin } from "@/lib/auth";
import { AdminAuthWrapper } from "@/components/admin/AdminAuthWrapper";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminHeaderLogo } from "@/components/admin/AdminHeaderLogo";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdmin();

  if (!authenticated) {
    return <AdminAuthWrapper />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <AdminHeaderLogo />
            <AdminNav />
          </div>
        </div>
      </div>
      <main className="py-8">{children}</main>
    </div>
  );
}
