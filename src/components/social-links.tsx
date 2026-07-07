"use client";

import {
  Envelope,
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  XLogo,
} from "@phosphor-icons/react";
import { socials } from "@/lib/data";

const iconMap = {
  github: GithubLogo,
  x: XLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  email: Envelope,
} as const;

export function SocialLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {socials.map((s) => {
        const Icon = iconMap[s.icon];
        const isEmail = s.icon === "email";
        return (
          <li key={s.href}>
            <a
              href={s.href}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noopener noreferrer"}
              aria-label={`${s.label}: ${s.handle}`}
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <Icon size={18} weight="regular" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
