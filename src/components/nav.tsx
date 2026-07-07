"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroCopy, profile } from "@/lib/data";
import { CtaLink } from "./cta";
import { PageScrollProgress } from "./page-scroll-progress";
import { PageScrollTop } from "./page-scroll-top";

const links = [
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Now", href: "/#now" },
  { label: "Blog", href: "/en/blog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
        <PageScrollProgress />

        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="group flex items-center gap-1.5 font-mono text-sm font-medium tracking-tight"
          >
            <span className="text-foreground transition-colors group-hover:text-accent">
              ninggiangboy
            </span>
            <span
              aria-hidden
              className="cursor-blink inline-block h-4 w-[2px] translate-y-[1px] bg-accent"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <CtaLink
              href={`mailto:${profile.email}`}
              label={heroCopy.primaryCta}
              variant="ghost"
            />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground md:hidden"
          >
            {open ? (
              <X size={18} weight="bold" />
            ) : (
              <List size={18} weight="bold" />
            )}
          </button>
        </nav>

        {open && (
          <div className="border-t border-line bg-background md:hidden">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-6 py-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg text-foreground transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4">
                <CtaLink
                  href={`mailto:${profile.email}`}
                  label={heroCopy.primaryCta}
                  variant="primary"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      <PageScrollTop />
    </>
  );
}
