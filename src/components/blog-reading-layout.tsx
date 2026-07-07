"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { BlogHeading } from "@/lib/blog";
import { blogUiCopy } from "@/lib/data";

type BlogReadingLayoutProps = {
  children: React.ReactNode;
  headings: BlogHeading[];
};

export function BlogReadingLayout({
  children,
  headings,
}: BlogReadingLayoutProps) {
  const tocHeadings = headings.filter((heading) => heading.level > 1);
  const [activeId, setActiveId] = useState<string | null>(
    tocHeadings[0]?.id ?? null,
  );

  useEffect(() => {
    if (tocHeadings.length === 0) {
      return;
    }

    const elements = tocHeadings
      .map((heading) => document.getElementById(heading.id))
      .filter(
        (element): element is HTMLElement => element instanceof HTMLElement,
      );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-22% 0px -60% 0px",
        threshold: [0, 1],
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [tocHeadings]);

  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-12 md:px-10 md:py-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
        <article id="blog-post-content" className="markdown-content min-w-0">
          {children}
        </article>

        {tocHeadings.length > 0 ? (
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-2">
                {blogUiCopy.tocTitle}
              </p>

              <nav>
                <ul className="space-y-3">
                  {tocHeadings.map((heading) => {
                    const isActive = activeId === heading.id;

                    return (
                      <li key={heading.id}>
                        <Link
                          href={`#${heading.id}`}
                          className={`block text-sm leading-6 transition-colors ${
                            heading.level === 3 ? "pl-4" : ""
                          } ${
                            isActive
                              ? "text-foreground"
                              : "text-muted hover:text-foreground"
                          }`}
                        >
                          {heading.text}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
