import { notFound } from "next/navigation";

export const siteLocales = ["en", "vi"] as const;

export type SiteLocale = (typeof siteLocales)[number];

export function isSiteLocale(value: string): value is SiteLocale {
  return siteLocales.includes(value as SiteLocale);
}

export function assertSiteLocale(value: string): SiteLocale {
  if (!isSiteLocale(value)) {
    notFound();
  }

  return value;
}

export const localeFormats: Record<SiteLocale, string> = {
  en: "en-US",
  vi: "vi-VN",
};

export const localeOpenGraph: Record<SiteLocale, string> = {
  en: "en_US",
  vi: "vi_VN",
};
