import { aboutCopy } from "@/lib/data";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight leading-tight md:text-4xl">
            {aboutCopy.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 max-w-[65ch] space-y-4 text-muted leading-relaxed">
            {aboutCopy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
