import type { Metadata } from "next";
import Link from "next/link";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { BlogLocaleSwitcher } from "@/components/blog-locale-switcher";
import { BlogReadingLayout } from "@/components/blog-reading-layout";
import { Footer } from "@/components/footer";
import {
  assertBlogLocale,
  type BlogHeading,
  formatBlogDate,
  getAllBlogParams,
  getAlternatePostLocale,
  getPostOrNotFound,
} from "@/lib/blog";
import { localeOpenGraph } from "@/lib/i18n";

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogParams();
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = assertBlogLocale(locale ?? "");
  const post = await getPostOrNotFound(safeLocale, slug);
  const alternateLocale = await getAlternatePostLocale(safeLocale, slug);

  return {
    title: post.title,
    description: post.description,
    alternates: alternateLocale
      ? {
          languages: {
            [safeLocale]: `/${safeLocale}/notes/${post.slug}`,
            [alternateLocale]: `/${alternateLocale}/notes/${post.slug}`,
          },
        }
      : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: localeOpenGraph[safeLocale],
      publishedTime: new Date(post.date).toISOString(),
    },
  };
}

function BlogPostContent({
  locale,
  post,
}: {
  locale: ReturnType<typeof assertBlogLocale>;
  post: Awaited<ReturnType<typeof getPostOrNotFound>>;
}) {
  const { ui } = useIntlayer("blog");
  const headingQueue = [...post.headings];
  let headingIndex = 0;

  const readNextHeading = (expectedLevel: BlogHeading["level"]) => {
    const heading = headingQueue[headingIndex];

    if (!heading || heading.level !== expectedLevel) {
      return undefined;
    }

    headingIndex += 1;
    return heading.id;
  };

  return (
    <main className="flex flex-col">
      <section className="border-b border-line">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-6 py-16 md:px-10 md:py-20">
          <Link
            href={`/${locale}/notes`}
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            {ui.backToBlog}
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-2">
            <span>
              {ui.publishedOn}: {formatBlogDate(locale, post.date)}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-medium tracking-tight text-foreground md:text-6xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-muted md:text-lg">
              {post.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <BlogLocaleSwitcher currentLocale={locale} slug={post.slug} />
          </div>
        </div>
      </section>

      <BlogReadingLayout headings={post.headings}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          components={{
            h1: ({ children }) => {
              const id = readNextHeading(1);
              return (
                <h1 id={id} className="scroll-mt-28">
                  {children}
                </h1>
              );
            },
            h2: ({ children }) => {
              const id = readNextHeading(2);
              return (
                <h2 id={id} className="scroll-mt-28">
                  {children}
                </h2>
              );
            },
            h3: ({ children }) => {
              const id = readNextHeading(3);
              return (
                <h3 id={id} className="scroll-mt-28">
                  {children}
                </h3>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </BlogReadingLayout>

      <Footer socialOnly />
    </main>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const safeLocale = assertBlogLocale(locale ?? "");
  const post = await getPostOrNotFound(safeLocale, slug);

  return (
    <IntlayerServerProvider locale={safeLocale}>
      <BlogPostContent locale={safeLocale} post={post} />
    </IntlayerServerProvider>
  );
}
