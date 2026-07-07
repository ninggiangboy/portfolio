import { profile } from "@/lib/data";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight leading-tight md:text-4xl">
            &ldquo;{profile.quote}&rdquo;
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 max-w-[65ch] space-y-4 text-muted leading-relaxed">
            <p>
              A full-stack developer from Ha Noi. I build distributed backends
              in Go and Spring, and the React or Vue frontends that talk to
              them.
            </p>
            <p>
              I like systems you can reason about. Clear contracts, honest
              metrics, code that stays legible after the third refactor, and an
              observability stack that tells the truth.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
