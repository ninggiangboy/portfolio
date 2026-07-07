import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { cache } from "react";

export const blogLocales = ["en", "vi"] as const;

export type BlogLocale = (typeof blogLocales)[number];

export type BlogPostMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  locale: BlogLocale;
  tags?: string[];
};

export type BlogPost = BlogPostMeta & {
  content: string;
  headings: BlogHeading[];
};

export type BlogHeading = {
  id: string;
  level: 1 | 2 | 3;
  text: string;
};

const blogRoot = path.join(process.cwd(), "content", "blog");

function isBlogLocale(value: string): value is BlogLocale {
  return blogLocales.includes(value as BlogLocale);
}

function ensureLocale(locale: string): BlogLocale {
  if (!isBlogLocale(locale)) {
    notFound();
  }

  return locale;
}

function validateMeta(data: unknown, filePath: string): BlogPostMeta {
  if (!data || typeof data !== "object") {
    throw new Error(`Invalid frontmatter in ${filePath}`);
  }

  const candidate = data as Record<string, unknown>;

  const rawDate = candidate.date;
  const normalizedDate =
    typeof rawDate === "string"
      ? rawDate
      : rawDate instanceof Date
        ? rawDate.toISOString().slice(0, 10)
        : null;

  if (
    typeof candidate.title !== "string" ||
    typeof candidate.description !== "string" ||
    !normalizedDate ||
    typeof candidate.slug !== "string" ||
    typeof candidate.locale !== "string"
  ) {
    throw new Error(`Missing required blog frontmatter fields in ${filePath}`);
  }

  if (!isBlogLocale(candidate.locale)) {
    throw new Error(
      `Unsupported blog locale "${candidate.locale}" in ${filePath}`,
    );
  }

  const rawTags = candidate.tags;

  if (rawTags && !Array.isArray(rawTags)) {
    throw new Error(`Blog tags must be an array in ${filePath}`);
  }

  const normalizedTags = Array.isArray(rawTags) ? rawTags : undefined;

  if (normalizedTags?.some((tag) => typeof tag !== "string")) {
    throw new Error(`Blog tags must contain strings only in ${filePath}`);
  }

  return {
    title: candidate.title,
    description: candidate.description,
    date: normalizedDate,
    slug: candidate.slug,
    locale: candidate.locale,
    tags: normalizedTags as string[] | undefined,
  };
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(markdown: string): BlogHeading[] {
  const lines = markdown.split("\n");
  const headings: BlogHeading[] = [];
  const slugCounts = new Map<string, number>();
  let inCodeFence = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const match = /^(#{1,3})\s+(.+)$/.exec(line);

    if (!match) {
      continue;
    }

    const level = match[1]?.length as 1 | 2 | 3;
    const text = match[2]?.trim().replace(/\s+#*$/, "");

    if (!text) {
      continue;
    }

    const baseSlug = slugifyHeading(text);
    const count = slugCounts.get(baseSlug) ?? 0;
    slugCounts.set(baseSlug, count + 1);

    headings.push({
      id: count === 0 ? baseSlug : `${baseSlug}-${count + 1}`,
      level,
      text,
    });
  }

  return headings;
}

async function readPostFile(
  locale: BlogLocale,
  fileName: string,
): Promise<BlogPost> {
  const filePath = path.join(blogRoot, locale, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = validateMeta(data, filePath);

  return {
    ...meta,
    content,
    headings: extractHeadings(content),
  };
}

export const getPostsByLocale = cache(
  async (locale: string): Promise<BlogPost[]> => {
    const safeLocale = ensureLocale(locale);
    const directory = path.join(blogRoot, safeLocale);
    const entries = await fs.readdir(directory);
    const posts = await Promise.all(
      entries
        .filter((entry) => entry.endsWith(".md"))
        .map((entry) => readPostFile(safeLocale, entry)),
    );

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  },
);

export const getPostBySlug = cache(
  async (locale: string, slug: string): Promise<BlogPost | null> => {
    const posts = await getPostsByLocale(locale);
    return posts.find((post) => post.slug === slug) ?? null;
  },
);

export async function getPostOrNotFound(locale: string, slug: string) {
  const post = await getPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  return post;
}

export async function getAlternatePostLocale(
  locale: BlogLocale,
  slug: string,
): Promise<BlogLocale | null> {
  const alternate = blogLocales.find((candidate) => candidate !== locale);

  if (!alternate) {
    return null;
  }

  const post = await getPostBySlug(alternate, slug);
  return post ? alternate : null;
}

export async function getAllBlogParams() {
  const locales = await Promise.all(
    blogLocales.map(async (locale) => {
      const posts = await getPostsByLocale(locale);
      return posts.map((post) => ({
        locale,
        slug: post.slug,
      }));
    }),
  );

  return locales.flat();
}

export function formatBlogDate(_locale: BlogLocale, date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(date));
}

export function assertBlogLocale(locale: string) {
  return ensureLocale(locale);
}
