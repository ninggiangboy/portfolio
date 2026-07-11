import type { Metadata } from "next";
import { profile } from "@/lib/data";
import type { SiteLocale } from "@/lib/i18n";
import { localeOpenGraph } from "@/lib/i18n";

const metadataCopy = {
  en: {
    title: "Ha Duy Khanh | Full-Stack Developer",
    description:
      "Full-stack developer in Hanoi building reliable backend platforms and product interfaces with event-driven architecture and maintainable systems design.",
    blogTitle: "Technical Notes | Ha Duy Khanh",
    blogDescription:
      "Short technical notes on backend architecture, product engineering, and the tradeoffs behind maintainable software.",
  },
  vi: {
    title: "Ha Duy Khanh | Full-Stack Developer",
    description:
      "Full-stack developer in Hanoi building reliable backend platforms and product interfaces with event-driven architecture and maintainable systems design.",
    blogTitle: "Technical Notes | Ha Duy Khanh",
    blogDescription:
      "Short technical notes on backend architecture, product engineering, and the tradeoffs behind maintainable software.",
  },
} as const satisfies Record<
  SiteLocale,
  {
    title: string;
    description: string;
    blogTitle: string;
    blogDescription: string;
  }
>;

const keywords = [
  "full-stack developer",
  "Go",
  "Java",
  "Kotlin",
  "Spring Boot",
  "Kafka",
  "modular monolith",
  "event-driven",
  "Hanoi",
  "portfolio",
  "ninggiangboy",
];

export function getHomeMetadata(locale: SiteLocale): Metadata {
  const copy = metadataCopy[locale];

  return {
    title: copy.title,
    description: copy.description,
    authors: { name: profile.name },
    keywords,
    alternates: {
      languages: {
        en: "/en",
        vi: "/vi",
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: "profile",
      locale: localeOpenGraph[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export function getBlogIndexMetadata(locale: SiteLocale): Metadata {
  const copy = metadataCopy[locale];

  return {
    title: copy.blogTitle,
    description: copy.blogDescription,
    alternates: {
      languages: {
        en: "/en/notes",
        vi: "/vi/notes",
      },
    },
    openGraph: {
      title: copy.blogTitle,
      description: copy.blogDescription,
      type: "website",
      locale: localeOpenGraph[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.blogTitle,
      description: copy.blogDescription,
    },
  };
}
