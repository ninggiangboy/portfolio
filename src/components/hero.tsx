import Image from "next/image";
import { profile } from "@/lib/data";
import { CtaLink } from "./cta";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-20">
      <div className="mx-auto max-w-350 px-6 py-20 md:px-10 md:py-24">
        <div className="grid min-h-[76dvh] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-12">
          <div className="flex flex-col gap-6 md:col-span-7">
            <Reveal>
              <p className="font-mono text-sm text-muted">
                {profile.handle} / {profile.role}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-5xl font-medium tracking-tighter leading-none md:text-7xl">
                {profile.name}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-[52ch] text-lg leading-relaxed text-muted">
                Full-stack developer building distributed backends. Modular
                monoliths, transactional outbox, and the boundaries between
                modules.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <CtaLink
                  href={`mailto:${profile.email}`}
                  label="Email me"
                  variant="primary"
                />
                <CtaLink href="#work" label="View work" variant="ghost" />
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.2}>
              <div className="relative mx-auto aspect-square w-full max-w-[320px]">
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-accent/10"
                />
                <Image
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="relative z-10 rounded-2xl border border-line object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
