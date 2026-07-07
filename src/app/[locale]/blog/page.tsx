import type { Metadata } from "next";
import Link from "next/link";
import { BlogLocaleSwitcher } from "@/components/blog-locale-switcher";
import { Footer } from "@/components/footer";
import {
  assertBlogLocale,
  blogLocales,
  formatBlogDate,
  getPostsByLocale,
} from "@/lib/blog";
import { blogIntro, blogUiCopy } from "@/lib/data";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return blogLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = assertBlogLocale(locale);

  return {
    title: `Blog | ${safeLocale === "vi" ? "Vietnamese" : "English"}`,
    description: blogIntro.description,
    alternates: {
      languages: {
        en: "/en/blog",
        vi: "/vi/blog",
      },
    },
    openGraph: {
      title: blogIntro.title,
      description: blogIntro.description,
      type: "website",
      locale: safeLocale === "vi" ? "vi_VN" : "en_US",
    },
  };
}

export default async function BlogIndexPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const safeLocale = assertBlogLocale(locale);
  const posts = await getPostsByLocale(safeLocale);

  return (
    <main className="flex flex-col">
      <section className="border-b border-line">
        <div className="mx-auto flex w-full max-w-[980px] flex-col gap-6 px-6 py-18 md:px-10 md:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {blogIntro.eyebrow}
          </span>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-6xl">
              {blogIntro.title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg">
              {blogIntro.description}
            </p>
          </div>
          <div>
            <BlogLocaleSwitcher currentLocale={safeLocale} />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[980px] flex-col px-6 py-12 md:px-10 md:py-16">
        {posts.length === 0 ? (
          <p className="max-w-[55ch] leading-relaxed text-muted">
            {blogUiCopy.emptyState}
          </p>
        ) : (
          <div className="space-y-12 md:space-y-14">
            {posts.map((post) => (
              <article key={`${post.locale}-${post.slug}`} className="group">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">
                      {formatBlogDate(safeLocale, post.date)}
                    </p>
                  </div>

                  <div className="md:col-span-9">
                    <div className="space-y-4">
                      <h2 className="max-w-3xl text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                        <Link
                          href={`/${safeLocale}/blog/${post.slug}`}
                          className="transition-colors hover:text-accent"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
                        {post.description}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7">
                      <Link
                        href={`/${safeLocale}/blog/${post.slug}`}
                        className="font-mono text-sm text-accent transition-colors hover:text-accent-strong"
                      >
                        {blogUiCopy.readArticle}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer socialOnly />
    </main>
  );
}
