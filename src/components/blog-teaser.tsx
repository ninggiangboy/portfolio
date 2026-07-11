import { useIntlayer } from "next-intlayer/server";
import type { SiteLocale } from "@/lib/i18n";
import { CtaLink } from "./cta";
import { Reveal } from "./reveal";

type BlogTeaserProps = {
  locale: SiteLocale;
};

export function BlogTeaser({ locale }: BlogTeaserProps) {
  const { intro } = useIntlayer("blog");

  return (
    <section id="notes" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-4">
              <h2 className="text-4xl font-medium tracking-tighter md:text-5xl">
                {intro.eyebrow}
              </h2>
              <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">
                {intro.title}
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="max-w-[65ch] space-y-6">
                <p className="leading-relaxed text-muted">
                  {intro.description}
                </p>
                <div>
                  <CtaLink href={`/${locale}/notes`} label={intro.visitBlog} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
