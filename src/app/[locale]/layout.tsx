import type { ReactNode } from "react";
import { assertBlogLocale } from "@/lib/blog";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const safeLocale = assertBlogLocale(locale);

  return <div lang={safeLocale}>{children}</div>;
}
