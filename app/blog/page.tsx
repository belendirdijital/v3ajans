import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { getBlogPosts } from "@/lib/blogs";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogPostList } from "@/components/blog/BlogPostList";

export const metadata: Metadata = {
  title: "Blog | V3 Sosyal Medya Ajansı",
  description:
    "Sosyal medya stratejileri, içerik ipuçları ve dijital pazarlama rehberleri.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Blog"
          description="Sosyal medya stratejileri, içerik ipuçları ve rehberler."
        />

        <section className="bg-slate-50/50 py-12 lg:py-16">
          <Container>
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Son Yazılar
              </h2>
              <BlogPostList posts={posts} />
            </div>
          </Container>
        </section>

        <BlogCTA />
      </main>
      <Footer />
    </>
  );
}
