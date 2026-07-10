import type { Metadata } from "next";
import Link from "next/link";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { BlogLocaleSwitcher } from "@/components/blog-locale-switcher";
import { Footer } from "@/components/footer";
import { assertBlogLocale, formatBlogDate, getPostsByLocale } from "@/lib/blog";
import { getBlogIndexMetadata } from "@/lib/metadata";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getBlogIndexMetadata(assertBlogLocale(locale ?? ""));
}

function BlogIndexContent({
  locale,
  posts,
}: {
  locale: ReturnType<typeof assertBlogLocale>;
  posts: Awaited<ReturnType<typeof getPostsByLocale>>;
}) {
  const { intro, ui } = useIntlayer("blog");

  return (
    <main className="flex flex-col">
      <section className="border-b border-line">
        <div className="mx-auto flex w-full max-w-[980px] flex-col gap-6 px-6 py-18 md:px-10 md:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {intro.eyebrow}
          </span>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-6xl">
              {intro.title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg">
              {intro.description}
            </p>
          </div>
          <div>
            <BlogLocaleSwitcher currentLocale={locale} />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[980px] flex-col px-6 py-12 md:px-10 md:py-16">
        {posts.length === 0 ? (
          <p className="max-w-[55ch] leading-relaxed text-muted">
            {ui.emptyState}
          </p>
        ) : (
          <div className="space-y-12 md:space-y-14">
            {posts.map((post) => (
              <article key={`${post.locale}-${post.slug}`} className="group">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-2">
                      {formatBlogDate(locale, post.date)}
                    </p>
                  </div>

                  <div className="md:col-span-9">
                    <div className="space-y-4">
                      <h2 className="max-w-3xl text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                        <Link
                          href={`/${locale}/blog/${post.slug}`}
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
                        href={`/${locale}/blog/${post.slug}`}
                        className="font-mono text-sm text-accent transition-colors hover:text-accent-strong"
                      >
                        {ui.readArticle}
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

export default async function BlogIndexPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const safeLocale = assertBlogLocale(locale ?? "");
  const posts = await getPostsByLocale(safeLocale);

  return (
    <IntlayerServerProvider locale={safeLocale}>
      <BlogIndexContent locale={safeLocale} posts={posts} />
    </IntlayerServerProvider>
  );
}
