import { BlogsList } from "@/components/admin/BlogsList";

export const metadata = {
  title: "Blog Yazıları | Admin Panel",
  robots: "noindex, nofollow",
};

export default function BloglarPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <BlogsList />
    </div>
  );
}
