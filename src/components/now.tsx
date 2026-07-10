import { useIntlayer } from "next-intlayer/server";
import { Reveal } from "./reveal";

export function Now() {
  const { nowEntries, sections } = useIntlayer("site");

  return (
    <section id="now" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-4xl font-medium tracking-tighter md:text-5xl">
            {sections.now.title}
          </h2>
          <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">
            {sections.now.description}
          </p>
        </Reveal>

        <dl className="mt-12 space-y-10">
          {nowEntries.map(
            (entry: { label: string; detail: string }, i: number) => (
              <Reveal
                key={entry.label}
                delay={i * 0.06}
                className="grid grid-cols-1 gap-2 md:grid-cols-12 md:gap-6"
              >
                <dt className="font-mono text-sm text-muted md:col-span-3">
                  {entry.label}
                </dt>
                <dd className="max-w-[55ch] leading-relaxed text-foreground md:col-span-9">
                  {entry.detail}
                </dd>
              </Reveal>
            ),
          )}
        </dl>
      </div>
    </section>
  );
}
