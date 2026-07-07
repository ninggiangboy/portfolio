import Link from "next/link";
import type { BlogLocale } from "@/lib/blog";
import { blogSwitcherLabel } from "@/lib/data";

type BlogLocaleSwitcherProps = {
  currentLocale: BlogLocale;
  slug?: string;
};

export function BlogLocaleSwitcher({
  currentLocale,
  slug,
}: BlogLocaleSwitcherProps) {
  const nextLocale = currentLocale === "en" ? "vi" : "en";
  const href = slug ? `/${nextLocale}/blog/${slug}` : `/${nextLocale}/blog`;

  return (
    <Link
      href={href}
      aria-label={blogSwitcherLabel[nextLocale]}
      className="font-mono text-sm text-muted transition-colors hover:text-accent"
    >
      {blogSwitcherLabel[nextLocale]}
    </Link>
  );
}
