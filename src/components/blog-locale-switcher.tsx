import Link from "next/link";
import { useIntlayer } from "next-intlayer/server";
import type { BlogLocale } from "@/lib/blog";

type BlogLocaleSwitcherProps = {
  currentLocale: BlogLocale;
  slug?: string;
};

export function BlogLocaleSwitcher({
  currentLocale,
  slug,
}: BlogLocaleSwitcherProps) {
  const { ui } = useIntlayer("blog");
  const nextLocale = currentLocale === "en" ? "vi" : "en";
  const href = slug ? `/${nextLocale}/notes/${slug}` : `/${nextLocale}/notes`;
  const label =
    nextLocale === "en" ? ui.switchToEnglish : ui.switchToVietnamese;

  return (
    <Link
      href={href}
      aria-label={String(label)}
      className="font-mono text-sm text-muted transition-colors hover:text-accent"
    >
      {label}
    </Link>
  );
}
