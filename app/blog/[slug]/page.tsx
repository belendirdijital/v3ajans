import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getBlogBySlug } from "@/lib/blogs";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: `${post.title} | V3 Blog`,
    description: post.excerpt.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <article className="py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                ← Bloğa dön
              </Link>
              <p className="mt-4 text-slate-500">
                {new Date(post.date).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                • {post.readingTime} dk okuma
              </p>
              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                {post.title}
              </h1>
              <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-slate-600">
                {post.content}
              </div>
              <div className="mt-12">
                <Button href="/blog" variant="outline">
                  Tüm Yazılar
                </Button>
              </div>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
