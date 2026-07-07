"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";

type BigCtaProps = {
  href: string;
  label: string;
  external?: boolean;
};

export function BigCta({ href, label, external = false }: BigCtaProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-3 text-5xl tracking-tighter font-medium leading-none md:text-7xl"
    >
      <span className="transition-colors duration-300 group-hover:text-accent">
        {label}
      </span>
      <ArrowUpRight
        size={56}
        weight="bold"
        aria-hidden
        className="text-muted-2 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent md:size-16"
      />
    </Link>
  );
}
