import { type Dictionary, t } from "intlayer";

const blogContent = {
  key: "blog",
  content: {
    intro: {
      eyebrow: t({ en: "Technical Notes", vi: "Technical Notes" }),
      title: t({
        en: "Short notes on systems, product, and engineering craft",
        vi: "Short notes on systems, product, and engineering craft",
      }),
      description: t({
        en: "Brief technical notes on backend architecture, product engineering, and the tradeoffs that shape maintainable software.",
        vi: "Brief technical notes on backend architecture, product engineering, and the tradeoffs that shape maintainable software.",
      }),
      visitBlog: t({ en: "Browse notes", vi: "Browse notes" }),
    },
    ui: {
      backToBlog: t({ en: "Back to notes", vi: "Back to notes" }),
      readArticle: t({ en: "Read note", vi: "Read note" }),
      publishedOn: t({ en: "Published", vi: "Published" }),
      emptyState: t({
        en: "No notes available for this locale yet.",
        vi: "No notes available for this locale yet.",
      }),
      tocTitle: t({ en: "On this page", vi: "On this page" }),
      scrollToTopLabel: t({ en: "Back to top", vi: "Back to top" }),
      switchToEnglish: t({
        en: "Switch to English version",
        vi: "Switch to English version",
      }),
      switchToVietnamese: t({
        en: "Switch to Vietnamese version",
        vi: "Switch to Vietnamese version",
      }),
    },
  },
} satisfies Dictionary;

export default blogContent;
