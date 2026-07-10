import { type Dictionary, t } from "intlayer";

const blogContent = {
  key: "blog",
  content: {
    intro: {
      eyebrow: t({ en: "Blog", vi: "Blog" }),
      title: t({
        en: "Writing on systems, product, and craft",
        vi: "Writing on systems, product, and craft",
      }),
      description: t({
        en: "Notes on backend architecture, product engineering, and the tradeoffs that shape maintainable software.",
        vi: "Notes on backend architecture, product engineering, and the tradeoffs that shape maintainable software.",
      }),
      visitBlog: t({ en: "Visit blog", vi: "Visit blog" }),
    },
    ui: {
      backToBlog: t({ en: "Back to blog", vi: "Back to blog" }),
      readArticle: t({ en: "Read article", vi: "Read article" }),
      publishedOn: t({ en: "Published", vi: "Published" }),
      emptyState: t({
        en: "No posts available for this locale yet.",
        vi: "No posts available for this locale yet.",
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
