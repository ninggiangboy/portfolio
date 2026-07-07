import { blogIntro } from "@/lib/data";
import { CtaLink } from "./cta";
import { Reveal } from "./reveal";

export function BlogTeaser() {
  return (
    <section id="blog" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-4">
              <h2 className="text-4xl font-medium tracking-tighter md:text-5xl">
                {blogIntro.eyebrow}
              </h2>
              <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">
                {blogIntro.title}
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="max-w-[65ch] space-y-6">
                <p className="leading-relaxed text-muted">
                  {blogIntro.description}
                </p>
                <div>
                  <CtaLink href="/en/blog" label="Visit blog" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
