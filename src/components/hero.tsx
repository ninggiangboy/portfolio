import Image from "next/image";
import { heroCopy, profile } from "@/lib/data";
import { CtaLink } from "./cta";
import { Reveal } from "./reveal";

export function Hero() {
  const words = profile.name.split(" ");
  const middleIndex = Math.floor((words.length - 1) / 2);
  const nameLines = words.map((word, i) => ({
    word,
    index: String(i + 1).padStart(2, "0"),
    outline: i === middleIndex,
    indent: i === middleIndex,
  }));

  return (
    <section id="top" className="relative scroll-mt-20">
      <div className="mx-auto max-w-350 px-6 py-20 md:px-10 md:py-24">
        <div className="grid min-h-[76dvh] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-12">
          <div className="flex flex-col gap-6 md:col-span-7">
            <Reveal>
              <p className="flex items-center gap-2 font-mono text-sm text-muted">
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                  <span className="relative inline-flex h-full w-full rounded-full bg-accent" />
                </span>
                {profile.handle} / {profile.role}
              </p>
            </Reveal>
            <h1 className="flex flex-col" aria-label={profile.name}>
              {nameLines.map((line, i) => (
                <Reveal key={line.word} delay={0.06 + i * 0.08}>
                  <div
                    className={`group flex items-start gap-3 md:gap-5 ${line.indent ? "pl-[12%] md:pl-[16%]" : ""}`}
                  >
                    <span
                      aria-hidden
                      className={`mt-2 font-mono text-xs tabular-nums md:mt-4 md:text-sm ${line.outline ? "text-accent" : "text-muted-2"}`}
                    >
                      {line.index}
                    </span>
                    <span
                      className={`block text-[clamp(2.75rem,10.5vw,8rem)] font-medium tracking-tighter leading-[0.85] transition-colors duration-300 group-hover:text-accent ${line.outline ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-foreground)]" : ""}`}
                    >
                      {line.word}
                      {i === nameLines.length - 1 && (
                        <span
                          aria-hidden
                          className="ml-3 inline-block h-[0.7em] w-[0.2em] translate-y-[0.05em] bg-accent cursor-blink"
                        />
                      )}
                    </span>
                  </div>
                </Reveal>
              ))}
            </h1>
            <Reveal delay={0.12}>
              <p className="max-w-[52ch] text-lg leading-relaxed text-muted">
                {heroCopy.intro}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <CtaLink
                  href={`mailto:${profile.email}`}
                  label={heroCopy.primaryCta}
                  variant="primary"
                />
                <CtaLink
                  href="#work"
                  label={heroCopy.secondaryCta}
                  variant="ghost"
                />
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
