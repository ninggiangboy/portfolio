"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-strong border border-transparent",
  ghost: "bg-transparent text-foreground hover:bg-surface border border-line",
};

type CtaLinkProps = {
  href: string;
  label: string;
  variant?: Variant;
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href">;

export function CtaLink({
  href,
  label,
  variant = "primary",
  external = false,
  ...rest
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-2 rounded-full px-5 h-11 text-sm font-medium transition-all duration-300 active:translate-y-px ${styles[variant]}`}
      {...rest}
    >
      <span className="whitespace-nowrap">{label}</span>
      <ArrowUpRight
        size={16}
        weight="bold"
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
