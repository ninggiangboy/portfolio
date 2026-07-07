import { patterns, sectionCopy } from "@/lib/data";
import { Reveal } from "./reveal";

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-4xl font-medium tracking-tighter md:text-5xl">
            {sectionCopy.approach.title}
          </h2>
          <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">
            {sectionCopy.approach.description}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {patterns.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className="bg-background p-8">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {p.name}
              </h3>
              <p className="mt-3 max-w-[45ch] leading-relaxed text-muted">
                {p.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
